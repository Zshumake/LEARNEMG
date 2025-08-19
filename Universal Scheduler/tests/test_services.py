"""Test business logic services."""

import pytest
from datetime import date, datetime, timedelta
from sqlalchemy.exc import IntegrityError

from src.scheduler.services import AuthService, ResidentService, SchedulingService
from src.scheduler.services.auth import AuthenticationError, AuthorizationError


class TestAuthService:
    """Test authentication service."""
    
    def test_create_user(self, db_session):
        """Test creating a user."""
        auth_service = AuthService(db_session)
        
        user = auth_service.create_user(
            username="testuser",
            email="test@example.com",
            full_name="Test User",
            password="password123",
            role="resident"
        )
        
        assert user.id is not None
        assert user.username == "testuser"
        assert user.email == "test@example.com"
        assert user.role == "resident"
        assert user.hashed_password != "password123"  # Should be hashed
    
    def test_authenticate_user(self, db_session):
        """Test user authentication."""
        auth_service = AuthService(db_session)
        
        # Create user
        user = auth_service.create_user(
            username="testuser",
            email="test@example.com", 
            full_name="Test User",
            password="password123"
        )
        
        # Test successful authentication
        authenticated_user = auth_service.authenticate_user("testuser", "password123")
        assert authenticated_user is not None
        assert authenticated_user.id == user.id
        
        # Test failed authentication
        failed_user = auth_service.authenticate_user("testuser", "wrongpassword")
        assert failed_user is None
        
        # Test nonexistent user
        nonexistent = auth_service.authenticate_user("nonexistent", "password")
        assert nonexistent is None
    
    def test_create_tokens(self, db_session):
        """Test JWT token creation."""
        auth_service = AuthService(db_session)
        
        data = {"sub": "123", "username": "testuser"}
        
        # Create access token
        access_token = auth_service.create_access_token(data)
        assert access_token is not None
        assert isinstance(access_token, str)
        
        # Create refresh token  
        refresh_token = auth_service.create_refresh_token(data)
        assert refresh_token is not None
        assert isinstance(refresh_token, str)
        
        # Tokens should be different
        assert access_token != refresh_token
    
    def test_verify_tokens(self, db_session):
        """Test JWT token verification."""
        auth_service = AuthService(db_session)
        
        data = {"sub": "123", "username": "testuser"}
        
        # Test access token
        access_token = auth_service.create_access_token(data)
        payload = auth_service.verify_token(access_token, "access")
        
        assert payload is not None
        assert payload["sub"] == "123"
        assert payload["username"] == "testuser"
        assert payload["type"] == "access"
        
        # Test refresh token
        refresh_token = auth_service.create_refresh_token(data)
        payload = auth_service.verify_token(refresh_token, "refresh")
        
        assert payload is not None
        assert payload["type"] == "refresh"
        
        # Test invalid token
        invalid_payload = auth_service.verify_token("invalid_token", "access")
        assert invalid_payload is None
    
    def test_user_permissions(self, db_session):
        """Test user permission checking."""
        auth_service = AuthService(db_session)
        
        # Create users with different roles
        admin = auth_service.create_user("admin", "admin@test.com", "Admin", "pass", "admin")
        director = auth_service.create_user("director", "director@test.com", "Director", "pass", "program_director")
        resident = auth_service.create_user("resident", "resident@test.com", "Resident", "pass", "resident")
        
        # Test admin permissions
        assert auth_service.check_permission(admin, "modify_schedules") is True
        assert auth_service.check_permission(admin, "view_analytics") is True
        
        # Test program director permissions
        assert auth_service.check_permission(director, "modify_schedules") is True
        assert auth_service.check_permission(director, "approve_time_off") is True
        
        # Test resident permissions
        assert auth_service.check_permission(resident, "view_own_schedule") is True
        assert auth_service.check_permission(resident, "modify_schedules") is False
        
        # Test permission requirement
        with pytest.raises(AuthorizationError):
            auth_service.require_permission(resident, "modify_schedules")
    
    def test_session_management(self, db_session):
        """Test user session management."""
        auth_service = AuthService(db_session)
        
        # Create user
        user = auth_service.create_user("testuser", "test@test.com", "Test", "pass")
        
        # Create session
        session = auth_service.create_session(user, "127.0.0.1", "test-agent")
        
        assert session.session_id is not None
        assert session.user_id == user.id
        assert session.ip_address == "127.0.0.1"
        assert session.is_valid is True
        
        # Get user by session
        session_user = auth_service.get_user_by_session(session.session_id)
        assert session_user.id == user.id
        
        # Invalidate session
        result = auth_service.invalidate_session(session.session_id)
        assert result is True
        
        # Session should now be invalid
        db_session.refresh(session)
        assert session.is_active is False


class TestResidentService:
    """Test resident service."""
    
    def test_create_resident(self, db_session):
        """Test creating a resident."""
        service = ResidentService(db_session)
        
        resident = service.create_resident(
            name="Dr. John Doe",
            email="john@hospital.edu",
            pgy_level="PGY-2",
            start_date=date(2024, 7, 1),
            specializations=["EMG", "Pain Management"]
        )
        
        assert resident.id is not None
        assert resident.name == "Dr. John Doe"
        assert resident.pgy_level == "PGY-2"
        assert resident.specializations_list == ["EMG", "Pain Management"]
        
        # Should create default quota targets
        quota = service.get_quota_targets(resident.id)
        assert quota is not None
        assert quota.call_shifts_target == 38  # PGY-2 default
    
    def test_create_resident_validation(self, db_session):
        """Test resident creation validation."""
        service = ResidentService(db_session)
        
        # Test missing required fields
        with pytest.raises(ValueError, match="Name and email are required"):
            service.create_resident("", "", "PGY-2", date.today())
        
        # Test invalid PGY level
        with pytest.raises(ValueError, match="Invalid PGY level"):
            service.create_resident("Dr. Test", "test@test.com", "PGY-X", date.today())
        
        # Test duplicate email
        service.create_resident("Dr. First", "duplicate@test.com", "PGY-2", date.today())
        
        with pytest.raises(ValueError, match="already exists"):
            service.create_resident("Dr. Second", "duplicate@test.com", "PGY-3", date.today())
    
    def test_update_resident(self, db_session):
        """Test updating a resident."""
        service = ResidentService(db_session)
        
        # Create resident
        resident = service.create_resident(
            "Dr. Original", "original@test.com", "PGY-2", date.today()
        )
        
        # Update resident
        updated = service.update_resident(
            resident.id,
            name="Dr. Updated",
            pgy_level="PGY-3",
            specializations=["Sports Medicine"]
        )
        
        assert updated.name == "Dr. Updated"
        assert updated.pgy_level == "PGY-3"
        assert updated.specializations_list == ["Sports Medicine"]
    
    def test_time_off_requests(self, db_session):
        """Test time-off request management."""
        service = ResidentService(db_session)
        
        # Create resident
        resident = service.create_resident(
            "Dr. Test", "test@test.com", "PGY-2", date.today()
        )
        
        # Add time-off request
        start_date = date.today() + timedelta(days=30)
        end_date = start_date + timedelta(days=5)
        
        time_off = service.add_time_off_request(
            resident.id,
            start_date,
            end_date,
            "Vacation",
            "Annual leave"
        )
        
        assert time_off.resident_id == resident.id
        assert time_off.start_date == start_date
        assert time_off.status == "pending"
        
        # Get time-off requests
        requests = service.get_resident_time_off(resident.id)
        assert len(requests) == 1
        assert requests[0].id == time_off.id
        
        # Approve time-off request
        approved = service.approve_time_off_request(time_off.id, "supervisor")
        assert approved.status == "approved"
        assert approved.approved_by == "supervisor"
    
    def test_time_off_validation(self, db_session):
        """Test time-off request validation."""
        service = ResidentService(db_session)
        
        resident = service.create_resident(
            "Dr. Test", "test@test.com", "PGY-2", date.today()
        )
        
        # Test invalid dates
        with pytest.raises(ValueError, match="End date must be after start date"):
            service.add_time_off_request(
                resident.id,
                date.today() + timedelta(days=5),
                date.today() + timedelta(days=1),
                "Vacation"
            )
        
        # Test past dates
        with pytest.raises(ValueError, match="Cannot request time-off for past dates"):
            service.add_time_off_request(
                resident.id,
                date.today() - timedelta(days=5),
                date.today() - timedelta(days=1),
                "Vacation"
            )
    
    def test_quota_management(self, db_session):
        """Test quota target management."""
        service = ResidentService(db_session)
        
        resident = service.create_resident(
            "Dr. Test", "test@test.com", "PGY-3", date.today()
        )
        
        # Get initial quota
        quota = service.get_quota_targets(resident.id)
        assert quota.call_shifts_target == 30  # PGY-3 default
        assert quota.call_shifts_completed == 0
        
        # Update progress
        updated_quota = service.update_quota_progress(
            resident.id,
            call_completed=15,
            moonlight_completed=10
        )
        
        assert updated_quota.call_shifts_completed == 15
        assert updated_quota.moonlight_shifts_completed == 10
        assert updated_quota.call_progress_percentage == 50.0  # 15/30 * 100
    
    def test_resident_availability(self, db_session):
        """Test resident availability checking."""
        service = ResidentService(db_session)
        
        # Create residents
        pgy2 = service.create_resident("Dr. PGY2", "pgy2@test.com", "PGY-2", date(2024, 7, 1))
        pgy3 = service.create_resident("Dr. PGY3", "pgy3@test.com", "PGY-3", date(2023, 7, 1))
        
        # Add time-off for PGY2
        time_off_date = date(2025, 8, 15)
        service.add_time_off_request(
            pgy2.id,
            time_off_date,
            time_off_date,
            "Personal",
            "Personal day"
        )
        
        # Check availability
        available = service.get_residents_by_availability(time_off_date)
        available_ids = [r.id for r in available]
        
        assert pgy3.id in available_ids  # PGY3 should be available
        assert pgy2.id not in available_ids  # PGY2 on time-off
        
        # Check availability for different date
        other_date = date(2025, 8, 20)
        available_other = service.get_residents_by_availability(other_date)
        available_other_ids = [r.id for r in available_other]
        
        assert pgy2.id in available_other_ids  # PGY2 available on different date


class TestSchedulingService:
    """Test scheduling service."""
    
    def test_create_schedule(self, db_session):
        """Test creating a schedule."""
        service = SchedulingService(db_session)
        
        schedule = service.create_schedule(
            name="Test Schedule",
            start_date=date(2025, 1, 1),
            end_date=date(2025, 3, 31),
            algorithm="CSP",
            description="Test schedule for Q1 2025"
        )
        
        assert schedule.id is not None
        assert schedule.name == "Test Schedule"
        assert schedule.algorithm_used == "CSP"
        assert schedule.status == "draft"
        assert schedule.generation_started_at is not None
    
    def test_schedule_validation(self, db_session):
        """Test schedule creation validation."""
        service = SchedulingService(db_session)
        
        # Test invalid date range
        with pytest.raises(ValueError, match="End date must be after start date"):
            service.create_schedule(
                "Test", 
                date(2025, 3, 31),
                date(2025, 1, 1),
                "simple"
            )
        
        # Test excessive duration
        with pytest.raises(ValueError, match="cannot exceed 365 days"):
            service.create_schedule(
                "Test",
                date(2025, 1, 1),
                date(2026, 6, 1),
                "simple"
            )
    
    def test_generate_simple_schedule(self, db_session, multiple_residents):
        """Test simple schedule generation."""
        service = SchedulingService(db_session)
        
        # Create schedule
        schedule = service.create_schedule(
            "Test Schedule",
            date(2025, 1, 1),
            date(2025, 1, 31),
            "simple"
        )
        
        # Generate assignments
        resident_ids = [r.id for r in multiple_residents]
        assignments, violations = service.generate_schedule_assignments(
            schedule.id,
            selected_residents=resident_ids
        )
        
        assert len(assignments) > 0
        assert all(a.schedule_id == schedule.id for a in assignments)
        
        # Check schedule metadata was updated
        db_session.refresh(schedule)
        assert schedule.total_assignments == len(assignments)
        assert schedule.generation_completed_at is not None
        assert schedule.compliance_percentage >= 0
    
    def test_schedule_publishing(self, db_session, multiple_residents):
        """Test schedule publishing."""
        service = SchedulingService(db_session)
        
        # Create and generate schedule
        schedule = service.create_schedule(
            "Test Schedule",
            date(2025, 1, 1), 
            date(2025, 1, 7),  # Short duration
            "simple"
        )
        
        resident_ids = [r.id for r in multiple_residents]
        service.generate_schedule_assignments(schedule.id, resident_ids)
        
        # Ensure no hard violations (for testing)
        db_session.refresh(schedule)
        schedule.hard_rule_violations = 0
        db_session.commit()
        
        # Publish schedule
        published = service.publish_schedule(schedule.id, "test_user")
        
        assert published.status == "active"
        assert published.is_published is True
        assert published.published_by == "test_user"
        assert published.published_at is not None
    
    def test_schedule_queries(self, db_session):
        """Test schedule query methods."""
        service = SchedulingService(db_session)
        
        # Create multiple schedules
        draft = service.create_schedule("Draft", date(2025, 1, 1), date(2025, 1, 31), "simple")
        active = service.create_schedule("Active", date(2025, 2, 1), date(2025, 2, 28), "simple") 
        active.status = "active"
        db_session.commit()
        
        # Test get_schedules
        all_schedules = service.get_schedules()
        assert len(all_schedules) >= 2
        
        # Test filtering by status
        draft_schedules = service.get_schedules(status="draft")
        assert len(draft_schedules) >= 1
        assert all(s.status == "draft" for s in draft_schedules)
        
        active_schedules = service.get_schedules(status="active")
        assert len(active_schedules) >= 1
        assert all(s.status == "active" for s in active_schedules)
        
        # Test get_schedule
        retrieved = service.get_schedule(draft.id)
        assert retrieved.id == draft.id
        assert retrieved.name == "Draft"