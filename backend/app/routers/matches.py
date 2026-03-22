"""Investor-to-startup match endpoints."""

from fastapi import APIRouter, Depends, Header, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.dependencies import get_db, require_investor
from app.schemas.match import MatchRead
from app.services.matching import get_matches_for_investor

router = APIRouter(prefix="/matches", tags=["matches"])


@router.get("/", response_model=list[MatchRead])
async def list_matches(
    investor_id: str = Header(..., alias="X-User-Id"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    role: str = Depends(require_investor),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Return scored startup matches for the current investor."""
    return await get_matches_for_investor(db, investor_id, skip=skip, limit=limit)
