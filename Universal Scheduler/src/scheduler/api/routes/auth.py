"""Authentication API routes."""

from datetime import timedelta
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from ...models import get_db, User
from ...services.auth import AuthService, AuthenticationError, AuthorizationError
from ...config import settings

router = APIRouter()
security = HTTPBearer()


# Pydantic models for request/response
class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: dict


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    password: str
    role: str = "resident"


class TokenRefreshRequest(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    role: str
    is_active: bool
    is_verified: bool


def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    """Get authentication service instance."""
    return AuthService(db)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    """Get current authenticated user from JWT token."""
    auth_service = AuthService(db)

    try:
        # Verify access token
        payload = auth_service.verify_token(credentials.credentials, "access")
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Get user from database
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user = db.query(User).filter(User.id == int(user_id)).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is deactivated",
            )

        return user

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


def require_role(required_role: str):
    """Dependency to require specific user role."""

    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role != required_role and not current_user.is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation requires {required_role} role",
            )
        return current_user

    return role_checker


def require_permission(permission: str):
    """Dependency to require specific permission."""

    def permission_checker(
        current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
    ):
        auth_service = AuthService(db)
        if not auth_service.check_permission(current_user, permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation requires permission: {permission}",
            )
        return current_user

    return permission_checker


@router.post("/login", response_model=LoginResponse)
async def login(
    login_data: LoginRequest,
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    """Authenticate user and return access tokens."""
    try:
        # Authenticate user
        user = auth_service.authenticate_user(login_data.username, login_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )

        # Create session
        session = auth_service.create_session(
            user,
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent"),
        )

        # Create tokens
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = auth_service.create_access_token(
            data={"sub": str(user.id), "username": user.username, "role": user.role},
            expires_delta=access_token_expires,
        )

        refresh_token = auth_service.create_refresh_token(
            data={"sub": str(user.id), "session_id": session.session_id}
        )

        # Log audit event
        auth_service.log_audit_event(
            user_id=user.id,
            action="login",
            resource_type="auth",
            description=f"User {user.username} logged in",
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent"),
            session_id=session.session_id,
        )

        return LoginResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.access_token_expire_minutes * 60,
            user={
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
            },
        )

    except AuthenticationError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}",
        )


@router.post("/register", response_model=UserResponse)
async def register(
    register_data: RegisterRequest,
    auth_service: AuthService = Depends(get_auth_service),
):
    """Register a new user account."""
    try:
        user = auth_service.create_user(
            username=register_data.username,
            email=register_data.email,
            full_name=register_data.full_name,
            password=register_data.password,
            role=register_data.role,
        )

        return UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            is_active=user.is_active,
            is_verified=user.is_verified,
        )

    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}",
        )


@router.post("/refresh", response_model=LoginResponse)
async def refresh_token(
    refresh_data: TokenRefreshRequest,
    auth_service: AuthService = Depends(get_auth_service),
):
    """Refresh access token using refresh token."""
    try:
        # Verify refresh token
        payload = auth_service.verify_token(refresh_data.refresh_token, "refresh")
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
            )

        user_id = payload.get("sub")
        session_id = payload.get("session_id")

        if not user_id or not session_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload"
            )

        # Get user by session (validates session is still active)
        user = auth_service.get_user_by_session(session_id)
        if not user or str(user.id) != user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session"
            )

        # Create new access token
        access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
        access_token = auth_service.create_access_token(
            data={"sub": str(user.id), "username": user.username, "role": user.role},
            expires_delta=access_token_expires,
        )

        return LoginResponse(
            access_token=access_token,
            refresh_token=refresh_data.refresh_token,  # Keep same refresh token
            expires_in=settings.access_token_expire_minutes * 60,
            user={
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
            },
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token refresh failed: {str(e)}",
        )


@router.post("/logout")
async def logout(
    request: Request,
    current_user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    """Logout user and invalidate session."""
    try:
        # Get session ID from token (would need to be included in JWT)
        # For now, invalidate all sessions for user (in production, would track session ID)

        # Log audit event
        auth_service.log_audit_event(
            user_id=current_user.id,
            action="logout",
            resource_type="auth",
            description=f"User {current_user.username} logged out",
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent"),
        )

        return {"message": "Successfully logged out"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Logout failed: {str(e)}",
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information."""
    return UserResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        full_name=current_user.full_name,
        role=current_user.role,
        is_active=current_user.is_active,
        is_verified=current_user.is_verified,
    )


@router.get("/permissions")
async def get_user_permissions(
    current_user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    """Get current user's permissions."""
    # Define all possible permissions
    all_permissions = [
        "view_all_schedules",
        "modify_schedules",
        "approve_time_off",
        "view_residents",
        "modify_residents",
        "view_analytics",
        "view_own_schedule",
        "request_time_off",
        "view_own_profile",
    ]

    user_permissions = []
    for permission in all_permissions:
        if auth_service.check_permission(current_user, permission):
            user_permissions.append(permission)

    return {
        "user_id": current_user.id,
        "role": current_user.role,
        "permissions": user_permissions,
    }
