'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LenderRecord {
  lender: string; nmls: string; state: string; approvalRate: number;
  denialRate: number; avgLtv: number; riskScore: number; volume: number; trend: string;
}

const RISK_COLOR = (score: number) => score >= 80 ? "#FF4444" : score >= 60 ? "#FF6B35" : score >= 40 ? "#FFD700" : "#00FF88";

export default function Dashboard() {
  const [data, setData] = useState<LenderRecord[]>([]);
  const [stats, setStats] = useState<{total: number; avgRiskScore: number; highRisk: number; totalVolume: number}>({total: 0, avgRiskScore: 0, highRisk: 0, totalVolume: 0});
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState("");
  const [minRisk, setMinRisk] = useState("");
  const [refreshed, setRefreshed] = useState("");
  const router = useRouter();

  async function fetchData() {
    setLoading(true);
    const params = new URLSearchParams();
    if (stateFilter) params.set("state", stateFilter);
    if (minRisk) params.set("minRisk", minRisk);
    const res = await fetch(`/api/data?${params}`);
    if (res.status === 401) { router.push("/login"); return; }
    const json = await res.json();
    setData(json.data || []); setStats(json.stats || {}); setRefreshed(json.refreshed || "");
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, [stateFilter, minRisk]);

  async function exportCSV() {
    const res = await fetch("/api/data", { method: "POST" });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "lenderpulse-export.csv"; a.click();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050A07" }}>
      <nav style={{ borderBottom: "1px solid #1E2235", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 900, fontSize: "18px", color: "#00FF88" }}>LenderPulse</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <button onClick={exportCSV} style={{ background: "transparent", border: "1px solid #1E2235", color: "#6B7280", padding: "6px 16px", cursor: "pointer", fontSize: "12px" }}>Export CSV</button>
          <button onClick={logout} style={{ background: "transparent", border: "none", color: "#6B7280", cursor: "pointer", fontSize: "12px" }}>Sign Out</button>
        </div>
      </nav>
      <div style={{ padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Lenders Scored", value: stats.total || "—" },
            { label: "Avg Risk Score", value: stats.avgRiskScore || "—", color: RISK_COLOR(stats.avgRiskScore) },
            { label: "High Risk", value: stats.highRisk || "—", color: "#FF4444" },
            { label: "Total Volume", value: stats.totalVolume ? `${(stats.totalVolume/1000).toFixed(0)}K` : "—" },
          ].map(s => (
            <div key={s.label} style={{ background: "#080C0A", border: "1px solid #1E2235", padding: "20px 24px" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: s.color || "#E8EAF0" }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#6B7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input placeholder="State (e.g. MI)" value={stateFilter} onChange={e => setStateFilter(e.target.value.toUpperCase())}
            style={{ background: "#080C0A", border: "1px solid #1E2235", color: "#E8EAF0", padding: "10px 16px", fontSize: "13px", outline: "none", width: "150px" }} />
          <input placeholder="Min Risk Score" type="number" value={minRisk} onChange={e => setMinRisk(e.target.value)}
            style={{ background: "#080C0A", border: "1px solid #1E2235", color: "#E8EAF0", padding: "10px 16px", fontSize: "13px", outline: "none", width: "160px" }} />
        </div>
        <div style={{ border: "1px solid #1E2235", background: "#080C0A", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1E2235" }}>
                {["Lender", "NMLS", "State", "Approval %", "Denial %", "Avg LTV", "Risk Score", "Volume", "Trend"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#6B7280", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>Loading HMDA data...</td></tr>
              ) : data.map((r, i) => (
                <tr key={r.nmls} style={{ borderBottom: "1px solid #0F1420", background: i % 2 === 0 ? "#080C0A" : "#0A0E0C" }}>
                  <td style={{ padding: "10px 16px", fontWeight: 600 }}>{r.lender}</td>
                  <td style={{ padding: "10px 16px", color: "#6B7280" }}>{r.nmls}</td>
                  <td style={{ padding: "10px 16px", color: "#9CA3AF" }}>{r.state}</td>
                  <td style={{ padding: "10px 16px", color: "#00FF88" }}>{r.approvalRate}%</td>
                  <td style={{ padding: "10px 16px", color: "#FF4444" }}>{r.denialRate}%</td>
                  <td style={{ padding: "10px 16px", color: "#9CA3AF" }}>{r.avgLtv}%</td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ fontWeight: 900, color: RISK_COLOR(r.riskScore) }}>{r.riskScore}</span>
                  </td>
                  <td style={{ padding: "10px 16px", color: "#9CA3AF" }}>{r.volume.toLocaleString()}</td>
                  <td style={{ padding: "10px 16px", color: r.trend === "up" ? "#00FF88" : r.trend === "down" ? "#FF4444" : "#6B7280" }}>
                    {r.trend === "up" ? "↑" : r.trend === "down" ? "↓" : "→"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: "#4B5563" }}>
          7 years HMDA data (2017–2024) · 5,000+ lenders scored
        </div>
      </div>
    </div>
  );
}
