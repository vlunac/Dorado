"""Summaries router — generates AI summaries for startups."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.gemini_summary import generate_summary

router = APIRouter(prefix="/summaries", tags=["summaries"])


class SummaryRequest(BaseModel):
    description: str


class SummaryResponse(BaseModel):
    startup_id: str
    summary: str
    generated_at: str
    model: str


@router.post("/{startup_id}", response_model=SummaryResponse)
async def create_summary(startup_id: str, body: SummaryRequest):
    """Generate an AI summary for the given startup description."""
    if not body.description.strip():
        raise HTTPException(status_code=400, detail="Description cannot be empty.")

    result = await generate_summary(startup_id, body.description)
    return result
