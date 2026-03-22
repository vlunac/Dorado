import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Search, Network, Briefcase, User, CalendarDays, Sun, Moon } from "lucide-react";
import goldfishLogo from "./PNGgoldfishlogo.png";

const NAV_TOP = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Search",    path: "/search",    icon: Search },
  { label: "Network",   path: "/network",   icon: Network },
];

function GoldfishLogo({ size = 48 }) {
  return (
    <img
      src={goldfishLogo}
      alt="Dorado Logo"
      width={size}
      height={size}
      style={{ animation: "bubbleFloat 1.2s ease-in-out infinite", objectFit: "contain" }}
    />
  );
}

export default function Navbar() {
  const { role, setRole, theme, toggleTheme, user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const isActive  = p => location.pathname === p;

  const bottomNav = role === "investor"
    ? [{ label: "Portfolio",  path: "/portfolio", icon: Briefcase }]
    : [{ label: "Profile",    path: "/profile",   icon: User }];

  return (
    <aside style={{ width: 250, minWidth: 240, background: "var(--bg-sidebar)", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, flexShrink: 0, overflowY: "auto" }}>
      {/* Logo Zone */}
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid rgba(141,178,148,0.25)", display: "flex", alignItems: "center", gap: 12 }}>
        <GoldfishLogo size={60} />
        <div>
          <div style={{ color: "#fff", fontSize: 25, fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2 }}>Dorado</div>
        </div>
      </div>

      {/* Role Toggle */}
      <div style={{ padding: "14px 16px 10px" }}>
        <div style={{ display: "flex", background: "rgba(0,0,0,0.25)", borderRadius: 999, padding: 3, gap: 2 }}>
          {["Investor", "Founder"].map(r => (
            <button key={r} onClick={() => { setRole(r.toLowerCase()); navigate("/dashboard"); }} style={{
              flex: 1, padding: "6px 0", fontSize: 15, fontFamily: "var(--font-heading)", fontWeight: 700,
              borderRadius: 999, transition: "all 0.18s",
              background: role === r.toLowerCase() ? (r === "Investor" ? "var(--color-sage)" : "var(--color-goldfish)") : "transparent",
              color: "#fff", opacity: role === r.toLowerCase() ? 1 : 0.55,
              boxShadow: role === r.toLowerCase() ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
            }}>{r}</button>
          ))}
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "8px 12px" }}>
        <p style={{ fontSize: 13, fontFamily: "var(--font-heading)", fontWeight: 700, color: "rgb(255, 255, 255)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 10px 6px" }}>Main</p>
        {NAV_TOP.map(item => <NavItem key={item.path} item={item} active={isActive(item.path)} onClick={() => navigate(item.path)} />)}

        <p style={{ fontSize: 13, fontFamily: "var(--font-heading)", fontWeight: 700, color: "rgb(255, 255, 255)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px 10px 6px" }}>
          {role === "investor" ? "My Work" : "My Profile"}
        </p>
        {bottomNav.map(item => <NavItem key={item.path} item={item} active={isActive(item.path)} onClick={() => navigate(item.path)} />)}
        <NavItem item={{ label: "Meetings", path: "/meetings", icon: CalendarDays }} active={isActive("/meetings")} onClick={() => navigate("/meetings")} />
      </nav>

      {/* User + Theme */}
      <div style={{ borderTop: "1px solid rgba(141,178,148,0.2)", padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 35, height: 34, borderRadius: "50%", background: user.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontFamily: "var(--font-heading)", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {user.avatarInitials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: "#fff", fontSize: 15, fontFamily: "var(--font-heading)", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, textTransform: "capitalize" }}>{role}</div>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, color: "rgba(255,255,255,0.65)", fontSize: 15, fontFamily: "var(--font-heading)", fontWeight: 600, transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          {theme === "light" ? <Moon size={17} strokeWidth={2.5} /> : <Sun size={17} strokeWidth={2.5} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </aside>
  );
}

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button onClick={onClick} style={{
      width: "100%", display: "flex", alignItems: "center", gap: 10,
      padding: "10px 12px", borderRadius: 999, marginBottom: 3,
      color: active ? "var(--color-goldfish)" : "rgba(255,255,255,0.70)",
      background: active ? "rgba(230,126,34,0.15)" : "transparent",
      borderLeft: active ? "4px solid var(--color-goldfish)" : "4px solid transparent",
      fontSize: 15, fontFamily: "var(--font-heading)", fontWeight: active ? 700 : 600,
      transition: "all 0.15s", textAlign: "left",
    }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.70)"; e.currentTarget.style.background = "transparent"; } }}
    >
      <Icon size={20} strokeWidth={2.5} />
      {item.label}
    </button>
  );
}