"""Matching service — scores startups against investor preferences."""

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.repositories import investor_repo, match_repo


def _compute_match_score(
    startup: dict,
    preferred_industries: list[str],
    preferred_stages: list[str],
) -> float:
    """Score 0.0-1.0 based on industry + stage overlap.

    - Industry match = 0.5
    - Stage match = 0.5
    """
    score = 0.0
    if startup.get("industry", "").lower() in [i.lower() for i in preferred_industries]:
        score += 0.5
    if startup.get("stage", "").lower() in [s.lower() for s in preferred_stages]:
        score += 0.5
    return score


async def get_matches_for_investor(
    db: AsyncIOMotorDatabase,
    investor_id: str,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return scored startup matches for an investor."""
    investor = await investor_repo.find_by_id(db, investor_id)
    if not investor:
        return []

    preferred_industries = investor.get("preferred_industries", [])
    preferred_stages = investor.get("preferred_stages", [])

    raw_matches = await match_repo.find_matches_for_investor(
        db, investor_id, skip=skip, limit=limit
    )

    scored = []
    for startup in raw_matches:
        score = _compute_match_score(startup, preferred_industries, preferred_stages)
        scored.append({
            "startup_id": startup.get("id", ""),
            "startup_name": startup.get("name", ""),
            "industry": startup.get("industry", ""),
            "stage": startup.get("stage", ""),
            "location": startup.get("location", ""),
            "current_ask": startup.get("current_ask", 0),
            "match_score": score,
        })

    scored.sort(key=lambda m: m["match_score"], reverse=True)
    return scored
