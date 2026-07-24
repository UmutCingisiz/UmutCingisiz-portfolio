"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ContactLink } from "@/components/contact-link";
import { useI18n } from "@/i18n/locale-provider";
import { getGithubAvatarUrl, getGithubUsername } from "@/lib/github-username";
import { siteConfig } from "@/lib/site-config";
import { socialLinks } from "@/components/social-icons";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2.5v7.5M5 7.5l3 3 3-3" />
      <path d="M3 13.5h10" />
    </svg>
  );
}

type ProfileImageMode = "local" | "github" | "initials";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Hero() {
  const { dictionary } = useI18n();
  const githubLogin = getGithubUsername();
  const [imageMode, setImageMode] = useState<ProfileImageMode>("local");

  const profileSrc =
    imageMode === "local"
      ? siteConfig.profileImage
      : imageMode === "github" && githubLogin
        ? getGithubAvatarUrl(githubLogin)
        : null;

  const handleImageError = () => {
    if (imageMode === "local" && githubLogin) {
      setImageMode("github");
      return;
    }
    setImageMode("initials");
  };

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-6">
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="order-1 lg:col-start-1 lg:row-start-1"
        >
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

          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
            <ContactLink className="btn-signal group inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 sm:h-11 sm:px-5">
              {dictionary.hero.contact}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ContactLink>
            <Link
              href="/projects"
              className="btn-outline-rise group inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold sm:h-11 sm:px-5"
            >
              {dictionary.hero.viewProjects}
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="/api/resume"
              download="Umut-Cingisiz-CV.pdf"
              className="btn-ghost-rise group inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-medium sm:h-11 sm:px-4"
            >
              <DownloadIcon className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              {dictionary.hero.downloadCv}
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card/45 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground sm:size-10"
                aria-label={label}
              >
                <Icon className="size-[17px]" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative order-2 mx-auto w-full max-w-[280px] sm:max-w-sm lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-md lg:justify-self-end"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-muted">
            {profileSrc ? (
              <Image
                key={profileSrc}
                src={profileSrc}
                alt={`${siteConfig.name} ${dictionary.hero.profileAlt}`}
                fill
                priority
                fetchPriority="high"
                quality={70}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, min(90vw, 280px)"
                className="object-cover object-top"
                onError={handleImageError}
                unoptimized={imageMode === "github"}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-border bg-muted text-2xl font-bold text-foreground">
                  {initialsFromName(siteConfig.name)}
                </div>
              </div>
            )}

            {imageMode === "github" ? (
              <p className="absolute left-3 top-3 rounded-md border border-border bg-background/80 px-2 py-1 font-mono text-[0.6rem] text-muted-foreground backdrop-blur">
                GitHub avatar
              </p>
            ) : null}
          </div>
        </motion.div>

        <motion.ul
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
          className="order-3 flex flex-wrap items-center gap-x-4 gap-y-2 lg:col-start-1 lg:row-start-2"
          aria-label={dictionary.hero.statsAria}
        >
          {dictionary.hero.stats.map((stat) => (
            <li
              key={stat.label}
              className="inline-flex items-baseline gap-1.5 text-xs text-muted-foreground/80"
            >
              <span className="font-mono text-[0.65rem] tracking-wide text-muted-foreground/60">
                {stat.label}
              </span>
              <span className="font-medium text-foreground/85">{stat.value}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
