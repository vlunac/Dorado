"""Investor profile endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.dependencies import get_db
from app.schemas.investor import InvestorCreate, InvestorRead, InvestorUpdate
from app.repositories import investor_repo

router = APIRouter(prefix="/investors", tags=["investors"])


@router.get("/", response_model=list[InvestorRead])
async def list_investors(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """List all investor profiles."""
    return await investor_repo.find_all(db, skip=skip, limit=limit)


@router.get("/{investor_id}", response_model=InvestorRead)
async def get_investor(
    investor_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Get a single investor profile."""
    investor = await investor_repo.find_by_id(db, investor_id)
    if not investor:
        raise HTTPException(status_code=404, detail="Investor not found.")
    return investor


@router.post("/", response_model=InvestorRead, status_code=201)
async def create_investor(
    body: InvestorCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Create a new investor profile."""
    return await investor_repo.create(db, body.model_dump())


@router.patch("/{investor_id}", response_model=InvestorRead)
async def update_investor(
    investor_id: str,
    body: InvestorUpdate,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Update an investor profile."""
    updated = await investor_repo.update(
        db, investor_id, body.model_dump(exclude_unset=True)
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Investor not found.")
    return updated


@router.delete("/{investor_id}", status_code=204)
async def delete_investor(
    investor_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Delete an investor profile."""
    deleted = await investor_repo.delete(db, investor_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Investor not found.")
