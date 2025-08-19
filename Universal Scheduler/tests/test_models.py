"""Test database models."""

import pytest
from datetime import date, datetime, timedelta
from sqlalchemy.exc import IntegrityError

from src.scheduler.models import (
    User, Resident, TimeOffRequest, QuotaTarget,
    Schedule, Assignment, RuleViolation
)


class TestUserModel:
    """Test User model."""
    
    def test_create_user(self, db_session):
        """Test creating a user."""
        user = User(
            username="testuser",
            email="test@example.com",
            full_name="Test User",
            hashed_password="hashed_password",
            role="resident"
        )
        
        db_session.add(user)
        db_session.commit()
        db_session.refresh(user)
        
        assert user.id is not None
        assert user.username == "testuser"
        assert user.email == "test@example.com"
        assert user.role == "resident"
        assert user.is_active is True
        assert user.is_verified is False
    
    def test_user_unique_constraints(self, db_session):
        """Test user unique constraints."""
        # Create first user
        user1 = User(
            username="testuser",
            email="test@example.com",
            full_name="Test User 1",
            hashed_password="hashed_password",
            role="resident"
        )
        db_session.add(user1)
        db_session.commit()
        
        # Try to create user with same username
        user2 = User(
            username="testuser",  # Duplicate username
            email="test2@example.com",
            full_name="Test User 2",
            hashed_password="hashed_password",
            role="resident"
        )
        db_session.add(user2)
        
        with pytest.raises(IntegrityError):
            db_session.commit()
    
    def test_user_role_properties(self, db_session):
        """Test user role property methods."""
        admin = User(username="admin", email="admin@test.com", 
                    full_name="Admin", role="admin")
        program_director = User(username="pd", email="pd@test.com",
                              full_name="PD", role="program_director") 
        chief = User(username="chief", email="chief@test.com",
                    full_name="Chief", role="chief_resident")
        resident = User(username="resident", email="resident@test.com",
                       full_name="Resident", role="resident")
        
        assert admin.is_admin is True
        assert admin.can_modify_schedules is True
        assert admin.can_approve_time_off is True
        
        assert program_director.is_program_director is True
        assert program_director.can_modify_schedules is True
        assert program_director.can_approve_time_off is True
        
        assert chief.is_chief_resident is True
        assert chief.can_modify_schedules is True
        assert chief.can_approve_time_off is True
        
        assert resident.is_resident is True
        assert resident.can_modify_schedules is False
        assert resident.can_approve_time_off is False


class TestResidentModel:
    """Test Resident model."""
    
    def test_create_resident(self, db_session):
        """Test creating a resident."""
        resident = Resident(
            name="Dr. John Doe",
            email="john.doe@hospital.edu",
            pgy_level="PGY-2",
            start_date=date(2024, 7, 1),
            specializations=["EMG", "Pain Management"],
            preferences={"preferred_call_days": ["Tuesday", "Thursday"]}
        )
        
        db_session.add(resident)
        db_session.commit()
        db_session.refresh(resident)
        
        assert resident.id is not None
        assert resident.name == "Dr. John Doe"
        assert resident.pgy_level == "PGY-2"
        assert resident.specializations_list == ["EMG", "Pain Management"]
        assert resident.preferences_dict == {"preferred_call_days": ["Tuesday", "Thursday"]}
        assert resident.is_active is True
    
    def test_resident_specializations_property(self, db_session):
        """Test resident specializations property."""
        resident = Resident(
            name="Dr. Test",
            email="test@hospital.edu", 
            pgy_level="PGY-3",
            start_date=date.today()
        )
        
        # Test empty specializations
        assert resident.specializations_list == []
        
        # Test setting specializations
        resident.specializations_list = ["Sports Medicine", "MSK Ultrasound"]
        assert resident.specializations == ["Sports Medicine", "MSK Ultrasound"]
        
        db_session.add(resident)
        db_session.commit()
        db_session.refresh(resident)
        
        assert resident.specializations_list == ["Sports Medicine", "MSK Ultrasound"]


class TestTimeOffRequestModel:
    """Test TimeOffRequest model."""
    
    def test_create_time_off_request(self, db_session, sample_resident):
        """Test creating a time-off request."""
        time_off = TimeOffRequest(
            resident_id=sample_resident.id,
            start_date=date(2025, 8, 15),
            end_date=date(2025, 8, 20),
            reason="Vacation",
            request_type="Vacation"
        )
        
        db_session.add(time_off)
        db_session.commit()
        db_session.refresh(time_off)
        
        assert time_off.id is not None
        assert time_off.resident_id == sample_resident.id
        assert time_off.start_date == date(2025, 8, 15)
        assert time_off.end_date == date(2025, 8, 20)
        assert time_off.status == "pending"
        assert time_off.request_type == "Vacation"
    
    def test_time_off_relationship(self, db_session, sample_resident):
        """Test time-off request relationship with resident."""
        time_off = TimeOffRequest(
            resident_id=sample_resident.id,
            start_date=date(2025, 8, 15),
            end_date=date(2025, 8, 20),
            reason="Conference",
            request_type="Conference"
        )
        
        db_session.add(time_off)
        db_session.commit()
        db_session.refresh(time_off)
        
        # Test relationship
        assert time_off.resident.name == sample_resident.name
        assert len(sample_resident.time_off_requests) == 1
        assert sample_resident.time_off_requests[0].id == time_off.id


class TestQuotaTargetModel:
    """Test QuotaTarget model."""
    
    def test_create_quota_target(self, db_session, sample_resident):
        """Test creating quota targets."""
        quota = QuotaTarget(
            resident_id=sample_resident.id,
            academic_year="2024-2025",
            call_shifts_target=38,
            moonlight_shifts_target=21,
            weekend_call_target=7,
            weekend_moonlight_target=1
        )
        
        db_session.add(quota)
        db_session.commit()
        db_session.refresh(quota)
        
        assert quota.id is not None
        assert quota.resident_id == sample_resident.id
        assert quota.academic_year == "2024-2025"
        assert quota.call_shifts_target == 38
        assert quota.call_shifts_completed == 0
    
    def test_quota_progress_calculations(self, db_session, sample_resident):
        """Test quota progress calculation properties."""
        quota = QuotaTarget(
            resident_id=sample_resident.id,
            academic_year="2024-2025",
            call_shifts_target=38,
            moonlight_shifts_target=21,
            weekend_call_target=7,
            weekend_moonlight_target=1,
            call_shifts_completed=19,  # 50% complete
            moonlight_shifts_completed=7,  # ~33% complete
            weekend_call_completed=3,  # ~43% complete
            weekend_moonlight_completed=1  # 100% complete
        )
        
        db_session.add(quota)
        db_session.commit()
        db_session.refresh(quota)
        
        assert quota.call_progress_percentage == 50.0
        assert abs(quota.moonlight_progress_percentage - 33.33) < 0.1
        assert abs(quota.overall_progress_percentage - 44.78) < 0.1  # Weighted average


class TestScheduleModel:
    """Test Schedule model."""
    
    def test_create_schedule(self, db_session):
        """Test creating a schedule."""
        schedule = Schedule(
            name="Test Schedule",
            description="Test schedule for Q1",
            start_date=date(2025, 1, 1),
            end_date=date(2025, 3, 31),
            algorithm_used="CSP"
        )
        
        db_session.add(schedule)
        db_session.commit()
        db_session.refresh(schedule)
        
        assert schedule.id is not None
        assert schedule.name == "Test Schedule"
        assert schedule.status == "draft"
        assert schedule.is_published is False
        assert schedule.hard_rule_violations == 0
        assert schedule.soft_rule_violations == 0
    
    def test_schedule_duration_property(self, db_session):
        """Test schedule duration calculation."""
        schedule = Schedule(
            name="Test Schedule",
            start_date=date(2025, 1, 1),
            end_date=date(2025, 1, 31),
            algorithm_used="simple"
        )
        
        assert schedule.duration_days == 31
    
    def test_schedule_current_property(self, db_session):
        """Test schedule current property."""
        today = date.today()
        
        # Current schedule
        current_schedule = Schedule(
            name="Current Schedule",
            start_date=today - timedelta(days=10),
            end_date=today + timedelta(days=10),
            algorithm_used="simple"
        )
        
        # Future schedule
        future_schedule = Schedule(
            name="Future Schedule", 
            start_date=today + timedelta(days=30),
            end_date=today + timedelta(days=60),
            algorithm_used="simple"
        )
        
        assert current_schedule.is_current is True
        assert future_schedule.is_current is False


class TestAssignmentModel:
    """Test Assignment model."""
    
    def test_create_assignment(self, db_session, sample_schedule, sample_resident):
        """Test creating an assignment."""
        assignment = Assignment(
            schedule_id=sample_schedule.id,
            resident_id=sample_resident.id,
            assignment_date=date(2025, 1, 15),
            shift_type="call",
            start_time=datetime.strptime("17:00", "%H:%M").time(),
            end_time=datetime.strptime("08:00", "%H:%M").time(),
            duration_hours=15
        )
        
        db_session.add(assignment)
        db_session.commit()
        db_session.refresh(assignment)
        
        assert assignment.id is not None
        assert assignment.schedule_id == sample_schedule.id
        assert assignment.resident_id == sample_resident.id
        assert assignment.shift_type == "call"
        assert assignment.status == "assigned"
    
    def test_assignment_properties(self, db_session, sample_schedule, sample_resident):
        """Test assignment property methods."""
        # Weekend assignment
        weekend_assignment = Assignment(
            schedule_id=sample_schedule.id,
            resident_id=sample_resident.id,
            assignment_date=date(2025, 1, 18),  # Saturday
            shift_type="weekend_call"
        )
        
        # Past assignment
        past_assignment = Assignment(
            schedule_id=sample_schedule.id,
            resident_id=sample_resident.id,
            assignment_date=date(2020, 1, 1),
            shift_type="call"
        )
        
        assert weekend_assignment.is_weekend is True
        assert past_assignment.is_past_due is True


class TestRuleViolationModel:
    """Test RuleViolation model."""
    
    def test_create_rule_violation(self, db_session, sample_schedule):
        """Test creating a rule violation."""
        violation = RuleViolation(
            schedule_id=sample_schedule.id,
            rule_id="H012",
            rule_category="hard",
            rule_description="No resident can work both call and moonlight on same day",
            violation_type="same_day_conflict",
            violation_description="Resident assigned both call and moonlight on same day",
            severity="critical"
        )
        
        db_session.add(violation)
        db_session.commit()
        db_session.refresh(violation)
        
        assert violation.id is not None
        assert violation.rule_id == "H012"
        assert violation.rule_category == "hard"
        assert violation.severity == "critical"
        assert violation.status == "open"
    
    def test_violation_properties(self, db_session, sample_schedule):
        """Test violation property methods."""
        hard_violation = RuleViolation(
            schedule_id=sample_schedule.id,
            rule_id="H001",
            rule_category="hard",
            rule_description="Hard rule",
            violation_type="test",
            violation_description="Test violation"
        )
        
        soft_violation = RuleViolation(
            schedule_id=sample_schedule.id,
            rule_id="S001",
            rule_category="soft", 
            rule_description="Soft rule",
            violation_type="test",
            violation_description="Test violation",
            status="resolved"
        )
        
        assert hard_violation.is_hard_rule is True
        assert soft_violation.is_hard_rule is False
        assert hard_violation.is_resolved is False
        assert soft_violation.is_resolved is True