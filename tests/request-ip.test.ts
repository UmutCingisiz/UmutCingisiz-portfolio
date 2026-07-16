import { describe, expect, test } from "vitest";

import { anonymizeIp, getClientIp } from "@/lib/request-ip";

describe("request-ip helpers", () => {
  test("prefers x-forwarded-for first value", () => {
    const headers = {
      get(name: string) {
        if (name === "x-forwarded-for") {
          return "1.2.3.4, 5.6.7.8";
        }
        return null;
      },
    };

    expect(getClientIp(headers)).toBe("1.2.3.4");
  });

  test("falls back to x-real-ip", () => {
    const headers = {
      get(name: string) {
        if (name === "x-real-ip") {
          return "9.9.9.9";
        }
        return null;
      },
    };

    expect(getClientIp(headers)).toBe("9.9.9.9");
  });

  test("returns unknown when no headers exist", () => {
    const headers = { get: () => null };
    expect(getClientIp(headers)).toBe("unknown");
  });

  test("anonymizeIp returns stable 24-char hash", () => {
    const hashedA = anonymizeIp("1.2.3.4");
    const hashedB = anonymizeIp("1.2.3.4");

    expect(hashedA).toHaveLength(24);
    expect(hashedA).toBe(hashedB);
  });
});
