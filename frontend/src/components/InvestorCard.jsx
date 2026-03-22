// src/components/InvestorCard.jsx
import { MapPin, DollarSign, MessageCircle } from "lucide-react";
import { stageCssClass, formatCurrency } from "../api/mockData";

export default function InvestorCard({ investor, onChat }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div className="card-stripe" />
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: investor.avatarColor + "22", border: `2px solid ${investor.avatarColor}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontFamily: "var(--font-heading)", fontWeight: 700, color: investor.avatarColor, flexShrink: 0 }}>
            {investor.avatarInitials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, color: "var(--color-moss-dark)", marginBottom: 2 }} className="heading">{investor.name}</div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>{investor.headline}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text-secondary)", marginBottom: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={15} strokeWidth={2.5} />{investor.location}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><DollarSign size={15} strokeWidth={2.5} />{formatCurrency(investor.checkSizeMin)}–{formatCurrency(investor.checkSizeMax)}</span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
          {investor.focusAreas.slice(0, 3).map(f => <span key={f} className="tag tag-sage">{f}</span>)}
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
          {investor.preferredStages.map(s => <span key={s} className={`tag ${stageCssClass(s)}`}>{s}</span>)}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-sage-outline" onClick={() => onChat(investor)} style={{ fontSize: 12, padding: "7px 16px" }}>
            <MessageCircle size={14} strokeWidth={2.5} /> Chat
          </button>
        </div>
      </div>
    </div>
  );
}
