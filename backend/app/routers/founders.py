"""Founder profile endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.dependencies import get_db
from app.schemas.founder import FounderCreate, FounderRead, FounderUpdate
from app.repositories import founder_repo

router = APIRouter(prefix="/founders", tags=["founders"])


@router.get("/", response_model=list[FounderRead])
async def list_founders(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """List all founder profiles."""
    return await founder_repo.find_all(db, skip=skip, limit=limit)


@router.get("/{founder_id}", response_model=FounderRead)
async def get_founder(
    founder_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Get a single founder profile."""
    founder = await founder_repo.find_by_id(db, founder_id)
    if not founder:
        raise HTTPException(status_code=404, detail="Founder not found.")
    return founder


@router.post("/", response_model=FounderRead, status_code=201)
async def create_founder(
    body: FounderCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Create a new founder profile."""
    return await founder_repo.create(db, body.model_dump())


@router.patch("/{founder_id}", response_model=FounderRead)
async def update_founder(
    founder_id: str,
    body: FounderUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Update a founder profile."""
    updated = await founder_repo.update(
        db, founder_id, body.model_dump(exclude_unset=True)
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Founder not found.")
    return updated


@router.delete("/{founder_id}", status_code=204)
async def delete_founder(
    founder_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Delete a founder profile."""
    deleted = await founder_repo.delete(db, founder_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Founder not found.")
