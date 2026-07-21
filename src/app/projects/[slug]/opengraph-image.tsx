import { ImageResponse } from "next/og";
import { getProjectMetaBySlug } from "@/lib/content/projects";
import {
  OgAccentBar,
  OgFooter,
  OgUcMark,
  OG_FG,
  OG_MUTED,
  OG_SIGNAL,
  ogRootStyle,
} from "@/lib/og-brand";

export const alt = "Proje paylaşım görseli";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProjectMetaBySlug(slug);

  const title = project?.title ?? "Proje";
  const description = truncate(
    project?.description ?? "Mimari kararlar ve teknik detaylarla proje vitrini.",
    140,
  );
  const category = project?.category ?? "full-stack";

  return new ImageResponse(
    (
      <div style={ogRootStyle}>
        <OgAccentBar />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <OgUcMark />
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: OG_SIGNAL,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {category} · case.study
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 48 ? 48 : 58,
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: OG_FG,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.35,
              color: OG_MUTED,
              maxWidth: 960,
            }}
          >
            {description}
          </div>
        </div>

        <OgFooter left={`/projects/${slug}`} right="umutcingisiz.com" />
      </div>
    ),
    size,
  );
}
