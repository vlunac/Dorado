# StartMatch

> AI-powered investor ↔ founder matching platform  
> **Stack:** FastAPI (Python) · Vite React · SQLite → PostgreSQL · Anthropic API · Calendly API

---

## File Structure

```
StartMatch/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py          ← all env vars loaded here
│   │   │   └── security.py        ← JWT helpers, bcrypt
│   │   ├── router/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py            ← POST /auth/register, /auth/login
│   │   │   ├── investors.py       ← GET/PUT /investors/me, GET /investors/{id}
│   │   │   ├── matches.py         ← GET /matches/
│   │   │   ├── startups.py        ← GET/POST/PUT /startups/
│   │   │   └── summaries.py       ← GET /summaries/{id}  ← Anthropic API
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── matching.py        ← match algorithm
│   │   │   └── summaries.py       ← Anthropic API call lives here
│   │   ├── __init__.py
│   │   ├── database.py            ← SQLAlchemy engine + session
│   │   ├── dependencies.py        ← get_current_user, require_investor
│   │   ├── main.py                ← FastAPI app, CORS, router registration
│   │   ├── models.py              ← ORM models: User, Startup, Investment…
│   │   └── schemas.py             ← Pydantic request/response schemas
│   ├── .env.example               ← copy → .env and fill in keys
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js            ← login, register
│   │   │   ├── client.js          ← axios instance, JWT interceptor
│   │   │   ├── investors.js
│   │   │   ├── matches.js
│   │   │   └── startups.js        ← includes getSummary() → Anthropic
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   ├── InvestorProfileForm.jsx
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   └── StartupProfileForm.jsx
│   │   │   ├── ConnectionModal.jsx
│   │   │   ├── FiltersBar.jsx
│   │   │   ├── InvestorCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── StartupCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx    ← JWT storage, login/logout/register
│   │   ├── pages/
│   │   │   ├── FounderDashboard.jsx
│   │   │   ├── FounderProfilePage.jsx
│   │   │   ├── InvestorDashboard.jsx
│   │   │   ├── InvestorProfilePage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NetworkPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   └── StartupDetailPage.jsx
│   │   ├── styles/
│   │   │   └── global.css         ← CSS variables, dark mode, utility classes
│   │   ├── App.jsx                ← client-side router
│   │   └── main.jsx               ← React root, AuthProvider
│   ├── package.json
│   └── vite.config.js             ← dev proxy → backend
│
├── .gitignore
└── README.md
```

---

## Quick Start

### 1 — Clone and enter the project

```bash
git clone <your-repo>
cd StartMatch
```

---

### 2 — Backend setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# → Open .env in your editor and fill in the keys (see API Setup below)

# Run the development server
uvicorn app.main:app --reload --port 8000
```

The API will be live at **http://localhost:8000**  
Interactive docs (Swagger UI): **http://localhost:8000/docs**

---

### 3 — Frontend setup

```bash
cd frontend          # from project root

npm install
npm run dev
```

The app will be live at **http://localhost:5173**

---

## API Setup — Step by Step

### API 1: Anthropic (AI Summaries)

Used for: generating investor-grade 3-sentence summaries of startups on the Search and Startup Detail pages.

**Steps:**
1. Go to **https://console.anthropic.com**
2. Sign up or log in
3. In the left sidebar click **API Keys**
4. Click **Create Key**, give it a name (e.g. "StartMatch")
5. Copy the key — it starts with `sk-ant-...`
6. Open `backend/.env` and set:
   ```
   ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
   ```

**Where it's used in the code:**
- `backend/app/services/summaries.py` — calls `anthropic.AsyncAnthropic`
- `backend/app/router/summaries.py` — exposes `GET /summaries/{startup_id}`
- `frontend/src/api/startups.js` → `getSummary(id)` — frontend call
- `frontend/src/components/StartupCard.jsx` — "✦ AI Summary" button
- `frontend/src/pages/StartupDetailPage.jsx` — "✦ Generate AI Summary" button

---

### API 2: Calendly (Meeting Scheduling)

Used for: the "Schedule Meeting" links throughout the app and the Upcoming Meetings section on the dashboard.

**Steps:**
1. Log in to **https://calendly.com**
2. Go to **Integrations** → **API & Webhooks**
   (direct link: https://calendly.com/integrations/api_webhooks)
3. Under **Personal Access Tokens** click **Generate New Token**
4. Give it a name, copy the token
5. Find your Calendly User URI by running this in your terminal:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
        https://api.calendly.com/users/me
   ```
   Copy the `"uri"` field from the JSON response — it looks like:
   `https://api.calendly.com/users/ABCDEFGHIJK`
6. Open `backend/.env` and set:
   ```
   CALENDLY_API_KEY=YOUR_TOKEN_HERE
   CALENDLY_USER_URI=https://api.calendly.com/users/YOUR_ID
   ```
7. In `frontend/src/` replace every `href="https://calendly.com"` with your
   actual Calendly scheduling link, e.g.:
   `href="https://calendly.com/yourname/30min"`

**Where it's used in the code:**
- `frontend/src/components/StartupCard.jsx` — "📅 Schedule Meeting" link
- `frontend/src/pages/StartupDetailPage.jsx` — "📅 Schedule via Calendly" button
- `frontend/src/components/ConnectionModal.jsx` — "📅 Open Calendly" button
- `frontend/src/pages/InvestorDashboard.jsx` — "Open Calendly Dashboard" button
- `backend/app/core/config.py` — stores the key for future server-side webhook use

---

### API 3: JWT Auth (built-in, no external service)

Your JWT secret key is generated locally — no external account needed.

**Steps:**
1. Run this command in your terminal:
   ```bash
   openssl rand -hex 32
   ```
2. Copy the output (a long hex string)
3. Open `backend/.env` and set:
   ```
   SECRET_KEY=THE_HEX_STRING_YOU_JUST_COPIED
   ```

---

## Environment Variables Reference

| Variable | Where to get it | Required |
|---|---|---|
| `DATABASE_URL` | Change only if using Postgres | No (SQLite default) |
| `SECRET_KEY` | `openssl rand -hex 32` | **Yes** |
| `ANTHROPIC_API_KEY` | console.anthropic.com | **Yes** for AI summaries |
| `CALENDLY_API_KEY` | calendly.com/integrations | **Yes** for scheduling |
| `CALENDLY_USER_URI` | `curl .../users/me` | **Yes** for scheduling |

---

## Common Issues

**`ModuleNotFoundError: No module named 'app'`**  
→ Make sure you're inside the `backend/` directory when running uvicorn, and your virtualenv is activated.

**`401 Unauthorized` on all API calls**  
→ Check that your `SECRET_KEY` in `.env` matches what was used when tokens were issued. If you changed it, existing tokens are invalid — just log in again.

**AI summaries say "unavailable"**  
→ Check `ANTHROPIC_API_KEY` is set in `.env` and the server was restarted after you edited the file.

**CORS errors in the browser**  
→ Make sure `uvicorn` is running on port 8000 and the Vite proxy in `vite.config.js` is pointing to `http://localhost:8000`.
