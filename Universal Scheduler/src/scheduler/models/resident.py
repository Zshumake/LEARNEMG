"""Resident database models."""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    JSON,
    Boolean,
    DateTime,
    Text,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base
from typing import Dict, List, Optional
import json


class Resident(Base):
    """Database model for medical residents."""

    __tablename__ = "residents"

    # Primary identification
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=True, index=True)
    phone = Column(String(50), nullable=True)

    # Program information
    pgy_level = Column(String(10), nullable=False, index=True)  # PGY-1, PGY-2, etc.
    start_date = Column(Date, nullable=False)
    program_id = Column(
        String(50), nullable=True, index=True
    )  # For multi-program support

    # Specializations and preferences
    specializations = Column(JSON, nullable=True)  # List of specialization strings
    preferences = Column(JSON, nullable=True)  # Dict of scheduling preferences

    # Status tracking
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    last_updated = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    time_off_requests = relationship(
        "TimeOffRequest", back_populates="resident", cascade="all, delete-orphan"
    )
    assignments = relationship(
        "Assignment", back_populates="resident", cascade="all, delete-orphan"
    )
    quota_targets = relationship(
        "QuotaTarget",
        back_populates="resident",
        cascade="all, delete-orphan",
        uselist=False,
    )

    def __repr__(self) -> str:
        return f"<Resident(id={self.id}, name='{self.name}', pgy_level='{self.pgy_level}')>"

    @property
    def display_name(self) -> str:
        """Get display name for UI (handles duplicate names)."""
        return self.name

    @property
    def specializations_list(self) -> List[str]:
        """Get specializations as a list."""
        return self.specializations or []

    @specializations_list.setter
    def specializations_list(self, value: List[str]):
        """Set specializations from a list."""
        self.specializations = value if value else []

    @property
    def preferences_dict(self) -> Dict:
        """Get preferences as a dictionary."""
        return self.preferences or {}

    @preferences_dict.setter
    def preferences_dict(self, value: Dict):
        """Set preferences from a dictionary."""
        self.preferences = value if value else {}


class TimeOffRequest(Base):
    """Database model for resident time-off requests."""

    __tablename__ = "time_off_requests"

    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, index=True
    )

    # Time-off period
    start_date = Column(Date, nullable=False, index=True)
    end_date = Column(Date, nullable=False, index=True)

    # Request details
    reason = Column(Text, nullable=True)
    request_type = Column(
        String(50), nullable=False
    )  # Vacation, Conference, Medical, etc.

    # Approval workflow
    status = Column(
        String(20), default="pending", nullable=False, index=True
    )  # pending, approved, denied
    approved_by = Column(String(255), nullable=True)
    approval_date = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    resident = relationship("Resident", back_populates="time_off_requests")

    def __repr__(self) -> str:
        return f"<TimeOffRequest(id={self.id}, resident_id={self.resident_id}, {self.start_date} to {self.end_date})>"


class QuotaTarget(Base):
    """Database model for resident quota targets."""

    __tablename__ = "quota_targets"

    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(
        Integer, ForeignKey("residents.id"), nullable=False, unique=True, index=True
    )

    # Academic year identification
    academic_year = Column(String(9), nullable=False, index=True)  # "2024-2025"
    quarter = Column(String(10), nullable=True, index=True)  # Q1, Q2, Q3, Q4

    # Quota targets by shift type
    call_shifts_target = Column(Integer, nullable=False, default=0)
    moonlight_shifts_target = Column(Integer, nullable=False, default=0)
    weekend_call_target = Column(Integer, nullable=False, default=0)
    weekend_moonlight_target = Column(Integer, nullable=False, default=0)

    # Current progress (calculated fields)
    call_shifts_completed = Column(Integer, nullable=False, default=0)
    moonlight_shifts_completed = Column(Integer, nullable=False, default=0)
    weekend_call_completed = Column(Integer, nullable=False, default=0)
    weekend_moonlight_completed = Column(Integer, nullable=False, default=0)

    # Metadata
    last_calculated = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    resident = relationship("Resident", back_populates="quota_targets")

    def __repr__(self) -> str:
        return f"<QuotaTarget(resident_id={self.resident_id}, call={self.call_shifts_completed}/{self.call_shifts_target})>"

    @property
    def call_progress_percentage(self) -> float:
        """Calculate call shifts completion percentage."""
        if self.call_shifts_target == 0:
            return 0.0
        return (self.call_shifts_completed / self.call_shifts_target) * 100

    @property
    def moonlight_progress_percentage(self) -> float:
        """Calculate moonlight shifts completion percentage."""
        if self.moonlight_shifts_target == 0:
            return 0.0
        return (self.moonlight_shifts_completed / self.moonlight_shifts_target) * 100

    @property
    def overall_progress_percentage(self) -> float:
        """Calculate overall completion percentage."""
        total_target = (
            self.call_shifts_target
            + self.moonlight_shifts_target
            + self.weekend_call_target
            + self.weekend_moonlight_target
        )
        if total_target == 0:
            return 0.0

        total_completed = (
            self.call_shifts_completed
            + self.moonlight_shifts_completed
            + self.weekend_call_completed
            + self.weekend_moonlight_completed
        )
        return (total_completed / total_target) * 100
