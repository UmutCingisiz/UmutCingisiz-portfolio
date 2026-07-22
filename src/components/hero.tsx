"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
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
    <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="ambient-orb left-[8%] top-20 size-64 opacity-60" />
      <div className="ambient-orb bottom-20 right-[8%] size-80 opacity-40 [animation-delay:2s]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      {/*
        Mobil sıra: metin → foto → derece kartları → tech signal
        Desktop: sol metin+stats | sağ foto (foto iki satırı kaplar)
      */}
      <div className="relative mx-auto grid max-w-7xl items-start gap-8 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-1 lg:col-start-1 lg:row-start-1"
        >
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] py-1 pl-2 pr-3.5 text-xs font-medium text-foreground/90 backdrop-blur-xl">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-emerald-500 dark:text-emerald-400">
              Müsait
            </span>
            <span className="text-muted-foreground">· yeni fırsatlara açık</span>
          </div>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:mt-8 sm:text-sm sm:tracking-[0.25em]">
            {siteConfig.role}
          </p>

          <h1 className="mt-3 text-balance text-4xl font-bold tracking-[-0.05em] text-foreground sm:mt-4 sm:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>

          <p className="mt-3 max-w-3xl text-balance text-xl font-semibold tracking-tight text-gradient-premium sm:mt-4 sm:text-3xl">
            {siteConfig.headline}
          </p>

          <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
            {siteConfig.shortBio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <Link
              href="/#contact"
              className="btn-signal group inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 sm:h-12"
            >
              İletişim
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-11 items-center rounded-xl border border-border bg-card/55 px-5 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted sm:h-12"
            >
              Projeleri İncele
            </Link>
            <a
              href="/api/resume"
              download="Umut-Cingisiz-CV.pdf"
              className="inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground sm:h-12"
            >
              CV İndir
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card/45 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground"
                aria-label={label}
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative order-2 mx-auto w-full max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none"
        >
          <div
            className="absolute -inset-6 rounded-[var(--radius-xl)] blur-3xl sm:-inset-8"
            style={{
              background:
                "radial-gradient(60% 60% at 30% 20%, var(--signal-glow), transparent 70%)",
            }}
          />

          <TiltCard
            as="div"
            max={5}
            className="surface-interactive gradient-border relative overflow-hidden p-2.5 backdrop-blur sm:p-3"
          >
            <div className="relative aspect-[4/5] max-h-[min(68vh,520px)] overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-muted via-card to-muted sm:max-h-none">
              {profileSrc ? (
                <Image
                  key={profileSrc}
                  src={profileSrc}
                  alt={`${siteConfig.name} profil fotoğrafı`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 420px, 90vw"
                  className="object-cover object-top"
                  onError={handleImageError}
                  unoptimized={imageMode === "github"}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <div className="flex size-24 items-center justify-center rounded-2xl border border-border bg-muted text-3xl font-bold text-foreground">
                    {initialsFromName(siteConfig.name)}
                  </div>
                  <p className="mt-6 font-mono text-xs text-muted-foreground">
                    public/profile.jpg
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Kendi fotoğrafını ekle; yoksa GitHub avatarı kullanılır.
                  </p>
                </div>
              )}

              {imageMode === "github" ? (
                <p className="absolute left-3 top-3 rounded-md border border-border bg-background/80 px-2 py-1 font-mono text-[0.6rem] text-muted-foreground backdrop-blur">
                  GitHub avatar (geçici)
                </p>
              ) : null}

              <div className="absolute inset-x-2.5 bottom-2.5 rounded-2xl border border-border bg-background/82 p-3 backdrop-blur-md sm:inset-x-3 sm:bottom-3 sm:p-4">
                <p className="font-mono text-[0.65rem] text-muted-foreground sm:text-xs">
                  current_focus.ts
                </p>
                <p className="mt-1 text-xs font-medium leading-snug text-foreground sm:mt-1.5 sm:text-sm">
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
          className="order-3 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:col-start-1 lg:row-start-2"
        >
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="surface-card p-3.5 backdrop-blur-sm sm:p-4"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
          className="order-4 flex flex-wrap gap-1.5 lg:col-span-2"
          aria-label="Teknoloji sinyali"
        >
          {siteConfig.techSignal.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/70 bg-muted/35 px-2 py-1 font-mono text-[0.6rem] text-muted-foreground sm:text-[0.65rem]"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
