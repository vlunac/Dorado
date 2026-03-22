from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Startup
from app.services.summaries import generate_summary

router = APIRouter(prefix="/summaries", tags=["summaries"])


@router.get("/{startup_id}")
async def get_summary(startup_id: int, db: Session = Depends(get_db)):
    """
    Generates an AI investor summary for a startup using the Anthropic API.
    Results are cached on the Startup row so we don't re-call the API each time.
    """
    startup = db.query(Startup).filter(Startup.id == startup_id).first()
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")

    # Return cached summary if it exists
    if startup.ai_summary:
        return {"summary": startup.ai_summary, "cached": True}

    summary = await generate_summary(startup)

    # Cache it
    startup.ai_summary = summary
    db.commit()

    return {"summary": summary, "cached": False}
