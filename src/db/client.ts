import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

type AppDb = ReturnType<typeof drizzle<typeof schema>>;

let dbSingleton: AppDb | null = null;

export function getDb(): AppDb | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;
  if (!dbSingleton) {
    dbSingleton = drizzle(neon(url), { schema });
  }
  return dbSingleton;
}

export function requireDb(): AppDb {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL eksik.");
  return db;
}
