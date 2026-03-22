// src/api/matches.js
import { mockMatches, mockStartups, mockInvestors } from "./mockData";
export async function getRecommended(role, userId) {
  await new Promise(r => setTimeout(r, 500));
  if (role === "investor") {
    return mockMatches.filter(m => m.investorId === userId).map(m => ({ ...mockStartups.find(s => s.id === m.startupId), matchScore: m.score })).filter(Boolean).sort((a,b) => b.matchScore - a.matchScore);
  } else {
    return mockMatches.filter(m => m.startupId === userId).map(m => ({ ...mockInvestors.find(i => i.id === m.investorId), matchScore: m.score })).filter(Boolean).sort((a,b) => b.matchScore - a.matchScore);
  }
}
export async function getMatchScore(investorId, startupId) {
  await new Promise(r => setTimeout(r, 200));
  const m = mockMatches.find(m => m.investorId === Number(investorId) && m.startupId === Number(startupId));
  return m?.score ?? Math.floor(60 + Math.random() * 35);
}
