// src/pages/FounderProfilePage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Linkedin, Instagram, Facebook, CalendarDays } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getStartupById } from "../api/startups";
import { formatCurrency, stageCssClass, MOCK_FOUNDERS } from "../api/mockData";
import ConnectionModal from "../components/ConnectionModal";
import StartupDetailPage from "./StartupDetailPage";
import StartupProfileForm from "../components/forms/StartupProfileForm";

export default function FounderProfilePage() {
  const { id }         = useParams();
  const { user, role } = useAuth();
  const founderId       = id ? Number(id) : (role === "founder" ? user.id : 1);
  const founder         = MOCK_FOUNDERS[founderId] || MOCK_FOUNDERS[1];
  const isOwn           = role === "founder" && founderId === user.id;

  const [startups,        setStartups]        = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showConnect,     setShowConnect]      = useState(false);
  const [showEdit,        setShowEdit]         = useState(false);

  useEffect(() => {
    Promise.all(founder.startupIds.map(sid => getStartupById(sid)))
      .then(results => setStartups(results.filter(Boolean)));
  }, [founderId]);

  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      {/* Hero Card */}
      <div className="card fade-up" style={{ marginBottom: 20 }}>
        <div style={{ height: 12, background: "linear-gradient(90deg, var(--color-goldfish), var(--color-sage))" }} />
        <div style={{ height: 90, background: "linear-gradient(135deg, rgba(230,126,34,0.07), rgba(141,178,148,0.10))" }} />

        <div style={{ padding: "0 32px 28px", marginTop: -40 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: founder.avatarColor + "22", border: `3px solid ${founder.avatarColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontFamily: "var(--font-heading)", fontWeight: 700, color: founder.avatarColor, boxShadow: "var(--card-shadow)" }}>
              {founder.avatarInitials}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {isOwn && (
                <button className="btn btn-ghost" onClick={() => setShowEdit(true)} style={{ fontSize: 12.5 }}>
                  Edit Startup
                </button>
              )}
              {!isOwn && (
                <button className="btn btn-goldfish" onClick={() => setShowConnect(true)} style={{ fontSize: 12.5 }}>
                  Connect with Me
                </button>
              )}
              <a href={founder.calendlyUrl} target="_blank" rel="noreferrer" className="btn btn-sage-outline" style={{ fontSize: 12.5, textDecoration: "none" }}>
                <CalendarDays size={14} strokeWidth={2.5} /> Schedule a Call
              </a>
            </div>
          </div>

          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }} className="heading">{founder.name}</h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>{founder.title}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-secondary)", marginBottom: 18 }}>
            <MapPin size={13} strokeWidth={2.5} color="var(--color-goldfish)" /> {founder.location}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {founder.socialLinks?.linkedin && (
              <a href={founder.socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }}>
                <Linkedin size={14} strokeWidth={2.5} color="#0077B5" /> LinkedIn
              </a>
            )}
            {founder.socialLinks?.instagram && (
              <a href={founder.socialLinks.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }}>
                <Instagram size={14} strokeWidth={2.5} color="#E4405F" /> Instagram
              </a>
            )}
            {founder.socialLinks?.facebook && (
              <a href={founder.socialLinks.facebook} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }}>
                <Facebook size={14} strokeWidth={2.5} color="#1877F2" /> Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card fade-up d1" style={{ overflow: "hidden", marginBottom: 20 }}>
        <div className="card-stripe" />
        <div style={{ padding: "20px 24px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "var(--text-primary)" }}>About</h2>
          <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.75 }}>{founder.bio}</p>
        </div>
      </div>

      {/* Companies Founded */}
      <div className="card fade-up d2" style={{ overflow: "hidden" }}>
        <div className="card-stripe" style={{ background: "var(--color-goldfish)" }} />
        <div style={{ padding: "20px 24px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>Companies Founded</h2>
          {startups.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center", padding: "20px 0" }}>No companies yet.</p>
          ) : (
            startups.map((startup, i) => (
              <div key={startup.id} style={{
                display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
                padding: "16px", borderRadius: 12, marginBottom: i < startups.length - 1 ? 12 : 0,
                border: "2px solid var(--border-color)", transition: "all 0.15s", background: "var(--bg-secondary)",
              }}
                onClick={() => setSelectedStartup(startup)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-goldfish)"; e.currentTarget.style.boxShadow = "var(--shadow-hover)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: startup.logoColor + "20", border: `2px solid ${startup.logoColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontFamily: "var(--font-heading)", fontWeight: 700, color: startup.logoColor, flexShrink: 0 }}>
                  {startup.logoInitials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, marginBottom: 4, color: "var(--text-primary)" }}>{startup.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 6 }}>{startup.tagline}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span className={`tag ${stageCssClass(startup.stage)}`}>{startup.stage}</span>
                    <span className="tag tag-sage">{startup.industry}</span>
                    <span className="tag tag-cream">Est. {startup.dateFounded}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>Seeking</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--color-goldfish)" }}>{formatCurrency(startup.currentAsk)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedStartup && <StartupDetailPage startup={selectedStartup} onClose={() => setSelectedStartup(null)} />}
      {showConnect && <ConnectionModal target={{ name: founder.name, avatarInitials: founder.avatarInitials, avatarColor: founder.avatarColor, headline: founder.title }} onClose={() => setShowConnect(false)} />}
      {showEdit && startups[0] && <StartupProfileForm startup={startups[0]} onClose={() => setShowEdit(false)} onSave={() => setShowEdit(false)} />}
    </div>
  );
}
