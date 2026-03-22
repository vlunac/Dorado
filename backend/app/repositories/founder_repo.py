"""Founder repository — MongoDB queries."""

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

COLLECTION = "founders"


def _to_oid(id_str: str) -> ObjectId | None:
    try:
        return ObjectId(id_str)
    except Exception:
        return None


def _serialize(doc: dict) -> dict:
    doc = dict(doc)
    doc["id"] = str(doc.pop("_id"))
    return doc


async def find_all(
    db: AsyncIOMotorDatabase,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Return all founders with pagination."""
    cursor = db[COLLECTION].find().skip(skip).limit(limit)
    return [_serialize(doc) async for doc in cursor]


async def find_by_id(db: AsyncIOMotorDatabase, founder_id: str) -> dict | None:
    """Return a single founder by ID."""
    oid = _to_oid(founder_id)
    if oid is None:
        return None
    doc = await db[COLLECTION].find_one({"_id": oid})
    return _serialize(doc) if doc else None


async def create(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Insert a new founder profile and return it."""
    result = await db[COLLECTION].insert_one(data)
    doc = await db[COLLECTION].find_one({"_id": result.inserted_id})
    return _serialize(doc)


async def update(db: AsyncIOMotorDatabase, founder_id: str, data: dict) -> dict | None:
    """Update a founder profile by ID."""
    oid = _to_oid(founder_id)
    if oid is None:
        return None
    result = await db[COLLECTION].update_one({"_id": oid}, {"$set": data})
    if result.matched_count == 0:
        return None
    doc = await db[COLLECTION].find_one({"_id": oid})
    return _serialize(doc)


async def delete(db: AsyncIOMotorDatabase, founder_id: str) -> bool:
    """Delete a founder by ID."""
    oid = _to_oid(founder_id)
    if oid is None:
        return False
    result = await db[COLLECTION].delete_one({"_id": oid})
    return result.deleted_count > 0
