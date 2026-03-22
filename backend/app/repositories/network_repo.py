"""Network / connections repository — DB teammate fills in MongoDB queries."""

from motor.motor_asyncio import AsyncIOMotorDatabase


async def find_connections(
    db: AsyncIOMotorDatabase,
    user_id: str,
    role: str,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return connections for a user.

    If role is 'investor', filter by investor_id=user_id.
    If role is 'founder', filter by founder_id=user_id.
    """
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def create_connection(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Create a new connection between an investor and founder."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def delete_connection(db: AsyncIOMotorDatabase, connection_id: str) -> bool:
    """Remove a connection by ID."""
    raise NotImplementedError("DB teammate: implement MongoDB query")


async def count_connections(db: AsyncIOMotorDatabase, user_id: str, role: str) -> int:
    """Count connections for a user."""
    raise NotImplementedError("DB teammate: implement MongoDB query")
