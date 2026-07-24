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
      className="relative overflow-hidden scroll-mt-28 px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
        <Reveal>
          <div>
            <SectionEyebrow>{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {dictionary.hero.availabilityDetail}. {t.body}
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
                {dictionary.hero.availabilityLabel} ·{" "}
                {dictionary.hero.availabilityDetail}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="rounded-xl border border-border bg-card/60 p-4 text-left backdrop-blur-sm sm:p-5">
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
