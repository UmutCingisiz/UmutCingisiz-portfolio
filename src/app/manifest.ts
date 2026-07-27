import type { MetadataRoute } from "next";
import { ogSiteDescription } from "@/lib/og-brand";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Portfolyo`,
    short_name: siteConfig.name.split(" ")[0],
    description: ogSiteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    lang: "tr",
  };
}
