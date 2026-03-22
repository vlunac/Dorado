import LoginForm from "../components/forms/LoginForm";

export default function LoginPage({ onSuccess, onSwitchToRegister }) {
  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div className="card" style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, margin: "0 auto 12px",
            background: "linear-gradient(135deg, var(--teal1), var(--coral))",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 900, fontSize: 22,
          }}>S</div>
          <span style={{ fontWeight: 900, fontSize: 18, color: "var(--text)" }}>StartMatch</span>
        </div>
        <LoginForm onSuccess={onSuccess} onSwitchToRegister={onSwitchToRegister} />
      </div>
    </div>
  );
}
