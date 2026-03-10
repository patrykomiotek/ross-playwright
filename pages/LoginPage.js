// pages/LoginPage.ts
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[type="email"]');
    this.passwordInput = page.locator('[type="password"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.errorMessage = page.locator('[data-testid="login-error"]');
  }

  async goto() {
    await this.page.goto("http://localhost:8080/index.html");
    // await this.page.goto("http://localhost:49979/index.html");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getError() {
    return await this.errorMessage.textContent();
  }
}
