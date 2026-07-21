import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import {
  OgAccentBar,
  OgFooter,
  OgUcMark,
  OG_FG,
  OG_MUTED,
  OG_SIGNAL,
  ogRootStyle,
  ogSiteDescription,
} from "@/lib/og-brand";

export const alt = `${siteConfig.name} — Full-Stack Portfolio`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={ogRootStyle}>
        <OgAccentBar />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <OgUcMark />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: OG_SIGNAL,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              fullstack / engineer
            </div>
            <div style={{ display: "flex", fontSize: 20, color: OG_MUTED }}>
              case studies · auth · neon · mdx
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: OG_FG,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.25,
              color: "rgba(250,250,250,0.88)",
              maxWidth: 920,
            }}
          >
            Uçtan uca, ölçeklenebilir ve hataya dayanıklı sistemler.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              lineHeight: 1.35,
              color: OG_MUTED,
              maxWidth: 900,
            }}
          >
            {ogSiteDescription}
          </div>
        </div>

        <OgFooter left="umutcingisiz.com" right="Projeleri incele →" />
      </div>
    ),
    size,
  );
}
