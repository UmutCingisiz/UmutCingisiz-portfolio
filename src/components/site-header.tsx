"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { openTerminal } from "@/lib/terminal";
import { Logo } from "@/components/logo";
import { Magnetic } from "@/components/magnetic";
import { socialLinks } from "@/components/social-icons";

const MOBILE_NAV_ID = "mobile-primary-navigation";

const nav = [
  { href: "/", label: "Ana Sayfa", sectionId: null },
  { href: "/#about", label: "Hakkımda", sectionId: "about" },
  { href: "/#skills", label: "Yetenekler", sectionId: "skills" },
  { href: "/projects", label: "Projeler", sectionId: null },
  { href: "/blog", label: "Blog", sectionId: null },
  { href: "/guestbook", label: "Ziyaretçi Defteri", sectionId: null },
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

function useActiveHomeSection() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const ids = ["about", "skills", "projects", "hiring", "quality", "algorithm-lab", "github", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return activeSection;
}

function isNavCurrent(
  pathname: string,
  href: string,
  sectionId: string | null,
  activeSection: string | null,
) {
  if (href === "/") {
    return pathname === "/" && !activeSection;
  }
  if (sectionId) {
    return pathname === "/" && activeSection === sectionId;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const activeSection = useActiveHomeSection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 420,
    damping: 36,
    restDelta: 0.001,
  });

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const panel = mobilePanelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () => {
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
    };

    const items = focusables();
    items[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobile();
        return;
      }

      if (event.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background px-3 pt-3 pb-2 sm:px-5 sm:pt-4"
      >
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-2xl border px-3 transition-all duration-300 sm:h-16 sm:gap-3 sm:px-5 ${
            scrolled
              ? "border-border bg-background/80 shadow-xl shadow-black/30 backdrop-blur-2xl backdrop-saturate-150"
              : "border-border/50 bg-background/50 shadow-lg shadow-black/10 backdrop-blur-xl"
          }`}
        >
          <Link
            href="/"
            className="group relative z-10 inline-flex min-w-0 shrink items-center rounded-xl px-1 py-2 transition-opacity hover:opacity-80"
            aria-label={siteConfig.name}
          >
            <Logo className="text-sm sm:text-lg" />
          </Link>

          <nav
            className="hidden items-center gap-0.5 rounded-xl border border-border/70 bg-muted/30 p-1.5 lg:flex"
            aria-label="Ana navigasyon"
          >
            {nav.map((item, i) => {
              const current = isNavCurrent(
                pathname,
                item.href,
                item.sectionId,
                activeSection,
              );
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="group relative whitespace-nowrap rounded-lg px-3 py-2 text-[0.85rem] text-muted-foreground transition-all duration-200 hover:bg-muted/70 hover:text-foreground aria-[current=page]:bg-muted/70 aria-[current=page]:text-foreground"
                  >
                    {item.label}
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={openTerminal}
              className="group hidden items-center gap-2 rounded-xl border border-signal/30 bg-signal/[0.08] px-3 py-2 font-mono text-xs text-signal transition-all hover:border-signal/50 hover:bg-signal/[0.15] hover:shadow-[0_0_20px_var(--signal-glow)] xl:inline-flex"
              aria-label={`${siteConfig.terminal.name} terminalini aç (Ctrl+\`)`}
            >
              <TerminalIcon className="size-4" />
              <span className="font-bold tracking-wide">
                {siteConfig.terminal.name}
              </span>
              <kbd className="rounded border border-signal/30 bg-signal/10 px-1.5 py-0.5 text-[0.6rem]">
                Ctrl `
              </kbd>
            </button>

            {socialLinks.slice(0, 2).map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden size-9 items-center justify-center rounded-xl border border-border bg-card/45 text-muted-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-muted hover:text-foreground xl:inline-flex"
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="size-[18px]" />
              </motion.a>
            ))}

            <div className="hidden h-5 w-px bg-border xl:block" />

            <Magnetic className="hidden sm:inline-flex">
              <Link
                href="/#contact"
                className="btn-signal inline-flex rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200"
              >
                İletişim
              </Link>
            </Magnetic>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-foreground lg:hidden"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_NAV_ID}
            >
              {mobileOpen ? (
                <CloseIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>

        <div
          className="mx-auto mt-1.5 h-[2px] max-w-6xl overflow-hidden rounded-full bg-border/25"
          aria-hidden="true"
        >
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-signal via-signal to-emerald-400/80"
            style={{ scaleX: progress }}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            ref={mobilePanelRef}
            id={MOBILE_NAV_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-background/95 px-6 py-20 backdrop-blur-xl lg:hidden"
          >
            <nav
              className="mx-auto flex min-h-full max-w-sm flex-col items-stretch justify-center gap-3"
              aria-label="Mobil navigasyon"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href="/#contact"
                  onClick={closeMobile}
                  className="btn-signal flex h-12 items-center justify-center rounded-xl text-base font-semibold"
                >
                  İletişim
                </Link>
              </motion.div>

              <div className="my-2 h-px bg-border" />

              {nav.map((item, i) => {
                const current = isNavCurrent(
                  pathname,
                  item.href,
                  item.sectionId,
                  activeSection,
                );
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, delay: 0.04 * i }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      aria-current={current ? "page" : undefined}
                      className="flex h-12 items-center justify-center rounded-xl border border-border/70 bg-card/40 text-lg font-medium text-foreground transition-colors hover:bg-muted aria-[current=page]:border-signal/40 aria-[current=page]:text-signal"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.35 }}
                className="mt-4 flex items-center justify-center gap-4"
              >
                {socialLinks.slice(0, 2).map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={label}
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
