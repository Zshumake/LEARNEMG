"""User authentication and authorization models."""

from sqlalchemy import Column, Integer, String, DateTime, Boolean, JSON, Text
from sqlalchemy.sql import func
from .base import Base
from typing import List, Dict, Optional
from datetime import datetime


class User(Base):
    """Database model for system users."""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    # Basic user information
    username = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(255), nullable=False)

    # Authentication
    hashed_password = Column(
        String(255), nullable=True
    )  # Nullable for OAuth-only users
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    is_verified = Column(Boolean, default=False, nullable=False)

    # Authorization
    role = Column(
        String(50), nullable=False, index=True
    )  # resident, chief_resident, program_director, admin
    permissions = Column(JSON, nullable=True)  # List of specific permissions

    # OAuth integration
    oauth_provider = Column(
        String(50), nullable=True
    )  # google, microsoft, hospital_sso
    oauth_id = Column(String(255), nullable=True, index=True)
    oauth_data = Column(JSON, nullable=True)  # Provider-specific data

    # Session management
    last_login = Column(DateTime(timezone=True), nullable=True)
    login_count = Column(Integer, default=0, nullable=False)
    failed_login_attempts = Column(Integer, default=0, nullable=False)
    locked_until = Column(DateTime(timezone=True), nullable=True)

    # Profile information
    department = Column(String(255), nullable=True)
    position = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)

    # Preferences
    preferences = Column(JSON, nullable=True)  # UI preferences, notifications, etc.
    timezone = Column(String(50), default="UTC", nullable=False)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def __repr__(self) -> str:
        return f"<User(id={self.id}, username='{self.username}', role='{self.role}')>"

    @property
    def is_admin(self) -> bool:
        """Check if user has admin role."""
        return self.role == "admin"

    @property
    def is_program_director(self) -> bool:
        """Check if user is a program director."""
        return self.role == "program_director"

    @property
    def is_chief_resident(self) -> bool:
        """Check if user is a chief resident."""
        return self.role == "chief_resident"

    @property
    def is_resident(self) -> bool:
        """Check if user is a resident."""
        return self.role == "resident"

    @property
    def can_modify_schedules(self) -> bool:
        """Check if user can modify schedules."""
        return self.role in ["admin", "program_director", "chief_resident"]

    @property
    def can_approve_time_off(self) -> bool:
        """Check if user can approve time-off requests."""
        return self.role in ["admin", "program_director", "chief_resident"]

    @property
    def is_locked(self) -> bool:
        """Check if user account is locked."""
        if self.locked_until is None:
            return False
        return datetime.now() < self.locked_until


class UserSession(Base):
    """Database model for user sessions."""

    __tablename__ = "user_sessions"

    id = Column(Integer, primary_key=True, index=True)

    # Session identification
    session_id = Column(String(255), unique=True, nullable=False, index=True)
    user_id = Column(Integer, nullable=False, index=True)

    # Session details
    ip_address = Column(String(45), nullable=True)  # IPv6 support
    user_agent = Column(Text, nullable=True)

    # Session timing
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_activity = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)

    # Session status
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    logout_reason = Column(String(50), nullable=True)  # manual, timeout, admin_logout

    def __repr__(self) -> str:
        return f"<UserSession(id={self.id}, user_id={self.user_id}, active={self.is_active})>"

    @property
    def is_expired(self) -> bool:
        """Check if session has expired."""
        return datetime.now() > self.expires_at

    @property
    def is_valid(self) -> bool:
        """Check if session is valid (active and not expired)."""
        return self.is_active and not self.is_expired


class AuditLog(Base):
    """Database model for audit logging."""

    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)

    # User and action details
    user_id = Column(Integer, nullable=True, index=True)  # Nullable for system actions
    username = Column(String(255), nullable=True)
    action = Column(String(100), nullable=False, index=True)
    resource_type = Column(
        String(50), nullable=False, index=True
    )  # resident, schedule, assignment
    resource_id = Column(String(50), nullable=True, index=True)

    # Action details
    description = Column(Text, nullable=False)
    changes = Column(JSON, nullable=True)  # Before/after values for modifications

    # Request context
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    session_id = Column(String(255), nullable=True)

    # Timing
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)

    # Metadata
    environment = Column(String(20), nullable=True)  # production, staging, development
    application_version = Column(String(50), nullable=True)

    def __repr__(self) -> str:
        return (
            f"<AuditLog(id={self.id}, user_id={self.user_id}, action='{self.action}')>"
        )


class APIKey(Base):
    """Database model for API key authentication."""

    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)

    # Key identification
    key_name = Column(String(255), nullable=False)
    key_hash = Column(
        String(255), unique=True, nullable=False, index=True
    )  # Hashed API key
    key_prefix = Column(
        String(10), nullable=False, index=True
    )  # First 8 chars for identification

    # Associated user
    user_id = Column(Integer, nullable=False, index=True)

    # Key permissions
    permissions = Column(JSON, nullable=True)  # List of allowed endpoints/actions
    rate_limit = Column(Integer, default=1000, nullable=False)  # Requests per hour

    # Key status
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    last_used = Column(DateTime(timezone=True), nullable=True)
    usage_count = Column(Integer, default=0, nullable=False)

    # Key lifecycle
    expires_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    revoked_at = Column(DateTime(timezone=True), nullable=True)
    revoked_by = Column(String(255), nullable=True)
    revoke_reason = Column(Text, nullable=True)

    def __repr__(self) -> str:
        return (
            f"<APIKey(id={self.id}, name='{self.key_name}', active={self.is_active})>"
        )

    @property
    def is_expired(self) -> bool:
        """Check if API key has expired."""
        if self.expires_at is None:
            return False
        return datetime.now() > self.expires_at

    @property
    def is_valid(self) -> bool:
        """Check if API key is valid (active and not expired or revoked)."""
        return self.is_active and not self.is_expired and self.revoked_at is None
