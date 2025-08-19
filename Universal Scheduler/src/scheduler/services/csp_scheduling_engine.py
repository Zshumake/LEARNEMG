"""
CSP Scheduling Engine for PM&R Residency Program
Uses constraint satisfaction programming to generate optimal schedules
"""

import random
from datetime import datetime, date, timedelta
from typing import List, Dict, Any, Tuple, Optional
from dataclasses import dataclass
from collections import defaultdict, deque
import copy
import json


@dataclass
class Resident:
    """Resident information"""

    id: str
    name: str
    pgy_level: str
    quotas: Dict[str, float]
    completed: Dict[str, float]
    time_off_requests: List[Tuple[date, date]]
    va_rotation_weeks: List[Tuple[date, date]]
    holiday_approved: bool = False
    preferences: Dict[str, int] = None  # day preferences: {'monday': 1, 'friday': 3}

    def __post_init__(self):
        if self.preferences is None:
            self.preferences = {}


@dataclass
class Assignment:
    """Schedule assignment"""

    date: date
    resident_id: str
    shift_type: str
    pgy_level: str


class CSPSchedulingEngine:
    """
    Constraint Satisfaction Programming engine for PM&R scheduling
    """

    def __init__(self, pmr_rules_engine):
        self.rules_engine = pmr_rules_engine
        self.residents = []
        self.schedule = []
        self.domains = {}  # Possible assignments for each variable
        self.constraints = []
        self.objectives = []

        # Schedule generation parameters
        self.start_date = None
        self.end_date = None
        self.shift_types = [
            "weekday_call",
            "friday_call",
            "weekday_moonlight",
            "friday_moonlight",
            "weekend_call",
            "weekend_moonlight",
            "weekend_backup",
        ]

        # CSP solving parameters
        self.max_iterations = 10000
        self.max_backtrack_depth = 1000
        self.current_iteration = 0

        # Statistics
        self.stats = {
            "assignments_tried": 0,
            "backtracks": 0,
            "constraint_checks": 0,
            "solutions_found": 0,
        }

    def setup_schedule_generation(
        self,
        residents: List[Resident],
        start_date: date,
        end_date: date,
        holiday_requirements: Optional[Dict] = None,
        db_session=None,
    ):
        """Setup the CSP problem for schedule generation with holiday integration"""
        self.residents = residents
        self.start_date = start_date
        self.end_date = end_date
        self.schedule = []
        self.holiday_requirements = holiday_requirements or {}
        self.db_session = db_session

        print(f"📅 Setting up schedule generation from {start_date} to {end_date}")
        print(f"👥 Residents: {len(residents)}")
        print(f"🎄 Holiday requirements: {len(self.holiday_requirements)} holidays")

        # Initialize domains and variables
        self._initialize_variables()
        self._initialize_domains()
        self._load_constraints()
        self._load_holiday_constraints()

        print(f"⚙️ Variables: {len(self.domains)}")
        print(f"🔒 Constraints: {len(self.constraints)}")

    def _initialize_variables(self):
        """Initialize CSP variables (date-shift combinations that need assignments)"""
        self.variables = []
        current_date = self.start_date

        while current_date <= self.end_date:
            day_of_week = current_date.weekday()  # 0=Monday, 6=Sunday

            # Weekday assignments (Monday-Thursday)
            if day_of_week < 4:  # Monday-Thursday
                self.variables.append((current_date, "weekday_call"))
                self.variables.append((current_date, "weekday_moonlight"))

            # Friday assignments
            elif day_of_week == 4:  # Friday
                self.variables.append((current_date, "friday_call"))
                self.variables.append(
                    (current_date, "friday_moonlight")
                )  # Need 2 residents

            # Weekend assignments
            elif day_of_week == 5:  # Saturday (weekend block starts)
                self.variables.append((current_date, "weekend_call"))
                self.variables.append((current_date, "weekend_moonlight"))
                self.variables.append((current_date, "weekend_backup"))

            current_date += timedelta(days=1)

        print(f"📋 Generated {len(self.variables)} variables")

    def _initialize_domains(self):
        """Initialize domains (possible resident assignments for each variable)"""
        self.domains = {}

        for variable in self.variables:
            date_var, shift_type = variable
            eligible_residents = self._get_eligible_residents(date_var, shift_type)
            self.domains[variable] = eligible_residents

        # Special handling for Friday moonlight (needs 2 residents)
        for variable in self.variables:
            date_var, shift_type = variable
            if shift_type == "friday_moonlight":
                # Create two separate variables for Friday moonlight
                self.variables.append((date_var, "friday_moonlight_2"))
                self.domains[(date_var, "friday_moonlight_2")] = self.domains[
                    variable
                ].copy()

    def _get_eligible_residents(
        self, assignment_date: date, shift_type: str
    ) -> List[str]:
        """Get list of residents eligible for a specific shift on a specific date"""
        eligible = []

        for resident in self.residents:
            if self._is_resident_eligible(resident, assignment_date, shift_type):
                eligible.append(resident.id)

        return eligible

    def _is_resident_eligible(
        self, resident: Resident, assignment_date: date, shift_type: str
    ) -> bool:
        """Check if a resident is eligible for a specific assignment"""

        # Check time-off requests
        for start_date, end_date in resident.time_off_requests:
            if start_date <= assignment_date <= end_date:
                return False

        # Check VA rotation weeks
        for start_date, end_date in resident.va_rotation_weeks:
            if start_date <= assignment_date <= end_date:
                return False

        # Check PGY-level specific restrictions
        if resident.pgy_level == "PGY-2":
            # PGY-2s cannot take call or moonlight during first two weeks of July
            if assignment_date.month == 7 and assignment_date.day <= 14:
                if "call" in shift_type or "moonlight" in shift_type:
                    return False

            # PGY-2s cannot moonlight until August 1st
            if assignment_date < date(assignment_date.year, 8, 1):
                if "moonlight" in shift_type:
                    return False

        # Check shift-specific eligibility
        if shift_type == "friday_call":
            # Only PGY-3s can take Friday call (with exceptions in Nov/Feb)
            if assignment_date.month in [11, 2]:  # Exception periods
                return resident.pgy_level in ["PGY-2", "PGY-3"]
            else:
                return resident.pgy_level == "PGY-3"

        elif shift_type == "weekend_call":
            # Weekend call is primarily for PGY-2s
            return resident.pgy_level == "PGY-2"

        elif shift_type in ["weekend_moonlight"]:
            # Weekend moonlight for PGY-3s and PGY-4s
            return resident.pgy_level in ["PGY-3", "PGY-4"]

        elif shift_type == "weekend_backup":
            # Weekend backup should match weekend call PGY level (mostly PGY-2)
            return resident.pgy_level == "PGY-2"

        return True

    def _load_constraints(self):
        """Load constraints from the PM&R rules engine"""
        self.constraints = self.rules_engine.generate_csp_constraints()
        self.objectives = self.rules_engine.generate_csp_objectives()

        print(f"🔒 Loaded {len(self.constraints)} hard constraints")
        print(f"🎯 Loaded {len(self.objectives)} soft objectives")

    def _load_holiday_constraints(self):
        """Load holiday-specific constraints from the dynamic holiday management system"""
        if not self.holiday_requirements:
            return

        holiday_constraints = []

        for holiday_date, requirements in self.holiday_requirements.items():
            if not requirements.get("requires_coverage"):
                continue

            # Constraint: Holiday coverage must be assigned to appropriate PGY level
            def holiday_coverage_constraint(assignment_dict):
                """Ensure holiday coverage meets minimum PGY requirements"""
                holiday_assignments = [
                    (date_shift, resident_id)
                    for (date_shift, resident_id) in assignment_dict.items()
                    if date_shift[0] == holiday_date and "call" in date_shift[1]
                ]

                if not holiday_assignments:
                    return False  # Holiday needs coverage but none assigned

                # Check PGY level requirements
                min_pgy = requirements.get("minimum_pgy_level")
                if min_pgy:
                    for _, resident_id in holiday_assignments:
                        resident = next(
                            (r for r in self.residents if r.id == resident_id), None
                        )
                        if resident and not self._meets_pgy_requirement(
                            resident.pgy_level, min_pgy
                        ):
                            return False

                return True

            holiday_constraints.append(
                {
                    "name": f'holiday_coverage_{holiday_date}_{requirements["holiday_name"]}',
                    "type": "hard",
                    "function": holiday_coverage_constraint,
                    "description": f'Holiday {requirements["holiday_name"]} coverage requirements',
                    "priority": 1,
                }
            )

            # Constraint: Prevent residents from being on vacation during holiday coverage
            def holiday_vacation_conflict(assignment_dict):
                """Prevent residents from working holidays when they have time off"""
                holiday_assignments = [
                    (date_shift, resident_id)
                    for (date_shift, resident_id) in assignment_dict.items()
                    if date_shift[0] == holiday_date and "call" in date_shift[1]
                ]

                for _, resident_id in holiday_assignments:
                    resident = next(
                        (r for r in self.residents if r.id == resident_id), None
                    )
                    if resident:
                        # Check time off requests
                        for start_off, end_off in resident.time_off_requests:
                            if start_off <= holiday_date <= end_off:
                                return False

                        # Check VA rotation conflicts
                        for start_va, end_va in resident.va_rotation_weeks:
                            if start_va <= holiday_date <= end_va:
                                return False

                return True

            holiday_constraints.append(
                {
                    "name": f"holiday_vacation_conflict_{holiday_date}",
                    "type": "hard",
                    "function": holiday_vacation_conflict,
                    "description": f'Prevent vacation conflicts on {requirements["holiday_name"]}',
                    "priority": 1,
                }
            )

        self.constraints.extend(holiday_constraints)
        print(f"🎄 Added {len(holiday_constraints)} holiday-specific constraints")

    def _meets_pgy_requirement(self, resident_pgy: str, required_pgy: str) -> bool:
        """Check if resident PGY level meets minimum requirement"""
        if not required_pgy:
            return True

        # Extract numeric level (PGY-2 -> 2)
        try:
            resident_level = int(resident_pgy.split("-")[1])
            required_level = int(required_pgy.split("-")[1])
            return resident_level >= required_level
        except (IndexError, ValueError):
            return True  # Default to allowing if parsing fails

    def integrate_with_database_models(self):
        """Integrate CSP engine with database models for real-time data"""
        if not self.db_session:
            return

        try:
            # Import here to avoid circular imports
            from ..models import (
                Resident as DBResident,
                AcademicYearHoliday,
                ResidentPreferences,
            )

            # Load residents from database
            db_residents = (
                self.db_session.query(DBResident)
                .filter(DBResident.is_active == True)
                .all()
            )

            # Convert to CSP format
            csp_residents = []
            for db_resident in db_residents:
                # Load preferences if available
                preferences = (
                    self.db_session.query(ResidentPreferences)
                    .filter(ResidentPreferences.resident_id == db_resident.id)
                    .first()
                )

                csp_resident = Resident(
                    id=str(db_resident.id),
                    name=db_resident.name,
                    pgy_level=db_resident.pgy_level,
                    quotas=self._calculate_resident_quotas(db_resident),
                    completed=self._get_completed_assignments(db_resident),
                    time_off_requests=self._get_time_off_requests(db_resident),
                    va_rotation_weeks=self._get_va_rotations(db_resident),
                    preferences=(
                        self._convert_preferences(preferences) if preferences else {}
                    ),
                )
                csp_residents.append(csp_resident)

            self.residents = csp_residents
            print(f"📊 Loaded {len(csp_residents)} residents from database")

        except Exception as e:
            print(f"⚠️ Failed to integrate with database: {e}")

    def _calculate_resident_quotas(self, resident) -> Dict[str, float]:
        """Calculate quotas based on PGY level and program requirements"""
        base_quotas = {
            "weekday_call": 4.0,
            "weekend_call": 2.0,
            "moonlight": 4.0,
            "weekend_moonlight": 2.0,
        }

        # Adjust based on PGY level
        pgy_multipliers = {
            "PGY-1": 0.8,  # Fewer responsibilities
            "PGY-2": 1.0,  # Standard
            "PGY-3": 1.2,  # More responsibilities
            "PGY-4": 1.1,  # Senior level
            "PGY-5": 0.9,  # Chief year, different focus
        }

        multiplier = pgy_multipliers.get(resident.pgy_level, 1.0)
        return {k: v * multiplier for k, v in base_quotas.items()}

    def _get_completed_assignments(self, resident) -> Dict[str, float]:
        """Get already completed assignments for this resident"""
        # This would query the Assignment table in a real implementation
        return {
            "weekday_call": 0.0,
            "weekend_call": 0.0,
            "moonlight": 0.0,
            "weekend_moonlight": 0.0,
        }

    def _get_time_off_requests(self, resident) -> List[Tuple[date, date]]:
        """Get approved time off requests for resident"""
        time_off = []
        for request in resident.time_off_requests:
            if request.status == "approved":
                time_off.append((request.start_date, request.end_date))
        return time_off

    def _get_va_rotations(self, resident) -> List[Tuple[date, date]]:
        """Get VA rotation periods for resident"""
        # This would be loaded from rotation schedule in a real implementation
        return []

    def _convert_preferences(self, preferences) -> Dict[str, int]:
        """Convert database preferences to CSP format"""
        if not preferences:
            return {}

        # Convert preference structures to simple day preferences
        day_preferences = {}

        # Extract call preferences
        call_prefs = preferences.call_preferences or {}
        if "preferred_days" in call_prefs:
            for day in call_prefs["preferred_days"]:
                day_preferences[day.lower()] = 3  # High preference

        if "avoid_days" in call_prefs:
            for day in call_prefs["avoid_days"]:
                day_preferences[day.lower()] = 1  # Low preference

        return day_preferences

    def generate_schedule(self) -> Tuple[List[Assignment], Dict[str, Any]]:
        """
        Generate optimal schedule using CSP with backtracking
        Returns: (schedule, statistics)
        """
        print("\n🚀 Starting CSP schedule generation...")

        # Reset statistics
        self.stats = {
            "assignments_tried": 0,
            "backtracks": 0,
            "constraint_checks": 0,
            "solutions_found": 0,
            "start_time": datetime.now(),
        }

        # Initialize assignment tracking
        self.current_assignments = {}
        self.assignment_history = []

        # Sort variables by constraint count (most constrained first)
        sorted_variables = self._sort_variables_by_constraints()

        # Start CSP solving with backtracking
        solution = self._backtrack_search(sorted_variables, 0)

        self.stats["end_time"] = datetime.now()
        self.stats["duration"] = (
            self.stats["end_time"] - self.stats["start_time"]
        ).total_seconds()

        if solution:
            print(f"✅ Schedule generated successfully!")
            schedule = self._convert_solution_to_schedule(solution)
            self.stats["solutions_found"] = 1
            return schedule, self.stats
        else:
            print(f"❌ No valid schedule found")
            return [], self.stats

    def _sort_variables_by_constraints(self) -> List[Tuple]:
        """Sort variables by constraint degree (most constrained first)"""
        variable_constraints = {}

        for variable in self.variables:
            constraint_count = 0
            for constraint in self.constraints:
                if self._variable_affects_constraint(variable, constraint):
                    constraint_count += 1
            variable_constraints[variable] = constraint_count

        # Sort by constraint count (descending) then by domain size (ascending)
        sorted_vars = sorted(
            self.variables,
            key=lambda v: (-variable_constraints[v], len(self.domains[v])),
        )

        return sorted_vars

    def _variable_affects_constraint(self, variable: Tuple, constraint: Dict) -> bool:
        """Check if a variable affects a constraint"""
        date_var, shift_type = variable
        constraint_type = constraint.get("type", "")

        # Simple heuristic - most constraints affect most variables
        return True

    def _backtrack_search(self, variables: List[Tuple], depth: int) -> Optional[Dict]:
        """
        Backtracking search with constraint propagation
        """
        if depth >= len(variables):
            # All variables assigned - check if solution is complete and valid
            if self._is_complete_solution():
                return self.current_assignments.copy()
            return None

        if self.stats["assignments_tried"] > self.max_iterations:
            print(f"⏱️ Max iterations reached: {self.max_iterations}")
            return None

        variable = variables[depth]
        date_var, shift_type = variable

        # Get current domain for this variable
        domain = self._get_current_domain(variable)

        # Try each possible assignment
        for resident_id in domain:
            self.stats["assignments_tried"] += 1

            # Make assignment
            assignment = Assignment(
                date_var,
                resident_id,
                shift_type,
                self._get_resident_pgy_level(resident_id),
            )

            if self._is_assignment_valid(assignment):
                # Add assignment
                self.current_assignments[variable] = assignment
                self.assignment_history.append((variable, assignment))

                # Forward checking - reduce domains of future variables
                domain_changes = self._forward_check(variable, assignment)

                # Recursive call
                result = self._backtrack_search(variables, depth + 1)

                if result is not None:
                    return result

                # Backtrack - undo assignment and domain changes
                self.stats["backtracks"] += 1
                del self.current_assignments[variable]
                self.assignment_history.pop()
                self._undo_domain_changes(domain_changes)

        return None

    def _get_current_domain(self, variable: Tuple) -> List[str]:
        """Get current domain for a variable (may be reduced by forward checking)"""
        return self.domains[variable].copy()

    def _get_resident_pgy_level(self, resident_id: str) -> str:
        """Get PGY level for a resident"""
        for resident in self.residents:
            if resident.id == resident_id:
                return resident.pgy_level
        return "Unknown"

    def _is_assignment_valid(self, assignment: Assignment) -> bool:
        """Check if an assignment is valid given current partial solution"""
        self.stats["constraint_checks"] += 1

        # Check against all hard constraints
        temp_schedule = list(self.current_assignments.values()) + [assignment]

        # Basic conflict checks
        if not self._check_no_same_day_conflicts(
            temp_schedule, assignment.date, assignment.resident_id
        ):
            return False

        if not self._check_post_call_restrictions(temp_schedule, assignment):
            return False

        if not self._check_consecutive_call_restrictions(temp_schedule, assignment):
            return False

        if not self._check_weekly_limits(temp_schedule, assignment):
            return False

        return True

    def _check_no_same_day_conflicts(
        self, schedule: List[Assignment], check_date: date, resident_id: str
    ) -> bool:
        """Check no resident works call and moonlight same day"""
        same_day_assignments = [
            a for a in schedule if a.date == check_date and a.resident_id == resident_id
        ]

        has_call = any("call" in a.shift_type for a in same_day_assignments)
        has_moonlight = any("moonlight" in a.shift_type for a in same_day_assignments)

        return not (has_call and has_moonlight)

    def _check_post_call_restrictions(
        self, schedule: List[Assignment], assignment: Assignment
    ) -> bool:
        """Check no moonlight day after call"""
        if "moonlight" not in assignment.shift_type:
            return True

        previous_day = assignment.date - timedelta(days=1)
        previous_assignments = [
            a
            for a in schedule
            if a.date == previous_day and a.resident_id == assignment.resident_id
        ]

        has_previous_call = any("call" in a.shift_type for a in previous_assignments)
        return not has_previous_call

    def _check_consecutive_call_restrictions(
        self, schedule: List[Assignment], assignment: Assignment
    ) -> bool:
        """Check no consecutive calls except weekend blocks"""
        if "call" not in assignment.shift_type:
            return True

        # Exception for Saturday-Sunday weekend blocks
        if (
            assignment.shift_type == "weekend_call" and assignment.date.weekday() == 6
        ):  # Sunday
            return True

        previous_day = assignment.date - timedelta(days=1)
        previous_assignments = [
            a
            for a in schedule
            if a.date == previous_day and a.resident_id == assignment.resident_id
        ]

        has_previous_call = any("call" in a.shift_type for a in previous_assignments)
        return not has_previous_call

    def _check_weekly_limits(
        self, schedule: List[Assignment], assignment: Assignment
    ) -> bool:
        """Check resident doesn't exceed 2 shifts per week"""
        week_start = assignment.date - timedelta(days=assignment.date.weekday())
        week_end = week_start + timedelta(days=6)

        week_assignments = [
            a
            for a in schedule
            if week_start <= a.date <= week_end
            and a.resident_id == assignment.resident_id
        ]

        return len(week_assignments) <= 2

    def _forward_check(self, variable: Tuple, assignment: Assignment) -> List[Tuple]:
        """
        Forward checking - reduce domains of future variables based on new assignment
        Returns list of domain changes for backtracking
        """
        domain_changes = []

        # For each unassigned variable, check if assignment affects its domain
        for other_variable in self.variables:
            if other_variable in self.current_assignments:
                continue

            other_date, other_shift = other_variable
            original_domain = self.domains[other_variable].copy()

            # Remove residents that would violate constraints
            new_domain = []
            for resident_id in self.domains[other_variable]:
                temp_assignment = Assignment(
                    other_date,
                    resident_id,
                    other_shift,
                    self._get_resident_pgy_level(resident_id),
                )

                if self._would_assignment_be_valid_with_current(temp_assignment):
                    new_domain.append(resident_id)

            if len(new_domain) < len(original_domain):
                domain_changes.append((other_variable, original_domain, new_domain))
                self.domains[other_variable] = new_domain

        return domain_changes

    def _would_assignment_be_valid_with_current(
        self, test_assignment: Assignment
    ) -> bool:
        """Check if a future assignment would be valid with current assignments"""
        temp_schedule = list(self.current_assignments.values()) + [test_assignment]

        # Quick constraint checks
        if not self._check_no_same_day_conflicts(
            temp_schedule, test_assignment.date, test_assignment.resident_id
        ):
            return False

        if not self._check_weekly_limits(temp_schedule, test_assignment):
            return False

        return True

    def _undo_domain_changes(self, domain_changes: List[Tuple]):
        """Undo domain changes made during forward checking"""
        for variable, original_domain, _ in domain_changes:
            self.domains[variable] = original_domain

    def _is_complete_solution(self) -> bool:
        """Check if current solution covers all required assignments"""

        # Check that we have assignments for all variables
        if len(self.current_assignments) != len(self.variables):
            return False

        # Check coverage requirements
        current_date = self.start_date
        while current_date <= self.end_date:
            if not self._check_daily_coverage(current_date):
                return False
            current_date += timedelta(days=1)

        return True

    def _check_daily_coverage(self, check_date: date) -> bool:
        """Check that a specific date has proper coverage"""
        day_assignments = [
            a for a in self.current_assignments.values() if a.date == check_date
        ]
        day_of_week = check_date.weekday()

        # Monday-Thursday: need weekday call + weekday moonlight
        if day_of_week < 4:
            has_call = any(a.shift_type == "weekday_call" for a in day_assignments)
            has_moonlight = any(
                a.shift_type == "weekday_moonlight" for a in day_assignments
            )
            return has_call and has_moonlight

        # Friday: need friday call + 2 friday moonlight
        elif day_of_week == 4:
            has_call = any(a.shift_type == "friday_call" for a in day_assignments)
            moonlight_count = len(
                [a for a in day_assignments if "friday_moonlight" in a.shift_type]
            )
            return has_call and moonlight_count == 2

        # Saturday: need weekend call + weekend moonlight + weekend backup
        elif day_of_week == 5:
            has_call = any(a.shift_type == "weekend_call" for a in day_assignments)
            has_moonlight = any(
                a.shift_type == "weekend_moonlight" for a in day_assignments
            )
            has_backup = any(a.shift_type == "weekend_backup" for a in day_assignments)
            return has_call and has_moonlight and has_backup

        # Sunday: covered by Saturday weekend assignments
        return True

    def _convert_solution_to_schedule(self, solution: Dict) -> List[Assignment]:
        """Convert CSP solution to schedule format"""
        schedule = list(solution.values())

        # Sort by date
        schedule.sort(key=lambda a: a.date)

        return schedule

    def validate_generated_schedule(
        self, schedule: List[Assignment]
    ) -> Tuple[List[str], List[str], Dict]:
        """
        Validate generated schedule against all PM&R rules
        Returns: (hard_violations, soft_violations, validation_details)
        """
        print("\n🔍 Validating generated schedule...")

        hard_violations = []
        soft_violations = []
        validation_details = {
            "total_assignments": len(schedule),
            "coverage_check": {},
            "quota_check": {},
            "conflict_check": {},
            "preference_score": 0,
        }

        # Check daily coverage
        coverage_violations = self._validate_daily_coverage(schedule)
        hard_violations.extend(coverage_violations)
        validation_details["coverage_check"] = {"violations": len(coverage_violations)}

        # Check quota progress
        quota_violations = self._validate_quota_progress(schedule)
        soft_violations.extend(quota_violations)
        validation_details["quota_check"] = {"violations": len(quota_violations)}

        # Check conflicts
        conflict_violations = self._validate_conflicts(schedule)
        hard_violations.extend(conflict_violations)
        validation_details["conflict_check"] = {"violations": len(conflict_violations)}

        # Calculate preference score
        preference_score = self._calculate_preference_score(schedule)
        validation_details["preference_score"] = preference_score

        print(f"✅ Validation complete:")
        print(f"   Hard violations: {len(hard_violations)}")
        print(f"   Soft violations: {len(soft_violations)}")
        print(f"   Preference score: {preference_score:.1f}%")

        return hard_violations, soft_violations, validation_details

    def _validate_daily_coverage(self, schedule: List[Assignment]) -> List[str]:
        """Validate daily coverage requirements"""
        violations = []

        current_date = self.start_date
        while current_date <= self.end_date:
            if not self._check_daily_coverage_for_validation(schedule, current_date):
                violations.append(f"Insufficient coverage on {current_date}")
            current_date += timedelta(days=1)

        return violations

    def _check_daily_coverage_for_validation(
        self, schedule: List[Assignment], check_date: date
    ) -> bool:
        """Check daily coverage for validation"""
        day_assignments = [a for a in schedule if a.date == check_date]
        day_of_week = check_date.weekday()

        if day_of_week < 4:  # Monday-Thursday
            has_call = any(a.shift_type == "weekday_call" for a in day_assignments)
            has_moonlight = any(
                a.shift_type == "weekday_moonlight" for a in day_assignments
            )
            return has_call and has_moonlight

        elif day_of_week == 4:  # Friday
            has_call = any(a.shift_type == "friday_call" for a in day_assignments)
            moonlight_count = len(
                [a for a in day_assignments if "friday_moonlight" in a.shift_type]
            )
            return has_call and moonlight_count >= 2

        elif day_of_week == 5:  # Saturday
            has_call = any(a.shift_type == "weekend_call" for a in day_assignments)
            has_moonlight = any(
                a.shift_type == "weekend_moonlight" for a in day_assignments
            )
            has_backup = any(a.shift_type == "weekend_backup" for a in day_assignments)
            return has_call and has_moonlight and has_backup

        return True

    def _validate_quota_progress(self, schedule: List[Assignment]) -> List[str]:
        """Validate quota progress for each resident"""
        violations = []

        # Calculate expected progress based on date range
        total_days = (self.end_date - self.start_date).days + 1
        progress_ratio = total_days / 365.0  # Rough progress through year

        for resident in self.residents:
            resident_assignments = [a for a in schedule if a.resident_id == resident.id]

            # Count assignments by type
            assignment_counts = defaultdict(int)
            for assignment in resident_assignments:
                if (
                    "call" in assignment.shift_type
                    and "weekend" not in assignment.shift_type
                ):
                    assignment_counts["weekday_call"] += 1
                elif assignment.shift_type == "weekend_call":
                    assignment_counts["weekend_call"] += 1
                elif "moonlight" in assignment.shift_type:
                    assignment_counts["moonlight"] += 1

            # Check against quotas
            quotas = self.rules_engine.get_quotas_for_pgy_level(resident.pgy_level)
            for quota_type, expected_total in quotas.items():
                if quota_type.endswith("_max"):
                    continue

                current_count = assignment_counts.get(quota_type, 0)
                completed_count = resident.completed.get(quota_type, 0)
                total_count = current_count + completed_count

                expected_by_now = expected_total * progress_ratio

                if total_count < expected_by_now * 0.8:  # 20% tolerance
                    violations.append(
                        f"{resident.name} behind on {quota_type}: {total_count:.1f}/{expected_by_now:.1f}"
                    )

        return violations

    def _validate_conflicts(self, schedule: List[Assignment]) -> List[str]:
        """Validate conflict rules"""
        violations = []

        # Group assignments by resident and date
        resident_date_assignments = defaultdict(list)
        for assignment in schedule:
            resident_date_assignments[(assignment.resident_id, assignment.date)].append(
                assignment
            )

        # Check for same-day conflicts
        for (resident_id, date), assignments in resident_date_assignments.items():
            has_call = any("call" in a.shift_type for a in assignments)
            has_moonlight = any("moonlight" in a.shift_type for a in assignments)

            if has_call and has_moonlight:
                resident_name = next(
                    r.name for r in self.residents if r.id == resident_id
                )
                violations.append(
                    f"{resident_name} has both call and moonlight on {date}"
                )

        return violations

    def _calculate_preference_score(self, schedule: List[Assignment]) -> float:
        """Calculate how well the schedule accommodates resident preferences"""
        total_score = 0
        total_possible = 0

        for assignment in schedule:
            resident = next(r for r in self.residents if r.id == assignment.resident_id)
            day_name = assignment.date.strftime("%A").lower()

            if day_name in resident.preferences:
                preference_score = resident.preferences[day_name]
                total_score += preference_score
                total_possible += 5  # Assuming 1-5 preference scale

        if total_possible == 0:
            return 100.0

        return (total_score / total_possible) * 100.0

    def export_schedule(self, schedule: List[Assignment], filename: str = None) -> Dict:
        """Export schedule to JSON format"""
        if filename is None:
            filename = f"pmr_schedule_{self.start_date}_{self.end_date}.json"

        # Convert schedule to exportable format
        schedule_data = []
        for assignment in schedule:
            schedule_data.append(
                {
                    "date": assignment.date.isoformat(),
                    "resident_id": assignment.resident_id,
                    "resident_name": next(
                        r.name for r in self.residents if r.id == assignment.resident_id
                    ),
                    "pgy_level": assignment.pgy_level,
                    "shift_type": assignment.shift_type,
                    "day_of_week": assignment.date.strftime("%A"),
                }
            )

        export_data = {
            "metadata": {
                "generated_on": datetime.now().isoformat(),
                "start_date": self.start_date.isoformat(),
                "end_date": self.end_date.isoformat(),
                "total_assignments": len(schedule),
                "residents": len(self.residents),
                "algorithm": "CSP with Backtracking",
            },
            "residents": [
                {
                    "id": r.id,
                    "name": r.name,
                    "pgy_level": r.pgy_level,
                    "quotas": r.quotas,
                    "completed": r.completed,
                }
                for r in self.residents
            ],
            "schedule": schedule_data,
            "statistics": self.stats,
        }

        # Save to file
        with open(filename, "w") as f:
            json.dump(export_data, f, indent=2)

        print(f"📁 Schedule exported to {filename}")
        return export_data

    def print_schedule_summary(self, schedule: List[Assignment]):
        """Print a human-readable schedule summary"""
        print("\n📋 Schedule Summary")
        print("=" * 50)

        # Group by date
        schedule_by_date = defaultdict(list)
        for assignment in schedule:
            schedule_by_date[assignment.date].append(assignment)

        # Print schedule
        for date in sorted(schedule_by_date.keys()):
            day_name = date.strftime("%A")
            assignments = schedule_by_date[date]

            print(f"\n{date} ({day_name}):")
            for assignment in assignments:
                resident_name = next(
                    r.name for r in self.residents if r.id == assignment.resident_id
                )
                print(
                    f"  {assignment.shift_type}: {resident_name} ({assignment.pgy_level})"
                )

        # Print statistics
        print(f"\n📊 Statistics:")
        print(f"Total assignments: {len(schedule)}")
        print(f"Generation time: {self.stats.get('duration', 0):.2f} seconds")
        print(f"Assignments tried: {self.stats.get('assignments_tried', 0)}")
        print(f"Backtracks: {self.stats.get('backtracks', 0)}")
        print(f"Constraint checks: {self.stats.get('constraint_checks', 0)}")


def create_sample_residents() -> List[Resident]:
    """Create sample residents for testing"""
    return [
        Resident(
            id="r1",
            name="Adam Girmann",
            pgy_level="PGY-2",
            quotas={"weekday_call": 38, "weekend_call": 7.5, "moonlight": 21},
            completed={"weekday_call": 15, "weekend_call": 3, "moonlight": 8},
            time_off_requests=[(date(2025, 8, 15), date(2025, 8, 16))],
            va_rotation_weeks=[],
            holiday_approved=True,
            preferences={"thursday": 4, "friday": 2},
        ),
        Resident(
            id="r2",
            name="Ian Kinney",
            pgy_level="PGY-2",
            quotas={"weekday_call": 38, "weekend_call": 7.5, "moonlight": 21},
            completed={"weekday_call": 12, "weekend_call": 2, "moonlight": 6},
            time_off_requests=[],
            va_rotation_weeks=[(date(2025, 8, 20), date(2025, 8, 26))],
            holiday_approved=False,
            preferences={"monday": 3, "wednesday": 4},
        ),
        Resident(
            id="r3",
            name="Bobby McBride",
            pgy_level="PGY-2",
            quotas={"weekday_call": 38, "weekend_call": 7.5, "moonlight": 21},
            completed={"weekday_call": 14, "weekend_call": 2.5, "moonlight": 7},
            time_off_requests=[],
            va_rotation_weeks=[],
            holiday_approved=True,
            preferences={"tuesday": 5, "friday": 1},
        ),
        Resident(
            id="r4",
            name="Leah Flanagan",
            pgy_level="PGY-2",
            quotas={"weekday_call": 38, "weekend_call": 7.5, "moonlight": 21},
            completed={"weekday_call": 13, "weekend_call": 2, "moonlight": 5},
            time_off_requests=[(date(2025, 8, 25), date(2025, 8, 27))],
            va_rotation_weeks=[],
            holiday_approved=False,
            preferences={"thursday": 3, "monday": 2},
        ),
        Resident(
            id="r5",
            name="Alexis Smith",
            pgy_level="PGY-2",
            quotas={"weekday_call": 38, "weekend_call": 7.5, "moonlight": 21},
            completed={"weekday_call": 11, "weekend_call": 3, "moonlight": 9},
            time_off_requests=[],
            va_rotation_weeks=[],
            holiday_approved=True,
            preferences={"wednesday": 4, "friday": 3},
        ),
        Resident(
            id="r6",
            name="Chidera",
            pgy_level="PGY-3",
            quotas={"weekday_call": 30, "weekend_call": 2.5, "moonlight": 27},
            completed={"weekday_call": 18, "weekend_call": 1, "moonlight": 15},
            time_off_requests=[],
            va_rotation_weeks=[],
            holiday_approved=True,
            preferences={"friday": 5, "tuesday": 3},
        ),
        Resident(
            id="r7",
            name="Daniel DeSimon",
            pgy_level="PGY-3",
            quotas={"weekday_call": 30, "weekend_call": 2.5, "moonlight": 27},
            completed={"weekday_call": 16, "weekend_call": 1, "moonlight": 14},
            time_off_requests=[(date(2025, 8, 10), date(2025, 8, 12))],
            va_rotation_weeks=[],
            holiday_approved=False,
            preferences={"friday": 4, "monday": 2},
        ),
        Resident(
            id="r8",
            name="Nic Brandt",
            pgy_level="PGY-3",
            quotas={"weekday_call": 30, "weekend_call": 2.5, "moonlight": 27},
            completed={"weekday_call": 19, "weekend_call": 1.5, "moonlight": 16},
            time_off_requests=[],
            va_rotation_weeks=[],
            holiday_approved=True,
            preferences={"friday": 3, "wednesday": 4},
        ),
        Resident(
            id="r9",
            name="Emily Rothermel",
            pgy_level="PGY-4",
            quotas={"weekday_call": 5, "weekend_call": 0.5, "moonlight": 27},
            completed={"weekday_call": 2, "weekend_call": 0, "moonlight": 15},
            time_off_requests=[],
            va_rotation_weeks=[],
            holiday_approved=True,
            preferences={"monday": 4, "tuesday": 3},
        ),
        Resident(
            id="r10",
            name="Natalie Brush",
            pgy_level="PGY-4",
            quotas={"weekday_call": 5, "weekend_call": 0.5, "moonlight": 27},
            completed={"weekday_call": 3, "weekend_call": 0.5, "moonlight": 14},
            time_off_requests=[(date(2025, 8, 18), date(2025, 8, 19))],
            va_rotation_weeks=[],
            holiday_approved=False,
            preferences={"tuesday": 5, "thursday": 2},
        ),
    ]


def main():
    """Main function to demonstrate CSP scheduling engine"""
    print("🏥 PM&R CSP Scheduling Engine Demo")
    print("=" * 40)

    # Import and initialize rules engine
    try:
        from pmr_rules_engine import PMRSchedulingRules

        rules_engine = PMRSchedulingRules()
        print("✅ PM&R Rules Engine loaded")
    except ImportError:
        print("❌ Could not import PMRSchedulingRules")
        print("Make sure pmr_rules_engine.py is in the same directory")
        return

    # Initialize CSP engine
    csp_engine = CSPSchedulingEngine(rules_engine)
    print("✅ CSP Engine initialized")

    # Create sample residents
    residents = create_sample_residents()
    print(f"✅ Created {len(residents)} sample residents")

    # Set schedule parameters
    start_date = date(2025, 8, 1)  # August 1st, 2025
    end_date = date(2025, 8, 31)  # August 31st, 2025

    print(f"📅 Generating schedule from {start_date} to {end_date}")

    # Setup schedule generation
    csp_engine.setup_schedule_generation(residents, start_date, end_date)

    # Generate schedule
    schedule, stats = csp_engine.generate_schedule()

    if schedule:
        print(f"\n🎉 Schedule generated successfully!")

        # Print schedule summary
        csp_engine.print_schedule_summary(schedule)

        # Validate schedule
        hard_violations, soft_violations, validation_details = (
            csp_engine.validate_generated_schedule(schedule)
        )

        print(f"\n🔍 Validation Results:")
        print(f"Hard violations: {len(hard_violations)}")
        print(f"Soft violations: {len(soft_violations)}")

        if hard_violations:
            print("Hard violations found:")
            for violation in hard_violations[:5]:  # Show first 5
                print(f"  ❌ {violation}")

        if soft_violations:
            print("Soft violations found:")
            for violation in soft_violations[:5]:  # Show first 5
                print(f"  ⚠️ {violation}")

        # Export schedule
        export_data = csp_engine.export_schedule(schedule)
        print(f"📁 Schedule exported successfully")

        # Show quota progress
        print(f"\n📊 Quota Progress Summary:")
        for resident in residents:
            resident_assignments = [a for a in schedule if a.resident_id == resident.id]
            call_count = len(
                [
                    a
                    for a in resident_assignments
                    if "call" in a.shift_type and "weekend" not in a.shift_type
                ]
            )
            moonlight_count = len(
                [a for a in resident_assignments if "moonlight" in a.shift_type]
            )

            print(
                f"{resident.name} ({resident.pgy_level}): {call_count} calls, {moonlight_count} moonlights"
            )

    else:
        print(f"\n❌ No valid schedule found")
        print(f"Statistics: {stats}")

        print(f"\n🔧 Troubleshooting suggestions:")
        print(f"1. Reduce constraints or increase flexibility")
        print(f"2. Check for conflicting time-off requests")
        print(f"3. Verify resident quotas are achievable")
        print(f"4. Increase max_iterations in CSP engine")


if __name__ == "__main__":
    main()
