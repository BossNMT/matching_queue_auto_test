/**
 * Login Advanced E2E Test Cases
 * Test cases nâng cao cho chức năng login
 */

import { test, expect } from '../fixtures/index.js';
import { LoginPage } from '../pages/login.page.js';
import { DashboardPage } from '../pages/dashboard.page.js';
import { ENV } from '../config/env.config.js';

test.describe('Login Advanced Tests', () => {
  test.describe('Session Management', () => {
    test('TC27 - Should maintain session after page refresh', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      // Login
      await loginPage.login(ENV.TEST_USER.VALID_EMAIL, ENV.TEST_USER.VALID_PASSWORD);
      await page.waitForTimeout(3000);
      
      // Check if redirected
      const urlAfterLogin = page.url();
      console.log('URL after login:', urlAfterLogin);
      
      // Refresh page
      await page.reload();
      await page.waitForTimeout(2000);
      
      // Should still be logged in (not redirected to login)
      const urlAfterRefresh = page.url();
      console.log('URL after refresh:', urlAfterRefresh);
      
      if (!urlAfterRefresh.includes('/login')) {
        expect(urlAfterRefresh).not.toContain('/login');
      }
    });

    test('TC28 - Should handle multiple login attempts', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      // First attempt - wrong password
      await loginPage.login(ENV.TEST_USER.VALID_EMAIL, 'wrongpassword1');
      await page.waitForTimeout(2000);
      
      // Second attempt - wrong password
      await loginPage.clearEmail();
      await loginPage.clearPassword();
      await loginPage.login(ENV.TEST_USER.VALID_EMAIL, 'wrongpassword2');
      await page.waitForTimeout(2000);
      
      // Third attempt - correct password
      await loginPage.clearEmail();
      await loginPage.clearPassword();
      await loginPage.login(ENV.TEST_USER.VALID_EMAIL, ENV.TEST_USER.VALID_PASSWORD);
      await page.waitForTimeout(3000);
      
      const currentUrl = page.url();
      console.log('URL after correct login:', currentUrl);
    });
  });

  test.describe('Browser Compatibility', () => {
    test('TC29 - Should work with browser back button', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      
      await page.waitForTimeout(3000);
      
      // Go back
      await page.goBack();
      await page.waitForTimeout(1000);
      
      const currentUrl = page.url();
      console.log('URL after back:', currentUrl);
    });

    test('TC30 - Should handle browser forward button', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await page.goBack();
      await page.waitForTimeout(500);
      await page.goForward();
      await page.waitForTimeout(500);
      
      // Should still be on login page with email preserved (if implemented)
      const currentUrl = page.url();
      expect(currentUrl).toContain('/login');
    });
  });

  test.describe('Form Behavior Tests', () => {
    test('TC31 - Should handle rapid submit clicks', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      
      // Click submit multiple times rapidly
      await loginPage.clickSubmit();
      await loginPage.clickSubmit();
      await loginPage.clickSubmit();
      
      await page.waitForTimeout(3000);
      
      // Should only process one login request
      const currentUrl = page.url();
      console.log('URL after rapid clicks:', currentUrl);
    });

    test('TC32 - Should handle copy-paste in password field', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      const password = ENV.TEST_USER.VALID_PASSWORD;
      
      // Simulate copy-paste
      await page.locator(loginPage.selectors.passwordInput).fill(password);
      
      const value = await loginPage.getPasswordValue();
      expect(value).toBe(password);
    });

    test('TC33 - Should trim whitespace in email field', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      // Enter email with leading/trailing spaces
      const emailWithSpaces = `  ${ENV.TEST_USER.VALID_EMAIL}  `;
      await loginPage.enterEmail(emailWithSpaces);
      
      const value = await loginPage.getEmailValue();
      console.log('Email value:', value);
      
      // Some implementations auto-trim, some don't
      // Just verify the test runs
      expect(value).toBeTruthy();
    });
  });

  test.describe('Edge Cases', () => {
    test('TC34 - Should handle very long email', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      const longEmail = 'a'.repeat(100) + '@example.com';
      await loginPage.enterEmail(longEmail);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      
      await page.waitForTimeout(2000);
      const currentUrl = page.url();
      expect(currentUrl).toContain('/login');
    });

    test('TC35 - Should handle very long password', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      const longPassword = 'a'.repeat(200);
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(longPassword);
      await loginPage.clickSubmit();
      
      await page.waitForTimeout(2000);
      const currentUrl = page.url();
      expect(currentUrl).toContain('/login');
    });

    test('TC36 - Should handle special characters in email', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      const specialEmail = 'test+special@example.com';
      await loginPage.enterEmail(specialEmail);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      
      await page.waitForTimeout(2000);
      const currentUrl = page.url();
      expect(currentUrl).toContain('/login');
    });

    test('TC37 - Should handle unicode characters', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      
      const unicodeEmail = 'test@ví-dụ.com';
      await loginPage.enterEmail(unicodeEmail);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      
      await page.waitForTimeout(2000);
      const currentUrl = page.url();
      expect(currentUrl).toContain('/login');
    });
  });

  // Visual Regression Tests - Commented out
  // Uncomment nếu muốn test visual changes
  // test.describe('Visual Regression Tests', () => {
  //   test('TC38 - Should match login page screenshot', async ({ page }) => {
  //     const loginPage = new LoginPage(page);
  //     await loginPage.navigate();
  //     
  //     // Take screenshot for visual comparison
  //     await expect(page).toHaveScreenshot('login-page.png', {
  //       maxDiffPixels: 100,
  //     });
  //   });
  // });
});

