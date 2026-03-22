import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", role: "investor" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key, val) { setForm((p) => ({ ...p, [key]: val })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const role = await register(form);
      onSuccess(role);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800 }}>Create your account</h2>
      {error && (
        <div style={{ background: "#fde8e8", color: "#c0392b", borderRadius: 6, padding: "8px 12px", fontSize: 13 }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-sub)" }}>FULL NAME</label>
        <input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Alexandra Voss" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-sub)" }}>EMAIL</label>
        <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-sub)" }}>PASSWORD</label>
        <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min 8 characters" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-sub)" }}>I AM A…</label>
        <div style={{ display: "flex", gap: 10 }}>
          {["investor", "founder"].map((r) => (
            <button key={r} onClick={() => update("role", r)} style={{
              flex: 1, padding: "10px 0", borderRadius: 8, border: "2px solid",
              borderColor: form.role === r ? "var(--teal2)" : "var(--border)",
              background: form.role === r ? "rgba(58,122,130,0.1)" : "transparent",
              color: form.role === r ? "var(--teal2)" : "var(--text-sub)",
              fontWeight: 700, fontSize: 14, textTransform: "capitalize",
            }}>{r}</button>
          ))}
        </div>
      </div>

      <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating account…" : "Create Account"}
      </button>
      <p style={{ fontSize: 13, color: "var(--text-sub)", textAlign: "center" }}>
        Already have an account?{" "}
        <span style={{ color: "var(--teal2)", cursor: "pointer", fontWeight: 600 }} onClick={onSwitchToLogin}>
          Sign in
        </span>
      </p>
    </div>
  );
}
