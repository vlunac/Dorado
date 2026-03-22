"""Summary cache repository — MongoDB queries."""

from motor.motor_asyncio import AsyncIOMotorDatabase

COLLECTION = "summaries"


def _serialize(doc: dict) -> dict:
    doc = dict(doc)
    doc.pop("_id", None)
    return doc


async def find_by_startup_id(db: AsyncIOMotorDatabase, startup_id: str) -> dict | None:
    """Return cached summary for a startup, or None if not cached."""
    doc = await db[COLLECTION].find_one({"startup_id": startup_id})
    return _serialize(doc) if doc else None


async def upsert(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Insert or update a cached summary for a startup."""
    await db[COLLECTION].update_one(
        {"startup_id": data["startup_id"]},
        {"$set": data},
        upsert=True,
    )
    doc = await db[COLLECTION].find_one({"startup_id": data["startup_id"]})
    return _serialize(doc)


async def delete_by_startup_id(db: AsyncIOMotorDatabase, startup_id: str) -> bool:
    """Delete cached summary when startup description changes."""
    result = await db[COLLECTION].delete_one({"startup_id": startup_id})
    return result.deleted_count > 0
