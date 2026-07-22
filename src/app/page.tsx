import { Suspense } from "react";
import type { Metadata } from "next";
import { AboutSection } from "@/components/about-section";
import { AlgorithmLabIsland } from "@/components/algorithm-lab-island";
import { ContactSection } from "@/components/contact-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { GithubActivitySection } from "@/components/github-activity-section";
import { GithubActivitySkeleton } from "@/components/github-activity-skeleton";
import { Hero } from "@/components/hero";
import { HiringProofSection } from "@/components/hiring-proof-section";
import { QualityStandardsSection } from "@/components/quality-standards-section";
import { SkillsSection } from "@/components/skills-section";
import { StatusBanner } from "@/components/status-banner";
import { TerminalPrompt } from "@/components/terminal-prompt";
import { siteConfig } from "@/lib/site-config";
import { pageSocial } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...pageSocial("/", {
    title: `${siteConfig.name} | Full-Stack Engineer`,
    description: siteConfig.shortBio,
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
      <StatusBanner
        resumeLimited={resumeLimited}
        resumeMissing={resumeMissing}
      />
      <Hero />
      <TerminalPrompt />
      <AboutSection />
      <SkillsSection />
      <AlgorithmLabIsland />
      <FeaturedProjects />
      <HiringProofSection />
      <QualityStandardsSection />
      <Suspense fallback={<GithubActivitySkeleton />}>
        <GithubActivitySection />
      </Suspense>
      <ContactSection contactSuccess={contactSuccess} />
    </>
  );
}
