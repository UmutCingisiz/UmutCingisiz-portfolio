"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { openTerminal } from "@/lib/terminal";

const shell = siteConfig.terminal;

const quickHints = [
  { cmd: "show_projects()", hint: "Projeler" },
  { cmd: "blog", hint: "Blog" },
  { cmd: "contact", hint: "İletişim" },
] as const;

/**
 * Hero altı ucmd — soft neon imza yüzeyi.
 * Kontrolü glow + IDE chrome; ucuz template gürültüsü yok.
 */
export function TerminalPrompt() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative px-4 py-7 sm:px-6 sm:py-10"
      aria-label={`${shell.name} command shell`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-3.5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.16em] text-signal/80">
              interactive.shell
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-foreground sm:text-base">
              {shell.name} — power-user kabuğu
            </p>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-5 text-muted-foreground sm:block">
            Komutla gez. Keşfetmek için tıkla veya Ctrl&nbsp;`
          </p>
        </div>

        <motion.button
          type="button"
          onClick={openTerminal}
          aria-label={`${shell.name} terminalini aç`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          whileHover={
            prefersReducedMotion
              ? undefined
              : { y: -3, transition: { type: "spring", stiffness: 380, damping: 28 } }
          }
          whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
          className={[
            "group relative flex w-full flex-col overflow-hidden rounded-2xl text-left font-mono",
            "border border-cyan-500/30 bg-[#070b10]",
            "shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_0_28px_rgba(6,182,212,0.14),0_18px_48px_-20px_rgba(0,0,0,0.75)]",
            "transition-[border-color,box-shadow,transform] duration-300 ease-out",
            "hover:border-cyan-400/45",
            "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_0_40px_rgba(6,182,212,0.22),0_22px_56px_-18px_rgba(0,0,0,0.8)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          ].join(" ")}
        >
          {/* Üst neon çizgi */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
          />
          {/* Soft ambient — tek katman, abartısız */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-cyan-400/[0.07] blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-hover:bg-cyan-400/[0.11]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-12 size-44 rounded-full bg-signal/[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-90"
          />

          {/* macOS traffic lights + title */}
          <div className="relative flex items-center justify-between gap-3 border-b border-cyan-500/15 bg-[#0c1218]/90 px-3 py-2.5 sm:px-4">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.35)]" />
                <span className="size-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.3)]" />
                <span className="size-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.3)]" />
              </span>
              <span className="truncate text-[0.7rem] tracking-wide text-cyan-100/55">
                {shell.name}
                <span className="text-cyan-100/30"> · </span>
                zsh
                <span className="text-cyan-100/30"> · </span>v{shell.version}
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-2.5 py-1 text-[0.65rem] font-medium text-cyan-100/90 transition-colors duration-300 group-hover:border-cyan-300/40 group-hover:bg-cyan-400/[0.12]">
              <span
                className={[
                  "size-1.5 rounded-full bg-cyan-300",
                  prefersReducedMotion ? "" : "animate-pulse",
                ].join(" ")}
              />
              <span className="hidden sm:inline">Terminali aç</span>
              <kbd className="rounded border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 text-[0.6rem] text-cyan-100/85">
                Ctrl `
              </kbd>
            </span>
          </div>

          <div className="relative flex flex-col gap-4 px-4 py-5 sm:gap-5 sm:px-6 sm:py-6">
            <div className="flex min-w-0 items-center gap-2.5 text-sm sm:text-base">
              <span className="font-semibold text-emerald-400/95">$</span>
              <span className="truncate font-medium tracking-tight text-cyan-50/95 transition-colors duration-300 group-hover:text-white">
                show_projects()
              </span>
              <span
                className={[
                  "inline-block h-[1.05em] w-2 rounded-[1px] bg-cyan-300/90",
                  prefersReducedMotion ? "opacity-75" : "animate-pulse",
                ].join(" ")}
                aria-hidden
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {quickHints.map((item) => (
                <span
                  key={item.cmd}
                  className="rounded-lg border border-cyan-500/20 bg-cyan-400/[0.04] px-2.5 py-1.5 text-[0.65rem] text-cyan-100/70 transition-colors duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/[0.07] sm:text-xs"
                >
                  <span className="text-emerald-400/90">$</span> {item.cmd}
                  <span className="ml-1.5 text-cyan-200/40">{item.hint}</span>
                </span>
              ))}
            </div>

            <p className="text-xs leading-5 text-cyan-100/45 sm:text-[0.8rem]">
              {shell.tagline}. Sitenin komut yüzeyi — dokunarak veya{" "}
              <span className="text-cyan-100/70">Ctrl + `</span> ile açılır.
            </p>
          </div>
        </motion.button>
      </div>
    </section>
  );
}
