/**
 * Production Lighthouse snapshot (home).
 * Re-measure: `npm run lighthouse:home` then update this file.
 */
export const lighthouseHome = {
  url: "https://umutcingisiz.com/",
  /** ISO date of the measurement */
  measuredAt: "2026-08-20",
  formFactor: "mobile" as const,
  scores: {
    performance: 82,
    accessibility: 100,
    bestPractices: 100,
    seo: 100,
  },
  metrics: {
    lcp: "3.8 s",
    cls: "0",
    fcp: "2.4 s",
    tbt: "40 ms",
  },
  desktop: {
    scores: {
      performance: 85,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
    },
    metrics: {
      lcp: "0.8 s",
      cls: "0.262",
      fcp: "0.3 s",
      tbt: "90 ms",
    },
  },
  note: "PageSpeed lab kgsttvumli baseline: mobile Perf 82 / CLS 0; desktop Perf 85 / CLS 0.262 footer / A11y 96 contrast. Post-fix pending remeasure: contact SSR, github skeleton, terminal contrast, hero RSC photo, logo/ucmd a11y.",
} as const;
