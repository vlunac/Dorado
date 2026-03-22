"""Async MongoDB connection using motor."""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import MONGODB_URL, DATABASE_NAME

client: AsyncIOMotorClient = AsyncIOMotorClient(MONGODB_URL)
db: AsyncIOMotorDatabase = client[DATABASE_NAME]


def get_database() -> AsyncIOMotorDatabase:
    """Return the database instance."""
    return db
