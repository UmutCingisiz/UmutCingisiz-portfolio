"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
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
    <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pb-32 sm:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/[0.06] to-transparent blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {siteConfig.availability}
          </div>

          <p className="mt-8 font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {siteConfig.role}
          </p>

          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>

          <p className="mt-2 max-w-xl text-balance text-lg font-medium text-muted-foreground sm:text-xl">
            {siteConfig.headline}
          </p>

          <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-muted-foreground/80">
            {siteConfig.shortBio}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            >
              Projeleri İncele
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="/api/resume"
              className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            >
              CV İndir
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-foreground/20 hover:text-foreground"
                aria-label={label}
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-foreground/[0.08] via-transparent to-foreground/[0.04] blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-3 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-muted via-card to-muted">
              {profileSrc ? (
                <Image
                  key={profileSrc}
                  src={profileSrc}
                  alt={`${siteConfig.name} profil fotoğrafı`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover"
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

              <div className="absolute inset-x-3 bottom-3 rounded-xl border border-border bg-background/80 p-4 backdrop-blur-md">
                <p className="font-mono text-xs text-muted-foreground">current_focus.ts</p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  {siteConfig.currentFocus}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {siteConfig.techSignal.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
