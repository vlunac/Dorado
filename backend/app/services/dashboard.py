"""Dashboard service — computes aggregate metrics from real data."""

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.repositories import startup_repo, investor_repo, network_repo


async def get_investor_metrics(db: AsyncIOMotorDatabase, investor_id: str) -> dict:
    """Compute dashboard metrics for an investor."""
    investor = await investor_repo.find_by_id(db, investor_id)
    portfolio_ids = investor.get("portfolio_startup_ids", []) if investor else []

    total_startups = await startup_repo.count(db)
    connections = await network_repo.count_connections(db, investor_id, "investor")

    return {
        "deals_reviewed": total_startups,
        "meetings_booked": 0,  # no Calendly integration
        "portfolio_companies": len(portfolio_ids),
        "total_startups": total_startups,
        "active_connections": connections,
    }


async def get_founder_metrics(db: AsyncIOMotorDatabase, founder_id: str) -> dict:
    """Compute dashboard metrics for a founder."""
    startups = await startup_repo.find_by_founder(db, founder_id)
    connections = await network_repo.count_connections(db, founder_id, "founder")

    return {
        "deals_reviewed": 0,
        "meetings_booked": 0,
        "portfolio_companies": len(startups),
        "total_startups": len(startups),
        "active_connections": connections,
    }
