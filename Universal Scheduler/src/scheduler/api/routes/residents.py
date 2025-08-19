"""Residents API routes."""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, status, Query
from pydantic import BaseModel, field_validator
from sqlalchemy.orm import Session
from datetime import date

from ...models import (
    get_db,
    Resident,
    TimeOffRequest,
    QuotaTarget,
    User,
    ResidentPreferences,
)
from ...services.auth import AuthService
from .auth import get_current_user, require_permission

router = APIRouter()


# Pydantic models
class ResidentCreateRequest(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    pgy_level: str
    start_date: date
    program_id: Optional[str] = None
    specializations: Optional[List[str]] = []
    preferences: Optional[dict] = {}

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        if v is None or v == "":
            return None
        # Basic email validation
        if '@' not in v or '.' not in v:
            raise ValueError('Invalid email format')
        return v.strip()


class ResidentUpdateRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    pgy_level: Optional[str] = None
    start_date: Optional[date] = None
    specializations: Optional[List[str]] = None
    preferences: Optional[dict] = None

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        if v is None or v == "":
            return None
        # Basic email validation
        if '@' not in v or '.' not in v:
            raise ValueError('Invalid email format')
        return v.strip()


class ResidentResponse(BaseModel):
    id: int
    name: str
    email: Optional[str]
    phone: Optional[str]
    pgy_level: str
    start_date: date
    program_id: Optional[str]
    specializations: List[str]
    preferences: dict
    is_active: bool

    class Config:
        from_attributes = True


class TimeOffCreateRequest(BaseModel):
    start_date: date
    end_date: date
    reason: Optional[str] = None
    request_type: str


class TimeOffResponse(BaseModel):
    id: int
    resident_id: int
    start_date: date
    end_date: date
    reason: Optional[str]
    request_type: str
    status: str
    approved_by: Optional[str]

    class Config:
        from_attributes = True


class QuotaTargetResponse(BaseModel):
    id: int
    resident_id: int
    academic_year: str
    quarter: Optional[str]
    call_shifts_target: int
    moonlight_shifts_target: int
    weekend_call_target: int
    weekend_moonlight_target: int
    call_shifts_completed: int
    moonlight_shifts_completed: int
    weekend_call_completed: int
    weekend_moonlight_completed: int
    call_progress_percentage: float
    moonlight_progress_percentage: float
    overall_progress_percentage: float

    class Config:
        from_attributes = True


@router.get("/", response_model=List[ResidentResponse])
async def get_residents(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    pgy_level: Optional[str] = Query(None),
    is_active: Optional[bool] = Query(None),
    # current_user: User = Depends(require_permission("view_residents")),
    db: Session = Depends(get_db),
):
    """Get list of residents with optional filtering."""
    query = db.query(Resident)

    if pgy_level:
        query = query.filter(Resident.pgy_level == pgy_level)

    if is_active is not None:
        query = query.filter(Resident.is_active == is_active)

    residents = query.offset(skip).limit(limit).all()

    return [
        ResidentResponse(
            id=r.id,
            name=r.name,
            email=r.email,
            phone=r.phone,
            pgy_level=r.pgy_level,
            start_date=r.start_date,
            program_id=r.program_id,
            specializations=r.specializations_list,
            preferences=r.preferences_dict,
            is_active=r.is_active,
        )
        for r in residents
    ]


@router.post("/", response_model=ResidentResponse)
async def create_resident(
    resident_data: ResidentCreateRequest,
    # current_user: User = Depends(require_permission("modify_residents")),
    db: Session = Depends(get_db),
):
    """Create a new resident."""
    try:
        # Clean up email: convert empty string to None
        email = resident_data.email.strip() if resident_data.email else None
        if email == "":
            email = None
            
        # Validate email format if provided and not empty
        if email and '@' not in email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format",
            )
        
        # Check if email already exists (only if email is provided and not empty)
        if email:
            existing = (
                db.query(Resident).filter(Resident.email == email).first()
            )
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Resident with this email already exists",
                )

        # Create resident
        resident = Resident(
            name=resident_data.name,
            email=email,
            phone=resident_data.phone,
            pgy_level=resident_data.pgy_level,
            start_date=resident_data.start_date,
            program_id=resident_data.program_id,
            specializations=resident_data.specializations,
            preferences=resident_data.preferences,
        )

        db.add(resident)
        db.commit()
        db.refresh(resident)

        # Log audit event
        auth_service = AuthService(db)
        auth_service.log_audit_event(
            user_id=1,  # Temporary for testing
            action="resident_created",
            resource_type="resident",
            resource_id=str(resident.id),
            description=f"Created resident: {resident.name}",
        )

        return ResidentResponse(
            id=resident.id,
            name=resident.name,
            email=resident.email,
            phone=resident.phone,
            pgy_level=resident.pgy_level,
            start_date=resident.start_date,
            program_id=resident.program_id,
            specializations=resident.specializations_list,
            preferences=resident.preferences_dict,
            is_active=resident.is_active,
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create resident: {str(e)}",
        )


@router.get("/{resident_id}", response_model=ResidentResponse)
async def get_resident(
    resident_id: int,
    # current_user: User = Depends(require_permission("view_residents")),
    db: Session = Depends(get_db),
):
    """Get a specific resident by ID."""
    resident = db.query(Resident).filter(Resident.id == resident_id).first()
    if not resident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Resident not found"
        )

    return ResidentResponse(
        id=resident.id,
        name=resident.name,
        email=resident.email,
        phone=resident.phone,
        pgy_level=resident.pgy_level,
        start_date=resident.start_date,
        program_id=resident.program_id,
        specializations=resident.specializations_list,
        preferences=resident.preferences_dict,
        is_active=resident.is_active,
    )


@router.put("/{resident_id}", response_model=ResidentResponse)
async def update_resident(
    resident_id: int,
    update_data: ResidentUpdateRequest,
    # current_user: User = Depends(require_permission("modify_residents")),
    db: Session = Depends(get_db),
):
    """Update a resident."""
    resident = db.query(Resident).filter(Resident.id == resident_id).first()
    if not resident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Resident not found"
        )

    try:
        # Track changes for audit
        changes = {}

        # Update fields
        for field, value in update_data.dict(exclude_unset=True).items():
            if hasattr(resident, field) and value is not None:
                old_value = getattr(resident, field)
                if old_value != value:
                    changes[field] = {"old": old_value, "new": value}
                    if field == "specializations":
                        resident.specializations_list = value
                    elif field == "preferences":
                        resident.preferences_dict = value
                    else:
                        setattr(resident, field, value)

        db.commit()
        db.refresh(resident)

        # Log audit event
        if changes:
            auth_service = AuthService(db)
            auth_service.log_audit_event(
                user_id=1,  # Temporary for testing
                action="resident_updated",
                resource_type="resident",
                resource_id=str(resident.id),
                description=f"Updated resident: {resident.name}",
                changes=changes,
            )

        return ResidentResponse(
            id=resident.id,
            name=resident.name,
            email=resident.email,
            phone=resident.phone,
            pgy_level=resident.pgy_level,
            start_date=resident.start_date,
            program_id=resident.program_id,
            specializations=resident.specializations_list,
            preferences=resident.preferences_dict,
            is_active=resident.is_active,
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update resident: {str(e)}",
        )


@router.patch("/{resident_id}/deactivate")
async def deactivate_resident(
    resident_id: int,
    # current_user: User = Depends(require_permission("modify_residents")),
    db: Session = Depends(get_db),
):
    """Deactivate a resident (soft delete)."""
    resident = db.query(Resident).filter(Resident.id == resident_id).first()
    if not resident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Resident not found"
        )

    try:
        resident.is_active = False
        db.commit()

        # Log audit event
        auth_service = AuthService(db)
        auth_service.log_audit_event(
            user_id=1,  # Temporary for testing
            action="resident_deactivated",
            resource_type="resident",
            resource_id=str(resident.id),
            description=f"Deactivated resident: {resident.name}",
        )

        return {"message": "Resident deactivated successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to deactivate resident: {str(e)}",
        )


# Time-off request endpoints
@router.get("/{resident_id}/time-off", response_model=List[TimeOffResponse])
async def get_time_off_requests(
    resident_id: int,
    # current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get time-off requests for a resident."""
    # Check permissions - temporarily disabled for testing
    # auth_service = AuthService(db)
    # if not auth_service.check_permission(current_user, "view_residents"):
    #     # Allow residents to view their own time-off requests
    #     if not (current_user.is_resident and str(current_user.id) == str(resident_id)):
    #         raise HTTPException(
    #             status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions"
    #         )

    time_off_requests = (
        db.query(TimeOffRequest).filter(TimeOffRequest.resident_id == resident_id).all()
    )

    return [
        TimeOffResponse(
            id=req.id,
            resident_id=req.resident_id,
            start_date=req.start_date,
            end_date=req.end_date,
            reason=req.reason,
            request_type=req.request_type,
            status=req.status,
            approved_by=req.approved_by,
        )
        for req in time_off_requests
    ]


@router.post("/{resident_id}/time-off", response_model=TimeOffResponse)
async def create_time_off_request(
    resident_id: int,
    request_data: TimeOffCreateRequest,
    # current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a time-off request for a resident."""
    # Check permissions - temporarily disabled for testing
    # auth_service = AuthService(db)
    # if not auth_service.check_permission(current_user, "modify_residents"):
    #     # Allow residents to create their own time-off requests
    #     if not (current_user.is_resident and str(current_user.id) == str(resident_id)):
    #         raise HTTPException(
    #             status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions"
    #         )

    # Verify resident exists
    resident = db.query(Resident).filter(Resident.id == resident_id).first()
    if not resident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Resident not found"
        )

    try:
        time_off_request = TimeOffRequest(
            resident_id=resident_id,
            start_date=request_data.start_date,
            end_date=request_data.end_date,
            reason=request_data.reason,
            request_type=request_data.request_type,
            status="pending",
        )

        db.add(time_off_request)
        db.commit()
        db.refresh(time_off_request)

        # Log audit event
        auth_service = AuthService(db)
        auth_service.log_audit_event(
            user_id=1,  # Temporary for testing
            action="time_off_requested",
            resource_type="time_off_request",
            resource_id=str(time_off_request.id),
            description=f"Time-off requested for {resident.name}: {request_data.start_date} to {request_data.end_date}",
        )

        return TimeOffResponse(
            id=time_off_request.id,
            resident_id=time_off_request.resident_id,
            start_date=time_off_request.start_date,
            end_date=time_off_request.end_date,
            reason=time_off_request.reason,
            request_type=time_off_request.request_type,
            status=time_off_request.status,
            approved_by=time_off_request.approved_by,
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create time-off request: {str(e)}",
        )


# Quota tracking endpoints
@router.get("/{resident_id}/quota", response_model=QuotaTargetResponse)
async def get_resident_quota(
    resident_id: int,
    # current_user: User = Depends(require_permission("view_residents")),
    db: Session = Depends(get_db),
):
    """Get quota target and progress for a resident."""
    quota = db.query(QuotaTarget).filter(QuotaTarget.resident_id == resident_id).first()
    if not quota:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quota target not found for resident",
        )

    return QuotaTargetResponse(
        id=quota.id,
        resident_id=quota.resident_id,
        academic_year=quota.academic_year,
        quarter=quota.quarter,
        call_shifts_target=quota.call_shifts_target,
        moonlight_shifts_target=quota.moonlight_shifts_target,
        weekend_call_target=quota.weekend_call_target,
        weekend_moonlight_target=quota.weekend_moonlight_target,
        call_shifts_completed=quota.call_shifts_completed,
        moonlight_shifts_completed=quota.moonlight_shifts_completed,
        weekend_call_completed=quota.weekend_call_completed,
        weekend_moonlight_completed=quota.weekend_moonlight_completed,
        call_progress_percentage=quota.call_progress_percentage,
        moonlight_progress_percentage=quota.moonlight_progress_percentage,
        overall_progress_percentage=quota.overall_progress_percentage,
    )


# DELETE endpoints for CRUD functionality
@router.delete("/{resident_id}")
async def delete_resident(resident_id: int, db: Session = Depends(get_db)):
    """Delete a resident and all associated data."""
    try:
        resident = db.query(Resident).filter(Resident.id == resident_id).first()
        if not resident:
            raise HTTPException(status_code=404, detail="Resident not found")

        # Delete associated preferences
        db.query(ResidentPreferences).filter(
            ResidentPreferences.resident_id == resident_id
        ).delete()

        # Delete time off requests
        db.query(TimeOffRequest).filter(
            TimeOffRequest.resident_id == resident_id
        ).delete()

        # Delete quota targets
        db.query(QuotaTarget).filter(QuotaTarget.resident_id == resident_id).delete()

        # Delete the resident
        db.delete(resident)
        db.commit()

        return {"message": f"Resident {resident.name} deleted successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to delete resident: {str(e)}"
        )


@router.delete("/")
async def clear_all_residents(db: Session = Depends(get_db)):
    """Clear all residents and associated data."""
    try:
        # Get count for reporting
        resident_count = db.query(Resident).count()

        # Delete all associated data first
        db.query(ResidentPreferences).delete()
        db.query(TimeOffRequest).delete()
        db.query(QuotaTarget).delete()

        # Delete all residents
        db.query(Resident).delete()
        db.commit()

        return {
            "message": f"Cleared {resident_count} residents and all associated data"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to clear residents: {str(e)}"
        )


@router.delete("/{resident_id}/time-off/{request_id}")
async def delete_time_off_request(
    resident_id: int, request_id: int, db: Session = Depends(get_db)
):
    """Delete a specific time off request."""
    try:
        request = (
            db.query(TimeOffRequest)
            .filter(
                TimeOffRequest.id == request_id,
                TimeOffRequest.resident_id == resident_id,
            )
            .first()
        )

        if not request:
            raise HTTPException(status_code=404, detail="Time off request not found")

        db.delete(request)
        db.commit()

        return {"message": "Time off request deleted successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to delete time off request: {str(e)}"
        )
