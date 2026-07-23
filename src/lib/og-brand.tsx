import type { CSSProperties, ReactNode } from "react";

/** Site signal cyan — OG ImageResponse inline stilleri */
export const OG_SIGNAL = "#22d3ee";
export const OG_FG = "#fafafa";
export const OG_MUTED = "#a1a1aa";
export const OG_BG_TOP = "#12161c";
export const OG_BG_BOTTOM = "#05080c";

export const ogRootStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: `linear-gradient(145deg, ${OG_BG_TOP} 0%, ${OG_BG_BOTTOM} 55%, #041015 100%)`,
  color: OG_FG,
  padding: "56px 64px",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  position: "relative",
};

export function OgAccentBar() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        background: `linear-gradient(90deg, ${OG_SIGNAL}, #34d399 55%, transparent)`,
        display: "flex",
      }}
    />
  );
}

export function OgUcMark() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 16,
        border: `1.5px solid rgba(34,211,238,0.45)`,
        background: "linear-gradient(145deg, #1a1f26 0%, #0a0c10 100%)",
        fontFamily: "ui-monospace, monospace",
        fontSize: 28,
        fontWeight: 800,
        letterSpacing: "-0.06em",
      }}
    >
      <span style={{ color: OG_FG }}>U</span>
      <span style={{ color: "rgba(34,211,238,0.55)", margin: "0 4px" }}>|</span>
      <span style={{ color: OG_SIGNAL }}>C</span>
    </div>
  );
}

export function OgFooter({ left, right }: { left: ReactNode; right?: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 22,
          color: OG_MUTED,
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {left}
      </div>
      {right ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 18px",
            borderRadius: 999,
            border: `1px solid rgba(34,211,238,0.35)`,
            background: "rgba(34,211,238,0.1)",
            color: OG_SIGNAL,
            fontSize: 20,
            fontWeight: 600,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {right}
        </div>
      ) : null}
    </div>
  );
}

/** Sosyal önizleme için kısa meta açıklama (~140 karakter) */
export const ogSiteDescription =
  "DAÜ Bilgisayar Mühendisi · TÜBİTAK BİGG Akdeniz · Full-stack ürünler, Auth, Neon, MDX.";
