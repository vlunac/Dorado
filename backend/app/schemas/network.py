"""Network / connection schemas."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ConnectionCreate(BaseModel):
    investor_id: str = Field(max_length=100)
    founder_id: str = Field(max_length=100)


class ConnectionRead(BaseModel):
    id: str
    investor_id: str
    founder_id: str
    connected_at: Optional[datetime] = None
