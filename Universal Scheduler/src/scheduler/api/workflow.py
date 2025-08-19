"""API endpoints for academic year workflow management."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from datetime import datetime, date

from ..models.base import get_db
from ..models.workflow import (
    AcademicYearWorkflow,
    HolidayCoverage,
    HistoricalScheduleImport,
    ResidentPreferences,
)
from ..models.holiday_management import (
    HolidayDefinition,
    AcademicYearHoliday,
    HolidayPeriod,
    EnhancedHolidayCoverage,
    HolidayVolunteerRequest,
    HolidayManagementService,
)
from ..models.resident import Resident, TimeOffRequest, QuotaTarget

# from ..services.auth import get_current_user
# from ..models.user import User

router = APIRouter(prefix="/workflow", tags=["workflow"])


# Pydantic models for API
class AcademicYearCreate(BaseModel):
    academic_year: str
    required_residents_count: int = 12
    required_pgy_levels: List[str] = ["PGY-2", "PGY-3", "PGY-4"]


class AcademicYearResponse(BaseModel):
    id: int
    academic_year: str
    step1_academic_year_selected: bool
    step2_residents_complete: bool
    step3_requests_complete: bool
    step4_holidays_complete: bool
    step5_historical_complete: bool
    ready_for_schedule: bool
    completion_percentage: float
    next_step: str
    residents_count: int
    validation_errors: List[str]

    class Config:
        from_attributes = True


class HolidayCoverageCreate(BaseModel):
    academic_year: str
    holiday_name: str
    holiday_date: datetime
    primary_resident_id: int
    backup_resident_id: Optional[int] = None
    shift_type: str = "Holiday Call"
    coverage_hours: int = 24
    special_requirements: Optional[str] = None


class HolidayCoverageResponse(BaseModel):
    id: int
    academic_year: str
    holiday_name: str
    holiday_date: datetime
    primary_resident_id: int
    backup_resident_id: Optional[int]
    shift_type: str
    coverage_hours: int
    is_confirmed: bool

    class Config:
        from_attributes = True


class ResidentPreferencesCreate(BaseModel):
    resident_id: int
    academic_year: str
    call_preferences: Dict[str, Any]
    moonlight_preferences: Dict[str, Any]
    weekend_preferences: Dict[str, Any]
    holiday_availability: Dict[str, Any]
    special_requests: Optional[str] = None


class HistoricalImportCreate(BaseModel):
    academic_year: str
    import_month: str
    import_type: str
    file_name: Optional[str] = None
    schedule_data: List[Dict[str, Any]]


# Holiday Management Pydantic models
class HolidayDefinitionCreate(BaseModel):
    name: str
    holiday_type: str = "Program"  # Federal, State, Hospital, Program
    recurring_pattern: Optional[str] = None
    requires_coverage: bool = True
    minimum_pgy_level: Optional[str] = None
    coverage_level: str = "Full"
    special_requirements: Optional[str] = None


class HolidayDefinitionResponse(BaseModel):
    id: int
    name: str
    holiday_type: str
    requires_coverage: bool
    minimum_pgy_level: Optional[str]
    coverage_level: str
    is_active: bool

    class Config:
        from_attributes = True


class AcademicYearHolidayCreate(BaseModel):
    holiday_definition_id: int
    holiday_date: date
    observed_date: Optional[date] = None
    is_coverage_required: bool = True
    chief_notes: Optional[str] = None
    coverage_override: Optional[str] = None


class AcademicYearHolidayResponse(BaseModel):
    id: int
    academic_year: str
    holiday_date: date
    observed_date: Optional[date]
    is_coverage_required: bool
    coverage_assigned: bool
    coverage_confirmed: bool
    name: str
    holiday_type: str
    chief_notes: Optional[str]

    class Config:
        from_attributes = True


class HolidayPeriodCreate(BaseModel):
    period_name: str
    start_date: date
    end_date: date
    reduced_staffing: bool = True
    minimum_residents_required: int = 2
    preferred_residents: Optional[List[int]] = None
    notes: Optional[str] = None


class HolidayVolunteerRequestCreate(BaseModel):
    resident_id: int
    holiday_id: int
    volunteer_priority: int  # 1-5 scale
    can_work_primary: bool = True
    can_work_backup: bool = True
    has_family_conflict: bool = False
    needs_transportation: bool = False
    preferred_shift_time: Optional[str] = None
    notes: Optional[str] = None


@router.get("/academic-years", response_model=List[AcademicYearResponse])
async def get_academic_years(db: Session = Depends(get_db)):
    """Get all academic year workflows."""
    workflows = db.query(AcademicYearWorkflow).all()

    result = []
    for workflow in workflows:
        # Calculate dynamic fields
        residents_count = db.query(Resident).filter(Resident.is_active == True).count()

        result.append(
            AcademicYearResponse(
                id=workflow.id,
                academic_year=workflow.academic_year,
                step1_academic_year_selected=workflow.step1_academic_year_selected,
                step2_residents_complete=workflow.step2_residents_complete,
                step3_requests_complete=workflow.step3_requests_complete,
                step4_holidays_complete=workflow.step4_holidays_complete,
                step5_historical_complete=workflow.step5_historical_complete,
                ready_for_schedule=workflow.ready_for_schedule,
                completion_percentage=workflow.completion_percentage,
                next_step=workflow.next_step,
                residents_count=residents_count,
                validation_errors=workflow.validation_errors,
            )
        )

    return result


@router.get("/academic-years/{academic_year}", response_model=AcademicYearResponse)
async def get_academic_year(academic_year: str, db: Session = Depends(get_db)):
    """Get specific academic year workflow."""
    workflow = (
        db.query(AcademicYearWorkflow)
        .filter(AcademicYearWorkflow.academic_year == academic_year)
        .first()
    )

    if not workflow:
        raise HTTPException(status_code=404, detail="Academic year workflow not found")

    # Calculate dynamic fields
    residents_count = db.query(Resident).filter(Resident.is_active == True).count()

    return AcademicYearResponse(
        id=workflow.id,
        academic_year=workflow.academic_year,
        step1_academic_year_selected=workflow.step1_academic_year_selected,
        step2_residents_complete=workflow.step2_residents_complete,
        step3_requests_complete=workflow.step3_requests_complete,
        step4_holidays_complete=workflow.step4_holidays_complete,
        step5_historical_complete=workflow.step5_historical_complete,
        ready_for_schedule=workflow.ready_for_schedule,
        completion_percentage=workflow.completion_percentage,
        next_step=workflow.next_step,
        residents_count=residents_count,
        validation_errors=workflow.validation_errors,
    )


@router.post("/academic-years", response_model=AcademicYearResponse)
async def create_academic_year(
    academic_year_data: AcademicYearCreate, db: Session = Depends(get_db)
):
    """Create new academic year workflow."""
    # Check if already exists
    existing = (
        db.query(AcademicYearWorkflow)
        .filter(AcademicYearWorkflow.academic_year == academic_year_data.academic_year)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400, detail="Academic year workflow already exists"
        )

    # Determine if historical import is required
    year_start = datetime(int(academic_year_data.academic_year.split("-")[0]), 7, 1)
    current_date = datetime.now()
    needs_historical = current_date > year_start

    # Calculate required historical months
    historical_months = []
    if needs_historical:
        temp_date = year_start
        while temp_date < current_date:
            historical_months.append(temp_date.strftime("%B %Y"))
            if temp_date.month == 12:
                temp_date = temp_date.replace(year=temp_date.year + 1, month=1)
            else:
                temp_date = temp_date.replace(month=temp_date.month + 1)

    # Create workflow
    workflow = AcademicYearWorkflow(
        academic_year=academic_year_data.academic_year,
        required_residents_count=academic_year_data.required_residents_count,
        required_pgy_levels=academic_year_data.required_pgy_levels,
        requires_historical_import=needs_historical,
        historical_months_required=historical_months if needs_historical else [],
        step5_historical_complete=not needs_historical,  # Auto-complete if no import needed
    )

    db.add(workflow)
    db.commit()
    db.refresh(workflow)

    return AcademicYearResponse(
        id=workflow.id,
        academic_year=workflow.academic_year,
        step1_academic_year_selected=True,
        step2_residents_complete=False,
        step3_requests_complete=False,
        step4_holidays_complete=False,
        step5_historical_complete=workflow.step5_historical_complete,
        ready_for_schedule=False,
        completion_percentage=20.0 if not needs_historical else 16.67,
        next_step="Add residents with PGY levels",
        residents_count=0,
        validation_errors=[],
    )


@router.put("/academic-years/{academic_year}/validate")
async def validate_workflow(academic_year: str, db: Session = Depends(get_db)):
    """Run complete workflow validation and update state."""
    workflow = (
        db.query(AcademicYearWorkflow)
        .filter(AcademicYearWorkflow.academic_year == academic_year)
        .first()
    )

    if not workflow:
        raise HTTPException(status_code=404, detail="Academic year workflow not found")

    # Run validation
    is_ready, errors, warnings = workflow.run_complete_validation(db)

    db.commit()

    return {
        "ready_for_schedule": is_ready,
        "errors": errors,
        "warnings": warnings,
        "completion_percentage": workflow.completion_percentage,
        "next_step": workflow.next_step,
    }


@router.get(
    "/academic-years/{academic_year}/holidays",
    response_model=List[HolidayCoverageResponse],
)
async def get_holiday_coverage(academic_year: str, db: Session = Depends(get_db)):
    """Get holiday coverage assignments for academic year."""
    holidays = (
        db.query(HolidayCoverage)
        .filter(HolidayCoverage.academic_year == academic_year)
        .all()
    )

    return holidays


@router.post(
    "/academic-years/{academic_year}/holidays", response_model=HolidayCoverageResponse
)
async def create_holiday_coverage(
    academic_year: str,
    holiday_data: HolidayCoverageCreate,
    db: Session = Depends(get_db),
):
    """Create holiday coverage assignment."""
    # Verify resident exists
    resident = (
        db.query(Resident)
        .filter(Resident.id == holiday_data.primary_resident_id)
        .first()
    )
    if not resident:
        raise HTTPException(status_code=404, detail="Primary resident not found")

    if holiday_data.backup_resident_id:
        backup = (
            db.query(Resident)
            .filter(Resident.id == holiday_data.backup_resident_id)
            .first()
        )
        if not backup:
            raise HTTPException(status_code=404, detail="Backup resident not found")

    # Create holiday coverage
    holiday_coverage = HolidayCoverage(
        academic_year=academic_year,
        holiday_name=holiday_data.holiday_name,
        holiday_date=holiday_data.holiday_date,
        primary_resident_id=holiday_data.primary_resident_id,
        backup_resident_id=holiday_data.backup_resident_id,
        shift_type=holiday_data.shift_type,
        coverage_hours=holiday_data.coverage_hours,
        special_requirements=holiday_data.special_requirements,
    )

    db.add(holiday_coverage)
    db.commit()
    db.refresh(holiday_coverage)

    return holiday_coverage


@router.post("/academic-years/{academic_year}/preferences")
async def save_resident_preferences(
    academic_year: str,
    preferences_data: ResidentPreferencesCreate,
    db: Session = Depends(get_db),
):
    """Save resident scheduling preferences."""
    # Check if preferences already exist
    existing = (
        db.query(ResidentPreferences)
        .filter(
            ResidentPreferences.resident_id == preferences_data.resident_id,
            ResidentPreferences.academic_year == academic_year,
        )
        .first()
    )

    if existing:
        # Update existing
        existing.call_preferences = preferences_data.call_preferences
        existing.moonlight_preferences = preferences_data.moonlight_preferences
        existing.weekend_preferences = preferences_data.weekend_preferences
        existing.holiday_availability = preferences_data.holiday_availability
        existing.updated_at = datetime.utcnow()
        preferences = existing
    else:
        # Create new
        preferences = ResidentPreferences(
            resident_id=preferences_data.resident_id,
            academic_year=academic_year,
            call_preferences=preferences_data.call_preferences,
            moonlight_preferences=preferences_data.moonlight_preferences,
            weekend_preferences=preferences_data.weekend_preferences,
            holiday_availability=preferences_data.holiday_availability,
        )
        db.add(preferences)

    # Check if preferences are complete
    is_valid, errors = preferences.validate_preferences()
    preferences.preferences_complete = is_valid
    if is_valid:
        preferences.completed_date = datetime.utcnow()

    db.commit()
    db.refresh(preferences)

    return {
        "message": "Preferences saved successfully",
        "complete": is_valid,
        "errors": errors,
    }


@router.get("/academic-years/{academic_year}/preferences")
async def get_resident_preferences(academic_year: str, db: Session = Depends(get_db)):
    """Get all resident preferences for academic year."""
    preferences = (
        db.query(ResidentPreferences)
        .filter(ResidentPreferences.academic_year == academic_year)
        .all()
    )

    return preferences


@router.post("/academic-years/{academic_year}/historical-import")
async def import_historical_schedule(
    academic_year: str,
    import_data: HistoricalImportCreate,
    db: Session = Depends(get_db),
):
    """Import historical schedule data."""
    # Create import record
    import_record = HistoricalScheduleImport(
        academic_year=academic_year,
        import_month=import_data.import_month,
        import_type=import_data.import_type,
        file_name=import_data.file_name,
        total_entries=len(import_data.schedule_data),
        status="processing",
    )

    db.add(import_record)
    db.commit()

    # Process the schedule data (simplified for demo)
    successful_imports = 0
    failed_imports = 0
    validation_errors = []

    for entry in import_data.schedule_data:
        try:
            # Validate required fields
            required_fields = ["resident_name", "date", "shift_type", "hours_worked"]
            missing_fields = [field for field in required_fields if field not in entry]

            if missing_fields:
                validation_errors.append(f"Missing fields: {', '.join(missing_fields)}")
                failed_imports += 1
                continue

            # TODO: Convert to actual assignment records
            # For now, just count as successful
            successful_imports += 1

        except Exception as e:
            validation_errors.append(f"Error processing entry: {str(e)}")
            failed_imports += 1

    # Update import record
    import_record.successful_imports = successful_imports
    import_record.failed_imports = failed_imports
    import_record.validation_errors = validation_errors
    import_record.status = (
        "completed" if failed_imports == 0 else "completed_with_errors"
    )
    import_record.processing_completed = datetime.utcnow()

    db.commit()

    return {
        "message": f"Import completed for {import_data.import_month}",
        "total_entries": len(import_data.schedule_data),
        "successful": successful_imports,
        "failed": failed_imports,
        "errors": validation_errors,
    }


@router.get("/academic-years/{academic_year}/historical-imports")
async def get_historical_imports(academic_year: str, db: Session = Depends(get_db)):
    """Get historical import status for academic year."""
    imports = (
        db.query(HistoricalScheduleImport)
        .filter(HistoricalScheduleImport.academic_year == academic_year)
        .all()
    )

    return imports


@router.get("/academic-years/{academic_year}/status")
async def get_workflow_status(academic_year: str, db: Session = Depends(get_db)):
    """Get complete workflow status with validation."""
    workflow = (
        db.query(AcademicYearWorkflow)
        .filter(AcademicYearWorkflow.academic_year == academic_year)
        .first()
    )

    if not workflow:
        raise HTTPException(status_code=404, detail="Academic year workflow not found")

    # Run validation
    is_ready, errors, warnings = workflow.run_complete_validation(db)
    db.commit()

    # Get detailed counts
    residents_count = db.query(Resident).filter(Resident.is_active == True).count()
    preferences_count = (
        db.query(ResidentPreferences)
        .filter(
            ResidentPreferences.academic_year == academic_year,
            ResidentPreferences.preferences_complete == True,
        )
        .count()
    )
    holidays_count = (
        db.query(HolidayCoverage)
        .filter(HolidayCoverage.academic_year == academic_year)
        .count()
    )

    return {
        "academic_year": academic_year,
        "completion_percentage": workflow.completion_percentage,
        "next_step": workflow.next_step,
        "ready_for_schedule": is_ready,
        "step1_complete": workflow.step1_academic_year_selected,
        "step2_complete": workflow.step2_residents_complete,
        "step3_complete": workflow.step3_requests_complete,
        "step4_complete": workflow.step4_holidays_complete,
        "step5_complete": workflow.step5_historical_complete,
        "residents_count": residents_count,
        "preferences_complete": preferences_count,
        "holidays_assigned": holidays_count,
        "validation_errors": errors,
        "validation_warnings": warnings,
        "requires_historical": workflow.requires_historical_import,
        "historical_months_required": workflow.historical_months_required,
        "historical_months_imported": workflow.historical_months_imported,
    }


# === HOLIDAY MANAGEMENT API ENDPOINTS ===


@router.get("/holiday-definitions", response_model=List[HolidayDefinitionResponse])
async def get_holiday_definitions(db: Session = Depends(get_db)):
    """Get all holiday definitions."""
    holidays = (
        db.query(HolidayDefinition)
        .filter(HolidayDefinition.is_active == True)
        .order_by(HolidayDefinition.name)
        .all()
    )
    return holidays


@router.post("/holiday-definitions", response_model=HolidayDefinitionResponse)
async def create_holiday_definition(
    holiday_data: HolidayDefinitionCreate, db: Session = Depends(get_db)
):
    """Create a new holiday definition."""
    # Check if holiday already exists
    existing = (
        db.query(HolidayDefinition)
        .filter(
            HolidayDefinition.name == holiday_data.name,
            HolidayDefinition.is_active == True,
        )
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="Holiday definition already exists")

    holiday = HolidayDefinition(**holiday_data.dict())
    db.add(holiday)
    db.commit()
    db.refresh(holiday)

    return holiday


@router.get(
    "/academic-years/{academic_year}/dynamic-holidays",
    response_model=List[AcademicYearHolidayResponse],
)
async def get_dynamic_holidays(academic_year: str, db: Session = Depends(get_db)):
    """Get all holidays for an academic year with dynamic management."""
    holiday_service = HolidayManagementService(db)

    # Initialize federal holidays if not done
    try:
        holiday_service.initialize_federal_holidays()

        # Generate holidays for academic year if not done
        holiday_service.generate_academic_year_holidays(academic_year)
    except Exception as e:
        # Log error but continue - may already be initialized
        pass

    holidays = holiday_service.get_holidays_for_academic_year(academic_year)

    return [
        AcademicYearHolidayResponse(
            id=holiday.id,
            academic_year=holiday.academic_year,
            holiday_date=holiday.holiday_date,
            observed_date=holiday.observed_date,
            is_coverage_required=holiday.is_coverage_required,
            coverage_assigned=holiday.coverage_assigned,
            coverage_confirmed=holiday.coverage_confirmed,
            name=holiday.name,
            holiday_type=holiday.holiday_type,
            chief_notes=holiday.chief_notes,
        )
        for holiday in holidays
    ]


@router.post(
    "/academic-years/{academic_year}/dynamic-holidays",
    response_model=AcademicYearHolidayResponse,
)
async def create_academic_year_holiday(
    academic_year: str,
    holiday_data: AcademicYearHolidayCreate,
    db: Session = Depends(get_db),
):
    """Create a specific holiday instance for an academic year."""
    # Verify holiday definition exists
    holiday_def = (
        db.query(HolidayDefinition)
        .filter(HolidayDefinition.id == holiday_data.holiday_definition_id)
        .first()
    )

    if not holiday_def:
        raise HTTPException(status_code=404, detail="Holiday definition not found")

    # Check if holiday already exists for this academic year
    existing = (
        db.query(AcademicYearHoliday)
        .filter(
            AcademicYearHoliday.academic_year == academic_year,
            AcademicYearHoliday.holiday_definition_id
            == holiday_data.holiday_definition_id,
            AcademicYearHoliday.holiday_date == holiday_data.holiday_date,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400, detail="Holiday already exists for this date"
        )

    # Create holiday instance
    holiday = AcademicYearHoliday(academic_year=academic_year, **holiday_data.dict())

    db.add(holiday)
    db.commit()
    db.refresh(holiday)

    return AcademicYearHolidayResponse(
        id=holiday.id,
        academic_year=holiday.academic_year,
        holiday_date=holiday.holiday_date,
        observed_date=holiday.observed_date,
        is_coverage_required=holiday.is_coverage_required,
        coverage_assigned=holiday.coverage_assigned,
        coverage_confirmed=holiday.coverage_confirmed,
        name=holiday.name,
        holiday_type=holiday.holiday_type,
        chief_notes=holiday.chief_notes,
    )


@router.put("/academic-years/{academic_year}/dynamic-holidays/{holiday_id}")
async def update_academic_year_holiday(
    academic_year: str,
    holiday_id: int,
    update_data: dict,
    db: Session = Depends(get_db),
):
    """Update holiday details with chief input."""
    holiday = (
        db.query(AcademicYearHoliday)
        .filter(
            AcademicYearHoliday.id == holiday_id,
            AcademicYearHoliday.academic_year == academic_year,
        )
        .first()
    )

    if not holiday:
        raise HTTPException(status_code=404, detail="Holiday not found")

    # Update allowed fields
    allowed_fields = [
        "is_coverage_required",
        "chief_notes",
        "coverage_override",
        "observed_date",
    ]
    for field, value in update_data.items():
        if field in allowed_fields:
            setattr(holiday, field, value)

    db.commit()

    return {"message": "Holiday updated successfully"}


@router.post("/academic-years/{academic_year}/holiday-periods")
async def create_holiday_period(
    academic_year: str, period_data: HolidayPeriodCreate, db: Session = Depends(get_db)
):
    """Create a holiday period (e.g., Christmas week)."""
    holiday_service = HolidayManagementService(db)

    period = holiday_service.create_holiday_period(
        academic_year=academic_year, **period_data.dict()
    )

    return {"message": "Holiday period created successfully", "period_id": period.id}


@router.get("/academic-years/{academic_year}/holiday-periods")
async def get_holiday_periods(academic_year: str, db: Session = Depends(get_db)):
    """Get all holiday periods for an academic year."""
    periods = (
        db.query(HolidayPeriod)
        .filter(HolidayPeriod.academic_year == academic_year)
        .order_by(HolidayPeriod.start_date)
        .all()
    )

    return periods


@router.post("/academic-years/{academic_year}/holiday-volunteer-requests")
async def create_volunteer_request(
    academic_year: str,
    request_data: HolidayVolunteerRequestCreate,
    db: Session = Depends(get_db),
):
    """Submit a resident volunteer request for holiday coverage."""
    # Verify resident exists
    resident = (
        db.query(Resident).filter(Resident.id == request_data.resident_id).first()
    )
    if not resident:
        raise HTTPException(status_code=404, detail="Resident not found")

    # Verify holiday exists
    holiday = (
        db.query(AcademicYearHoliday)
        .filter(
            AcademicYearHoliday.id == request_data.holiday_id,
            AcademicYearHoliday.academic_year == academic_year,
        )
        .first()
    )
    if not holiday:
        raise HTTPException(status_code=404, detail="Holiday not found")

    # Check if request already exists
    existing = (
        db.query(HolidayVolunteerRequest)
        .filter(
            HolidayVolunteerRequest.resident_id == request_data.resident_id,
            HolidayVolunteerRequest.holiday_id == request_data.holiday_id,
            HolidayVolunteerRequest.academic_year == academic_year,
        )
        .first()
    )

    if existing:
        # Update existing request
        for field, value in request_data.dict().items():
            if field not in ["resident_id", "holiday_id"]:
                setattr(existing, field, value)
        volunteer_request = existing
    else:
        # Create new request
        volunteer_request = HolidayVolunteerRequest(
            academic_year=academic_year, **request_data.dict()
        )
        db.add(volunteer_request)

    db.commit()

    return {"message": "Volunteer request submitted successfully"}


@router.get("/academic-years/{academic_year}/holiday-volunteer-requests")
async def get_volunteer_requests(academic_year: str, db: Session = Depends(get_db)):
    """Get all volunteer requests for an academic year."""
    requests = (
        db.query(HolidayVolunteerRequest)
        .filter(HolidayVolunteerRequest.academic_year == academic_year)
        .order_by(HolidayVolunteerRequest.volunteer_priority)
        .all()
    )

    return requests


@router.get("/academic-years/{academic_year}/holidays-needing-coverage")
async def get_holidays_needing_coverage(
    academic_year: str, db: Session = Depends(get_db)
):
    """Get holidays that still need coverage assignment."""
    holiday_service = HolidayManagementService(db)
    holidays = holiday_service.get_holidays_needing_coverage(academic_year)

    return [
        AcademicYearHolidayResponse(
            id=holiday.id,
            academic_year=holiday.academic_year,
            holiday_date=holiday.holiday_date,
            observed_date=holiday.observed_date,
            is_coverage_required=holiday.is_coverage_required,
            coverage_assigned=holiday.coverage_assigned,
            coverage_confirmed=holiday.coverage_confirmed,
            name=holiday.name,
            holiday_type=holiday.holiday_type,
            chief_notes=holiday.chief_notes,
        )
        for holiday in holidays
    ]


@router.post("/academic-years/{academic_year}/assign-holiday-coverage/{holiday_id}")
async def assign_holiday_coverage(
    academic_year: str,
    holiday_id: int,
    assignment_data: dict,
    db: Session = Depends(get_db),
):
    """Assign coverage for a specific holiday."""
    holiday_service = HolidayManagementService(db)

    try:
        coverage = holiday_service.assign_holiday_coverage(
            holiday_id=holiday_id,
            primary_resident_id=assignment_data["primary_resident_id"],
            backup_resident_id=assignment_data.get("backup_resident_id"),
            **{
                k: v
                for k, v in assignment_data.items()
                if k not in ["primary_resident_id", "backup_resident_id"]
            },
        )

        return {
            "message": "Holiday coverage assigned successfully",
            "coverage_id": coverage.id,
        }

    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to assign coverage: {str(e)}"
        )


@router.delete("/academic-years/{academic_year}")
async def delete_academic_year(
    academic_year: str, 
    clear_residents: bool = False,
    db: Session = Depends(get_db)
):
    """Delete an academic year workflow and all associated data."""
    try:
        # Delete workflow
        workflow = (
            db.query(AcademicYearWorkflow)
            .filter(AcademicYearWorkflow.academic_year == academic_year)
            .first()
        )

        if not workflow:
            raise HTTPException(status_code=404, detail="Academic year not found")

        # Delete associated data
        db.query(ResidentPreferences).filter(
            ResidentPreferences.academic_year == academic_year
        ).delete()

        db.query(HolidayCoverage).filter(
            HolidayCoverage.academic_year == academic_year
        ).delete()

        db.query(HistoricalScheduleImport).filter(
            HistoricalScheduleImport.academic_year == academic_year
        ).delete()

        # Delete dynamic holidays
        db.query(AcademicYearHoliday).filter(
            AcademicYearHoliday.academic_year == academic_year
        ).delete()

        # Delete holiday periods
        db.query(HolidayPeriod).filter(
            HolidayPeriod.academic_year == academic_year
        ).delete()
        
        # Optionally clear all residents if requested
        residents_cleared = 0
        if clear_residents:
            residents_cleared = db.query(Resident).count()
            
            # Clear all resident-related data first
            db.query(ResidentPreferences).delete()
            db.query(TimeOffRequest).delete() 
            db.query(QuotaTarget).delete()
            
            # Clear residents
            db.query(Resident).delete()

        db.delete(workflow)
        db.commit()

        result = {"message": f"Academic year {academic_year} deleted successfully"}
        if clear_residents:
            result["residents_cleared"] = residents_cleared
        
        return result

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to delete academic year: {str(e)}"
        )


@router.put("/academic-years/{academic_year}/update-name")
async def update_academic_year_name(
    academic_year: str, update_data: dict, db: Session = Depends(get_db)
):
    """Update an academic year's name and all associated references."""
    try:
        new_name = update_data.get("new_academic_year")
        if not new_name:
            raise HTTPException(status_code=400, detail="new_academic_year is required")

        # Validate new name format
        if new_name.count("-") != 1:
            raise HTTPException(status_code=400, detail="Invalid academic year format")

        # Check if new name already exists
        existing = (
            db.query(AcademicYearWorkflow)
            .filter(AcademicYearWorkflow.academic_year == new_name)
            .first()
        )
        if existing:
            raise HTTPException(
                status_code=400, detail="Academic year name already exists"
            )

        # Find the workflow to update
        workflow = (
            db.query(AcademicYearWorkflow)
            .filter(AcademicYearWorkflow.academic_year == academic_year)
            .first()
        )

        if not workflow:
            raise HTTPException(status_code=404, detail="Academic year not found")

        # Update the workflow
        workflow.academic_year = new_name

        # Update all associated data
        # Update resident preferences
        db.query(ResidentPreferences).filter(
            ResidentPreferences.academic_year == academic_year
        ).update({ResidentPreferences.academic_year: new_name})

        # Update time off requests
        db.query(TimeOffRequest).filter(
            TimeOffRequest.academic_year == academic_year
        ).update({TimeOffRequest.academic_year: new_name})

        # Update quota targets
        db.query(QuotaTarget).filter(QuotaTarget.academic_year == academic_year).update(
            {QuotaTarget.academic_year: new_name}
        )

        # Update holiday-related data
        db.query(AcademicYearHoliday).filter(
            AcademicYearHoliday.academic_year == academic_year
        ).update({AcademicYearHoliday.academic_year: new_name})

        db.query(HolidayPeriod).filter(
            HolidayPeriod.academic_year == academic_year
        ).update({HolidayPeriod.academic_year: new_name})

        # Update historical imports
        db.query(HistoricalScheduleImport).filter(
            HistoricalScheduleImport.academic_year == academic_year
        ).update({HistoricalScheduleImport.academic_year: new_name})

        db.commit()

        return {
            "message": f"Academic year updated from '{academic_year}' to '{new_name}'",
            "old_name": academic_year,
            "new_name": new_name,
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Failed to update academic year name: {str(e)}"
        )


@router.delete("/academic-years/{academic_year}/residents")
async def clear_residents_for_year(academic_year: str, db: Session = Depends(get_db)):
    """Clear all residents and their data for an academic year."""
    try:
        # Delete preferences
        db.query(ResidentPreferences).filter(
            ResidentPreferences.academic_year == academic_year
        ).delete()

        # Note: We don't delete actual residents as they might be used across years
        # Instead, we clear their preferences and associations for this year

        db.commit()
        return {"message": f"Cleared resident data for {academic_year}"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to clear residents: {str(e)}"
        )


@router.delete("/academic-years/{academic_year}/preferences")
async def clear_preferences(academic_year: str, db: Session = Depends(get_db)):
    """Clear all resident preferences for an academic year."""
    try:
        deleted_count = (
            db.query(ResidentPreferences)
            .filter(ResidentPreferences.academic_year == academic_year)
            .delete()
        )

        db.commit()
        return {
            "message": f"Cleared {deleted_count} preference records for {academic_year}"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to clear preferences: {str(e)}"
        )


@router.delete("/academic-years/{academic_year}/holidays")
async def clear_holiday_coverage(academic_year: str, db: Session = Depends(get_db)):
    """Clear all holiday coverage assignments for an academic year."""
    try:
        # Clear enhanced coverage
        db.query(EnhancedHolidayCoverage).filter(
            EnhancedHolidayCoverage.academic_year == academic_year
        ).delete()

        # Clear regular coverage
        db.query(HolidayCoverage).filter(
            HolidayCoverage.academic_year == academic_year
        ).delete()

        # Reset holiday assignment status
        holidays = (
            db.query(AcademicYearHoliday)
            .filter(AcademicYearHoliday.academic_year == academic_year)
            .all()
        )

        for holiday in holidays:
            holiday.coverage_assigned = False
            holiday.coverage_confirmed = False

        db.commit()
        return {"message": f"Cleared holiday coverage for {academic_year}"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to clear holiday coverage: {str(e)}"
        )


@router.delete("/holiday-definitions/{definition_id}")
async def delete_holiday_definition(definition_id: int, db: Session = Depends(get_db)):
    """Delete a holiday definition."""
    try:
        definition = (
            db.query(HolidayDefinition)
            .filter(HolidayDefinition.id == definition_id)
            .first()
        )

        if not definition:
            raise HTTPException(status_code=404, detail="Holiday definition not found")

        # Check if it's being used
        in_use = (
            db.query(AcademicYearHoliday)
            .filter(AcademicYearHoliday.holiday_definition_id == definition_id)
            .first()
        )

        if in_use:
            raise HTTPException(
                status_code=400,
                detail="Cannot delete holiday definition that is in use",
            )

        db.delete(definition)
        db.commit()

        return {"message": f"Holiday definition '{definition.name}' deleted"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to delete holiday definition: {str(e)}"
        )


@router.get("/academic-years/{academic_year}/csp-holiday-requirements")
async def get_csp_holiday_requirements(
    academic_year: str, db: Session = Depends(get_db)
):
    """Get holiday coverage requirements formatted for CSP engine."""
    holiday_service = HolidayManagementService(db)

    try:
        requirements = holiday_service.get_coverage_requirements_for_csp(academic_year)
        return requirements
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to get holiday requirements: {str(e)}"
        )


@router.post("/academic-years/{academic_year}/generate-schedule-with-holidays")
async def generate_schedule_with_holiday_integration(
    academic_year: str, schedule_params: dict, db: Session = Depends(get_db)
):
    """Generate schedule with integrated holiday management and CSP engine."""
    try:
        # Initialize holiday management service
        holiday_service = HolidayManagementService(db)

        # Get holiday requirements for CSP
        holiday_requirements = holiday_service.get_coverage_requirements_for_csp(
            academic_year
        )

        # Import and initialize CSP engine
        from ..services.csp_scheduling_engine import CSPSchedulingEngine
        from ..services.pmr_rules_engine import PMRSchedulingRules

        # Create rules engine
        pmr_rules = PMRSchedulingRules()

        # Create CSP engine with holiday integration
        csp_engine = CSPSchedulingEngine(pmr_rules)

        # Set up schedule generation with holiday requirements
        start_date = datetime.strptime(schedule_params["start_date"], "%Y-%m-%d").date()
        end_date = datetime.strptime(schedule_params["end_date"], "%Y-%m-%d").date()

        # Set database session first
        csp_engine.db_session = db

        # Integrate with database models
        csp_engine.integrate_with_database_models()

        # Setup generation with holiday requirements
        csp_engine.setup_schedule_generation(
            residents=csp_engine.residents,
            start_date=start_date,
            end_date=end_date,
            holiday_requirements=holiday_requirements,
            db_session=db,
        )

        # Generate schedule
        schedule, stats = csp_engine.generate_schedule()

        # Process results for ACGME compliance
        compliance_results = {}
        if schedule:
            try:
                from ..services.acgme_compliance_engine import ACGMEComplianceEngine

                compliance_engine = ACGMEComplianceEngine(db)

                # Create schedule record first (simplified for demo)
                from ..models import Schedule as DBSchedule

                db_schedule = DBSchedule(
                    name=f"Generated Schedule {academic_year}",
                    description=f"Auto-generated schedule with holiday integration",
                    start_date=start_date,
                    end_date=end_date,
                    is_active=True,
                )
                db.add(db_schedule)
                db.commit()

                # Process for compliance (would convert CSP assignments to DB assignments)
                # compliance_results = compliance_engine.process_schedule_for_compliance(db_schedule.id)

            except Exception as compliance_error:
                print(f"⚠️ ACGME compliance processing failed: {compliance_error}")
                compliance_results = {"error": str(compliance_error)}

        return {
            "message": "Schedule generation completed",
            "success": len(schedule) > 0,
            "schedule_assignments": len(schedule),
            "holiday_requirements_processed": len(holiday_requirements),
            "generation_stats": stats,
            "compliance_results": compliance_results,
            "academic_year": academic_year,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Schedule generation failed: {str(e)}"
        )
