import { test, expect } from "@playwright/test";

test.describe("Pages publiques", () => {
  test("landing charge et affiche le funnel", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#funnel")).toBeVisible();
  });

  test("page tarifs", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { name: /tarifs/i })).toBeVisible();
  });

  test("page contact", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible();
  });

  test("health API", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.status).toBe("ok");
  });

  test("mot de passe oublié", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByRole("heading", { name: /mot de passe oublié/i })).toBeVisible();
  });
});
