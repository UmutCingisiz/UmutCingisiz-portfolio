import * as z from "zod";

export const projectCategorySchema = z.enum([
  "frontend",
  "backend",
  "full-stack",
  "mobile",
  "devops",
]);

export const projectDeviceSchema = z.enum(["phone", "web"]);

export const projectStatusSchema = z.enum([
  "planned",
  "in-progress",
  "testing",
  "live",
  "archived",
  "learning",
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
  /** Kart / detayda “Kullanılan Mimari / Çözüm” hiyerarşisi */
  architectureLabel: z.string().min(1).optional(),
  architectureSummary: z.string().min(1).optional(),
  status: projectStatusSchema,
  demo: z.string().url().optional(),
  /** CTA metni; yoksa “Canlı site” (ör. Uygulama bağlantısı) */
  demoLabel: z.string().min(1).optional(),
  repo: z.string().url().optional(),
  featured: z.boolean().optional(),
  /** Öne çıkanlarda sıra; küçük önce. Yoksa tarih sırası. */
  spotlight: z.number().int().positive().optional(),
  /** Kartta vurgulanan tek satırlık kanıt. */
  proof: z.string().min(1).optional(),
  /** Bu işteki payım. */
  role: z.string().min(1).optional(),
  /** Kim için / hangi çerçevede (Müşteri işi, Ekip, Freelance…). */
  context: z.string().min(1).optional(),
  /** Görsel sahnesi: phone = dikey ekranlar, web = tarayıcı çerçevesi. */
  device: projectDeviceSchema.optional(),
  /** Görsel yokken sahnede gösterilen mimari akışı. */
  flow: z.array(z.string().min(1)).min(2).max(5).optional(),
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
export type ProjectDevice = z.infer<typeof projectDeviceSchema>;
export type ProjectStatusValue = z.infer<typeof projectStatusSchema>;
export const PROJECT_STATUS_VALUES = projectStatusSchema.options;