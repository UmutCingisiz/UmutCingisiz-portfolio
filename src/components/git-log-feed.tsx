"use client";

import { motion, useReducedMotion } from "motion/react";

export type GitLogEntry = {
  repo: string;
  language: string | null;
  url: string;
};

/**
 * Recent GitHub repos as an honest activity feed — not a fake `git log`
 * with invented SHAs (trust: North Star).
 */
export function GitLogFeed({ entries }: { entries: GitLogEntry[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl border border-signal/20 bg-[#070b0f]/90 shadow-[0_0_50px_rgba(0,0,0,0.4)] ring-1 ring-white/5 backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" aria-hidden />
        <span className="size-2.5 rounded-full bg-amber-400/80" aria-hidden />
        <span className="size-2.5 rounded-full bg-emerald-400/80" aria-hidden />
        <span className="ml-2 font-mono text-xs text-cyan-200/70">
          recent repos · GitHub API
        </span>
      </div>

      <div className="space-y-1 px-4 py-4 font-mono text-[0.8rem] leading-relaxed sm:text-sm">
        {entries.map((entry, index) => (
          <motion.a
            key={entry.url}
            href={entry.url}
            target="_blank"
            rel="noreferrer noopener"
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: -10 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="group flex flex-wrap items-center gap-x-2 gap-y-1 rounded px-1 py-0.5 transition-colors hover:bg-white/[0.04]"
          >
            <span className="text-cyan-100 group-hover:text-white">repo</span>
            <span className="text-emerald-400">{entry.repo}</span>
            {entry.language ? (
              <span className="ml-auto rounded border border-white/10 px-1.5 text-[0.65rem] text-cyan-200/60">
                {entry.language}
              </span>
            ) : null}
          </motion.a>
        ))}
        <div className="flex items-center gap-2 px-1 pt-2 text-cyan-200/70">
          <span className="text-emerald-400">$</span>
          <span
            className={`inline-block h-4 w-2 bg-cyan-300/70 ${
              prefersReducedMotion ? "" : "animate-pulse"
            }`}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
