import { test, expect } from "@playwright/test";

test("page loads and has title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Mapeamento Inicial Busca Terrestre")).toBeVisible();
});
