"""Google Gemini summary generation service."""

import google.generativeai as genai
from app.core.config import GEMINI_API_KEY

SUMMARY_PROMPT = (
    "Summarize the following startup description in 2-3 concise sentences "
    "for an investor audience. Focus on what the startup does, their target "
    "market, and any traction or differentiators mentioned.\n\n"
    "Startup description:\n{description}"
)

_FALLBACK_SUMMARY = (
    "AI-generated summary unavailable. Please review the full startup "
    "description for details."
)


def _configure_client() -> bool:
    """Configure the Gemini client. Returns True if a real API key is available."""
    if not GEMINI_API_KEY:
        return False
    genai.configure(api_key=GEMINI_API_KEY)
    return True


async def generate_summary(startup_id: str, description: str) -> dict:
    """Generate an AI summary for a startup description.

    Uses the Gemini API if a key is configured, otherwise returns a fallback.
    """
    has_key = _configure_client()

    if not has_key:
        return {
            "startup_id": startup_id,
            "summary": _FALLBACK_SUMMARY,
            "generated_at": _now_iso(),
            "model": "fallback",
        }

    prompt = SUMMARY_PROMPT.format(description=description)

    model = genai.GenerativeModel("gemini-2.0-flash")
    response = await model.generate_content_async(prompt)

    return {
        "startup_id": startup_id,
        "summary": response.text,
        "generated_at": _now_iso(),
        "model": "gemini-2.0-flash",
    }


def _now_iso() -> str:
    from datetime import datetime, timezone
    return datetime.now(timezone.utc).isoformat()
