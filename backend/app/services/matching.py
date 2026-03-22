from sqlalchemy.orm import Session
from app.models import User, Startup, InvestorProfile


def get_matches_for_investor(user: User, db: Session):
    """
    Simple matching algorithm:
    1. Pull the investor's preferred industries and stages from their profile.
    2. Return startups that match any of those criteria, ordered by recency.
    Swap this out for a vector-embedding similarity search for v2.
    """
    profile: InvestorProfile = db.query(InvestorProfile).filter(
        InvestorProfile.user_id == user.id
    ).first()

    q = db.query(Startup)

    if profile:
        filters = []
        if profile.preferred_industries:
            industries = [i.strip() for i in profile.preferred_industries.split(",")]
            filters.append(Startup.industry.in_(industries))
        if profile.preferred_stages:
            stages = [s.strip() for s in profile.preferred_stages.split(",")]
            filters.append(Startup.stage.in_(stages))
        if filters:
            from sqlalchemy import or_
            q = q.filter(or_(*filters))

    return q.order_by(Startup.id.desc()).limit(20).all()
