import { ImageResponse } from "next/og";
import { getPostMetaBySlug } from "@/lib/content/posts";

export const alt = "Blog yazısı paylaşım görseli";
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
  const post = getPostMetaBySlug(slug);

  const title = post?.title ?? "Blog";
  const description =
    post?.description ?? "Teknik yazilar, notlar ve deneyim paylasimlari.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #18181b 0%, #09090b 100%)",
          color: "#fafaf9",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa" }}>
          /blog/{slug}
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
          Portfolio Blog
        </div>
      </div>
    ),
    size,
  );
}
