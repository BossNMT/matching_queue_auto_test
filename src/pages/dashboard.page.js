/**
 * Dashboard Page Object Model
 * Quản lý tất cả các interactions với trang Dashboard
 */

import { expect } from '@playwright/test';
import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { ENV } from '../config/env.config.js';
import { info } from '../utils/logger.utils.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.selectors = {
      userMenu: SELECTORS.DASHBOARD.USER_MENU,
      logoutButton: SELECTORS.DASHBOARD.LOGOUT_BUTTON,
      profileLink: SELECTORS.DASHBOARD.PROFILE_LINK,
      notificationsIcon: SELECTORS.DASHBOARD.NOTIFICATIONS_ICON,
    };
  }

  /**
   * Navigate to dashboard page
   */
  async navigate() {
    info('Navigating to Dashboard page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.DASHBOARD}`);
  }

  /**
   * Verify dashboard page loaded
   */
  async verifyDashboardLoaded() {
    info('Verifying dashboard page loaded');
    const currentUrl = this.getCurrentUrl();
    expect(currentUrl).toMatch(/dashboard|home/);
  }

  /**
   * Click user menu
   */
  async clickUserMenu() {
    info('Clicking user menu');
    await this.click(this.selectors.userMenu);
  }

  /**
   * Click logout button
   */
  async clickLogout() {
    info('Clicking logout button');
    await this.click(this.selectors.logoutButton);
  }

  /**
   * Logout from application
   */
  async logout() {
    info('Performing logout');
    await this.clickUserMenu();
    await this.clickLogout();
    
    // Wait for redirect to login page
    await this.waitForURL(ROUTES.LOGIN);
  }

  /**
   * Check if user is logged in
   * @returns {Promise<boolean>}
   */
  async isUserLoggedIn() {
    const currentUrl = this.getCurrentUrl();
    return !currentUrl.includes('/login') && !currentUrl.includes('/register');
  }

  /**
   * Verify user menu is visible
   */
  async verifyUserMenuVisible() {
    await expect(this.page.locator(this.selectors.userMenu)).toBeVisible();
  }
}

export default DashboardPage;

