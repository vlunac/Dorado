"""Startup repository — DB teammate fills in MongoDB queries."""

from motor.motor_asyncio import AsyncIOMotorDatabase


async def find_all(
    db: AsyncIOMotorDatabase,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return all startups with pagination."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def find_by_id(db: AsyncIOMotorDatabase, startup_id: str) -> dict | None:
    """Return a single startup by its ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def find_by_founder(db: AsyncIOMotorDatabase, founder_id: str) -> list[dict]:
    """Return all startups created by a specific founder."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def create(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Insert a new startup and return it with its generated ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def update(db: AsyncIOMotorDatabase, startup_id: str, data: dict) -> dict | None:
    """Update a startup by ID. Return the updated document or None."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def delete(db: AsyncIOMotorDatabase, startup_id: str) -> bool:
    """Delete a startup by ID. Return True if deleted."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def search(
    db: AsyncIOMotorDatabase,
    filters: dict,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Search startups with AND-logic filters.

    Supported filter keys: team_size, location, industry, stage,
    total_raised_min, total_raised_max, current_ask_min, current_ask_max,
    date_founded_after, date_founded_before.
    """
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def count(db: AsyncIOMotorDatabase, filters: dict | None = None) -> int:
    """Count startups, optionally filtered."""
    raise NotImplementedError("DB teammate: implement MongoDB query")
