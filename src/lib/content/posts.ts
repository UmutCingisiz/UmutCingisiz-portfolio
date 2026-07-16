import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";
import { postFrontmatterSchema, type PostFrontmatter } from "@/lib/content/schema";
import { BLOG_DIR } from "@/lib/content/paths";

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

const parsePostFile = cache((file: string): PostMeta | null => {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = postFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`Geçersiz frontmatter: blog/${file}`, parsed.error.flatten());
    return null;
  }
  const slug = file.replace(/\.mdx$/u, "");
  const rt = readingTime(content);
  return {
    ...parsed.data,
    slug,
    readingMinutes: Math.max(1, Math.ceil(rt.minutes)),
  };
});

const readAllPostsMeta = cache((): PostMeta[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const items = files.map(parsePostFile).filter((x): x is PostMeta => x !== null);
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
});

export function getAllPostsMeta(): PostMeta[] {
  return readAllPostsMeta();
}

export function getPostMetaBySlug(slug: string): PostMeta | null {
  if (!getPostSlugs().includes(slug)) return null;
  const file = `${slug}.mdx`;
  const fp = path.join(BLOG_DIR, file);
  if (!fs.existsSync(fp)) return null;
  return parsePostFile(file);
}

export function getPostSlugs(): string[] {
  return getAllPostsMeta().map((p) => p.slug);
}
