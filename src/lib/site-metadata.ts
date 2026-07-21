import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { ogSiteDescription } from "@/lib/og-brand";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function getSiteMetadata(): Metadata {
  const title = `${siteConfig.name} | Full-Stack Engineer`;
  const description = ogSiteDescription;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: siteConfig.name,
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
