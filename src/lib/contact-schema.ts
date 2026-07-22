import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "İsim çok kısa.").max(120, "İsim çok uzun."),
  email: z.string().trim().email("Geçerli bir e-posta gir."),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj en az 10 karakter olsun.")
    .max(4000, "Mesaj çok uzun."),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export type ContactFieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function parseContactFormFields(input: {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  message: FormDataEntryValue | null;
}):
  | { ok: true; data: ContactFormInput }
  | { ok: false; error: string; fieldErrors: ContactFieldErrors } {
  const parsed = contactFormSchema.safeParse({
    name: input.name,
    email: input.email,
    message: input.message,
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    const fieldErrors: ContactFieldErrors = {
      name: flat.fieldErrors.name?.[0],
      email: flat.fieldErrors.email?.[0],
      message: flat.fieldErrors.message?.[0],
    };
    const error =
      fieldErrors.name ??
      fieldErrors.email ??
      fieldErrors.message ??
      "Form geçersiz.";
    return { ok: false, error, fieldErrors };
  }

  return { ok: true, data: parsed.data };
}
