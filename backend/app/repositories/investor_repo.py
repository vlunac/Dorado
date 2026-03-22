"""Investor repository — DB teammate fills in MongoDB queries."""

from motor.motor_asyncio import AsyncIOMotorDatabase


async def find_all(
    db: AsyncIOMotorDatabase,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return all investors with pagination."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def find_by_id(db: AsyncIOMotorDatabase, investor_id: str) -> dict | None:
    """Return a single investor by ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def create(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Insert a new investor profile and return it."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def update(db: AsyncIOMotorDatabase, investor_id: str, data: dict) -> dict | None:
    """Update an investor profile by ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def delete(db: AsyncIOMotorDatabase, investor_id: str) -> bool:
    """Delete an investor by ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")
