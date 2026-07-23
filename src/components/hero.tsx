"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ContactLink } from "@/components/contact-link";
import { Magnetic } from "@/components/magnetic";
import { getGithubAvatarUrl, getGithubUsername } from "@/lib/github-username";
import { siteConfig } from "@/lib/site-config";
import { socialLinks } from "@/components/social-icons";
import { TiltCard } from "@/components/tilt-card";

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
    <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="ambient-orb left-[8%] top-20 size-56 opacity-40 sm:size-64 sm:opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-6 sm:gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-1 lg:col-start-1 lg:row-start-1"
        >
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] py-1 pl-2 pr-3 text-xs font-medium text-foreground/90 backdrop-blur-xl">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[0.7rem] tracking-wide text-emerald-500 dark:text-emerald-400">
              Müsait
            </span>
            <span className="text-muted-foreground">· yeni fırsatlara açık</span>
          </div>

          <p className="mt-5 font-mono text-[0.7rem] tracking-wide text-muted-foreground sm:mt-6 sm:text-xs">
            {siteConfig.role}
          </p>

          <h1 className="mt-2 text-balance text-3xl font-bold tracking-[-0.04em] text-foreground sm:mt-3 sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>

          <p className="mt-3 max-w-xl text-pretty text-base font-semibold tracking-tight text-gradient-premium sm:mt-3 sm:text-xl lg:text-2xl">
            {siteConfig.headline}
          </p>

          <p className="mt-4 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:mt-5 sm:leading-7">
            {siteConfig.shortBio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
            <Magnetic>
              <ContactLink className="btn-signal group inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 sm:h-11 sm:px-5">
                İletişim
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </ContactLink>
            </Magnetic>
            <Magnetic strength={0.28}>
              <Link
                href="/projects"
                className="btn-outline-rise group inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold sm:h-11 sm:px-5"
              >
                Projeleri incele
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <a
              href="/api/resume"
              download="Umut-Cingisiz-CV.pdf"
              className="btn-ghost-rise group inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-medium sm:h-11 sm:px-4"
            >
              <DownloadIcon className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              CV indir
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
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative order-2 mx-auto w-full max-w-[320px] sm:max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none"
        >
          <div
            className="absolute -inset-5 rounded-[var(--radius-xl)] blur-3xl sm:-inset-7"
            style={{
              background:
                "radial-gradient(60% 60% at 30% 20%, var(--signal-glow), transparent 70%)",
            }}
          />

          <TiltCard
            as="div"
            max={5}
            className="surface-interactive gradient-border relative overflow-hidden p-2 backdrop-blur sm:p-2.5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-muted via-card to-muted">
              {profileSrc ? (
                <Image
                  key={profileSrc}
                  src={profileSrc}
                  alt={`${siteConfig.name} profil fotoğrafı`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, min(90vw, 320px)"
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

              <div className="absolute inset-x-2 bottom-2 rounded-xl border border-border bg-background/82 p-2.5 backdrop-blur-md sm:inset-x-2.5 sm:bottom-2.5 sm:p-3">
                <p className="font-mono text-[0.6rem] text-muted-foreground">
                  current_focus
                </p>
                <p className="mt-1 text-[0.7rem] font-medium leading-snug text-foreground sm:text-xs">
                  {siteConfig.currentFocus}
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="order-3 grid grid-cols-3 gap-2 sm:gap-3 lg:col-start-1 lg:row-start-2"
        >
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="surface-card p-2.5 backdrop-blur-sm sm:p-3.5"
            >
              <p className="font-mono text-[0.6rem] tracking-wide text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-[0.7rem] font-semibold leading-snug text-foreground sm:text-sm">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
          className="order-4 hidden flex-wrap gap-1.5 sm:flex lg:col-span-2"
          aria-label="Teknoloji sinyali"
        >
          {siteConfig.techSignal.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/70 bg-muted/35 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
