from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False)  # "investor" or "founder"
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    investor_profile = relationship("InvestorProfile", back_populates="user", uselist=False)
    founder_profile = relationship("FounderProfile", back_populates="user", uselist=False)
    startups = relationship("Startup", back_populates="founder")


class InvestorProfile(Base):
    __tablename__ = "investor_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    bio = Column(Text, default="")
    linkedin_url = Column(String, default="")
    instagram_url = Column(String, default="")
    facebook_url = Column(String, default="")
    calendly_url = Column(String, default="")
    # Comma-separated e.g. "HealthTech,CleanTech"
    preferred_industries = Column(String, default="")
    preferred_stages = Column(String, default="")

    user = relationship("User", back_populates="investor_profile")
    investments = relationship("Investment", back_populates="investor")


class FounderProfile(Base):
    __tablename__ = "founder_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    bio = Column(Text, default="")
    linkedin_url = Column(String, default="")
    instagram_url = Column(String, default="")
    facebook_url = Column(String, default="")

    user = relationship("User", back_populates="founder_profile")


class Startup(Base):
    __tablename__ = "startups"

    id = Column(Integer, primary_key=True, index=True)
    founder_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, default="")
    industry = Column(String, default="")
    stage = Column(String, default="")        # Pre-Seed, Seed, Series A …
    location = Column(String, default="")
    team_size = Column(Integer, default=1)
    total_raised = Column(Integer, default=0)  # in USD
    current_ask = Column(Integer, default=0)   # in USD
    founded_year = Column(Integer, default=2024)
    tags = Column(String, default="")          # comma-separated
    ai_summary = Column(Text, default="")      # cached AI summary
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    founder = relationship("User", back_populates="startups")
    investments = relationship("Investment", back_populates="startup")


class Investment(Base):
    __tablename__ = "investments"

    id = Column(Integer, primary_key=True, index=True)
    investor_id = Column(Integer, ForeignKey("investor_profiles.id"), nullable=False)
    startup_id = Column(Integer, ForeignKey("startups.id"), nullable=False)
    amount = Column(Integer, default=0)  # in USD
    stage_at_investment = Column(String, default="")
    invested_at = Column(DateTime(timezone=True), server_default=func.now())

    investor = relationship("InvestorProfile", back_populates="investments")
    startup = relationship("Startup", back_populates="investments")
