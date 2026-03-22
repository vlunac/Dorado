// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, Sparkles } from "lucide-react";
import goldfishLogo from "../components/PNGgoldfishlogo.png";

function GoldfishHero() {
  return (
    <img
      src={goldfishLogo}
      alt="Dorado Logo"
      width={120}
      height={120}
      style={{ animation: "bubbleFloat 1.4s ease-in-out infinite", filter: "drop-shadow(0 8px 24px rgba(230,126,34,0.3))", objectFit: "contain" }}
    />
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <header style={{ padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)", borderBottom: "2px solid var(--color-sage)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={goldfishLogo} alt="Dorado Logo" width={36} height={36} style={{ animation: "bubbleFloat 1.2s ease-in-out infinite", objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: "var(--color-moss-dark)" }}>Dorado</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-moss-outline" onClick={() => navigate("/login")}>Sign In</button>
          <button className="btn btn-goldfish" onClick={() => navigate("/register")}>Create Account</button>
        </div>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
        <GoldfishHero />
        <div style={{ marginTop: 32, marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 999, background: "rgba(230,126,34,0.1)", border: "1.5px solid rgba(230,126,34,0.3)", fontSize: 12.5, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-goldfish)" }}>
          <Sparkles size={13} strokeWidth={2.5} /> Connecting Founders & Investors with AI
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 52, fontWeight: 700, color: "var(--color-moss-dark)", maxWidth: 680, lineHeight: 1.15, marginBottom: 24, marginTop: 16 }}>
          Find your perfect<br /><span style={{ color: "var(--color-goldfish)" }}>funding match.</span>
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 500, lineHeight: 1.75, marginBottom: 40 }}>
          Dorado connects startup founders with the right investors using AI-powered matching, smart filters, and built-in scheduling.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn btn-goldfish" onClick={() => navigate("/register")} style={{ fontSize: 15, padding: "13px 30px" }}>
            Get Started Free
          </button>
          <button className="btn btn-moss-outline" onClick={() => navigate("/login")} style={{ fontSize: 15, padding: "13px 30px" }}>
            Sign In
          </button>
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 14, marginTop: 56, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: <TrendingUp size={15} strokeWidth={2.5}/>, label: "AI Match Scoring" },
            { icon: <Users size={15} strokeWidth={2.5}/>, label: "Founder & Investor Profiles" },
            { icon: <Sparkles size={15} strokeWidth={2.5}/>, label: "Gemini AI Summaries" },
          ].map(f => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "var(--bg-secondary)", border: "2px solid var(--color-sage)", borderRadius: 999, fontSize: 13, fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--color-moss-dark)", boxShadow: "var(--card-shadow)" }}>
              <span style={{ color: "var(--color-goldfish)" }}>{f.icon}</span> {f.label}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
