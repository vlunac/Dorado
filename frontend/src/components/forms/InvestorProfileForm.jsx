import { useState } from "react";
import { investorsApi } from "../../api/investors";

export default function InvestorProfileForm({ initialData = {}, onSaved }) {
  const [form, setForm] = useState({
    bio: "", linkedin_url: "", instagram_url: "", facebook_url: "",
    calendly_url: "", preferred_industries: "", preferred_stages: "",
    ...initialData,
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  function update(key, val) { setForm((p) => ({ ...p, [key]: val })); }

  async function handleSave() {
    setSaving(true);
    try {
      await investorsApi.updateMe(form);
      setSuccess(true);
      onSaved?.();
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  }

  const field = (label, key, type = "text", placeholder = "") => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-sub)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
      {type === "textarea"
        ? <textarea rows={3} value={form[key]} onChange={(e) => update(key, e.target.value)} placeholder={placeholder} style={{ resize: "vertical" }} />
        : <input type={type} value={form[key]} onChange={(e) => update(key, e.target.value)} placeholder={placeholder} />}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {field("Bio", "bio", "textarea", "Tell founders about your investment thesis…")}
      {field("LinkedIn URL", "linkedin_url", "url", "https://linkedin.com/in/yourprofile")}
      {field("Instagram URL", "instagram_url", "url", "https://instagram.com/yourhandle")}
      {field("Facebook URL", "facebook_url", "url", "https://facebook.com/yourprofile")}
      {field("Calendly URL", "calendly_url", "url", "https://calendly.com/yourname")}
      {field("Preferred Industries", "preferred_industries", "text", "HealthTech,CleanTech (comma-separated)")}
      {field("Preferred Stages", "preferred_stages", "text", "Seed,Series A (comma-separated)")}

      {success && <div style={{ color: "var(--teal2)", fontSize: 13, fontWeight: 600 }}>✓ Profile saved!</div>}
      <button className="btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Save Profile"}
      </button>
    </div>
  );
}
