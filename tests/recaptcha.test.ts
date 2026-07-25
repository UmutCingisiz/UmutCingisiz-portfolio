import { afterEach, describe, expect, test, vi } from "vitest";

import { verifyRecaptchaToken } from "@/lib/recaptcha";

describe("verifyRecaptchaToken (v2)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("skips when neither site key nor secret is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "");
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "");
    const result = await verifyRecaptchaToken(undefined);
    expect(result).toEqual({ ok: true, skipped: true });
  });

  test("fail-closed when site key is set but secret is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "pk_test");
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "");
    const result = await verifyRecaptchaToken("token");
    expect(result.ok).toBe(false);
  });

  test("fail-closed when secret is set but site key is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "");
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "sk_test");
    const result = await verifyRecaptchaToken("token");
    expect(result.ok).toBe(false);
  });

  test("rejects missing token when both keys are configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "pk_test");
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "sk_test");
    const result = await verifyRecaptchaToken("");
    expect(result.ok).toBe(false);
  });

  test("accepts when siteverify returns success: true", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "pk_test");
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "sk_test");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ success: true }),
      })),
    );

    const result = await verifyRecaptchaToken("good-token", "1.2.3.4");
    expect(result).toEqual({ ok: true });
  });

  test("rejects when siteverify returns success: false", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "pk_test");
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "sk_test");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          success: false,
          "error-codes": ["invalid-input-response"],
        }),
      })),
    );

    const result = await verifyRecaptchaToken("bad-token");
    expect(result.ok).toBe(false);
  });
});
