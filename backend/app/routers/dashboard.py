"""Dashboard aggregate metrics for investor and founder views."""

from fastapi import APIRouter, Depends, Header
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.dependencies import get_db, get_user_role
from app.schemas.dashboard import DashboardMetrics
from app.services.dashboard import get_investor_metrics, get_founder_metrics

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/", response_model=DashboardMetrics)
async def get_dashboard(
    user_id: str = Header(..., alias="X-User-Id"),
    role: str = Depends(get_user_role),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Return computed dashboard metrics based on user role."""
    if role == "investor":
        return await get_investor_metrics(db, user_id)
    return await get_founder_metrics(db, user_id)
