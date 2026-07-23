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
      className="relative overflow-hidden scroll-mt-28 px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
        <Reveal>
          <div>
            <SectionEyebrow>contact.endpoint</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Proje, staj veya işbirliği için konuşalım.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Teknik detayları konuşmayı severim: kapsam, veri modeli, akış ve deploy. Kısa bir mesaj yeterli.
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
                {siteConfig.availability}
              </p>
            </div>
          </div>
        </Reveal>

        {contactSuccess ? (
          <div
            role="status"
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-5 text-sm text-foreground lg:col-start-2"
          >
            <p className="font-mono text-[0.65rem] tracking-wide text-emerald-400/90">
              contact.sent
            </p>
            <p className="mt-2 font-medium">
              Mesajın iletildi. En kısa sürede dönüş yapabilirim.
            </p>
            <p className="mt-2 text-muted-foreground">
              Aynı mesajı tekrar göndermene gerek yok. Doğrudan mail için{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="underline underline-offset-4 hover:text-foreground"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        ) : (
          <Reveal index={1}>
            <div className="rounded-xl border border-border bg-card/60 p-4 text-left backdrop-blur-sm sm:p-5">
              <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                secure.form
              </p>
              <ContactForm />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
