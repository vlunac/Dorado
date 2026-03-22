// src/api/client.js
import axios from "axios";
const client = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api", timeout: 8000, headers: { "Content-Type": "application/json" } });
client.interceptors.request.use(cfg => { const t = localStorage.getItem("startmatch-token"); if (t) cfg.headers.Authorization = `Bearer ${t}`; return cfg; });
client.interceptors.response.use(r => r, err => { if (err.response?.status === 401) { localStorage.removeItem("startmatch-token"); window.location.href = "/login"; } return Promise.reject(err); });
export default client;
