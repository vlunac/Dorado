"""Match repository — MongoDB queries."""

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

INVESTORS_COLLECTION = "investors"
STARTUPS_COLLECTION = "startups"


def _to_oid(id_str: str) -> ObjectId | None:
    try:
        return ObjectId(id_str)
    except Exception:
        return None


def _serialize(doc: dict) -> dict:
    doc = dict(doc)
    doc["id"] = str(doc.pop("_id"))
    return doc


async def find_matches_for_investor(
    db: AsyncIOMotorDatabase,
    investor_id: str,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return startups matching an investor's preferred industries/stages."""
    oid = _to_oid(investor_id)
    if oid is None:
        return []

    investor = await db[INVESTORS_COLLECTION].find_one({"_id": oid})
    if not investor:
        return []

    preferred_industries = investor.get("preferred_industries", [])
    preferred_stages = investor.get("preferred_stages", [])

    query: dict = {}
    conditions = []
    if preferred_industries:
        conditions.append({"industry": {"$in": preferred_industries}})
    if preferred_stages:
        conditions.append({"stage": {"$in": preferred_stages}})

    if conditions:
        query["$or"] = conditions

    cursor = db[STARTUPS_COLLECTION].find(query).skip(skip).limit(limit)
    return [_serialize(doc) async for doc in cursor]
