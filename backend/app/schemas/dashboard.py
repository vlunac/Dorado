"""Dashboard metrics schema."""

from pydantic import BaseModel


class DashboardMetrics(BaseModel):
    deals_reviewed: int = 0
    meetings_booked: int = 0
    portfolio_companies: int = 0
    total_startups: int = 0
    active_connections: int = 0
