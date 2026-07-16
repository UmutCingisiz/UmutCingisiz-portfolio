#!/usr/bin/env node
import { existsSync } from "fs";
import path from "path";

const root = process.cwd();
const assets = [
  {
    file: "public/profile.jpg",
    label: "Profil fotoğrafı",
    optional: false,
    hint: "Kopyala: scripts/install-assets.ps1 -Profile \"C:\\yol\\foto.jpg\"",
  },
  {
    file: "public/resume.pdf",
    label: "CV (PDF)",
    optional: false,
    hint: "Kopyala: scripts/install-assets.ps1 -Resume \"C:\\yol\\cv.pdf\"",
  },
];

let missing = 0;

console.log("\n Public varlık kontrolü\n");

for (const a of assets) {
  const full = path.join(root, a.file);
  const ok = existsSync(full);
  const mark = ok ? "✓" : "✗";
  console.log(`  ${mark} ${a.label} → ${a.file}`);
  if (!ok) {
    console.log(`      ${a.hint}`);
    missing++;
  }
}

console.log("");
if (missing === 0) {
  console.log("Adım 1 tamam — profil ve CV dosyaları mevcut.\n");
  process.exit(0);
}

console.log(
  `Eksik: ${missing} dosya. Hero'da fotoğraf yoksa GitHub avatarı; CV yoksa indirme uyarısı gösterilir.\n`,
);
process.exit(missing > 0 ? 1 : 0);
