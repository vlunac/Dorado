import { useState } from "react";
import { startupsApi } from "../../api/startups";

const INDUSTRIES = ["HealthTech","Logistics","EdTech","CleanTech","LegalTech","AgriTech","FinTech","SaaS","Other"];
const STAGES = ["Pre-Seed","Seed","Series A","Series B","Series C+"];

export default function StartupProfileForm({ initialData = {}, onSaved }) {
  const [form, setForm] = useState({
    name: "", description: "", industry: "HealthTech", stage: "Pre-Seed",
    location: "", team_size: 1, total_raised: 0, current_ask: 0,
    founded_year: 2024, tags: "",
    ...initialData,
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update(key, val) { setForm((p) => ({ ...p, [key]: val })); }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      if (initialData.id) {
        await startupsApi.update(initialData.id, form);
      } else {
        await startupsApi.create(form);
      }
      setSuccess(true);
      onSaved?.();
    } catch (e) {
      setError(e.response?.data?.detail || "Failed to save startup.");
    }
    setSaving(false);
  }

  const labelStyle = { fontSize: 11, fontWeight: 600, color: "var(--text-sub)", textTransform: "uppercase", letterSpacing: "0.06em" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {error && (
        <div style={{ background: "#fde8e8", color: "#c0392b", borderRadius: 6, padding: "8px 12px", fontSize: 13 }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={labelStyle}>Startup Name</label>
        <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. NutriLoop" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={labelStyle}>Description</label>
        <textarea rows={4} value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Describe your startup, what problem you solve, and your traction…"
          style={{ resize: "vertical" }} />
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 140 }}>
          <label style={labelStyle}>Industry</label>
          <select value={form.industry} onChange={(e) => update("industry", e.target.value)}>
            {INDUSTRIES.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 120 }}>
          <label style={labelStyle}>Stage</label>
          <select value={form.stage} onChange={(e) => update("stage", e.target.value)}>
            {STAGES.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 2, minWidth: 160 }}>
          <label style={labelStyle}>Location</label>
          <input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Austin, TX" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 100 }}>
          <label style={labelStyle}>Team Size</label>
          <input type="number" min={1} value={form.team_size} onChange={(e) => update("team_size", +e.target.value)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 100 }}>
          <label style={labelStyle}>Founded Year</label>
          <input type="number" min={2000} max={2030} value={form.founded_year} onChange={(e) => update("founded_year", +e.target.value)} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 140 }}>
          <label style={labelStyle}>Total Raised ($)</label>
          <input type="number" min={0} value={form.total_raised} onChange={(e) => update("total_raised", +e.target.value)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 140 }}>
          <label style={labelStyle}>Current Ask ($)</label>
          <input type="number" min={0} value={form.current_ask} onChange={(e) => update("current_ask", +e.target.value)} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={labelStyle}>Tags (comma-separated)</label>
        <input value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="AI,B2B,SaaS" />
      </div>

      {success && <div style={{ color: "var(--teal2)", fontSize: 13, fontWeight: 600 }}>✓ Startup saved!</div>}
      <button className="btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : initialData.id ? "Update Startup" : "Create Startup"}
      </button>
    </div>
  );
}
