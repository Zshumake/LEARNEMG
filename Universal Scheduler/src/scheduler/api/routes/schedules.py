"""Schedules API routes."""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, status, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import date, datetime

from ...models import get_db, Schedule, Assignment, User
from .auth import get_current_user, require_permission

router = APIRouter()


# Pydantic models
class ScheduleResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    start_date: date
    end_date: date
    status: str
    algorithm_used: str
    total_assignments: int
    hard_rule_violations: int
    soft_rule_violations: int
    compliance_percentage: int

    class Config:
        from_attributes = True


class AssignmentResponse(BaseModel):
    id: int
    resident_id: int
    assignment_date: date
    shift_type: str
    status: str

    class Config:
        from_attributes = True


@router.get("/", response_model=List[ScheduleResponse])
async def get_schedules(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[str] = Query(None),
    # current_user: User = Depends(require_permission("view_all_schedules")),
    db: Session = Depends(get_db),
):
    """Get list of schedules."""
    query = db.query(Schedule)

    if status:
        query = query.filter(Schedule.status == status)

    schedules = query.offset(skip).limit(limit).all()

    return [
        ScheduleResponse(
            id=s.id,
            name=s.name,
            description=s.description,
            start_date=s.start_date,
            end_date=s.end_date,
            status=s.status,
            algorithm_used=s.algorithm_used,
            total_assignments=s.total_assignments,
            hard_rule_violations=s.hard_rule_violations,
            soft_rule_violations=s.soft_rule_violations,
            compliance_percentage=s.compliance_percentage,
        )
        for s in schedules
    ]


@router.get("/{schedule_id}/assignments", response_model=List[AssignmentResponse])
async def get_schedule_assignments(
    schedule_id: int,
    # current_user: User = Depends(require_permission("view_all_schedules")),
    db: Session = Depends(get_db),
):
    """Get assignments for a specific schedule."""
    # Verify schedule exists
    schedule = db.query(Schedule).filter(Schedule.id == schedule_id).first()
    if not schedule:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Schedule not found"
        )

    assignments = (
        db.query(Assignment).filter(Assignment.schedule_id == schedule_id).all()
    )

    return [
        AssignmentResponse(
            id=a.id,
            resident_id=a.resident_id,
            assignment_date=a.assignment_date,
            shift_type=a.shift_type,
            status=a.status,
        )
        for a in assignments
    ]


# DELETE endpoints for schedule CRUD functionality
@router.delete("/{schedule_id}")
async def delete_schedule(
    schedule_id: int,
    # current_user: User = Depends(require_permission("modify_schedules")),
    db: Session = Depends(get_db),
):
    """Delete a schedule and all associated assignments."""
    try:
        schedule = db.query(Schedule).filter(Schedule.id == schedule_id).first()
        if not schedule:
            raise HTTPException(status_code=404, detail="Schedule not found")

        schedule_name = schedule.name

        # Delete all associated assignments first
        assignments_count = (
            db.query(Assignment).filter(Assignment.schedule_id == schedule_id).count()
        )
        db.query(Assignment).filter(Assignment.schedule_id == schedule_id).delete()

        # Delete the schedule
        db.delete(schedule)
        db.commit()

        return {
            "message": f"Schedule '{schedule_name}' deleted successfully",
            "deleted_assignments": assignments_count,
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Failed to delete schedule: {str(e)}"
        )


@router.delete("/")
async def clear_all_schedules(
    # current_user: User = Depends(require_permission("admin")),
    db: Session = Depends(get_db),
):
    """Clear all schedules and assignments from the system."""
    try:
        # Get counts for reporting
        schedule_count = db.query(Schedule).count()
        assignment_count = db.query(Assignment).count()

        # Delete all assignments first
        db.query(Assignment).delete()

        # Delete all schedules
        db.query(Schedule).delete()
        db.commit()

        return {
            "message": "All schedules cleared successfully",
            "deleted_schedules": schedule_count,
            "deleted_assignments": assignment_count,
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Failed to clear schedules: {str(e)}"
        )


@router.get("/{schedule_id}", response_model=ScheduleResponse)
async def get_schedule(
    schedule_id: int,
    # current_user: User = Depends(require_permission("view_all_schedules")),
    db: Session = Depends(get_db),
):
    """Get a specific schedule by ID."""
    schedule = db.query(Schedule).filter(Schedule.id == schedule_id).first()
    if not schedule:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Schedule not found"
        )

    # Count assignments
    assignment_count = (
        db.query(Assignment).filter(Assignment.schedule_id == schedule_id).count()
    )

    return ScheduleResponse(
        id=schedule.id,
        name=schedule.name,
        description=schedule.description,
        start_date=schedule.start_date,
        end_date=schedule.end_date,
        status=schedule.status,
        algorithm_used=schedule.algorithm_used or "Unknown",
        total_assignments=assignment_count,
        hard_rule_violations=schedule.hard_rule_violations or 0,
        soft_rule_violations=schedule.soft_rule_violations or 0,
        compliance_percentage=schedule.compliance_percentage or 0,
    )
