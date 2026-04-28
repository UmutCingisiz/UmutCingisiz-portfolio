import Link from "next/link";

export const metadata = {
  title: "Ziyaretçi defteri",
  description: "GitHub OAuth ile ziyaretçi mesajları — Faz 3.",
};

export default function GuestbookPage() {
  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Ziyaretçi defteri
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Auth.js v5, Neon ve moderasyon akışı{" "}
        <strong className="text-foreground">Faz 3</strong> kapsamında
        uygulanacak.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm font-medium text-accent hover:underline"
      >
        ← Ana sayfa
      </Link>
    </div>
  );
}
