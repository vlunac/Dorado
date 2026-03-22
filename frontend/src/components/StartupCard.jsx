import { useState } from "react";
import { startupsApi } from "../api/startups";

export default function StartupCard({ startup, onClick }) {
  const [summary, setSummary] = useState(startup.ai_summary || "");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const tags = startup.tags ? startup.tags.split(",").filter(Boolean) : [];

  async function fetchSummary(e) {
    e.stopPropagation();
    setLoadingSummary(true);
    try {
      const { data } = await startupsApi.getSummary(startup.id);
      setSummary(data.summary);
    } catch {
      setSummary("Could not generate summary.");
    }
    setLoadingSummary(false);
  }

  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start", transition: "box-shadow 0.15s" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Avatar */}
      <div style={{
        width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, var(--teal2), var(--coral))",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 800, fontSize: 18,
      }}>
        {startup.name[0]}
      </div>

      <div style={{ flex: 1 }}>
        {/* Name + tags */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>{startup.name}</span>
          <span className="tag">{startup.stage}</span>
          <span className="tag">{startup.industry}</span>
          {tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Meta */}
        <div style={{ color: "var(--text-sub)", fontSize: 12, marginBottom: 6 }}>
          📍 {startup.location} · 👥 Team of {startup.team_size} · 🗓 Founded {startup.founded_year}
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)", marginBottom: 8 }}>
          {startup.description}
        </p>

        {/* Financials + Calendly */}
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "var(--text-sub)" }}>
            RAISED <strong style={{ color: "var(--teal2)" }}>${startup.total_raised?.toLocaleString()}</strong>
          </span>
          <span style={{ fontSize: 12, color: "var(--text-sub)" }}>
            ASK <strong style={{ color: "var(--coral)" }}>${startup.current_ask?.toLocaleString()}</strong>
          </span>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 12, color: "var(--teal3)", fontWeight: 600, textDecoration: "none" }}
          >
            📅 Schedule Meeting
          </a>
        </div>

        {/* AI Summary */}
        {!summary && (
          <button
            onClick={fetchSummary}
            disabled={loadingSummary}
            style={{
              marginTop: 10, background: "var(--teal2)", color: "#fff",
              border: "none", borderRadius: 6, padding: "5px 12px",
              fontSize: 12, fontWeight: 600,
            }}
          >
            {loadingSummary ? "Generating…" : "✦ AI Summary"}
          </button>
        )}
        {summary && (
          <div style={{
            marginTop: 10, background: "rgba(58,122,130,0.1)",
            border: "1px solid rgba(58,122,130,0.25)",
            borderRadius: 8, padding: "10px 14px", fontSize: 13, lineHeight: 1.6,
          }}>
            <span style={{ color: "var(--teal2)", fontWeight: 700, fontSize: 11 }}>✦ AI INSIGHT  </span>
            {summary}
          </div>
        )}
      </div>
    </div>
  );
}
