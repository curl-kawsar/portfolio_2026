import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";
import { seoOgTagline } from "@/lib/seo";

export const alt = `${portfolio.name} — ${portfolio.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          backgroundColor: "#f5f1e8",
          border: "8px solid #0a0a0a",
          boxShadow: "12px 12px 0 0 #ff5b1f",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 14,
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#0a0a0a",
            opacity: 0.7,
          }}
        >
          imkawsar.com
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#0a0a0a",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {portfolio.name}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#0a0a0a",
              opacity: 0.85,
            }}
          >
            {portfolio.role}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#0a0a0a",
              opacity: 0.6,
            }}
          >
            {portfolio.location}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 14,
            fontFamily: "monospace",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#ff5b1f",
            fontWeight: 700,
          }}
        >
          {seoOgTagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
