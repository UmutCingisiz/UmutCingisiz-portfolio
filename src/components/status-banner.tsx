import { siteConfig } from "@/lib/site-config";

type Props = {
  resumeMissing?: boolean;
  resumeLimited?: boolean;
};

export function StatusBanner({ resumeMissing, resumeLimited }: Props) {
  if (!resumeMissing && !resumeLimited) return null;

  if (resumeLimited) {
    return (
      <div
        role="status"
        className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-foreground"
      >
        CV indirme limiti aşıldı. Bir süre sonra tekrar dene veya{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-medium underline">
          e-posta ile iletişime geç
        </a>
        .
      </div>
    );
  }

  return (
    <div
      role="status"
      className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-foreground"
    >
      CV henüz yüklenmedi —{" "}
      <code className="rounded bg-muted px-1 font-mono text-xs">public/resume.pdf</code>{" "}
      dosyasını ekle veya{" "}
      <a href={`mailto:${siteConfig.email}`} className="font-medium underline">
        e-posta ile iletişime geç
      </a>
      .
    </div>
  );
}
