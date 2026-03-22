export default function ConnectionModal({ startup, onClose }) {
  if (!startup) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ width: 440, maxWidth: "90vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Connect with {startup.name}</h2>
        <p style={{ color: "var(--text-sub)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
          Send a connection request to the founder. They'll receive an email notification and can accept or decline.
        </p>
        <textarea
          rows={4}
          placeholder="Introduce yourself and explain why you're interested in this startup…"
          style={{ width: "100%", resize: "vertical", marginBottom: 14 }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" style={{ flex: 1 }}>Send Request</button>
          <button onClick={onClose} style={{
            flex: 1, background: "none", border: "1px solid var(--border)",
            borderRadius: 6, padding: "9px 20px", fontWeight: 600, fontSize: 14,
            color: "var(--text-sub)",
          }}>Cancel</button>
        </div>

        {/* Calendly scheduling option */}
        <div style={{
          marginTop: 16, padding: "12px 14px",
          background: "var(--surface-alt)", borderRadius: 8, textAlign: "center",
        }}>
          <p style={{ fontSize: 12, color: "var(--text-sub)", marginBottom: 8 }}>
            Or schedule a meeting directly via Calendly
          </p>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ display: "inline-block", textDecoration: "none", fontSize: 13 }}
          >
            📅 Open Calendly
          </a>
        </div>
      </div>
    </div>
  );
}
