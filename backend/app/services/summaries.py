import anthropic
from app.core.config import settings
from app.models import Startup


async def generate_summary(startup: Startup) -> str:
    """
    Calls the Anthropic API to produce a 3-sentence investor-focused
    summary of a startup. Requires ANTHROPIC_API_KEY in .env.

    HOW TO GET YOUR KEY:
      1. Go to https://console.anthropic.com
      2. Sign up / log in
      3. Navigate to API Keys → Create Key
      4. Copy the key and paste it as ANTHROPIC_API_KEY in your .env file
    """
    if not settings.ANTHROPIC_API_KEY:
        return "AI summary unavailable — add ANTHROPIC_API_KEY to your .env file."

    client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

    prompt = f"""You are a senior investment analyst. Write exactly 3 sentences for an investor audience:
1. What the company does and their core value proposition.
2. Key traction metric or market opportunity.
3. Funding ask and what it will be used for.

Startup: {startup.name}
Industry: {startup.industry}
Stage: {startup.stage}
Description: {startup.description}
Total Raised: ${startup.total_raised:,}
Current Ask: ${startup.current_ask:,}
Team Size: {startup.team_size}
Founded: {startup.founded_year}

Respond with only the 3-sentence summary, no preamble."""

    message = await client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=256,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text
