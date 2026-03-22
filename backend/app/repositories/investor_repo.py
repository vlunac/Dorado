"""Investor repository — MongoDB queries."""

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

COLLECTION = "investors"


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
    """Return all investors with pagination."""
    cursor = db[COLLECTION].find().skip(skip).limit(limit)
    return [_serialize(doc) async for doc in cursor]


async def find_by_id(db: AsyncIOMotorDatabase, investor_id: str) -> dict | None:
    """Return a single investor by ID."""
    oid = _to_oid(investor_id)
    if oid is None:
        return None
    doc = await db[COLLECTION].find_one({"_id": oid})
    return _serialize(doc) if doc else None


async def create(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Insert a new investor profile and return it."""
    result = await db[COLLECTION].insert_one(data)
    doc = await db[COLLECTION].find_one({"_id": result.inserted_id})
    return _serialize(doc)


async def update(db: AsyncIOMotorDatabase, investor_id: str, data: dict) -> dict | None:
    """Update an investor profile by ID."""
    oid = _to_oid(investor_id)
    if oid is None:
        return None
    result = await db[COLLECTION].update_one({"_id": oid}, {"$set": data})
    if result.matched_count == 0:
        return None
    doc = await db[COLLECTION].find_one({"_id": oid})
    return _serialize(doc)


async def delete(db: AsyncIOMotorDatabase, investor_id: str) -> bool:
    """Delete an investor by ID."""
    oid = _to_oid(investor_id)
    if oid is None:
        return False
    result = await db[COLLECTION].delete_one({"_id": oid})
    return result.deleted_count > 0
