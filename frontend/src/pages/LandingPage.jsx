export default function LandingPage({ onLogin, onRegister }) {
  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 24, textAlign: "center",
    }}>
      {/* Logo mark */}
      <div style={{
        width: 64, height: 64, borderRadius: 16, marginBottom: 24,
        background: "linear-gradient(135deg, var(--teal1), var(--coral))",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 900, fontSize: 32,
      }}>S</div>

      <h1 style={{ fontSize: 48, fontWeight: 900, color: "var(--text)", lineHeight: 1.1, maxWidth: 620, marginBottom: 16 }}>
        Where Founders Meet<br />
        <span style={{ color: "var(--coral)" }}>Their Investors</span>
      </h1>

      <p style={{ fontSize: 17, color: "var(--text-sub)", maxWidth: 500, lineHeight: 1.7, marginBottom: 36 }}>
        StartMatch connects visionary founders with the right investors using AI-powered matching,
        built-in scheduling, and smart company summaries.
      </p>

      <div style={{ display: "flex", gap: 14 }}>
        <button className="btn-primary" onClick={onRegister}
          style={{ padding: "12px 32px", fontSize: 15 }}>
          Get Started Free
        </button>
        <button onClick={onLogin} style={{
          background: "none", border: "2px solid var(--border)",
          borderRadius: 6, padding: "12px 32px", fontSize: 15,
          fontWeight: 700, color: "var(--text)", cursor: "pointer",
        }}>
          Sign In
        </button>
      </div>

      {/* Feature highlights */}
      <div style={{ display: "flex", gap: 20, marginTop: 64, flexWrap: "wrap", justifyContent: "center", maxWidth: 800 }}>
        {[
          { icon: "🎯", title: "Smart Matching", desc: "AI pairs investors with startups that fit their thesis" },
          { icon: "✦", title: "AI Summaries", desc: "Instant investor-grade summaries powered by Claude" },
          { icon: "📅", title: "1-Click Scheduling", desc: "Book meetings directly via Calendly integration" },
        ].map((f) => (
          <div key={f.title} className="card" style={{ flex: 1, minWidth: 200, textAlign: "left" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: "var(--text-sub)", lineHeight: 1.55 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
