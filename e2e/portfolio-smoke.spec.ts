import { expect, test } from "@playwright/test";

test("home page exposes hiring proof and project CTAs", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Umut Cingisiz/i })).toBeVisible();
  await expect(page.getByText("hiring.proof")).toBeVisible();
  await expect(page.getByText("reviewer_path")).toBeVisible();
  await expect(page.getByRole("link", { name: /Projeleri incele/i })).toBeVisible();
});

test("projects page shows case-study cards", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.getByRole("heading", { name: /Projeler/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Bloomedu/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Bu portfolyo/i }).first()).toBeVisible();
  await expect(page.getByText("problem").first()).toBeVisible();
  await expect(page.getByText("decision").first()).toBeVisible();
});

test("project detail exposes architectural decision cards", async ({ page }) => {
  await page.goto("/projects/portfolio-web");

  await expect(page.getByRole("heading", { name: /full-stack mühendislik kanıtı/i })).toBeVisible();
  await expect(page.getByText("architecture.decisions")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Problem → karar → etki/i })).toBeVisible();
  await expect(page.getByText("product.screens")).toBeVisible();
});

test("blog and guestbook public flows are reachable", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Blog", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Server Actions ile formlar" })).toBeVisible();

  await page.goto("/guestbook");
  await expect(page.getByRole("heading", { name: /Ziyaretçi defteri/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /GitHub ile giriş/i })).toBeVisible();
});
