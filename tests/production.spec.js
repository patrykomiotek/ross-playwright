import { test, expect } from "@playwright/test";

async function scrollToBottom(page) {
  let previousHeight = 0;

  while (true) {
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);

    if (currentHeight === previousHeight) break;

    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000); // wait for new content to load
  }
}

test("ad and remove product from the basket", async ({ page }) => {
  await page.goto("https://www.example.pl/");

  await page.waitForTimeout(2_000);

  await page.getByRole("button", { name: "Zgoda na wszystkie" }).click();

  await scrollToBottom(page);

  await page
    .getByRole("button", { name: "Dodaj do koszyka MISSHA" })
    // .kaczka()
    .click();
  await page
    .getByRole("link", {
      name: "MISSHA Perfect Cover krem BB do twarzy, SPF 42, nr 23 Natural Beige",
      exact: true,
    })
    .click();
  await page.getByTestId("nav-basket").click();
  await page.getByTestId("product-remove-from-basket-button").click();
  await page.getByTestId("empty-basket-header").click();

  expect(page.getByText(/twój koszyk jest pusty/i));
});
