import * as z from "zod";

export const projectCategorySchema = z.enum([
  "frontend",
  "backend",
  "full-stack",
  "devops",
]);

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  category: projectCategorySchema,
  problem: z.string().min(1),
  decision: z.string().min(1),
  impact: z.string().min(1),
  status: z
    .enum(["planned", "in-progress", "live", "archived", "learning"]),
  demo: z.string().url().optional(),
  repo: z.string().url().optional(),
  featured: z.boolean().optional(),
  coverImage: z.string().min(1).optional(),
  /** Proje detayında gösterilecek uygulama içi ekran görüntüleri (3–4 ideal). */
  gallery: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        caption: z.string().min(1).optional(),
      }),
    )
    .max(8)
    .optional(),
});

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  coverImage: z.string().min(1).optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type ProjectCategory = z.infer<typeof projectCategorySchema>;