import { expect, Page } from "@playwright/test";
import { env } from "../utils/env";

export class LoginPage{
  constructor(private page: Page){}

  private selectors = {
    usernameInput: '#user-name',
    passwordInput: '#password',
    loginButton: '#login-button',
    titleText: '.login_logo'
  }

  private get username() {
    return this.page.locator(this.selectors.usernameInput);
  }

  private get password() {
    return this.page.locator(this.selectors.passwordInput);
  }

  private get loginButton() {
    return this.page.locator(this.selectors.loginButton);
  }

  private get titleText(){
    return this.page.locator(this.selectors.titleText);
  }

  async goto(){
    await this.page.goto(env.baseURL);
  }

  async assertFormIsClean() {
    await expect(this.username).toHaveValue('');
    await expect(this.password).toHaveValue('');
  }

  async waitForFormReady(){
    await expect(this.titleText).toHaveText('Swag Labs');
    await expect(this.username).toBeEnabled();
    await expect(this.password).toBeEnabled();
    await expect(this.loginButton).toBeEnabled();
  }

  async submitLogin(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  private get hamburgerMenuButton() {
    return this.page.locator("#react-burger-menu-btn");
  }

  private get logoutButtonLink(){
    return this.page.locator("#logout_sidebar_link");
  }

  async logout(){
    await expect(this.hamburgerMenuButton).toBeVisible()
    await this.hamburgerMenuButton.click();
    await expect(this.logoutButtonLink).toBeVisible()
    await this.logoutButtonLink.click();
  }
}
