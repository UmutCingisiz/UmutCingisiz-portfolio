"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { getGithubAvatarUrl, getGithubUsername } from "@/lib/github-username";
import { siteConfig } from "@/lib/site-config";
import { socialLinks } from "@/components/social-icons";
import { Spotlight } from "@/components/spotlight";

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
    <section className="relative overflow-hidden px-4 pb-20 pt-18 sm:px-6 sm:pb-32 sm:pt-24">
      <div className="ambient-orb left-[8%] top-20 size-64 opacity-60" />
      <div className="ambient-orb bottom-20 right-[8%] size-80 opacity-40 [animation-delay:2s]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground shadow-lg shadow-black/5 backdrop-blur-xl">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {siteConfig.availability}
          </div>

          <p className="mt-8 font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {siteConfig.role}
          </p>

          <h1 className="mt-4 text-balance text-5xl font-bold tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>

          <p className="mt-4 max-w-3xl text-balance text-2xl font-semibold tracking-tight text-gradient-premium sm:text-3xl">
            {siteConfig.headline}
          </p>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-muted-foreground">
            {siteConfig.shortBio}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="btn-signal group inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Projeleri İncele
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="/api/resume"
              className="inline-flex h-12 items-center rounded-xl border border-border bg-card/55 px-5 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted"
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
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card/45 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground"
                aria-label={label}
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="premium-card rounded-2xl p-4 backdrop-blur-sm"
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
          <div
            className="absolute -inset-8 rounded-[2rem] blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 30% 20%, var(--signal-glow), transparent 70%), radial-gradient(50% 50% at 80% 90%, rgba(52,211,153,0.10), transparent 70%)",
            }}
          />

          {/* Kutunun dışına taşan sistem durumu rozeti — bento hapsini kırar */}
          <div className="absolute -left-6 top-8 z-20 hidden -rotate-3 lg:block">
            <div className="premium-card flex items-center gap-2 rounded-full px-4 py-2 shadow-2xl shadow-black/30">
              <span className="signal-dot size-2" aria-hidden />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-foreground">
                auth · db · redis online
              </span>
            </div>
          </div>

          <Spotlight as="div" className="premium-card relative overflow-hidden rounded-[2rem] p-3 backdrop-blur">
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

              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-border bg-background/82 p-4 backdrop-blur-md">
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
                  className="rounded-lg border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

          </Spotlight>
        </motion.div>
      </div>
    </section>
  );
}
