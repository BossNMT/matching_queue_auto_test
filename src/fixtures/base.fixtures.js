/**
 * Base Fixtures
 * Custom fixtures cho tất cả các test cases
 */

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { ApiHelper } from '../common/api.helper.js';
import { ENV } from '../config/env.config.js';
import { info } from '../utils/logger.utils.js';

/**
 * Extended test với custom fixtures
 */
export const test = base.extend({
  /**
   * Login Page fixture
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * API Helper fixture
   */
  apiHelper: async ({ page }, use) => {
    const apiHelper = new ApiHelper(page);
    await use(apiHelper);
  },

  /**
   * Authenticated page fixture
   * Tự động login trước khi chạy test
   */
  authenticatedPage: async ({ page }, use) => {
    info('Setting up authenticated session');
    
    // Navigate to login page
    await page.goto(`${ENV.BASE_URL}/login`);
    
    // Perform login
    const loginPage = new LoginPage(page);
    await loginPage.login(ENV.TEST_USER.VALID_EMAIL, ENV.TEST_USER.VALID_PASSWORD);
    
    // Wait for navigation to dashboard
    await page.waitForURL(/dashboard|home/, { timeout: 10000 }).catch(() => {
      info('Login successful but no redirect detected');
    });
    
    await use(page);
    
    // Cleanup after test
    info('Cleaning up authenticated session');
  },

  /**
   * Base URL fixture
   */
  baseURL: async ({}, use) => {
    await use(ENV.BASE_URL);
  },

  /**
   * Test data fixture
   */
  testData: async ({}, use) => {
    const data = {
      validUser: {
        email: ENV.TEST_USER.VALID_EMAIL,
        password: ENV.TEST_USER.VALID_PASSWORD,
      },
      invalidUser: {
        email: ENV.TEST_USER.INVALID_EMAIL,
        password: ENV.TEST_USER.INVALID_PASSWORD,
      },
    };
    await use(data);
  },

  /**
   * Auto screenshot fixture - automatically takes screenshots on failure
   * This runs after each test
   */
  page: async ({ page }, use, testInfo) => {
    await use(page);
    
    // Take screenshot on test failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = testInfo.outputPath(`failure-${Date.now()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      await testInfo.attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    }
  },
});

/**
 * Export expect from @playwright/test
 */
export { expect } from '@playwright/test';

export default test;

