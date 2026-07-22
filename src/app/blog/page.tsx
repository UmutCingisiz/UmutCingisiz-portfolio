import Link from "next/link";
import type { Metadata } from "next";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { pageSocial } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Blog",
  description: "Teknik yazılar — MDX, kod vurgusu ve okuma süresi.",
  ...pageSocial("/blog", {
    title: "Blog",
    description: "Teknik yazılar — MDX, kod vurgusu ve okuma süresi.",
  }),
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <BlogPostList />

      <Link
        href="/"
        className="mt-12 inline-block text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Ana sayfa
      </Link>
    </div>
  );
}
