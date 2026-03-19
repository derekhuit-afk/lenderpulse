"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#050A07" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1E2235", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 900, fontSize: "22px", letterSpacing: "-0.5px", color: "#00FF88" }}>LenderPulse</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/login" style={{ color: "#9CA3AF", textDecoration: "none", fontSize: "14px" }}>Sign In</Link>
          <Link href="/signup" style={{ background: "#00FF88", color: "#050810", padding: "8px 20px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>Get Access — $3,500/mo</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 48px 60px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#00FF88", textTransform: "uppercase", marginBottom: "20px" }}>Insurance & Underwriting</div>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "24px" }}>
          Mortgage Lender Risk Intelligence
        </h1>
        <p style={{ fontSize: "18px", color: "#9CA3AF", maxWidth: "580px", lineHeight: 1.7, marginBottom: "40px" }}>
          7 years of HMDA data transformed into lender performance scores — denial rates, approval trends, and LTV risk by geography.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link href="/signup" style={{ background: "#00FF88", color: "#050810", padding: "16px 36px", fontWeight: 900, fontSize: "15px", textDecoration: "none", letterSpacing: "1px" }}>
            START SUBSCRIPTION — $3,500/MO
          </Link>
          <Link href="/login" style={{ border: "1px solid #1E2235", color: "#9CA3AF", padding: "16px 36px", fontSize: "15px", textDecoration: "none" }}>
            Sign In
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderTop: "1px solid #1E2235", borderBottom: "1px solid #1E2235", padding: "40px 48px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          <div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#00FF88" }}>7 Years</div>
            <div style={{ fontSize: "12px", color: "#6B7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>HMDA Data Depth</div>
          </div>
          <div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#00FF88" }}>5,000+</div>
            <div style={{ fontSize: "12px", color: "#6B7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>Lenders Scored</div>
          </div>
          <div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#00FF88" }}>$${p['price']:,}</div>
            <div style={{ fontSize: "12px", color: "#6B7280", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>Per Month</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#6B7280", textTransform: "uppercase", marginBottom: "40px" }}>What's Included</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00FF88", fontSize: "18px" }}>✓</span> Lender Risk Scores</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00FF88", fontSize: "18px" }}>✓</span> Denial Rate Trends</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00FF88", fontSize: "18px" }}>✓</span> Geographic LTV Map</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00FF88", fontSize: "18px" }}>✓</span> Approval Rate Benchmarks</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ color: "#00FF88", fontSize: "18px" }}>✓</span> CSV Data Export</li>
        </ul>
      </div>

      {/* CTA */}
      <div style={{ borderTop: "1px solid #1E2235", padding: "60px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 style={{ fontWeight: 900, fontSize: "32px", marginBottom: "16px" }}>Ready to start?</h2>
          <p style={{ color: "#6B7280", marginBottom: "32px" }}>No free trial. Immediate access upon payment.</p>
          <Link href="/signup" style={{ background: "#00FF88", color: "#050810", padding: "16px 48px", fontWeight: 900, fontSize: "16px", textDecoration: "none", display: "inline-block" }}>
            Subscribe — $3,500/month
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #1E2235", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "12px", color: "#4B5563" }}>© 2026 LenderPulse · A Huit Data Ventures Company</div>
        <div style={{ fontSize: "12px", color: "#4B5563" }}>data.huit.ai</div>
      </div>
    </div>
  );
}
