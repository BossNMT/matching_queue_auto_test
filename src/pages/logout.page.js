import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { ENV } from '../config/env.config.js';
import { info, debug } from '../utils/logger.utils.js';

export class LogoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.selectors = {
      logoutButton: SELECTORS.LOGOUT.LOGOUT_BUTTON,
      // Login page selectors để verify redirect
      emailInput: SELECTORS.LOGIN.EMAIL_INPUT,
      passwordInput: SELECTORS.LOGIN.PASSWORD_INPUT,
      submitButton: SELECTORS.LOGIN.SUBMIT_BUTTON,
    };
  }

  async navigate() {
    info('Navigating to Logout page');
    await this.page.goto(ROUTES.LOGOUT);
  }

  async waitForPageLoaded() {
    info('Waiting for Logout page to load');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Nhấn nút Đăng xuất
   */
  async clickLogoutButton() {
    info('Clicking Logout button');
    await this.page.locator(this.selectors.logoutButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Kiểm tra có đang ở trang Login không
   */
  async isOnLoginPage() {
    info('Checking if on Login page');
    const currentURL = this.page.url();
    return currentURL.includes('/login');
  }

  /**
   * Kiểm tra các elements của trang Login có hiển thị không
   */
  async isLoginFormVisible() {
    info('Checking if Login form is visible');
    const emailInput = await this.page.locator(this.selectors.emailInput).first();
    const passwordInput = await this.page.locator(this.selectors.passwordInput).first();
    const submitButton = await this.page.locator(this.selectors.submitButton).first();

    const isEmailVisible = await emailInput.isVisible();
    const isPasswordVisible = await passwordInput.isVisible();
    const isSubmitVisible = await submitButton.isVisible();

    return isEmailVisible && isPasswordVisible && isSubmitVisible;
  }

  /**
   * Lấy URL hiện tại
   */
  getCurrentURL() {
    return this.page.url();
  }

  /**
   * Kiểm tra nút Đăng xuất có hiển thị không
   */
  async isLogoutButtonVisible() {
    info('Checking if Logout button is visible');
    const count = await this.page.locator(this.selectors.logoutButton).count();
    if (count === 0) return false;
    
    const button = await this.page.locator(this.selectors.logoutButton).first();
    return await button.isVisible();
  }
}