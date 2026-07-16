import { getFeaturedProjects } from "@/lib/content/projects";
import { FeaturedProjectsList } from "./featured-projects-list";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(2);

  return <FeaturedProjectsList projects={projects} />;
}
