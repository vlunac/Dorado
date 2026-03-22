"""Search and filter endpoints for startup discovery."""

from typing import Optional

from fastapi import APIRouter, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.dependencies import get_db
from app.schemas.startup import StartupRead
from app.repositories import startup_repo

router = APIRouter(prefix="/search", tags=["search"])


@router.get("/", response_model=list[StartupRead])
async def search_startups(
    team_size: Optional[int] = Query(None, ge=1),
    location: Optional[str] = None,
    industry: Optional[str] = None,
    stage: Optional[str] = None,
    total_raised_min: Optional[float] = Query(None, ge=0),
    total_raised_max: Optional[float] = Query(None, ge=0),
    current_ask_min: Optional[float] = Query(None, ge=0),
    current_ask_max: Optional[float] = Query(None, ge=0),
    date_founded_after: Optional[str] = None,
    date_founded_before: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Search startups with AND-logic filters."""
    filters: dict = {}
    if team_size is not None:
        filters["team_size"] = team_size
    if location:
        filters["location"] = location
    if industry:
        filters["industry"] = industry
    if stage:
        filters["stage"] = stage
    if total_raised_min is not None:
        filters["total_raised_min"] = total_raised_min
    if total_raised_max is not None:
        filters["total_raised_max"] = total_raised_max
    if current_ask_min is not None:
        filters["current_ask_min"] = current_ask_min
    if current_ask_max is not None:
        filters["current_ask_max"] = current_ask_max
    if date_founded_after:
        filters["date_founded_after"] = date_founded_after
    if date_founded_before:
        filters["date_founded_before"] = date_founded_before

    return await startup_repo.search(db, filters, skip=skip, limit=limit)
