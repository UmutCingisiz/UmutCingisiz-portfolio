import { describe, expect, test } from "vitest";

import { parseContactFormFields } from "@/lib/contact-schema";

describe("contact form schema", () => {
  test("accepts a valid payload", () => {
    const result = parseContactFormFields({
      name: "Umut",
      email: "umut@example.com",
      message: "Merhaba, portfolyo hakkında konuşalım.",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.email).toBe("umut@example.com");
    }
  });

  test("returns field errors for short name and message", () => {
    const result = parseContactFormFields({
      name: "A",
      email: "not-an-email",
      message: "kısa",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.name).toBeTruthy();
      expect(result.fieldErrors.email).toBeTruthy();
      expect(result.fieldErrors.message).toBeTruthy();
    }
  });
});
