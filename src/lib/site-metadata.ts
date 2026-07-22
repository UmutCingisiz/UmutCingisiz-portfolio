import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { ogSiteDescription } from "@/lib/og-brand";
import { canonicalFor, getSiteOrigin } from "@/lib/site-url";

/**
 * Root metadata. Canonical is NOT set here — each route sets its own
 * `alternates.canonical` so children never inherit the homepage URL.
 */
export function getSiteMetadata(): Metadata {
  const siteUrl = getSiteOrigin();
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
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
  };
}

export function pageCanonical(path: string): Pick<Metadata, "alternates"> {
  return {
    alternates: {
      canonical: canonicalFor(path),
    },
  };
}

/** Canonical + Open Graph / Twitter URL for list and leaf routes. */
export function pageSocial(
  path: string,
  opts: { title: string; description: string },
): Metadata {
  const url = canonicalFor(path);
  return {
    ...pageCanonical(path),
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
