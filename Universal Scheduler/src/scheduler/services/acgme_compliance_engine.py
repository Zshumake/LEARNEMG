"""ACGME Compliance Engine for duty hour tracking and violation detection."""

from datetime import datetime, date, timedelta, time
from typing import List, Dict, Optional, Tuple, Union
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func, desc
import logging
import json
from collections import defaultdict
from dataclasses import dataclass

from ..models import (
    Resident,
    Assignment,
    DutyHourEntry,
    WeeklyDutyHourSummary,
    ACGMEViolation,
    CorrectiveAction,
    ACGMEComplianceReport,
    ACGMEConfiguration,
    ACGMEViolationType,
    ACGMEViolationSeverity,
)

logger = logging.getLogger(__name__)


@dataclass
class ACGMELimits:
    """ACGME duty hour limits and requirements."""

    max_weekly_hours: float = 80.0
    max_consecutive_hours: float = 24.0
    min_rest_period_hours: float = 8.0
    min_rest_period_after_24h: float = 14.0
    max_call_frequency_days: int = 4
    min_educational_hours_weekly: float = 4.0
    max_moonlighting_hours_weekly: float = 20.0
    max_consecutive_call_duty: int = 24
    required_days_off_monthly: int = 4


class ACGMEComplianceEngine:
    """Engine for ACGME compliance tracking and violation detection."""

    def __init__(self, db_session: Session):
        self.db = db_session
        self.limits = self._load_acgme_limits()
        self.logger = logging.getLogger(__name__)

    def _load_acgme_limits(self) -> ACGMELimits:
        """Load ACGME limits from configuration."""
        try:
            # Try to load from database configuration
            config_items = (
                self.db.query(ACGMEConfiguration)
                .filter(ACGMEConfiguration.category == "acgme_limits")
                .all()
            )

            limits = ACGMELimits()
            for config in config_items:
                if hasattr(limits, config.config_key.replace("acgme_", "")):
                    setattr(
                        limits,
                        config.config_key.replace("acgme_", ""),
                        config.typed_value,
                    )

            return limits
        except Exception as e:
            self.logger.warning(
                f"Failed to load ACGME limits from database: {e}, using defaults"
            )
            return ACGMELimits()

    def track_duty_hours(self, assignment: Assignment) -> DutyHourEntry:
        """Create or update duty hour entry for an assignment."""
        try:
            # Check if duty hour entry already exists
            existing_entry = (
                self.db.query(DutyHourEntry)
                .filter(DutyHourEntry.assignment_id == assignment.id)
                .first()
            )

            if existing_entry:
                return self._update_duty_hour_entry(existing_entry, assignment)
            else:
                return self._create_duty_hour_entry(assignment)

        except Exception as e:
            self.logger.error(
                f"Failed to track duty hours for assignment {assignment.id}: {e}"
            )
            raise

    def _create_duty_hour_entry(self, assignment: Assignment) -> DutyHourEntry:
        """Create a new duty hour entry from assignment."""
        # Determine activity classification
        activity_type, is_clinical, is_educational, is_call, is_moonlight = (
            self._classify_assignment(assignment)
        )

        # Calculate start and end times
        start_datetime = self._get_shift_start_datetime(assignment)
        end_datetime = self._get_shift_end_datetime(assignment)
        total_hours = self._calculate_shift_hours(assignment)

        duty_entry = DutyHourEntry(
            resident_id=assignment.resident_id,
            assignment_id=assignment.id,
            date=assignment.assignment_date,
            start_time=start_datetime,
            end_time=end_datetime,
            total_hours=total_hours,
            activity_type=activity_type,
            is_clinical_work=is_clinical,
            is_educational=is_educational,
            is_call_duty=is_call,
            is_moonlighting=is_moonlight,
            location=assignment.location or "Unknown",
            entry_method="automatic",
        )

        # Check for potential violations immediately
        duty_entry.potential_violation, duty_entry.violation_types = (
            self._check_immediate_violations(duty_entry)
        )

        self.db.add(duty_entry)
        self.db.commit()

        self.logger.info(
            f"Created duty hour entry for assignment {assignment.id}, {total_hours} hours"
        )
        return duty_entry

    def _update_duty_hour_entry(
        self, entry: DutyHourEntry, assignment: Assignment
    ) -> DutyHourEntry:
        """Update existing duty hour entry with assignment changes."""
        # Recalculate hours and times
        entry.start_time = self._get_shift_start_datetime(assignment)
        entry.end_time = self._get_shift_end_datetime(assignment)
        entry.total_hours = self._calculate_shift_hours(assignment)
        entry.location = assignment.location or entry.location

        # Re-check for violations
        entry.potential_violation, entry.violation_types = (
            self._check_immediate_violations(entry)
        )

        self.db.commit()
        return entry

    def _classify_assignment(
        self, assignment: Assignment
    ) -> Tuple[str, bool, bool, bool, bool]:
        """Classify assignment into duty hour categories."""
        shift_type = assignment.shift_type.lower()

        # Default classifications
        activity_type = "clinical_duties"
        is_clinical = True
        is_educational = False
        is_call = False
        is_moonlight = False

        if "moonlight" in shift_type:
            is_moonlight = True
            activity_type = "moonlighting"
        elif "call" in shift_type:
            is_call = True
            activity_type = "call_duty"
        elif "educational" in shift_type or "conference" in shift_type:
            is_educational = True
            activity_type = "educational"
        elif "research" in shift_type:
            activity_type = "research"
            is_clinical = False
        elif "administrative" in shift_type:
            activity_type = "administrative"
            is_clinical = False

        return activity_type, is_clinical, is_educational, is_call, is_moonlight

    def _get_shift_start_datetime(self, assignment: Assignment) -> datetime:
        """Get shift start datetime from assignment."""
        if assignment.start_time:
            return datetime.combine(assignment.assignment_date, assignment.start_time)
        else:
            # Default start times based on shift type
            shift_type = assignment.shift_type.lower()
            if "call" in shift_type:
                return datetime.combine(assignment.assignment_date, time(17, 0))  # 5 PM
            elif "moonlight" in shift_type:
                return datetime.combine(assignment.assignment_date, time(19, 0))  # 7 PM
            else:
                return datetime.combine(assignment.assignment_date, time(7, 0))  # 7 AM

    def _get_shift_end_datetime(self, assignment: Assignment) -> datetime:
        """Get shift end datetime from assignment."""
        start_datetime = self._get_shift_start_datetime(assignment)

        if assignment.end_time:
            end_date = assignment.assignment_date
            # Handle overnight shifts
            if assignment.end_time < assignment.start_time:
                end_date = assignment.assignment_date + timedelta(days=1)
            return datetime.combine(end_date, assignment.end_time)
        elif assignment.duration_hours:
            return start_datetime + timedelta(hours=assignment.duration_hours)
        else:
            # Default durations based on shift type
            shift_type = assignment.shift_type.lower()
            if "call" in shift_type:
                return start_datetime + timedelta(hours=15)  # 15-hour call
            elif "moonlight" in shift_type:
                return start_datetime + timedelta(hours=12)  # 12-hour moonlight
            else:
                return start_datetime + timedelta(hours=8)  # 8-hour regular shift

    def _calculate_shift_hours(self, assignment: Assignment) -> float:
        """Calculate total hours for a shift."""
        if assignment.duration_hours:
            return float(assignment.duration_hours)

        start_datetime = self._get_shift_start_datetime(assignment)
        end_datetime = self._get_shift_end_datetime(assignment)

        duration = end_datetime - start_datetime
        return duration.total_seconds() / 3600

    def _check_immediate_violations(
        self, duty_entry: DutyHourEntry
    ) -> Tuple[bool, List[str]]:
        """Check for immediate violations in a duty hour entry."""
        violations = []

        # Check 24-hour consecutive limit
        if duty_entry.total_hours > self.limits.max_consecutive_hours:
            violations.append(ACGMEViolationType.DUTY_HOURS_24_HOUR.value)

        # Check for excessively long shifts (beyond ACGME limits)
        if duty_entry.total_hours > 30:  # Well beyond any reasonable limit
            violations.append(ACGMEViolationType.DUTY_HOURS_24_HOUR.value)

        return len(violations) > 0, violations

    def calculate_weekly_summary(
        self, resident_id: int, week_start_date: date
    ) -> WeeklyDutyHourSummary:
        """Calculate weekly duty hour summary for a resident."""
        try:
            week_end_date = week_start_date + timedelta(days=6)

            # Get all duty hour entries for the week
            duty_entries = (
                self.db.query(DutyHourEntry)
                .filter(
                    and_(
                        DutyHourEntry.resident_id == resident_id,
                        DutyHourEntry.date >= week_start_date,
                        DutyHourEntry.date <= week_end_date,
                    )
                )
                .all()
            )

            # Calculate summary statistics
            summary = self._calculate_weekly_statistics(duty_entries, week_start_date)

            # Check for existing summary
            existing_summary = (
                self.db.query(WeeklyDutyHourSummary)
                .filter(
                    and_(
                        WeeklyDutyHourSummary.resident_id == resident_id,
                        WeeklyDutyHourSummary.week_start_date == week_start_date,
                    )
                )
                .first()
            )

            if existing_summary:
                # Update existing summary
                for key, value in summary.items():
                    setattr(existing_summary, key, value)
                existing_summary.last_calculated = datetime.utcnow()
                weekly_summary = existing_summary
            else:
                # Create new summary
                weekly_summary = WeeklyDutyHourSummary(
                    resident_id=resident_id,
                    week_start_date=week_start_date,
                    week_end_date=week_end_date,
                    year=week_start_date.year,
                    week_number=week_start_date.isocalendar()[1],
                    last_calculated=datetime.utcnow(),
                    **summary,
                )
                self.db.add(weekly_summary)

            self.db.commit()

            # Check for violations in this week
            self._check_weekly_violations(weekly_summary)

            return weekly_summary

        except Exception as e:
            self.logger.error(
                f"Failed to calculate weekly summary for resident {resident_id}: {e}"
            )
            raise

    def _calculate_weekly_statistics(
        self, duty_entries: List[DutyHourEntry], week_start: date
    ) -> Dict:
        """Calculate weekly statistics from duty hour entries."""
        stats = {
            "total_clinical_hours": 0.0,
            "total_educational_hours": 0.0,
            "total_research_hours": 0.0,
            "total_administrative_hours": 0.0,
            "total_moonlighting_hours": 0.0,
            "total_duty_hours": 0.0,
            "call_shifts_count": 0,
            "overnight_calls_count": 0,
            "home_call_count": 0,
            "longest_continuous_duty": 0.0,
            "shortest_rest_period": 24.0,
            "rest_period_violations": 0,
            "educational_hours_percentage": 0.0,
        }

        if not duty_entries:
            return stats

        # Sort entries by start time for rest period calculations
        sorted_entries = sorted(
            duty_entries, key=lambda x: x.start_time or datetime.min
        )

        for entry in duty_entries:
            # Add to appropriate hour totals
            if entry.is_clinical_work:
                stats["total_clinical_hours"] += entry.total_hours
            if entry.is_educational:
                stats["total_educational_hours"] += entry.total_hours
            if entry.activity_type == "research":
                stats["total_research_hours"] += entry.total_hours
            if entry.activity_type == "administrative":
                stats["total_administrative_hours"] += entry.total_hours
            if entry.is_moonlighting:
                stats["total_moonlighting_hours"] += entry.total_hours

            stats["total_duty_hours"] += entry.total_hours

            # Count shift types
            if entry.is_call_duty:
                stats["call_shifts_count"] += 1
                if entry.is_overnight_call:
                    stats["overnight_calls_count"] += 1

            # Track longest continuous duty
            if entry.total_hours > stats["longest_continuous_duty"]:
                stats["longest_continuous_duty"] = entry.total_hours

        # Calculate rest periods between shifts
        rest_periods = self._calculate_rest_periods(sorted_entries)
        if rest_periods:
            stats["shortest_rest_period"] = min(rest_periods)
            stats["rest_period_violations"] = sum(
                1
                for period in rest_periods
                if period < self.limits.min_rest_period_hours
            )

        # Calculate educational hours percentage
        if stats["total_duty_hours"] > 0:
            stats["educational_hours_percentage"] = (
                stats["total_educational_hours"] / stats["total_duty_hours"]
            ) * 100

        return stats

    def _calculate_rest_periods(
        self, sorted_entries: List[DutyHourEntry]
    ) -> List[float]:
        """Calculate rest periods between consecutive duty periods."""
        rest_periods = []

        for i in range(len(sorted_entries) - 1):
            current_entry = sorted_entries[i]
            next_entry = sorted_entries[i + 1]

            if current_entry.end_time and next_entry.start_time:
                rest_duration = next_entry.start_time - current_entry.end_time
                rest_hours = rest_duration.total_seconds() / 3600
                if rest_hours > 0:  # Only count positive rest periods
                    rest_periods.append(rest_hours)

        return rest_periods

    def _check_weekly_violations(self, weekly_summary: WeeklyDutyHourSummary):
        """Check for ACGME violations in weekly summary."""
        violations = []

        # Check 80-hour weekly limit
        if weekly_summary.total_duty_hours > self.limits.max_weekly_hours:
            violation = self._create_violation(
                resident_id=weekly_summary.resident_id,
                violation_type=ACGMEViolationType.DUTY_HOURS_80_HOUR,
                severity=self._determine_severity(
                    weekly_summary.total_duty_hours, self.limits.max_weekly_hours
                ),
                violation_date=weekly_summary.week_start_date,
                title=f"Weekly duty hours exceeded limit",
                description=f"Resident worked {weekly_summary.total_duty_hours:.1f} hours in week of {weekly_summary.week_start_date}, exceeding the 80-hour limit by {weekly_summary.hours_over_limit:.1f} hours.",
                actual_value=weekly_summary.total_duty_hours,
                limit_value=self.limits.max_weekly_hours,
                excess_amount=weekly_summary.hours_over_limit,
                weekly_summary=weekly_summary,
            )
            violations.append(violation)

        # Check rest period violations
        if weekly_summary.rest_period_violations > 0:
            violation = self._create_violation(
                resident_id=weekly_summary.resident_id,
                violation_type=ACGMEViolationType.REST_PERIOD_8_HOUR,
                severity=ACGMEViolationSeverity.HIGH,
                violation_date=weekly_summary.week_start_date,
                title=f"Insufficient rest periods",
                description=f"Resident had {weekly_summary.rest_period_violations} instances of rest periods shorter than 8 hours in week of {weekly_summary.week_start_date}. Shortest rest period was {weekly_summary.shortest_rest_period:.1f} hours.",
                actual_value=weekly_summary.shortest_rest_period,
                limit_value=self.limits.min_rest_period_hours,
                weekly_summary=weekly_summary,
            )
            violations.append(violation)

        # Check educational hours minimum
        if (
            weekly_summary.educational_hours_percentage < 20
        ):  # Example: 20% minimum educational time
            violation = self._create_violation(
                resident_id=weekly_summary.resident_id,
                violation_type=ACGMEViolationType.EDUCATIONAL_ACTIVITIES,
                severity=ACGMEViolationSeverity.MEDIUM,
                violation_date=weekly_summary.week_start_date,
                title=f"Insufficient educational activities",
                description=f"Educational activities comprised only {weekly_summary.educational_hours_percentage:.1f}% of duty hours in week of {weekly_summary.week_start_date}, below recommended minimum.",
                actual_value=weekly_summary.educational_hours_percentage,
                limit_value=20.0,
                weekly_summary=weekly_summary,
            )
            violations.append(violation)

        # Update weekly summary compliance status
        weekly_summary.is_compliant = len(violations) == 0
        weekly_summary.violation_count = len(violations)
        if violations:
            weekly_summary.max_violation_severity = max(
                v.severity.value for v in violations
            )

        self.db.commit()

        self.logger.info(
            f"Checked weekly violations for resident {weekly_summary.resident_id}, found {len(violations)} violations"
        )
        return violations

    def _create_violation(self, **kwargs) -> ACGMEViolation:
        """Create an ACGME violation record."""
        violation = ACGMEViolation(detected_at=datetime.utcnow(), **kwargs)

        self.db.add(violation)
        self.db.commit()

        # Log violation for immediate attention
        self.logger.warning(
            f"ACGME violation detected: {violation.title} for resident {violation.resident_id}"
        )

        # Send notification if this is a critical or high severity violation
        try:
            if violation.severity in [
                ACGMEViolationSeverity.CRITICAL,
                ACGMEViolationSeverity.HIGH,
            ]:
                # Import here to avoid circular imports
                from .notification_service import NotificationService

                notification_service = NotificationService(self.db)
                notification_service.send_compliance_violation_alert(violation)
        except Exception as e:
            self.logger.error(f"Failed to send violation notification: {e}")

        return violation

    def _determine_severity(
        self, actual: float, limit: float
    ) -> ACGMEViolationSeverity:
        """Determine violation severity based on how much limit is exceeded."""
        if actual <= limit:
            return ACGMEViolationSeverity.LOW

        excess_percentage = ((actual - limit) / limit) * 100

        if excess_percentage >= 25:  # 25% or more over limit
            return ACGMEViolationSeverity.CRITICAL
        elif excess_percentage >= 15:  # 15-24% over limit
            return ACGMEViolationSeverity.HIGH
        elif excess_percentage >= 5:  # 5-14% over limit
            return ACGMEViolationSeverity.MEDIUM
        else:  # Less than 5% over limit
            return ACGMEViolationSeverity.LOW

    def get_resident_compliance_status(
        self, resident_id: int, start_date: date, end_date: date
    ) -> Dict:
        """Get comprehensive compliance status for a resident over a period."""
        try:
            # Get all violations in period
            violations = (
                self.db.query(ACGMEViolation)
                .filter(
                    and_(
                        ACGMEViolation.resident_id == resident_id,
                        ACGMEViolation.violation_date >= start_date,
                        ACGMEViolation.violation_date <= end_date,
                        ACGMEViolation.status == "active",
                    )
                )
                .all()
            )

            # Get weekly summaries in period
            weekly_summaries = (
                self.db.query(WeeklyDutyHourSummary)
                .filter(
                    and_(
                        WeeklyDutyHourSummary.resident_id == resident_id,
                        WeeklyDutyHourSummary.week_start_date >= start_date,
                        WeeklyDutyHourSummary.week_start_date <= end_date,
                    )
                )
                .all()
            )

            # Calculate compliance metrics
            total_weeks = len(weekly_summaries)
            compliant_weeks = sum(1 for w in weekly_summaries if w.is_compliant)

            # Categorize violations by type and severity
            violation_summary = defaultdict(int)
            severity_summary = defaultdict(int)

            for violation in violations:
                violation_summary[violation.violation_type.value] += 1
                severity_summary[violation.severity.value] += 1

            # Calculate average weekly hours
            avg_weekly_hours = 0.0
            if weekly_summaries:
                avg_weekly_hours = sum(
                    w.total_duty_hours for w in weekly_summaries
                ) / len(weekly_summaries)

            return {
                "resident_id": resident_id,
                "period_start": start_date,
                "period_end": end_date,
                "compliance_percentage": (
                    (compliant_weeks / total_weeks * 100) if total_weeks > 0 else 0.0
                ),
                "total_weeks_analyzed": total_weeks,
                "compliant_weeks": compliant_weeks,
                "total_violations": len(violations),
                "active_violations": len(
                    [v for v in violations if v.status == "active"]
                ),
                "critical_violations": severity_summary["critical"],
                "high_violations": severity_summary["high"],
                "medium_violations": severity_summary["medium"],
                "low_violations": severity_summary["low"],
                "violation_by_type": dict(violation_summary),
                "avg_weekly_hours": avg_weekly_hours,
                "max_weekly_hours": max(
                    (w.total_duty_hours for w in weekly_summaries), default=0.0
                ),
                "weeks_over_80_hours": sum(
                    1 for w in weekly_summaries if w.total_duty_hours > 80
                ),
                "requires_immediate_attention": any(
                    v.requires_immediate_action for v in violations
                ),
            }

        except Exception as e:
            self.logger.error(
                f"Failed to get compliance status for resident {resident_id}: {e}"
            )
            raise

    def generate_compliance_report(
        self,
        report_type: str,
        start_date: date,
        end_date: date,
        program_id: Optional[str] = None,
        resident_ids: Optional[List[int]] = None,
    ) -> ACGMEComplianceReport:
        """Generate comprehensive ACGME compliance report."""
        try:
            # Determine residents to include
            if resident_ids:
                residents = (
                    self.db.query(Resident).filter(Resident.id.in_(resident_ids)).all()
                )
            elif program_id:
                residents = (
                    self.db.query(Resident)
                    .filter(Resident.program_id == program_id)
                    .all()
                )
            else:
                residents = (
                    self.db.query(Resident).filter(Resident.is_active == True).all()
                )

            # Generate detailed data for each resident
            detailed_data = []
            compliance_summary = {
                "total_residents": len(residents),
                "compliant_residents": 0,
                "total_violations": 0,
                "violations_by_severity": defaultdict(int),
                "violations_by_type": defaultdict(int),
                "weekly_hours_statistics": [],
                "educational_hours_statistics": [],
            }

            for resident in residents:
                resident_status = self.get_resident_compliance_status(
                    resident.id, start_date, end_date
                )
                detailed_data.append(
                    {
                        "resident": {
                            "id": resident.id,
                            "name": resident.name,
                            "pgy_level": resident.pgy_level,
                        },
                        "compliance_status": resident_status,
                    }
                )

                # Update summary statistics
                if (
                    resident_status["compliance_percentage"] >= 95
                ):  # 95% compliance threshold
                    compliance_summary["compliant_residents"] += 1

                compliance_summary["total_violations"] += resident_status[
                    "total_violations"
                ]

                # Aggregate violation statistics
                for severity, count in [
                    ("critical", resident_status["critical_violations"]),
                    ("high", resident_status["high_violations"]),
                    ("medium", resident_status["medium_violations"]),
                    ("low", resident_status["low_violations"]),
                ]:
                    compliance_summary["violations_by_severity"][severity] += count

                for vtype, count in resident_status["violation_by_type"].items():
                    compliance_summary["violations_by_type"][vtype] += count

                compliance_summary["weekly_hours_statistics"].append(
                    resident_status["avg_weekly_hours"]
                )

            # Create compliance report
            report = ACGMEComplianceReport(
                report_name=f"{report_type.title()} ACGME Compliance Report - {start_date} to {end_date}",
                report_type=report_type,
                start_date=start_date,
                end_date=end_date,
                program_id=program_id,
                include_all_residents=resident_ids is None,
                specific_residents=resident_ids,
                total_residents=compliance_summary["total_residents"],
                compliant_residents=compliance_summary["compliant_residents"],
                compliance_rate=(
                    (
                        compliance_summary["compliant_residents"]
                        / compliance_summary["total_residents"]
                        * 100
                    )
                    if compliance_summary["total_residents"] > 0
                    else 0.0
                ),
                total_violations=compliance_summary["total_violations"],
                critical_violations=compliance_summary["violations_by_severity"][
                    "critical"
                ],
                high_violations=compliance_summary["violations_by_severity"]["high"],
                resolved_violations=0,  # Will be calculated separately
                avg_weekly_hours=(
                    sum(compliance_summary["weekly_hours_statistics"])
                    / len(compliance_summary["weekly_hours_statistics"])
                    if compliance_summary["weekly_hours_statistics"]
                    else 0.0
                ),
                max_weekly_hours=max(
                    compliance_summary["weekly_hours_statistics"], default=0.0
                ),
                weeks_over_80_hours=sum(
                    1 for h in compliance_summary["weekly_hours_statistics"] if h > 80
                ),
                detailed_data=detailed_data,
                summary_statistics=dict(compliance_summary),
                generated_by="ACGME Compliance Engine",
                generation_parameters={
                    "report_type": report_type,
                    "period": f"{start_date} to {end_date}",
                    "program_id": program_id,
                    "resident_count": len(residents),
                },
            )

            self.db.add(report)
            self.db.commit()

            self.logger.info(
                f"Generated {report_type} compliance report for {len(residents)} residents"
            )
            return report

        except Exception as e:
            self.logger.error(f"Failed to generate compliance report: {e}")
            raise

    def process_schedule_for_compliance(self, schedule_id: int) -> Dict:
        """Process all assignments in a schedule for compliance tracking."""
        try:
            from ..models import Schedule, Assignment

            schedule = (
                self.db.query(Schedule).filter(Schedule.id == schedule_id).first()
            )
            if not schedule:
                raise ValueError(f"Schedule {schedule_id} not found")

            assignments = (
                self.db.query(Assignment)
                .filter(Assignment.schedule_id == schedule_id)
                .all()
            )

            processed_entries = []
            violations_detected = 0

            # Process each assignment
            for assignment in assignments:
                try:
                    duty_entry = self.track_duty_hours(assignment)
                    processed_entries.append(duty_entry)

                    if duty_entry.potential_violation:
                        violations_detected += 1

                except Exception as e:
                    self.logger.error(
                        f"Failed to process assignment {assignment.id}: {e}"
                    )
                    continue

            # Calculate weekly summaries for all affected residents and weeks
            residents_weeks = set()
            for entry in processed_entries:
                week_start = entry.date - timedelta(days=entry.date.weekday())
                residents_weeks.add((entry.resident_id, week_start))

            weekly_summaries_processed = 0
            for resident_id, week_start in residents_weeks:
                try:
                    self.calculate_weekly_summary(resident_id, week_start)
                    weekly_summaries_processed += 1
                except Exception as e:
                    self.logger.error(
                        f"Failed to calculate weekly summary for resident {resident_id}, week {week_start}: {e}"
                    )

            # Update schedule compliance metrics
            total_violations = (
                self.db.query(ACGMEViolation)
                .filter(ACGMEViolation.schedule_id == schedule_id)
                .count()
            )

            schedule.hard_rule_violations += (
                violations_detected  # Add ACGME violations to hard violations
            )

            result = {
                "schedule_id": schedule_id,
                "assignments_processed": len(assignments),
                "duty_entries_created": len(processed_entries),
                "immediate_violations": violations_detected,
                "weekly_summaries_calculated": weekly_summaries_processed,
                "total_acgme_violations": total_violations,
                "compliance_rate": (
                    ((len(assignments) - violations_detected) / len(assignments) * 100)
                    if len(assignments) > 0
                    else 100.0
                ),
            }

            self.db.commit()

            self.logger.info(
                f"Processed schedule {schedule_id} for compliance: {result}"
            )
            return result

        except Exception as e:
            self.logger.error(
                f"Failed to process schedule {schedule_id} for compliance: {e}"
            )
            raise


def initialize_acgme_configuration(db_session: Session):
    """Initialize ACGME configuration settings in database."""
    try:
        default_configs = [
            {
                "config_key": "acgme_max_weekly_hours",
                "config_name": "Maximum Weekly Duty Hours",
                "description": "ACGME limit for maximum duty hours per week",
                "value": 80.0,
                "data_type": "float",
                "category": "acgme_limits",
            },
            {
                "config_key": "acgme_max_consecutive_hours",
                "config_name": "Maximum Consecutive Duty Hours",
                "description": "ACGME limit for maximum consecutive duty hours",
                "value": 24.0,
                "data_type": "float",
                "category": "acgme_limits",
            },
            {
                "config_key": "acgme_min_rest_period_hours",
                "config_name": "Minimum Rest Period Hours",
                "description": "ACGME minimum rest period between duties",
                "value": 8.0,
                "data_type": "float",
                "category": "acgme_limits",
            },
            {
                "config_key": "acgme_min_rest_period_after_24h",
                "config_name": "Minimum Rest Period After 24h Duty",
                "description": "ACGME minimum rest period after 24-hour duty",
                "value": 14.0,
                "data_type": "float",
                "category": "acgme_limits",
            },
            {
                "config_key": "acgme_max_moonlighting_hours_weekly",
                "config_name": "Maximum Weekly Moonlighting Hours",
                "description": "ACGME limit for moonlighting hours per week",
                "value": 20.0,
                "data_type": "float",
                "category": "acgme_limits",
            },
            {
                "config_key": "compliance_reporting_enabled",
                "config_name": "Enable Compliance Reporting",
                "description": "Enable automatic ACGME compliance reporting",
                "value": True,
                "data_type": "bool",
                "category": "acgme_features",
            },
            {
                "config_key": "violation_auto_detection",
                "config_name": "Automatic Violation Detection",
                "description": "Enable automatic detection of ACGME violations",
                "value": True,
                "data_type": "bool",
                "category": "acgme_features",
            },
        ]

        for config_data in default_configs:
            existing = (
                db_session.query(ACGMEConfiguration)
                .filter(ACGMEConfiguration.config_key == config_data["config_key"])
                .first()
            )

            if not existing:
                config = ACGMEConfiguration(**config_data)
                db_session.add(config)

        db_session.commit()
        logger.info("Initialized ACGME configuration settings")

    except Exception as e:
        logger.error(f"Failed to initialize ACGME configuration: {e}")
        raise
