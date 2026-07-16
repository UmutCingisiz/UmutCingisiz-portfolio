import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { socialLinks } from "@/components/social-icons";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-muted/20 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              &copy; {year}. Next.js, Tailwind, Neon ve Redis ile full-stack portfolyo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => {
              const isMail = href.startsWith("mailto:");
              return (
                <Link
                  key={label}
                  href={href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-foreground/20 hover:text-foreground"
                  aria-label={label}
                >
                  <Icon className="size-[18px]" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap gap-4">
            <Link href="/projects" className="transition-colors hover:text-foreground">Projeler</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link>
            <Link href="/guestbook" className="transition-colors hover:text-foreground">Ziyaretçi Defteri</Link>
            <Link href="/#contact" className="transition-colors hover:text-foreground">İletişim</Link>
          </div>
          <p className="font-mono text-[0.65rem]">
            Next.js &middot; TypeScript &middot; Tailwind &middot; Neon &middot; Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
