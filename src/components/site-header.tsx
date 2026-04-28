"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site-config";

const nav = [
  { href: "/#about", label: "Hakkımda" },
  { href: "/#skills", label: "Yetenekler" },
  { href: "/#projects", label: "Öne çıkanlar" },
  { href: "/projects", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/guestbook", label: "Ziyaretçi defteri" },
  { href: "/#contact", label: "İletişim" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-semibold tracking-tight text-foreground"
        >
          <span className="font-mono text-sm text-accent">{`<`}</span>
          {siteConfig.name.split(" ")[0]}
          <span className="font-mono text-sm text-accent">{` />`}</span>
        </Link>
        <nav
          className="hidden items-center gap-1 overflow-x-auto md:flex md:flex-wrap md:justify-end"
          aria-label="Ana navigasyon"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
      <nav
        className="flex gap-1 overflow-x-auto border-t border-border px-4 pb-3 md:hidden"
        aria-label="Mobil navigasyon"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-md px-2 py-1.5 text-xs text-muted-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
