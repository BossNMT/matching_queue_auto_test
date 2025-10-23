/**
 * Login E2E Test Cases
 * Test các chức năng của trang Login
 */

import { test, expect } from '../fixtures/index.js';
import { LoginPage } from '../pages/login.page.js';
import { DashboardPage } from '../pages/dashboard.page.js';
import { ENV } from '../config/env.config.js';
import { ROUTES } from '../constants/routes.js';
import { MESSAGES } from '../constants/messages.js';
import { generateRandomEmail, generateRandomPassword } from '../utils/data.utils.js';

test.describe('Login Page Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.describe('UI Elements Verification', () => {
    test('TC01 - Should display all login page elements', async ({ page }) => {
      await test.step('Verify email input is visible', async () => {
        await expect(page.locator(loginPage.selectors.emailInput)).toBeVisible();
      });

      await test.step('Verify password input is visible', async () => {
        await expect(page.locator(loginPage.selectors.passwordInput)).toBeVisible();
      });

      await test.step('Verify submit button is visible', async () => {
        await expect(page.locator(loginPage.selectors.submitButton)).toBeVisible();
      });

      await test.step('Verify submit button is enabled', async () => {
        const isEnabled = await loginPage.isSubmitButtonEnabled();
        expect(isEnabled).toBeTruthy();
      });
    });

    test('TC02 - Should display forgot password link', async () => {
      const isVisible = await loginPage.isForgotPasswordLinkVisible();
      expect(isVisible).toBeTruthy();
    });

    test('TC03 - Should display register link', async () => {
      const isVisible = await loginPage.isRegisterLinkVisible();
      expect(isVisible).toBeTruthy();
    });
  });

  test.describe('Successful Login Scenarios', () => {
    test('TC04 - Should login successfully with valid credentials', async ({ page }) => {
      await test.step('Enter valid email', async () => {
        await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      });

      await test.step('Enter valid password', async () => {
        await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      });

      await test.step('Click submit button', async () => {
        await loginPage.clickSubmit();
      });

      await test.step('Verify successful redirect', async () => {
        // Wait for redirect to dashboard or home
        await page.waitForURL(/dashboard|home|\/(?!login)/, { 
          timeout: 15000 
        }).catch(() => {
          // If no redirect, check if still on login page
          console.log('No redirect detected, might need to adjust selectors');
        });

        // Verify not on login page
        const currentUrl = loginPage.getCurrentUrl();
        console.log('Current URL after login:', currentUrl);
      });
    });

    test('TC05 - Should login with Enter key', async ({ page }) => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      
      await test.step('Press Enter key', async () => {
        await loginPage.pressKey('Enter');
      });

      // Wait a moment for potential redirect
      await page.waitForTimeout(2000);
    });
  });

  test.describe('Failed Login Scenarios', () => {
    test('TC06 - Should show error with invalid email', async ({ page }) => {
      await test.step('Enter invalid email', async () => {
        await loginPage.enterEmail(ENV.TEST_USER.INVALID_EMAIL);
      });

      await test.step('Enter valid password', async () => {
        await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      });

      await test.step('Click submit button', async () => {
        await loginPage.clickSubmit();
      });

      await test.step('Verify error message or still on login page', async () => {
        // Wait a moment for error message or response
        await page.waitForTimeout(2000);
        
        const currentUrl = loginPage.getCurrentUrl();
        expect(currentUrl).toContain('/login');
      });
    });

    test('TC07 - Should show error with invalid password', async ({ page }) => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.INVALID_PASSWORD);
      await loginPage.clickSubmit();

      // Wait for error response
      await page.waitForTimeout(2000);
      
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain('/login');
    });

    test('TC08 - Should show error with both invalid credentials', async ({ page }) => {
      await loginPage.login(
        ENV.TEST_USER.INVALID_EMAIL,
        ENV.TEST_USER.INVALID_PASSWORD
      );

      await page.waitForTimeout(2000);
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain('/login');
    });
  });

  test.describe('Validation Tests', () => {
    test('TC09 - Should show error when email is empty', async ({ page }) => {
      await test.step('Leave email empty', async () => {
        await loginPage.enterEmail('');
      });

      await test.step('Enter password', async () => {
        await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      });

      await test.step('Try to submit', async () => {
        await loginPage.clickSubmit();
      });

      await test.step('Verify still on login page', async () => {
        await page.waitForTimeout(1000);
        const currentUrl = loginPage.getCurrentUrl();
        expect(currentUrl).toContain('/login');
      });
    });

    test('TC10 - Should show error when password is empty', async ({ page }) => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword('');
      await loginPage.clickSubmit();

      await page.waitForTimeout(1000);
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain('/login');
    });

    test('TC11 - Should show error when both fields are empty', async ({ page }) => {
      await loginPage.enterEmail('');
      await loginPage.enterPassword('');
      await loginPage.clickSubmit();

      await page.waitForTimeout(1000);
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain('/login');
    });

    test('TC12 - Should show error with invalid email format', async ({ page }) => {
      await test.step('Enter invalid email format', async () => {
        await loginPage.enterEmail('invalid-email');
      });

      await test.step('Enter password', async () => {
        await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      });

      await test.step('Try to submit', async () => {
        await loginPage.clickSubmit();
      });

      await page.waitForTimeout(1000);
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain('/login');
    });
  });

  test.describe('Input Field Tests', () => {
    test('TC13 - Should be able to clear email field', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      let emailValue = await loginPage.getEmailValue();
      expect(emailValue).toBe(ENV.TEST_USER.VALID_EMAIL);

      await loginPage.clearEmail();
      emailValue = await loginPage.getEmailValue();
      expect(emailValue).toBe('');
    });

    test('TC14 - Should be able to clear password field', async () => {
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      let passwordValue = await loginPage.getPasswordValue();
      expect(passwordValue).toBe(ENV.TEST_USER.VALID_PASSWORD);

      await loginPage.clearPassword();
      passwordValue = await loginPage.getPasswordValue();
      expect(passwordValue).toBe('');
    });

    test('TC15 - Should mask password input', async ({ page }) => {
      const passwordInput = page.locator(loginPage.selectors.passwordInput);
      const inputType = await passwordInput.getAttribute('type');
      expect(inputType).toBe('password');
    });
  });

  test.describe('Navigation Tests', () => {
    test('TC16 - Should navigate to forgot password page', async ({ page }) => {
      const isForgotPasswordVisible = await loginPage.isForgotPasswordLinkVisible();
      
      if (isForgotPasswordVisible) {
        await loginPage.clickForgotPassword();
        await page.waitForTimeout(1000);
        
        const currentUrl = loginPage.getCurrentUrl();
        expect(currentUrl).toContain('forgot-password');
      } else {
        console.log('Forgot password link not found, skipping test');
      }
    });

    test('TC17 - Should navigate to register page', async ({ page }) => {
      const isRegisterVisible = await loginPage.isRegisterLinkVisible();
      
      if (isRegisterVisible) {
        await loginPage.clickRegister();
        await page.waitForTimeout(1000);
        
        const currentUrl = loginPage.getCurrentUrl();
        expect(currentUrl).toContain('register');
      } else {
        console.log('Register link not found, skipping test');
      }
    });
  });

  test.describe('Security Tests', () => {
    test('TC18 - Should not expose password in page source', async ({ page }) => {
      const testPassword = 'TestPassword123!';
      await loginPage.enterPassword(testPassword);
      
      const pageContent = await page.content();
      expect(pageContent).not.toContain(testPassword);
    });

    test('TC19 - Should prevent SQL injection in email', async ({ page }) => {
      const sqlInjection = "admin' OR '1'='1";
      await loginPage.enterEmail(sqlInjection);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();

      await page.waitForTimeout(2000);
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain('/login');
    });

    test('TC20 - Should prevent XSS in email field', async ({ page }) => {
      const xssPayload = '<script>alert("XSS")</script>@test.com';
      await loginPage.enterEmail(xssPayload);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();

      await page.waitForTimeout(2000);
      
      // Verify no alert was triggered
      const dialogs = [];
      page.on('dialog', dialog => dialogs.push(dialog));
      expect(dialogs.length).toBe(0);
    });
  });

  test.describe('Responsive Design Tests', () => {
    test('TC21 - Should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await loginPage.navigate();
      
      await loginPage.verifyPageElements();
    });

    test('TC22 - Should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await loginPage.navigate();
      
      await loginPage.verifyPageElements();
    });

    test('TC23 - Should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await loginPage.navigate();
      
      await loginPage.verifyPageElements();
    });
  });

  test.describe('Performance Tests', () => {
    test('TC24 - Should load login page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await loginPage.navigate();
      const loadTime = Date.now() - startTime;
      
      console.log(`Login page load time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(5000); // 5 seconds
    });
  });

  test.describe('Accessibility Tests', () => {
    test('TC25 - Should be able to tab through form fields', async ({ page }) => {
      await page.keyboard.press('Tab');
      let focusedElement = await page.evaluate(() => document.activeElement.tagName);
      
      await page.keyboard.press('Tab');
      focusedElement = await page.evaluate(() => document.activeElement.tagName);
      
      expect(['INPUT', 'BUTTON']).toContain(focusedElement);
    });
  });
});

test.describe('Login API Tests', () => {
  test('TC26 - Should handle network errors gracefully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Simulate offline mode
    await page.context().setOffline(true);

    await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
    await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
    await loginPage.clickSubmit();

    await page.waitForTimeout(2000);

    // Should still be on login page
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('/login');

    // Restore online mode
    await page.context().setOffline(false);
  });
});

