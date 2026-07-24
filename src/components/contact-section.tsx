import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

type Props = {
  contactSuccess?: boolean;
};

export function ContactSection({ contactSuccess = false }: Props) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden scroll-mt-28 px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
        <Reveal>
          <div>
            <SectionEyebrow>contact.endpoint</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              İletişim
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              İş teklifleri, staj ve proje işbirlikleri için buradan veya e-posta
              üzerinden ulaşabilirsiniz. Mesajınıza mümkün olan en kısa sürede
              dönüş yaparım.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm sm:p-5">
              <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                direct.mail
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block break-all text-base font-semibold text-foreground hover:underline"
              >
                {siteConfig.email}
              </a>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {siteConfig.availabilityLabel} · {siteConfig.availabilityDetail}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="rounded-xl border border-border bg-card/60 p-4 text-left backdrop-blur-sm sm:p-5">
            <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
              {contactSuccess ? "message.received" : "secure.form"}
            </p>
            <ContactForm initialSuccess={contactSuccess} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
