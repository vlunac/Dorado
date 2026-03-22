// src/pages/InvestorProfilePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Linkedin, Instagram, Facebook, DollarSign, Edit } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getInvestorById, getInvestorPortfolio } from "../api/investors";
import { formatCurrency, stageCssClass } from "../api/mockData";
import InvestorProfileForm from "../components/forms/InvestorProfileForm";

export default function InvestorProfilePage() {
  const { id }         = useParams();
  const { user, role } = useAuth();
  const navigate        = useNavigate();
  const resolvedId      = id ? Number(id) : user.id;
  const isOwn           = role === "investor" && resolvedId === user.id;

  const [investor,  setInvestor]  = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showEdit,  setShowEdit]  = useState(false);

  useEffect(() => {
    Promise.all([getInvestorById(resolvedId), getInvestorPortfolio(resolvedId)])
      .then(([inv, port]) => { setInvestor(inv); setPortfolio(port); setLoading(false); });
  }, [resolvedId]);

  if (loading) return (
    <div className="page-container">
      <div className="card skeleton" style={{ height: 260, marginBottom: 20 }} />
      <div className="card skeleton" style={{ height: 120, marginBottom: 20 }} />
      <div className="card skeleton" style={{ height: 320 }} />
    </div>
  );

  if (!investor) return (
    <div className="page-container" style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}></div>
      <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>Investor not found.</p>
    </div>
  );

  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      {/* Hero Card */}
      <div className="card fade-up" style={{ marginBottom: 20 }}>
        {/* Goldfish stripe + cover */}
        <div style={{ height: 12, background: "linear-gradient(90deg, var(--color-goldfish), var(--color-sage))" }} />
        <div style={{ height: 90, background: "linear-gradient(135deg, rgba(74,93,94,0.08), rgba(141,178,148,0.12))" }} />

        <div style={{ padding: "0 32px 28px", marginTop: -40 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: investor.avatarColor + "22", border: `3px solid ${investor.avatarColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontFamily: "var(--font-heading)", fontWeight: 700, color: investor.avatarColor, boxShadow: "var(--card-shadow)" }}>
              {investor.avatarInitials}
            </div>
            {isOwn && (
              <button className="btn btn-goldfish" onClick={() => setShowEdit(true)} style={{ fontSize: 12.5 }}>
                <Edit size={14} strokeWidth={2.5} /> Edit Profile
              </button>
            )}
          </div>

          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }} className="heading">{investor.name}</h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>{investor.headline}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-secondary)", marginBottom: 18 }}>
            <MapPin size={13} strokeWidth={2.5} color="var(--color-goldfish)" /> {investor.location}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {investor.socialLinks?.linkedin && (
              <a href={investor.socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }}>
                <Linkedin size={14} strokeWidth={2.5} color="#0077B5" /> LinkedIn
              </a>
            )}
            {investor.socialLinks?.instagram && (
              <a href={investor.socialLinks.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }}>
                <Instagram size={14} strokeWidth={2.5} color="#E4405F" /> Instagram
              </a>
            )}
            {investor.socialLinks?.facebook && (
              <a href={investor.socialLinks.facebook} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }}>
                <Facebook size={14} strokeWidth={2.5} color="#1877F2" /> Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 20 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* About */}
          <div className="card fade-up d1" style={{ overflow: "hidden" }}>
            <div className="card-stripe" />
            <div style={{ padding: "20px 24px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "var(--text-primary)" }}>About</h2>
              <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.75 }}>{investor.bio}</p>
            </div>
          </div>

          {/* Recent Investments — vertical timeline */}
          <div className="card fade-up d2" style={{ overflow: "hidden" }}>
            <div className="card-stripe" style={{ background: "var(--color-goldfish)" }} />
            <div style={{ padding: "20px 24px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Recent Investment Activity</h2>
              <div style={{ position: "relative" }}>
                {/* Timeline line */}
                <div style={{ position: "absolute", left: 15, top: 0, bottom: 0, width: 2, background: "var(--color-sage)", opacity: 0.4, borderRadius: 2 }} />
                {investor.recentInvestments?.map((inv, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, marginBottom: i < investor.recentInvestments.length - 1 ? 20 : 0, position: "relative" }}>
                    {/* Dot */}
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-cream)", border: "2px solid var(--color-goldfish)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-goldfish)", flexShrink: 0, zIndex: 1 }}>
                      {inv.startupName.slice(0,2).toUpperCase()}
                    </div>
                    <div style={{ background: "var(--bg-primary)", border: "1.5px solid var(--border-color)", borderRadius: 12, padding: "12px 16px", flex: 1, transition: "border-color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-goldfish)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13.5, color: "var(--text-primary)" }}>{inv.startupName}</span>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "var(--color-goldfish)" }}>{formatCurrency(inv.amount)}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span className={`tag ${stageCssClass(inv.stage)}`}>{inv.stage}</span>
                        <span style={{ fontSize: 11.5, color: "var(--text-secondary)" }}>{inv.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="card fade-up d3" style={{ overflow: "hidden" }}>
            <div className="card-stripe" />
            <div style={{ padding: "20px 24px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>Portfolio Companies</h2>
              {portfolio.length === 0 ? (
                <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center", padding: "20px 0" }}>No portfolio companies yet.</p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                  {portfolio.map(startup => (
                    <button key={startup.id} onClick={() => navigate(`/founders/${startup.founderId}`)} style={{
                      background: "var(--bg-primary)", border: "2px solid var(--border-color)", borderRadius: 12, padding: "14px 12px",
                      textAlign: "center", cursor: "pointer", transition: "all 0.15s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-goldfish)"; e.currentTarget.style.background = "rgba(230,126,34,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.background = "var(--bg-primary)"; }}
                    >
                      <div style={{ width: 40, height: 40, borderRadius: 10, margin: "0 auto 10px", background: startup.logoColor+"20", border: `1.5px solid ${startup.logoColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "var(--font-heading)", fontWeight: 700, color: startup.logoColor }}>
                        {startup.logoInitials}
                      </div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, marginBottom: 5, color: "var(--text-primary)" }}>{startup.name}</div>
                      <span className="tag tag-sage" style={{ fontSize: 10 }}>{startup.industry}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Investment Details */}
          <div className="card fade-up d1" style={{ overflow: "hidden" }}>
            <div className="card-stripe" style={{ background: "var(--color-goldfish)" }} />
            <div style={{ padding: "18px 20px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>Investment Details</h3>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-heading)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Check Size</div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--color-goldfish)", display: "flex", alignItems: "center", gap: 4 }}>
                  <DollarSign size={16} strokeWidth={2.5} />
                  {formatCurrency(investor.checkSizeMin)} — {formatCurrency(investor.checkSizeMax)}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-heading)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Focus Areas</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {investor.focusAreas.map(f => <span key={f} className="tag tag-sage">{f}</span>)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-heading)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Preferred Stages</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {investor.preferredStages.map(s => <span key={s} className={`tag ${stageCssClass(s)}`}>{s}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card fade-up d2" style={{ overflow: "hidden" }}>
            <div className="card-stripe" />
            <div style={{ padding: "18px 20px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, marginBottom: 14, color: "var(--text-primary)" }}>Stats</h3>
              {[
                { label: "Portfolio Companies", value: investor.portfolioIds?.length ?? 0 },
                { label: "Recent Investments",  value: investor.recentInvestments?.length ?? 0 },
                { label: "Focus Areas",         value: investor.focusAreas?.length ?? 0 },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border-color)" }}>
                  <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--color-moss-dark)" }} className="heading">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <InvestorProfileForm
          investor={investor}
          onClose={() => setShowEdit(false)}
          onSave={updated => { setInvestor(prev => ({ ...prev, ...updated })); setShowEdit(false); }}
        />
      )}
    </div>
  );
}
