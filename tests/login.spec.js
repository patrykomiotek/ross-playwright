import { test, it, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

// test('it should login as admin')
test("should login as admin", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("admin@rossmann.pl", "Admin5678");

  // expect(page.locator('#greeting-title')).toBe('Witaj, Administrator!')
  await expect(page.getByText("Witaj, Administrator!")).toBeVisible();
  // 1. /
  // 2. fill form
  // 3. click submit
  // 4. expect "Witaj, Admin"
});

// it('should login as tester', async ({ page }) => {
//   // 1. /
//   // 2. fill form
//   // 3. click submit
//   // 4. expect "Witaj, Test"
// });
