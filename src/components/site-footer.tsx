import Link from "next/link";
import { ContactLink } from "@/components/contact-link";
import { siteConfig } from "@/lib/site-config";
import { socialLinks } from "@/components/social-icons";
import { getSiteOrigin } from "@/lib/site-url";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const origin = getSiteOrigin();
  let hostLabel = "umutcingisiz.com";
  try {
    hostLabel = new URL(origin).host.replace(/^www\./, "");
  } catch {
    /* keep fallback */
  }

  return (
    <footer className="border-t border-border bg-muted/20 py-10 sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:gap-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              {siteConfig.name}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              <a
                href={origin}
                className="transition-colors hover:text-foreground"
                rel="me"
              >
                {hostLabel}
              </a>
              {" · "}
              <a
                href={siteConfig.github}
                className="transition-colors hover:text-foreground"
                rel="me noreferrer noopener"
                target="_blank"
              >
                @{siteConfig.githubUsername}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              &copy; {year} {siteConfig.name}
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
            <Link href="/#about" className="transition-colors hover:text-foreground">
              Hakkımda
            </Link>
            <Link href="/projects" className="transition-colors hover:text-foreground">
              Projeler
            </Link>
            <Link href="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <Link href="/guestbook" className="transition-colors hover:text-foreground">
              Ziyaretçi Defteri
            </Link>
            <ContactLink className="transition-colors hover:text-foreground">
              İletişim
            </ContactLink>
            <a
              href="/api/resume"
              download
              className="transition-colors hover:text-foreground"
            >
              CV indir
            </a>
          </div>
          <p className="font-mono text-[0.65rem]">Next.js · TypeScript · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
