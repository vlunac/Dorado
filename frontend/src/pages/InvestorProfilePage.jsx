import { useState, useEffect } from "react";
import { investorsApi } from "../api/investors";
import InvestorProfileForm from "../components/forms/InvestorProfileForm";

export default function InvestorProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    investorsApi.getMe()
      .then(({ data }) => setProfile(data))
      .catch(() => setEditing(true)) // no profile yet — show the form
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "var(--text-sub)" }}>Loading…</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="page-title">◈ Investor Profile</h1>
          <p className="page-sub">Your public portfolio & investment history</p>
        </div>
        {!editing && (
          <button className="btn-secondary" onClick={() => setEditing(true)}>Edit Profile</button>
        )}
      </div>

      {editing ? (
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            {profile ? "Edit Profile" : "Create Your Profile"}
          </h2>
          <InvestorProfileForm
            initialData={profile || {}}
            onSaved={() => {
              setEditing(false);
              investorsApi.getMe().then(({ data }) => setProfile(data));
            }}
          />
        </div>
      ) : (
        <>
          {/* Bio & Links */}
          <div className="card">
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, var(--teal2), var(--coral))",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 900, fontSize: 26,
              }}>I</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text)", marginBottom: 12 }}>
                  {profile?.bio || <span style={{ color: "var(--text-sub)" }}>No bio yet.</span>}
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {profile?.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noreferrer"
                      style={{ background: "var(--teal1)", color: "#fff", borderRadius: 6, padding: "5px 12px", fontSize: 12, textDecoration: "none", fontWeight: 700 }}>
                      LinkedIn
                    </a>
                  )}
                  {profile?.instagram_url && (
                    <a href={profile.instagram_url} target="_blank" rel="noreferrer"
                      style={{ background: "var(--coral)", color: "#fff", borderRadius: 6, padding: "5px 12px", fontSize: 12, textDecoration: "none", fontWeight: 700 }}>
                      Instagram
                    </a>
                  )}
                  {profile?.facebook_url && (
                    <a href={profile.facebook_url} target="_blank" rel="noreferrer"
                      style={{ background: "var(--teal2)", color: "#fff", borderRadius: 6, padding: "5px 12px", fontSize: 12, textDecoration: "none", fontWeight: 700 }}>
                      Facebook
                    </a>
                  )}
                  {profile?.calendly_url && (
                    <a href={profile.calendly_url} target="_blank" rel="noreferrer"
                      style={{ background: "var(--surface-alt)", color: "var(--teal2)", border: "1px solid var(--border)", borderRadius: 6, padding: "5px 12px", fontSize: 12, textDecoration: "none", fontWeight: 700 }}>
                      📅 Calendly
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Thesis */}
          {(profile?.preferred_industries || profile?.preferred_stages) && (
            <div className="card">
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Investment Thesis</h2>
              {profile.preferred_industries && (
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--text-sub)", fontWeight: 600, textTransform: "uppercase" }}>Industries  </span>
                  {profile.preferred_industries.split(",").map((i) => (
                    <span key={i} className="tag" style={{ marginRight: 6 }}>{i.trim()}</span>
                  ))}
                </div>
              )}
              {profile.preferred_stages && (
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-sub)", fontWeight: 600, textTransform: "uppercase" }}>Stages  </span>
                  {profile.preferred_stages.split(",").map((s) => (
                    <span key={s} className="tag" style={{ marginRight: 6 }}>{s.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
