// src/api/mockData.js
export const mockStartups = [
  {
    id: 1, name: "NeuraPay", tagline: "AI-native fraud prevention for modern payments",
    description: "NeuraPay is an AI-native payment infrastructure that reduces fraud by 94% using real-time behavioral biometrics. Processing $40M/month for 120+ enterprise clients across North America. Our proprietary ML models analyze 200+ behavioral signals per transaction.",
    industry: "FinTech", stage: "Series A", location: "San Francisco, CA",
    teamSize: 18, totalRaised: 2400000, currentAsk: 8000000,
    dateFounded: 2022, expenses: 180000, founderId: 1,
    calendlyUrl: "https://calendly.com/neurapay",
    aiSummary: "NeuraPay's behavioral-biometrics engine cuts payment fraud by 94%, already processing $40M/month for 120 enterprise clients — making it the rare fraud-prevention startup with both deep-tech differentiation and proven revenue traction.",
    members: [{ name: "Aisha Kamara", role: "CEO & Co-Founder" }, { name: "Raj Patel", role: "CTO" }, { name: "Sofia Torres", role: "Head of Product" }],
    fundingGoal: 8000000, logoInitials: "NP", logoColor: "#E67E22", matchScore: 96,
  },
  {
    id: 2, name: "GreenGrid", tagline: "Peer-to-peer solar energy trading for SMBs",
    description: "GreenGrid is a distributed energy management platform enabling small businesses to monetize excess solar generation through peer-to-peer energy trading on our proprietary microgrid network. We handle all regulatory compliance automatically.",
    industry: "HealthTech", stage: "Seed", location: "Austin, TX",
    teamSize: 8, totalRaised: 800000, currentAsk: 3000000,
    dateFounded: 2023, expenses: 60000, founderId: 2,
    calendlyUrl: "https://calendly.com/greengrid",
    aiSummary: "GreenGrid removes the complexity of solar monetization for SMBs — $1.2M ARR with 42 clients proves that automatic compliance and P2P trading is a product the market is actively buying.",
    members: [{ name: "Marcus Osei", role: "CEO & Founder" }, { name: "Priya Singh", role: "Head of Engineering" }],
    fundingGoal: 3000000, logoInitials: "GG", logoColor: "#8DB294", matchScore: 88,
  },
  {
    id: 3, name: "Synthex Health", tagline: "AI diagnostics for rare autoimmune diseases",
    description: "Multimodal AI diagnostic tool detecting rare autoimmune diseases from standard blood panels with 89% accuracy — 15x faster than current specialist workflows. Three hospital pilots with 1,200 patients enrolled. FDA Breakthrough Device designation received.",
    industry: "HealthTech", stage: "Pre-Seed", location: "Boston, MA",
    teamSize: 5, totalRaised: 200000, currentAsk: 1500000,
    dateFounded: 2023, expenses: 35000, founderId: 3,
    calendlyUrl: "https://calendly.com/synthexhealth",
    aiSummary: "Synthex Health's FDA Breakthrough designation and 89% diagnostic accuracy on standard blood panels positions it as a category-defining tool in rare disease detection.",
    members: [{ name: "Dr. Priya Nair", role: "CEO & Founder" }, { name: "Alan Wu", role: "Lead ML Engineer" }],
    fundingGoal: 1500000, logoInitials: "SH", logoColor: "#4A5D5E", matchScore: 82,
  },
  {
    id: 4, name: "Orbital Logistics", tagline: "Autonomous in-orbit servicing and debris removal",
    description: "Autonomous in-orbit servicing and debris removal drones for commercial and government satellite operators. First commercial contract signed with ESA for 3 active debris removal missions starting Q2 2025.",
    industry: "SaaS", stage: "Series B", location: "Denver, CO",
    teamSize: 64, totalRaised: 22000000, currentAsk: 40000000,
    dateFounded: 2020, expenses: 950000, founderId: 4,
    calendlyUrl: "https://calendly.com/orbital-logistics",
    aiSummary: "Orbital Logistics is the only commercial operator with a signed ESA debris removal contract — their hardware-agnostic docking system unlocks a $12B serviceable market.",
    members: [{ name: "James Weatherford", role: "CEO & Founder" }, { name: "Elena Marchetti", role: "Chief Engineer" }],
    fundingGoal: 40000000, logoInitials: "OL", logoColor: "#E67E22", matchScore: 74,
  },
  {
    id: 5, name: "Mira Learning", tagline: "Adaptive K-12 tutoring powered by emotion AI",
    description: "Adaptive tutoring platform building personalized K-12 curricula using spaced repetition and real-time emotion recognition via webcam. Detects confusion, boredom, and frustration to dynamically adjust lesson pacing.",
    industry: "EdTech", stage: "Seed", location: "New York, NY",
    teamSize: 11, totalRaised: 650000, currentAsk: 2500000,
    dateFounded: 2022, expenses: 85000, founderId: 5,
    calendlyUrl: "https://calendly.com/miralearning",
    aiSummary: "Mira Learning's emotion-aware tutoring engine drives a 4.8★ App Store rating and 18K MAU — 3 school district partnerships create a defensible B2B2C distribution channel.",
    members: [{ name: "Sofia Chen", role: "CEO & Co-Founder" }, { name: "Daniel Park", role: "Head of AI" }],
    fundingGoal: 2500000, logoInitials: "ML", logoColor: "#8DB294", matchScore: 79,
  },
  {
    id: 6, name: "CarbonTrace", tagline: "Automated carbon accounting for enterprise supply chains",
    description: "CarbonTrace automates Scope 1, 2, and 3 carbon accounting across complex enterprise supply chains using API integrations with 800+ data sources. Real-time dashboards, automatic regulatory filings, and verified offsets marketplace.",
    industry: "SaaS", stage: "Series A", location: "Seattle, WA",
    teamSize: 32, totalRaised: 5500000, currentAsk: 15000000,
    dateFounded: 2021, expenses: 380000, founderId: 6,
    calendlyUrl: "https://calendly.com/carbontrace",
    aiSummary: "CarbonTrace's 800+ data-source integrations make it the most comprehensive automated carbon accounting platform — 15 Fortune 500 clients and mandatory ESG reporting create a durable revenue moat.",
    members: [{ name: "Yuki Yamamoto", role: "CEO & Founder" }, { name: "Chris Rivera", role: "CTO" }],
    fundingGoal: 15000000, logoInitials: "CT", logoColor: "#4A5D5E", matchScore: 91,
  },
  {
    id: 7, name: "PocketMD", tagline: "AI-first primary care for underserved communities",
    description: "PocketMD delivers AI-first primary care via a $9/month subscription, targeting the 30M Americans without access to a primary care physician. LLM-powered symptom checker routes patients to virtual physicians in under 4 minutes.",
    industry: "HealthTech", stage: "Seed", location: "Houston, TX",
    teamSize: 14, totalRaised: 1200000, currentAsk: 4000000,
    dateFounded: 2023, expenses: 110000, founderId: 7,
    calendlyUrl: "https://calendly.com/pocketmd",
    aiSummary: "PocketMD's $9/month model and Medicaid MCO partnerships create a scalable path to 30M underserved Americans — LLM-powered triage at 4-minute response times is already converting payers.",
    members: [{ name: "Dr. Maria Gonzalez", role: "CEO & Founder" }, { name: "Kevin Lee", role: "CTO" }],
    fundingGoal: 4000000, logoInitials: "PM", logoColor: "#E67E22", matchScore: 85,
  },
  {
    id: 8, name: "Forma AI", tagline: "Generative AI for product design and engineering",
    description: "Forma AI turns plain-language product briefs into production-ready CAD files and manufacturing specs in minutes. Integrated with SolidWorks, Fusion 360, and 12 contract manufacturers.",
    industry: "Marketplace", stage: "Seed", location: "San Jose, CA",
    teamSize: 9, totalRaised: 900000, currentAsk: 3500000,
    dateFounded: 2023, expenses: 75000, founderId: 8,
    calendlyUrl: "https://calendly.com/forma-ai",
    aiSummary: "Forma AI's plain-language-to-CAD pipeline cuts hardware development cycles by 60% — direct integrations with major CAD platforms and 12 contract manufacturers make switching costs high.",
    members: [{ name: "Lena Kowalski", role: "CEO & Co-Founder" }, { name: "Arjun Mehta", role: "Head of ML" }],
    fundingGoal: 3500000, logoInitials: "FA", logoColor: "#8DB294", matchScore: 77,
  },
];

export const mockInvestors = [
  {
    id: 1, name: "Elena Vasquez", headline: "General Partner at Apex Ventures",
    bio: "15 years in venture capital. Former operator at Salesforce and PayPal. Focused on AI-enabled B2B infrastructure. Led 30+ deals with 4 unicorn exits. Board member at NeuraPay, Stackwise, and CloudPulse.",
    location: "San Francisco, CA", checkSizeMin: 500000, checkSizeMax: 5000000,
    focusAreas: ["FinTech", "AI", "B2B SaaS", "Infrastructure"],
    preferredStages: ["Seed", "Series A"],
    portfolioIds: [1, 6, 8],
    socialLinks: { linkedin: "https://linkedin.com/in/elenavasquez", instagram: "https://instagram.com/elenavasquez", facebook: "https://facebook.com/elenavasquez" },
    recentInvestments: [
      { startupName: "NeuraPay", amount: 2000000, stage: "Series A", date: "Jan 2025" },
      { startupName: "Stackwise", amount: 800000, stage: "Seed", date: "Oct 2024" },
      { startupName: "CloudPulse", amount: 3000000, stage: "Series A", date: "Jul 2024" },
    ],
    avatarInitials: "EV", avatarColor: "#4A5D5E", firm: "Apex Ventures",
  },
  {
    id: 2, name: "David Park", headline: "Managing Partner at Meridian Capital",
    bio: "Climate tech investor and former energy sector executive. Committed $200M+ to climate startups over 12 years. Advisor to the UN Climate Innovation Taskforce.",
    location: "New York, NY", checkSizeMin: 1000000, checkSizeMax: 15000000,
    focusAreas: ["CleanTech", "ClimateTech", "Hardware", "Marketplace"],
    preferredStages: ["Seed", "Series A", "Series B"],
    portfolioIds: [2, 6],
    socialLinks: { linkedin: "https://linkedin.com/in/davidpark", instagram: "https://instagram.com/davidpark", facebook: "https://facebook.com/davidpark" },
    recentInvestments: [
      { startupName: "GreenGrid", amount: 1200000, stage: "Seed", date: "Feb 2025" },
      { startupName: "SolarEdge Pro", amount: 5000000, stage: "Series A", date: "Nov 2024" },
    ],
    avatarInitials: "DP", avatarColor: "#8DB294", firm: "Meridian Capital",
  },
  {
    id: 3, name: "Yuki Tanaka", headline: "Partner at Horizon Fund III",
    bio: "Physician-turned-investor specializing in digital health and medical AI. MD from Harvard, MBA from Wharton. Deep FDA and regulatory expertise.",
    location: "Boston, MA", checkSizeMin: 100000, checkSizeMax: 2000000,
    focusAreas: ["HealthTech", "BioTech", "DeepTech"],
    preferredStages: ["Pre-Seed", "Seed"],
    portfolioIds: [3, 7],
    socialLinks: { linkedin: "https://linkedin.com/in/yukitanaka", instagram: "https://instagram.com/yukitanaka", facebook: "https://facebook.com/yukitanaka" },
    recentInvestments: [
      { startupName: "Synthex Health", amount: 200000, stage: "Pre-Seed", date: "Mar 2025" },
      { startupName: "MindBridge", amount: 800000, stage: "Seed", date: "Dec 2024" },
    ],
    avatarInitials: "YT", avatarColor: "#E67E22", firm: "Horizon Fund III",
  },
  {
    id: 4, name: "Marcus Webb", headline: "Principal at Frontier Ventures",
    bio: "Former founder (2 exits) turned investor. Thesis: the best enterprise software looks like consumer apps. Focus on bottom-up SaaS, developer tools, and marketplace businesses.",
    location: "Austin, TX", checkSizeMin: 250000, checkSizeMax: 3000000,
    focusAreas: ["SaaS", "Marketplace", "EdTech", "Developer Tools"],
    preferredStages: ["Pre-Seed", "Seed", "Series A"],
    portfolioIds: [5, 8],
    socialLinks: { linkedin: "https://linkedin.com/in/marcuswebb", instagram: "https://instagram.com/marcuswebb", facebook: "https://facebook.com/marcuswebb" },
    recentInvestments: [
      { startupName: "Mira Learning", amount: 650000, stage: "Seed", date: "Jan 2025" },
      { startupName: "Forma AI", amount: 400000, stage: "Seed", date: "Nov 2024" },
    ],
    avatarInitials: "MW", avatarColor: "#4A5D5E", firm: "Frontier Ventures",
  },
  {
    id: 5, name: "Amara Obi", headline: "General Partner at Catalyst Fund",
    bio: "Impact-first investor with focus on underserved markets in healthcare and education. $150M deployed across 60+ companies. Former McKinsey partner and World Bank advisor.",
    location: "Washington, DC", checkSizeMin: 200000, checkSizeMax: 4000000,
    focusAreas: ["HealthTech", "EdTech", "FinTech", "Social Impact"],
    preferredStages: ["Pre-Seed", "Seed", "Series A"],
    portfolioIds: [3, 5, 7],
    socialLinks: { linkedin: "https://linkedin.com/in/amaraobi", instagram: "https://instagram.com/amaraobi", facebook: "https://facebook.com/amaraobi" },
    recentInvestments: [
      { startupName: "PocketMD", amount: 1000000, stage: "Seed", date: "Feb 2025" },
      { startupName: "Mira Learning", amount: 500000, stage: "Seed", date: "Dec 2024" },
    ],
    avatarInitials: "AO", avatarColor: "#E67E22", firm: "Catalyst Fund",
  },
];

export const mockUser = {
  investor: { id: 1, name: "Elena Vasquez", role: "investor", email: "elena@apexventures.com", avatarInitials: "EV", avatarColor: "#4A5D5E" },
  founder:  { id: 1, name: "Aisha Kamara",  role: "founder",  email: "aisha@neurapay.io",      avatarInitials: "AK", avatarColor: "#E67E22" },
};

export const mockMatches = [
  { startupId: 1, investorId: 1, score: 96 }, { startupId: 2, investorId: 2, score: 88 },
  { startupId: 3, investorId: 3, score: 82 }, { startupId: 4, investorId: 1, score: 74 },
  { startupId: 5, investorId: 4, score: 79 }, { startupId: 6, investorId: 1, score: 91 },
  { startupId: 6, investorId: 2, score: 85 }, { startupId: 7, investorId: 3, score: 88 },
  { startupId: 7, investorId: 5, score: 93 }, { startupId: 8, investorId: 4, score: 77 },
];

export const mockMeetings = [
  { id: 1, counterpartName: "Elena Vasquez", counterpartInitials: "EV", counterpartColor: "#4A5D5E", date: "Mar 24, 2025", time: "2:00 PM PST", type: "Intro Call", status: "confirmed" },
  { id: 2, counterpartName: "David Park",    counterpartInitials: "DP", counterpartColor: "#8DB294", date: "Mar 27, 2025", time: "10:30 AM PST", type: "Deep Dive",  status: "pending" },
  { id: 3, counterpartName: "Yuki Tanaka",   counterpartInitials: "YT", counterpartColor: "#E67E22", date: "Apr 1, 2025",  time: "11:00 AM PST", type: "Partner Meeting", status: "confirmed" },
];

export const MOCK_FOUNDERS = {
  1: { name: "Aisha Kamara", title: "CEO & Co-Founder", location: "San Francisco, CA", avatarInitials: "AK", avatarColor: "#E67E22", bio: "Serial entrepreneur with 10+ years in fintech infrastructure. Previously led payments engineering at Stripe. MIT CS graduate. Passionate about making financial systems fairer through AI.", socialLinks: { linkedin: "https://linkedin.com", instagram: "https://instagram.com", facebook: "https://facebook.com" }, startupIds: [1], calendlyUrl: "https://calendly.com/aishakamara" },
  2: { name: "Marcus Osei", title: "CEO & Founder", location: "Austin, TX", avatarInitials: "MO", avatarColor: "#4A5D5E", bio: "Clean energy advocate and hardware engineer. Former Tesla energy storage team lead. Built and sold an IoT company in 2020.", socialLinks: { linkedin: "https://linkedin.com", instagram: "https://instagram.com", facebook: "https://facebook.com" }, startupIds: [2], calendlyUrl: "https://calendly.com/marcosei" },
};

export function formatCurrency(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export function stageCssClass(stage) {
  const map = { "Pre-Seed": "tag-stage-preseed", "Seed": "tag-stage-seed", "Series A": "tag-stage-series-a", "Series B": "tag-stage-series-b", "Series B+": "tag-stage-series-b" };
  return map[stage] || "tag-sage";
}
