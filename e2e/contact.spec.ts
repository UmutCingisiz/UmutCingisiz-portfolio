import { expect, test, type Page } from "@playwright/test";

async function gotoContact(page: Page) {
  await page.goto("/#contact");
  await expect(page.getByRole("heading", { name: /konuşalım/i })).toBeVisible();
}

async function fillContact(
  page: Page,
  fields: { name: string; email: string; message: string },
) {
  await page.locator("#contact-name").fill(fields.name);
  await page.locator("#contact-email").fill(fields.email);
  await page.locator("#contact-msg").fill(fields.message);
}

test.describe("contact form", () => {
  test("shows field validation errors", async ({ page }) => {
    await gotoContact(page);

    await fillContact(page, {
      name: "A",
      email: "not-an-email",
      message: "kısa",
    });
    await page.getByRole("button", { name: "Gönder" }).click();

    await expect(page.getByRole("alert").first()).toBeVisible();
    await expect(page).not.toHaveURL(/\?contact=sent/);
  });

  test("successful submit shows toast then lands on home", async ({ page }) => {
    await gotoContact(page);

    await fillContact(page, {
      name: "Playwright Tester",
      email: "happy@example.com",
      message: "Bu bir e2e happy-path mesajıdır — mock Resend.",
    });
    await page.getByRole("button", { name: "Gönder" }).click();

    await expect(page).toHaveURL(/\?contact=sent/);
    await expect(
      page.getByText(/Mailiniz başarıyla gönderildi/i),
    ).toBeVisible();
    await expect(page.locator("#contact-name")).toBeVisible();
    await expect(page).not.toHaveURL(/\?contact=sent/, { timeout: 8000 });
  });

  test("rate-limit path returns honest error", async ({ page }) => {
    await gotoContact(page);

    await fillContact(page, {
      name: "Rate Limit",
      email: "rate-limit@example.com",
      message: "Rate limit senaryosu için yeterince uzun mesaj.",
    });
    await page.getByRole("button", { name: "Gönder" }).click();

    await expect(page.getByText(/24 saat içinde en fazla/i)).toBeVisible();
    await expect(page).not.toHaveURL(/\?contact=sent/);
  });

  test("network/send failure path returns honest error", async ({ page }) => {
    await gotoContact(page);

    await fillContact(page, {
      name: "Send Fail",
      email: "send-fail@example.com",
      message: "Send failure senaryosu için yeterince uzun mesaj.",
    });
    await page.getByRole("button", { name: "Gönder" }).click();

    await expect(
      page.getByText(/Mesaj şimdilik gönderilemedi/i),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/\?contact=sent/);
  });
});
