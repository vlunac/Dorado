# StartMatch — Product Requirements Document

## Concept

StartMatch is a social-media-style platform that connects investors with founders who are building startups and need funding.

## Problem

Investors and founders have fragmented discovery and outreach workflows. Investors spend too long filtering opportunities, while founders struggle to get in front of the right investors quickly.

## Solution

Provide two role-based experiences (Investor and Founder) with shared startup discovery, AI-generated startup summaries, and meeting scheduling links to speed up matching and first conversations.

## Target Users

- **Primary:** Investors (angels, VCs, syndicates) looking for startups.
- **Secondary:** Founders seeking funding and investor exposure.

## Navigation and Views

The app supports two views:

1. **Investor View**
2. **Founder View**

Shared left sidebar navigation:

- Dashboard
- Network
- Search
- Portfolio (Investor) / Profile (Founder)
- Upcoming Meetings (Calendly integration)

## Pages and Requirements

### 1. Dashboard

Dashboard should include:

- Startup matches
- Schedule/Meetings module (Calendly API)
- Quick Actions
- General overview cards

Overview metrics to show:

- Meeting overview
- Deals reviewed
- Meetings booked
- Portfolio companies (Investor view)

### 2. Search

Search supports filtering by:

- Team Size
- Location
- Industry
- Stage of Development
- Total Raised
- Current Ask
- Date Founded

Additional search behavior:

- Search results should include a meeting link (Calendly)
- Each result should show an AI summary generated from the startup's full description

### 3. Investor Profile

Investor profile includes:

- Bio
- Social links (LinkedIn, Instagram, Facebook)
- Portfolio of invested startups
- Recent investment history/activity

### 4. Founder Profile

Founder profile includes:

- Bio
- Social links
- Companies founded

### 5. Startup Company Page

Each startup page includes:

- Name
- Full description
- Filter tags/metadata (team size, location, industry, stage, funding fields, date founded)
- Founder link
- Status of progress
- Location
- Members
- Expenses

## AI and External Integrations

### AI Summary (Google Gemini API)

- Generate a concise startup summary from the full startup description.
- Summary is displayed prominently in search results.

### Meetings (Calendly API)

- Provide meeting/scheduling links from dashboard/search/startup contexts.
- Upcoming meetings section should surface scheduled events in demo form.

## Demo Scope (Hackathon MVP)

The demo flow will showcase:

1. Dashboard
2. Investor Profile
3. Founder Profile
4. Investor filter/search
5. Startup AI summary on main search results
6. Startup detail page with progress, location, members, and expenses

## In Scope

- Two role-based views (Investor and Founder)
- Sidebar navigation and core pages for demo
- Search + required filters
- AI summaries using Gemini API
- Calendly meeting link integration (demo-level)
- Startup detail pages with core metadata

## Out of Scope (for this demo)

- Full authentication and account management
- Full social networking features
- Production-grade matching algorithm
- Advanced analytics and notifications
