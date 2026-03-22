import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ currentPage, setPage, dark, setDark }) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "search",    icon: "⌕", label: "Search" },
    { id: "network",   icon: "⬡", label: "Network" },
    user?.role === "investor"
      ? { id: "portfolio", icon: "◈", label: "Portfolio" }
      : { id: "profile",   icon: "◉", label: "Profile" },
  ];

  const s = {
    sidebar: {
      width: collapsed ? 60 : 220,
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      transition: "width 0.2s", overflow: "hidden",
      position: "sticky", top: 0, height: "100vh", flexShrink: 0,
    },
    logo: {
      padding: "20px 16px 16px",
      borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", gap: 10,
    },
    logoMark: {
      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
      background: "linear-gradient(135deg, var(--teal1), var(--coral))",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 900, fontSize: 16,
    },
  };

  return (
    <div style={s.sidebar}>
      {/* Logo */}
      <div style={s.logo}>
        <div style={s.logoMark}>S</div>
        {!collapsed && (
          <span style={{ fontWeight: 900, fontSize: 16, color: "var(--text)", whiteSpace: "nowrap" }}>
            StartMatch
          </span>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && user && (
        <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)" }}>
          <div style={{
            background: "var(--teal1)", color: "#fff",
            borderRadius: 6, padding: "4px 10px",
            fontSize: 11, fontWeight: 700, textTransform: "capitalize", textAlign: "center",
          }}>{user.role}</div>
        </div>
      )}

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "10px 0" }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              width: "100%", padding: collapsed ? "10px 0" : "10px 18px",
              justifyContent: collapsed ? "center" : "flex-start",
              border: "none",
              background: currentPage === item.id ? "rgba(58,122,130,0.15)" : "transparent",
              color: currentPage === item.id ? "var(--teal2)" : "var(--text-sub)",
              fontWeight: currentPage === item.id ? 700 : 500,
              fontSize: 14,
              borderLeft: currentPage === item.id ? "3px solid var(--teal2)" : "3px solid transparent",
              transition: "all 0.12s",
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
            {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom controls */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        {!collapsed && (
          <button
            onClick={() => setDark(!dark)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "var(--surface-alt)", border: "none",
              borderRadius: 6, padding: "7px 10px",
              color: "var(--text-sub)", fontSize: 12, fontWeight: 600,
            }}
          >
            {dark ? "☀ Light Mode" : "☾ Dark Mode"}
          </button>
        )}
        {!collapsed && (
          <button
            onClick={logout}
            style={{
              background: "none", border: "1px solid var(--border)",
              borderRadius: 6, padding: "6px 10px",
              color: "var(--text-sub)", fontSize: 12, fontWeight: 600,
            }}
          >
            Sign Out
          </button>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ background: "none", border: "none", color: "var(--text-sub)", fontSize: 18, textAlign: "center" }}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
    </div>
  );
}
