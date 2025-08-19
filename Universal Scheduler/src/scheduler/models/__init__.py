"""Database models for the scheduling system."""

from .base import Base, engine, SessionLocal, get_db, create_tables, drop_tables
from .resident import Resident, TimeOffRequest, QuotaTarget
from .schedule import Schedule, Assignment, RuleViolation, SchedulingRule
from .user import User, UserSession, AuditLog, APIKey
from .acgme_compliance import (
    DutyHourEntry,
    WeeklyDutyHourSummary,
    ACGMEViolation,
    CorrectiveAction,
    ACGMEComplianceReport,
    ACGMEConfiguration,
    ACGMEViolationType,
    ACGMEViolationSeverity,
)
from .workflow import (
    AcademicYearWorkflow,
    HolidayCoverage,
    HistoricalScheduleImport,
    ResidentPreferences,
)
from .holiday_management import (
    HolidayDefinition,
    AcademicYearHoliday,
    HolidayPeriod,
    EnhancedHolidayCoverage,
    HolidayVolunteerRequest,
    HolidayManagementService,
)

__all__ = [
    # Base
    "Base",
    "engine",
    "SessionLocal",
    "get_db",
    "create_tables",
    "drop_tables",
    # Resident models
    "Resident",
    "TimeOffRequest",
    "QuotaTarget",
    # Schedule models
    "Schedule",
    "Assignment",
    "RuleViolation",
    "SchedulingRule",
    # User models
    "User",
    "UserSession",
    "AuditLog",
    "APIKey",
    # ACGME Compliance models
    "DutyHourEntry",
    "WeeklyDutyHourSummary",
    "ACGMEViolation",
    "CorrectiveAction",
    "ACGMEComplianceReport",
    "ACGMEConfiguration",
    "ACGMEViolationType",
    "ACGMEViolationSeverity",
    # Workflow models
    "AcademicYearWorkflow",
    "HolidayCoverage",
    "HistoricalScheduleImport",
    "ResidentPreferences",
    # Holiday management models
    "HolidayDefinition",
    "AcademicYearHoliday",
    "HolidayPeriod",
    "EnhancedHolidayCoverage",
    "HolidayVolunteerRequest",
    "HolidayManagementService",
]
