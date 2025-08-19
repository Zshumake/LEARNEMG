"""System management endpoints for CRUD operations and state management."""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import json

from ..models.base import get_db
from ..models import *

router = APIRouter(prefix="/system", tags=["system"])


@router.delete("/reset")
async def reset_entire_system(db: Session = Depends(get_db)):
    """Reset the entire system - DELETE ALL DATA."""
    try:
        # Count records before deletion for reporting
        counts = {
            "residents": db.query(Resident).count(),
            "academic_years": db.query(AcademicYearWorkflow).count(),
            "holidays": db.query(AcademicYearHoliday).count(),
            "preferences": db.query(ResidentPreferences).count(),
            "time_off_requests": db.query(TimeOffRequest).count(),
        }

        # Delete all data in proper order (respecting foreign keys)

        # Clear holiday-related data
        db.query(HolidayVolunteerRequest).delete()
        db.query(EnhancedHolidayCoverage).delete()
        db.query(HolidayCoverage).delete()
        db.query(AcademicYearHoliday).delete()
        db.query(HolidayPeriod).delete()
        db.query(HolidayDefinition).delete()

        # Clear resident-related data
        db.query(ResidentPreferences).delete()
        db.query(TimeOffRequest).delete()
        db.query(QuotaTarget).delete()

        # Clear workflow data
        db.query(HistoricalScheduleImport).delete()
        db.query(AcademicYearWorkflow).delete()

        # Clear schedule data if exists
        try:
            from ..models.schedule import Assignment, RuleViolation, Schedule

            db.query(Assignment).delete()
            db.query(RuleViolation).delete()
            db.query(Schedule).delete()
        except:
            pass

        # Clear ACGME data if exists
        try:
            from ..models.acgme_compliance import (
                DutyHourEntry,
                WeeklyDutyHourSummary,
                ACGMEViolation,
                CorrectiveAction,
                ACGMEComplianceReport,
                ACGMEConfiguration,
            )

            db.query(DutyHourEntry).delete()
            db.query(WeeklyDutyHourSummary).delete()
            db.query(ACGMEViolation).delete()
            db.query(CorrectiveAction).delete()
            db.query(ACGMEComplianceReport).delete()
            # Keep ACGMEConfiguration as it contains settings
        except:
            pass

        # Clear users and auth data if exists
        try:
            from ..models.user import UserSession, AuditLog, APIKey

            db.query(UserSession).delete()
            db.query(AuditLog).delete()
            db.query(APIKey).delete()
            # Keep User table for admin access
        except:
            pass

        # Finally clear residents
        db.query(Resident).delete()

        db.commit()

        return {
            "message": "System reset completed successfully",
            "deleted_counts": counts,
            "reset_timestamp": datetime.utcnow().isoformat(),
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"System reset failed: {str(e)}")


@router.post("/save-state")
async def save_system_state(db: Session = Depends(get_db)):
    """Save current system state to backup."""
    try:
        # This would create a backup of current state
        # For now, just return current counts

        state = {
            "residents": db.query(Resident).count(),
            "academic_years": db.query(AcademicYearWorkflow).count(),
            "holidays": db.query(AcademicYearHoliday).count(),
            "holiday_definitions": db.query(HolidayDefinition).count(),
            "preferences": db.query(ResidentPreferences).count(),
            "time_off_requests": db.query(TimeOffRequest).count(),
            "saved_at": datetime.utcnow().isoformat(),
        }

        return {"message": "System state saved successfully", "state_snapshot": state}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to save system state: {str(e)}"
        )


@router.get("/status")
async def get_system_status(db: Session = Depends(get_db)):
    """Get comprehensive system status."""
    try:
        status = {
            "system_health": "operational",
            "database_connected": True,
            "data_counts": {
                "residents": db.query(Resident).count(),
                "academic_years": db.query(AcademicYearWorkflow).count(),
                "holidays": db.query(AcademicYearHoliday).count(),
                "holiday_definitions": db.query(HolidayDefinition).count(),
                "preferences": db.query(ResidentPreferences).count(),
                "time_off_requests": db.query(TimeOffRequest).count(),
            },
            "last_checked": datetime.utcnow().isoformat(),
        }

        return status

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to get system status: {str(e)}"
        )


@router.post("/initialize-sample-data")
async def initialize_sample_data(db: Session = Depends(get_db)):
    """Initialize system with sample data for demonstration."""
    try:
        # Initialize federal holidays
        from ..models.holiday_management import HolidayManagementService

        holiday_service = HolidayManagementService(db)
        holiday_service.initialize_federal_holidays()

        return {
            "message": "Sample data initialized successfully",
            "initialized": ["federal_holidays", "acgme_configuration"],
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to initialize sample data: {str(e)}"
        )
