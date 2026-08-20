import { Suspense } from "react";
import type { Metadata } from "next";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import {
  DeferredContactSuccessToast,
  DeferredHashScroll,
  DeferredTerminalPrompt,
} from "@/components/deferred-islands";
import { FeaturedProjects } from "@/components/featured-projects";
import { GithubActivitySection } from "@/components/github-activity-section";
import { GithubActivitySkeleton } from "@/components/github-activity-skeleton";
import { Hero } from "@/components/hero-section";
import { HiringProofSection } from "@/components/hiring-proof-section";
import { SkillsSection } from "@/components/skills-section";
import { StatusBanner } from "@/components/status-banner";
import { siteConfig } from "@/lib/site-config";
import { ogSiteDescription } from "@/lib/og-brand";
import { pageSocial } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...pageSocial("/", {
    title: `${siteConfig.name} | umutcingisiz.com`,
    description: ogSiteDescription,
  }),
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ contact?: string; resume?: string }>;
}) {
  const sp = await searchParams;
  const contactSuccess = sp.contact === "sent";
  const resumeMissing = sp.resume === "missing";
  const resumeLimited = sp.resume === "limited";

  return (
    <>
      <DeferredHashScroll />
      <DeferredContactSuccessToast active={contactSuccess} />
      <StatusBanner
        resumeLimited={resumeLimited}
        resumeMissing={resumeMissing}
      />
      {/* Akış: Hero → shell → About/Skills → Projeler → Hiring → GitHub → İletişim */}
      <Hero />
      <DeferredTerminalPrompt />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <HiringProofSection />
      <Suspense fallback={<GithubActivitySkeleton />}>
        <GithubActivitySection />
      </Suspense>
      <ContactSection contactSuccess={contactSuccess} />
    </>
  );
}
