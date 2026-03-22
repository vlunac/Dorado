import { useState, useEffect } from "react";
import { startupsApi } from "../api/startups";
import { useAuth } from "../context/AuthContext";

export default function FounderDashboard({ setPage }) {
  const { user } = useAuth();
  const [myStartups, setMyStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all startups then filter by the current founder
    // In production you'd add a GET /startups/mine endpoint
    startupsApi.list()
      .then(({ data }) => setMyStartups(data.filter((s) => String(s.founder_id) === String(user?.id))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 className="page-title">Founder Dashboard 🚀</h1>
        <p className="page-sub">Manage your startups and connect with investors</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "My Startups", value: myStartups.length },
          { label: "Profile Views", value: "—" },
          { label: "Connection Requests", value: "—" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "var(--surface-alt)", borderRadius: 10,
            padding: "16px 20px", flex: 1, minWidth: 110,
          }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--coral)" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* My Startups */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>🏢 My Startups</h2>
          <button className="btn-primary" onClick={() => setPage("profile")} style={{ fontSize: 12, padding: "6px 14px" }}>
            + Add Startup
          </button>
        </div>
        {loading && <p style={{ color: "var(--text-sub)", fontSize: 13 }}>Loading…</p>}
        {!loading && myStartups.length === 0 && (
          <p style={{ color: "var(--text-sub)", fontSize: 13 }}>
            You haven't added a startup yet.{" "}
            <span style={{ color: "var(--teal2)", cursor: "pointer", fontWeight: 600 }} onClick={() => setPage("profile")}>
              Create one now →
            </span>
          </p>
        )}
        {myStartups.map((s) => (
          <div key={s.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 14px", background: "var(--surface-alt)", borderRadius: 8, marginBottom: 8,
          }}>
            <div>
              <div style={{ fontWeight: 700 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-sub)" }}>{s.industry} · {s.stage}</div>
            </div>
            <span style={{ color: "var(--coral)", fontWeight: 700 }}>${s.current_ask?.toLocaleString()} ask</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>⚡ Quick Actions</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn-secondary" onClick={() => setPage("search")}>Browse Investors</button>
          <button className="btn-secondary" onClick={() => setPage("network")}>My Network</button>
          <button className="btn-secondary" onClick={() => setPage("profile")}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
