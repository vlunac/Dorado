// src/components/StartupCard.jsx
import { useState } from "react";
import { MapPin, Sparkles } from "lucide-react";
import { stageCssClass } from "../api/mockData";
import { getAiSummary } from "../api/startups";

export default function StartupCard({ startup, onOpen }) {
  const [summary, setSummary] = useState(startup.aiSummary || null);
  const [loading, setLoading] = useState(false);

  
  async function handleSummary(e) {
    e.stopPropagation();
    if (summary) return;
    setLoading(true);
    setSummary(await getAiSummary(startup.id));
    setLoading(false);
  }

  return (
    <div
      className="card"
      style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
      onClick={() => onOpen(startup)}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-hover)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--card-shadow)"; }}
    >
      {/* Top colour stripe */}
      <div className="card-stripe" />

      <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header — avatar + name + tagline */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: startup.logoColor + "20", border: `2px solid ${startup.logoColor}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, fontFamily: "var(--font-heading)", fontWeight: 700, color: startup.logoColor,
          }}>
            {startup.logoInitials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="heading" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "var(--color-moss-dark)", marginBottom: 2 }}>
              {startup.name}
            </div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {startup.tagline}
            </div>
          </div>
        </div>

        {/* Tags — stage, industry, location */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          <span className={`tag ${stageCssClass(startup.stage)}`}>{startup.stage}</span>
          <span className="tag tag-sage">{startup.industry}</span>
          <span className="tag tag-cream">
            <MapPin size={15} style={{ marginRight: 2 }} />{startup.location}
          </span>
        </div>

        {/* AI Summary */}
        {summary ? (
          <div style={{
            background: "rgba(230,126,34,0.07)", border: "1.5px solid rgba(230,126,34,0.25)",
            borderRadius: 12, padding: "10px 12px", marginBottom: 16, flex: 1,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--color-goldfish)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 10.5, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <Sparkles size={12} strokeWidth={2.5} /> AI Summary
            </div>
            <p style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.65, fontStyle: "italic" }}>
              {summary}
            </p>
          </div>
        ) : (
          <button
            onClick={handleSummary}
            disabled={loading}
            className="btn btn-sage-outline"
            style={{ fontSize: 11.5, padding: "5px 14px", marginBottom: 16, alignSelf: "flex-start" }}
          >
            {loading
              ? <span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid var(--color-sage)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              : <Sparkles size={12} strokeWidth={2.5} />}
            {loading ? "Generating…" : "AI Summary"}
          </button>
        )}

        {/* Deep Dive CTA — smaller, centered */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={e => { e.stopPropagation(); onOpen(startup); }}
            className="btn btn-goldfish"
            style={{ fontSize: 12.5, padding: "7px 24px" }}
          >
            Deep Dive
          </button>
        </div>

      </div>
    </div>
  );
}
