export default function InvestorCard({ investor, user }) {
  return (
    <div className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, var(--teal1), var(--coral))",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 800, fontSize: 18,
      }}>
        {user?.full_name?.[0] || "I"}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{user?.full_name}</div>
        <div style={{ color: "var(--text-sub)", fontSize: 12, margin: "2px 0 6px" }}>{user?.email}</div>
        {investor?.bio && (
          <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.55 }}>{investor.bio}</p>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {investor?.linkedin_url && (
            <a href={investor.linkedin_url} target="_blank" rel="noreferrer"
              style={{ background: "var(--teal1)", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, textDecoration: "none", fontWeight: 700 }}>
              LinkedIn
            </a>
          )}
          {investor?.instagram_url && (
            <a href={investor.instagram_url} target="_blank" rel="noreferrer"
              style={{ background: "var(--coral)", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, textDecoration: "none", fontWeight: 700 }}>
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
