import { ImageResponse } from "next/og";
import { getProjectMetaBySlug } from "@/lib/content/projects";

export const alt = "Proje paylaşım görseli";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProjectMetaBySlug(slug);

  const title = project?.title ?? "Proje";
  const description =
    project?.description ?? "Mimari kararlar ve teknik detaylarla proje vitrini.";
  const category = project?.category ?? "full-stack";

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
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#a1a1aa",
          }}
        >
          {category}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              fontWeight: 700,
              maxWidth: "1030px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.3,
              color: "#a1a1aa",
              maxWidth: "1050px",
            }}
          >
            {description}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#71717a" }}>
          /projects/{slug}
        </div>
      </div>
    ),
    size,
  );
}
