import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} - Portfolio`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #18181b 0%, #09090b 100%)",
          color: "#fafaf9",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a1a1aa",
          }}
        >
          {"<"}portfolio{" />"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: "1000px",
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 34, opacity: 0.85 }}>{siteConfig.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa" }}>
          {siteConfig.headline}
        </div>
      </div>
    ),
    size,
  );
}
