from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models import User, InvestorProfile
from app.schemas import InvestorProfileCreate, InvestorProfileOut

router = APIRouter(prefix="/investors", tags=["investors"])


@router.get("/me", response_model=InvestorProfileOut)
def get_my_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(InvestorProfile).filter(InvestorProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.put("/me", response_model=InvestorProfileOut)
def update_my_profile(
    payload: InvestorProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.query(InvestorProfile).filter(InvestorProfile.user_id == current_user.id).first()
    if not profile:
        profile = InvestorProfile(user_id=current_user.id)
        db.add(profile)
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(profile, field, value)
    db.commit()
    db.refresh(profile)
    return profile


@router.get("/{investor_id}", response_model=InvestorProfileOut)
def get_investor(investor_id: int, db: Session = Depends(get_db)):
    profile = db.query(InvestorProfile).filter(InvestorProfile.id == investor_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Investor not found")
    return profile
