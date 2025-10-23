/**
 * Base Page
 * Class cơ sở cho tất cả các Page Objects
 */

import { expect } from '@playwright/test';
import { waitForElement, waitForPageLoad } from '../utils/wait.utils.js';
import { info, debug } from '../utils/logger.utils.js';

export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to URL
   * @param {string} url 
   */
  async goto(url) {
    info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle' });
    await waitForPageLoad(this.page);
  }

  /**
   * Click element
   * @param {string} selector 
   */
  async click(selector) {
    debug(`Clicking element: ${selector}`);
    await this.page.click(selector);
  }

  /**
   * Fill input
   * @param {string} selector 
   * @param {string} value 
   */
  async fill(selector, value) {
    debug(`Filling ${selector} with: ${value}`);
    await this.page.fill(selector, value);
  }

  /**
   * Type slowly (human-like typing)
   * @param {string} selector 
   * @param {string} value 
   * @param {number} delay 
   */
  async type(selector, value, delay = 100) {
    debug(`Typing into ${selector}: ${value}`);
    await this.page.type(selector, value, { delay });
  }

  /**
   * Get text from element
   * @param {string} selector 
   * @returns {Promise<string>}
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector 
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  /**
   * Check if element is enabled
   * @param {string} selector 
   * @returns {Promise<boolean>}
   */
  async isEnabled(selector) {
    try {
      return await this.page.isEnabled(selector);
    } catch {
      return false;
    }
  }

  /**
   * Wait for selector
   * @param {string} selector 
   * @param {number} timeout 
   */
  async waitFor(selector, timeout = 10000) {
    await waitForElement(this.page, selector, timeout);
  }

  /**
   * Take screenshot
   * @param {string} name 
   */
  async screenshot(name) {
    const path = `./test-results/screenshots/${name}_${Date.now()}.png`;
    await this.page.screenshot({ path, fullPage: true });
    return path;
  }

  /**
   * Get current URL
   * @returns {string}
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns {Promise<string>}
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Wait for navigation
   * @param {Function} action 
   */
  async waitForNavigation(action) {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      action(),
    ]);
  }

  /**
   * Reload page
   */
  async reload() {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  /**
   * Go back
   */
  async goBack() {
    await this.page.goBack({ waitUntil: 'networkidle' });
  }

  /**
   * Select option from dropdown
   * @param {string} selector 
   * @param {string} value 
   */
  async select(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Check checkbox
   * @param {string} selector 
   */
  async check(selector) {
    await this.page.check(selector);
  }

  /**
   * Uncheck checkbox
   * @param {string} selector 
   */
  async uncheck(selector) {
    await this.page.uncheck(selector);
  }

  /**
   * Press key
   * @param {string} key 
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Hover over element
   * @param {string} selector 
   */
  async hover(selector) {
    await this.page.hover(selector);
  }

  /**
   * Get attribute value
   * @param {string} selector 
   * @param {string} attribute 
   * @returns {Promise<string|null>}
   */
  async getAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Count elements
   * @param {string} selector 
   * @returns {Promise<number>}
   */
  async count(selector) {
    return await this.page.locator(selector).count();
  }

  /**
   * Wait for URL
   * @param {string|RegExp} url 
   */
  async waitForURL(url) {
    await this.page.waitForURL(url);
  }

  /**
   * Clear local storage
   */
  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  /**
   * Clear cookies
   */
  async clearCookies() {
    await this.page.context().clearCookies();
  }
}

export default BasePage;

