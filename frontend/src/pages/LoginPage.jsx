// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login }  = useAuth();
  const navigate    = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);

  function validate() {
    const e = {};
    if (!email.trim())    e.email    = "Email is required";
    if (!password.trim()) e.password = "Password is required";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login({ id: 1, name: "Elena Vasquez", role: "investor", avatarInitials: "EV", avatarColor: "#4A5D5E" });
    navigate("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "min(400px, 100%)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, color: "var(--color-moss-dark)", marginBottom: 4 }}>Dorado</h1>
          <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 8 }}>Sign in to your account</p>
        </div>

        <div className="card" style={{ padding: "32px" }}>
          <div className="card-stripe" />
          <div style={{ paddingTop: 8 }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className={`form-input${errors.email ? " error" : ""}`} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className={`form-input${errors.password ? " error" : ""}`} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>
            <button className="btn btn-goldfish btn-full" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8 }}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
            <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-secondary)" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "var(--color-goldfish)", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
