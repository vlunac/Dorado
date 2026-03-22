import { useState, useEffect } from "react";
import { startupsApi } from "../api/startups";
import ConnectionModal from "../components/ConnectionModal";

export default function StartupDetailPage({ startup: initialStartup, onBack }) {
  const [startup, setStartup] = useState(initialStartup);
  const [summary, setSummary] = useState(initialStartup?.ai_summary || "");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // If we only have an id, fetch the full record
  useEffect(() => {
    if (startup?.id && !startup.description) {
      startupsApi.getById(startup.id).then(({ data }) => setStartup(data));
    }
  }, []);

  async function fetchSummary() {
    setLoadingSummary(true);
    try {
      const { data } = await startupsApi.getSummary(startup.id);
      setSummary(data.summary);
    } catch {
      setSummary("Could not generate summary.");
    }
    setLoadingSummary(false);
  }

  if (!startup) return <p style={{ color: "var(--text-sub)" }}>No startup selected.</p>;

  const tags = startup.tags ? startup.tags.split(",").filter(Boolean) : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {showModal && <ConnectionModal startup={startup} onClose={() => setShowModal(false)} />}

      <button onClick={onBack} style={{
        background: "none", border: "none", color: "var(--teal2)",
        cursor: "pointer", fontSize: 13, fontWeight: 600, textAlign: "left", padding: 0,
      }}>← Back</button>

      {/* Header */}
      <div className="card" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, var(--teal2), var(--coral))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 900, fontSize: 28,
        }}>{startup.name[0]}</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--text)", marginBottom: 8 }}>{startup.name}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
            <span className="tag">{startup.stage}</span>
            <span className="tag">{startup.industry}</span>
            {tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <div style={{ color: "var(--text-sub)", fontSize: 13 }}>
            📍 {startup.location} · 👥 Team of {startup.team_size} · 🗓 Founded {startup.founded_year}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="card">
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>About</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}>{startup.description}</p>

        {/* AI Summary */}
        {!summary && (
          <button onClick={fetchSummary} disabled={loadingSummary} style={{
            marginTop: 14, background: "var(--teal2)", color: "#fff",
            border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600,
          }}>
            {loadingSummary ? "Generating…" : "✦ Generate AI Summary"}
          </button>
        )}
        {summary && (
          <div style={{
            marginTop: 14, background: "rgba(58,122,130,0.1)",
            border: "1px solid rgba(58,122,130,0.25)",
            borderRadius: 8, padding: "12px 16px", fontSize: 13, lineHeight: 1.65,
          }}>
            <div style={{ color: "var(--teal2)", fontWeight: 700, fontSize: 11, marginBottom: 4 }}>✦ AI INVESTOR SUMMARY</div>
            {summary}
          </div>
        )}
      </div>

      {/* Financials */}
      <div style={{ display: "flex", gap: 14 }}>
        <div className="card" style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--text-sub)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Total Raised</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "var(--teal2)", marginTop: 6 }}>
            ${startup.total_raised?.toLocaleString()}
          </div>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--text-sub)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Current Ask</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "var(--coral)", marginTop: 6 }}>
            ${startup.current_ask?.toLocaleString()}
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={() => setShowModal(true)} style={{ flex: 1, padding: "12px 0" }}>
          🤝 Connect with Founder
        </button>
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
          style={{ flex: 1, display: "block", textDecoration: "none", textAlign: "center", padding: "12px 0" }}
        >
          📅 Schedule via Calendly
        </a>
      </div>
    </div>
  );
}
