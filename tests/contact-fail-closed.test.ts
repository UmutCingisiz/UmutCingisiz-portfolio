import { describe, expect, test } from "vitest";

import { decideContactRateLimit } from "@/lib/contact-rate-limit";

describe("contact rate-limit fail-closed", () => {
  test("blocks when guard is unavailable (never treat as zero priors)", () => {
    const decision = decideContactRateLimit({
      guardFailed: true,
      emailPrior: 0,
      ipPrior: 0,
    });
    expect(decision.ok).toBe(false);
    if (!decision.ok) {
      expect(decision.dimension).toBe("guard");
      expect(decision.error).toMatch(/güvenlik kontrolü/i);
    }
  });

  test("allows when under limits and guard ok", () => {
    const decision = decideContactRateLimit({
      guardFailed: false,
      emailPrior: 0,
      ipPrior: 0,
    });
    expect(decision.ok).toBe(true);
  });

  test("blocks email over daily limit", () => {
    const decision = decideContactRateLimit({
      guardFailed: false,
      emailPrior: 5,
      ipPrior: 0,
    });
    expect(decision.ok).toBe(false);
    if (!decision.ok) {
      expect(decision.dimension).toBe("email");
    }
  });

  test("blocks IP over daily limit", () => {
    const decision = decideContactRateLimit({
      guardFailed: false,
      emailPrior: 0,
      ipPrior: 20,
    });
    expect(decision.ok).toBe(false);
    if (!decision.ok) {
      expect(decision.dimension).toBe("ip");
    }
  });

  test("guard failure wins even if counts look empty", () => {
    const decision = decideContactRateLimit({
      guardFailed: true,
      emailPrior: 0,
      ipPrior: 0,
      maxEmail: 100,
      maxIp: 100,
    });
    expect(decision.ok).toBe(false);
    if (!decision.ok) {
      expect(decision.dimension).toBe("guard");
    }
  });
});
