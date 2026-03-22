// src/pages/SearchPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FiltersBar from "../components/FiltersBar";
import StartupCard from "../components/StartupCard";
import InvestorCard from "../components/InvestorCard";
import StartupDetailPage from "./StartupDetailPage";
import ConnectionModal from "../components/ConnectionModal";
import { getStartups } from "../api/startups";
import { getAllInvestors } from "../api/investors";

export default function SearchPage() {
  const { role } = useAuth();
  const isInvestor = role === "investor";
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [chatTarget, setChatTarget] = useState(null);

  useEffect(() => { doSearch({}); }, [role]);

  async function doSearch(f) {
    setLoading(true);
    setResults(isInvestor ? await getStartups(f) : await getAllInvestors());
    setLoading(false);
  }

  return (
    <div className="page-container">
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <h1 className="page-heading">{isInvestor ? "Discover Startups" : "Browse Investors"}</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{isInvestor ? "Filter and explore startups. Click any card to Deep Dive." : "Find investors that match your startup profile."}</p>
      </div>
      {isInvestor && <div className="fade-up d1"><FiltersBar onApply={doSearch} /></div>}
      <p style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 16 }}>{loading ? "Searching…" : `${results.length} ${isInvestor ? "startups" : "investors"} found`}</p>
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {[1,2,3,4,5,6].map(i => <div key={i} className="card skeleton" style={{ height: 280 }} />)}
        </div>
      ) : results.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--color-moss-dark)", marginBottom: 8 }}>No startups match your filters.</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>Try adjusting them.</p>
        </div>
      ) : isInvestor ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {results.map((s,i) => <div key={s.id} style={{ animation:`fadeUp 0.3s ${i*0.04}s both ease` }}><StartupCard startup={s} onOpen={setSelected} /></div>)}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {results.map((inv,i) => <div key={inv.id} style={{ animation:`fadeUp 0.3s ${i*0.04}s both ease` }}><InvestorCard investor={inv} onChat={setChatTarget} /></div>)}
        </div>
      )}
      {selected    && <StartupDetailPage startup={selected} onClose={() => setSelected(null)} />}
      {chatTarget  && <ConnectionModal target={chatTarget} onClose={() => setChatTarget(null)} />}
    </div>
  );
}
