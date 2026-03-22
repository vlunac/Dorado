from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.dependencies import get_current_user
from app.models import User, Startup
from app.schemas import StartupCreate, StartupOut

router = APIRouter(prefix="/startups", tags=["startups"])


@router.get("/", response_model=List[StartupOut])
def list_startups(
    industry: Optional[str] = Query(None),
    stage: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    team_size_min: Optional[int] = Query(None),
    team_size_max: Optional[int] = Query(None),
    total_raised_min: Optional[int] = Query(None),
    current_ask_max: Optional[int] = Query(None),
    founded_year: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(Startup)
    if industry:
        q = q.filter(Startup.industry == industry)
    if stage:
        q = q.filter(Startup.stage == stage)
    if location:
        q = q.filter(Startup.location.ilike(f"%{location}%"))
    if team_size_min:
        q = q.filter(Startup.team_size >= team_size_min)
    if team_size_max:
        q = q.filter(Startup.team_size <= team_size_max)
    if founded_year:
        q = q.filter(Startup.founded_year == founded_year)
    return q.all()


@router.post("/", response_model=StartupOut, status_code=201)
def create_startup(
    payload: StartupCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    startup = Startup(**payload.dict(), founder_id=current_user.id)
    db.add(startup)
    db.commit()
    db.refresh(startup)
    return startup


@router.get("/{startup_id}", response_model=StartupOut)
def get_startup(startup_id: int, db: Session = Depends(get_db)):
    startup = db.query(Startup).filter(Startup.id == startup_id).first()
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    return startup


@router.put("/{startup_id}", response_model=StartupOut)
def update_startup(
    startup_id: int,
    payload: StartupCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    startup = db.query(Startup).filter(Startup.id == startup_id).first()
    if not startup or startup.founder_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(startup, field, value)
    db.commit()
    db.refresh(startup)
    return startup
