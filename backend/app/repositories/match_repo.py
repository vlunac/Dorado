"""Match repository — DB teammate fills in MongoDB queries."""

from motor.motor_asyncio import AsyncIOMotorDatabase


async def find_matches_for_investor(
    db: AsyncIOMotorDatabase,
    investor_id: str,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return startups that match an investor's preferred industries/stages.

    The service layer computes match_score; this query should return
    startups whose industry or stage overlaps with the investor's preferences.
    """
    raise NotImplementedError("DB teammate: implement MongoDB query")
