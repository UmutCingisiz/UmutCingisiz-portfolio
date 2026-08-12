import { getFeaturedProjects } from "@/lib/content/projects";
import { FeaturedProjectsList } from "./featured-projects-list";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects(3);

  return <FeaturedProjectsList projects={projects} />;
}
