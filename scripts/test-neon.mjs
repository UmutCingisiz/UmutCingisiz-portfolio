import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url?.trim()) {
  console.error("DATABASE_URL yok");
  process.exit(1);
}

const sql = neon(url);

try {
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN ('guestbook_entry', 'contact_submission_guard')
    ORDER BY table_name
  `;
  const names = tables.map((r) => r.table_name);
  const need = ["guestbook_entry", "contact_submission_guard"];
  const missing = need.filter((t) => !names.includes(t));

  if (missing.length) {
    console.error("Eksik tablolar:", missing.join(", "));
    console.error("Neon SQL Editor'de guestbook-schema.sql ve contact-schema.sql çalıştır.");
    process.exit(1);
  }

  console.log("Neon bağlantısı OK");
  console.log("Tablolar:", names.join(", "));
} catch (e) {
  console.error("Neon hatası:", e instanceof Error ? e.message : e);
  process.exit(1);
}
