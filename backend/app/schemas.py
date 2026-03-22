from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ── Auth ──────────────────────────────────────────────────────────────────────
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str  # "investor" or "founder"


class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


# ── Investor Profile ──────────────────────────────────────────────────────────
class InvestorProfileCreate(BaseModel):
    bio: Optional[str] = ""
    linkedin_url: Optional[str] = ""
    instagram_url: Optional[str] = ""
    facebook_url: Optional[str] = ""
    calendly_url: Optional[str] = ""
    preferred_industries: Optional[str] = ""
    preferred_stages: Optional[str] = ""


class InvestorProfileOut(InvestorProfileCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True


# ── Founder Profile ───────────────────────────────────────────────────────────
class FounderProfileCreate(BaseModel):
    bio: Optional[str] = ""
    linkedin_url: Optional[str] = ""
    instagram_url: Optional[str] = ""
    facebook_url: Optional[str] = ""


class FounderProfileOut(FounderProfileCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True


# ── Startup ───────────────────────────────────────────────────────────────────
class StartupCreate(BaseModel):
    name: str
    description: Optional[str] = ""
    industry: Optional[str] = ""
    stage: Optional[str] = ""
    location: Optional[str] = ""
    team_size: Optional[int] = 1
    total_raised: Optional[int] = 0
    current_ask: Optional[int] = 0
    founded_year: Optional[int] = 2024
    tags: Optional[str] = ""


class StartupOut(StartupCreate):
    id: int
    founder_id: int
    ai_summary: Optional[str] = ""
    created_at: datetime

    class Config:
        from_attributes = True


# ── Investment ────────────────────────────────────────────────────────────────
class InvestmentOut(BaseModel):
    id: int
    startup_id: int
    amount: int
    stage_at_investment: str
    invested_at: datetime

    class Config:
        from_attributes = True
