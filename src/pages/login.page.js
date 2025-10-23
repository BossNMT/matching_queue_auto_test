/**
 * Login Page Object Model
 * Quản lý tất cả các interactions với trang Login
 */

import { expect } from '@playwright/test';
import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { MESSAGES } from '../constants/messages.js';
import { ENV } from '../config/env.config.js';
import { info, debug } from '../utils/logger.utils.js';
import { isValidEmail } from '../utils/validation.utils.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.selectors = {
      emailInput: SELECTORS.LOGIN.EMAIL_INPUT,
      passwordInput: SELECTORS.LOGIN.PASSWORD_INPUT,
      submitButton: SELECTORS.LOGIN.SUBMIT_BUTTON,
      forgotPasswordLink: SELECTORS.LOGIN.FORGOT_PASSWORD_LINK,
      registerLink: SELECTORS.LOGIN.REGISTER_LINK,
      googleLoginButton: SELECTORS.LOGIN.GOOGLE_LOGIN_BUTTON,
      facebookLoginButton: SELECTORS.LOGIN.FACEBOOK_LOGIN_BUTTON,
      errorMessage: SELECTORS.LOGIN.ERROR_MESSAGE,
      successMessage: SELECTORS.LOGIN.SUCCESS_MESSAGE,
      rememberMeCheckbox: SELECTORS.LOGIN.REMEMBER_ME_CHECKBOX,
      pageTitle: SELECTORS.LOGIN.PAGE_TITLE,
      logo: SELECTORS.LOGIN.LOGO,
      featureItems: SELECTORS.LOGIN.FEATURE_ITEMS,
      loadingSpinner: SELECTORS.LOGIN.LOADING_SPINNER,
    };
  }

  /**
   * Navigate to login page
   */
  async navigate() {
    info('Navigating to Login page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.LOGIN}`);
    await this.waitForPageLoaded();
  }

  /**
   * Wait for login page to load
   */
  async waitForPageLoaded() {
    debug('Waiting for login page to load');
    await Promise.all([
      this.waitFor(this.selectors.emailInput),
      this.waitFor(this.selectors.passwordInput),
      this.waitFor(this.selectors.submitButton),
    ]);
  }

  /**
   * Enter email
   * @param {string} email 
   */
  async enterEmail(email) {
    info(`Entering email: ${email}`);
    await this.fill(this.selectors.emailInput, email);
  }

  /**
   * Enter password
   * @param {string} password 
   */
  async enterPassword(password) {
    info('Entering password');
    await this.fill(this.selectors.passwordInput, password);
  }

  /**
   * Click submit button
   */
  async clickSubmit() {
    info('Clicking submit button');
    await this.click(this.selectors.submitButton);
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword() {
    info('Clicking forgot password link');
    await this.click(this.selectors.forgotPasswordLink);
  }

  /**
   * Click register link
   */
  async clickRegister() {
    info('Clicking register link');
    await this.click(this.selectors.registerLink);
  }

  /**
   * Login with credentials
   * @param {string} email 
   * @param {string} password 
   */
  async login(email, password) {
    info(`Performing login with email: ${email}`);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmit();
  }

  /**
   * Login with Google
   */
  async loginWithGoogle() {
    info('Attempting to login with Google');
    await this.click(this.selectors.googleLoginButton);
  }

  /**
   * Login with Facebook
   */
  async loginWithFacebook() {
    info('Attempting to login with Facebook');
    await this.click(this.selectors.facebookLoginButton);
  }

  /**
   * Get error message
   * @returns {Promise<string|null>}
   */
  async getErrorMessage() {
    try {
      const isErrorVisible = await this.isVisible(this.selectors.errorMessage);
      if (isErrorVisible) {
        const message = await this.getText(this.selectors.errorMessage);
        info(`Error message: ${message}`);
        return message;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Get success message
   * @returns {Promise<string|null>}
   */
  async getSuccessMessage() {
    try {
      const isSuccessVisible = await this.isVisible(this.selectors.successMessage);
      if (isSuccessVisible) {
        const message = await this.getText(this.selectors.successMessage);
        info(`Success message: ${message}`);
        return message;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if submit button is enabled
   * @returns {Promise<boolean>}
   */
  async isSubmitButtonEnabled() {
    return await this.isEnabled(this.selectors.submitButton);
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>}
   */
  async isErrorMessageDisplayed() {
    return await this.isVisible(this.selectors.errorMessage);
  }

  /**
   * Get email input value
   * @returns {Promise<string>}
   */
  async getEmailValue() {
    return await this.page.inputValue(this.selectors.emailInput);
  }

  /**
   * Get password input value
   * @returns {Promise<string>}
   */
  async getPasswordValue() {
    return await this.page.inputValue(this.selectors.passwordInput);
  }

  /**
   * Clear email input
   */
  async clearEmail() {
    await this.page.fill(this.selectors.emailInput, '');
  }

  /**
   * Clear password input
   */
  async clearPassword() {
    await this.page.fill(this.selectors.passwordInput, '');
  }

  /**
   * Check if forgot password link is visible
   * @returns {Promise<boolean>}
   */
  async isForgotPasswordLinkVisible() {
    return await this.isVisible(this.selectors.forgotPasswordLink);
  }

  /**
   * Check if register link is visible
   * @returns {Promise<boolean>}
   */
  async isRegisterLinkVisible() {
    return await this.isVisible(this.selectors.registerLink);
  }

  /**
   * Verify login page elements
   */
  async verifyPageElements() {
    info('Verifying login page elements');
    
    await expect(this.page.locator(this.selectors.emailInput)).toBeVisible();
    await expect(this.page.locator(this.selectors.passwordInput)).toBeVisible();
    await expect(this.page.locator(this.selectors.submitButton)).toBeVisible();
  }

  /**
   * Verify successful login (redirect to dashboard)
   */
  async verifySuccessfulLogin() {
    info('Verifying successful login');
    
    // Wait for URL to change (redirect to dashboard or home)
    await this.page.waitForURL(/dashboard|home|\/(?!login)/, { 
      timeout: 15000 
    });
    
    // Verify not on login page anymore
    const currentUrl = this.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    
    info(`Successfully logged in, current URL: ${currentUrl}`);
  }

  /**
   * Verify failed login
   */
  async verifyFailedLogin() {
    info('Verifying failed login');
    
    // Should still be on login page
    await this.page.waitForTimeout(2000); // Wait for error message
    const currentUrl = this.getCurrentUrl();
    expect(currentUrl).toContain('/login');
    
    // Error message should be displayed
    const hasError = await this.isErrorMessageDisplayed();
    expect(hasError).toBeTruthy();
    
    info('Login failed as expected');
  }

  /**
   * Verify email validation error
   */
  async verifyEmailValidationError() {
    const errorMessage = await this.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  }

  /**
   * Verify password validation error
   */
  async verifyPasswordValidationError() {
    const errorMessage = await this.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  }

  /**
   * Login and wait for navigation
   * @param {string} email 
   * @param {string} password 
   */
  async loginAndWaitForNavigation(email, password) {
    info(`Logging in and waiting for navigation with email: ${email}`);
    
    await this.enterEmail(email);
    await this.enterPassword(password);
    
    await this.waitForNavigation(async () => {
      await this.clickSubmit();
    });
  }

  /**
   * Verify page title
   * @param {string} expectedTitle 
   */
  async verifyPageTitle(expectedTitle) {
    const title = await this.getTitle();
    expect(title).toContain(expectedTitle);
  }

  /**
   * Take screenshot of login page
   * @param {string} name 
   */
  async takeLoginPageScreenshot(name = 'login_page') {
    return await this.screenshot(name);
  }

  /**
   * Check/uncheck Remember Me checkbox
   * @param {boolean} check 
   */
  async setRememberMe(check) {
    const checkbox = this.page.locator(this.selectors.rememberMeCheckbox).first();
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (check && !isChecked) {
      await checkbox.check();
    } else if (!check && isChecked) {
      await checkbox.uncheck();
    }
  }

  /**
   * Check if Remember Me is checked
   * @returns {Promise<boolean>}
   */
  async isRememberMeChecked() {
    try {
      return await this.page.locator(this.selectors.rememberMeCheckbox).first().isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Get page title text
   * @returns {Promise<string>}
   */
  async getPageTitleText() {
    try {
      return await this.page.locator(this.selectors.pageTitle).first().textContent();
    } catch {
      return '';
    }
  }

  /**
   * Check if logo is visible
   * @returns {Promise<boolean>}
   */
  async isLogoVisible() {
    try {
      return await this.page.locator(this.selectors.logo).first().isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Get feature items count
   * @returns {Promise<number>}
   */
  async getFeatureItemsCount() {
    try {
      return await this.page.locator(this.selectors.featureItems).count();
    } catch {
      return 0;
    }
  }

  /**
   * Check if loading spinner is visible
   * @returns {Promise<boolean>}
   */
  async isLoadingSpinnerVisible() {
    try {
      return await this.page.locator(this.selectors.loadingSpinner).isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Check if Remember Me checkbox is visible
   * @returns {Promise<boolean>}
   */
  async isRememberMeVisible() {
    try {
      return await this.page.locator(this.selectors.rememberMeCheckbox).first().isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Get token from localStorage
   * @returns {Promise<string|null>}
   */
  async getAuthToken() {
    return await this.page.evaluate(() => {
      return localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('accessToken');
    });
  }

  /**
   * Get password from localStorage (should not exist)
   * @returns {Promise<string|null>}
   */
  async getPasswordFromLocalStorage() {
    return await this.page.evaluate(() => {
      return localStorage.getItem('password');
    });
  }

  /**
   * Clear localStorage
   */
  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  /**
   * Check if password input type is password
   * @returns {Promise<boolean>}
   */
  async isPasswordMasked() {
    const type = await this.page.locator(this.selectors.passwordInput).getAttribute('type');
    return type === 'password';
  }

  /**
   * Wait for error message to appear
   * @param {number} timeout 
   * @returns {Promise<string|null>}
   */
  async waitForErrorMessage(timeout = 5000) {
    try {
      await this.page.locator(this.selectors.errorMessage).first().waitFor({ state: 'visible', timeout });
      return await this.getErrorMessage();
    } catch {
      return null;
    }
  }
}

export default LoginPage;

