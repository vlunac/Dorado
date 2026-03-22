// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { login, setRole } = useAuth();
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ name: "", email: "", password: "", role: "investor" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  function update(field, val) { setForm(p => ({ ...p, [field]: val })); }

  function validate() {
    const e = {};
    if (!form.name.trim())     e.name     = "Name is required";
    if (!form.email.trim())    e.email    = "Email is required";
    if (!form.password.trim()) e.password = "Password is required";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setRole(form.role);
    login({ id: 99, name: form.name, role: form.role, avatarInitials: form.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(), avatarColor: form.role === "investor" ? "#4A5D5E" : "#E67E22" });
    navigate("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "min(420px, 100%)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, color: "var(--color-moss-dark)", marginBottom: 4 }}>Dorado</h1>
          <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 8 }}>Create your account</p>
        </div>

        <div className="card" style={{ padding: "32px" }}>
          <div className="card-stripe" style={{ marginBottom: 0 }} />
          <div style={{ paddingTop: 8 }}>
            {/* Role Toggle */}
            <div style={{ marginBottom: 20 }}>
              <label className="form-label" style={{ display: "block", marginBottom: 8 }}>I am a…</label>
              <div style={{ display: "flex", background: "var(--bg-primary)", borderRadius: 999, padding: 3, gap: 3, border: "1.5px solid var(--border-color)" }}>
                {["investor", "founder"].map(r => (
                  <button key={r} onClick={() => update("role", r)} style={{
                    flex: 1, padding: "7px 0", fontSize: 13, fontFamily: "var(--font-heading)", fontWeight: 700, borderRadius: 999,
                    background: form.role === r ? (r === "investor" ? "var(--color-sage)" : "var(--color-goldfish)") : "transparent",
                    color: form.role === r ? "#fff" : "var(--text-secondary)",
                    transition: "all 0.18s", textTransform: "capitalize",
                    boxShadow: form.role === r ? "var(--shadow-btn)" : "none",
                  }}>{r}</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className={`form-input${errors.name ? " error" : ""}`} placeholder="Alex Rivera" value={form.name} onChange={e => update("name", e.target.value)} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className={`form-input${errors.email ? " error" : ""}`} type="email" placeholder="you@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className={`form-input${errors.password ? " error" : ""}`} type="password" placeholder="••••••••" value={form.password} onChange={e => update("password", e.target.value)} />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <button className="btn btn-goldfish btn-full" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
            <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-secondary)" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "var(--color-goldfish)", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
