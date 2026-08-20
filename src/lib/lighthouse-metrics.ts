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
    performance: 54,
    accessibility: 100,
    bestPractices: 100,
    seo: 100,
  },
  metrics: {
    lcp: "5.8 s",
    cls: "0.413",
    fcp: "2.8 s",
    tbt: "50 ms",
  },
  note: "PageSpeed lab f4ycwdhcxv · mobil. CLS: DeferredTerminalPrompt ssr:false; LCP: hero profil render delay. Düzeltmeler sonrası yeniden ölç.",
} as const;
