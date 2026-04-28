import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border bg-muted/40 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Hakkımda
        </h2>
        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
          {siteConfig.description}
        </p>
      </div>
    </section>
  );
}
