import { HeroCopy } from "@/components/hero";
import { HeroProfilePhoto } from "@/components/hero-profile-photo";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/get-locale";
import { siteConfig } from "@/lib/site-config";

/**
 * Hero shell — profil fotoğrafı RSC (LCP); kopya client ada.
 */
export async function Hero() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const alt = `${siteConfig.name} ${dictionary.hero.profileAlt}`;

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-6">
        <HeroCopy />
        <HeroProfilePhoto alt={alt} />
      </div>
    </section>
  );
}
