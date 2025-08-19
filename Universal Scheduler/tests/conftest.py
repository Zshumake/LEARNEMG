"""Pytest configuration and fixtures."""

import pytest
import os
import tempfile
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

# Set test environment
os.environ["ENVIRONMENT"] = "test"
os.environ["SECRET_KEY"] = "test-secret-key-for-testing-only-not-production-32chars"

from src.scheduler.models.base import Base
from src.scheduler.models import (
    User, Resident, TimeOffRequest, QuotaTarget, 
    Schedule, Assignment, RuleViolation
)
from src.scheduler.api.main import app
from src.scheduler.config import settings


@pytest.fixture(scope="session")
def test_db_engine():
    """Create a test database engine."""
    # Create temporary SQLite database for testing
    db_fd, db_path = tempfile.mkstemp()
    database_url = f"sqlite:///{db_path}"
    
    engine = create_engine(
        database_url,
        connect_args={"check_same_thread": False}
    )
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    yield engine
    
    # Cleanup
    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def db_session(test_db_engine):
    """Create a database session for testing."""
    TestingSessionLocal = sessionmaker(
        autocommit=False, 
        autoflush=False, 
        bind=test_db_engine
    )
    
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def client(db_session):
    """Create a test client."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    from src.scheduler.models.base import get_db
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()


@pytest.fixture
def sample_user(db_session):
    """Create a sample user for testing."""
    from src.scheduler.services.auth import AuthService
    
    auth_service = AuthService(db_session)
    user = auth_service.create_user(
        username="testuser",
        email="test@example.com",
        full_name="Test User",
        password="testpassword123",
        role="program_director"
    )
    return user


@pytest.fixture
def admin_user(db_session):
    """Create an admin user for testing."""
    from src.scheduler.services.auth import AuthService
    
    auth_service = AuthService(db_session)
    user = auth_service.create_user(
        username="admin",
        email="admin@example.com", 
        full_name="Admin User",
        password="adminpassword123",
        role="admin"
    )
    return user


@pytest.fixture
def sample_resident(db_session):
    """Create a sample resident for testing."""
    from datetime import date
    
    resident = Resident(
        name="Dr. John Doe",
        email="john.doe@hospital.edu",
        phone="555-0123",
        pgy_level="PGY-2",
        start_date=date(2024, 7, 1),
        specializations=["EMG", "Pain Management"],
        preferences={"preferred_call_days": ["Tuesday", "Thursday"]}
    )
    
    db_session.add(resident)
    db_session.commit()
    db_session.refresh(resident)
    
    return resident


@pytest.fixture
def multiple_residents(db_session):
    """Create multiple residents for testing scheduling."""
    from datetime import date
    
    residents_data = [
        {
            "name": "Dr. Alice Johnson",
            "email": "alice.johnson@hospital.edu",
            "pgy_level": "PGY-2",
            "start_date": date(2024, 7, 1)
        },
        {
            "name": "Dr. Bob Smith", 
            "email": "bob.smith@hospital.edu",
            "pgy_level": "PGY-3",
            "start_date": date(2023, 7, 1)
        },
        {
            "name": "Dr. Carol Brown",
            "email": "carol.brown@hospital.edu", 
            "pgy_level": "PGY-4",
            "start_date": date(2022, 7, 1)
        }
    ]
    
    residents = []
    for data in residents_data:
        resident = Resident(**data)
        db_session.add(resident)
        residents.append(resident)
    
    db_session.commit()
    
    for resident in residents:
        db_session.refresh(resident)
    
    return residents


@pytest.fixture
def sample_schedule(db_session, multiple_residents):
    """Create a sample schedule for testing."""
    from datetime import date
    
    schedule = Schedule(
        name="Test Schedule Q1 2025",
        description="Test schedule for Q1 2025",
        start_date=date(2025, 1, 1),
        end_date=date(2025, 3, 31),
        algorithm_used="simple",
        status="draft"
    )
    
    db_session.add(schedule)
    db_session.commit()
    db_session.refresh(schedule)
    
    return schedule


@pytest.fixture
def auth_headers(client, sample_user):
    """Get authentication headers for API testing."""
    login_data = {
        "username": sample_user.username,
        "password": "testpassword123"
    }
    
    response = client.post("/api/auth/login", json=login_data)
    assert response.status_code == 200
    
    token_data = response.json()
    return {"Authorization": f"Bearer {token_data['access_token']}"}


@pytest.fixture
def admin_headers(client, admin_user):
    """Get admin authentication headers for API testing."""
    login_data = {
        "username": admin_user.username,
        "password": "adminpassword123"
    }
    
    response = client.post("/api/auth/login", json=login_data)
    assert response.status_code == 200
    
    token_data = response.json()
    return {"Authorization": f"Bearer {token_data['access_token']}"}


# Test data factories
@pytest.fixture
def resident_factory(db_session):
    """Factory for creating test residents."""
    def _create_resident(name=None, email=None, pgy_level="PGY-2", **kwargs):
        from datetime import date
        import random
        
        if name is None:
            name = f"Dr. Test Resident {random.randint(1000, 9999)}"
        if email is None:
            email = f"test{random.randint(1000, 9999)}@hospital.edu"
        
        resident = Resident(
            name=name,
            email=email,
            pgy_level=pgy_level,
            start_date=kwargs.get('start_date', date(2024, 7, 1)),
            phone=kwargs.get('phone'),
            specializations=kwargs.get('specializations', []),
            preferences=kwargs.get('preferences', {})
        )
        
        db_session.add(resident)
        db_session.commit()
        db_session.refresh(resident)
        
        return resident
    
    return _create_resident


@pytest.fixture
def schedule_factory(db_session):
    """Factory for creating test schedules."""
    def _create_schedule(name=None, start_date=None, end_date=None, **kwargs):
        from datetime import date, timedelta
        import random
        
        if name is None:
            name = f"Test Schedule {random.randint(1000, 9999)}"
        if start_date is None:
            start_date = date.today()
        if end_date is None:
            end_date = start_date + timedelta(days=30)
        
        schedule = Schedule(
            name=name,
            start_date=start_date,
            end_date=end_date,
            algorithm_used=kwargs.get('algorithm_used', 'simple'),
            status=kwargs.get('status', 'draft'),
            description=kwargs.get('description')
        )
        
        db_session.add(schedule)
        db_session.commit()
        db_session.refresh(schedule)
        
        return schedule
    
    return _create_schedule