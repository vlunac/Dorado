"""Google Gemini summary generation service with DB caching."""

import hashlib
from datetime import datetime, timezone

import google.generativeai as genai
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import GEMINI_API_KEY
from app.repositories import summary_repo

SUMMARY_PROMPT = (
    "Summarize the following startup description in 2-3 concise sentences "
    "for an investor audience. Focus on what the startup does, their target "
    "market, and any traction or differentiators mentioned.\n\n"
    "Startup description:\n{description}"
)

_FALLBACK_SUMMARY = (
    "Summary unavailable \u2014 not enough data from the startup."
)


def _configure_client() -> bool:
    """Configure the Gemini client. Returns True if a real API key is available."""
    if not GEMINI_API_KEY:
        return False
    genai.configure(api_key=GEMINI_API_KEY)
    return True


def _hash_description(description: str) -> str:
    """Produce a short hash to detect description changes."""
    return hashlib.sha256(description.encode()).hexdigest()[:16]


async def generate_summary(
    db: AsyncIOMotorDatabase,
    startup_id: str,
    description: str,
) -> dict:
    """Generate an AI summary, using cached version when available.

    Cache is invalidated when the startup description hash changes.
    """
    desc_hash = _hash_description(description)

    # Check cache
    cached = await summary_repo.find_by_startup_id(db, startup_id)
    if cached and cached.get("startup_description_hash") == desc_hash:
        return {
            "startup_id": startup_id,
            "summary": cached["summary"],
            "generated_at": cached["generated_at"],
            "model": cached["model"],
        }

    # Generate fresh summary
    has_key = _configure_client()
    now = datetime.now(timezone.utc).isoformat()

    if not has_key:
        summary_text = _FALLBACK_SUMMARY
        model_name = "fallback"
    else:
        try:
            prompt = SUMMARY_PROMPT.format(description=description)
            model = genai.GenerativeModel("gemini-2.0-flash")
            response = await model.generate_content_async(prompt)
            summary_text = response.text
            model_name = "gemini-2.0-flash"
        except Exception:
            summary_text = _FALLBACK_SUMMARY
            model_name = "fallback"

    # Persist to cache
    await summary_repo.upsert(db, {
        "startup_id": startup_id,
        "summary": summary_text,
        "model": model_name,
        "startup_description_hash": desc_hash,
        "generated_at": now,
    })

    return {
        "startup_id": startup_id,
        "summary": summary_text,
        "generated_at": now,
        "model": model_name,
    }
