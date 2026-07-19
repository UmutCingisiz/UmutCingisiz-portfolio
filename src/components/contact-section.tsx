import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

type Props = {
  contactSuccess?: boolean;
};

export function ContactSection({ contactSuccess }: Props) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="ambient-orb left-1/2 top-0 size-80 -translate-x-1/2 opacity-15 [animation-delay:4s]" />
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <div>
            <SectionEyebrow>contact.endpoint</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Proje, staj veya işbirliği için konuşalım.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Teknik detayları konuşmayı severim: kapsam, veri modeli, kullanıcı
              akışı, deploy ve sürdürülebilirlik. Kısa bir mesaj yeterli.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                direct.mail
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block text-lg font-semibold text-foreground hover:underline"
              >
                {siteConfig.email}
              </a>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {siteConfig.availability}
              </p>
            </div>
          </div>
        </Reveal>

        {contactSuccess ? (
          <p
            role="status"
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-foreground lg:col-start-2"
          >
            Mesajın iletildi. En kısa sürede dönüş yapabilirim.
          </p>
        ) : null}

        <Reveal index={1}>
          <div className="rounded-xl border border-border bg-card/60 p-6 text-left backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              secure.form
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
