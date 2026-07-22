"use client";

import dynamic from "next/dynamic";
import { AlgorithmLabSkeleton } from "@/components/algorithm-lab-skeleton";

/** Code-split Algorithm Lab so the home critical path stays lighter. */
export const AlgorithmLabIsland = dynamic(
  () =>
    import("@/components/algorithm-lab-section").then((mod) => ({
      default: mod.AlgorithmLabSection,
    })),
  { loading: () => <AlgorithmLabSkeleton /> },
);
