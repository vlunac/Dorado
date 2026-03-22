"""Investor entity schemas."""

from typing import Optional
from pydantic import BaseModel, Field


class InvestorCreate(BaseModel):
    name: str = Field(max_length=200)
    bio: str = Field(default="", max_length=5000)
    linkedin_url: str = Field(default="", max_length=500)
    instagram_url: str = Field(default="", max_length=500)
    facebook_url: str = Field(default="", max_length=500)
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
    name: Optional[str] = Field(default=None, max_length=200)
    bio: Optional[str] = Field(default=None, max_length=5000)
    linkedin_url: Optional[str] = Field(default=None, max_length=500)
    instagram_url: Optional[str] = Field(default=None, max_length=500)
    facebook_url: Optional[str] = Field(default=None, max_length=500)
    preferred_industries: Optional[list[str]] = None
    preferred_stages: Optional[list[str]] = None
    portfolio_startup_ids: Optional[list[str]] = None
