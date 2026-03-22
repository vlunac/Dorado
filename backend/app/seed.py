"""Seed the database with demo data if collections are empty."""

from __future__ import annotations

from motor.motor_asyncio import AsyncIOMotorDatabase

STARTUPS_COLLECTION = "startups"
INVESTORS_COLLECTION = "investors"
FOUNDERS_COLLECTION = "founders"

# ---------------------------------------------------------------------------
# Demo investors
# ---------------------------------------------------------------------------

SEED_INVESTORS = [
    {
        "name": "Alexandra Chen",
        "bio": (
            "General Partner at Horizon Ventures with 12 years backing early-stage "
            "B2B SaaS and fintech startups. Former Goldman Sachs analyst turned VC."
        ),
        "linkedin_url": "https://linkedin.com/in/alexchen",
        "instagram_url": "https://instagram.com/alexchenvc",
        "facebook_url": "",
        "preferred_industries": ["FinTech", "HealthTech"],
        "preferred_stages": ["seed", "series-a"],
        "portfolio_startup_ids": [],
    },
    {
        "name": "Marcus Williams",
        "bio": (
            "Angel investor and LP across 3 seed funds. Focus on climate tech and "
            "marketplace businesses. Previously co-founded and exited two SaaS companies."
        ),
        "linkedin_url": "https://linkedin.com/in/marcuswvc",
        "instagram_url": "",
        "facebook_url": "https://facebook.com/marcuswilliamsinvests",
        "preferred_industries": ["Climate Tech", "PropTech"],
        "preferred_stages": ["pre-seed", "seed", "series-a"],
        "portfolio_startup_ids": [],
    },
]

# ---------------------------------------------------------------------------
# Demo founders
# ---------------------------------------------------------------------------

SEED_FOUNDERS = [
    {
        "name": "Priya Sharma",
        "bio": (
            "CEO & Co-founder of MedLoom AI. Ex-Google Brain researcher. "
            "Passionate about making diagnostics accessible in emerging markets."
        ),
        "linkedin_url": "https://linkedin.com/in/priyasharma",
        "instagram_url": "https://instagram.com/priyabuilds",
        "facebook_url": "",
        "startup_ids": [],
    },
    {
        "name": "James Okoye",
        "bio": (
            "Founder of GreenGrid. Civil engineer turned climate entrepreneur. "
            "Building peer-to-peer solar energy trading for sub-Saharan Africa."
        ),
        "linkedin_url": "https://linkedin.com/in/jamesokoye",
        "instagram_url": "",
        "facebook_url": "https://facebook.com/jamesokoye",
        "startup_ids": [],
    },
    {
        "name": "Sofia Reyes",
        "bio": (
            "Co-founder & CTO of PayFlow. Former Stripe engineer. Building "
            "cross-border payment infrastructure for Latin American SMBs."
        ),
        "linkedin_url": "https://linkedin.com/in/sofiareyes",
        "instagram_url": "https://instagram.com/sofiabuildstech",
        "facebook_url": "",
        "startup_ids": [],
    },
    {
        "name": "David Park",
        "bio": (
            "Founder of NutriAI. Nutritionist and ML engineer on a mission to "
            "personalise dietary guidance using continuous glucose monitoring data."
        ),
        "linkedin_url": "https://linkedin.com/in/davidparknutri",
        "instagram_url": "https://instagram.com/nutriai_david",
        "facebook_url": "",
        "startup_ids": [],
    },
    {
        "name": "Ryan Holloway",
        "bio": (
            "Founder of BuildBridge. Former general contractor turned SaaS builder. "
            "Solving construction project management for the 80K contractors still on spreadsheets."
        ),
        "linkedin_url": "https://linkedin.com/in/ryanholloway",
        "instagram_url": "",
        "facebook_url": "",
        "startup_ids": [],
    },
]

# ---------------------------------------------------------------------------
# Demo startups (_founder_name resolved to ID during seeding)
# ---------------------------------------------------------------------------

SEED_STARTUPS = [
    {
        "name": "MedLoom AI",
        "description": (
            "MedLoom AI applies large vision models to digitised pathology slides, "
            "enabling sub-Saharan African hospitals to receive specialist-grade cancer "
            "diagnoses within minutes rather than weeks. The platform integrates with "
            "existing hospital LIS software and requires no GPU infrastructure on-site. "
            "Currently processing 4,000 slides per month across 12 partner hospitals in "
            "Nigeria and Kenya, with a 94% concordance rate against specialist pathologists."
        ),
        "team_size": 8,
        "location": "Lagos, Nigeria",
        "industry": "HealthTech",
        "stage": "seed",
        "total_raised": 750000.0,
        "current_ask": 2500000.0,
        "date_founded": "2022-03-15",
        "status": "Active — Series A preparation",
        "expenses": 88500.0,
        "_founder_name": "Priya Sharma",
    },
    {
        "name": "GreenGrid",
        "description": (
            "GreenGrid is a peer-to-peer solar energy trading marketplace that lets "
            "households and small businesses in off-grid and semi-grid areas of sub-Saharan "
            "Africa buy and sell surplus solar power via mobile money. Using IoT smart-meters "
            "and a lightweight mobile app, GreenGrid has onboarded 3,200 prosumers across "
            "Ghana and Senegal, facilitating $180K in energy transactions monthly. "
            "The business model takes a 3% transaction fee and sells real-time grid data "
            "to utilities and development banks."
        ),
        "team_size": 12,
        "location": "Accra, Ghana",
        "industry": "Climate Tech",
        "stage": "series-a",
        "total_raised": 3200000.0,
        "current_ask": 8000000.0,
        "date_founded": "2020-07-01",
        "status": "Active — Series A open",
        "expenses": 160000.0,
        "_founder_name": "James Okoye",
    },
    {
        "name": "PayFlow",
        "description": (
            "PayFlow provides a single API for cross-border payments across 18 Latin "
            "American countries, handling FX conversion, local rails, and compliance "
            "in one integration. Targeted at mid-market e-commerce and B2B platforms, "
            "PayFlow processes $4.2M in monthly transaction volume with an average "
            "take rate of 1.1%. Key differentiators are sub-second settlement and "
            "built-in KYC/AML tooling that removes the need for a third-party provider."
        ),
        "team_size": 15,
        "location": "São Paulo, Brazil",
        "industry": "FinTech",
        "stage": "series-a",
        "total_raised": 4500000.0,
        "current_ask": 12000000.0,
        "date_founded": "2021-01-10",
        "status": "Active — scaling sales team",
        "expenses": 184000.0,
        "_founder_name": "Sofia Reyes",
    },
    {
        "name": "NutriAI",
        "description": (
            "NutriAI pairs continuous glucose monitor (CGM) data with a fine-tuned "
            "nutrition LLM to deliver hyper-personalised meal and supplement plans. "
            "Users connect their Dexcom or Libre sensor; NutriAI analyses glycaemic "
            "response patterns and generates a daily nutrition protocol updated in real-time. "
            "In a 300-person pilot, users saw an average 18% improvement in time-in-range "
            "versus standard dietitian advice. Revenue model: $29/month subscription with "
            "a 68% 90-day retention rate."
        ),
        "team_size": 5,
        "location": "San Francisco, CA",
        "industry": "HealthTech",
        "stage": "pre-seed",
        "total_raised": 250000.0,
        "current_ask": 1500000.0,
        "date_founded": "2023-06-20",
        "status": "Active — pilot expanding to 1,000 users",
        "expenses": 36300.0,
        "_founder_name": "David Park",
    },
    {
        "name": "BuildBridge",
        "description": (
            "BuildBridge is a construction project management SaaS built for "
            "small-to-mid-size contractors in the US. It consolidates scheduling, "
            "subcontractor payments, permit tracking, and client communication into "
            "one mobile-first platform. The construction software market is fragmented "
            "with legacy desktop tools; BuildBridge targets the 80,000 contractors "
            "who still manage projects via spreadsheets and WhatsApp. Currently at "
            "$42K MRR with 210 paying customers and a 4.8-star rating on G2."
        ),
        "team_size": 7,
        "location": "Austin, TX",
        "industry": "PropTech",
        "stage": "seed",
        "total_raised": 900000.0,
        "current_ask": 3000000.0,
        "date_founded": "2022-09-05",
        "status": "Active — product-market fit, scaling sales",
        "expenses": 78000.0,
        "_founder_name": "Ryan Holloway",
    },
]


# ---------------------------------------------------------------------------
# Seeding logic
# ---------------------------------------------------------------------------

async def seed_if_empty(db: AsyncIOMotorDatabase) -> None:
    """Insert demo data only if the collections are empty."""
    startup_count = await db[STARTUPS_COLLECTION].count_documents({})
    investor_count = await db[INVESTORS_COLLECTION].count_documents({})

    if startup_count > 0 and investor_count > 0:
        return

    # Insert founders, build name -> id map
    founder_result = await db[FOUNDERS_COLLECTION].insert_many(SEED_FOUNDERS)
    name_to_founder_id = {
        f["name"]: str(inserted_id)
        for f, inserted_id in zip(SEED_FOUNDERS, founder_result.inserted_ids)
    }

    # Insert startups, resolving founder_id from name
    startups_to_insert = []
    for s in SEED_STARTUPS:
        doc = {k: v for k, v in s.items() if k != "_founder_name"}
        doc["founder_id"] = name_to_founder_id.get(s["_founder_name"], "")
        startups_to_insert.append(doc)

    startup_result = await db[STARTUPS_COLLECTION].insert_many(startups_to_insert)

    # Back-fill startup_ids on each founder
    name_to_startup_ids: dict[str, list] = {}
    for s, sid in zip(SEED_STARTUPS, startup_result.inserted_ids):
        name_to_startup_ids.setdefault(s["_founder_name"], []).append(str(sid))

    for name, sids in name_to_startup_ids.items():
        await db[FOUNDERS_COLLECTION].update_one(
            {"name": name},
            {"$set": {"startup_ids": sids}},
        )

    # Insert investors, back-fill portfolio
    investor_result = await db[INVESTORS_COLLECTION].insert_many(SEED_INVESTORS)

    medloom_id = str(startup_result.inserted_ids[0])
    greengrid_id = str(startup_result.inserted_ids[1])
    payflow_id = str(startup_result.inserted_ids[2])

    await db[INVESTORS_COLLECTION].update_one(
        {"name": "Alexandra Chen"},
        {"$set": {"portfolio_startup_ids": [payflow_id, medloom_id]}},
    )
    await db[INVESTORS_COLLECTION].update_one(
        {"name": "Marcus Williams"},
        {"$set": {"portfolio_startup_ids": [greengrid_id]}},
    )
