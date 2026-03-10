export class DashboardPage {
  constructor(page) {
    this.page = page;

    // Greeting
    this.greetingTitle = page.locator("#greeting-title");
    this.greetingDate = page.locator("#greeting-date");

    // Navigation
    this.navbar = page.locator('[data-testid="navbar"]');
    this.navProducts = page.locator('[data-testid="nav-products"]');
    this.navCart = page.locator('[data-testid="nav-cart"]');
    this.cartBadge = page.locator('[data-testid="cart-badge"]');
    this.logoutButton = page.locator('[data-testid="logout-button"]');

    // Search
    this.searchInput = page.locator('[data-testid="search-input"]');

    // Product list (scoped to main grid, excluding recommended section)
    this.productsGrid = page.locator('[data-testid="products-grid"]');
    this.productCards = this.productsGrid.locator('[data-testid="product-card"]');
    this.productLinks = this.productsGrid.locator('[data-testid="product-link"]');
    this.productPrices = this.productsGrid.locator('[data-testid="product-price"]');
    this.addToCartButtons = this.productsGrid.locator('[data-testid="add-to-cart-btn"]');

    // Filters
    this.filterSidebar = page.locator('[data-testid="filter-sidebar"]');
    this.sortSelect = page.locator('[data-testid="sort-select"]');

    // Recommended
    this.recommendedSection = page.locator('[data-testid="recommended-section"]');
  }

  async goto() {
    await this.page.goto("/dashboard.html");
  }

  async waitForProducts() {
    await this.productCards.first().waitFor({ state: "visible" });
  }

  async searchProduct(query) {
    await this.searchInput.fill(query);
    await this.searchInput.dispatchEvent("input");
  }

  async addProductToCart(index = 0) {
    await this.addToCartButtons.nth(index).click();
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async getCartBadgeCount() {
    return await this.cartBadge.textContent();
  }

  async getGreetingText() {
    return await this.greetingTitle.textContent();
  }

  async sortBy(value) {
    await this.sortSelect.selectOption(value);
  }

  async filterByCategory(category) {
    await this.page
      .locator(`[data-testid="filter-${category}"]`)
      .click();
  }

  async clickProduct(index = 0) {
    await this.productLinks.nth(index).click();
  }

  async goToCart() {
    await this.navCart.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
