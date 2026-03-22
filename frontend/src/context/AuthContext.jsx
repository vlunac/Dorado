// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { mockUser } from "../api/mockData";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(mockUser.investor);
  const [role,  setRoleState] = useState("investor");
  const [theme, setThemeState] = useState("light");
  const isAuthenticated = true;
  useEffect(() => { const saved = localStorage.getItem("startmatch-theme") || "light"; applyTheme(saved); }, []);
  function applyTheme(t) { document.documentElement.setAttribute("data-theme", t); setThemeState(t); localStorage.setItem("startmatch-theme", t); }
  function toggleTheme() { applyTheme(theme === "light" ? "dark" : "light"); }
  function setRole(r) { setRoleState(r); setUser(r === "investor" ? mockUser.investor : mockUser.founder); }
  function login(u) { setUser(u); setRoleState(u.role); }
  function logout() { localStorage.removeItem("startmatch-token"); setUser(mockUser.investor); setRoleState("investor"); }
  return <AuthContext.Provider value={{ user, role, theme, isAuthenticated, login, logout, setRole, toggleTheme }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error("useAuth must be inside AuthProvider"); return ctx; }
