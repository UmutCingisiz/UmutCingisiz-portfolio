import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { Hero } from "@/components/hero";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <ContactSection />
    </>
  );
}
