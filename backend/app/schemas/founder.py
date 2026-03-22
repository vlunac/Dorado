"""Founder entity schemas."""

from typing import Optional
from pydantic import BaseModel


class FounderCreate(BaseModel):
    name: str
    bio: str = ""
    linkedin_url: str = ""
    instagram_url: str = ""
    facebook_url: str = ""
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
    name: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    instagram_url: Optional[str] = None
    facebook_url: Optional[str] = None
    startup_ids: Optional[list[str]] = None
