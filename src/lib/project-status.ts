import type { ProjectMeta } from "@/lib/content/projects";

export type ProjectStatus = ProjectMeta["status"];

export type ProjectStatusTone = "live" | "archived" | "building";

/** Yayında veya arşiv — listede “shipped” grubu. */
export function isShippedStatus(status: ProjectStatus) {
  return status === "live" || status === "archived";
}

export function getProjectStatusTone(status: ProjectStatus): ProjectStatusTone {
  if (status === "live") return "live";
  if (status === "archived") return "archived";
  return "building";
}

export function getProjectStatusLabel(status: ProjectStatus) {
  switch (status) {
    case "live":
      return "Yayında";
    case "archived":
      return "Arşiv";
    case "in-progress":
      return "Geliştiriliyor";
    case "planned":
      return "Planlandı";
    case "learning":
      return "Öğrenme";
    default:
      return status;
  }
}

export function getProjectStatusBadgeClass(status: ProjectStatus) {
  const tone = getProjectStatusTone(status);
  if (tone === "live") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }
  if (tone === "archived") {
    return "border-border bg-muted/50 text-muted-foreground";
  }
  return "border-amber-400/30 bg-amber-400/10 text-amber-200";
}
