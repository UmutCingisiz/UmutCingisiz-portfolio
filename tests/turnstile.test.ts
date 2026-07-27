import { afterEach, describe, expect, test, vi } from "vitest";

import { verifyTurnstileToken } from "@/lib/turnstile";

describe("verifyTurnstileToken", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("skips when neither site key nor secret is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    const result = await verifyTurnstileToken(undefined);
    expect(result).toEqual({ ok: true, skipped: true });
  });

  test("fail-closed when site key is set but secret is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "pk_test");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    const result = await verifyTurnstileToken("token");
    expect(result.ok).toBe(false);
  });

  test("fail-closed when secret is set but site key is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "sk_test");
    const result = await verifyTurnstileToken("token");
    expect(result.ok).toBe(false);
  });

  test("rejects missing token when both keys are configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "pk_test");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "sk_test");
    const result = await verifyTurnstileToken("");
    expect(result.ok).toBe(false);
  });

  test("accepts when siteverify returns success: true", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "pk_test");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "sk_test");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ success: true }),
      })),
    );

    const result = await verifyTurnstileToken("good-token", "1.2.3.4");
    expect(result).toEqual({ ok: true });
  });

  test("rejects when siteverify returns success: false", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "pk_test");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "sk_test");
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

    const result = await verifyTurnstileToken("bad-token");
    expect(result.ok).toBe(false);
  });
});
