import { cache } from "react";

import { getPostSlugs } from "@/lib/content/posts";

export const memoizedPostSlugSet = cache(() => new Set(getPostSlugs()));

export function isBlogPostSlug(slug: string): boolean {
  return memoizedPostSlugSet().has(slug);
}
