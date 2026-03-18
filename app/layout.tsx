import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LenderPulse — Mortgage Lender Risk Intelligence",
  description: "7 years of HMDA data transformed into lender performance scores — denial rates, approval trends, and",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#050A07", color: "#E8EAF0", fontFamily: "monospace" }}>
        {children}
      </body>
    </html>
  );
}
