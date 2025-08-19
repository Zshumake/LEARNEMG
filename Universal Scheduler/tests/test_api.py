"""Test API endpoints."""

import pytest
from datetime import date, timedelta


class TestAuthenticationAPI:
    """Test authentication API endpoints."""
    
    def test_register_user(self, client):
        """Test user registration."""
        user_data = {
            "username": "newuser",
            "email": "newuser@example.com", 
            "full_name": "New User",
            "password": "password123",
            "role": "resident"
        }
        
        response = client.post("/api/auth/register", json=user_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data["username"] == "newuser"
        assert data["email"] == "newuser@example.com"
        assert data["role"] == "resident"
        assert "password" not in data  # Password should not be returned
    
    def test_register_duplicate_user(self, client, sample_user):
        """Test registering duplicate user."""
        user_data = {
            "username": sample_user.username,
            "email": "different@example.com",
            "full_name": "Different User", 
            "password": "password123"
        }
        
        response = client.post("/api/auth/register", json=user_data)
        assert response.status_code == 400
        assert "already exists" in response.json()["detail"].lower()
    
    def test_login_success(self, client, sample_user):
        """Test successful login."""
        login_data = {
            "username": sample_user.username,
            "password": "testpassword123"
        }
        
        response = client.post("/api/auth/login", json=login_data)
        assert response.status_code == 200
        
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"
        assert data["user"]["username"] == sample_user.username
    
    def test_login_invalid_credentials(self, client, sample_user):
        """Test login with invalid credentials."""
        login_data = {
            "username": sample_user.username,
            "password": "wrongpassword"
        }
        
        response = client.post("/api/auth/login", json=login_data)
        assert response.status_code == 401
    
    def test_get_current_user(self, client, auth_headers):
        """Test getting current user information."""
        response = client.get("/api/auth/me", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "username" in data
        assert "email" in data
        assert "role" in data
    
    def test_get_user_permissions(self, client, auth_headers):
        """Test getting user permissions."""
        response = client.get("/api/auth/permissions", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert "permissions" in data
        assert isinstance(data["permissions"], list)
    
    def test_unauthorized_access(self, client):
        """Test accessing protected endpoint without authentication."""
        response = client.get("/api/auth/me")
        assert response.status_code == 403  # FastAPI returns 403 for missing auth
    
    def test_invalid_token(self, client):
        """Test accessing protected endpoint with invalid token."""
        headers = {"Authorization": "Bearer invalid_token"}
        response = client.get("/api/auth/me", headers=headers)
        assert response.status_code == 401


class TestResidentsAPI:
    """Test residents API endpoints."""
    
    def test_get_residents(self, client, auth_headers, multiple_residents):
        """Test getting residents list."""
        response = client.get("/api/residents/", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= len(multiple_residents)
        
        for resident_data in data:
            assert "id" in resident_data
            assert "name" in resident_data
            assert "pgy_level" in resident_data
    
    def test_get_residents_with_filters(self, client, auth_headers, multiple_residents):
        """Test getting residents with filters."""
        # Filter by PGY level
        response = client.get("/api/residents/?pgy_level=PGY-2", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        for resident in data:
            assert resident["pgy_level"] == "PGY-2"
        
        # Filter by active status
        response = client.get("/api/residents/?is_active=true", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        for resident in data:
            assert resident["is_active"] is True
    
    def test_create_resident(self, client, auth_headers):
        """Test creating a resident."""
        resident_data = {
            "name": "Dr. New Resident",
            "email": "newresident@hospital.edu",
            "pgy_level": "PGY-1",
            "start_date": "2024-07-01",
            "specializations": ["General Medicine"],
            "preferences": {"preferred_call_days": ["Monday"]}
        }
        
        response = client.post("/api/residents/", json=resident_data, headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert data["name"] == "Dr. New Resident"
        assert data["pgy_level"] == "PGY-1"
        assert data["specializations"] == ["General Medicine"]
    
    def test_create_resident_duplicate_email(self, client, auth_headers, sample_resident):
        """Test creating resident with duplicate email."""
        resident_data = {
            "name": "Dr. Duplicate",
            "email": sample_resident.email,  # Duplicate email
            "pgy_level": "PGY-1",
            "start_date": "2024-07-01"
        }
        
        response = client.post("/api/residents/", json=resident_data, headers=auth_headers)
        assert response.status_code == 400
        assert "already exists" in response.json()["detail"].lower()
    
    def test_get_resident_by_id(self, client, auth_headers, sample_resident):
        """Test getting a specific resident."""
        response = client.get(f"/api/residents/{sample_resident.id}", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert data["id"] == sample_resident.id
        assert data["name"] == sample_resident.name
        assert data["email"] == sample_resident.email
    
    def test_get_nonexistent_resident(self, client, auth_headers):
        """Test getting a non-existent resident."""
        response = client.get("/api/residents/99999", headers=auth_headers)
        assert response.status_code == 404
    
    def test_update_resident(self, client, auth_headers, sample_resident):
        """Test updating a resident."""
        update_data = {
            "name": "Dr. Updated Name",
            "specializations": ["Updated Specialty"]
        }
        
        response = client.put(f"/api/residents/{sample_resident.id}", json=update_data, headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert data["name"] == "Dr. Updated Name"
        assert data["specializations"] == ["Updated Specialty"]
    
    def test_deactivate_resident(self, client, auth_headers, sample_resident):
        """Test deactivating a resident."""
        response = client.delete(f"/api/residents/{sample_resident.id}", headers=auth_headers)
        assert response.status_code == 200
        
        # Verify resident is deactivated
        response = client.get(f"/api/residents/{sample_resident.id}", headers=auth_headers)
        data = response.json()
        assert data["is_active"] is False
    
    def test_resident_time_off_requests(self, client, auth_headers, sample_resident):
        """Test resident time-off request endpoints."""
        # Get initial time-off requests (should be empty)
        response = client.get(f"/api/residents/{sample_resident.id}/time-off", headers=auth_headers)
        assert response.status_code == 200
        assert len(response.json()) == 0
        
        # Create time-off request
        time_off_data = {
            "start_date": (date.today() + timedelta(days=30)).isoformat(),
            "end_date": (date.today() + timedelta(days=35)).isoformat(),
            "reason": "Vacation",
            "request_type": "Vacation"
        }
        
        response = client.post(
            f"/api/residents/{sample_resident.id}/time-off", 
            json=time_off_data, 
            headers=auth_headers
        )
        assert response.status_code == 200
        
        data = response.json()
        assert data["resident_id"] == sample_resident.id
        assert data["request_type"] == "Vacation"
        assert data["status"] == "pending"
        
        # Get time-off requests again (should have one now)
        response = client.get(f"/api/residents/{sample_resident.id}/time-off", headers=auth_headers)
        assert response.status_code == 200
        assert len(response.json()) == 1
    
    def test_unauthorized_resident_access(self, client):
        """Test accessing resident endpoints without authentication."""
        response = client.get("/api/residents/")
        assert response.status_code == 403


class TestSchedulesAPI:
    """Test schedules API endpoints."""
    
    def test_get_schedules(self, client, auth_headers, sample_schedule):
        """Test getting schedules list."""
        response = client.get("/api/schedules/", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        
        for schedule_data in data:
            assert "id" in schedule_data
            assert "name" in schedule_data
            assert "status" in schedule_data
    
    def test_get_schedules_with_filters(self, client, auth_headers, sample_schedule):
        """Test getting schedules with status filter."""
        response = client.get("/api/schedules/?status=draft", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        for schedule in data:
            assert schedule["status"] == "draft"
    
    def test_get_schedule_assignments(self, client, auth_headers, sample_schedule):
        """Test getting assignments for a schedule."""
        response = client.get(f"/api/schedules/{sample_schedule.id}/assignments", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        # May be empty if no assignments generated yet
    
    def test_get_nonexistent_schedule_assignments(self, client, auth_headers):
        """Test getting assignments for non-existent schedule."""
        response = client.get("/api/schedules/99999/assignments", headers=auth_headers)
        assert response.status_code == 404


class TestUsersAPI:
    """Test users API endpoints."""
    
    def test_get_users_admin_only(self, client, admin_headers, sample_user):
        """Test getting users list as admin."""
        response = client.get("/api/users/", headers=admin_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        
        for user_data in data:
            assert "id" in user_data
            assert "username" in user_data
            assert "role" in user_data
    
    def test_get_users_non_admin(self, client, auth_headers):
        """Test getting users list as non-admin (should be forbidden)."""
        response = client.get("/api/users/", headers=auth_headers)
        assert response.status_code == 403


class TestAPIHealth:
    """Test API health and system endpoints."""
    
    def test_root_endpoint(self, client):
        """Test root endpoint."""
        response = client.get("/")
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "version" in data
        assert "status" in data
    
    def test_health_check(self, client):
        """Test health check endpoint."""
        response = client.get("/api/health")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "healthy"
        assert "database" in data
        assert "environment" in data
    
    def test_metrics_endpoint(self, client):
        """Test metrics endpoint."""
        response = client.get("/api/metrics")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, dict)
        # Metrics endpoint returns basic metrics data


class TestAPIValidation:
    """Test API input validation."""
    
    def test_invalid_json(self, client, auth_headers):
        """Test sending invalid JSON."""
        response = client.post(
            "/api/residents/", 
            data="invalid json",
            headers={**auth_headers, "Content-Type": "application/json"}
        )
        assert response.status_code == 422
    
    def test_missing_required_fields(self, client, auth_headers):
        """Test missing required fields."""
        incomplete_data = {
            "name": "Dr. Incomplete"
            # Missing email and other required fields
        }
        
        response = client.post("/api/residents/", json=incomplete_data, headers=auth_headers)
        assert response.status_code == 422
    
    def test_invalid_email_format(self, client, auth_headers):
        """Test invalid email format."""
        invalid_data = {
            "name": "Dr. Test",
            "email": "invalid-email-format",
            "pgy_level": "PGY-1",
            "start_date": "2024-07-01"
        }
        
        response = client.post("/api/residents/", json=invalid_data, headers=auth_headers)
        assert response.status_code == 422


class TestAPIRateLimit:
    """Test API rate limiting."""
    
    def test_rate_limit_enforcement(self, client):
        """Test rate limiting (simplified test)."""
        # Make multiple requests quickly
        responses = []
        for i in range(10):
            response = client.get("/")
            responses.append(response.status_code)
        
        # Most requests should succeed (rate limit is generous for testing)
        successful = sum(1 for status in responses if status == 200)
        assert successful >= 8  # Allow for some variation