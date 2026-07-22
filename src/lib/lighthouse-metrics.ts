/**
 * Production Lighthouse snapshot (home).
 * Re-measure: `npm run lighthouse:home` then update this file.
 */
export const lighthouseHome = {
  url: "https://umutcingisiz.com/",
  /** ISO date of the measurement */
  measuredAt: "2026-07-22",
  formFactor: "mobile" as const,
  scores: {
    performance: 53,
    accessibility: 93,
    bestPractices: 100,
    seo: 100,
  },
  metrics: {
    lcp: "3.9 s",
    cls: "0.408",
  },
  note: "Mobil emülasyon · production. Checklist hedefleri korunur; skorlar tarihli ölçüm.",
} as const;
