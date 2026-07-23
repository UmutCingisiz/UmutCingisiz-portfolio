import { readFile } from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — full-stack portfolyo`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site hero’sunu birebir yansıtan OG — opengraph.xyz şablonu değil. */
export default async function Image() {
  const profilePath = path.join(process.cwd(), "public", "profile.jpg");
  let profileSrc: string | null = null;
  try {
    const bytes = await readFile(profilePath);
    profileSrc = `data:image/jpeg;base64,${bytes.toString("base64")}`;
  } catch {
    profileSrc = null;
  }

  const headlineShort =
    siteConfig.headline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#09090b",
          color: "#fafaf9",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ambient orbs — site globals ile aynı dil */}
        <div
          style={{
            position: "absolute",
            left: "6%",
            top: "12%",
            width: 280,
            height: 280,
            borderRadius: 999,
            background: "rgba(255,255,255,0.10)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "10%",
            bottom: "8%",
            width: 320,
            height: 320,
            borderRadius: 999,
            background: "rgba(34,211,238,0.16)",
            filter: "blur(70px)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "48px 52px",
            gap: 40,
            alignItems: "center",
          }}
        >
          {/* SOL — hero copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "54%",
              gap: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                alignSelf: "flex-start",
                borderRadius: 999,
                border: "1px solid rgba(16,185,129,0.28)",
                background: "rgba(16,185,129,0.08)",
                padding: "8px 14px 8px 10px",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#10b981",
                  display: "flex",
                }}
              />
              <div
              style={{
                display: "flex",
                fontSize: 16,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.04em",
                color: "#34d399",
              }}
            >
              {siteConfig.availabilityLabel}
            </div>
            <div style={{ display: "flex", fontSize: 15, color: "#a1a1aa" }}>
              · {siteConfig.availabilityDetail}
            </div>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 18,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.06em",
                color: "#a1a1aa",
              }}
            >
              {siteConfig.role}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: "-0.045em",
                lineHeight: 1.02,
                color: "#fafaf9",
              }}
            >
              {siteConfig.name}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontSize: 26,
                fontWeight: 650,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                color: "#e4e4e7",
                maxWidth: 560,
              }}
            >
              {headlineShort}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 48,
                  padding: "0 22px",
                  borderRadius: 12,
                  background: "#22d3ee",
                  color: "#03141a",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Projeleri İncele →
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 48,
                  padding: "0 20px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(17,17,19,0.7)",
                  color: "#fafaf9",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                umutcingisiz.com
              </div>
            </div>
          </div>

          {/* SAĞ — premium photo card (site hero TiltCard dili) */}
          <div
            style={{
              display: "flex",
              width: "46%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: 460,
                borderRadius: 28,
                border: "1px solid rgba(34,211,238,0.28)",
                background: "rgba(17,17,19,0.85)",
                padding: 12,
                boxShadow: "0 24px 80px rgba(0,0,0,0.45), 0 0 40px rgba(34,211,238,0.12)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  width: "100%",
                  height: 460,
                  borderRadius: 18,
                  overflow: "hidden",
                  background: "linear-gradient(145deg, #1a1a1e, #111113)",
                }}
              >
                {profileSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileSrc}
                    alt=""
                    width={436}
                    height={460}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 72,
                      fontWeight: 800,
                      color: "#22d3ee",
                    }}
                  >
                    UC
                  </div>
                )}

                <div
                  style={{
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: 12,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(9,9,11,0.82)",
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: 14,
                      fontFamily: "ui-monospace, monospace",
                      color: "#a1a1aa",
                    }}
                  >
                    current_focus.ts
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 6,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#fafaf9",
                      lineHeight: 1.3,
                    }}
                  >
                    {siteConfig.currentFocus.length > 90
                      ? `${siteConfig.currentFocus.slice(0, 87)}…`
                      : siteConfig.currentFocus}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginTop: 10,
                  padding: "0 2px 2px",
                }}
              >
                {["Next.js", "TypeScript", "Neon", "Redis"].map((t) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(26,26,30,0.8)",
                      padding: "5px 10px",
                      fontSize: 13,
                      fontFamily: "ui-monospace, monospace",
                      color: "#a1a1aa",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
