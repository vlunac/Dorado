// src/api/auth.js
import { mockUser } from "./mockData";
export async function login(email, password, role) { await new Promise(r => setTimeout(r, 600)); const user = role === "investor" ? mockUser.investor : mockUser.founder; localStorage.setItem("startmatch-token", "mock-jwt-token"); return user; }
export async function register(data) { await new Promise(r => setTimeout(r, 600)); return { ...data, id: 99 }; }
export async function logout() { localStorage.removeItem("startmatch-token"); }
