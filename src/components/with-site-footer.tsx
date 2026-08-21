import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

/**
 * Footer’ı root layout shell’ine koymuyoruz: RSC stream’de children’dan önce
 * boyanıp main dolunca 0.26 CLS üretiyordu. Sayfa içeriğinin sonunda render et.
 */
export function withSiteFooter(children: ReactNode) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}
