"use client";

import { motion, useReducedMotion } from "motion/react";

export type GitLogEntry = {
  repo: string;
  language: string | null;
  url: string;
};

/**
 * Attractive, honest recent-repos feed from GitHub API — not fake git SHAs.
 */
export function GitLogFeed({ entries }: { entries: GitLogEntry[] }) {
  const prefersReducedMotion = useReducedMotion();

  if (entries.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-signal/25 bg-[#070b0f] shadow-[0_0_40px_rgba(34,211,238,0.08)] ring-1 ring-white/5">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-gradient-to-r from-cyan-400/10 via-transparent to-transparent px-4 py-3">
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyan-200/80 sm:text-xs">
          live.feed · GitHub API
        </span>
        <span className="ml-auto rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[0.6rem] text-emerald-300">
          no fake SHA
        </span>
      </div>

      <ul className="divide-y divide-white/5 px-2 py-2 font-mono text-[0.8rem] sm:px-3 sm:text-sm">
        {entries.map((entry, index) => (
          <li key={entry.url}>
            <motion.a
              href={entry.url}
              target="_blank"
              rel="noreferrer noopener"
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: -8 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="group flex items-center gap-2 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/[0.04] sm:px-3"
            >
              <span className="text-cyan-200/50">›</span>
              <span className="text-cyan-100/70">repo</span>
              <span className="truncate font-medium text-emerald-400 group-hover:text-emerald-300">
                {entry.repo}
              </span>
              {entry.language ? (
                <span className="ml-auto shrink-0 rounded border border-white/10 px-1.5 py-0.5 text-[0.65rem] text-cyan-200/55">
                  {entry.language}
                </span>
              ) : (
                <span className="ml-auto" />
              )}
            </motion.a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 font-mono text-xs text-cyan-200/60">
        <span className="text-emerald-400">$</span>
        <span>gh api user/repos --sort=pushed</span>
        <span
          className={`inline-block h-3.5 w-1.5 bg-cyan-300/80 ${
            prefersReducedMotion ? "" : "animate-pulse"
          }`}
          aria-hidden
        />
      </div>
    </div>
  );
}
