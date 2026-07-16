"use client";

import { useActionState } from "react";

import type { ContactFormState } from "@/actions/contact";
import { submitContactForm } from "@/actions/contact";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<
    ContactFormState | null,
    FormData
  >(submitContactForm, null);

  return (
    <form action={formAction} className="mt-6 space-y-5 text-left">
      <input
        type="text"
        name="_company_website_trap"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          İsim
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={120}
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:ring-1 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          E-posta
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:ring-1 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="contact-msg" className="text-sm font-medium text-foreground">
          Mesaj
        </label>
        <textarea
          id="contact-msg"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:ring-1 focus:ring-ring"
          placeholder="Kısa proje özeti veya sorun…"
        />
      </div>

      {state?.ok === false ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
      >
        {pending ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
