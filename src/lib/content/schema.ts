import * as z from "zod";

export const projectCategorySchema = z.enum([
  "frontend",
  "backend",
  "full-stack",
  "devops",
]);

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  category: projectCategorySchema,
  demo: z.string().url().optional(),
  repo: z.string().url().optional(),
  featured: z.boolean().optional(),
});

export const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type ProjectCategory = z.infer<typeof projectCategorySchema>;
