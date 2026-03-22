"""FastAPI application entry point."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_indexes, get_database
from app.seed import seed_if_empty
from app.routers import (
    dashboard,
    founders,
    investors,
    matches,
    network,
    search,
    startups,
    summaries,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_indexes()
    await seed_if_empty(get_database())
    yield


app = FastAPI(title="StartMatch API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(startups.router, prefix="/api")
app.include_router(investors.router, prefix="/api")
app.include_router(founders.router, prefix="/api")
app.include_router(search.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(matches.router, prefix="/api")
app.include_router(network.router, prefix="/api")
app.include_router(summaries.router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "StartMatch API is running"}
