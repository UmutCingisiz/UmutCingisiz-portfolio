"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { openTerminal } from "@/lib/terminal";
import { ContactLink } from "@/components/contact-link";
import { Logo } from "@/components/logo";
import { socialLinks } from "@/components/social-icons";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useI18n } from "@/i18n/locale-provider";

const MOBILE_NAV_ID = "mobile-primary-navigation";

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

const HOME_SECTION_IDS = [
  "about",
  "projects",
  "skills",
  "hiring",
  "github",
  "contact",
] as const;

/**
 * Sticky header altındaki bir “okuma çizgisi”ne göre aktif section.
 * IntersectionRatio sıralaması uzun section’larda (skills) yanlışlıkla
 * bir önceki id’yi (about) seçebiliyordu.
 */
function useActiveHomeSection() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(null);
      return;
    }

    const syncFromHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id && HOME_SECTION_IDS.includes(id as (typeof HOME_SECTION_IDS)[number])) {
        setActiveSection(id);
        return true;
      }
      return false;
    };

    const updateFromScroll = () => {
      // Header (~4.5–5.5rem) + biraz nefes; çizginin içindeki son section kazanır
      const marker = Math.min(140, Math.round(window.innerHeight * 0.22));
      let current: string | null = null;

      for (const id of HOME_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }

      // Sayfa en üstteyken hiçbir section çizgiyi geçmemişse home
      if (window.scrollY < 48) {
        setActiveSection(null);
        return;
      }

      setActiveSection(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        updateFromScroll();
      });
    };

    const onHashChange = () => {
      if (!syncFromHash()) updateFromScroll();
    };

    // Hash ile gelindiyse hemen işaretle; scroll settle sonrası doğrula
    syncFromHash();
    updateFromScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return pathname === "/" ? activeSection : null;
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
  const { dictionary } = useI18n();
  const activeSection = useActiveHomeSection();
  const [activeOverride, setActiveOverride] = useState<string | null>(null);
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

  const resolvedActive = activeOverride ?? activeSection;

  useEffect(() => {
    // Scroll spy hedefe yetişince click override’ı bırak
    if (activeOverride && activeSection === activeOverride) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveOverride(null);
    }
  }, [activeSection, activeOverride]);

  const nav = [
    { href: "/", label: dictionary.nav.home, short: dictionary.nav.home, sectionId: null as string | null },
    { href: "/#about", label: dictionary.nav.about, short: dictionary.nav.about, sectionId: "about" },
    { href: "/projects", label: dictionary.nav.projects, short: dictionary.nav.projects, sectionId: null },
    { href: "/#skills", label: dictionary.nav.skills, short: dictionary.nav.skills, sectionId: "skills" },
    { href: "/blog", label: dictionary.nav.blog, short: dictionary.nav.blog, sectionId: null },
    {
      href: "/guestbook",
      label: dictionary.nav.guestbook,
      short: dictionary.nav.guestbookShort,
      sectionId: null,
    },
  ] as const;

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
    if (!mobileOpen) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  useFocusTrap(mobilePanelRef, {
    active: mobileOpen,
    onEscape: closeMobile,
    restoreFocusRef: menuButtonRef,
  });

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background px-3 pt-3 pb-2 sm:px-5 sm:pt-4"
      >
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-2xl border px-2.5 transition-all duration-300 sm:h-16 sm:gap-3 sm:px-4 ${
            scrolled
              ? "border-border bg-background/90 backdrop-blur-md"
              : "border-border/70 bg-background/80"
          }`}
        >
          <Link
            href="/"
            className="group relative z-10 inline-flex h-full shrink-0 items-center self-stretch rounded-xl px-0.5 transition-opacity hover:opacity-80"
          >
            {/* Görünür metin = erişilebilir ad (aria-label mismatch önlenir). */}
            <Logo className="text-sm sm:text-base" />
          </Link>

          <nav
            className="mx-auto hidden min-w-0 items-center gap-0.5 rounded-xl border border-border/70 bg-muted/30 p-1 lg:flex"
            aria-label={dictionary.nav.ariaMain}
          >
            {nav.map((item, i) => {
              const current = isNavCurrent(
                pathname,
                item.href,
                item.sectionId,
                resolvedActive,
              );
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="min-w-0"
                >
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    title={item.label}
                    onClick={() => {
                      if (item.sectionId) setActiveOverride(item.sectionId);
                      else if (item.href === "/") setActiveOverride(null);
                    }}
                    className="group relative inline-flex whitespace-nowrap rounded-lg px-1.5 py-1.5 text-[0.72rem] text-muted-foreground transition-all duration-200 hover:bg-muted/70 hover:text-foreground aria-[current=page]:bg-muted/70 aria-[current=page]:text-foreground xl:px-2.5 xl:text-[0.8rem]"
                  >
                    <span className="xl:hidden">{item.short}</span>
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="absolute inset-x-2 bottom-0.5 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={openTerminal}
              className="group inline-flex items-center gap-1.5 rounded-xl border border-border px-2.5 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground sm:gap-2 sm:px-3"
              aria-label={`${siteConfig.terminal.name} terminalini aç`}
            >
              <TerminalIcon className="size-4" />
              <span className="font-bold tracking-wide">
                {siteConfig.terminal.name}
              </span>
              <kbd className="hidden rounded border border-signal/30 bg-signal/10 px-1.5 py-0.5 text-[0.6rem] 2xl:inline">
                Ctrl `
              </kbd>
            </button>

            <ContactLink className="btn-signal hidden rounded-lg px-3 py-1.5 text-xs font-semibold sm:inline-flex xl:rounded-xl xl:px-3.5 xl:py-2 xl:text-sm">
              {dictionary.nav.contact}
            </ContactLink>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-foreground lg:hidden"
              aria-label={
                mobileOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu
              }
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
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
            className="h-full origin-left rounded-full bg-foreground/70"
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
            aria-label={dictionary.nav.openMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-background/95 px-4 pb-10 pt-20 backdrop-blur-xl sm:px-6 lg:hidden"
          >
            <nav
              className="mx-auto flex min-h-full max-w-sm flex-col items-stretch justify-center gap-3"
              aria-label={dictionary.nav.ariaMain}
            >
              <button
                type="button"
                onClick={closeMobile}
                className="mb-2 ml-auto inline-flex size-11 items-center justify-center rounded-xl border border-border bg-card/60 text-foreground transition-colors hover:bg-muted"
                aria-label={dictionary.nav.closeMenu}
              >
                <CloseIcon className="size-5" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ContactLink
                  onNavigate={closeMobile}
                  className="btn-signal flex h-12 items-center justify-center rounded-xl text-base font-semibold"
                >
                  {dictionary.nav.contact}
                </ContactLink>
              </motion.div>

              <div className="my-2 h-px bg-border" />

              {nav.map((item, i) => {
                const current = isNavCurrent(
                  pathname,
                  item.href,
                  item.sectionId,
                  resolvedActive,
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
                      onClick={() => {
                        if (item.sectionId) setActiveOverride(item.sectionId);
                        else if (item.href === "/") setActiveOverride(null);
                        closeMobile();
                      }}
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
                {socialLinks
                  .filter((item) => item.label === "GitHub" || item.label === "LinkedIn")
                  .map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobile}
                      className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={label}
                    >
                      <Icon className="size-5" />
                      {label}
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
