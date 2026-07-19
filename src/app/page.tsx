import { Suspense } from "react";
import { AlgorithmLabSection } from "@/components/algorithm-lab-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { GithubActivitySection } from "@/components/github-activity-section";
import { Hero } from "@/components/hero";
import { HiringProofSection } from "@/components/hiring-proof-section";
import { QualityStandardsSection } from "@/components/quality-standards-section";
import { SkillsSection } from "@/components/skills-section";
import { StatusBanner } from "@/components/status-banner";
import { TerminalPrompt } from "@/components/terminal-prompt";

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
      <AlgorithmLabSection />
      <FeaturedProjects />
      <HiringProofSection />
      <QualityStandardsSection />
      <Suspense fallback={null}>
        <GithubActivitySection />
      </Suspense>
      <ContactSection contactSuccess={contactSuccess} />
    </>
  );
}
