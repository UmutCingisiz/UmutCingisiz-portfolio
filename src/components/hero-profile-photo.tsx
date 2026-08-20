"use client";

import Image from "next/image";
import { useState } from "react";
import { getGithubAvatarUrl, getGithubUsername } from "@/lib/github-username";
import { siteConfig } from "@/lib/site-config";

type ProfileImageMode = "local" | "github" | "initials";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * LCP adayı — Motion ile sarmalanmaz; render delay / CLS için sabit aspect kutusu.
 */
export function HeroProfilePhoto({ alt }: { alt: string }) {
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
    <div className="relative order-2 mx-auto w-full max-w-[280px] sm:max-w-sm lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-md lg:justify-self-end">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-muted">
        {profileSrc ? (
          <Image
            key={profileSrc}
            src={profileSrc}
            alt={alt}
            fill
            priority
            fetchPriority="high"
            quality={65}
            sizes="(max-width: 639px) 280px, (max-width: 1023px) 384px, 448px"
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
    </div>
  );
}
