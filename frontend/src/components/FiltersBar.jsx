// src/components/FiltersBar.jsx
import { useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

const INDUSTRIES = ["FinTech","HealthTech","EdTech","SaaS","Marketplace","Other"];
const STAGES     = ["Pre-Seed","Seed","Series A","Series B+"];
const TEAM_SIZES = [{ label:"1–5",value:[1,5]},{ label:"6–10",value:[6,10]},{ label:"11–20",value:[11,20]},{ label:"20+",value:[20,9999]}];
const YEARS      = Array.from({length:11},(_,i) => 2015+i);

export default function FiltersBar({ onApply }) {
  const [location,    setLocation]    = useState("");
  const [industry,    setIndustry]    = useState("");
  const [stage,       setStage]       = useState("");
  const [teamSize,    setTeamSize]    = useState("");
  const [totalRaised, setTotalRaised] = useState(10);
  const [currentAsk,  setCurrentAsk]  = useState(5);
  const [dateFounded, setDateFounded] = useState("");

  function handleApply() {
    onApply({ location, industry: industry||null, stage: stage||null, teamSize: teamSize ? TEAM_SIZES.find(t=>t.label===teamSize)?.value : null, totalRaised: totalRaised*1_000_000, currentAsk: currentAsk*1_000_000, dateFounded: dateFounded ? Number(dateFounded) : null });
  }
  function handleReset() {
    setLocation(""); setIndustry(""); setStage(""); setTeamSize(""); setTotalRaised(10); setCurrentAsk(5); setDateFounded(""); onApply({});
  }

  const inputStyle = { border: "1.5px solid var(--border-color)", borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", padding: "9px 14px", fontSize: 13, fontFamily: "var(--font-body)", background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none", width: "100%", transition: "border-color 0.15s, box-shadow 0.15s" };

  return (
    <div style={{ background: "var(--bg-secondary)", border: "2px solid var(--color-sage)", borderRadius: 16, padding: "20px", marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <SlidersHorizontal size={16} strokeWidth={2.5} color="var(--color-goldfish)" />
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Filters</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14, marginBottom: 16 }}>
        {[
          { label: "Location",    el: <input style={inputStyle} placeholder="City, State…" value={location} onChange={e=>setLocation(e.target.value)} onFocus={e=>{e.target.style.borderColor="var(--color-goldfish)";e.target.style.boxShadow="var(--input-focus-shadow)"}} onBlur={e=>{e.target.style.borderColor="var(--border-color)";e.target.style.boxShadow="none"}} /> },
          { label: "Industry",    el: <select style={inputStyle} value={industry} onChange={e=>setIndustry(e.target.value)}><option value="">All Industries</option>{INDUSTRIES.map(i=><option key={i} value={i}>{i}</option>)}</select> },
          { label: "Stage",       el: <select style={inputStyle} value={stage} onChange={e=>setStage(e.target.value)}><option value="">All Stages</option>{STAGES.map(s=><option key={s} value={s}>{s}</option>)}</select> },
          { label: "Team Size",   el: <select style={inputStyle} value={teamSize} onChange={e=>setTeamSize(e.target.value)}><option value="">Any Size</option>{TEAM_SIZES.map(t=><option key={t.label} value={t.label}>{t.label}</option>)}</select> },
          { label: "Date Founded",el: <select style={inputStyle} value={dateFounded} onChange={e=>setDateFounded(e.target.value)}><option value="">Any Year</option>{YEARS.map(y=><option key={y} value={y}>{y}</option>)}</select> },
        ].map(({ label, el }) => (
          <div key={label}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{label}</div>
            {el}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {[
          { label: `Total Raised — up to $${totalRaised}M`, val: totalRaised, set: setTotalRaised, max: 10, step: 0.5 },
          { label: `Current Ask — up to $${currentAsk}M`,   val: currentAsk,  set: setCurrentAsk,  max: 5,  step: 0.5 },
        ].map(({ label, val, set, max, step }) => (
          <div key={label}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</div>
            <input type="range" min={0} max={max} step={step} value={val} onChange={e=>set(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--color-goldfish)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-secondary)", marginTop: 3 }}><span>$0</span><span>${max}M</span></div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-goldfish" onClick={handleApply}><SlidersHorizontal size={14} strokeWidth={2.5} />Apply Filters</button>
        <button className="btn btn-sage-outline" onClick={handleReset}><RotateCcw size={14} strokeWidth={2.5} />Reset</button>
      </div>
    </div>
  );
}
