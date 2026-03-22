// src/components/forms/InvestorProfileForm.jsx
import { useState } from "react";
import { X, Save } from "lucide-react";
import { updateInvestor } from "../../api/investors";

const FOCUS_OPTIONS = ["FinTech","HealthTech","EdTech","SaaS","Marketplace","CleanTech","ClimateTech","AI","BioTech","DeepTech","B2B SaaS","Infrastructure","Developer Tools","Social Impact","Hardware"];

export default function InvestorProfileForm({ investor, onClose, onSave }) {
  const [form, setForm] = useState({
    name:         investor?.name         || "",
    headline:     investor?.headline     || "",
    bio:          investor?.bio          || "",
    location:     investor?.location     || "",
    linkedin:     investor?.socialLinks?.linkedin  || "",
    instagram:    investor?.socialLinks?.instagram || "",
    facebook:     investor?.socialLinks?.facebook  || "",
    checkSizeMin: investor?.checkSizeMin || 0,
    checkSizeMax: investor?.checkSizeMax || 0,
    focusAreas:   investor?.focusAreas   || [],
  });
  const [loading, setLoading] = useState(false);

  function update(field, val) { setForm(p => ({ ...p, [field]: val })); }
  function toggleFocus(area) {
    setForm(p => ({ ...p, focusAreas: p.focusAreas.includes(area) ? p.focusAreas.filter(f=>f!==area) : [...p.focusAreas, area] }));
  }

  async function handleSave() {
    setLoading(true);
    const updated = await updateInvestor(investor?.id, { ...form, socialLinks: { linkedin: form.linkedin, instagram: form.instagram, facebook: form.facebook } });
    setLoading(false);
    onSave(updated);
  }

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background: "var(--bg-secondary)", borderRadius: 16, width: "min(560px, calc(100vw - 24px))", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", border: "2px solid var(--color-sage)", boxShadow: "var(--shadow-hover)", animation: "fadeUp 0.25s ease" }}>
        <div className="card-stripe" />
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>Edit Investor Profile</h2>
          <button onClick={onClose} style={{ color: "var(--text-secondary)", padding: 6, borderRadius: 8 }}><X size={20} strokeWidth={2.5} /></button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "24px" }}>
          <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e=>update("name",e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Headline</label><input className="form-input" placeholder="General Partner at…" value={form.headline} onChange={e=>update("headline",e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Bio</label><textarea className="form-input" rows={4} value={form.bio} onChange={e=>update("bio",e.target.value)} style={{ resize:"vertical" }} /></div>
          <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e=>update("location",e.target.value)} /></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div className="form-group"><label className="form-label">LinkedIn URL</label><input className="form-input" value={form.linkedin} onChange={e=>update("linkedin",e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Instagram URL</label><input className="form-input" value={form.instagram} onChange={e=>update("instagram",e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Facebook URL</label><input className="form-input" value={form.facebook} onChange={e=>update("facebook",e.target.value)} /></div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div className="form-group"><label className="form-label">Check Size Min ($)</label><input className="form-input" type="number" value={form.checkSizeMin} onChange={e=>update("checkSizeMin",Number(e.target.value))} /></div>
            <div className="form-group"><label className="form-label">Check Size Max ($)</label><input className="form-input" type="number" value={form.checkSizeMax} onChange={e=>update("checkSizeMax",Number(e.target.value))} /></div>
          </div>
          <div className="form-group">
            <label className="form-label">Focus Areas</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:6 }}>
              {FOCUS_OPTIONS.map(area => (
                <button key={area} onClick={() => toggleFocus(area)} style={{
                  padding:"5px 14px", borderRadius:999, fontSize:12, fontFamily:"var(--font-heading)", fontWeight:600,
                  background: form.focusAreas.includes(area) ? "var(--color-moss-dark)" : "var(--bg-primary)",
                  color: form.focusAreas.includes(area) ? "#fff" : "var(--text-secondary)",
                  border: `1.5px solid ${form.focusAreas.includes(area) ? "var(--color-moss-dark)" : "var(--border-color)"}`,
                  transition:"all 0.15s",
                }}>{area}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding:"16px 24px", borderTop:"1px solid var(--border-color)", display:"flex", gap:10, justifyContent:"flex-end" }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-goldfish" onClick={handleSave} disabled={loading}>
            <Save size={14} strokeWidth={2.5} /> {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
