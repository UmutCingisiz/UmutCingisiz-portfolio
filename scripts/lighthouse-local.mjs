/**
 * Run mobile Lighthouse against LOCAL production build and print LCP.
 * Ensure to run 'npm run build' and 'npm run start' before executing this.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const outDir = path.join(".lighthouse");
const out = path.join(outDir, "local-projects.json");
const summaryPath = path.join(outDir, "local-projects.summary.json");
mkdirSync(outDir, { recursive: true });

const chromeCandidates = [
  process.env.CHROME_PATH,
  process.env.LOCALAPPDATA &&
    path.join(
      process.env.LOCALAPPDATA,
      "ms-playwright",
      "chromium-1228",
      "chrome-win64",
      "chrome.exe",
    ),
].filter(Boolean);

const chrome = chromeCandidates.find((p) => p && existsSync(p));
if (chrome) process.env.CHROME_PATH = chrome;

const result = spawnSync(
  "npx",
  [
    "--yes",
    "lighthouse@12.6.0",
    "http://127.0.0.1:3002/projects",
    "--only-categories=performance,accessibility,best-practices,seo",
    "--chrome-flags=--headless --no-sandbox",
    "--throttling-method=provided",
    "--output=json",
    `--output-path=${out}`,
    "--quiet",
  ],
  { stdio: "inherit", shell: true, env: process.env },
);

if (!existsSync(out)) {
  console.error("Lighthouse JSON missing — check Chrome availability.");
  process.exit(result.status ?? 1);
}

const report = JSON.parse(readFileSync(out, "utf8"));
const c = report.categories;
const summary = {
  measuredAt: new Date().toISOString().slice(0, 10),
  formFactor: report.configSettings?.formFactor ?? "mobile",
  performance: Math.round(c.performance.score * 100),
  accessibility: Math.round(c.accessibility.score * 100),
  bestPractices: Math.round(c["best-practices"].score * 100),
  seo: Math.round(c.seo.score * 100),
  lcp: report.audits["largest-contentful-paint"]?.displayValue,
  cls: report.audits["cumulative-layout-shift"]?.displayValue,
  fcp: report.audits["first-contentful-paint"]?.displayValue,
  tti: report.audits["interactive"]?.displayValue,
};

writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log("Local Projects Page Lighthouse Summary:");
console.log(summary);

if (parseFloat(summary.lcp) > 2.5) {
  console.error(`WARNING: LCP is ${summary.lcp}, which is over the 2.5s threshold!`);
  process.exit(1);
} else {
  console.log("LCP is well within the 2.5s threshold.");
}
