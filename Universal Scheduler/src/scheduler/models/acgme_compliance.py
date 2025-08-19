"""ACGME Compliance Tracking Models."""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    Time,
    Text,
    JSON,
    Boolean,
    ForeignKey,
    Float,
    Enum,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base
from typing import Dict, List, Optional, Union
from datetime import datetime, date, time, timedelta
from enum import Enum as PyEnum
import json


class ACGMEViolationType(PyEnum):
    """Types of ACGME violations."""

    DUTY_HOURS_80_HOUR = "80_hour_weekly_limit"
    DUTY_HOURS_24_HOUR = "24_hour_consecutive_limit"
    REST_PERIOD_8_HOUR = "8_hour_rest_period"
    REST_PERIOD_14_HOUR = "14_hour_rest_period"
    CALL_FREQUENCY_4_DAY = "4_day_call_frequency"
    CALL_FREQUENCY_HOME = "home_call_frequency"
    EDUCATIONAL_ACTIVITIES = "educational_activities_minimum"
    MOONLIGHTING_LIMIT = "moonlighting_hour_limit"
    DOCUMENTATION_MISSING = "documentation_missing"


class ACGMEViolationSeverity(PyEnum):
    """Severity levels for ACGME violations."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class DutyHourEntry(Base):
    """Database model for resident duty hour tracking."""

    __tablename__ = "duty_hour_entries"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign keys
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, index=True
    )
    assignment_id = Column(
        Integer, ForeignKey("assignments.id"), nullable=True, index=True
    )

    # Time tracking
    date = Column(Date, nullable=False, index=True)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=True)
    total_hours = Column(Float, nullable=False, default=0.0)

    # Activity classification
    activity_type = Column(
        String(50), nullable=False, index=True
    )  # clinical_duties, educational, research, administrative
    is_clinical_work = Column(Boolean, default=True, nullable=False)
    is_educational = Column(Boolean, default=False, nullable=False)
    is_call_duty = Column(Boolean, default=False, nullable=False)
    is_moonlighting = Column(Boolean, default=False, nullable=False)

    # Location and supervision
    location = Column(String(255), nullable=True)
    supervisor_name = Column(String(255), nullable=True)
    supervision_level = Column(
        String(50), nullable=True
    )  # direct, indirect, autonomous

    # Entry metadata
    entry_method = Column(
        String(50), nullable=False, default="automatic"
    )  # automatic, manual, imported
    notes = Column(Text, nullable=True)
    verified_by_resident = Column(Boolean, default=False)
    verification_date = Column(DateTime(timezone=True), nullable=True)

    # Compliance flags
    potential_violation = Column(Boolean, default=False, index=True)
    violation_types = Column(JSON, nullable=True)  # List of potential violation types

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    resident = relationship("Resident")
    assignment = relationship("Assignment")
    violations = relationship("ACGMEViolation", back_populates="duty_hour_entry")

    def __repr__(self) -> str:
        return f"<DutyHourEntry(id={self.id}, resident_id={self.resident_id}, date={self.date}, hours={self.total_hours})>"

    @property
    def duration_hours(self) -> float:
        """Calculate duration in hours if end_time is set."""
        if self.end_time and self.start_time:
            duration = self.end_time - self.start_time
            return duration.total_seconds() / 3600
        return self.total_hours

    @property
    def is_overnight_call(self) -> bool:
        """Check if this is an overnight call duty."""
        if self.end_time and self.start_time:
            return self.start_time.date() != self.end_time.date()
        return False


class WeeklyDutyHourSummary(Base):
    """Database model for weekly duty hour summaries."""

    __tablename__ = "weekly_duty_hour_summaries"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign keys
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, index=True
    )

    # Week identification
    year = Column(Integer, nullable=False, index=True)
    week_number = Column(Integer, nullable=False, index=True)  # ISO week number
    week_start_date = Column(Date, nullable=False, index=True)
    week_end_date = Column(Date, nullable=False, index=True)

    # Hour summaries
    total_clinical_hours = Column(Float, nullable=False, default=0.0)
    total_educational_hours = Column(Float, nullable=False, default=0.0)
    total_research_hours = Column(Float, nullable=False, default=0.0)
    total_administrative_hours = Column(Float, nullable=False, default=0.0)
    total_moonlighting_hours = Column(Float, nullable=False, default=0.0)
    total_duty_hours = Column(Float, nullable=False, default=0.0)  # All hours combined

    # Call duty tracking
    call_shifts_count = Column(Integer, nullable=False, default=0)
    overnight_calls_count = Column(Integer, nullable=False, default=0)
    home_call_count = Column(Integer, nullable=False, default=0)

    # Rest period tracking
    longest_continuous_duty = Column(Float, nullable=False, default=0.0)
    shortest_rest_period = Column(Float, nullable=False, default=24.0)
    rest_period_violations = Column(Integer, nullable=False, default=0)

    # Compliance status
    is_compliant = Column(Boolean, default=True, nullable=False, index=True)
    violation_count = Column(Integer, nullable=False, default=0)
    max_violation_severity = Column(String(20), nullable=True)

    # Quality metrics
    educational_hours_percentage = Column(Float, nullable=False, default=0.0)
    clinical_efficiency_score = Column(Float, nullable=True)

    # Metadata
    last_calculated = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    resident = relationship("Resident")
    violations = relationship("ACGMEViolation", back_populates="weekly_summary")

    def __repr__(self) -> str:
        return f"<WeeklyDutyHourSummary(resident_id={self.resident_id}, week={self.week_start_date}, total_hours={self.total_duty_hours})>"

    @property
    def compliance_percentage(self) -> float:
        """Calculate overall compliance percentage."""
        if self.total_duty_hours <= 80:
            return 100.0
        return min(100.0, (80.0 / self.total_duty_hours) * 100)

    @property
    def is_80_hour_compliant(self) -> bool:
        """Check if week is under 80-hour limit."""
        return self.total_duty_hours <= 80.0

    @property
    def hours_over_limit(self) -> float:
        """Calculate hours over 80-hour limit."""
        return max(0.0, self.total_duty_hours - 80.0)


class ACGMEViolation(Base):
    """Database model for ACGME compliance violations."""

    __tablename__ = "acgme_violations"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign keys
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, index=True
    )
    duty_hour_entry_id = Column(
        Integer, ForeignKey("duty_hour_entries.id"), nullable=True, index=True
    )
    weekly_summary_id = Column(
        Integer, ForeignKey("weekly_duty_hour_summaries.id"), nullable=True, index=True
    )
    schedule_id = Column(Integer, ForeignKey("schedules.id"), nullable=True, index=True)

    # Violation details
    violation_type = Column(Enum(ACGMEViolationType), nullable=False, index=True)
    severity = Column(Enum(ACGMEViolationSeverity), nullable=False, index=True)
    violation_date = Column(Date, nullable=False, index=True)

    # Description and context
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    context_details = Column(JSON, nullable=True)  # Additional context data

    # Violation metrics
    actual_value = Column(Float, nullable=True)  # e.g., 85.5 hours
    limit_value = Column(Float, nullable=True)  # e.g., 80.0 hours
    excess_amount = Column(Float, nullable=True)  # e.g., 5.5 hours over

    # Detection and resolution
    detection_method = Column(String(50), nullable=False, default="automatic")
    detected_at = Column(DateTime(timezone=True), nullable=False)

    # Status tracking
    status = Column(
        String(20), default="active", nullable=False, index=True
    )  # active, resolved, waived, appealed
    resolution_method = Column(String(100), nullable=True)
    resolution_notes = Column(Text, nullable=True)
    resolved_by = Column(String(255), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)

    # Program director review
    requires_pd_review = Column(Boolean, default=True, nullable=False)
    pd_reviewed = Column(Boolean, default=False, nullable=False)
    pd_review_date = Column(DateTime(timezone=True), nullable=True)
    pd_review_notes = Column(Text, nullable=True)
    pd_action_required = Column(Boolean, default=False, nullable=False)

    # Reporting and documentation
    reported_to_program = Column(Boolean, default=False, nullable=False)
    reported_to_institution = Column(Boolean, default=False, nullable=False)
    reported_to_acgme = Column(Boolean, default=False, nullable=False)
    report_submitted_date = Column(DateTime(timezone=True), nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    resident = relationship("Resident")
    duty_hour_entry = relationship("DutyHourEntry", back_populates="violations")
    weekly_summary = relationship("WeeklyDutyHourSummary", back_populates="violations")
    schedule = relationship("Schedule")
    corrective_actions = relationship("CorrectiveAction", back_populates="violation")

    def __repr__(self) -> str:
        return f"<ACGMEViolation(id={self.id}, type={self.violation_type.value}, severity={self.severity.value})>"

    @property
    def is_critical(self) -> bool:
        """Check if this is a critical violation."""
        return self.severity == ACGMEViolationSeverity.CRITICAL

    @property
    def requires_immediate_action(self) -> bool:
        """Check if violation requires immediate action."""
        return self.severity in [
            ACGMEViolationSeverity.HIGH,
            ACGMEViolationSeverity.CRITICAL,
        ]

    @property
    def days_since_detection(self) -> int:
        """Calculate days since violation was detected."""
        return (datetime.utcnow() - self.detected_at).days


class CorrectiveAction(Base):
    """Database model for corrective actions taken for ACGME violations."""

    __tablename__ = "corrective_actions"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign keys
    violation_id = Column(
        Integer, ForeignKey("acgme_violations.id"), nullable=False, index=True
    )
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, index=True
    )

    # Action details
    action_type = Column(
        String(100), nullable=False, index=True
    )  # schedule_adjustment, counseling, education, policy_change
    action_description = Column(Text, nullable=False)
    action_date = Column(Date, nullable=False)

    # Implementation tracking
    assigned_to = Column(String(255), nullable=False)
    due_date = Column(Date, nullable=True)
    completion_date = Column(Date, nullable=True)
    status = Column(
        String(20), default="planned", nullable=False, index=True
    )  # planned, in_progress, completed, cancelled

    # Effectiveness tracking
    expected_outcome = Column(Text, nullable=True)
    actual_outcome = Column(Text, nullable=True)
    effectiveness_rating = Column(Integer, nullable=True)  # 1-10 scale

    # Follow-up requirements
    requires_follow_up = Column(Boolean, default=False)
    follow_up_date = Column(Date, nullable=True)
    follow_up_completed = Column(Boolean, default=False)

    # Metadata
    created_by = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    violation = relationship("ACGMEViolation", back_populates="corrective_actions")
    resident = relationship("Resident")

    def __repr__(self) -> str:
        return f"<CorrectiveAction(id={self.id}, type={self.action_type}, status={self.status})>"

    @property
    def is_overdue(self) -> bool:
        """Check if corrective action is overdue."""
        if self.due_date and self.status not in ["completed", "cancelled"]:
            return date.today() > self.due_date
        return False


class ACGMEComplianceReport(Base):
    """Database model for ACGME compliance reports."""

    __tablename__ = "acgme_compliance_reports"

    id = Column(Integer, primary_key=True, index=True)

    # Report identification
    report_name = Column(String(255), nullable=False)
    report_type = Column(
        String(50), nullable=False, index=True
    )  # monthly, quarterly, annual, incident

    # Report period
    start_date = Column(Date, nullable=False, index=True)
    end_date = Column(Date, nullable=False, index=True)

    # Program scope
    program_id = Column(String(50), nullable=True, index=True)
    include_all_residents = Column(Boolean, default=True)
    specific_residents = Column(JSON, nullable=True)  # List of resident IDs if not all

    # Compliance metrics
    total_residents = Column(Integer, nullable=False, default=0)
    compliant_residents = Column(Integer, nullable=False, default=0)
    compliance_rate = Column(Float, nullable=False, default=0.0)

    # Violation summary
    total_violations = Column(Integer, nullable=False, default=0)
    critical_violations = Column(Integer, nullable=False, default=0)
    high_violations = Column(Integer, nullable=False, default=0)
    resolved_violations = Column(Integer, nullable=False, default=0)

    # Duty hour statistics
    avg_weekly_hours = Column(Float, nullable=False, default=0.0)
    max_weekly_hours = Column(Float, nullable=False, default=0.0)
    weeks_over_80_hours = Column(Integer, nullable=False, default=0)

    # Report data
    detailed_data = Column(JSON, nullable=True)  # Full report data structure
    summary_statistics = Column(JSON, nullable=True)  # Summary statistics

    # Generation metadata
    generated_by = Column(String(255), nullable=False)
    generation_parameters = Column(JSON, nullable=True)

    # Status and submission
    status = Column(String(20), default="draft", nullable=False, index=True)
    submitted_to_acgme = Column(Boolean, default=False)
    submission_date = Column(DateTime(timezone=True), nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"<ACGMEComplianceReport(id={self.id}, type={self.report_type}, period={self.start_date}-{self.end_date})>"

    @property
    def compliance_percentage(self) -> float:
        """Calculate compliance percentage."""
        if self.total_residents == 0:
            return 0.0
        return (self.compliant_residents / self.total_residents) * 100

    @property
    def violation_rate(self) -> float:
        """Calculate violations per resident."""
        if self.total_residents == 0:
            return 0.0
        return self.total_violations / self.total_residents


class ACGMEConfiguration(Base):
    """Database model for ACGME compliance configuration settings."""

    __tablename__ = "acgme_configuration"

    id = Column(Integer, primary_key=True, index=True)

    # Configuration identification
    config_key = Column(String(100), unique=True, nullable=False, index=True)
    config_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    # Configuration value
    value = Column(JSON, nullable=False)  # Flexible JSON value storage
    data_type = Column(
        String(20), nullable=False
    )  # int, float, string, bool, list, dict

    # Limits and constraints
    min_value = Column(Float, nullable=True)
    max_value = Column(Float, nullable=True)
    allowed_values = Column(JSON, nullable=True)  # List of allowed values for enums

    # Program specificity
    program_specific = Column(Boolean, default=False)
    applicable_programs = Column(JSON, nullable=True)

    # Configuration metadata
    is_editable = Column(Boolean, default=True)
    requires_restart = Column(Boolean, default=False)
    category = Column(String(50), nullable=False, default="general")

    # Change tracking
    last_modified_by = Column(String(255), nullable=True)
    last_modified_at = Column(DateTime(timezone=True), nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"<ACGMEConfiguration(key='{self.config_key}', value={self.value})>"

    @property
    def typed_value(self) -> Union[int, float, str, bool, list, dict]:
        """Get value with proper type conversion."""
        if self.data_type == "int":
            return int(self.value)
        elif self.data_type == "float":
            return float(self.value)
        elif self.data_type == "bool":
            return bool(self.value)
        else:
            return self.value
