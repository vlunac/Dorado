"""Async MongoDB connection using motor."""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import MONGODB_URL, DATABASE_NAME

client: AsyncIOMotorClient = AsyncIOMotorClient(MONGODB_URL)
db: AsyncIOMotorDatabase = client[DATABASE_NAME]


def get_database() -> AsyncIOMotorDatabase:
    """Return the database instance."""
    return db


async def create_indexes() -> None:
    """Create MongoDB indexes for efficient querying."""
    startups = db["startups"]
    await startups.create_index("industry")
    await startups.create_index("stage")
    await startups.create_index("location")
    await startups.create_index("team_size")
    await startups.create_index("total_raised")
    await startups.create_index("current_ask")
    await startups.create_index("date_founded")
    await startups.create_index("founder_id")

    investors = db["investors"]
    await investors.create_index("preferred_industries")
    await investors.create_index("preferred_stages")

    founders = db["founders"]
    await founders.create_index("startup_ids")
