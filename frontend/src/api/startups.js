// src/api/startups.js
import { mockStartups } from "./mockData";
export async function getStartups(filters = {}) {
  await new Promise(r => setTimeout(r, 450));
  let results = [...mockStartups];
  if (filters.industry) results = results.filter(s => s.industry === filters.industry);
  if (filters.stage)    results = results.filter(s => s.stage === filters.stage);
  if (filters.location) results = results.filter(s => s.location.toLowerCase().includes(filters.location.toLowerCase()));
  if (filters.teamSize) { const [min, max] = filters.teamSize; results = results.filter(s => s.teamSize >= min && s.teamSize <= max); }
  if (filters.query)    { const q = filters.query.toLowerCase(); results = results.filter(s => `${s.name} ${s.description} ${s.industry} ${s.tagline}`.toLowerCase().includes(q)); }
  return results;
}
export async function getStartupById(id) { await new Promise(r => setTimeout(r, 200)); return mockStartups.find(s => s.id === Number(id)) || null; }
export async function getAiSummary(startupId) { await new Promise(r => setTimeout(r, 900)); const s = mockStartups.find(s => s.id === Number(startupId)); return s?.aiSummary || "Summary unavailable."; }
export async function createStartup(data) { await new Promise(r => setTimeout(r, 600)); return { ...data, id: Date.now() }; }
export async function updateStartup(id, data) { await new Promise(r => setTimeout(r, 600)); return { id, ...data }; }
