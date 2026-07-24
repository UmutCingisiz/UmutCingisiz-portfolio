"use client";

import { useActionState, useEffect, useState } from "react";

import type { ContactFormState } from "@/actions/contact";
import { submitContactForm } from "@/actions/contact";
import { ContactSuccessState } from "@/components/contact/contact-success-state";

const SUCCESS_STORAGE_KEY = "portfolio.contact.sent";

type Props = {
  /** URL `?contact=sent` — sunucudan gelen başarı bayrağı */
  initialSuccess?: boolean;
};

export function ContactForm({ initialSuccess = false }: Props) {
  const [success, setSuccess] = useState(initialSuccess);
  const [state, formAction, pending] = useActionState<
    ContactFormState | null,
    FormData
  >(submitContactForm, null);

  useEffect(() => {
    if (initialSuccess) {
      setSuccess(true);
      try {
        sessionStorage.setItem(SUCCESS_STORAGE_KEY, "1");
      } catch {
        /* private mode */
      }
      return;
    }
    try {
      if (sessionStorage.getItem(SUCCESS_STORAGE_KEY) === "1") {
        setSuccess(true);
      }
    } catch {
      /* private mode */
    }
  }, [initialSuccess]);

  const fieldErrors = state?.ok === false ? state.fieldErrors : undefined;

  if (success) {
    return (
      <ContactSuccessState
        onReset={() => {
          setSuccess(false);
          try {
            sessionStorage.removeItem(SUCCESS_STORAGE_KEY);
          } catch {
            /* private mode */
          }
        }}
      />
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-5 text-left" noValidate>
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
          disabled={pending}
          aria-invalid={Boolean(fieldErrors?.name)}
          aria-describedby={fieldErrors?.name ? "contact-name-error" : undefined}
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus-visible:border-signal/50 focus-visible:ring-2 focus-visible:ring-signal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 aria-[invalid=true]:border-red-500/50"
        />
        {fieldErrors?.name ? (
          <p id="contact-name-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {fieldErrors.name}
          </p>
        ) : null}
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
          disabled={pending}
          aria-invalid={Boolean(fieldErrors?.email)}
          aria-describedby={fieldErrors?.email ? "contact-email-error" : undefined}
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus-visible:border-signal/50 focus-visible:ring-2 focus-visible:ring-signal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 aria-[invalid=true]:border-red-500/50"
        />
        {fieldErrors?.email ? (
          <p id="contact-email-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {fieldErrors.email}
          </p>
        ) : null}
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
          disabled={pending}
          aria-invalid={Boolean(fieldErrors?.message)}
          aria-describedby={fieldErrors?.message ? "contact-msg-error" : undefined}
          className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus-visible:border-signal/50 focus-visible:ring-2 focus-visible:ring-signal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 aria-[invalid=true]:border-red-500/50"
          placeholder="Kısa proje özeti veya sorun…"
        />
        {fieldErrors?.message ? (
          <p id="contact-msg-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {state?.ok === false && !fieldErrors?.name && !fieldErrors?.email && !fieldErrors?.message ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="btn-signal inline-flex h-11 items-center rounded-lg px-5 text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-40"
      >
        {pending ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
