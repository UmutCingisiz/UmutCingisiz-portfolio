import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { HiddenTerminal } from "@/components/hidden-terminal";
import { NetworkStatus } from "@/components/network-status";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { SkipToContent } from "@/components/skip-to-content";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/get-locale";
import { LocaleProvider } from "@/i18n/locale-provider";
import { siteGraphJsonLd } from "@/lib/json-ld";
import { getSiteMetadata } from "@/lib/site-metadata";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-face",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

export const metadata = getSiteMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`dark ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <JsonLd data={siteGraphJsonLd()} />
          <SkipToContent />
          <SiteHeader />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
          <HiddenTerminal />
          <NetworkStatus />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <Suspense fallback={null}>
            <SpeedInsights />
          </Suspense>
        </LocaleProvider>
      </body>
    </html>
  );
}
