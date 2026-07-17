#!/usr/bin/env node
/**
 * Hangi ortam değişkenlerinin dolu olduğunu kontrol eder (değerleri yazdırmaz).
 * Kullanım: node scripts/check-env.mjs
 * .env.local yüklü değilse: dotenv yok — Next.js dev/build kendi yükler;
 * bu script için:  node --env-file=.env.local scripts/check-env.mjs  (Node 20+)
 */

const groups = [
  {
    label: "Site",
    keys: ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_GITHUB_USERNAME"],
    required: true,
  },
  {
    label: "Auth (Ziyaretçi defteri)",
    keys: ["AUTH_SECRET", "AUTH_URL", "AUTH_GITHUB_ID", "AUTH_GITHUB_SECRET"],
    required: true,
  },
  {
    label: "Neon",
    keys: ["DATABASE_URL"],
    required: true,
  },
  {
    label: "Guestbook moderasyon",
    keys: ["GUESTBOOK_ADMIN_GITHUB_IDS"],
    required: true,
  },
  {
    label: "Guestbook limit (varsayılan yeterli)",
    keys: ["GUESTBOOK_RATE_PER_MINUTE", "GUESTBOOK_RATE_PER_DAY"],
    required: false,
  },
  {
    label: "Upstash (blog sayacı + CV)",
    keys: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
    required: false,
  },
  {
    label: "Resend (iletişim formu)",
    keys: ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_NOTIFY_EMAIL"],
    required: false,
  },
  {
    label: "Observability (production hata takibi)",
    keys: ["OBSERVABILITY_PROVIDER", "OBSERVABILITY_DSN"],
    required: false,
  },
];

function isSet(key) {
  const v = process.env[key];
  return typeof v === "string" && v.trim().length > 0;
}

let missingRequired = 0;

console.log("\n Ortam değişkeni kontrolü\n");

for (const g of groups) {
  console.log(`▸ ${g.label}`);
  for (const key of g.keys) {
    const ok = isSet(key);
    const mark = ok ? "✓" : "✗";
    const req = g.required && !ok ? " (gerekli)" : "";
    console.log(`  ${mark} ${key}${req}`);
    if (g.required && !ok) missingRequired++;
  }
  console.log("");
}

if (missingRequired > 0) {
  console.log(
    `Eksik zorunlu alan: ${missingRequired}. env.local.template → .env.local kopyala ve docs/MANUEL-ADIMLAR.md oku.\n`,
  );
  process.exit(1);
}

console.log("Zorunlu alanlar dolu görünüyor.\n");
