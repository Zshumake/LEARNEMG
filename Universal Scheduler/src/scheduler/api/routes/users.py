"""Users API routes."""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, status, Query
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from ...models import get_db, User
from .auth import get_current_user, require_role

router = APIRouter()


# Pydantic models
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    role: str
    is_active: bool
    is_verified: bool

    class Config:
        from_attributes = True


@router.get("/", response_model=List[UserResponse])
async def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    role: Optional[str] = Query(None),
    is_active: Optional[bool] = Query(None),
    current_user: User = Depends(require_role("admin")),
    db: Session = Depends(get_db),
):
    """Get list of users (admin only)."""
    query = db.query(User)

    if role:
        query = query.filter(User.role == role)

    if is_active is not None:
        query = query.filter(User.is_active == is_active)

    users = query.offset(skip).limit(limit).all()

    return [
        UserResponse(
            id=u.id,
            username=u.username,
            email=u.email,
            full_name=u.full_name,
            role=u.role,
            is_active=u.is_active,
            is_verified=u.is_verified,
        )
        for u in users
    ]
