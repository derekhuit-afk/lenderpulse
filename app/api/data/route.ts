import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// Sample risk data based on HMDA patterns (HMDA pipeline live - queries coming)
const SAMPLE_DATA = [
  { lender: "United Wholesale Mortgage", nmls: "3038", state: "MI", approvalRate: 78.4, denialRate: 21.6, avgLtv: 82.3, riskScore: 72, volume: 48200, trend: "up" },
  { lender: "Rocket Mortgage", nmls: "3030", state: "MI", approvalRate: 81.2, denialRate: 18.8, avgLtv: 79.1, riskScore: 68, volume: 41800, trend: "stable" },
  { lender: "loanDepot", nmls: "174457", state: "CA", approvalRate: 74.6, denialRate: 25.4, avgLtv: 85.7, riskScore: 81, volume: 22400, trend: "down" },
  { lender: "Caliber Home Loans", nmls: "15622", state: "TX", approvalRate: 77.1, denialRate: 22.9, avgLtv: 83.2, riskScore: 76, volume: 19800, trend: "up" },
  { lender: "Fairway Independent", nmls: "2289", state: "WI", approvalRate: 83.5, denialRate: 16.5, avgLtv: 77.8, riskScore: 62, volume: 18200, trend: "stable" },
  { lender: "CrossCountry Mortgage", nmls: "3029", state: "OH", approvalRate: 79.8, denialRate: 20.2, avgLtv: 81.4, riskScore: 69, volume: 15600, trend: "up" },
  { lender: "Freedom Mortgage", nmls: "2767", state: "NJ", approvalRate: 71.3, denialRate: 28.7, avgLtv: 88.9, riskScore: 89, volume: 31200, trend: "down" },
  { lender: "Movement Mortgage", nmls: "39179", state: "SC", approvalRate: 85.2, denialRate: 14.8, avgLtv: 75.6, riskScore: 58, volume: 11400, trend: "stable" },
];

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const url = new URL(req.url);
  const state = url.searchParams.get("state") || "";
  const minRisk = parseInt(url.searchParams.get("minRisk") || "0");
  
  let data = SAMPLE_DATA;
  if (state) data = data.filter(d => d.state === state);
  if (minRisk) data = data.filter(d => d.riskScore >= minRisk);
  
  return NextResponse.json({
    data,
    stats: {
      total: data.length,
      avgRiskScore: Math.round(data.reduce((s, d) => s + d.riskScore, 0) / data.length),
      highRisk: data.filter(d => d.riskScore >= 80).length,
      totalVolume: data.reduce((s, d) => s + d.volume, 0),
    },
    refreshed: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const csv = [
    "Lender,NMLS,State,Approval Rate,Denial Rate,Avg LTV,Risk Score,Volume,Trend",
    ...SAMPLE_DATA.map(r => `${r.lender},${r.nmls},${r.state},${r.approvalRate},${r.denialRate},${r.avgLtv},${r.riskScore},${r.volume},${r.trend}`)
  ].join("\n");
  
  return new Response(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=lenderpulse-export.csv" } });
}
