"""Startup repository — MongoDB queries."""

from datetime import datetime, timezone

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

COLLECTION = "startups"


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
    """Return all startups with pagination."""
    cursor = db[COLLECTION].find().skip(skip).limit(limit)
    return [_serialize(doc) async for doc in cursor]


async def find_by_id(db: AsyncIOMotorDatabase, startup_id: str) -> dict | None:
    """Return a single startup by its ID."""
    oid = _to_oid(startup_id)
    if oid is None:
        return None
    doc = await db[COLLECTION].find_one({"_id": oid})
    return _serialize(doc) if doc else None


async def find_by_founder(db: AsyncIOMotorDatabase, founder_id: str) -> list[dict]:
    """Return all startups created by a specific founder."""
    cursor = db[COLLECTION].find({"founder_id": founder_id})
    return [_serialize(doc) async for doc in cursor]


async def create(db: AsyncIOMotorDatabase, data: dict) -> dict:
    """Insert a new startup and return it with its generated ID."""
    now = datetime.now(timezone.utc)
    data["created_at"] = now
    data["updated_at"] = now
    result = await db[COLLECTION].insert_one(data)
    doc = await db[COLLECTION].find_one({"_id": result.inserted_id})
    return _serialize(doc)


async def update(db: AsyncIOMotorDatabase, startup_id: str, data: dict) -> dict | None:
    """Update a startup by ID. Return the updated document or None."""
    oid = _to_oid(startup_id)
    if oid is None:
        return None
    data["updated_at"] = datetime.now(timezone.utc)
    result = await db[COLLECTION].update_one({"_id": oid}, {"$set": data})
    if result.matched_count == 0:
        return None
    doc = await db[COLLECTION].find_one({"_id": oid})
    return _serialize(doc)


async def delete(db: AsyncIOMotorDatabase, startup_id: str) -> bool:
    """Delete a startup by ID. Return True if deleted."""
    oid = _to_oid(startup_id)
    if oid is None:
        return False
    result = await db[COLLECTION].delete_one({"_id": oid})
    return result.deleted_count > 0


async def search(
    db: AsyncIOMotorDatabase,
    filters: dict,
    skip: int = 0,
    limit: int = 20,
) -> list[dict]:
    """Search startups with AND-logic filters."""
    query: dict = {}

    if filters.get("location"):
        query["location"] = {"$regex": filters["location"], "$options": "i"}

    if filters.get("industry"):
        query["industry"] = {"$regex": filters["industry"], "$options": "i"}

    if filters.get("stage"):
        query["stage"] = filters["stage"]

    if filters.get("team_size") is not None:
        query["team_size"] = filters["team_size"]

    total_raised: dict = {}
    if filters.get("total_raised_min") is not None:
        total_raised["$gte"] = filters["total_raised_min"]
    if filters.get("total_raised_max") is not None:
        total_raised["$lte"] = filters["total_raised_max"]
    if total_raised:
        query["total_raised"] = total_raised

    current_ask: dict = {}
    if filters.get("current_ask_min") is not None:
        current_ask["$gte"] = filters["current_ask_min"]
    if filters.get("current_ask_max") is not None:
        current_ask["$lte"] = filters["current_ask_max"]
    if current_ask:
        query["current_ask"] = current_ask

    date_filter: dict = {}
    if filters.get("date_founded_after"):
        date_filter["$gte"] = filters["date_founded_after"]
    if filters.get("date_founded_before"):
        date_filter["$lte"] = filters["date_founded_before"]
    if date_filter:
        query["date_founded"] = date_filter

    cursor = db[COLLECTION].find(query).skip(skip).limit(limit)
    return [_serialize(doc) async for doc in cursor]


async def count(db: AsyncIOMotorDatabase, filters: dict | None = None) -> int:
    """Count startups, optionally filtered."""
    query = filters or {}
    return await db[COLLECTION].count_documents(query)
