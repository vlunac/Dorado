// src/pages/StartupDetailPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, MapPin, Users, DollarSign, CalendarDays, TrendingUp, ExternalLink } from "lucide-react";
import { formatCurrency, stageCssClass } from "../api/mockData";
import ConnectionModal from "../components/ConnectionModal";

export default function StartupDetailPage({ startup, onClose }) {
  const navigate = useNavigate();
  const [showConnect, setShowConnect] = useState(false);
  if (!startup) return null;
  const fundingPct = Math.min(100, Math.round((startup.totalRaised / startup.fundingGoal) * 100));

  return (
    <>
      <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
        <div style={{ background: "var(--bg-secondary)", width: "min(640px, calc(100vw - 24px))", maxHeight: "92vh", borderRadius: 16, border: "2px solid var(--color-sage)", boxShadow: "var(--shadow-hover)", display: "flex", flexDirection: "column", overflow: "hidden", animation: "slideInRight 0.3s ease-out" }}>
          {/* Stripe */}
          <div className="card-stripe" style={{ background: "var(--color-goldfish)" }} />

          {/* Header */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "flex-start", gap: 14, background: "rgba(230,126,34,0.04)" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: startup.logoColor+"20", border: `2px solid ${startup.logoColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontFamily: "var(--font-heading)", fontWeight: 700, color: startup.logoColor, flexShrink: 0 }}>{startup.logoInitials}</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--color-moss-dark)", letterSpacing: "-0.01em", marginBottom: 4 }} className="heading">{startup.name}</h2>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", fontStyle: "italic", marginBottom: 8 }}>{startup.tagline}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span className={`tag ${stageCssClass(startup.stage)}`}>{startup.stage}</span>
                <span className="tag tag-sage">{startup.industry}</span>
                <span className="tag tag-cream"><MapPin size={10} style={{marginRight:2}}/>{startup.location}</span>
              </div>
            </div>
            <button onClick={onClose} style={{ padding: 6, borderRadius: 8, color: "var(--text-secondary)", flexShrink: 0 }}><X size={20} strokeWidth={2.5} /></button>
          </div>

          {/* Body */}
          <div style={{ overflowY: "auto", flex: 1, padding: "24px" }}>
            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 24 }}>{startup.description}</p>

            {/* Metadata grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: 24, border: "2px solid var(--color-sage)", borderRadius: 14, overflow: "hidden" }}>
              {[
                { label: "Team Size",    value: `${startup.teamSize} people`,          icon: <Users size={13} strokeWidth={2.5}/> },
                { label: "Founded",      value: startup.dateFounded,                    icon: <CalendarDays size={13} strokeWidth={2.5}/> },
                { label: "Total Raised", value: formatCurrency(startup.totalRaised),   icon: <TrendingUp size={13} strokeWidth={2.5}/> },
                { label: "Current Ask",  value: formatCurrency(startup.currentAsk),    icon: <DollarSign size={13} strokeWidth={2.5}/>, highlight: true },
                { label: "Location",     value: startup.location,                       icon: <MapPin size={13} strokeWidth={2.5}/> },
                { label: "Monthly Burn", value: formatCurrency(startup.expenses)+"/mo", icon: <DollarSign size={13} strokeWidth={2.5}/> },
              ].map((item, i) => (
                <div key={item.label} style={{ padding: "14px 16px", borderBottom: i<4 ? "1px solid var(--border-color)" : "none", borderRight: i%2===0 ? "1px solid var(--border-color)" : "none" }}>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>{item.icon} {item.label}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, color: item.highlight ? "var(--color-goldfish)" : "var(--text-primary)" }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Team Members */}
            {startup.members?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>Team</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {startup.members.map(m => (
                    <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--color-cream)", border: "1.5px solid var(--color-sage)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-moss-dark)" }}>{m.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                      <div><span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "var(--text-primary)" }}>{m.name}</span><span style={{ fontSize: 12, color: "var(--text-secondary)", marginLeft: 8 }}>{m.role}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Water-Level Funding Bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Funding Goal</h4>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, color: "var(--color-goldfish)" }}>{fundingPct}% of {formatCurrency(startup.fundingGoal)} raised</span>
              </div>
              <div className="water-bar-track">
                <div className="water-bar-fill" style={{ "--fill-pct": `${fundingPct}%` }} />
              </div>
            </div>

            {/* Founder link */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: 16 }}>
              <button onClick={() => { onClose(); navigate(`/founders/${startup.founderId}`); }} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--color-moss-dark)", fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: startup.logoColor+"22", border: `1.5px solid ${startup.logoColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: startup.logoColor }}>{startup.logoInitials}</div>
                View Founder Profile <ExternalLink size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-color)", display: "flex", gap: 10, background: "var(--bg-secondary)" }}>
            <a href={startup.calendlyUrl} target="_blank" rel="noreferrer" className="btn btn-goldfish" style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}>
              <CalendarDays size={15} strokeWidth={2.5} /> Schedule Meeting
            </a>
            <button className="btn btn-sage-outline" onClick={() => setShowConnect(true)} style={{ flex: 1, justifyContent: "center" }}>Connect</button>
          </div>
        </div>
      </div>
      {showConnect && <ConnectionModal target={startup} onClose={() => setShowConnect(false)} />}
    </>
  );
}
