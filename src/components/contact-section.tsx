import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          İletişim
        </h2>
        <p className="mt-3 text-muted-foreground">
          Bir proje veya işbirliği fikrin varsa yaz — sunucu tarafı form (Faz 3+) için yer açık.
        </p>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left shadow-sm">
          <p className="text-sm font-medium text-foreground">E-posta</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-1 block text-accent hover:underline"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
