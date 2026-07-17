"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/theme-toggle";
import { socialLinks } from "@/components/social-icons";

const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/#about", label: "Hakkımda" },
  { href: "/#skills", label: "Yetenekler" },
  { href: "/projects", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/guestbook", label: "Ziyaretçi Defteri" },
] as const;

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/72 backdrop-blur-2xl"
            : "bg-background/35 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group relative z-10 inline-flex shrink-0 items-center gap-2 rounded-2xl border border-border bg-card/55 px-2.5 py-2 text-sm font-bold tracking-tight text-foreground shadow-lg shadow-black/5 transition-all hover:border-foreground/20"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              {siteConfig.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
            </span>
            <span className="hidden leading-tight sm:block">
              {siteConfig.name.split(" ")[0]}
              <span className="block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                engineer
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center rounded-2xl border border-border bg-card/45 p-1 shadow-lg shadow-black/5 md:flex"
            aria-label="Ana navigasyon"
          >
            {nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <Link
                  href={item.href}
                  className="group relative rounded-xl px-3.5 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted/70 hover:text-foreground"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-foreground/60 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "`", code: "Backquote", ctrlKey: true }))}
              className="hidden rounded-xl border border-border bg-card/45 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground lg:inline-flex"
              aria-label="Gizli terminali aç"
            >
              Ctrl + `
            </button>

            {socialLinks.slice(0, 2).map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden size-10 items-center justify-center rounded-xl border border-border bg-card/45 text-muted-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-muted hover:text-foreground md:inline-flex"
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="size-[18px]" />
              </motion.a>
            ))}

            <div className="hidden h-5 w-px bg-border md:block" />

            <ThemeToggle />

            <Link
              href="/#contact"
              className="btn-signal hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:inline-flex"
            >
              İletişim
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
              aria-label="Menü"
            >
              {mobileOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-6" aria-label="Mobil navigasyon">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium text-foreground transition-colors hover:text-muted-foreground"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 h-px w-16 bg-border" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-signal rounded-lg px-6 py-3 text-lg font-semibold"
                >
                  İletişim
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                {socialLinks.slice(0, 2).map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={label}
                  >
                    <Icon className="size-6" />
                  </a>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
