// src/pages/PortfolioPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getInvestorPortfolio, getInvestorById } from "../api/investors";
import { formatCurrency, stageCssClass } from "../api/mockData";
import StartupDetailPage from "./StartupDetailPage";
import { Briefcase, TrendingUp, DollarSign } from "lucide-react";

export default function PortfolioPage() {
  const { user }    = useAuth();
  const navigate     = useNavigate();
  const [investor,   setInvestor]  = useState(null);
  const [portfolio,  setPortfolio] = useState([]);
  const [loading,    setLoading]   = useState(true);
  const [selected,   setSelected]  = useState(null);

  useEffect(() => {
    Promise.all([getInvestorById(user.id), getInvestorPortfolio(user.id)])
      .then(([inv, port]) => { setInvestor(inv); setPortfolio(port); setLoading(false); });
  }, [user.id]);

  if (loading) return (
    <div className="page-container">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        {[1,2,3].map(i => <div key={i} className="card skeleton" style={{ height: 140 }} />)}
      </div>
      <div className="card skeleton" style={{ height: 300, marginBottom: 20 }} />
    </div>
  );

  const totalDeployed = investor?.recentInvestments?.reduce((sum, i) => sum + i.amount, 0) || 0;

  return (
    <div className="page-container">
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <h1 className="page-heading">My Portfolio</h1>
        <p style={{ color: "var(--text-secondary)" }}>Your investment activity and portfolio companies.</p>
      </div>

      {/* Stats */}
      <div className="fade-up d1" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Portfolio Companies", value: portfolio.length,         icon: <Briefcase size={20} strokeWidth={2.5}/>,  color: "var(--color-moss-dark)" },
          { label: "Total Deployed",      value: formatCurrency(totalDeployed), icon: <DollarSign size={20} strokeWidth={2.5}/>, color: "var(--color-goldfish)" },
          { label: "Recent Deals",        value: investor?.recentInvestments?.length ?? 0, icon: <TrendingUp size={20} strokeWidth={2.5}/>, color: "var(--color-sage)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ overflow: "hidden" }}>
            <div className="card-stripe" style={{ background: s.color }} />
            <div style={{ padding: "14px 20px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 11, color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</span>
                <div style={{ color: s.color }}>{s.icon}</div>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 700, color: "var(--color-moss-dark)" }} className="heading">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card fade-up d2" style={{ overflow: "hidden", marginBottom: 24 }}>
        <div className="card-stripe" style={{ background: "var(--color-goldfish)" }} />
        <div style={{ padding: "20px 24px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>Recent Investment Activity</h2>
          {investor?.recentInvestments?.map((inv, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "14px 0",
              borderBottom: i < investor.recentInvestments.length - 1 ? "1px solid var(--border-color)" : "none",
              transition: "background 0.15s", cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(230,126,34,0.03)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(230,126,34,0.1)", border: "1.5px solid rgba(230,126,34,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-goldfish)" }}>
                {inv.startupName.slice(0,2).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13.5, marginBottom: 2, color: "var(--text-primary)" }}>{inv.startupName}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{inv.date}</div>
              </div>
              <span className={`tag ${stageCssClass(inv.stage)}`}>{inv.stage}</span>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--color-goldfish)" }}>{formatCurrency(inv.amount)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="fade-up d3">
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>Portfolio Companies</h2>
        {portfolio.length === 0 ? (
          <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>

            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "var(--color-moss-dark)", marginBottom: 8 }}>No portfolio companies yet!</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 20 }}>Start investing to build your portfolio.</p>
            <button className="btn btn-goldfish" onClick={() => navigate("/search")}>Browse Startups</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {portfolio.map(startup => (
              <div key={startup.id} className="card" onClick={() => setSelected(startup)} style={{ cursor: "pointer", overflow: "hidden" }}>
                <div className="card-stripe" style={{ background: startup.logoColor }} />
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: startup.logoColor+"20", border: `2px solid ${startup.logoColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "var(--font-heading)", fontWeight: 700, color: startup.logoColor }}>
                      {startup.logoInitials}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, marginBottom: 4, color: "var(--text-primary)" }}>{startup.name}</div>
                      <span className={`tag ${stageCssClass(startup.stage)}`}>{startup.stage}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 10, lineHeight: 1.5 }}>{startup.tagline}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="tag tag-sage">{startup.industry}</span>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Est. {startup.dateFounded}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <button className="btn btn-sage-outline" onClick={() => navigate(`/investors/${user.id}`)}>
          View My Full Investor Profile
        </button>
      </div>

      {selected && <StartupDetailPage startup={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
