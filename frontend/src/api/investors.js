// src/api/investors.js
import { mockInvestors, mockStartups } from "./mockData";
export async function getInvestorById(id) { await new Promise(r => setTimeout(r, 200)); return mockInvestors.find(i => i.id === Number(id)) || null; }
export async function updateInvestor(id, data) { await new Promise(r => setTimeout(r, 600)); return { id, ...data }; }
export async function getInvestorPortfolio(investorId) { await new Promise(r => setTimeout(r, 300)); const inv = mockInvestors.find(i => i.id === Number(investorId)); if (!inv) return []; return mockStartups.filter(s => inv.portfolioIds.includes(s.id)); }
export async function getAllInvestors() { await new Promise(r => setTimeout(r, 300)); return mockInvestors; }
