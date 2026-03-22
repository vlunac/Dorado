"""Startup entity schemas."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class StartupCreate(BaseModel):
    name: str = Field(max_length=200)
    description: str = Field(max_length=10000)
    industry: str = Field(max_length=100)
    location: str = Field(max_length=200)
    stage: str = Field(max_length=50)  # e.g. "pre-seed", "seed", "series-a"
    team_size: int = Field(ge=1)
    total_raised: float = Field(ge=0, default=0)
    current_ask: float = Field(ge=0, default=0)
    date_founded: str = Field(max_length=50)  # ISO date string
    founder_id: str
    expenses: float = Field(ge=0, default=0)
    status: str = Field(default="active", max_length=50)  # active, paused, closed


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
    name: Optional[str] = Field(default=None, max_length=200)
    description: Optional[str] = Field(default=None, max_length=10000)
    industry: Optional[str] = Field(default=None, max_length=100)
    location: Optional[str] = Field(default=None, max_length=200)
    stage: Optional[str] = Field(default=None, max_length=50)
    team_size: Optional[int] = Field(default=None, ge=1)
    total_raised: Optional[float] = Field(default=None, ge=0)
    current_ask: Optional[float] = Field(default=None, ge=0)
    date_founded: Optional[str] = Field(default=None, max_length=50)
    expenses: Optional[float] = Field(default=None, ge=0)
    status: Optional[str] = Field(default=None, max_length=50)
