"""Business logic for schedule generation and management."""

from typing import List, Dict, Optional, Any, Tuple
from sqlalchemy.orm import Session
from datetime import date, datetime, timedelta
import logging

from ..models import Schedule, Assignment, Resident, RuleViolation
from .resident_service import ResidentService
from .compliance_service import ComplianceService


logger = logging.getLogger(__name__)


class SchedulingService:
    """Service class for schedule generation and management."""

    def __init__(self, db: Session):
        self.db = db
        self.resident_service = ResidentService(db)
        self.compliance_service = ComplianceService(db)

    def create_schedule(
        self,
        name: str,
        start_date: date,
        end_date: date,
        algorithm: str = "CSP",
        description: Optional[str] = None,
        parameters: Optional[Dict[str, Any]] = None,
        created_by: Optional[str] = None,
    ) -> Schedule:
        """Create a new schedule."""

        if start_date >= end_date:
            raise ValueError("End date must be after start date")

        if (end_date - start_date).days > 365:
            raise ValueError("Schedule cannot exceed 365 days")

        schedule = Schedule(
            name=name,
            description=description,
            start_date=start_date,
            end_date=end_date,
            algorithm_used=algorithm,
            generation_parameters=parameters or {},
            status="draft",
            created_by=created_by,
            generation_started_at=datetime.utcnow(),
        )

        self.db.add(schedule)
        self.db.commit()
        self.db.refresh(schedule)

        return schedule

    def generate_schedule_assignments(
        self,
        schedule_id: int,
        selected_residents: Optional[List[int]] = None,
        algorithm_params: Optional[Dict[str, Any]] = None,
    ) -> Tuple[List[Assignment], List[RuleViolation]]:
        """Generate assignments for a schedule using the specified algorithm."""

        schedule = self.db.query(Schedule).filter(Schedule.id == schedule_id).first()
        if not schedule:
            raise ValueError(f"Schedule with ID {schedule_id} not found")

        # Get residents
        if selected_residents:
            residents = [
                self.resident_service.get_resident(resident_id)
                for resident_id in selected_residents
                if self.resident_service.get_resident(resident_id)
            ]
        else:
            residents = self.resident_service.get_residents(is_active=True)

        if not residents:
            raise ValueError("No residents available for scheduling")

        logger.info(
            f"Generating schedule for {len(residents)} residents from {schedule.start_date} to {schedule.end_date}"
        )

        # Generate assignments based on algorithm
        if schedule.algorithm_used.upper() == "CSP":
            assignments, violations = self._generate_csp_schedule(
                schedule, residents, algorithm_params
            )
        elif schedule.algorithm_used.upper() == "PMR_SEQUENTIAL":
            assignments, violations = self._generate_pmr_sequential_schedule(
                schedule, residents, algorithm_params
            )
        else:
            assignments, violations = self._generate_simple_schedule(
                schedule, residents, algorithm_params
            )

        # Save assignments to database
        for assignment in assignments:
            self.db.add(assignment)

        # Save violations
        for violation in violations:
            self.db.add(violation)

        # Update schedule metadata
        schedule.total_assignments = len(assignments)
        schedule.hard_rule_violations = len(
            [v for v in violations if v.rule_category == "hard"]
        )
        schedule.soft_rule_violations = len(
            [v for v in violations if v.rule_category == "soft"]
        )
        schedule.compliance_percentage = self._calculate_compliance_percentage(
            assignments, violations
        )
        schedule.generation_completed_at = datetime.utcnow()
        schedule.generation_duration_seconds = (
            schedule.generation_completed_at - schedule.generation_started_at
        ).total_seconds()

        self.db.commit()

        logger.info(
            f"Generated {len(assignments)} assignments with {len(violations)} rule violations"
        )

        # Process schedule for ACGME compliance tracking
        try:
            compliance_result = self.compliance_service.process_new_schedule(
                schedule.id
            )
            logger.info(
                f"ACGME compliance processing: {compliance_result['immediate_violations']} violations detected"
            )

            # Update schedule with ACGME compliance data
            schedule.hard_rule_violations += compliance_result.get(
                "immediate_violations", 0
            )
            self.db.commit()

        except Exception as e:
            logger.error(f"Failed to process schedule for ACGME compliance: {e}")
            # Continue without failing the entire schedule generation

        return assignments, violations

    def _generate_simple_schedule(
        self,
        schedule: Schedule,
        residents: List[Resident],
        params: Optional[Dict[str, Any]] = None,
    ) -> Tuple[List[Assignment], List[RuleViolation]]:
        """Generate a simple round-robin schedule for testing."""

        assignments = []
        violations = []

        current_date = schedule.start_date
        resident_index = 0
        assignment_id = 1

        while current_date <= schedule.end_date:
            weekday = current_date.weekday()  # 0 = Monday, 6 = Sunday

            # Weekday assignments (Monday-Friday)
            if weekday < 5:
                # Call shift - one resident per day
                call_resident = residents[resident_index % len(residents)]

                # Check availability
                available_residents = (
                    self.resident_service.get_residents_by_availability(
                        current_date, "call"
                    )
                )

                if call_resident not in available_residents and available_residents:
                    call_resident = available_residents[0]

                assignment = Assignment(
                    schedule_id=schedule.id,
                    resident_id=call_resident.id,
                    assignment_date=current_date,
                    shift_type="call",
                    start_time=datetime.strptime("17:00", "%H:%M").time(),
                    end_time=datetime.strptime("08:00", "%H:%M").time(),
                    duration_hours=15,
                    assignment_method="auto_generated",
                )
                assignments.append(assignment)
                resident_index += 1

                # Moonlight shift (Monday-Thursday)
                if weekday < 4:
                    moonlight_resident = residents[
                        (resident_index + 1) % len(residents)
                    ]

                    # Check availability
                    available_residents = (
                        self.resident_service.get_residents_by_availability(
                            current_date, "moonlight"
                        )
                    )

                    if (
                        moonlight_resident not in available_residents
                        and available_residents
                    ):
                        moonlight_resident = available_residents[0]

                    if moonlight_resident.id != call_resident.id:  # Avoid same resident
                        assignment = Assignment(
                            schedule_id=schedule.id,
                            resident_id=moonlight_resident.id,
                            assignment_date=current_date,
                            shift_type="moonlight",
                            start_time=datetime.strptime("20:00", "%H:%M").time(),
                            end_time=datetime.strptime("08:00", "%H:%M").time(),
                            duration_hours=12,
                            assignment_method="auto_generated",
                        )
                        assignments.append(assignment)

                # Friday moonlight (2 residents)
                elif weekday == 4:
                    for i in range(2):
                        moonlight_resident = residents[
                            (resident_index + i + 1) % len(residents)
                        ]

                        # Check availability
                        available_residents = (
                            self.resident_service.get_residents_by_availability(
                                current_date, "moonlight"
                            )
                        )

                        if (
                            moonlight_resident not in available_residents
                            and available_residents
                        ):
                            if len(available_residents) > i:
                                moonlight_resident = available_residents[i]
                            else:
                                continue

                        if (
                            moonlight_resident.id != call_resident.id
                        ):  # Avoid same resident
                            assignment = Assignment(
                                schedule_id=schedule.id,
                                resident_id=moonlight_resident.id,
                                assignment_date=current_date,
                                shift_type="moonlight",
                                start_time=datetime.strptime("20:00", "%H:%M").time(),
                                end_time=datetime.strptime("08:00", "%H:%M").time(),
                                duration_hours=12,
                                assignment_method="auto_generated",
                            )
                            assignments.append(assignment)

            # Weekend assignments (Saturday-Sunday)
            elif weekday == 5:  # Saturday
                # Weekend call (PGY-2)
                pgy2_residents = [r for r in residents if r.pgy_level == "PGY-2"]
                if pgy2_residents:
                    weekend_call_resident = pgy2_residents[
                        resident_index % len(pgy2_residents)
                    ]

                    # Check availability
                    available_residents = (
                        self.resident_service.get_residents_by_availability(
                            current_date, "weekend_call"
                        )
                    )
                    available_pgy2 = [
                        r for r in available_residents if r.pgy_level == "PGY-2"
                    ]

                    if weekend_call_resident not in available_pgy2 and available_pgy2:
                        weekend_call_resident = available_pgy2[0]

                    if available_pgy2:  # Only assign if PGY-2 available
                        assignment = Assignment(
                            schedule_id=schedule.id,
                            resident_id=weekend_call_resident.id,
                            assignment_date=current_date,
                            shift_type="weekend_call",
                            start_time=datetime.strptime("08:00", "%H:%M").time(),
                            end_time=datetime.strptime("08:00", "%H:%M").time(),
                            duration_hours=48,  # Covers both Saturday and Sunday
                            assignment_method="auto_generated",
                        )
                        assignments.append(assignment)

                # Weekend moonlight
                pgy3_4_residents = [
                    r for r in residents if r.pgy_level in ["PGY-3", "PGY-4"]
                ]
                if pgy3_4_residents:
                    weekend_moonlight_resident = pgy3_4_residents[
                        resident_index % len(pgy3_4_residents)
                    ]

                    available_residents = (
                        self.resident_service.get_residents_by_availability(
                            current_date, "weekend_moonlight"
                        )
                    )
                    available_pgy3_4 = [
                        r
                        for r in available_residents
                        if r.pgy_level in ["PGY-3", "PGY-4"]
                    ]

                    if (
                        weekend_moonlight_resident not in available_pgy3_4
                        and available_pgy3_4
                    ):
                        weekend_moonlight_resident = available_pgy3_4[0]

                    if available_pgy3_4:  # Only assign if PGY-3/4 available
                        assignment = Assignment(
                            schedule_id=schedule.id,
                            resident_id=weekend_moonlight_resident.id,
                            assignment_date=current_date,
                            shift_type="weekend_moonlight",
                            start_time=datetime.strptime("08:00", "%H:%M").time(),
                            end_time=datetime.strptime("08:00", "%H:%M").time(),
                            duration_hours=48,  # Covers both Saturday and Sunday
                            assignment_method="auto_generated",
                        )
                        assignments.append(assignment)

            current_date += timedelta(days=1)

        # Basic validation and violation detection
        violations = self._detect_basic_violations(schedule, assignments)

        return assignments, violations

    def _generate_csp_schedule(
        self,
        schedule: Schedule,
        residents: List[Resident],
        params: Optional[Dict[str, Any]] = None,
    ) -> Tuple[List[Assignment], List[RuleViolation]]:
        """Generate schedule using CSP algorithm (placeholder)."""
        logger.info(
            "CSP algorithm not fully implemented, falling back to simple schedule"
        )
        return self._generate_simple_schedule(schedule, residents, params)

    def _generate_pmr_sequential_schedule(
        self,
        schedule: Schedule,
        residents: List[Resident],
        params: Optional[Dict[str, Any]] = None,
    ) -> Tuple[List[Assignment], List[RuleViolation]]:
        """Generate schedule using PMR sequential algorithm (placeholder)."""
        logger.info(
            "PMR Sequential algorithm not fully implemented, falling back to simple schedule"
        )
        return self._generate_simple_schedule(schedule, residents, params)

    def _detect_basic_violations(
        self, schedule: Schedule, assignments: List[Assignment]
    ) -> List[RuleViolation]:
        """Detect basic rule violations in the generated schedule."""
        violations = []

        # Group assignments by resident and date
        resident_assignments = {}
        for assignment in assignments:
            key = (assignment.resident_id, assignment.assignment_date)
            if key not in resident_assignments:
                resident_assignments[key] = []
            resident_assignments[key].append(assignment)

        # Check for multiple assignments on same day
        for (
            resident_id,
            assignment_date,
        ), day_assignments in resident_assignments.items():
            if len(day_assignments) > 1:
                shift_types = [a.shift_type for a in day_assignments]
                if "call" in shift_types and "moonlight" in shift_types:
                    violation = RuleViolation(
                        schedule_id=schedule.id,
                        rule_id="H012",
                        rule_category="hard",
                        rule_description="No resident can work both call and moonlight on same day",
                        violation_type="same_day_conflict",
                        violation_description=f"Resident {resident_id} assigned both call and moonlight on {assignment_date}",
                        severity="critical",
                    )
                    violations.append(violation)

        return violations

    def _calculate_compliance_percentage(
        self, assignments: List[Assignment], violations: List[RuleViolation]
    ) -> int:
        """Calculate overall compliance percentage."""
        if not assignments:
            return 100

        hard_violations = len([v for v in violations if v.rule_category == "hard"])
        if hard_violations > 0:
            # Hard violations significantly impact compliance
            compliance = max(0, 100 - (hard_violations * 10))
        else:
            soft_violations = len([v for v in violations if v.rule_category == "soft"])
            compliance = max(80, 100 - (soft_violations * 2))

        return min(100, compliance)

    def get_schedule(self, schedule_id: int) -> Optional[Schedule]:
        """Get a schedule by ID."""
        return self.db.query(Schedule).filter(Schedule.id == schedule_id).first()

    def get_schedules(
        self, status: Optional[str] = None, skip: int = 0, limit: int = 100
    ) -> List[Schedule]:
        """Get schedules with optional filtering."""
        query = self.db.query(Schedule)

        if status:
            query = query.filter(Schedule.status == status)

        return query.offset(skip).limit(limit).all()

    def get_schedule_assignments(
        self,
        schedule_id: int,
        resident_id: Optional[int] = None,
        shift_type: Optional[str] = None,
    ) -> List[Assignment]:
        """Get assignments for a schedule."""
        query = self.db.query(Assignment).filter(Assignment.schedule_id == schedule_id)

        if resident_id:
            query = query.filter(Assignment.resident_id == resident_id)

        if shift_type:
            query = query.filter(Assignment.shift_type == shift_type)

        return query.order_by(Assignment.assignment_date).all()

    def publish_schedule(self, schedule_id: int, published_by: str) -> Schedule:
        """Publish a schedule."""
        schedule = self.get_schedule(schedule_id)
        if not schedule:
            raise ValueError(f"Schedule with ID {schedule_id} not found")

        if schedule.hard_rule_violations > 0:
            raise ValueError("Cannot publish schedule with hard rule violations")

        schedule.status = "active"
        schedule.is_published = True
        schedule.published_at = datetime.utcnow()
        schedule.published_by = published_by

        self.db.commit()
        self.db.refresh(schedule)

        return schedule

    def archive_schedule(self, schedule_id: int) -> Schedule:
        """Archive a schedule."""
        schedule = self.get_schedule(schedule_id)
        if not schedule:
            raise ValueError(f"Schedule with ID {schedule_id} not found")

        schedule.status = "archived"
        self.db.commit()
        self.db.refresh(schedule)

        return schedule
