"""Summary cache repository — DB teammate fills in MongoDB queries."""

from motor.motor_asyncio import AsyncIOMotorDatabase


async def find_by_startup_id(db: AsyncIOMotorDatabase, startup_id: str) -> dict | None:
    """Return cached summary for a startup, or None if not cached."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def upsert(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Insert or update a cached summary for a startup.

    data should include: startup_id, summary, model,
    startup_description_hash, generated_at.
    """
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def delete_by_startup_id(db: AsyncIOMotorDatabase, startup_id: str) -> bool:
    """Delete cached summary when startup description changes."""
    raise NotImplementedError("DB teammate: implement MongoDB query")
