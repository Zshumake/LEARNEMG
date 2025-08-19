"""Business logic for resident management."""

from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from datetime import date, datetime

from ..models import Resident, TimeOffRequest, QuotaTarget
from .auth import AuthService


class ResidentService:
    """Service class for resident management business logic."""

    def __init__(self, db: Session):
        self.db = db
        self.auth_service = AuthService(db)

    def create_resident(
        self,
        name: str,
        email: str,
        pgy_level: str,
        start_date: date,
        phone: Optional[str] = None,
        program_id: Optional[str] = None,
        specializations: Optional[List[str]] = None,
        preferences: Optional[Dict[str, Any]] = None,
    ) -> Resident:
        """Create a new resident with validation."""

        # Validate input
        if not name or not email:
            raise ValueError("Name and email are required")

        if pgy_level not in ["PGY-1", "PGY-2", "PGY-3", "PGY-4", "PGY-5"]:
            raise ValueError("Invalid PGY level")

        # Check for duplicate email
        existing = self.db.query(Resident).filter(Resident.email == email).first()
        if existing:
            raise ValueError(f"Resident with email {email} already exists")

        # Create resident
        resident = Resident(
            name=name,
            email=email,
            phone=phone,
            pgy_level=pgy_level,
            start_date=start_date,
            program_id=program_id,
            specializations=specializations or [],
            preferences=preferences or {},
        )

        self.db.add(resident)
        self.db.commit()
        self.db.refresh(resident)

        # Create default quota targets
        self._create_default_quota_targets(resident)

        return resident

    def update_resident(self, resident_id: int, **updates) -> Resident:
        """Update a resident with validation."""

        resident = self.get_resident(resident_id)
        if not resident:
            raise ValueError(f"Resident with ID {resident_id} not found")

        # Validate updates
        if "email" in updates:
            existing = (
                self.db.query(Resident)
                .filter(Resident.email == updates["email"], Resident.id != resident_id)
                .first()
            )
            if existing:
                raise ValueError(f"Email {updates['email']} already in use")

        if "pgy_level" in updates:
            if updates["pgy_level"] not in [
                "PGY-1",
                "PGY-2",
                "PGY-3",
                "PGY-4",
                "PGY-5",
            ]:
                raise ValueError("Invalid PGY level")

        # Apply updates
        for field, value in updates.items():
            if hasattr(resident, field):
                if field == "specializations":
                    resident.specializations_list = value
                elif field == "preferences":
                    resident.preferences_dict = value
                else:
                    setattr(resident, field, value)

        self.db.commit()
        self.db.refresh(resident)

        return resident

    def get_resident(self, resident_id: int) -> Optional[Resident]:
        """Get a resident by ID."""
        return self.db.query(Resident).filter(Resident.id == resident_id).first()

    def get_residents(
        self,
        pgy_level: Optional[str] = None,
        is_active: Optional[bool] = None,
        program_id: Optional[str] = None,
        skip: int = 0,
        limit: int = 100,
    ) -> List[Resident]:
        """Get residents with optional filtering."""

        query = self.db.query(Resident)

        if pgy_level:
            query = query.filter(Resident.pgy_level == pgy_level)

        if is_active is not None:
            query = query.filter(Resident.is_active == is_active)

        if program_id:
            query = query.filter(Resident.program_id == program_id)

        return query.offset(skip).limit(limit).all()

    def deactivate_resident(self, resident_id: int) -> bool:
        """Deactivate a resident (soft delete)."""
        resident = self.get_resident(resident_id)
        if not resident:
            return False

        resident.is_active = False
        self.db.commit()
        return True

    def add_time_off_request(
        self,
        resident_id: int,
        start_date: date,
        end_date: date,
        request_type: str,
        reason: Optional[str] = None,
    ) -> TimeOffRequest:
        """Add a time-off request for a resident."""

        # Validate resident exists
        resident = self.get_resident(resident_id)
        if not resident:
            raise ValueError(f"Resident with ID {resident_id} not found")

        # Validate dates
        if start_date >= end_date:
            raise ValueError("End date must be after start date")

        if start_date < date.today():
            raise ValueError("Cannot request time-off for past dates")

        # Check for overlapping requests
        overlapping = (
            self.db.query(TimeOffRequest)
            .filter(
                TimeOffRequest.resident_id == resident_id,
                TimeOffRequest.status.in_(["pending", "approved"]),
                TimeOffRequest.start_date <= end_date,
                TimeOffRequest.end_date >= start_date,
            )
            .first()
        )

        if overlapping:
            raise ValueError("Time-off request overlaps with existing request")

        # Create request
        time_off = TimeOffRequest(
            resident_id=resident_id,
            start_date=start_date,
            end_date=end_date,
            reason=reason,
            request_type=request_type,
            status="pending",
        )

        self.db.add(time_off)
        self.db.commit()
        self.db.refresh(time_off)

        return time_off

    def approve_time_off_request(
        self, request_id: int, approved_by: str, notes: Optional[str] = None
    ) -> TimeOffRequest:
        """Approve a time-off request."""

        request = (
            self.db.query(TimeOffRequest)
            .filter(TimeOffRequest.id == request_id)
            .first()
        )

        if not request:
            raise ValueError(f"Time-off request with ID {request_id} not found")

        if request.status != "pending":
            raise ValueError(f"Cannot approve request with status: {request.status}")

        request.status = "approved"
        request.approved_by = approved_by
        request.approval_date = datetime.utcnow()
        request.notes = notes

        self.db.commit()
        self.db.refresh(request)

        return request

    def get_resident_time_off(
        self, resident_id: int, include_past: bool = False
    ) -> List[TimeOffRequest]:
        """Get time-off requests for a resident."""

        query = self.db.query(TimeOffRequest).filter(
            TimeOffRequest.resident_id == resident_id
        )

        if not include_past:
            query = query.filter(TimeOffRequest.end_date >= date.today())

        return query.order_by(TimeOffRequest.start_date).all()

    def get_quota_targets(self, resident_id: int) -> Optional[QuotaTarget]:
        """Get quota targets for a resident."""
        return (
            self.db.query(QuotaTarget)
            .filter(QuotaTarget.resident_id == resident_id)
            .first()
        )

    def update_quota_progress(
        self,
        resident_id: int,
        call_completed: Optional[int] = None,
        moonlight_completed: Optional[int] = None,
        weekend_call_completed: Optional[int] = None,
        weekend_moonlight_completed: Optional[int] = None,
    ) -> QuotaTarget:
        """Update quota completion progress."""

        quota = self.get_quota_targets(resident_id)
        if not quota:
            raise ValueError(f"No quota targets found for resident {resident_id}")

        if call_completed is not None:
            quota.call_shifts_completed = call_completed

        if moonlight_completed is not None:
            quota.moonlight_shifts_completed = moonlight_completed

        if weekend_call_completed is not None:
            quota.weekend_call_completed = weekend_call_completed

        if weekend_moonlight_completed is not None:
            quota.weekend_moonlight_completed = weekend_moonlight_completed

        quota.last_calculated = datetime.utcnow()

        self.db.commit()
        self.db.refresh(quota)

        return quota

    def _create_default_quota_targets(self, resident: Resident) -> QuotaTarget:
        """Create default quota targets based on PGY level."""

        # Default quotas by PGY level (for full academic year)
        default_quotas = {
            "PGY-1": {
                "call": 20,
                "moonlight": 10,
                "weekend_call": 4,
                "weekend_moonlight": 0,
            },
            "PGY-2": {
                "call": 38,
                "moonlight": 21,
                "weekend_call": 7,
                "weekend_moonlight": 1,
            },
            "PGY-3": {
                "call": 30,
                "moonlight": 27,
                "weekend_call": 3,
                "weekend_moonlight": 4,
            },
            "PGY-4": {
                "call": 5,
                "moonlight": 27,
                "weekend_call": 1,
                "weekend_moonlight": 4,
            },
            "PGY-5": {
                "call": 3,
                "moonlight": 30,
                "weekend_call": 0,
                "weekend_moonlight": 2,
            },
        }

        quotas = default_quotas.get(resident.pgy_level, default_quotas["PGY-2"])

        # Determine academic year from start date
        start_year = resident.start_date.year
        if resident.start_date.month >= 7:  # Academic year starts July
            academic_year = f"{start_year}-{start_year + 1}"
        else:
            academic_year = f"{start_year - 1}-{start_year}"

        quota_target = QuotaTarget(
            resident_id=resident.id,
            academic_year=academic_year,
            call_shifts_target=quotas["call"],
            moonlight_shifts_target=quotas["moonlight"],
            weekend_call_target=quotas["weekend_call"],
            weekend_moonlight_target=quotas["weekend_moonlight"],
        )

        self.db.add(quota_target)
        self.db.commit()
        self.db.refresh(quota_target)

        return quota_target

    def get_residents_by_availability(
        self, target_date: date, shift_type: str = None
    ) -> List[Resident]:
        """Get residents available for a specific date and shift type."""

        # Get all active residents
        residents = self.get_residents(is_active=True)

        available_residents = []

        for resident in residents:
            # Check time-off requests
            time_off = (
                self.db.query(TimeOffRequest)
                .filter(
                    TimeOffRequest.resident_id == resident.id,
                    TimeOffRequest.status.in_(["approved", "pending"]),
                    TimeOffRequest.start_date <= target_date,
                    TimeOffRequest.end_date >= target_date,
                )
                .first()
            )

            if time_off:
                continue  # Resident not available due to time-off

            # Apply shift-type specific rules (simplified)
            if shift_type == "call" and resident.pgy_level == "PGY-2":
                # PGY-2 call restrictions in July
                if target_date.month == 7 and target_date.day < 15:
                    continue

            if shift_type == "moonlight" and resident.pgy_level == "PGY-2":
                # PGY-2 moonlight restrictions in July
                if target_date.month == 7:
                    continue

            available_residents.append(resident)

        return available_residents
