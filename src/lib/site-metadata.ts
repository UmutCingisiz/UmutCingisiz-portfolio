import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function getSiteMetadata(): Metadata {
  const title = siteConfig.name;
  const description = siteConfig.shortBio;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: title,
      title,
      description,
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: siteUrl,
    },
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
  };
}
