import { test, it, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

// test('it should login as admin')
test("should login as admin", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. go to /
  await loginPage.goto();

  // 2. fill form
  // 3. click submit
  await loginPage.login("admin@rossmann.pl", "Admin5678");

  // 4. expect "Witaj, Administrator!"
  // expect(page.locator('#greeting-title')).toBe('Witaj, Administrator!')
  // await expect(page).toHaveURL('http://localhost:49979/dashboard.html');
  // await expect(page.getByText("Witaj, Administrator!")).toBeVisible();
  await expect(page).toHaveURL("/dashboard.html");
});

test("should login as tester", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. go to /
  await loginPage.goto();

  // 2. fill form
  // 3. click submit
  await loginPage.login("test@rossmann.pl", "Test1234");

  // 4. expect "Witaj, Administrator!"
  // expect(page.locator('#greeting-title')).toBe('Witaj, Administrator!')
  // await expect(page).toHaveURL('http://localhost:49979/dashboard.html');
  // await expect(page.getByText("Witaj, Tester!")).toBeVisible();
  await expect(page).toHaveURL("/dashboard.html");
});

test("should not pass", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login("test@rossmann.pl", "ZLE_HASLO");

  // await expect(page.getByText("Nieprawidłowy email lub hasło")).toBeVisible();
  await expect(loginPage.errorMessage).toBeVisible();
});

test.skip("wrong test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login("test@rossmann.pl", "Test1234");

  // await page.waitForTimeout(1000);

  // await expect(page.getByText("Nieprawidłowy email lub hasło")).toBeVisible();
  await expect(loginPage.errorMessage).toBeVisible();
});
