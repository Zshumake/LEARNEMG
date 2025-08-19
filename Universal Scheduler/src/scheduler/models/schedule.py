"""Schedule and assignment database models."""

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
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base
from typing import Dict, List, Optional
from datetime import datetime, date, time


class Schedule(Base):
    """Database model for generated schedules."""

    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True, index=True)

    # Schedule identification
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    # Schedule period
    start_date = Column(Date, nullable=False, index=True)
    end_date = Column(Date, nullable=False, index=True)

    # Generation metadata
    algorithm_used = Column(String(50), nullable=False)  # CSP, PMR_Sequential, Hybrid
    generation_parameters = Column(JSON, nullable=True)  # Algorithm settings

    # Status tracking
    status = Column(
        String(20), default="draft", nullable=False, index=True
    )  # draft, active, archived
    is_published = Column(Boolean, default=False, nullable=False)
    published_at = Column(DateTime(timezone=True), nullable=True)
    published_by = Column(String(255), nullable=True)

    # Quality metrics
    total_assignments = Column(Integer, nullable=False, default=0)
    hard_rule_violations = Column(Integer, nullable=False, default=0)
    soft_rule_violations = Column(Integer, nullable=False, default=0)
    compliance_percentage = Column(Integer, nullable=False, default=0)  # 0-100

    # Generation timing
    generation_started_at = Column(DateTime(timezone=True), nullable=True)
    generation_completed_at = Column(DateTime(timezone=True), nullable=True)
    generation_duration_seconds = Column(Integer, nullable=True)

    # Metadata
    created_by = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    assignments = relationship(
        "Assignment", back_populates="schedule", cascade="all, delete-orphan"
    )
    rule_violations = relationship(
        "RuleViolation", back_populates="schedule", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Schedule(id={self.id}, name='{self.name}', {self.start_date} to {self.end_date})>"

    @property
    def duration_days(self) -> int:
        """Calculate schedule duration in days."""
        return (self.end_date - self.start_date).days + 1

    @property
    def is_current(self) -> bool:
        """Check if this schedule covers the current date."""
        today = date.today()
        return self.start_date <= today <= self.end_date


class Assignment(Base):
    """Database model for individual shift assignments."""

    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign keys
    schedule_id = Column(
        Integer, ForeignKey("schedules.id"), nullable=False, index=True
    )
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, index=True
    )

    # Assignment details
    assignment_date = Column(Date, nullable=False, index=True)
    shift_type = Column(
        String(50), nullable=False, index=True
    )  # call, moonlight, weekend_call, etc.

    # Shift timing
    start_time = Column(Time, nullable=True)
    end_time = Column(Time, nullable=True)
    duration_hours = Column(Integer, nullable=True)

    # Location and details
    location = Column(String(255), nullable=True)
    special_instructions = Column(Text, nullable=True)

    # Assignment metadata
    assignment_method = Column(
        String(50), nullable=True
    )  # auto_generated, manual_override, swap_request
    assigned_by = Column(String(255), nullable=True)
    assignment_reason = Column(Text, nullable=True)

    # Status tracking
    status = Column(
        String(20), default="assigned", nullable=False, index=True
    )  # assigned, completed, cancelled, no_show
    confirmed_by_resident = Column(Boolean, default=False)
    confirmation_date = Column(DateTime(timezone=True), nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    schedule = relationship("Schedule", back_populates="assignments")
    resident = relationship("Resident", back_populates="assignments")

    def __repr__(self) -> str:
        return f"<Assignment(id={self.id}, resident_id={self.resident_id}, {self.assignment_date} {self.shift_type})>"

    @property
    def is_weekend(self) -> bool:
        """Check if assignment is on a weekend."""
        return self.assignment_date.weekday() >= 5  # Saturday=5, Sunday=6

    @property
    def is_past_due(self) -> bool:
        """Check if assignment date has passed."""
        return self.assignment_date < date.today()


class RuleViolation(Base):
    """Database model for tracking rule violations in schedules."""

    __tablename__ = "rule_violations"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign keys
    schedule_id = Column(
        Integer, ForeignKey("schedules.id"), nullable=False, index=True
    )
    assignment_id = Column(
        Integer, ForeignKey("assignments.id"), nullable=True, index=True
    )

    # Rule violation details
    rule_id = Column(String(10), nullable=False, index=True)  # H001, S001, etc.
    rule_category = Column(String(50), nullable=False, index=True)  # hard, soft
    rule_description = Column(Text, nullable=False)

    # Violation details
    violation_type = Column(String(50), nullable=False)
    violation_description = Column(Text, nullable=False)
    severity = Column(
        String(20), default="medium", nullable=False
    )  # low, medium, high, critical

    # Resolution tracking
    status = Column(
        String(20), default="open", nullable=False, index=True
    )  # open, resolved, ignored, waived
    resolution_notes = Column(Text, nullable=True)
    resolved_by = Column(String(255), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)

    # Metadata
    detected_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    schedule = relationship("Schedule", back_populates="rule_violations")
    assignment = relationship("Assignment")

    def __repr__(self) -> str:
        return f"<RuleViolation(id={self.id}, rule_id='{self.rule_id}', severity='{self.severity}')>"

    @property
    def is_hard_rule(self) -> bool:
        """Check if this is a hard rule violation."""
        return self.rule_category.lower() == "hard"

    @property
    def is_resolved(self) -> bool:
        """Check if violation has been resolved."""
        return self.status in ["resolved", "waived"]


class SchedulingRule(Base):
    """Database model for configurable scheduling rules."""

    __tablename__ = "scheduling_rules"

    id = Column(Integer, primary_key=True, index=True)

    # Rule identification
    rule_id = Column(
        String(10), unique=True, nullable=False, index=True
    )  # H001, S001, etc.
    rule_name = Column(String(255), nullable=False)
    rule_description = Column(Text, nullable=False)

    # Rule configuration
    rule_category = Column(String(10), nullable=False, index=True)  # hard, soft
    rule_type = Column(
        String(50), nullable=False, index=True
    )  # constraint, preference, validation
    is_enabled = Column(Boolean, default=True, nullable=False)

    # Rule parameters
    parameters = Column(JSON, nullable=True)  # Rule-specific parameters
    weight = Column(Integer, default=1, nullable=False)  # For soft rule prioritization

    # Program specificity
    program_specific = Column(
        Boolean, default=False
    )  # True if rule only applies to specific programs
    applicable_programs = Column(
        JSON, nullable=True
    )  # List of program IDs if program_specific

    # Metadata
    created_by = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"<SchedulingRule(rule_id='{self.rule_id}', category='{self.rule_category}', enabled={self.is_enabled})>"

    @property
    def is_hard_rule(self) -> bool:
        """Check if this is a hard rule."""
        return self.rule_category.lower() == "hard"
