"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { ProjectMeta } from "@/lib/content/projects";
import {
  getProjectDevice,
  getStageShots,
  type StageShot,
} from "@/lib/project-cover";

type Props = {
  project: ProjectMeta;
  /** Kabaca sahnenin ekranda kaplayacağı genişlik; `sizes` için. */
  width: "card" | "wide" | "hero";
  /** Üst kartın kenarına oturur; kendi çerçevesini çizmez. */
  fill?: boolean;
  eager?: boolean;
  className?: string;
};

const PHONE_SIZES = {
  card: "(min-width: 1024px) 110px, 28vw",
  wide: "(min-width: 1024px) 180px, 28vw",
  hero: "(min-width: 1024px) 240px, 30vw",
} as const;

const WEB_SIZES = {
  card: "(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw",
  wide: "(min-width: 1024px) 620px, 90vw",
  hero: "(min-width: 1024px) 960px, 94vw",
} as const;

const CYCLE_MS = 3800;

function useCycle(length: number, paused: boolean) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || paused || length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, length]);

  return reduce ? 0 : index;
}

function ShotStack({
  shots,
  active,
  sizes,
  eager,
  drift,
}: {
  shots: StageShot[];
  active: number;
  sizes: string;
  eager?: boolean;
  drift?: boolean;
}) {
  return (
    <>
      {shots.map((shot, shotIndex) => {
        const on = shotIndex === active;
        return (
          <Image
            key={shot.src}
            src={shot.src}
            alt={on ? shot.alt : ""}
            fill
            sizes={sizes}
            aria-hidden={on ? undefined : true}
            loading={eager && on ? "eager" : "lazy"}
            fetchPriority={eager && on ? "high" : undefined}
            className={`object-cover object-top transition-opacity duration-700 ${
              on ? "opacity-100" : "opacity-0"
            } ${drift && on ? "stage-drift" : ""}`}
          />
        );
      })}
    </>
  );
}

/**
 * Ürün sahnesi. Birden fazla ekran varsa kendiliğinden değişir;
 * tek ekran yavaşça yakınlaşır. Üzerine gelince akış durur.
 */
export function ProjectStage({
  project,
  width,
  fill = false,
  eager = false,
  className = "",
}: Props) {
  const device = getProjectDevice(project);
  const shots = getStageShots(project, 6);
  const [paused, setPaused] = useState(false);
  const index = useCycle(shots.length, paused);
  const frame = fill
    ? "absolute inset-0 h-full w-full"
    : "relative aspect-[16/10] w-full rounded-2xl border border-border";
  const active = shots[index];

  return (
    <div
      className={`group/stage overflow-hidden bg-muted ${frame} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {shots.length === 0 ? (
        <FlowStage project={project} paused={paused} />
      ) : device === "phone" ? (
        <PhoneStage shots={shots} index={index} sizes={PHONE_SIZES[width]} eager={eager} />
      ) : (
        <WebStage shots={shots} index={index} sizes={WEB_SIZES[width]} eager={eager} />
      )}

      {active?.caption ? (
        <p className="pointer-events-none absolute inset-x-3 bottom-3 z-10 translate-y-1 rounded-md bg-background/88 px-2.5 py-1.5 text-xs leading-5 text-foreground opacity-0 transition duration-300 group-hover/stage:translate-y-0 group-hover/stage:opacity-100">
          {active.caption}
        </p>
      ) : null}

      {shots.length > 1 ? (
        <p className="pointer-events-none absolute right-3 top-3 z-10 rounded-md bg-background/80 px-2 py-1 font-mono text-[0.65rem] tabular-nums text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </p>
      ) : null}
    </div>
  );
}

function PhoneStage({
  shots,
  index,
  sizes,
  eager,
}: {
  shots: StageShot[];
  index: number;
  sizes: string;
  eager?: boolean;
}) {
  const count = shots.length;
  const slotIndex = (offset: number) => (index + offset + count) % count;
  const slots =
    count >= 3
      ? [
          { active: slotIndex(-1), center: false, key: "left" },
          { active: slotIndex(0), center: true, key: "center" },
          { active: slotIndex(1), center: false, key: "right" },
        ]
      : count === 2
        ? [
            { active: slotIndex(0), center: true, key: "left" },
            { active: slotIndex(1), center: false, key: "right" },
          ]
        : [{ active: slotIndex(0), center: true, key: "center" }];

  return (
    <div className="absolute inset-x-0 bottom-0 top-[9%] flex items-end justify-center gap-[3%] px-[6%]">
      {slots.map((slot) => (
        <div
          key={slot.key}
          className={`relative aspect-[9/19.5] overflow-hidden rounded-t-[1.1rem] border border-b-0 border-foreground/15 bg-background transition duration-500 ease-out ${
            slot.center
              ? "z-10 h-full shadow-[0_18px_40px_rgba(0,0,0,0.35)] group-hover/stage:-translate-y-3"
              : "h-[84%] opacity-80 group-hover/stage:-translate-y-1 group-hover/stage:opacity-100"
          }`}
        >
          {slot.center ? (
            <ShotStack
              shots={shots}
              active={slot.active}
              sizes={sizes}
              eager={eager}
              drift={count < 2}
            />
          ) : (
            <Image
              src={shots[slot.active].src}
              alt=""
              fill
              sizes={sizes}
              aria-hidden
              className="object-cover object-top"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function WebStage({
  shots,
  index,
  sizes,
  eager,
}: {
  shots: StageShot[];
  index: number;
  sizes: string;
  eager?: boolean;
}) {
  return (
    <div className="absolute inset-x-[6%] bottom-0 top-[9%] flex flex-col overflow-hidden rounded-t-xl border border-b-0 border-foreground/15 bg-background transition duration-500 ease-out group-hover/stage:-translate-y-1.5">
      <div className="flex h-5 shrink-0 items-center gap-1 border-b border-border px-2.5 sm:h-6">
        <span className="size-1.5 rounded-full bg-foreground/15" />
        <span className="size-1.5 rounded-full bg-foreground/15" />
        <span className="size-1.5 rounded-full bg-foreground/15" />
      </div>
      <div className="relative flex-1">
        <ShotStack shots={shots} active={index} sizes={sizes} eager={eager} drift={shots.length < 2} />
      </div>
    </div>
  );
}

function FlowStage({ project, paused }: { project: ProjectMeta; paused: boolean }) {
  const steps = project.flow ?? project.tags.slice(0, 4);
  const index = useCycle(steps.length, paused);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
      <ol className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2">
        {steps.map((step, stepIndex) => (
          <li key={step} className="flex items-center gap-1.5">
            <span
              className={`rounded-lg border px-2.5 py-1.5 font-mono text-[0.7rem] transition duration-500 sm:text-xs ${
                steps.length > 1 && stepIndex === index
                  ? "border-signal bg-signal/10 text-signal"
                  : "border-border bg-background text-foreground"
              }`}
            >
              {step}
            </span>
            {stepIndex < steps.length - 1 ? (
              <span aria-hidden className="text-xs text-muted-foreground">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
        Ekran görüntüleri yakında
      </p>
    </div>
  );
}
