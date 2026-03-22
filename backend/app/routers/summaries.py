"""Summaries router — generates AI summaries for startups (investor-only)."""

from fastapi import APIRouter, Depends, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.dependencies import get_db, require_investor
from app.repositories import startup_repo
from app.services.gemini_summary import generate_summary

limiter = Limiter(key_func=get_remote_address)

router = APIRouter(prefix="/summaries", tags=["summaries"])


class SummaryResponse(BaseModel):
    startup_id: str
    summary: str
    generated_at: str
    model: str


@router.post("/{startup_id}", response_model=SummaryResponse)
@limiter.limit("10/minute")
async def create_summary(
    request: Request,
    startup_id: str,
    role: str = Depends(require_investor),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Generate an AI summary for a startup. Investor-only, cached in DB."""
    startup = await startup_repo.find_by_id(db, startup_id)
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found.")

    description = startup.get("description", "")
    if not description.strip():
        raise HTTPException(
            status_code=400,
            detail="Startup has no description to summarize.",
        )

    return await generate_summary(db, startup_id, description)
