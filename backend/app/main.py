from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database import create_tables
from app.router import auth, investors, startups, matches, summaries

app = FastAPI(title=settings.APP_NAME, version="1.0.0")

# ── CORS ──────────────────────────────────────────────────────────────────────
# During development allow the Vite dev server (port 5173).
# In production replace with your actual frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(investors.router)
app.include_router(startups.router)
app.include_router(matches.router)
app.include_router(summaries.router)


@app.on_event("startup")
def on_startup():
    create_tables()


@app.get("/health")
def health():
    return {"status": "ok"}
