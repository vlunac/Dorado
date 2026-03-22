from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas import StartupOut
from app.services.matching import get_matches_for_investor

router = APIRouter(prefix="/matches", tags=["matches"])


@router.get("/", response_model=List[StartupOut])
def get_my_matches(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Returns ranked startup matches for the authenticated investor,
    based on their stated investment thesis stored on their profile.
    """
    return get_matches_for_investor(current_user, db)
