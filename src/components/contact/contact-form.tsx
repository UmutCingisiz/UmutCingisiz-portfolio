"use client";

import {
  startTransition,
  useActionState,
  useCallback,
  useRef,
  useState,
  type FormEvent,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";

import type { ContactFormState } from "@/actions/contact";
import { submitContactForm } from "@/actions/contact";
import { ContactSuccessState } from "@/components/contact/contact-success-state";
import { useI18n } from "@/i18n/locale-provider";
import { RECAPTCHA_FORM_FIELD } from "@/lib/recaptcha";

const SUCCESS_STORAGE_KEY = "portfolio.contact.sent";

type Props = {
  /** URL `?contact=sent` — sunucudan gelen başarı bayrağı */
  initialSuccess?: boolean;
};

function readStoredSuccess() {
  try {
    return sessionStorage.getItem(SUCCESS_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeStoredSuccess(value: boolean) {
  try {
    if (value) sessionStorage.setItem(SUCCESS_STORAGE_KEY, "1");
    else sessionStorage.removeItem(SUCCESS_STORAGE_KEY);
  } catch {
    /* private mode */
  }
}

/** reCAPTCHA v2 checkbox — site key yoksa doğrulama atlanır (yerel geliştirme). */
export function ContactForm({ initialSuccess = false }: Props) {
  const { dictionary } = useI18n();
  const t = dictionary.contact.form;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [success, setSuccess] = useState(
    () => initialSuccess || readStoredSuccess(),
  );
  const [clientError, setClientError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState<
    ContactFormState | null,
    FormData
  >(submitContactForm, null);

  const actionSuccess = Boolean(state && "success" in state && state.success);
  if (actionSuccess && !success) {
    writeStoredSuccess(true);
    setSuccess(true);
  }

  if (initialSuccess && !success) {
    writeStoredSuccess(true);
    setSuccess(true);
  }

  const errorState =
    state && "ok" in state && state.ok === false ? state : null;
  const fieldErrors = errorState?.fieldErrors;

  const resetCaptcha = useCallback(() => {
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setClientError(null);

      const form = event.currentTarget;
      const formData = new FormData(form);

      if (siteKey) {
        if (!captchaToken) {
          setClientError("Lütfen 'Robot değilim' doğrulamasını tamamla.");
          return;
        }
        formData.set(RECAPTCHA_FORM_FIELD, captchaToken);
      }

      // useActionState action'ı manuel çağrıda startTransition içinde olmalı
      startTransition(() => {
        formAction(formData);
      });
      if (siteKey) resetCaptcha();
    },
    [captchaToken, formAction, resetCaptcha, siteKey],
  );

  if (success) {
    return (
      <ContactSuccessState
        onReset={() => {
          setSuccess(false);
          writeStoredSuccess(false);
          setClientError(null);
          resetCaptcha();
        }}
      />
    );
  }

  const bannerError =
    clientError ??
    (errorState && !fieldErrors?.name && !fieldErrors?.email && !fieldErrors?.message
      ? errorState.error
      : null);

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-left" noValidate>
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
          {t.name}
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
          {t.email}
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
          {t.message}
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
          placeholder={t.placeholder}
        />
        {fieldErrors?.message ? (
          <p id="contact-msg-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {siteKey ? (
        <div className="overflow-x-auto">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            theme="dark"
            onChange={(value) => setCaptchaToken(value)}
            onExpired={() => setCaptchaToken(null)}
            onErrored={() => setCaptchaToken(null)}
          />
        </div>
      ) : null}

      {bannerError ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {bannerError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || (Boolean(siteKey) && !captchaToken)}
        aria-busy={pending}
        className="btn-signal inline-flex h-11 items-center rounded-lg px-5 text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-40"
      >
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}
