// src/components/forms/StartupProfileForm.jsx
import { useState } from "react";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { updateStartup } from "../../api/startups";

const INDUSTRIES = ["FinTech","HealthTech","EdTech","SaaS","Marketplace","Other"];
const STAGES     = ["Pre-Seed","Seed","Series A","Series B","Series B+"];

export default function StartupProfileForm({ startup, onClose, onSave }) {
  const [form, setForm] = useState({
    name:        startup?.name        || "",
    tagline:     startup?.tagline     || "",
    description: startup?.description || "",
    industry:    startup?.industry    || "FinTech",
    stage:       startup?.stage       || "Seed",
    location:    startup?.location    || "",
    teamSize:    startup?.teamSize    || 1,
    totalRaised: startup?.totalRaised || 0,
    currentAsk:  startup?.currentAsk  || 0,
    dateFounded: startup?.dateFounded || 2023,
    expenses:    startup?.expenses    || 0,
    calendlyUrl: startup?.calendlyUrl || "",
    members:     startup?.members     || [{ name:"", role:"" }],
  });
  const [loading, setLoading] = useState(false);

  function update(field, val)       { setForm(p => ({ ...p, [field]: val })); }
  function updateMember(idx, f, val){ setForm(p => ({ ...p, members: p.members.map((m,i) => i===idx ? {...m,[f]:val} : m) })); }
  function addMember()              { setForm(p => ({ ...p, members:[...p.members,{name:"",role:""}] })); }
  function removeMember(idx)        { setForm(p => ({ ...p, members: p.members.filter((_,i)=>i!==idx) })); }

  async function handleSave() {
    setLoading(true);
    const result = await updateStartup(startup?.id, form);
    setLoading(false);
    onSave(result);
  }

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:"var(--bg-secondary)", borderRadius:16, width:"min(600px, calc(100vw - 24px))", maxHeight:"90vh", overflow:"hidden", display:"flex", flexDirection:"column", border:"2px solid var(--color-sage)", boxShadow:"var(--shadow-hover)", animation:"fadeUp 0.25s ease" }}>
        <div className="card-stripe" style={{ background:"var(--color-goldfish)" }} />
        <div style={{ padding:"18px 24px", borderBottom:"1px solid var(--border-color)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h2 style={{ fontFamily:"var(--font-heading)", fontSize:17, fontWeight:700, color:"var(--text-primary)" }}>Edit Startup Profile</h2>
          <button onClick={onClose} style={{ color:"var(--text-secondary)", padding:6, borderRadius:8 }}><X size={20} strokeWidth={2.5}/></button>
        </div>
        <div style={{ overflowY:"auto", flex:1, padding:"24px" }}>
          <div className="form-group"><label className="form-label">Startup Name</label><input className="form-input" value={form.name} onChange={e=>update("name",e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Tagline</label><input className="form-input" placeholder="One-line description…" value={form.tagline} onChange={e=>update("tagline",e.target.value)} /></div>
          <div className="form-group"><label className="form-label">Full Description</label><textarea className="form-input" rows={5} value={form.description} onChange={e=>update("description",e.target.value)} style={{ resize:"vertical" }} /></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div className="form-group"><label className="form-label">Industry</label><select className="form-input" value={form.industry} onChange={e=>update("industry",e.target.value)}>{INDUSTRIES.map(i=><option key={i} value={i}>{i}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Stage</label><select className="form-input" value={form.stage} onChange={e=>update("stage",e.target.value)}>{STAGES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e=>update("location",e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Team Size</label><input className="form-input" type="number" min={1} value={form.teamSize} onChange={e=>update("teamSize",Number(e.target.value))} /></div>
            <div className="form-group"><label className="form-label">Total Raised ($)</label><input className="form-input" type="number" value={form.totalRaised} onChange={e=>update("totalRaised",Number(e.target.value))} /></div>
            <div className="form-group"><label className="form-label">Current Ask ($)</label><input className="form-input" type="number" value={form.currentAsk} onChange={e=>update("currentAsk",Number(e.target.value))} /></div>
            <div className="form-group"><label className="form-label">Date Founded</label><input className="form-input" type="number" min={2000} max={2025} value={form.dateFounded} onChange={e=>update("dateFounded",Number(e.target.value))} /></div>
            <div className="form-group"><label className="form-label">Monthly Expenses ($)</label><input className="form-input" type="number" value={form.expenses} onChange={e=>update("expenses",Number(e.target.value))} /></div>
          </div>
          <div className="form-group"><label className="form-label">Calendly URL</label><input className="form-input" placeholder="https://calendly.com/…" value={form.calendlyUrl} onChange={e=>update("calendlyUrl",e.target.value)} /></div>
          <div className="form-group">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <label className="form-label" style={{ margin:0 }}>Team Members</label>
              <button className="btn btn-sage-outline" onClick={addMember} style={{ fontSize:11, padding:"4px 12px" }}>
                <Plus size={12} strokeWidth={2.5}/> Add
              </button>
            </div>
            {form.members.map((m,i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr auto", gap:10, marginBottom:10, alignItems:"center" }}>
                <input className="form-input" placeholder="Name" value={m.name} onChange={e=>updateMember(i,"name",e.target.value)} />
                <input className="form-input" placeholder="Role" value={m.role} onChange={e=>updateMember(i,"role",e.target.value)} />
                <button onClick={()=>removeMember(i)} style={{ color:"#E53E3E", padding:6 }}><Trash2 size={15} strokeWidth={2.5}/></button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding:"16px 24px", borderTop:"1px solid var(--border-color)", display:"flex", gap:10, justifyContent:"flex-end" }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-goldfish" onClick={handleSave} disabled={loading}>
            <Save size={14} strokeWidth={2.5}/> {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
