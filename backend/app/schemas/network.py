"""Network / connection schemas."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ConnectionCreate(BaseModel):
    investor_id: str
    founder_id: str


class ConnectionRead(BaseModel):
    id: str
    investor_id: str
    founder_id: str
    connected_at: Optional[datetime] = None
