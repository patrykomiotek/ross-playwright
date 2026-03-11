import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Dashboard", () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login("admin@rossmann.pl", "Admin5678");
    await expect(page.getByText("Witaj, Administrator!")).toBeVisible();
  });

  test.describe("Navigation", () => {
    test("should display navbar", async () => {
      await expect(dashboardPage.navbar).toBeVisible();
    });

    test("should display products and cart links", async () => {
      await expect(dashboardPage.navProducts).toBeVisible();
      await expect(dashboardPage.navCart).toBeVisible();
    });

    test("should display logout button", async () => {
      await expect(dashboardPage.logoutButton).toBeVisible();
    });

    test("should logout and redirect to login page", async ({ page }) => {
      await dashboardPage.logout();
      // await expect(page).toHaveURL(/index\.html/);
      await expect(page).toHaveURL("/index.html");
    });

    test("should navigate to cart page", async ({ page }) => {
      await dashboardPage.goToCart();
      await expect(page).toHaveURL(/cart\.html/);
    });
  });

  test.describe("Product list", () => {
    test("should display products grid", async () => {
      await expect(dashboardPage.productsGrid).toBeVisible();
    });

    test("should display product cards", async () => {
      await dashboardPage.waitForProducts();
      const count = await dashboardPage.getProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("should display add to cart button on each product", async () => {
      await dashboardPage.waitForProducts();
      const productCount = await dashboardPage.getProductCount();
      const buttonCount = await dashboardPage.addToCartButtons.count();
      expect(buttonCount).toBe(productCount);
    });

    test("should navigate to product detail on click", async ({ page }) => {
      await dashboardPage.waitForProducts();
      await dashboardPage.clickProduct(0);
      await expect(page).toHaveURL(/product\.html/);
    });
  });

  test.describe("Search", () => {
    test("should display search input", async () => {
      await expect(dashboardPage.searchInput).toBeVisible();
    });

    test("should filter products by search query", async ({ page }) => {
      await dashboardPage.waitForProducts();
      await dashboardPage.searchProduct("krem");
      const filteredCount = await dashboardPage.getProductCount();
      expect(filteredCount).toBeGreaterThan(0);

      await dashboardPage.searchProduct("");
      const allCount = await dashboardPage.getProductCount();
      expect(filteredCount).toBeLessThanOrEqual(allCount);
    });

    test("should show no products for non-existing query", async () => {
      await dashboardPage.waitForProducts();
      await dashboardPage.searchProduct("xyznonexistent123");
      await expect(dashboardPage.productCards).toHaveCount(0);
    });
  });

  test.describe("Cart", () => {
    test("should add product to cart and update badge", async () => {
      await dashboardPage.waitForProducts();

      await dashboardPage.addProductToCart(0);
      const productsInCart = await dashboardPage.getCartBadgeCount();

      await dashboardPage.addProductToCart(1);
      await dashboardPage.addProductToCart(2);
      const newProductsInCart = await dashboardPage.getCartBadgeCount();

      await expect(dashboardPage.cartBadge).toBeVisible();
      expect(productsInCart).not.toBe(newProductsInCart);
      expect(newProductsInCart).toBe("3");
    });

    test("should increment cart badge on multiple adds", async () => {
      await dashboardPage.waitForProducts();
      await dashboardPage.addProductToCart(0);
      await dashboardPage.addProductToCart(1);
      const badgeText = await dashboardPage.getCartBadgeCount();
      expect(Number(badgeText)).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe("Greeting", () => {
    test("should display greeting with user name", async () => {
      const greeting = await dashboardPage.getGreetingText();
      expect(greeting).toContain("Administrator");
    });

    test("should display current date", async () => {
      await expect(dashboardPage.greetingDate).toBeVisible();
    });
  });

  test.describe("Filters and sorting", () => {
    test("should display sort select", async () => {
      await expect(dashboardPage.sortSelect).toBeVisible();
    });

    test("should display filter sidebar", async () => {
      await expect(dashboardPage.filterSidebar).toBeVisible();
    });
  });
});
