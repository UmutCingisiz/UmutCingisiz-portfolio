"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, MouseEvent } from "react";
import { useReducedMotion, motion, useMotionValue, useMotionTemplate } from "motion/react";
import type { ProjectMeta } from "@/lib/content/projects";
import { ProjectStatusMark } from "@/components/project-vitrin";
import { getStageShots, splitProjectTitle, type StageShot } from "@/lib/project-cover";

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

function ProjectStill({
  shots,
  paused,
  sizes,
  eager,
}: {
  shots: StageShot[];
  paused: boolean;
  sizes: string;
  eager?: boolean;
}) {
  const index = useCycle(shots.length, paused);
  const active = shots[index];

  return (
    <div className="absolute inset-0">
      {shots.map((shot, shotIndex) => {
        const on = shotIndex === index;
        return (
          <Image
            key={`wash-${shot.src}`}
            src={shot.src}
            alt=""
            fill
            sizes={sizes}
            aria-hidden
            className={`object-cover blur-[40px] transition-all duration-[1500ms] ease-out ${
              on ? "opacity-80 scale-125 saturate-150" : "opacity-0 scale-100 saturate-100"
            }`}
          />
        );
      })}
      <div className="absolute inset-[7%] sm:inset-[9%]">
        <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          {shots.map((shot, shotIndex) => {
            const on = shotIndex === index;
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
                className={`object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
                  on ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.96] translate-y-4"
                } ${on && shots.length < 2 ? "stage-drift" : ""}`}
              />
            );
          })}
        </div>
      </div>
      {active?.caption ? (
        <p className="pointer-events-none absolute left-4 top-4 z-10 max-w-[16rem] rounded-full bg-black/55 px-3 py-1 text-xs text-white opacity-0 transition duration-300 group-hover:opacity-100">
          {active.caption}
        </p>
      ) : null}
      {shots.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-2">
          {shots.map((shot, shotIndex) => (
            <span
              key={shot.src}
              className={`block h-1 rounded-full transition-all duration-500 ${
                shotIndex === index ? "w-5 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FlowField({ project, paused }: { project: ProjectMeta; paused: boolean }) {
  const steps = project.flow ?? project.tags.slice(0, 4);
  const index = useCycle(steps.length, paused);

  return (
    <div className="absolute inset-0 bg-muted">
      <div className="bento-dots absolute inset-0 opacity-70" />
      <div className="absolute -left-20 top-1/2 size-72 -translate-y-1/2 rounded-full bg-signal/15 blur-3xl" />
      <ol className="relative flex h-full flex-col justify-center px-7 sm:px-10">
        {steps.map((step, stepIndex) => {
          const on = steps.length > 1 && stepIndex === index;
          return (
            <li key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1.5 size-3 shrink-0 rounded-full shadow-[0_0_15px_rgba(var(--signal),0.5)] transition-all duration-700 ${
                    on ? "bg-signal scale-125" : "bg-foreground/20 scale-100 shadow-none"
                  }`}
                />
                {stepIndex < steps.length - 1 ? (
                  <span className={`my-1 w-px flex-1 transition-colors duration-700 ${on ? "bg-signal/50" : "bg-border"}`} aria-hidden />
                ) : null}
              </div>
              <p
                className={`pb-6 text-lg font-bold tracking-tight transition-all duration-700 sm:text-2xl ${
                  on ? "text-foreground translate-x-2 drop-shadow-md" : "text-muted-foreground translate-x-0"
                }`}
              >
                {step}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ExhibitCopy({
  project,
  index,
  prominent,
}: {
  project: ProjectMeta;
  index: number;
  prominent: boolean;
}) {
  const { name, tagline } = splitProjectTitle(project.title);

  return (
    <div className={`relative flex flex-col justify-center z-10 ${prominent ? "px-6 py-8 sm:px-8 lg:px-12" : "p-5 sm:p-6"}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-xs tabular-nums tracking-[0.18em] text-signal/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.context ? <span className="text-sm text-muted-foreground">{project.context}</span> : null}
        <ProjectStatusMark status={project.status} />
      </div>
      <h3
        className={`mt-4 font-extrabold tracking-[-0.04em] text-foreground transition-all duration-500 group-hover:text-signal group-hover:drop-shadow-sm ${
          prominent ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {name}
      </h3>
      {tagline ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{tagline}</p> : null}
      {project.proof ? (
        <p className={`font-medium text-foreground ${prominent ? "mt-6 text-lg" : "mt-4 text-sm sm:text-base"}`}>
          {project.proof}
        </p>
      ) : null}
      {prominent && project.role ? (
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.role}</p>
      ) : null}
      <span className="mt-8 inline-flex w-max items-center rounded-full bg-foreground/5 px-4 py-1.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 group-hover:bg-signal group-hover:text-white group-hover:shadow-[0_0_20px_rgba(var(--signal),0.4)]">
        Projeyi İncele
        <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </div>
  );
}

export function Exhibit({
  project,
  index,
  layout,
  eager = false,
}: {
  project: ProjectMeta;
  index: number;
  layout: "spread" | "tile";
  eager?: boolean;
}) {
  const shots = getStageShots(project, 6);
  const flip = layout === "spread" && index % 2 === 1;
  const sizes = layout === "spread" ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 768px) 46vw, 100vw";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <article className={`group relative ${layout === "tile" ? "h-full" : ""}`}>
      {/* Animated glow background behind the card */}
      <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-signal/0 via-signal/0 to-signal/0 opacity-0 blur-xl transition-all duration-700 ease-out group-hover:from-signal/20 group-hover:via-signal/10 group-hover:to-signal/20 group-hover:opacity-100" />
      
      <Link
        href={`/projects/${project.slug}`}
        onMouseMove={handleMouseMove}
        className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-signal/50 hover:bg-card/60 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] hover:shadow-signal/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 ${
          layout === "spread" ? "lg:grid lg:grid-cols-2 lg:gap-4 lg:p-2" : "p-2"
        }`}
      >
        {/* Spotlight Effect overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-20 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(var(--signal), 0.1),
                transparent 60%
              )
            `,
          }}
        />
        
        <div
          className={`relative overflow-hidden rounded-[1.5rem] bg-muted/50 ${
            layout === "spread"
              ? `min-h-[22rem] sm:min-h-[28rem] ${flip ? "lg:order-2" : ""}`
              : "aspect-[16/10] min-h-[14rem]"
          }`}
        >
          {shots.length > 0 ? (
            <ProjectStill shots={shots} paused={false} sizes={sizes} eager={eager} />
          ) : (
            <FlowField project={project} paused={false} />
          )}
        </div>
        <ExhibitCopy project={project} index={index} prominent={layout === "spread"} />
      </Link>
    </article>
  );
}
