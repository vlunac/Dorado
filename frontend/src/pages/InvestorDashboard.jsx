// src/pages/InvestorDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileText, CalendarCheck, CalendarDays, ArrowRight, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import StartupCard from "../components/StartupCard";
import StartupDetailPage from "./StartupDetailPage";
import { getRecommended } from "../api/matches";
import { mockMeetings } from "../api/mockData";

export default function InvestorDashboard() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [matches,  setMatches]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { getRecommended("investor", user.id).then(r => { setMatches(r); setLoading(false); }); }, [user.id]);

  // const metrics = [
  //   { label: "Meetings This Week",  value: "3",  icon: <CalendarDays size={20} strokeWidth={2.5}/> },
  //   { label: "Deals Reviewed",      value: "28", icon: <FileText size={20} strokeWidth={2.5}/> },
  //   { label: "Meetings Booked",     value: "9",  icon: <CalendarCheck size={20} strokeWidth={2.5}/> },
  //   { label: "Portfolio Companies", value: "24", icon: <Briefcase size={20} strokeWidth={2.5}/> },
  // ];

  return (
    <div className="page-container">
      <div className="fade-up" style={{ marginBottom: 19 }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 45, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
          Good morning, <strong style={{ color: "var(--color-goldfish)" }}>{user.name.split(" ")[0]}</strong>!
        </h1>
        <p style={{fontFamily: "var(--text-secondary)", color: "var(--text-secondary)", fontSize: 18 }}>
          You have <strong style={{ color: "var(--color-goldfish)" }}>{matches.length} startup matches</strong> waiting for your review.
        </p>
      </div>

      {/* Metric Cards */}
      {/* <div className="fade-up d1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
        {metrics.map(m => (
          <div key={m.label} className="card" style={{ padding: "20px 22px" }}>
            <div className="card-stripe" />
            <div style={{ padding: "14px 0 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 14, color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{m.label}</span>
                <div style={{ color: "var(--color-goldfish)" }}>{m.icon}</div>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 35, fontWeight: 700, color: "var(--color-moss-dark)", textAlign: 'center' }} className="heading">{m.value}</div>
            </div>
          </div>
        ))}
      </div> */}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Matches */}
        <div className="fade-up d2">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 25, fontWeight: 700, color: "var(--text-primary)" }}>Recommended for You</h2>
            <button onClick={() => navigate("/search")} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 15, color: "var(--color-goldfish)", fontFamily: "var(--font-heading)", fontWeight: 700 }}>View All <ArrowRight size={14} strokeWidth={2.5}/></button>
          </div>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[1,2,3].map(i => <div key={i} className="card skeleton" style={{ height: 200 }}/>)}
            </div>
          ) : matches.length === 0 ? (
            <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, color: "var(--color-moss-dark)", marginBottom: 8 }}>No startups caught yet!</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: 20, fontSize: 13 }}>Cast your line — search for startups that match your thesis.</p>
              <button className="btn btn-goldfish" onClick={() => navigate("/search")}>Browse Startups</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {matches.slice(0,4).map(s => <StartupCard key={s.id} startup={s} onOpen={setSelected} />)}
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card fade-up d3" style={{ overflow: "hidden" }}>
            <div className="card-stripe" />
            <div style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--text-primary)" }}>Upcoming Meetings</h3>
                <CalendarDays size={16} strokeWidth={2.5} color="var(--color-goldfish)"/>
              </div>
              {mockMeetings.map((m,i) => (
                <div key={m.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: i<mockMeetings.length-1 ? "1px solid var(--border-color)":"none" }}>
                  <div style={{ background: "var(--color-goldfish)", color: "#fff", borderRadius: 10, padding: "6px 10px", textAlign: "center", fontSize: 15, fontFamily: "var(--font-heading)", fontWeight: 700, lineHeight: 1.3, flexShrink: 0 }}>{m.date.split(",")[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.counterpartName}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}><Clock size={15} strokeWidth={2.5}/> {m.time} · {m.type}</div>
                  </div>
                  <button className="btn btn-sage-outline" style={{ fontSize: 11, padding: "4px 12px" }}>Join</button>
                </div>
              ))}
              <a href={import.meta.env.VITE_CALENDLY_URL || "https://calendly.com"} target="_blank" rel="noreferrer" className="btn btn-goldfish" style={{ width: "100%", justifyContent: "center", marginTop: 14, textDecoration: "none", fontSize: 13 }}>
                <CalendarDays size={14} strokeWidth={2.5}/> Schedule a Meeting
              </a>
            </div>
          </div>

          <div className="card fade-up d4" style={{ overflow: "hidden" }}>
            <div className="card-stripe" />
            <div style={{ padding: "18px 20px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, marginBottom: 14, color: "var(--text-primary)" }}>Quick Actions</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button className="btn btn-sage-outline" onClick={() => navigate("/search")} style={{ justifyContent: "center", fontSize: 12.5 }}>Browse Startups</button>
                <button className="btn btn-sage-outline" onClick={() => navigate("/portfolio")} style={{ justifyContent: "center", fontSize: 12.5 }}>View Portfolio</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selected && <StartupDetailPage startup={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
