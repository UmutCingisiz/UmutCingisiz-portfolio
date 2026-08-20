"use client";

import Link from "next/link";
import { ContactLink } from "@/components/contact-link";
import { useI18n } from "@/i18n/locale-provider";
import { siteConfig } from "@/lib/site-config";
import { socialLinks } from "@/components/social-icons";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 2.5v7.5M5 7.5l3 3 3-3" />
      <path d="M3 13.5h10" />
    </svg>
  );
}

/** Client ada — metin / CTA; profil fotoğrafı RSC’de ayrı. */
export function HeroCopy() {
  const { dictionary } = useI18n();

  return (
    <>
      <div className="order-1 lg:col-start-1 lg:row-start-1">
        <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] py-1 pl-2 pr-3 text-xs font-medium text-foreground/90">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[0.7rem] tracking-wide text-emerald-500 dark:text-emerald-400">
            {dictionary.hero.availabilityLabel}
          </span>
          <span className="text-muted-foreground">
            · {dictionary.hero.availabilityDetail}
          </span>
        </div>

        <p className="mt-5 font-mono text-[0.7rem] tracking-wide text-muted-foreground sm:mt-6 sm:text-xs">
          {dictionary.hero.role}
        </p>

        <h1 className="mt-2 text-balance text-3xl font-bold tracking-[-0.04em] text-foreground sm:mt-3 sm:text-5xl lg:text-6xl">
          {siteConfig.name}
        </h1>

        <p className="mt-3 max-w-xl text-pretty text-base font-semibold tracking-tight text-foreground/90 sm:text-xl lg:text-2xl">
          {dictionary.hero.headline}
        </p>

        <p className="mt-4 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:leading-7">
          {dictionary.hero.shortBio}
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <a
            href="/api/resume?v=1.1"
            download="Umut-Cingisiz-CV.pdf"
            className="btn-signal group order-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 sm:order-3 sm:h-11 sm:w-auto sm:justify-start"
          >
            <DownloadIcon className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            {dictionary.hero.downloadCv}
          </a>
          <ContactLink className="btn-outline-rise group order-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold sm:order-1 sm:h-11 sm:w-auto sm:justify-start sm:px-5">
            {dictionary.hero.contact}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </ContactLink>
          <Link
            href="/projects"
            className="btn-outline-rise group order-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold sm:order-2 sm:h-11 sm:w-auto sm:justify-start sm:px-5"
          >
            {dictionary.hero.viewProjects}
            <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card/45 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground sm:size-10"
              aria-label={label}
            >
              <Icon className="size-[17px]" />
            </a>
          ))}
        </div>
      </div>

      <ul
        className="order-3 flex flex-wrap items-center gap-x-4 gap-y-2 lg:col-start-1 lg:row-start-2"
        aria-label={dictionary.hero.statsAria}
      >
        {dictionary.hero.stats.map((stat) => (
          <li
            key={stat.label}
            className="inline-flex items-baseline gap-1.5 text-xs text-muted-foreground"
          >
            <span className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
              {stat.label}
            </span>
            <span className="font-medium text-foreground">{stat.value}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
