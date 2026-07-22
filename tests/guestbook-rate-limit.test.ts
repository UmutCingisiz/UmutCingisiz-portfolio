import { afterEach, describe, expect, test, vi } from "vitest";

import { getGuestbookRateLimits } from "@/lib/guestbook-rate-limit";

describe("guestbook rate limits", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("uses defaults when env is empty", () => {
    vi.stubEnv("GUESTBOOK_RATE_PER_MINUTE", "");
    vi.stubEnv("GUESTBOOK_RATE_PER_DAY", "");
    expect(getGuestbookRateLimits()).toEqual({ perMinute: 5, perDay: 30 });
  });

  test("raises daily floor to at least per-minute", () => {
    vi.stubEnv("GUESTBOOK_RATE_PER_MINUTE", "10");
    vi.stubEnv("GUESTBOOK_RATE_PER_DAY", "3");
    expect(getGuestbookRateLimits()).toEqual({ perMinute: 10, perDay: 10 });
  });

  test("ignores invalid env values", () => {
    vi.stubEnv("GUESTBOOK_RATE_PER_MINUTE", "0");
    vi.stubEnv("GUESTBOOK_RATE_PER_DAY", "abc");
    expect(getGuestbookRateLimits()).toEqual({ perMinute: 5, perDay: 30 });
  });
});
