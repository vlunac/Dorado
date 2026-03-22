import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm({ onSuccess, onSwitchToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const role = await login(email, password);
      onSuccess(role);
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Check your credentials.");
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800 }}>Welcome back</h2>
      {error && (
        <div style={{ background: "#fde8e8", color: "#c0392b", borderRadius: 6, padding: "8px 12px", fontSize: 13 }}>
          {error}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-sub)" }}>EMAIL</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-sub)" }}>PASSWORD</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      </div>
      <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing in…" : "Sign In"}
      </button>
      <p style={{ fontSize: 13, color: "var(--text-sub)", textAlign: "center" }}>
        No account?{" "}
        <span style={{ color: "var(--teal2)", cursor: "pointer", fontWeight: 600 }} onClick={onSwitchToRegister}>
          Register here
        </span>
      </p>
    </div>
  );
}
