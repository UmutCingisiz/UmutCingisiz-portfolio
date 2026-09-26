import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/get-locale";

type Props = {
  contactSuccess?: boolean;
};

export async function ContactSection({ contactSuccess = false }: Props) {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const t = dictionary.contact;

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
        <Reveal>
          <div>
            <SectionEyebrow>{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t.body}
            </p>

            <div className="mt-6 rounded-xl border border-signal/35 bg-signal/[0.07] p-4 shadow-[0_0_0_1px_rgba(34,211,238,0.08)] backdrop-blur-sm sm:p-5">
              <p className="font-mono text-[0.65rem] tracking-wide text-signal">
                direct.mail
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block break-all text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-signal"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="min-h-[28rem] rounded-xl border border-border bg-card/60 p-4 text-left backdrop-blur-sm sm:min-h-[26rem] sm:p-5">
            <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
              {contactSuccess ? t.receivedLabel : t.formLabel}
            </p>
            <ContactForm initialSuccess={contactSuccess} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
