"""Founder repository — DB teammate fills in MongoDB queries."""

from motor.motor_asyncio import AsyncIOMotorDatabase


async def find_all(
    db: AsyncIOMotorDatabase,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return all founders with pagination."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def find_by_id(db: AsyncIOMotorDatabase, founder_id: str) -> dict | None:
    """Return a single founder by ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def create(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Insert a new founder profile and return it."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def update(db: AsyncIOMotorDatabase, founder_id: str, data: dict) -> dict | None:
    """Update a founder profile by ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def delete(db: AsyncIOMotorDatabase, founder_id: str) -> bool:
    """Delete a founder by ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")
