import { useState, useEffect } from "react";
import { startupsApi } from "../api/startups";
import { useAuth } from "../context/AuthContext";
import StartupProfileForm from "../components/forms/StartupProfileForm";

export default function FounderProfilePage() {
  const { user } = useAuth();
  const [myStartups, setMyStartups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStartup, setEditingStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  function loadStartups() {
    startupsApi.list()
      .then(({ data }) => setMyStartups(data.filter((s) => String(s.founder_id) === String(user?.id))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadStartups(); }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="page-title">◉ Founder Profile</h1>
          <p className="page-sub">Manage your startups and public profile</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditingStartup(null); setShowForm(true); }}>
          + New Startup
        </button>
      </div>

      {/* Create / Edit form */}
      {showForm && (
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            {editingStartup ? `Edit: ${editingStartup.name}` : "Add a New Startup"}
          </h2>
          <StartupProfileForm
            initialData={editingStartup || {}}
            onSaved={() => { setShowForm(false); setEditingStartup(null); loadStartups(); }}
          />
          <button onClick={() => setShowForm(false)} style={{
            marginTop: 10, background: "none", border: "1px solid var(--border)",
            borderRadius: 6, padding: "7px 14px", fontSize: 13, color: "var(--text-sub)",
          }}>Cancel</button>
        </div>
      )}

      {/* Startup list */}
      {loading && <p style={{ color: "var(--text-sub)", fontSize: 13 }}>Loading…</p>}
      {!loading && myStartups.length === 0 && !showForm && (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
          <p style={{ color: "var(--text-sub)", fontSize: 14 }}>No startups yet. Click "New Startup" to add your first one.</p>
        </div>
      )}
      {myStartups.map((s) => (
        <div key={s.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{s.name}</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="tag">{s.stage}</span>
                <span className="tag">{s.industry}</span>
                {s.tags?.split(",").filter(Boolean).map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <button onClick={() => { setEditingStartup(s); setShowForm(true); }} style={{
              background: "none", border: "1px solid var(--border)", borderRadius: 6,
              padding: "5px 12px", fontSize: 12, color: "var(--text-sub)", flexShrink: 0,
            }}>Edit</button>
          </div>
          <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, marginBottom: 10 }}>{s.description}</p>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 12, color: "var(--text-sub)" }}>
              RAISED <strong style={{ color: "var(--teal2)" }}>${s.total_raised?.toLocaleString()}</strong>
            </span>
            <span style={{ fontSize: 12, color: "var(--text-sub)" }}>
              ASK <strong style={{ color: "var(--coral)" }}>${s.current_ask?.toLocaleString()}</strong>
            </span>
            <span style={{ fontSize: 12, color: "var(--text-sub)" }}>📍 {s.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
