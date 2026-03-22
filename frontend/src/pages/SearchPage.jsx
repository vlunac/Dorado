import { useState, useEffect } from "react";
import { startupsApi } from "../api/startups";
import FiltersBar from "../components/FiltersBar";
import StartupCard from "../components/StartupCard";

export default function SearchPage({ setPage, setSelectedStartup }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all on mount
  useEffect(() => {
    startupsApi.list()
      .then(({ data }) => setResults(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSearch(filters) {
    setLoading(true);
    try {
      const { data } = await startupsApi.list(filters);
      setResults(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className="page-title">🔍 Search Startups</h1>
      <p className="page-sub">Filter by industry, stage, location, and more</p>

      <FiltersBar onSearch={handleSearch} />

      {loading && <p style={{ color: "var(--text-sub)", fontSize: 13 }}>Searching…</p>}

      {!loading && results.length === 0 && (
        <p style={{ color: "var(--text-sub)", fontSize: 13 }}>No startups match your filters.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {results.map((s) => (
          <StartupCard
            key={s.id}
            startup={s}
            onClick={() => { setSelectedStartup(s); setPage("startup"); }}
          />
        ))}
      </div>
    </div>
  );
}
