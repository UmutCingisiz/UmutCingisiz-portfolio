import { siteConfig } from "@/lib/site-config";
import { canonicalFor, getSiteOrigin } from "@/lib/site-url";

type JsonLd = Record<string, unknown>;

export function personJsonLd(): JsonLd {
  const origin = getSiteOrigin();
  return {
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: siteConfig.name,
    alternateName: [
      "umutcingisiz",
      "UmutCingisiz",
      "umut cingisiz",
      "Umut Ibrahim Cingisiz",
    ],
    givenName: "Umut",
    familyName: "Cingisiz",
    url: origin,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gazimağusa",
      addressCountry: "CY",
    },
    sameAs: [
      origin,
      "https://www.umutcingisiz.com",
      siteConfig.github,
      siteConfig.linkedin,
    ],
    image: canonicalFor(siteConfig.profileImage),
  };
}

export function websiteJsonLd(): JsonLd {
  const origin = getSiteOrigin();
  return {
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: siteConfig.name,
    alternateName: ["umutcingisiz", "umutcingisiz.com"],
    url: origin,
    description: siteConfig.shortBio,
    inLanguage: "tr-TR",
    publisher: { "@id": `${origin}/#person` },
  };
}

/** Root layout: Person + WebSite @graph */
export function siteGraphJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [personJsonLd(), websiteJsonLd()],
  };
}

export function blogPostingJsonLd(input: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: readonly string[];
}): JsonLd {
  const url = canonicalFor(`/blog/${input.slug}`);
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    url,
    mainEntityOfPage: url,
    keywords: input.tags.join(", "),
    inLanguage: "tr-TR",
    author: { "@id": `${origin}/#person` },
    publisher: { "@id": `${origin}/#person` },
  };
}

export function projectCreativeWorkJsonLd(input: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: readonly string[];
  repo?: string;
  demo?: string;
}): JsonLd {
  const url = canonicalFor(`/projects/${input.slug}`);
  const origin = getSiteOrigin();
  const sameAs = [input.demo, input.repo].filter(
    (value): value is string => Boolean(value),
  );

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.description,
    datePublished: input.date,
    url,
    keywords: input.tags.join(", "),
    inLanguage: "tr-TR",
    author: { "@id": `${origin}/#person` },
    creator: { "@id": `${origin}/#person` },
    ...(input.repo ? { codeRepository: input.repo } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
