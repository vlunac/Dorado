"""Startup entity schemas."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class StartupCreate(BaseModel):
    name: str
    description: str
    industry: str
    location: str
    stage: str  # e.g. "pre-seed", "seed", "series-a"
    team_size: int = Field(ge=1)
    total_raised: float = Field(ge=0, default=0)
    current_ask: float = Field(ge=0, default=0)
    date_founded: str  # ISO date string
    founder_id: str
    expenses: float = Field(ge=0, default=0)
    status: str = "active"  # active, paused, closed


class StartupRead(BaseModel):
    id: str
    name: str
    description: str
    industry: str
    location: str
    stage: str
    team_size: int
    total_raised: float
    current_ask: float
    date_founded: str
    founder_id: str
    expenses: float
    status: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class StartupUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    stage: Optional[str] = None
    team_size: Optional[int] = Field(default=None, ge=1)
    total_raised: Optional[float] = Field(default=None, ge=0)
    current_ask: Optional[float] = Field(default=None, ge=0)
    date_founded: Optional[str] = None
    expenses: Optional[float] = Field(default=None, ge=0)
    status: Optional[str] = None
