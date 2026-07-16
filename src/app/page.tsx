import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { HiringProofSection } from "@/components/hiring-proof-section";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <>
      <Hero />
      <HiringProofSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <ContactSection />
    </>
  );
}
