import { afterEach, describe, expect, test, vi } from "vitest";

import {
  logPortfolioError,
  logPortfolioEvent,
} from "@/lib/observability";

describe("observability helpers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("logs structured portfolio events", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});

    logPortfolioEvent("contact.sent", { source: "test" });

    expect(info).toHaveBeenCalledOnce();
    const [prefix, raw] = info.mock.calls[0];
    expect(prefix).toBe("[portfolio:event]");
    expect(JSON.parse(String(raw))).toMatchObject({
      event: "contact.sent",
      source: "test",
    });
  });

  test("logs structured portfolio errors without leaking stack traces", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    logPortfolioError("contact.send_failed", new Error("boom"));

    expect(error).toHaveBeenCalledOnce();
    const [prefix, raw] = error.mock.calls[0];
    expect(prefix).toBe("[portfolio:error]");
    expect(JSON.parse(String(raw))).toMatchObject({
      event: "contact.send_failed",
      error: "boom",
    });
  });
});
