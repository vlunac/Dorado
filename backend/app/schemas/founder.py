"""Founder entity schemas."""

from typing import Optional
from pydantic import BaseModel, Field


class FounderCreate(BaseModel):
    name: str = Field(max_length=200)
    bio: str = Field(default="", max_length=5000)
    linkedin_url: str = Field(default="", max_length=500)
    instagram_url: str = Field(default="", max_length=500)
    facebook_url: str = Field(default="", max_length=500)
    startup_ids: list[str] = []


class FounderRead(BaseModel):
    id: str
    name: str
    bio: str
    linkedin_url: str
    instagram_url: str
    facebook_url: str
    startup_ids: list[str]


class FounderUpdate(BaseModel):
    name: Optional[str] = Field(default=None, max_length=200)
    bio: Optional[str] = Field(default=None, max_length=5000)
    linkedin_url: Optional[str] = Field(default=None, max_length=500)
    instagram_url: Optional[str] = Field(default=None, max_length=500)
    facebook_url: Optional[str] = Field(default=None, max_length=500)
    startup_ids: Optional[list[str]] = None
