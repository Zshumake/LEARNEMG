"""Workflow state management models for academic year scheduling process."""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    JSON,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base
from typing import Dict, List, Optional
from datetime import datetime


class AcademicYearWorkflow(Base):
    """Workflow state tracking for academic year scheduling process."""

    __tablename__ = "academic_year_workflows"

    # Primary identification
    id = Column(Integer, primary_key=True, index=True)
    academic_year = Column(
        String(9), nullable=False, unique=True, index=True
    )  # "2024-2025"

    # Workflow step completion tracking
    step1_academic_year_selected = Column(
        Boolean, default=True, nullable=False
    )  # Auto-complete when created
    step2_residents_complete = Column(Boolean, default=False, nullable=False)
    step3_requests_complete = Column(Boolean, default=False, nullable=False)
    step4_holidays_complete = Column(Boolean, default=False, nullable=False)
    step5_historical_complete = Column(Boolean, default=False, nullable=False)

    # Generation state
    ready_for_schedule = Column(Boolean, default=False, nullable=False)
    schedule_generated = Column(Boolean, default=False, nullable=False)

    # Requirements tracking
    required_residents_count = Column(Integer, default=12, nullable=False)
    actual_residents_count = Column(Integer, default=0, nullable=False)
    required_pgy_levels = Column(
        JSON, default=lambda: ["PGY-2", "PGY-3", "PGY-4"], nullable=False
    )

    # Historical import requirements
    requires_historical_import = Column(
        Boolean, default=False, nullable=False
    )  # True if not starting in July
    historical_months_required = Column(
        JSON, nullable=True
    )  # ["July 2024", "August 2024", ...]
    historical_months_imported = Column(JSON, default=list, nullable=False)

    # Holiday requirements
    required_holidays = Column(
        JSON,
        default=lambda: [
            "Memorial Day",
            "Independence Day",
            "Labor Day",
            "Thanksgiving",
            "Christmas",
            "New Year's Day",
        ],
        nullable=False,
    )
    assigned_holidays = Column(JSON, default=list, nullable=False)

    # Validation metadata
    last_validation = Column(DateTime(timezone=True), nullable=True)
    validation_errors = Column(JSON, default=list, nullable=False)
    validation_warnings = Column(JSON, default=list, nullable=False)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    created_by = Column(String(255), nullable=True)

    def __repr__(self) -> str:
        return f"<AcademicYearWorkflow(academic_year='{self.academic_year}', ready={self.ready_for_schedule})>"

    @property
    def completion_percentage(self) -> float:
        """Calculate overall workflow completion percentage."""
        steps = [
            self.step1_academic_year_selected,
            self.step2_residents_complete,
            self.step3_requests_complete,
            self.step4_holidays_complete,
            self.step5_historical_complete,
        ]
        completed = sum(steps)
        return (completed / len(steps)) * 100

    @property
    def next_step(self) -> str:
        """Get the next incomplete step."""
        if not self.step2_residents_complete:
            return "Add residents with PGY levels"
        elif not self.step3_requests_complete:
            return "Collect resident preferences and requests"
        elif not self.step4_holidays_complete:
            return "Assign holiday coverage"
        elif not self.step5_historical_complete and self.requires_historical_import:
            return "Import historical schedule data"
        elif not self.ready_for_schedule:
            return "Run final validation"
        else:
            return "Generate schedule"

    def validate_step2_residents(self, db_session) -> tuple[bool, List[str]]:
        """Validate residents step completion."""
        from .resident import Resident

        errors = []
        residents = db_session.query(Resident).filter(Resident.is_active == True).all()

        # Check minimum count
        if len(residents) < self.required_residents_count:
            errors.append(
                f"Need {self.required_residents_count} residents, have {len(residents)}"
            )

        # Check PGY level distribution
        pgy_counts = {}
        for resident in residents:
            pgy_counts[resident.pgy_level] = pgy_counts.get(resident.pgy_level, 0) + 1

        for required_pgy in self.required_pgy_levels:
            if pgy_counts.get(required_pgy, 0) == 0:
                errors.append(f"No residents at {required_pgy} level")

        # Check required fields
        for resident in residents:
            if not resident.email:
                errors.append(f"{resident.name} missing email")
            if not resident.start_date:
                errors.append(f"{resident.name} missing start date")

        return len(errors) == 0, errors

    def validate_step3_requests(self, db_session) -> tuple[bool, List[str]]:
        """Validate resident requests step completion."""
        from .resident import Resident

        errors = []
        residents = db_session.query(Resident).filter(Resident.is_active == True).all()

        for resident in residents:
            prefs = resident.preferences_dict

            # Check for required preference categories
            required_prefs = [
                "call_preferences",
                "moonlight_preferences",
                "weekend_preferences",
            ]
            for pref in required_prefs:
                if not prefs.get(pref):
                    errors.append(f"{resident.name} missing {pref.replace('_', ' ')}")

        return len(errors) == 0, errors

    def validate_step4_holidays(self) -> tuple[bool, List[str]]:
        """Validate holiday coverage step completion."""
        errors = []

        assigned_set = set(self.assigned_holidays)
        required_set = set(self.required_holidays)

        missing_holidays = required_set - assigned_set
        if missing_holidays:
            errors.append(f"Holidays need coverage: {', '.join(missing_holidays)}")

        return len(errors) == 0, errors

    def validate_step5_historical(self) -> tuple[bool, List[str]]:
        """Validate historical import step completion."""
        errors = []

        if not self.requires_historical_import:
            return True, []

        imported_set = set(self.historical_months_imported)
        required_set = set(self.historical_months_required or [])

        missing_months = required_set - imported_set
        if missing_months:
            errors.append(f"Missing historical data: {', '.join(missing_months)}")

        return len(errors) == 0, errors

    def run_complete_validation(self, db_session) -> tuple[bool, List[str], List[str]]:
        """Run complete workflow validation."""
        all_errors = []
        all_warnings = []

        # Validate each step
        step2_valid, step2_errors = self.validate_step2_residents(db_session)
        step3_valid, step3_errors = self.validate_step3_requests(db_session)
        step4_valid, step4_errors = self.validate_step4_holidays()
        step5_valid, step5_errors = self.validate_step5_historical()

        all_errors.extend(step2_errors)
        all_errors.extend(step3_errors)
        all_errors.extend(step4_errors)
        all_errors.extend(step5_errors)

        # Update completion status
        self.step2_residents_complete = step2_valid
        self.step3_requests_complete = step3_valid
        self.step4_holidays_complete = step4_valid
        self.step5_historical_complete = step5_valid

        # Check if ready for schedule generation
        all_steps_complete = (
            self.step1_academic_year_selected
            and self.step2_residents_complete
            and self.step3_requests_complete
            and self.step4_holidays_complete
            and self.step5_historical_complete
        )

        self.ready_for_schedule = all_steps_complete
        self.last_validation = datetime.utcnow()
        self.validation_errors = all_errors
        self.validation_warnings = all_warnings

        return all_steps_complete, all_errors, all_warnings


class HolidayCoverage(Base):
    """Holiday coverage assignments for residents."""

    __tablename__ = "holiday_coverage"

    id = Column(Integer, primary_key=True, index=True)
    academic_year = Column(String(9), nullable=False, index=True)
    holiday_name = Column(String(100), nullable=False, index=True)
    holiday_date = Column(DateTime(timezone=True), nullable=False)

    # Coverage assignments
    primary_resident_id = Column(Integer, ForeignKey("residents.id"), nullable=False)
    backup_resident_id = Column(Integer, ForeignKey("residents.id"), nullable=True)

    # Holiday details
    shift_type = Column(String(50), default="Holiday Call", nullable=False)
    coverage_hours = Column(Integer, default=24, nullable=False)
    special_requirements = Column(Text, nullable=True)

    # Status
    is_confirmed = Column(Boolean, default=False, nullable=False)
    confirmation_date = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    primary_resident = relationship("Resident", foreign_keys=[primary_resident_id])
    backup_resident = relationship("Resident", foreign_keys=[backup_resident_id])

    def __repr__(self) -> str:
        return f"<HolidayCoverage(holiday='{self.holiday_name}', primary_resident_id={self.primary_resident_id})>"


class HistoricalScheduleImport(Base):
    """Track historical schedule data imports."""

    __tablename__ = "historical_schedule_imports"

    id = Column(Integer, primary_key=True, index=True)
    academic_year = Column(String(9), nullable=False, index=True)
    import_month = Column(String(20), nullable=False, index=True)  # "July 2024"

    # Import details
    import_type = Column(
        String(50), nullable=False
    )  # "CSV Upload", "Manual Entry", "API Import"
    file_name = Column(String(255), nullable=True)
    total_entries = Column(Integer, default=0, nullable=False)
    successful_imports = Column(Integer, default=0, nullable=False)
    failed_imports = Column(Integer, default=0, nullable=False)

    # Validation
    validation_errors = Column(JSON, default=list, nullable=False)
    validation_warnings = Column(JSON, default=list, nullable=False)
    is_validated = Column(Boolean, default=False, nullable=False)

    # Processing status
    status = Column(
        String(50), default="pending", nullable=False
    )  # pending, processing, completed, failed
    processing_started = Column(DateTime(timezone=True), nullable=True)
    processing_completed = Column(DateTime(timezone=True), nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    imported_by = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<HistoricalScheduleImport(academic_year='{self.academic_year}', month='{self.import_month}', status='{self.status}')>"


class ResidentPreferences(Base):
    """Detailed resident scheduling preferences and requests."""

    __tablename__ = "resident_preferences"

    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, unique=True, index=True
    )
    academic_year = Column(String(9), nullable=False, index=True)

    # Call preferences
    call_preferences = Column(
        JSON, default=dict, nullable=False
    )  # {"preferred_shifts": [], "avoid_shifts": [], "max_per_week": 2}
    moonlight_preferences = Column(
        JSON, default=dict, nullable=False
    )  # {"available_nights": [], "max_per_month": 4}
    weekend_preferences = Column(
        JSON, default=dict, nullable=False
    )  # {"weekend_call": True, "weekend_moonlight": False}

    # Holiday preferences
    holiday_availability = Column(
        JSON, default=dict, nullable=False
    )  # {"Memorial Day": "available", "Christmas": "prefer_not"}
    holiday_priority = Column(
        JSON, default=dict, nullable=False
    )  # {"Christmas": 1, "Thanksgiving": 2}

    # Special requests
    requested_call_increases = Column(
        JSON, default=list, nullable=False
    )  # Requests TO work more call
    requested_call_decreases = Column(
        JSON, default=list, nullable=False
    )  # Requests to work LESS call
    requested_moonlight_changes = Column(JSON, default=list, nullable=False)

    # Availability constraints
    unavailable_dates = Column(
        JSON, default=list, nullable=False
    )  # Specific dates unavailable
    preferred_rest_days = Column(
        JSON, default=list, nullable=False
    )  # Preferred days off

    # Personal circumstances
    childcare_constraints = Column(Text, nullable=True)
    transportation_constraints = Column(Text, nullable=True)
    other_constraints = Column(Text, nullable=True)

    # Completion tracking
    preferences_complete = Column(Boolean, default=False, nullable=False)
    completed_date = Column(DateTime(timezone=True), nullable=True)
    last_updated_by = Column(String(255), nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    resident = relationship("Resident", backref="detailed_preferences")

    def __repr__(self) -> str:
        return f"<ResidentPreferences(resident_id={self.resident_id}, academic_year='{self.academic_year}', complete={self.preferences_complete})>"

    @property
    def completion_percentage(self) -> float:
        """Calculate preferences completion percentage."""
        required_sections = [
            bool(self.call_preferences),
            bool(self.moonlight_preferences),
            bool(self.weekend_preferences),
            bool(self.holiday_availability),
        ]
        completed = sum(required_sections)
        return (completed / len(required_sections)) * 100

    def validate_preferences(self) -> tuple[bool, List[str]]:
        """Validate that all required preferences are complete."""
        errors = []

        # Check call preferences
        if not self.call_preferences:
            errors.append("Call preferences not set")
        elif not self.call_preferences.get("max_per_week"):
            errors.append("Maximum calls per week not specified")

        # Check moonlight preferences
        if not self.moonlight_preferences:
            errors.append("Moonlight preferences not set")

        # Check weekend preferences
        if not self.weekend_preferences:
            errors.append("Weekend preferences not set")

        # Check holiday availability
        if not self.holiday_availability:
            errors.append("Holiday availability not set")

        return len(errors) == 0, errors
