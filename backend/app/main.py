"""FastAPI application entry point."""

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.database import create_indexes, get_database
from app.middleware.camel_case import CamelCaseMiddleware
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


limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])

_docs_url = None if os.getenv("ENV") == "production" else "/docs"
_redoc_url = None if os.getenv("ENV") == "production" else "/redoc"

app = FastAPI(
    title="StartMatch API",
    version="0.1.0",
    lifespan=lifespan,
    docs_url=_docs_url,
    redoc_url=_redoc_url,
)
app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"detail": "Rate limit exceeded."})

app.add_middleware(CamelCaseMiddleware)

_cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
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
