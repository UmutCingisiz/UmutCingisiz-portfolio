"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/logo";
import { Magnetic } from "@/components/magnetic";
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

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3" />
      <path d="M13 15h4" />
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
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/80 backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-background/45 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            className="group relative z-10 inline-flex shrink-0 items-center rounded-xl px-1 py-2 transition-opacity hover:opacity-80"
            aria-label={siteConfig.name}
          >
            <Logo className="text-base sm:text-lg" />
          </Link>

          <nav
            className="hidden items-center gap-0.5 rounded-2xl border border-border bg-card/50 p-1.5 shadow-lg shadow-black/5 backdrop-blur-md md:flex"
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
                  className="group relative rounded-xl px-3.5 py-2.5 text-[0.9rem] text-muted-foreground transition-all duration-200 hover:bg-muted/70 hover:text-foreground"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "`", code: "Backquote", ctrlKey: true }))}
              className="group hidden items-center gap-2 rounded-xl border border-signal/30 bg-signal/[0.08] px-3 py-2.5 font-mono text-xs text-signal transition-all hover:border-signal/50 hover:bg-signal/[0.15] hover:shadow-[0_0_20px_var(--signal-glow)] lg:inline-flex"
              aria-label="Terminali aç"
            >
              <TerminalIcon className="size-4" />
              <span>terminal</span>
              <kbd className="rounded border border-signal/30 bg-signal/10 px-1.5 py-0.5 text-[0.6rem]">Ctrl `</kbd>
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

            <Magnetic className="hidden sm:inline-flex">
              <Link
                href="/#contact"
                className="btn-signal inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200"
              >
                İletişim
              </Link>
            </Magnetic>

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
