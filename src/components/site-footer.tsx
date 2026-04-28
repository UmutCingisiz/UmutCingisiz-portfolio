import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-muted/30 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {year} {siteConfig.name}. Next.js & Tailwind ile.
        </p>
        <div className="flex gap-4 text-sm">
          <Link
            href={siteConfig.github}
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.linkedin}
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            LinkedIn
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            E-posta
          </a>
        </div>
      </div>
    </footer>
  );
}
