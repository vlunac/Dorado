"""Startup CRUD endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.dependencies import get_db, get_user_role
from app.schemas.startup import StartupCreate, StartupRead, StartupUpdate
from app.repositories import startup_repo

router = APIRouter(prefix="/startups", tags=["startups"])


@router.get("/", response_model=list[StartupRead])
async def list_startups(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """List all startups with pagination."""
    return await startup_repo.find_all(db, skip=skip, limit=limit)


@router.get("/{startup_id}", response_model=StartupRead)
async def get_startup(
    startup_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Get a single startup by ID."""
    startup = await startup_repo.find_by_id(db, startup_id)
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found.")
    return startup


@router.post("/", response_model=StartupRead, status_code=201)
async def create_startup(
    body: StartupCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    role: str = Depends(get_user_role),
):
    """Create a new startup (founders only)."""
    if role != "founder":
        raise HTTPException(status_code=403, detail="Only founders can create startups.")
    return await startup_repo.create(db, body.model_dump())


@router.patch("/{startup_id}", response_model=StartupRead)
async def update_startup(
    startup_id: str,
    body: StartupUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
    role: str = Depends(get_user_role),
):
    """Update a startup (founders only)."""
    if role != "founder":
        raise HTTPException(status_code=403, detail="Only founders can update startups.")
    updated = await startup_repo.update(
        db, startup_id, body.model_dump(exclude_unset=True)
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Startup not found.")
    return updated


@router.delete("/{startup_id}", status_code=204)
async def delete_startup(
    startup_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    role: str = Depends(get_user_role),
):
    """Delete a startup (founders only)."""
    if role != "founder":
        raise HTTPException(status_code=403, detail="Only founders can delete startups.")
    deleted = await startup_repo.delete(db, startup_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Startup not found.")
