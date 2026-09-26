import { getAllProjectsMeta, getFeaturedProjects } from "@/lib/content/projects";
import { FeaturedProjectsList } from "./featured-projects-list";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects(3);
  const selected = new Set(projects.map((project) => project.slug));
  const others = (await getAllProjectsMeta()).filter((project) => !selected.has(project.slug));

  return <FeaturedProjectsList projects={projects} others={others} />;
}
