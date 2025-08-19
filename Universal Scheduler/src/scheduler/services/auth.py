"""Authentication and authorization services."""

import os
import secrets
import hashlib
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..models import User, UserSession, AuditLog, APIKey
from ..models.base import get_db


# Configuration
SECRET_KEY = os.getenv("SECRET_KEY", secrets.token_urlsafe(32))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthenticationError(Exception):
    """Custom exception for authentication errors."""

    pass


class AuthorizationError(Exception):
    """Custom exception for authorization errors."""

    pass


class AuthService:
    """Service class for authentication and authorization."""

    def __init__(self, db: Session):
        self.db = db

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plaintext password against its hash."""
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        """Generate password hash."""
        return pwd_context.hash(password)

    def create_access_token(
        self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None
    ) -> str:
        """Create JWT access token."""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

        to_encode.update({"exp": expire, "type": "access"})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    def create_refresh_token(self, data: Dict[str, Any]) -> str:
        """Create JWT refresh token."""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
        to_encode.update({"exp": expire, "type": "refresh"})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    def verify_token(
        self, token: str, token_type: str = "access"
    ) -> Optional[Dict[str, Any]]:
        """Verify and decode JWT token."""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            if payload.get("type") != token_type:
                return None
            return payload
        except JWTError:
            return None

    def authenticate_user(self, username: str, password: str) -> Optional[User]:
        """Authenticate user with username/password."""
        user = self.db.query(User).filter(User.username == username).first()
        if not user:
            return None
        if not user.is_active:
            raise AuthenticationError("User account is deactivated")
        if user.is_locked:
            raise AuthenticationError("User account is locked")
        if not self.verify_password(password, user.hashed_password):
            # Increment failed login attempts
            user.failed_login_attempts += 1
            if user.failed_login_attempts >= 5:
                user.locked_until = datetime.utcnow() + timedelta(hours=1)
            self.db.commit()
            return None

        # Reset failed attempts on successful login
        user.failed_login_attempts = 0
        user.locked_until = None
        user.last_login = datetime.utcnow()
        user.login_count += 1
        self.db.commit()

        return user

    def create_user(
        self,
        username: str,
        email: str,
        full_name: str,
        password: str,
        role: str = "resident",
    ) -> User:
        """Create a new user."""
        # Check if user already exists
        if self.db.query(User).filter(User.username == username).first():
            raise ValueError("Username already exists")
        if self.db.query(User).filter(User.email == email).first():
            raise ValueError("Email already exists")

        # Create user
        user = User(
            username=username,
            email=email,
            full_name=full_name,
            hashed_password=self.get_password_hash(password),
            role=role,
            is_verified=False,  # Require email verification
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        # Log user creation
        self.log_audit_event(
            user_id=user.id,
            action="user_created",
            resource_type="user",
            resource_id=str(user.id),
            description=f"New user created: {username}",
        )

        return user

    def create_session(
        self, user: User, ip_address: str = None, user_agent: str = None
    ) -> UserSession:
        """Create a new user session."""
        session_id = secrets.token_urlsafe(32)
        expires_at = datetime.utcnow() + timedelta(hours=24)

        session = UserSession(
            session_id=session_id,
            user_id=user.id,
            ip_address=ip_address,
            user_agent=user_agent,
            expires_at=expires_at,
        )

        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)

        return session

    def get_user_by_session(self, session_id: str) -> Optional[User]:
        """Get user by session ID."""
        session = (
            self.db.query(UserSession)
            .filter(UserSession.session_id == session_id)
            .first()
        )

        if not session or not session.is_valid:
            return None

        # Update last activity
        session.last_activity = datetime.utcnow()
        self.db.commit()

        return self.db.query(User).filter(User.id == session.user_id).first()

    def invalidate_session(self, session_id: str, reason: str = "manual") -> bool:
        """Invalidate a user session."""
        session = (
            self.db.query(UserSession)
            .filter(UserSession.session_id == session_id)
            .first()
        )

        if session:
            session.is_active = False
            session.logout_reason = reason
            self.db.commit()
            return True
        return False

    def check_permission(
        self, user: User, permission: str, resource_id: str = None
    ) -> bool:
        """Check if user has a specific permission."""
        # Admin has all permissions
        if user.is_admin:
            return True

        # Role-based permissions
        role_permissions = {
            "program_director": [
                "view_all_schedules",
                "modify_schedules",
                "approve_time_off",
                "view_residents",
                "modify_residents",
                "view_analytics",
            ],
            "chief_resident": [
                "view_all_schedules",
                "modify_schedules",
                "approve_time_off",
                "view_residents",
                "modify_residents",
            ],
            "resident": ["view_own_schedule", "request_time_off", "view_own_profile"],
        }

        # Check role-based permissions
        if permission in role_permissions.get(user.role, []):
            return True

        # Check specific user permissions
        if user.permissions and permission in user.permissions:
            return True

        return False

    def require_permission(self, user: User, permission: str, resource_id: str = None):
        """Require user to have specific permission or raise exception."""
        if not self.check_permission(user, permission, resource_id):
            raise AuthorizationError(f"User lacks required permission: {permission}")

    def create_api_key(
        self, user: User, key_name: str, permissions: List[str] = None
    ) -> str:
        """Create a new API key for a user."""
        # Generate API key
        api_key = f"sk_{secrets.token_urlsafe(32)}"
        key_hash = hashlib.sha256(api_key.encode()).hexdigest()
        key_prefix = api_key[:8]

        # Create API key record
        api_key_record = APIKey(
            key_name=key_name,
            key_hash=key_hash,
            key_prefix=key_prefix,
            user_id=user.id,
            permissions=permissions or [],
        )

        self.db.add(api_key_record)
        self.db.commit()

        # Log API key creation
        self.log_audit_event(
            user_id=user.id,
            action="api_key_created",
            resource_type="api_key",
            resource_id=str(api_key_record.id),
            description=f"API key created: {key_name}",
        )

        return api_key

    def verify_api_key(self, api_key: str) -> Optional[User]:
        """Verify API key and return associated user."""
        key_hash = hashlib.sha256(api_key.encode()).hexdigest()

        api_key_record = (
            self.db.query(APIKey).filter(APIKey.key_hash == key_hash).first()
        )

        if not api_key_record or not api_key_record.is_valid:
            return None

        # Update usage statistics
        api_key_record.last_used = datetime.utcnow()
        api_key_record.usage_count += 1
        self.db.commit()

        return self.db.query(User).filter(User.id == api_key_record.user_id).first()

    def log_audit_event(
        self,
        user_id: int,
        action: str,
        resource_type: str,
        resource_id: str = None,
        description: str = None,
        changes: Dict = None,
        ip_address: str = None,
        user_agent: str = None,
        session_id: str = None,
    ):
        """Log an audit event."""
        # Get username for logging
        username = None
        if user_id:
            user = self.db.query(User).filter(User.id == user_id).first()
            if user:
                username = user.username

        audit_log = AuditLog(
            user_id=user_id,
            username=username,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            description=description or f"Action: {action} on {resource_type}",
            changes=changes,
            ip_address=ip_address,
            user_agent=user_agent,
            session_id=session_id,
            environment=os.getenv("ENVIRONMENT", "development"),
        )

        self.db.add(audit_log)
        self.db.commit()

    def get_audit_logs(
        self,
        user_id: int = None,
        action: str = None,
        resource_type: str = None,
        limit: int = 100,
    ) -> List[AuditLog]:
        """Retrieve audit logs with optional filters."""
        query = self.db.query(AuditLog)

        if user_id:
            query = query.filter(AuditLog.user_id == user_id)
        if action:
            query = query.filter(AuditLog.action == action)
        if resource_type:
            query = query.filter(AuditLog.resource_type == resource_type)

        return query.order_by(AuditLog.timestamp.desc()).limit(limit).all()


class OAuth2Provider:
    """Base class for OAuth2 providers."""

    def __init__(self, client_id: str, client_secret: str, redirect_uri: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri

    def get_authorization_url(self) -> str:
        """Get OAuth2 authorization URL."""
        raise NotImplementedError

    def get_access_token(self, code: str) -> Dict[str, Any]:
        """Exchange authorization code for access token."""
        raise NotImplementedError

    def get_user_info(self, access_token: str) -> Dict[str, Any]:
        """Get user information from provider."""
        raise NotImplementedError


class GoogleOAuth2Provider(OAuth2Provider):
    """Google OAuth2 provider."""

    def __init__(self, client_id: str, client_secret: str, redirect_uri: str):
        super().__init__(client_id, client_secret, redirect_uri)
        self.auth_url = "https://accounts.google.com/o/oauth2/auth"
        self.token_url = "https://oauth2.googleapis.com/token"
        self.user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"

    def get_authorization_url(self) -> str:
        """Get Google OAuth2 authorization URL."""
        params = {
            "client_id": self.client_id,
            "redirect_uri": self.redirect_uri,
            "response_type": "code",
            "scope": "openid email profile",
            "access_type": "offline",
        }

        param_string = "&".join([f"{k}={v}" for k, v in params.items()])
        return f"{self.auth_url}?{param_string}"

    # Additional OAuth2 methods would be implemented here...


# FastAPI dependency functions
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    """FastAPI dependency to get current authenticated user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decode JWT token
        auth_service = AuthService(db)
        payload = auth_service.verify_token(credentials.credentials, "access")

        if payload is None:
            raise credentials_exception

        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    # Get user from database
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return user


def require_permissions(permissions: List[str]):
    """Create a dependency that requires specific permissions."""

    def permission_checker(current_user: User = Depends(get_current_user)) -> User:
        auth_service = AuthService(Session())  # Note: This should be improved
        for permission in permissions:
            if not auth_service.check_permission(current_user, permission):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Insufficient permissions. Required: {permission}",
                )
        return current_user

    return permission_checker
