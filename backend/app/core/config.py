from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────────────────────────
    APP_NAME: str = "StartMatch API"
    DEBUG: bool = False

    # ── Database ─────────────────────────────────────────────────────────────
    DATABASE_URL: str = "sqlite:///./startmatch.db"
    # For production PostgreSQL use:
    # DATABASE_URL: str = "postgresql://user:password@localhost:5432/startmatch"

    # ── Auth (JWT) ────────────────────────────────────────────────────────────
    # HOW TO GET: Run `openssl rand -hex 32` in your terminal and paste here
    SECRET_KEY: str = "CHANGE_ME_run_openssl_rand_hex_32"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # ── Anthropic (AI Summaries) ──────────────────────────────────────────────
    # HOW TO GET: https://console.anthropic.com → API Keys → Create Key
    ANTHROPIC_API_KEY: str = ""

    # ── Calendly ─────────────────────────────────────────────────────────────
    # HOW TO GET: https://calendly.com/integrations/api_webhooks → Personal Access Token
    CALENDLY_API_KEY: str = ""
    CALENDLY_USER_URI: str = ""  # e.g. https://api.calendly.com/users/XXXX

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
