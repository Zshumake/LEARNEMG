"""
Dynamic Holiday Management System for Academic Year Planning.
Allows chiefs to input custom holidays and manages scheduling around them.
"""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    Boolean,
    DateTime,
    JSON,
    Text,
    ForeignKey,
    Float,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base
from typing import Dict, List, Optional, Tuple
from datetime import datetime, date, timedelta
import calendar


class HolidayDefinition(Base):
    """Master definition of holidays for the program."""

    __tablename__ = "holiday_definitions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    holiday_type = Column(
        String(50), nullable=False, index=True
    )  # Federal, State, Hospital, Program
    is_recurring = Column(Boolean, default=True, nullable=False)

    # Recurring holiday logic
    recurring_pattern = Column(
        String(100), nullable=True
    )  # "third_monday_february", "december_25", etc.

    # Holiday coverage requirements
    requires_coverage = Column(Boolean, default=True, nullable=False)
    coverage_level = Column(
        String(50), default="Full", nullable=False
    )  # Full, Reduced, Emergency
    minimum_pgy_level = Column(String(10), nullable=True)  # Minimum PGY level required

    # Holiday pay/compensation
    holiday_pay_multiplier = Column(Float, default=1.5, nullable=False)
    counts_toward_quota = Column(Boolean, default=True, nullable=False)

    # Program specific rules
    special_requirements = Column(Text, nullable=True)

    # Status
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"<HolidayDefinition(name='{self.name}', type='{self.holiday_type}')>"


class AcademicYearHoliday(Base):
    """Specific holiday instances for an academic year."""

    __tablename__ = "academic_year_holidays"

    id = Column(Integer, primary_key=True, index=True)
    academic_year = Column(String(9), nullable=False, index=True)
    holiday_definition_id = Column(
        Integer, ForeignKey("holiday_definitions.id"), nullable=False, index=True
    )

    # Specific date for this academic year
    holiday_date = Column(Date, nullable=False, index=True)
    observed_date = Column(Date, nullable=True)  # If different from actual date

    # Coverage status
    is_coverage_required = Column(Boolean, default=True, nullable=False)
    coverage_assigned = Column(Boolean, default=False, nullable=False)
    coverage_confirmed = Column(Boolean, default=False, nullable=False)

    # Chief input override
    chief_notes = Column(Text, nullable=True)
    coverage_override = Column(
        String(100), nullable=True
    )  # Special coverage instructions

    # Status tracking
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    holiday_definition = relationship("HolidayDefinition")
    coverage_assignments = relationship(
        "EnhancedHolidayCoverage", back_populates="holiday"
    )

    def __repr__(self) -> str:
        return f"<AcademicYearHoliday(academic_year='{self.academic_year}', date='{self.holiday_date}')>"

    @property
    def name(self) -> str:
        """Get holiday name from definition."""
        return (
            self.holiday_definition.name
            if self.holiday_definition
            else "Unknown Holiday"
        )

    @property
    def holiday_type(self) -> str:
        """Get holiday type from definition."""
        return (
            self.holiday_definition.holiday_type
            if self.holiday_definition
            else "Unknown"
        )


class HolidayPeriod(Base):
    """Extended holiday periods (e.g., Christmas/New Year week)."""

    __tablename__ = "holiday_periods"

    id = Column(Integer, primary_key=True, index=True)
    academic_year = Column(String(9), nullable=False, index=True)
    period_name = Column(String(100), nullable=False, index=True)

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    # Period characteristics
    reduced_staffing = Column(Boolean, default=True, nullable=False)
    special_coverage_rules = Column(JSON, nullable=True)  # Custom rules for this period

    # Chief configuration
    minimum_residents_required = Column(Integer, default=2, nullable=False)
    preferred_residents = Column(JSON, nullable=True)  # List of preferred resident IDs

    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self) -> str:
        return f"<HolidayPeriod(period='{self.period_name}', {self.start_date} to {self.end_date})>"


# Update the existing HolidayCoverage model to reference the new holiday system
from sqlalchemy.orm import backref


# Extend existing HolidayCoverage model
class EnhancedHolidayCoverage(Base):
    """Enhanced holiday coverage with dynamic holiday integration."""

    __tablename__ = "enhanced_holiday_coverage"

    id = Column(Integer, primary_key=True, index=True)
    academic_year = Column(String(9), nullable=False, index=True)
    holiday_id = Column(
        Integer, ForeignKey("academic_year_holidays.id"), nullable=False, index=True
    )

    # Coverage assignments
    primary_resident_id = Column(Integer, ForeignKey("residents.id"), nullable=False)
    backup_resident_id = Column(Integer, ForeignKey("residents.id"), nullable=True)

    # Holiday-specific details
    shift_start_time = Column(DateTime(timezone=True), nullable=False)
    shift_end_time = Column(DateTime(timezone=True), nullable=False)
    holiday_pay_rate = Column(Float, nullable=True)

    # Assignment status
    assignment_method = Column(
        String(50), default="manual", nullable=False
    )  # manual, automatic, volunteer
    volunteer_priority = Column(Integer, nullable=True)  # If resident volunteered
    is_confirmed = Column(Boolean, default=False, nullable=False)
    confirmation_date = Column(DateTime(timezone=True), nullable=True)

    # Special arrangements
    special_instructions = Column(Text, nullable=True)
    transportation_arranged = Column(Boolean, default=False, nullable=False)
    meal_voucher_provided = Column(Boolean, default=False, nullable=False)

    # Relationships
    holiday = relationship("AcademicYearHoliday", back_populates="coverage_assignments")
    primary_resident = relationship("Resident", foreign_keys=[primary_resident_id])
    backup_resident = relationship("Resident", foreign_keys=[backup_resident_id])

    # Metadata
    assigned_by = Column(String(255), nullable=True)  # Who made the assignment
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"<EnhancedHolidayCoverage(holiday_id={self.holiday_id}, primary_resident_id={self.primary_resident_id})>"


class HolidayVolunteerRequest(Base):
    """Track resident volunteer requests for holiday coverage."""

    __tablename__ = "holiday_volunteer_requests"

    id = Column(Integer, primary_key=True, index=True)
    academic_year = Column(String(9), nullable=False, index=True)
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, index=True
    )
    holiday_id = Column(
        Integer, ForeignKey("academic_year_holidays.id"), nullable=False, index=True
    )

    # Volunteer details
    volunteer_priority = Column(
        Integer, nullable=False
    )  # 1=strongly prefer, 5=willing if needed
    can_work_primary = Column(Boolean, default=True, nullable=False)
    can_work_backup = Column(Boolean, default=True, nullable=False)

    # Constraints
    has_family_conflict = Column(Boolean, default=False, nullable=False)
    needs_transportation = Column(Boolean, default=False, nullable=False)
    preferred_shift_time = Column(
        String(50), nullable=True
    )  # morning, evening, overnight

    # Request status
    status = Column(
        String(20), default="submitted", nullable=False
    )  # submitted, accepted, declined
    processed_date = Column(DateTime(timezone=True), nullable=True)

    notes = Column(Text, nullable=True)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    resident = relationship("Resident")
    holiday = relationship("AcademicYearHoliday")

    def __repr__(self) -> str:
        return f"<HolidayVolunteerRequest(resident_id={self.resident_id}, holiday_id={self.holiday_id}, priority={self.volunteer_priority})>"


class HolidayManagementService:
    """Service class for holiday management operations."""

    def __init__(self, db_session):
        self.db = db_session

    def initialize_federal_holidays(self) -> List[HolidayDefinition]:
        """Initialize standard federal holidays."""
        federal_holidays = [
            {
                "name": "New Year's Day",
                "holiday_type": "Federal",
                "recurring_pattern": "january_1",
                "requires_coverage": True,
                "minimum_pgy_level": "PGY-2",
            },
            {
                "name": "Martin Luther King Jr. Day",
                "holiday_type": "Federal",
                "recurring_pattern": "third_monday_january",
                "requires_coverage": False,
            },
            {
                "name": "Presidents Day",
                "holiday_type": "Federal",
                "recurring_pattern": "third_monday_february",
                "requires_coverage": False,
            },
            {
                "name": "Memorial Day",
                "holiday_type": "Federal",
                "recurring_pattern": "last_monday_may",
                "requires_coverage": True,
                "minimum_pgy_level": "PGY-2",
            },
            {
                "name": "Independence Day",
                "holiday_type": "Federal",
                "recurring_pattern": "july_4",
                "requires_coverage": True,
                "minimum_pgy_level": "PGY-2",
            },
            {
                "name": "Labor Day",
                "holiday_type": "Federal",
                "recurring_pattern": "first_monday_september",
                "requires_coverage": True,
                "minimum_pgy_level": "PGY-2",
            },
            {
                "name": "Columbus Day",
                "holiday_type": "Federal",
                "recurring_pattern": "second_monday_october",
                "requires_coverage": False,
            },
            {
                "name": "Veterans Day",
                "holiday_type": "Federal",
                "recurring_pattern": "november_11",
                "requires_coverage": False,
            },
            {
                "name": "Thanksgiving",
                "holiday_type": "Federal",
                "recurring_pattern": "fourth_thursday_november",
                "requires_coverage": True,
                "minimum_pgy_level": "PGY-3",
            },
            {
                "name": "Christmas Day",
                "holiday_type": "Federal",
                "recurring_pattern": "december_25",
                "requires_coverage": True,
                "minimum_pgy_level": "PGY-3",
            },
        ]

        created_holidays = []
        for holiday_data in federal_holidays:
            # Check if already exists
            existing = (
                self.db.query(HolidayDefinition)
                .filter(HolidayDefinition.name == holiday_data["name"])
                .first()
            )

            if not existing:
                holiday = HolidayDefinition(**holiday_data)
                self.db.add(holiday)
                created_holidays.append(holiday)

        self.db.commit()
        return created_holidays

    def create_custom_holiday(
        self, name: str, holiday_type: str, requires_coverage: bool = True, **kwargs
    ) -> HolidayDefinition:
        """Create a custom holiday definition."""
        holiday = HolidayDefinition(
            name=name,
            holiday_type=holiday_type,
            requires_coverage=requires_coverage,
            **kwargs,
        )

        self.db.add(holiday)
        self.db.commit()
        self.db.refresh(holiday)

        return holiday

    def generate_academic_year_holidays(
        self, academic_year: str
    ) -> List[AcademicYearHoliday]:
        """Generate specific holiday dates for an academic year."""
        start_year = int(academic_year.split("-")[0])
        end_year = start_year + 1

        # Get all active holiday definitions
        holiday_definitions = (
            self.db.query(HolidayDefinition)
            .filter(HolidayDefinition.is_active == True)
            .all()
        )

        generated_holidays = []

        for definition in holiday_definitions:
            # Calculate actual dates for this academic year
            holiday_dates = self._calculate_holiday_dates(
                definition, start_year, end_year
            )

            for holiday_date, observed_date in holiday_dates:
                # Check if already exists
                existing = (
                    self.db.query(AcademicYearHoliday)
                    .filter(
                        AcademicYearHoliday.academic_year == academic_year,
                        AcademicYearHoliday.holiday_definition_id == definition.id,
                        AcademicYearHoliday.holiday_date == holiday_date,
                    )
                    .first()
                )

                if not existing:
                    holiday = AcademicYearHoliday(
                        academic_year=academic_year,
                        holiday_definition_id=definition.id,
                        holiday_date=holiday_date,
                        observed_date=observed_date,
                        is_coverage_required=definition.requires_coverage,
                    )

                    self.db.add(holiday)
                    generated_holidays.append(holiday)

        self.db.commit()
        return generated_holidays

    def _calculate_holiday_dates(
        self, definition: HolidayDefinition, start_year: int, end_year: int
    ) -> List[Tuple[date, Optional[date]]]:
        """Calculate specific dates for a holiday definition."""
        dates = []
        pattern = definition.recurring_pattern

        if not pattern:
            return dates

        # Handle different recurring patterns
        for year in [start_year, end_year]:
            try:
                if pattern == "january_1":
                    holiday_date = date(year, 1, 1)
                elif pattern == "july_4":
                    holiday_date = date(year, 7, 4)
                elif pattern == "december_25":
                    holiday_date = date(year, 12, 25)
                elif pattern == "november_11":
                    holiday_date = date(year, 11, 11)
                elif pattern == "third_monday_january":
                    holiday_date = self._get_nth_weekday(year, 1, 0, 3)  # 3rd Monday
                elif pattern == "third_monday_february":
                    holiday_date = self._get_nth_weekday(year, 2, 0, 3)  # 3rd Monday
                elif pattern == "last_monday_may":
                    holiday_date = self._get_last_weekday(year, 5, 0)  # Last Monday
                elif pattern == "first_monday_september":
                    holiday_date = self._get_nth_weekday(year, 9, 0, 1)  # 1st Monday
                elif pattern == "second_monday_october":
                    holiday_date = self._get_nth_weekday(year, 10, 0, 2)  # 2nd Monday
                elif pattern == "fourth_thursday_november":
                    holiday_date = self._get_nth_weekday(year, 11, 3, 4)  # 4th Thursday
                else:
                    continue  # Skip unknown patterns

                # Check if academic year boundary (July 1 - June 30)
                if year == start_year and holiday_date.month >= 7:
                    dates.append((holiday_date, None))
                elif year == end_year and holiday_date.month <= 6:
                    dates.append((holiday_date, None))

            except ValueError:
                continue  # Skip invalid dates

        return dates

    def _get_nth_weekday(self, year: int, month: int, weekday: int, n: int) -> date:
        """Get the nth occurrence of a weekday in a month."""
        # Find first occurrence
        first_day = date(year, month, 1)
        first_weekday = first_day.weekday()

        # Calculate days to add
        days_to_add = (weekday - first_weekday) % 7
        first_occurrence = first_day + timedelta(days=days_to_add)

        # Add weeks to get nth occurrence
        nth_occurrence = first_occurrence + timedelta(weeks=n - 1)

        # Verify it's still in the same month
        if nth_occurrence.month != month:
            raise ValueError(
                f"No {n}th occurrence of weekday {weekday} in {year}-{month}"
            )

        return nth_occurrence

    def _get_last_weekday(self, year: int, month: int, weekday: int) -> date:
        """Get the last occurrence of a weekday in a month."""
        # Find last day of month
        if month == 12:
            last_day = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            last_day = date(year, month + 1, 1) - timedelta(days=1)

        # Find last occurrence
        last_weekday = last_day.weekday()
        days_to_subtract = (last_weekday - weekday) % 7
        last_occurrence = last_day - timedelta(days=days_to_subtract)

        return last_occurrence

    def get_holidays_for_academic_year(
        self, academic_year: str, requires_coverage_only: bool = False
    ) -> List[AcademicYearHoliday]:
        """Get all holidays for a specific academic year."""
        query = self.db.query(AcademicYearHoliday).filter(
            AcademicYearHoliday.academic_year == academic_year
        )

        if requires_coverage_only:
            query = query.filter(AcademicYearHoliday.is_coverage_required == True)

        return query.order_by(AcademicYearHoliday.holiday_date).all()

    def get_holidays_needing_coverage(
        self, academic_year: str
    ) -> List[AcademicYearHoliday]:
        """Get holidays that need coverage but don't have it assigned yet."""
        return (
            self.db.query(AcademicYearHoliday)
            .filter(
                AcademicYearHoliday.academic_year == academic_year,
                AcademicYearHoliday.is_coverage_required == True,
                AcademicYearHoliday.coverage_assigned == False,
            )
            .order_by(AcademicYearHoliday.holiday_date)
            .all()
        )

    def assign_holiday_coverage(
        self,
        holiday_id: int,
        primary_resident_id: int,
        backup_resident_id: Optional[int] = None,
        **kwargs,
    ) -> EnhancedHolidayCoverage:
        """Assign coverage for a specific holiday."""
        # Get holiday info
        holiday = (
            self.db.query(AcademicYearHoliday)
            .filter(AcademicYearHoliday.id == holiday_id)
            .first()
        )

        if not holiday:
            raise ValueError(f"Holiday with ID {holiday_id} not found")

        # Create coverage assignment
        coverage = EnhancedHolidayCoverage(
            academic_year=holiday.academic_year,
            holiday_id=holiday_id,
            primary_resident_id=primary_resident_id,
            backup_resident_id=backup_resident_id,
            shift_start_time=kwargs.get(
                "shift_start_time",
                datetime.combine(holiday.holiday_date, datetime.min.time()),
            ),
            shift_end_time=kwargs.get(
                "shift_end_time",
                datetime.combine(
                    holiday.holiday_date + timedelta(days=1), datetime.min.time()
                ),
            ),
            **kwargs,
        )

        self.db.add(coverage)

        # Update holiday status
        holiday.coverage_assigned = True

        self.db.commit()
        self.db.refresh(coverage)

        return coverage

    def create_holiday_period(
        self,
        academic_year: str,
        period_name: str,
        start_date: date,
        end_date: date,
        **kwargs,
    ) -> HolidayPeriod:
        """Create a holiday period (e.g., Christmas week)."""
        period = HolidayPeriod(
            academic_year=academic_year,
            period_name=period_name,
            start_date=start_date,
            end_date=end_date,
            **kwargs,
        )

        self.db.add(period)
        self.db.commit()
        self.db.refresh(period)

        return period

    def get_coverage_requirements_for_csp(self, academic_year: str) -> Dict[date, Dict]:
        """Get holiday coverage requirements formatted for CSP engine."""
        holidays = self.get_holidays_for_academic_year(
            academic_year, requires_coverage_only=True
        )

        coverage_requirements = {}
        for holiday in holidays:
            coverage_requirements[holiday.holiday_date] = {
                "holiday_name": holiday.name,
                "holiday_type": holiday.holiday_type,
                "minimum_pgy_level": holiday.holiday_definition.minimum_pgy_level,
                "coverage_level": holiday.holiday_definition.coverage_level,
                "requires_coverage": holiday.is_coverage_required,
                "is_assigned": holiday.coverage_assigned,
            }

        return coverage_requirements
