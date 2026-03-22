"""Investor entity schemas."""

from typing import Optional
from pydantic import BaseModel


class InvestorCreate(BaseModel):
    name: str
    bio: str = ""
    linkedin_url: str = ""
    instagram_url: str = ""
    facebook_url: str = ""
    preferred_industries: list[str] = []
    preferred_stages: list[str] = []
    portfolio_startup_ids: list[str] = []


class InvestorRead(BaseModel):
    id: str
    name: str
    bio: str
    linkedin_url: str
    instagram_url: str
    facebook_url: str
    preferred_industries: list[str]
    preferred_stages: list[str]
    portfolio_startup_ids: list[str]


class InvestorUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    instagram_url: Optional[str] = None
    facebook_url: Optional[str] = None
    preferred_industries: Optional[list[str]] = None
    preferred_stages: Optional[list[str]] = None
    portfolio_startup_ids: Optional[list[str]] = None
