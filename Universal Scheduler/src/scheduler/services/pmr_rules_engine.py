"""
PM&R Specific Scheduling Rules Engine
Hard-coded rules based on actual PM&R program requirements
"""

from datetime import datetime, timedelta
from typing import List, Dict, Any, Tuple
import calendar


class PMRSchedulingRules:
    """
    Hard-coded PM&R scheduling rules based on documented requirements
    """

    def __init__(self):
        self.hard_rules = []
        self.soft_rules = []
        self.quotas = {}
        self.special_periods = {}

        # Initialize all rules
        self._setup_hard_rules()
        self._setup_soft_rules()
        self._setup_quotas()
        self._setup_special_periods()

    def _setup_hard_rules(self):
        """Define all hard rules that cannot be violated"""

        # Basic Assignment Rules
        self.hard_rules.extend(
            [
                {
                    "id": "H001",
                    "name": "Weekday Call Coverage",
                    "description": "One resident assigned to each weekday call shift (Monday–Friday)",
                    "constraint_type": "COVERAGE",
                    "formula": "ASSIGN exactly 1 resident to weekday_call for each [Monday, Tuesday, Wednesday, Thursday, Friday]",
                    "validation_function": self._validate_weekday_call_coverage,
                },
                {
                    "id": "H002",
                    "name": "Weekday Moonlight Coverage",
                    "description": "One resident assigned to each weekday moonlight shift (Monday–Thursday)",
                    "constraint_type": "COVERAGE",
                    "formula": "ASSIGN exactly 1 resident to weekday_moonlight for each [Monday, Tuesday, Wednesday, Thursday]",
                    "validation_function": self._validate_weekday_moonlight_coverage,
                },
                {
                    "id": "H003",
                    "name": "Friday Moonlight Double Coverage",
                    "description": "Two residents assigned to Friday moonlight shifts",
                    "constraint_type": "COVERAGE",
                    "formula": "ASSIGN exactly 2 residents to friday_moonlight for each Friday",
                    "validation_function": self._validate_friday_moonlight_coverage,
                },
                {
                    "id": "H004",
                    "name": "Weekend Call Assignment",
                    "description": "One PGY-2 assigned to weekend call (Saturday–Sunday as block)",
                    "constraint_type": "COVERAGE",
                    "formula": "ASSIGN exactly 1 PGY-2 resident to weekend_call for each [Saturday-Sunday block]",
                    "validation_function": self._validate_weekend_call_assignment,
                },
                {
                    "id": "H005",
                    "name": "Weekend Moonlight Assignment",
                    "description": "One PGY-3 or PGY-4 assigned to weekend moonlight (Saturday + Sunday)",
                    "constraint_type": "COVERAGE",
                    "formula": "ASSIGN exactly 1 [PGY-3 OR PGY-4] resident to weekend_moonlight for each weekend",
                    "validation_function": self._validate_weekend_moonlight_assignment,
                },
                {
                    "id": "H006",
                    "name": "Weekend Backup Assignment",
                    "description": "One weekend backup call resident must be assigned (same PGY level as weekend call, different person)",
                    "constraint_type": "COVERAGE",
                    "formula": "ASSIGN exactly 1 resident to weekend_backup WHERE pgy_level = weekend_call.pgy_level AND resident != weekend_call.resident",
                    "validation_function": self._validate_weekend_backup_assignment,
                },
            ]
        )

        # PGY-Level Restrictions
        self.hard_rules.extend(
            [
                {
                    "id": "H007",
                    "name": "PGY-2 July Call Restriction",
                    "description": "PGY-2s cannot take call or moonlight during first two weeks of July",
                    "constraint_type": "PROHIBITION",
                    "formula": "FOR PGY-2 residents: NOT assigned_to([call, moonlight]) WHEN date IN [July 1-14]",
                    "validation_function": self._validate_pgy2_july_restriction,
                },
                {
                    "id": "H008",
                    "name": "PGY-2 Moonlight Start Date",
                    "description": "PGY-2s cannot moonlight until August 1st",
                    "constraint_type": "PROHIBITION",
                    "formula": "FOR PGY-2 residents: NOT assigned_to(moonlight) WHEN date < August 1st",
                    "validation_function": self._validate_pgy2_moonlight_start,
                },
                {
                    "id": "H009",
                    "name": "PGY-2 First Moonlight Orientation",
                    "description": "PGY-2s must have their first moonlight shift on Friday, paired with PGY-3 or PGY-4 for orientation",
                    "constraint_type": "REQUIREMENT",
                    "formula": "FOR PGY-2 residents: first_moonlight_shift MUST BE friday_moonlight AND paired_with([PGY-3, PGY-4])",
                    "validation_function": self._validate_pgy2_first_moonlight,
                },
                {
                    "id": "H010",
                    "name": "Friday Call PGY Restriction",
                    "description": "Only PGY-3s can take Friday call shifts (except during PGY-3 weekend blocks Nov/Feb when PGY-2s cover)",
                    "constraint_type": "ELIGIBILITY",
                    "formula": "FOR friday_call: ASSIGN only PGY-3 residents EXCEPT during [November_weekends, February_weekends] THEN allow PGY-2",
                    "validation_function": self._validate_friday_call_eligibility,
                },
                {
                    "id": "H011",
                    "name": "PGY-4 Split Weekend Participation",
                    "description": "PGY-4s participate in exactly one split weekend as orientation support for PGY-2",
                    "constraint_type": "QUOTA",
                    "formula": "FOR PGY-4 residents: COUNT(split_weekend_participation) = 1 per year",
                    "validation_function": self._validate_pgy4_split_weekend,
                },
            ]
        )

        # Conflict Prevention Rules
        self.hard_rules.extend(
            [
                {
                    "id": "H012",
                    "name": "No Same Day Call and Moonlight",
                    "description": "No resident can work both call and moonlight on same day",
                    "constraint_type": "CONFLICT",
                    "formula": "FOR all residents: NOT (assigned_to(call) AND assigned_to(moonlight)) on same_date",
                    "validation_function": self._validate_no_same_day_call_moonlight,
                },
                {
                    "id": "H013",
                    "name": "Post-Call Moonlight Restriction",
                    "description": "No resident can work moonlight the day after a call shift (post-call restriction)",
                    "constraint_type": "SPACING",
                    "formula": "FOR all residents: NOT assigned_to(moonlight) WHEN previous_day = call_shift",
                    "validation_function": self._validate_post_call_restriction,
                },
                {
                    "id": "H014",
                    "name": "No Consecutive Call Shifts",
                    "description": "No resident can work call shifts on consecutive days (except Saturday–Sunday weekend block)",
                    "constraint_type": "SPACING",
                    "formula": "FOR all residents: NOT assigned_to(call) on consecutive_days EXCEPT weekend_block(Saturday-Sunday)",
                    "validation_function": self._validate_no_consecutive_calls,
                },
                {
                    "id": "H015",
                    "name": "No Moonlight After Call Next Day",
                    "description": "No resident can work moonlight followed by call shift the next day",
                    "constraint_type": "SPACING",
                    "formula": "FOR all residents: NOT (moonlight_today AND call_tomorrow)",
                    "validation_function": self._validate_no_moonlight_before_call,
                },
                {
                    "id": "H016",
                    "name": "No Call and Backup Same Weekend",
                    "description": "No resident can work call and backup on same weekend",
                    "constraint_type": "CONFLICT",
                    "formula": "FOR all residents: NOT (weekend_call AND weekend_backup) on same_weekend",
                    "validation_function": self._validate_no_call_backup_same_weekend,
                },
                {
                    "id": "H017",
                    "name": "Friday Call Weekend Restriction",
                    "description": "No resident should work Friday call followed by weekend call or backup",
                    "constraint_type": "SPACING",
                    "formula": "FOR all residents: NOT (friday_call AND [weekend_call OR weekend_backup]) on consecutive_days",
                    "validation_function": self._validate_friday_weekend_restriction,
                },
            ]
        )

        # Annual Quota Requirements
        self.hard_rules.extend(
            [
                {
                    "id": "H018",
                    "name": "PGY-2 Annual Quotas",
                    "description": "PGY-2s must complete: 38 weekday call, 7.5 weekend call, 21 weekday-only moonlight",
                    "constraint_type": "QUOTA",
                    "formula": "FOR PGY-2 residents: weekday_call = 38 AND weekend_call = 7.5 AND moonlight = 21 per year",
                    "validation_function": self._validate_pgy2_quotas,
                },
                {
                    "id": "H019",
                    "name": "PGY-3 Annual Quotas",
                    "description": "PGY-3s must complete: 30 weekday call, 2.5 weekend call, 27 moonlight (including weekends)",
                    "constraint_type": "QUOTA",
                    "formula": "FOR PGY-3 residents: weekday_call = 30 AND weekend_call = 2.5 AND moonlight = 27 per year",
                    "validation_function": self._validate_pgy3_quotas,
                },
                {
                    "id": "H020",
                    "name": "PGY-4 Annual Quotas",
                    "description": "PGY-4s must complete: 5 weekday call, 0.5 weekend call, 27-28 moonlight (including weekends)",
                    "constraint_type": "QUOTA",
                    "formula": "FOR PGY-4 residents: weekday_call = 5 AND weekend_call = 0.5 AND moonlight = [27, 28] per year",
                    "validation_function": self._validate_pgy4_quotas,
                },
            ]
        )

        # Time-Off and Holiday Rules
        self.hard_rules.extend(
            [
                {
                    "id": "H021",
                    "name": "Time-Off Request Compliance",
                    "description": "Residents with time-off requests must not be scheduled on requested dates",
                    "constraint_type": "PROHIBITION",
                    "formula": "FOR all residents: NOT assigned_to(any_shift) WHEN date IN time_off_requests",
                    "validation_function": self._validate_time_off_compliance,
                },
                {
                    "id": "H022",
                    "name": "VA Rotation Restriction",
                    "description": "Residents cannot be scheduled during VA rotation weeks",
                    "constraint_type": "PROHIBITION",
                    "formula": "FOR all residents: NOT assigned_to(any_shift) WHEN week IN va_rotation_weeks",
                    "validation_function": self._validate_va_rotation_restriction,
                },
                {
                    "id": "H023",
                    "name": "Federal Holiday Coverage",
                    "description": "Federal holidays: Only residents listed for holiday coverage (Main/Mt Holly/Northeast) may work",
                    "constraint_type": "ELIGIBILITY",
                    "formula": "FOR federal_holidays: ASSIGN only residents WHERE holiday_approved = true",
                    "validation_function": self._validate_holiday_coverage_eligibility,
                },
                {
                    "id": "H024",
                    "name": "Holiday Weekend Coverage",
                    "description": "Holiday weekends: The weekend closest to a federal holiday also requires holiday-approved residents",
                    "constraint_type": "ELIGIBILITY",
                    "formula": "FOR holiday_weekends: ASSIGN only residents WHERE holiday_approved = true",
                    "validation_function": self._validate_holiday_weekend_coverage,
                },
                {
                    "id": "H025",
                    "name": "Holiday Weekend Time-Off Restriction",
                    "description": "No residents with time-off requests during holiday weekend may be scheduled that weekend",
                    "constraint_type": "PROHIBITION",
                    "formula": "FOR holiday_weekends: NOT assigned_to(any_shift) WHEN resident has time_off_request for holiday_weekend",
                    "validation_function": self._validate_holiday_weekend_time_off,
                },
            ]
        )

        # Weekend Assignment Cycle Rules
        self.hard_rules.extend(
            [
                {
                    "id": "H026",
                    "name": "July Weekend Coverage Pattern",
                    "description": "PGY-3s cover first two weekends in July (two PGY-3s per weekend, split)",
                    "constraint_type": "PATTERN",
                    "formula": "FOR July weekends [1, 2]: ASSIGN 2 PGY-3 residents per weekend (split_coverage)",
                    "validation_function": self._validate_july_weekend_pattern,
                },
                {
                    "id": "H027",
                    "name": "PGY-2 Weekend Start Date",
                    "description": "PGY-2s take over weekend call starting weekend #3 in July",
                    "constraint_type": "PATTERN",
                    "formula": "FOR July weekend >= 3: weekend_call ASSIGN PGY-2 residents only",
                    "validation_function": self._validate_pgy2_weekend_start,
                },
                {
                    "id": "H028",
                    "name": "PGY-2 Split Weekend Requirement",
                    "description": "Each PGY-2 must complete one split weekend (weekends #3–7), paired with PGY-4",
                    "constraint_type": "PATTERN",
                    "formula": "FOR PGY-2 residents: COUNT(split_weekend) = 1 during weekends [3, 4, 5, 6, 7] AND paired_with(PGY-4)",
                    "validation_function": self._validate_pgy2_split_weekend_requirement,
                },
                {
                    "id": "H029",
                    "name": "PGY-2 Weekend Cycle Completion",
                    "description": "All five PGY-2s must be cycled through first five PGY-2 weekends before anyone repeats",
                    "constraint_type": "FAIRNESS",
                    "formula": "FOR weekends [3, 4, 5, 6, 7]: each PGY-2 assigned exactly once before any PGY-2 repeats",
                    "validation_function": self._validate_pgy2_weekend_cycle,
                },
                {
                    "id": "H030",
                    "name": "Weekend Role Fair Rotation",
                    "description": "Weekend call, moonlight, and backup roles must rotate fairly among eligible residents",
                    "constraint_type": "FAIRNESS",
                    "formula": "FOR weekend_roles: distribute assignments fairly among eligible_residents",
                    "validation_function": self._validate_weekend_role_rotation,
                },
            ]
        )

    def _setup_soft_rules(self):
        """Define all soft rules (should be followed when possible)"""

        # Workload Distribution
        self.soft_rules.extend(
            [
                {
                    "id": "S001",
                    "name": "Weekly Shift Limit",
                    "description": "Residents should not have more than 1 call and 1 moonlight shift per week (goal: 2 shifts max)",
                    "constraint_type": "LIMIT",
                    "weight": 100,
                    "formula": "FOR all residents: COUNT(call + moonlight) <= 2 per week",
                    "validation_function": self._validate_weekly_shift_limit,
                },
                {
                    "id": "S002",
                    "name": "No Adjacent Shifts",
                    "description": "Residents should not be scheduled for shifts on adjacent days (call → moonlight or vice versa)",
                    "constraint_type": "SPACING",
                    "weight": 80,
                    "formula": "FOR all residents: avoid consecutive_day_assignments",
                    "validation_function": self._validate_no_adjacent_shifts,
                },
                {
                    "id": "S003",
                    "name": "Quarterly Distribution",
                    "description": "Call and moonlight assignments should be spread throughout quarter (avoid clustering)",
                    "constraint_type": "DISTRIBUTION",
                    "weight": 70,
                    "formula": "FOR all residents: distribute shifts evenly across quarter",
                    "validation_function": self._validate_quarterly_distribution,
                },
                {
                    "id": "S004",
                    "name": "Weekend Moonlight Cycling",
                    "description": "Weekend moonlight shifts should cycle through PGY-3s/PGY-4s, prioritizing resident with longest time since last weekend moonlight",
                    "constraint_type": "FAIRNESS",
                    "weight": 90,
                    "formula": "FOR weekend_moonlight: assign to resident with max(days_since_last_weekend_moonlight)",
                    "validation_function": self._validate_weekend_moonlight_cycling,
                },
            ]
        )

        # Scheduling Preferences
        self.soft_rules.extend(
            [
                {
                    "id": "S005",
                    "name": "PGY-2 Thursday Preference",
                    "description": "PGY-2s get preference for Thursday call (allows longer recovery weekends)",
                    "constraint_type": "PREFERENCE",
                    "weight": 60,
                    "formula": "FOR thursday_call: prefer PGY-2 residents",
                    "validation_function": self._validate_pgy2_thursday_preference,
                },
                {
                    "id": "S006",
                    "name": "PGY-3 Friday Preference",
                    "description": "PGY-3s get preference for Friday call",
                    "constraint_type": "PREFERENCE",
                    "weight": 70,
                    "formula": "FOR friday_call: prefer PGY-3 residents",
                    "validation_function": self._validate_pgy3_friday_preference,
                },
                {
                    "id": "S007",
                    "name": "PGY-4 Moonlight Distribution",
                    "description": "PGY-4s should be distributed across all weekday moonlights, not concentrated on Fridays",
                    "constraint_type": "DISTRIBUTION",
                    "weight": 65,
                    "formula": "FOR PGY-4 residents: distribute moonlight assignments across [Monday, Tuesday, Wednesday, Thursday, Friday]",
                    "validation_function": self._validate_pgy4_moonlight_distribution,
                },
                {
                    "id": "S008",
                    "name": "Post-Weekend Call Avoidance",
                    "description": "Avoid scheduling PGY-2s for weekday call the week after weekend call",
                    "constraint_type": "SPACING",
                    "weight": 75,
                    "formula": "FOR PGY-2 residents: avoid weekday_call in week following weekend_call",
                    "validation_function": self._validate_post_weekend_call_avoidance,
                },
                {
                    "id": "S009",
                    "name": "Back-to-Back Weekend Avoidance",
                    "description": "Avoid scheduling residents for back-to-back weekends (any role)",
                    "constraint_type": "SPACING",
                    "weight": 85,
                    "formula": "FOR all residents: avoid consecutive_weekend_assignments",
                    "validation_function": self._validate_back_to_back_weekend_avoidance,
                },
            ]
        )

        # Educational Considerations
        self.soft_rules.extend(
            [
                {
                    "id": "S010",
                    "name": "EMG Supervision Pairing",
                    "description": "EMG rotations should be paired with appropriate supervision",
                    "constraint_type": "SUPERVISION",
                    "weight": 95,
                    "formula": "FOR EMG_rotations: ensure appropriate_supervision available",
                    "validation_function": self._validate_emg_supervision,
                },
                {
                    "id": "S011",
                    "name": "Shift Type Variety",
                    "description": "Residents should have variety in shift types for educational breadth",
                    "constraint_type": "VARIETY",
                    "weight": 50,
                    "formula": "FOR all residents: maximize variety in assigned_shift_types",
                    "validation_function": self._validate_shift_variety,
                },
                {
                    "id": "S012",
                    "name": "New Resident Mentorship",
                    "description": "New residents should have mentorship opportunities during early shifts",
                    "constraint_type": "MENTORSHIP",
                    "weight": 80,
                    "formula": "FOR new_residents: pair with experienced_residents during early_shifts",
                    "validation_function": self._validate_new_resident_mentorship,
                },
                {
                    "id": "S013",
                    "name": "Specialty Rotation Adjustment",
                    "description": "Specialty rotations may require adjusted call responsibilities",
                    "constraint_type": "ADJUSTMENT",
                    "weight": 70,
                    "formula": "FOR specialty_rotations: adjust call_requirements based on rotation_demands",
                    "validation_function": self._validate_specialty_rotation_adjustment,
                },
            ]
        )

        # Quality of Life
        self.soft_rules.extend(
            [
                {
                    "id": "S014",
                    "name": "Resident Preference Accommodation",
                    "description": "Honor resident preference requests when possible (ranked system)",
                    "constraint_type": "PREFERENCE",
                    "weight": 60,
                    "formula": "FOR all residents: maximize accommodation of preference_requests weighted by priority",
                    "validation_function": self._validate_preference_accommodation,
                },
                {
                    "id": "S015",
                    "name": "Work-Life Balance",
                    "description": "Maintain work-life balance considerations",
                    "constraint_type": "BALANCE",
                    "weight": 55,
                    "formula": "FOR all residents: consider work_life_balance in assignment decisions",
                    "validation_function": self._validate_work_life_balance,
                },
                {
                    "id": "S016",
                    "name": "Difficult Shift Clustering Avoidance",
                    "description": "Avoid excessive clustering of difficult shifts for any individual",
                    "constraint_type": "FAIRNESS",
                    "weight": 75,
                    "formula": "FOR all residents: avoid clustering of high_difficulty_shifts",
                    "validation_function": self._validate_difficult_shift_clustering,
                },
                {
                    "id": "S017",
                    "name": "Multi-Site Travel Consideration",
                    "description": "Consider travel time between sites for multi-location assignments",
                    "constraint_type": "LOGISTICS",
                    "weight": 40,
                    "formula": "FOR multi_site_assignments: consider travel_time_constraints",
                    "validation_function": self._validate_travel_considerations,
                },
            ]
        )

    def _setup_quotas(self):
        """Define annual quota requirements by PGY level"""
        self.quotas = {
            "PGY-2": {
                "weekday_call": 38,
                "weekend_call": 7.5,  # 7 full + 1 split
                "moonlight": 21,  # weekday-only moonlight
                "total_shifts_max": 66.5,
            },
            "PGY-3": {
                "weekday_call": 30,
                "weekend_call": 2.5,  # 2 full + 0.5 shared in early July
                "moonlight": 27,  # including weekends
                "total_shifts_max": 59.5,
            },
            "PGY-4": {
                "weekday_call": 5,
                "weekend_call": 0.5,  # during early PGY-2 weekends
                "moonlight": 27.5,  # 27-28 moonlight shifts; 2 extra assigned randomly
                "total_shifts_max": 33,
            },
        }

    def _setup_special_periods(self):
        """Define special periods and exceptions"""
        self.special_periods = {
            "pgy2_july_restriction": {
                "dates": "July 1-14",
                "affected": ["PGY-2"],
                "restriction": "No call or moonlight shifts",
            },
            "pgy2_moonlight_start": {
                "date": "August 1",
                "affected": ["PGY-2"],
                "requirement": "First moonlight must be Friday with senior supervision",
            },
            "july_weekend_pattern": {
                "weekends": [1, 2],
                "pattern": "Two PGY-3s per weekend (split coverage)",
            },
            "pgy2_weekend_start": {
                "weekend": 3,
                "pattern": "PGY-2s take over weekend call starting weekend 3",
            },
            "pgy3_weekend_blocks": {
                "months": ["November", "February"],
                "exception": "PGY-2s can cover Friday call during PGY-3 weekend blocks",
            },
            "holiday_weekends": {
                "holidays": [
                    "Memorial Day",
                    "July 4th",
                    "Labor Day",
                    "Thanksgiving",
                    "Christmas",
                    "New Years",
                ],
                "requirement": "Holiday-approved residents only",
            },
        }

    # Validation Functions (these would be called by the CSP engine)

    def _validate_weekday_call_coverage(self, schedule, date):
        """Validate exactly one resident assigned to weekday call"""
        if date.weekday() < 5:  # Monday = 0, Friday = 4
            call_assignments = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "weekday_call"
            ]
            return len(call_assignments) == 1
        return True

    def _validate_weekday_moonlight_coverage(self, schedule, date):
        """Validate exactly one resident assigned to weekday moonlight (Mon-Thu)"""
        if date.weekday() < 4:  # Monday = 0, Thursday = 3
            moonlight_assignments = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "weekday_moonlight"
            ]
            return len(moonlight_assignments) == 1
        return True

    def _validate_friday_moonlight_coverage(self, schedule, date):
        """Validate exactly two residents assigned to Friday moonlight"""
        if date.weekday() == 4:  # Friday = 4
            moonlight_assignments = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "friday_moonlight"
            ]
            return len(moonlight_assignments) == 2
        return True

    def _validate_weekend_call_assignment(self, schedule, date):
        """Validate one PGY-2 assigned to weekend call block"""
        if date.weekday() == 5:  # Saturday = 5
            weekend_assignments = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "weekend_call"
            ]
            if len(weekend_assignments) == 1:
                return weekend_assignments[0]["pgy_level"] == "PGY-2"
        return True

    def _validate_weekend_moonlight_assignment(self, schedule, date):
        """Validate one PGY-3 or PGY-4 assigned to weekend moonlight"""
        if date.weekday() in [5, 6]:  # Weekend
            moonlight_assignments = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "weekend_moonlight"
            ]
            if len(moonlight_assignments) == 1:
                return moonlight_assignments[0]["pgy_level"] in ["PGY-3", "PGY-4"]
        return True

    def _validate_weekend_backup_assignment(self, schedule, date):
        """Validate weekend backup same PGY level as call, different person"""
        if date.weekday() == 5:  # Saturday
            call_assignments = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "weekend_call"
            ]
            backup_assignments = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "weekend_backup"
            ]

            if len(call_assignments) == 1 and len(backup_assignments) == 1:
                call_resident = call_assignments[0]
                backup_resident = backup_assignments[0]
                return (
                    call_resident["pgy_level"] == backup_resident["pgy_level"]
                    and call_resident["resident_id"] != backup_resident["resident_id"]
                )
        return True

    def _validate_pgy2_july_restriction(self, schedule, date):
        """Validate PGY-2s not assigned call/moonlight in first two weeks of July"""
        if date.month == 7 and date.day <= 14:
            pgy2_assignments = [
                a
                for a in schedule
                if a["date"] == date
                and a["pgy_level"] == "PGY-2"
                and a["shift_type"]
                in ["weekday_call", "weekday_moonlight", "friday_moonlight"]
            ]
            return len(pgy2_assignments) == 0
        return True

    def _validate_pgy2_moonlight_start(self, schedule, date):
        """Validate PGY-2s not assigned moonlight before August 1st"""
        if date < datetime(date.year, 8, 1).date():
            pgy2_moonlight = [
                a
                for a in schedule
                if a["date"] == date
                and a["pgy_level"] == "PGY-2"
                and "moonlight" in a["shift_type"]
            ]
            return len(pgy2_moonlight) == 0
        return True

    def _validate_pgy2_first_moonlight(self, schedule, resident_id):
        """Validate PGY-2 first moonlight is Friday with senior supervision"""
        # This would need to track first moonlight assignment for each PGY-2
        # and verify it's on Friday with PGY-3/4 present
        pass

    def _validate_friday_call_eligibility(self, schedule, date):
        """Validate only PGY-3s on Friday call (with exceptions)"""
        if date.weekday() == 4:  # Friday
            # Check for PGY-3 weekend block exceptions in Nov/Feb
            is_exception_period = date.month in [11, 2]  # November or February

            friday_call = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "friday_call"
            ]
            if len(friday_call) == 1:
                if is_exception_period:
                    # During PGY-3 weekend blocks, PGY-2s can cover Friday call
                    return friday_call[0]["pgy_level"] in ["PGY-2", "PGY-3"]
                else:
                    # Normal periods: only PGY-3s
                    return friday_call[0]["pgy_level"] == "PGY-3"
        return True

    def _validate_pgy4_split_weekend(self, schedule, resident_id):
        """Validate PGY-4s participate in exactly one split weekend per year"""
        split_weekend_count = len(
            [
                a
                for a in schedule
                if a["resident_id"] == resident_id
                and a["shift_type"] == "split_weekend"
            ]
        )
        return split_weekend_count == 1

    def _validate_no_same_day_call_moonlight(self, schedule, date):
        """Validate no resident works both call and moonlight same day"""
        call_residents = set(
            [
                a["resident_id"]
                for a in schedule
                if a["date"] == date and "call" in a["shift_type"]
            ]
        )
        moonlight_residents = set(
            [
                a["resident_id"]
                for a in schedule
                if a["date"] == date and "moonlight" in a["shift_type"]
            ]
        )
        return len(call_residents.intersection(moonlight_residents)) == 0

    def _validate_post_call_restriction(self, schedule, date):
        """Validate no moonlight day after call shift"""
        previous_day = date - timedelta(days=1)
        previous_call_residents = set(
            [
                a["resident_id"]
                for a in schedule
                if a["date"] == previous_day and "call" in a["shift_type"]
            ]
        )
        current_moonlight_residents = set(
            [
                a["resident_id"]
                for a in schedule
                if a["date"] == date and "moonlight" in a["shift_type"]
            ]
        )
        return (
            len(previous_call_residents.intersection(current_moonlight_residents)) == 0
        )

    def _validate_no_consecutive_calls(self, schedule, date):
        """Validate no consecutive call shifts except weekend blocks"""
        previous_day = date - timedelta(days=1)

        # Exception: Saturday-Sunday weekend blocks are allowed
        if date.weekday() == 6 and previous_day.weekday() == 5:  # Sunday after Saturday
            return True

        previous_call_residents = set(
            [
                a["resident_id"]
                for a in schedule
                if a["date"] == previous_day and "call" in a["shift_type"]
            ]
        )
        current_call_residents = set(
            [
                a["resident_id"]
                for a in schedule
                if a["date"] == date and "call" in a["shift_type"]
            ]
        )
        return len(previous_call_residents.intersection(current_call_residents)) == 0

    def _validate_no_moonlight_before_call(self, schedule, date):
        """Validate no moonlight followed by call next day"""
        next_day = date + timedelta(days=1)
        current_moonlight_residents = set(
            [
                a["resident_id"]
                for a in schedule
                if a["date"] == date and "moonlight" in a["shift_type"]
            ]
        )
        next_call_residents = set(
            [
                a["resident_id"]
                for a in schedule
                if a["date"] == next_day and "call" in a["shift_type"]
            ]
        )
        return len(current_moonlight_residents.intersection(next_call_residents)) == 0

    def _validate_no_call_backup_same_weekend(self, schedule, date):
        """Validate no resident works call and backup same weekend"""
        if date.weekday() in [5, 6]:  # Weekend
            weekend_start = (
                date - timedelta(days=date.weekday() - 5)
                if date.weekday() == 6
                else date
            )
            weekend_end = weekend_start + timedelta(days=1)

            weekend_assignments = [
                a for a in schedule if weekend_start <= a["date"] <= weekend_end
            ]

            for resident_id in set([a["resident_id"] for a in weekend_assignments]):
                resident_assignments = [
                    a for a in weekend_assignments if a["resident_id"] == resident_id
                ]
                shift_types = [a["shift_type"] for a in resident_assignments]
                if "weekend_call" in shift_types and "weekend_backup" in shift_types:
                    return False
        return True

    def _validate_friday_weekend_restriction(self, schedule, date):
        """Validate no Friday call followed by weekend call/backup"""
        if date.weekday() == 4:  # Friday
            friday_call_residents = set(
                [
                    a["resident_id"]
                    for a in schedule
                    if a["date"] == date and a["shift_type"] == "friday_call"
                ]
            )

            weekend_start = date + timedelta(days=1)  # Saturday
            weekend_assignments = [
                a
                for a in schedule
                if a["date"] >= weekend_start
                and a["date"] <= weekend_start + timedelta(days=1)
                and a["shift_type"] in ["weekend_call", "weekend_backup"]
            ]

            weekend_residents = set([a["resident_id"] for a in weekend_assignments])
            return len(friday_call_residents.intersection(weekend_residents)) == 0
        return True

    def _validate_pgy2_quotas(self, schedule, resident_id):
        """Validate PGY-2 annual quotas"""
        resident_assignments = [a for a in schedule if a["resident_id"] == resident_id]

        weekday_call_count = len(
            [a for a in resident_assignments if a["shift_type"] == "weekday_call"]
        )
        weekend_call_count = len(
            [a for a in resident_assignments if a["shift_type"] == "weekend_call"]
        )
        split_weekend_count = len(
            [a for a in resident_assignments if a["shift_type"] == "split_weekend"]
        )
        moonlight_count = len(
            [
                a
                for a in resident_assignments
                if "moonlight" in a["shift_type"]
                and a["shift_type"] != "weekend_moonlight"
            ]
        )  # weekday-only

        total_weekend_call = weekend_call_count + (split_weekend_count * 0.5)

        return (
            weekday_call_count == 38
            and total_weekend_call == 7.5
            and moonlight_count == 21
        )

    def _validate_pgy3_quotas(self, schedule, resident_id):
        """Validate PGY-3 annual quotas"""
        resident_assignments = [a for a in schedule if a["resident_id"] == resident_id]

        weekday_call_count = len(
            [a for a in resident_assignments if a["shift_type"] == "weekday_call"]
        )
        weekend_call_count = len(
            [a for a in resident_assignments if a["shift_type"] == "weekend_call"]
        )
        split_weekend_count = len(
            [a for a in resident_assignments if a["shift_type"] == "split_weekend"]
        )
        moonlight_count = len(
            [a for a in resident_assignments if "moonlight" in a["shift_type"]]
        )

        total_weekend_call = weekend_call_count + (split_weekend_count * 0.5)

        return (
            weekday_call_count == 30
            and total_weekend_call == 2.5
            and moonlight_count == 27
        )

    def _validate_pgy4_quotas(self, schedule, resident_id):
        """Validate PGY-4 annual quotas"""
        resident_assignments = [a for a in schedule if a["resident_id"] == resident_id]

        weekday_call_count = len(
            [a for a in resident_assignments if a["shift_type"] == "weekday_call"]
        )
        weekend_call_count = len(
            [a for a in resident_assignments if a["shift_type"] == "weekend_call"]
        )
        split_weekend_count = len(
            [a for a in resident_assignments if a["shift_type"] == "split_weekend"]
        )
        moonlight_count = len(
            [a for a in resident_assignments if "moonlight" in a["shift_type"]]
        )

        total_weekend_call = weekend_call_count + (split_weekend_count * 0.5)

        return (
            weekday_call_count == 5
            and total_weekend_call == 0.5
            and 27 <= moonlight_count <= 28
        )

    def _validate_time_off_compliance(self, schedule, date, time_off_requests):
        """Validate residents not scheduled during time-off requests"""
        for request in time_off_requests:
            if request["start_date"] <= date <= request["end_date"]:
                resident_assignments = [
                    a
                    for a in schedule
                    if a["date"] == date and a["resident_id"] == request["resident_id"]
                ]
                if len(resident_assignments) > 0:
                    return False
        return True

    def _validate_va_rotation_restriction(self, schedule, date, va_rotations):
        """Validate residents not scheduled during VA rotation weeks"""
        for rotation in va_rotations:
            if rotation["start_date"] <= date <= rotation["end_date"]:
                resident_assignments = [
                    a
                    for a in schedule
                    if a["date"] == date and a["resident_id"] == rotation["resident_id"]
                ]
                if len(resident_assignments) > 0:
                    return False
        return True

    def _validate_holiday_coverage_eligibility(
        self, schedule, date, federal_holidays, holiday_approved_residents
    ):
        """Validate only holiday-approved residents work federal holidays"""
        if date in federal_holidays:
            day_assignments = [a for a in schedule if a["date"] == date]
            for assignment in day_assignments:
                if assignment["resident_id"] not in holiday_approved_residents:
                    return False
        return True

    def _validate_holiday_weekend_coverage(
        self, schedule, date, holiday_weekends, holiday_approved_residents
    ):
        """Validate only holiday-approved residents work holiday weekends"""
        if date in holiday_weekends:
            day_assignments = [a for a in schedule if a["date"] == date]
            for assignment in day_assignments:
                if assignment["resident_id"] not in holiday_approved_residents:
                    return False
        return True

    def _validate_holiday_weekend_time_off(
        self, schedule, date, holiday_weekends, time_off_requests
    ):
        """Validate no time-off residents scheduled during holiday weekends"""
        if date in holiday_weekends:
            for request in time_off_requests:
                if request["start_date"] <= date <= request["end_date"]:
                    resident_assignments = [
                        a
                        for a in schedule
                        if a["date"] == date
                        and a["resident_id"] == request["resident_id"]
                    ]
                    if len(resident_assignments) > 0:
                        return False
        return True

    def _validate_july_weekend_pattern(self, schedule, july_weekends):
        """Validate July weekend coverage pattern"""
        for weekend_num in [1, 2]:
            if weekend_num in july_weekends:
                weekend_assignments = july_weekends[weekend_num]
                pgy3_count = len(
                    [a for a in weekend_assignments if a["pgy_level"] == "PGY-3"]
                )
                if pgy3_count != 2:
                    return False
        return True

    def _validate_pgy2_weekend_start(self, schedule, date):
        """Validate PGY-2s take over weekend call starting weekend 3"""
        if date.weekday() == 5:  # Saturday
            # Determine which weekend number this is (starting from July)
            july_start = datetime(date.year, 7, 1).date()
            days_since_july = (date - july_start).days
            weekend_number = (days_since_july // 7) + 1

            if weekend_number >= 3:
                weekend_call_assignments = [
                    a
                    for a in schedule
                    if a["date"] == date and a["shift_type"] == "weekend_call"
                ]
                if len(weekend_call_assignments) == 1:
                    return weekend_call_assignments[0]["pgy_level"] == "PGY-2"
        return True

    def _validate_pgy2_split_weekend_requirement(self, schedule, resident_id):
        """Validate each PGY-2 completes exactly one split weekend with PGY-4"""
        split_weekends = [
            a
            for a in schedule
            if a["resident_id"] == resident_id and a["shift_type"] == "split_weekend"
        ]

        if len(split_weekends) != 1:
            return False

        # Check if paired with PGY-4
        split_weekend_date = split_weekends[0]["date"]
        pgy4_assignments = [
            a
            for a in schedule
            if a["date"] == split_weekend_date
            and a["pgy_level"] == "PGY-4"
            and a["shift_type"] == "split_weekend"
        ]

        return len(pgy4_assignments) == 1

    def _validate_pgy2_weekend_cycle(self, schedule, pgy2_residents):
        """Validate all PGY-2s cycle through weekends 3-7 before repeats"""
        weekend_assignments = {}

        for weekend_num in [3, 4, 5, 6, 7]:
            weekend_assignments[weekend_num] = []

        # Track weekend assignments for PGY-2s
        for assignment in schedule:
            if assignment["pgy_level"] == "PGY-2" and assignment["shift_type"] in [
                "weekend_call",
                "split_weekend",
            ]:

                # Calculate weekend number
                july_start = datetime(assignment["date"].year, 7, 1).date()
                days_since_july = (assignment["date"] - july_start).days
                weekend_number = (days_since_july // 7) + 1

                if 3 <= weekend_number <= 7:
                    weekend_assignments[weekend_number].append(
                        assignment["resident_id"]
                    )

        # Check that each PGY-2 appears exactly once in weekends 3-7
        assigned_residents = []
        for weekend_num in [3, 4, 5, 6, 7]:
            if len(weekend_assignments[weekend_num]) != 1:
                return False
            assigned_residents.extend(weekend_assignments[weekend_num])

        # Verify all 5 PGY-2s are assigned exactly once
        return len(set(assigned_residents)) == len(pgy2_residents) == 5

    def _validate_weekend_role_rotation(self, schedule):
        """Validate fair rotation of weekend roles among eligible residents"""
        # This would implement fairness algorithms for weekend role distribution
        # Based on historical assignments and eligibility
        pass

    # Soft rule validation functions
    def _validate_weekly_shift_limit(self, schedule, date, resident_id):
        """Validate ≤2 shifts per resident per week"""
        week_start = date - timedelta(days=date.weekday())
        week_end = week_start + timedelta(days=6)

        week_assignments = [
            a
            for a in schedule
            if week_start <= a["date"] <= week_end and a["resident_id"] == resident_id
        ]

        return len(week_assignments) <= 2

    def _validate_no_adjacent_shifts(self, schedule, date, resident_id):
        """Validate no shifts on adjacent days"""
        adjacent_dates = [date - timedelta(days=1), date + timedelta(days=1)]

        current_assignments = [
            a for a in schedule if a["date"] == date and a["resident_id"] == resident_id
        ]
        adjacent_assignments = [
            a
            for a in schedule
            if a["date"] in adjacent_dates and a["resident_id"] == resident_id
        ]

        return not (len(current_assignments) > 0 and len(adjacent_assignments) > 0)

    def _validate_quarterly_distribution(
        self, schedule, resident_id, quarter_start, quarter_end
    ):
        """Validate even distribution of shifts across quarter"""
        quarter_assignments = [
            a
            for a in schedule
            if quarter_start <= a["date"] <= quarter_end
            and a["resident_id"] == resident_id
        ]

        # Divide quarter into 3 months and check distribution
        month1_count = len([a for a in quarter_assignments if a["date"].day <= 10])
        month2_count = len(
            [a for a in quarter_assignments if 11 <= a["date"].day <= 20]
        )
        month3_count = len([a for a in quarter_assignments if a["date"].day >= 21])

        # Check if distribution is reasonably even (within 2 shifts)
        max_diff = max(month1_count, month2_count, month3_count) - min(
            month1_count, month2_count, month3_count
        )
        return max_diff <= 2

    def _validate_weekend_moonlight_cycling(self, schedule, date, eligible_residents):
        """Validate weekend moonlight cycles through eligible residents"""
        if date.weekday() in [5, 6]:  # Weekend
            # Find who was assigned weekend moonlight
            weekend_moonlight = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "weekend_moonlight"
            ]

            if len(weekend_moonlight) == 1:
                assigned_resident = weekend_moonlight[0]["resident_id"]

                # Check if this resident had the longest gap since last weekend moonlight
                # This would require tracking historical assignments
                return True  # Simplified for now
        return True

    def _validate_pgy2_thursday_preference(self, schedule, date):
        """Validate PGY-2s get preference for Thursday call"""
        if date.weekday() == 3:  # Thursday
            thursday_call = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "weekday_call"
            ]
            if len(thursday_call) == 1:
                return thursday_call[0]["pgy_level"] == "PGY-2"
        return True

    def _validate_pgy3_friday_preference(self, schedule, date):
        """Validate PGY-3s get preference for Friday call"""
        if date.weekday() == 4:  # Friday
            friday_call = [
                a
                for a in schedule
                if a["date"] == date and a["shift_type"] == "friday_call"
            ]
            if len(friday_call) == 1:
                return friday_call[0]["pgy_level"] == "PGY-3"
        return True

    def _validate_pgy4_moonlight_distribution(self, schedule, resident_id, time_period):
        """Validate PGY-4 moonlight distribution across weekdays"""
        if time_period:  # Get assignments for specified period
            pgy4_moonlights = [
                a
                for a in schedule
                if a["resident_id"] == resident_id
                and "moonlight" in a["shift_type"]
                and a["date"].weekday() < 5
            ]  # Weekdays only

            # Count by day of week
            day_counts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}  # Mon-Fri
            for assignment in pgy4_moonlights:
                day_counts[assignment["date"].weekday()] += 1

            # Check if distribution is reasonably even
            max_diff = max(day_counts.values()) - min(day_counts.values())
            return max_diff <= 2
        return True

    def _validate_post_weekend_call_avoidance(self, schedule, date, resident_id):
        """Validate PGY-2s avoid weekday call week after weekend call"""
        if date.weekday() < 5:  # Weekday
            # Check if this PGY-2 had weekend call in previous week
            previous_week_start = date - timedelta(days=date.weekday() + 7)
            previous_week_end = previous_week_start + timedelta(days=6)

            previous_weekend_call = [
                a
                for a in schedule
                if previous_week_start <= a["date"] <= previous_week_end
                and a["resident_id"] == resident_id
                and a["shift_type"] == "weekend_call"
            ]

            current_weekday_call = [
                a
                for a in schedule
                if a["date"] == date
                and a["resident_id"] == resident_id
                and a["shift_type"] == "weekday_call"
            ]

            # Soft rule: avoid if had weekend call previous week
            return not (
                len(previous_weekend_call) > 0 and len(current_weekday_call) > 0
            )
        return True

    def _validate_back_to_back_weekend_avoidance(self, schedule, date, resident_id):
        """Validate avoiding back-to-back weekend assignments"""
        if date.weekday() in [5, 6]:  # Weekend
            current_weekend_assignments = [
                a
                for a in schedule
                if a["date"] == date
                and a["resident_id"] == resident_id
                and "weekend" in a["shift_type"]
            ]

            # Check previous weekend
            previous_weekend_start = date - timedelta(days=7)
            previous_weekend_end = previous_weekend_start + timedelta(days=1)

            previous_weekend_assignments = [
                a
                for a in schedule
                if previous_weekend_start <= a["date"] <= previous_weekend_end
                and a["resident_id"] == resident_id
                and "weekend" in a["shift_type"]
            ]

            return not (
                len(current_weekend_assignments) > 0
                and len(previous_weekend_assignments) > 0
            )
        return True

    # Placeholder validation functions for educational and quality of life rules
    def _validate_emg_supervision(self, schedule, date):
        """Validate EMG rotations have appropriate supervision"""
        return True  # Implementation depends on rotation tracking

    def _validate_shift_variety(self, schedule, resident_id):
        """Validate resident has variety in shift types"""
        return True  # Implementation depends on educational requirements

    def _validate_new_resident_mentorship(self, schedule, date):
        """Validate new residents paired with experienced residents"""
        return True  # Implementation depends on mentorship program

    def _validate_specialty_rotation_adjustment(self, schedule, date):
        """Validate specialty rotations have adjusted call responsibilities"""
        return True  # Implementation depends on rotation tracking

    def _validate_preference_accommodation(self, schedule, resident_preferences):
        """Validate resident preferences are accommodated when possible"""
        return True  # Implementation depends on preference tracking system

    def _validate_work_life_balance(self, schedule, resident_id):
        """Validate work-life balance considerations"""
        return True  # Implementation depends on balance metrics

    def _validate_difficult_shift_clustering(self, schedule, resident_id):
        """Validate avoiding clustering of difficult shifts"""
        return True  # Implementation depends on shift difficulty ratings

    def _validate_travel_considerations(self, schedule, date):
        """Validate travel time considerations for multi-site assignments"""
        return True  # Implementation depends on site location data

    # Utility functions for the CSP engine
    def get_all_hard_rules(self):
        """Return all hard rules for CSP constraint generation"""
        return self.hard_rules

    def get_all_soft_rules(self):
        """Return all soft rules for CSP optimization"""
        return self.soft_rules

    def get_quotas_for_pgy_level(self, pgy_level):
        """Return quota requirements for specific PGY level"""
        return self.quotas.get(pgy_level, {})

    def get_special_periods(self):
        """Return all special periods and exceptions"""
        return self.special_periods

    def validate_schedule_against_all_rules(
        self,
        schedule,
        residents,
        time_off_requests=None,
        va_rotations=None,
        holiday_info=None,
    ):
        """
        Validate a complete schedule against all hard and soft rules
        Returns: (hard_violations, soft_violations, violation_details)
        """
        hard_violations = []
        soft_violations = []
        violation_details = []

        # Validate hard rules
        for rule in self.hard_rules:
            try:
                if hasattr(self, rule["validation_function"].__name__):
                    validation_func = getattr(
                        self, rule["validation_function"].__name__
                    )
                    # This would need to be adapted based on the specific validation function signature
                    # For now, this is a framework
                    pass
            except Exception as e:
                violation_details.append(
                    {
                        "rule_id": rule["id"],
                        "rule_name": rule["name"],
                        "violation_type": "hard",
                        "error": str(e),
                    }
                )

        # Validate soft rules
        for rule in self.soft_rules:
            try:
                if hasattr(self, rule["validation_function"].__name__):
                    validation_func = getattr(
                        self, rule["validation_function"].__name__
                    )
                    # This would need to be adapted based on the specific validation function signature
                    pass
            except Exception as e:
                violation_details.append(
                    {
                        "rule_id": rule["id"],
                        "rule_name": rule["name"],
                        "violation_type": "soft",
                        "error": str(e),
                    }
                )

        return hard_violations, soft_violations, violation_details

    def generate_csp_constraints(self):
        """
        Generate CSP constraints from all hard rules
        Returns: List of constraint dictionaries for CSP solver
        """
        csp_constraints = []

        for rule in self.hard_rules:
            constraint = {
                "id": rule["id"],
                "name": rule["name"],
                "type": rule["constraint_type"],
                "formula": rule["formula"],
                "validation_function": rule["validation_function"],
                "priority": 1000,  # Hard rules get highest priority
            }
            csp_constraints.append(constraint)

        return csp_constraints

    def generate_csp_objectives(self):
        """
        Generate CSP objectives from all soft rules
        Returns: List of objective dictionaries for CSP optimization
        """
        csp_objectives = []

        for rule in self.soft_rules:
            objective = {
                "id": rule["id"],
                "name": rule["name"],
                "type": rule["constraint_type"],
                "weight": rule["weight"],
                "formula": rule["formula"],
                "validation_function": rule["validation_function"],
            }
            csp_objectives.append(objective)

        return csp_objectives
