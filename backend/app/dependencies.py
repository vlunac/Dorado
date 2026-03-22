"""Shared FastAPI dependencies."""

from fastapi import Header, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.database import get_database


async def get_db() -> AsyncIOMotorDatabase:
    """Dependency that provides the database instance."""
    return get_database()


async def get_user_role(x_user_role: str = Header(default="investor")) -> str:
    """Extract and validate the user role from the X-User-Role header."""
    role = x_user_role.lower().strip()
    if role not in ("investor", "founder"):
        raise HTTPException(
            status_code=400,
            detail="X-User-Role header must be 'investor' or 'founder'.",
        )
    return role


async def require_investor(x_user_role: str = Header(default="investor")) -> str:
    """Dependency that restricts access to investors only."""
    role = await get_user_role(x_user_role)
    if role != "investor":
        raise HTTPException(
            status_code=403,
            detail="This resource is only available to investors.",
        )
    return role
