import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/**
 * LCP adayı — Server Component; Motion / client state yok.
 * Sabit aspect kutusu CLS’yi önler; priority + preload ile render delay kısalır.
 */
export function HeroProfilePhoto({ alt }: { alt: string }) {
  return (
    <div className="relative order-2 mx-auto w-full max-w-[280px] sm:max-w-sm lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-md lg:justify-self-end">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={siteConfig.profileImage}
          alt={alt}
          fill
          priority
          fetchPriority="high"
          quality={65}
          sizes="(max-width: 639px) 280px, (max-width: 1023px) 384px, 448px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
