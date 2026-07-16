import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { EngineeringHighlights } from "@/components/engineering-highlights";
import { FeaturedProjects } from "@/components/featured-projects";
import { GithubActivitySection } from "@/components/github-activity-section";
import { Hero } from "@/components/hero";
import { HiringProofSection } from "@/components/hiring-proof-section";
import { QualityStandardsSection } from "@/components/quality-standards-section";
import { SkillsSection } from "@/components/skills-section";
import { StatusBanner } from "@/components/status-banner";

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
      <EngineeringHighlights />
      <HiringProofSection />
      <QualityStandardsSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <GithubActivitySection />
      <ContactSection contactSuccess={contactSuccess} />
    </>
  );
}
