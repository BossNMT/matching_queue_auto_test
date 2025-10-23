/**
 * API Helper
 * Helper functions để tương tác với API
 */

import { expect } from '@playwright/test';
import { info, error as logError } from '../utils/logger.utils.js';

export class ApiHelper {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Make API request
   * @param {string} method 
   * @param {string} url 
   * @param {Object} options 
   */
  async request(method, url, options = {}) {
    info(`API ${method} request to: ${url}`);
    
    try {
      const response = await this.page.request[method.toLowerCase()](url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      return {
        status: response.status(),
        body: await response.json().catch(() => response.text()),
        headers: response.headers(),
      };
    } catch (error) {
      logError(`API request failed: ${error.message}`, error);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} url 
   * @param {Object} options 
   */
  async get(url, options = {}) {
    return await this.request('GET', url, options);
  }

  /**
   * POST request
   * @param {string} url 
   * @param {Object} data 
   * @param {Object} options 
   */
  async post(url, data, options = {}) {
    return await this.request('POST', url, {
      ...options,
      data,
    });
  }

  /**
   * PUT request
   * @param {string} url 
   * @param {Object} data 
   * @param {Object} options 
   */
  async put(url, data, options = {}) {
    return await this.request('PUT', url, {
      ...options,
      data,
    });
  }

  /**
   * DELETE request
   * @param {string} url 
   * @param {Object} options 
   */
  async delete(url, options = {}) {
    return await this.request('DELETE', url, options);
  }

  /**
   * Wait for API response
   * @param {string} urlPattern 
   * @param {Function} action 
   */
  async waitForResponse(urlPattern, action) {
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes(urlPattern)
    );
    
    await action();
    const response = await responsePromise;
    
    return {
      status: response.status(),
      body: await response.json().catch(() => response.text()),
      headers: response.headers(),
    };
  }

  /**
   * Intercept API request
   * @param {string} urlPattern 
   * @param {Object} mockResponse 
   */
  async mockResponse(urlPattern, mockResponse) {
    await this.page.route(`**/${urlPattern}`, route => {
      route.fulfill({
        status: mockResponse.status || 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse.body),
      });
    });
  }

  /**
   * Verify response status
   * @param {number} actualStatus 
   * @param {number} expectedStatus 
   */
  verifyStatus(actualStatus, expectedStatus) {
    expect(actualStatus).toBe(expectedStatus);
  }

  /**
   * Verify response contains
   * @param {Object} response 
   * @param {string} key 
   */
  verifyResponseContains(response, key) {
    expect(response.body).toHaveProperty(key);
  }
}

export default ApiHelper;

