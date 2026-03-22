"""AI summary schemas."""

from datetime import datetime
from pydantic import BaseModel


class SummaryCreate(BaseModel):
    startup_id: str
    summary: str
    model: str
    startup_description_hash: str


class SummaryRead(BaseModel):
    id: str
    startup_id: str
    summary: str
    model: str
    generated_at: datetime
