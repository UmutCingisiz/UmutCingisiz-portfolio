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

/** Same-tag posts for related reading; falls back to newest if no tag overlap. */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getPostMetaBySlug(slug);
  if (!current) return [];

  const tagSet = new Set(current.tags);
  const others = getAllPostsMeta().filter((p) => p.slug !== slug);

  const scored = others
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => tagSet.has(tag)).length,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });

  const related = scored.filter((x) => x.score > 0).map((x) => x.post);
  if (related.length >= limit) return related.slice(0, limit);

  const seen = new Set(related.map((p) => p.slug));
  for (const { post } of scored) {
    if (seen.has(post.slug)) continue;
    related.push(post);
    if (related.length >= limit) break;
  }
  return related;
}
