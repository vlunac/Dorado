import { useState, useEffect } from "react";
import { startupsApi } from "../api/startups";
import { useAuth } from "../context/AuthContext";

export default function NetworkPage({ setPage, setSelectedStartup }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For investors: show all startups they're connected to (simplified: all startups for now)
    // For founders: show investors who viewed their profile
    startupsApi.list()
      .then(({ data }) => setItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="page-title">⬡ Network</h1>
      <p className="page-sub">
        {user?.role === "investor" ? "Startups in your network" : "Investors connected to you"}
      </p>

      {loading && <p style={{ color: "var(--text-sub)", fontSize: 13 }}>Loading…</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((s) => (
          <div
            key={s.id}
            onClick={() => { setSelectedStartup(s); setPage("startup"); }}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "12px 16px", background: "var(--surface)",
              border: "1px solid var(--border)", borderRadius: 10,
              cursor: "pointer", transition: "box-shadow 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div style={{
              width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, var(--teal2), var(--coral))",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 18,
            }}>{s.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "var(--text)" }}>{s.name}</div>
              <div style={{ color: "var(--text-sub)", fontSize: 12 }}>{s.industry} · {s.stage} · {s.location}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--coral)", fontWeight: 700, fontSize: 13 }}>${s.current_ask?.toLocaleString()}</div>
              <div style={{ color: "var(--text-sub)", fontSize: 11 }}>ask</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
