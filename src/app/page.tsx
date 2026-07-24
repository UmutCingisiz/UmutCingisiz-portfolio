import { Suspense } from "react";
import type { Metadata } from "next";
import { AboutSection } from "@/components/about-section";
import { AlgorithmLabIsland } from "@/components/algorithm-lab-island";
import { ContactSection } from "@/components/contact-section";
import { ContactSuccessToast } from "@/components/contact-success-toast";
import { FeaturedProjects } from "@/components/featured-projects";
import { GithubActivitySection } from "@/components/github-activity-section";
import { GithubActivitySkeleton } from "@/components/github-activity-skeleton";
import { HashScroll } from "@/components/hash-scroll";
import { Hero } from "@/components/hero";
import { HiringProofSection } from "@/components/hiring-proof-section";
import { SkillsSection } from "@/components/skills-section";
import { StatusBanner } from "@/components/status-banner";
import { TerminalPrompt } from "@/components/terminal-prompt";
import { siteConfig } from "@/lib/site-config";
import { pageSocial } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...pageSocial("/", {
    title: `${siteConfig.name} | umutcingisiz.com`,
    description: `${siteConfig.shortBio} · umutcingisiz`,
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
      <HashScroll />
      <ContactSuccessToast active={contactSuccess} />
      <StatusBanner
        resumeLimited={resumeLimited}
        resumeMissing={resumeMissing}
      />
      <Hero />
      <TerminalPrompt />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <HiringProofSection />
      <AlgorithmLabIsland />
      <Suspense fallback={<GithubActivitySkeleton />}>
        <GithubActivitySection />
      </Suspense>
      <ContactSection contactSuccess={contactSuccess} />
    </>
  );
}
