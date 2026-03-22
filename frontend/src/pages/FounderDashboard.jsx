// src/pages/FounderDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Users, CalendarDays, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import InvestorCard from "../components/InvestorCard";
import ConnectionModal from "../components/ConnectionModal";
import { getAllInvestors } from "../api/investors";
import { mockMeetings } from "../api/mockData";

export default function FounderDashboard() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [investors, setInvestors] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [chatTarget, setChatTarget] = useState(null);
  useEffect(() => { getAllInvestors().then(r => { setInvestors(r); setLoading(false); }); }, []);

  // const metrics = [
  //   { label: "Investor Matches", value: investors.length||"—", icon: <Users size={20} strokeWidth={2.5}/> },
  //   { label: "Profile Views",    value: "142",                  icon: <Eye size={20} strokeWidth={2.5}/> },
  //   { label: "Meetings Booked",  value: "4",                    icon: <CalendarDays size={20} strokeWidth={2.5}/> },
  //   { label: "Capital Target",   value: "$8M",                  icon: <TrendingUp size={20} strokeWidth={2.5}/> },
  // ];

  return (
    <div className="page-container">
      <div className="fade-up" style={{ marginBottom: 19 }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 45, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>Welcome back, <strong style={{ color: "var(--color-goldfish)" }}>{user.name.split(" ")[0]}</strong>!</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 18 }}><strong style={{ color: "var(--color-goldfish)" }}>{investors.length} investors</strong> match your startup profile.</p>
      </div>
      {/* <div className="fade-up d1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
        {metrics.map(m => (
          <div key={m.label} className="card" style={{ overflow: "hidden" }}>
            <div className="card-stripe" />
            <div style={{ padding: "14px 20px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 11, color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{m.label}</span>
                <div style={{ color: "var(--color-goldfish)" }}>{m.icon}</div>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 700, color: "var(--color-moss-dark)" }} className="heading">{m.value}</div>
            </div>
          </div>
        ))}
      </div> */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        <div className="fade-up d2">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 25, fontWeight: 700, color: "var(--text-primary)" }}>Recommended Investors</h2>
            <button onClick={() => navigate("/search")} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 15, color: "var(--color-goldfish)", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Browse All <ArrowRight size={14} strokeWidth={2.5}/></button>
          </div>
          {loading ? <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{[1,2,3,4].map(i=><div key={i} className="card skeleton" style={{height:180}}/>)}</div>
            : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{investors.slice(0,4).map(inv=><InvestorCard key={inv.id} investor={inv} onChat={setChatTarget}/>)}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card fade-up d3" style={{ overflow: "hidden" }}>
            <div className="card-stripe" />
            <div style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>Upcoming Meetings</h3>
                <CalendarDays size={16} strokeWidth={2.5} color="var(--color-goldfish)"/>
              </div>
              {mockMeetings.slice(0,2).map((m,i) => (
                <div key={m.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: i===0?"1px solid var(--border-color)":"none" }}>
                  <div style={{ background: "var(--color-goldfish)", color: "#fff", borderRadius: 10, padding: "6px 10px", fontSize: 11, fontFamily: "var(--font-heading)", fontWeight: 700, flexShrink: 0 }}>{m.date.split(",")[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.counterpartName}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}><Clock size={10} strokeWidth={2.5}/> {m.time}</div>
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
                <button className="btn btn-sage-outline" onClick={() => navigate("/profile")} style={{ justifyContent: "center", fontSize: 12.5 }}>Edit Profile</button>
                <button className="btn btn-sage-outline" onClick={() => navigate("/search")} style={{ justifyContent: "center", fontSize: 12.5 }}>Browse Investors</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {chatTarget && <ConnectionModal target={chatTarget} onClose={() => setChatTarget(null)} />}
    </div>
  );
}
