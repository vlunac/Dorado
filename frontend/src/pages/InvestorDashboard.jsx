import { useState, useEffect } from "react";
import { matchesApi } from "../api/matches";
import StartupCard from "../components/StartupCard";

export default function InvestorDashboard({ setPage, setSelectedStartup }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    matchesApi.getMatches()
      .then(({ data }) => setMatches(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Deals Reviewed", value: "24" },
    { label: "Meetings Booked", value: "7" },
    { label: "Portfolio Co.", value: "3" },
    { label: "New Matches", value: matches.length || "…" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 className="page-title">Good morning 👋</h1>
        <p className="page-sub">Here's what's happening in your network today</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            background: "var(--surface-alt)", borderRadius: 10,
            padding: "16px 20px", flex: 1, minWidth: 110,
          }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--coral)" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Top Matches */}
      <div className="card">
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎯 Top Startup Matches</h2>
        {loading && <p style={{ color: "var(--text-sub)", fontSize: 13 }}>Loading matches…</p>}
        {!loading && matches.length === 0 && (
          <p style={{ color: "var(--text-sub)", fontSize: 13 }}>
            No matches yet. Update your profile with preferred industries and stages to get matched!
          </p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {matches.slice(0, 5).map((s) => (
            <StartupCard key={s.id} startup={s} onClick={() => { setSelectedStartup(s); setPage("startup"); }} />
          ))}
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="card">
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>📅 Upcoming Meetings</h2>
        <p style={{ fontSize: 13, color: "var(--text-sub)", marginBottom: 12 }}>
          Meetings are managed via Calendly. Click below to view your scheduled events.
        </p>
        <a href="https://calendly.com/event_types/user/me" target="_blank" rel="noreferrer"
          className="btn-secondary" style={{ display: "inline-block", textDecoration: "none", fontSize: 13 }}>
          Open Calendly Dashboard
        </a>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>⚡ Quick Actions</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "Search Startups", page: "search" },
            { label: "View Network", page: "network" },
            { label: "My Portfolio", page: "portfolio" },
          ].map((a) => (
            <button key={a.page} className="btn-secondary" onClick={() => setPage(a.page)}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
