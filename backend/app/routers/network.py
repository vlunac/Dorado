"""Network / connections endpoints."""

from fastapi import APIRouter, Depends, Header, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.dependencies import get_db, get_user_role
from app.schemas.network import ConnectionCreate, ConnectionRead
from app.repositories import network_repo

router = APIRouter(prefix="/network", tags=["network"])


@router.get("/", response_model=list[ConnectionRead])
async def list_connections(
    user_id: str = Header(..., alias="X-User-Id"),
    role: str = Depends(get_user_role),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """List connections for the current user."""
    return await network_repo.find_connections(db, user_id, role, skip=skip, limit=limit)


@router.post("/", response_model=ConnectionRead, status_code=201)
async def create_connection(
    body: ConnectionCreate,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Create a new investor-founder connection."""
    return await network_repo.create_connection(db, body.model_dump())


@router.delete("/{connection_id}", status_code=204)
async def delete_connection(
    connection_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    """Remove a connection."""
    deleted = await network_repo.delete_connection(db, connection_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Connection not found.")
