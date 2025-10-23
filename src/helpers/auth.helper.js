/**
 * Authentication Helper
 * Helper functions cho authentication flow
 */

import { ENV } from '../config/env.config.js';
import { LoginPage } from '../../pages/login.page.js';
import { info } from '../utils/logger.utils.js';

/**
 * Login helper function
 * @param {import('@playwright/test').Page} page 
 * @param {string} email 
 * @param {string} password 
 */
export async function login(page, email = ENV.TEST_USER.VALID_EMAIL, password = ENV.TEST_USER.VALID_PASSWORD) {
  info(`Logging in with email: ${email}`);
  
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(email, password);
  
  // Wait for potential redirect
  await page.waitForTimeout(2000);
}

/**
 * Logout helper function
 * @param {import('@playwright/test').Page} page 
 */
export async function logout(page) {
  info('Logging out');
  
  // Try to find and click logout button
  const logoutSelectors = [
    'button:has-text("Đăng xuất")',
    'a:has-text("Đăng xuất")',
    '[data-testid="logout"]',
    '.logout-button',
  ];
  
  for (const selector of logoutSelectors) {
    try {
      const element = page.locator(selector);
      if (await element.isVisible({ timeout: 2000 })) {
        await element.click();
        await page.waitForTimeout(1000);
        return;
      }
    } catch {
      // Continue to next selector
    }
  }
  
  info('Logout button not found');
}

/**
 * Check if user is authenticated
 * @param {import('@playwright/test').Page} page 
 * @returns {Promise<boolean>}
 */
export async function isAuthenticated(page) {
  const currentUrl = page.url();
  return !currentUrl.includes('/login') && !currentUrl.includes('/register');
}

/**
 * Setup authenticated session (using storage state)
 * @param {import('@playwright/test').Page} page 
 */
export async function setupAuthenticatedSession(page) {
  info('Setting up authenticated session');
  
  await login(page);
  
  // Save storage state
  const storage = await page.context().storageState();
  return storage;
}

/**
 * Clear session
 * @param {import('@playwright/test').Page} page 
 */
export async function clearSession(page) {
  info('Clearing session');
  
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  
  await page.context().clearCookies();
}

export default {
  login,
  logout,
  isAuthenticated,
  setupAuthenticatedSession,
  clearSession,
};

