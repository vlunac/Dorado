"""Match schemas — investor-to-startup matching."""

from pydantic import BaseModel


class MatchRead(BaseModel):
    startup_id: str
    startup_name: str
    industry: str
    stage: str
    location: str
    current_ask: float
    match_score: float  # 0.0 to 1.0
