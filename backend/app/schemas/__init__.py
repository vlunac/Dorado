"""Pydantic schema contracts for all entities."""

from app.schemas.startup import StartupCreate, StartupRead, StartupUpdate
from app.schemas.investor import InvestorCreate, InvestorRead, InvestorUpdate
from app.schemas.founder import FounderCreate, FounderRead, FounderUpdate
from app.schemas.summary import SummaryCreate, SummaryRead
from app.schemas.match import MatchRead
from app.schemas.network import ConnectionRead, ConnectionCreate
from app.schemas.dashboard import DashboardMetrics

__all__ = [
    "StartupCreate", "StartupRead", "StartupUpdate",
    "InvestorCreate", "InvestorRead", "InvestorUpdate",
    "FounderCreate", "FounderRead", "FounderUpdate",
    "SummaryCreate", "SummaryRead",
    "MatchRead",
    "ConnectionRead", "ConnectionCreate",
    "DashboardMetrics",
]
