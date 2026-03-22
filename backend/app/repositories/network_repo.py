"""Network / connections repository — MongoDB queries."""

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

COLLECTION = "connections"


def _to_oid(id_str: str) -> ObjectId | None:
    try:
        return ObjectId(id_str)
    except Exception:
        return None


def _serialize(doc: dict) -> dict:
    doc = dict(doc)
    doc["id"] = str(doc.pop("_id"))
    return doc


async def find_connections(
    db: AsyncIOMotorDatabase,
    user_id: str,
    role: str,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return connections for a user filtered by their role."""
    field = "investor_id" if role == "investor" else "founder_id"
    cursor = db[COLLECTION].find({field: user_id}).skip(skip).limit(limit)
    return [_serialize(doc) async for doc in cursor]


async def create_connection(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Create a new connection between an investor and founder."""
    result = await db[COLLECTION].insert_one(data)
    doc = await db[COLLECTION].find_one({"_id": result.inserted_id})
    return _serialize(doc)


async def delete_connection(db: AsyncIOMotorDatabase, connection_id: str) -> bool:
    """Remove a connection by ID."""
    oid = _to_oid(connection_id)
    if oid is None:
        return False
    result = await db[COLLECTION].delete_one({"_id": oid})
    return result.deleted_count > 0


async def count_connections(db: AsyncIOMotorDatabase, user_id: str, role: str) -> int:
    """Count connections for a user."""
    field = "investor_id" if role == "investor" else "founder_id"
    return await db[COLLECTION].count_documents({field: user_id})
