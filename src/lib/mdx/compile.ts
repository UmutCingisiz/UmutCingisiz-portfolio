import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { BLOG_DIR, PROJECTS_DIR } from "@/lib/content/paths";
import { getPostSlugs } from "@/lib/content/posts";
import { getProjectSlugs } from "@/lib/content/projects";
import type { PostFrontmatter, ProjectFrontmatter } from "@/lib/content/schema";

const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
} as const;

export async function compileProjectMDX(slug: string) {
  if (!getProjectSlugs().includes(slug)) return null;
  const fp = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  const raw = fs.readFileSync(fp, "utf8");
  return compileMDX<ProjectFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });
}

export async function compilePostMDX(slug: string) {
  if (!getPostSlugs().includes(slug)) return null;
  const fp = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  const raw = fs.readFileSync(fp, "utf8");
  return compileMDX<PostFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });
}
