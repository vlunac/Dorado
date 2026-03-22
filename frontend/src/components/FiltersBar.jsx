import { useState } from "react";

const INDUSTRIES = ["", "HealthTech", "Logistics", "EdTech", "CleanTech", "LegalTech", "AgriTech", "FinTech", "SaaS", "Other"];
const STAGES = ["", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+"];

export default function FiltersBar({ onSearch }) {
  const [filters, setFilters] = useState({
    industry: "", stage: "", location: "",
    team_size_min: "", team_size_max: "",
    current_ask_max: "", founded_year: "",
  });

  function update(key, val) {
    setFilters((prev) => ({ ...prev, [key]: val }));
  }

  function handleSearch() {
    // Strip empty strings before sending to API
    const clean = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ""));
    onSearch(clean);
  }

  const labelStyle = { fontSize: 11, color: "var(--text-sub)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 };
  const fieldStyle = { width: "100%" };

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Filters</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {/* Industry */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 140 }}>
          <label style={labelStyle}>Industry</label>
          <select style={fieldStyle} value={filters.industry} onChange={(e) => update("industry", e.target.value)}>
            {INDUSTRIES.map((o) => <option key={o} value={o}>{o || "Any"}</option>)}
          </select>
        </div>

        {/* Stage */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 130 }}>
          <label style={labelStyle}>Stage</label>
          <select style={fieldStyle} value={filters.stage} onChange={(e) => update("stage", e.target.value)}>
            {STAGES.map((o) => <option key={o} value={o}>{o || "Any"}</option>)}
          </select>
        </div>

        {/* Location */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 140 }}>
          <label style={labelStyle}>Location</label>
          <input placeholder="e.g. Austin, TX" style={fieldStyle} value={filters.location}
            onChange={(e) => update("location", e.target.value)} />
        </div>

        {/* Team size */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 110 }}>
          <label style={labelStyle}>Team Size (min)</label>
          <input type="number" placeholder="1" style={fieldStyle} value={filters.team_size_min}
            onChange={(e) => update("team_size_min", e.target.value)} />
        </div>

        {/* Current Ask */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 130 }}>
          <label style={labelStyle}>Max Ask ($)</label>
          <input type="number" placeholder="5000000" style={fieldStyle} value={filters.current_ask_max}
            onChange={(e) => update("current_ask_max", e.target.value)} />
        </div>

        {/* Founded year */}
        <div style={{ display: "flex", flexDirection: "column", minWidth: 110 }}>
          <label style={labelStyle}>Founded Year</label>
          <input type="number" placeholder="2023" style={fieldStyle} value={filters.founded_year}
            onChange={(e) => update("founded_year", e.target.value)} />
        </div>
      </div>

      <button className="btn-primary" style={{ marginTop: 16 }} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
