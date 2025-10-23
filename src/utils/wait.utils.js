/**
 * Wait Utilities
 * Các hàm tiện ích để chờ đợi các điều kiện
 */

import { expect } from '@playwright/test';

/**
 * Chờ element xuất hiện và visible
 * @param {import('@playwright/test').Page} page 
 * @param {string} selector 
 * @param {number} timeout 
 */
export async function waitForElement(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { 
    state: 'visible', 
    timeout 
  });
}

/**
 * Chờ element biến mất
 * @param {import('@playwright/test').Page} page 
 * @param {string} selector 
 * @param {number} timeout 
 */
export async function waitForElementHidden(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { 
    state: 'hidden', 
    timeout 
  });
}

/**
 * Chờ navigation hoàn thành
 * @param {import('@playwright/test').Page} page 
 * @param {Function} action 
 */
export async function waitForNavigation(page, action) {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    action(),
  ]);
}

/**
 * Chờ API response
 * @param {import('@playwright/test').Page} page 
 * @param {string} urlPattern 
 * @param {Function} action 
 */
export async function waitForApiResponse(page, urlPattern, action) {
  const responsePromise = page.waitForResponse(
    response => response.url().includes(urlPattern) && response.status() === 200
  );
  
  await action();
  const response = await responsePromise;
  return response;
}

/**
 * Chờ với retry logic
 * @param {Function} action 
 * @param {Object} options 
 */
export async function waitWithRetry(action, options = {}) {
  const { maxAttempts = 3, delay = 1000, timeout = 30000 } = options;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await Promise.race([
        action(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        ),
      ]);
      return result;
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Chờ page load hoàn toàn
 * @param {import('@playwright/test').Page} page 
 */
export async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

export default {
  waitForElement,
  waitForElementHidden,
  waitForNavigation,
  waitForApiResponse,
  waitWithRetry,
  waitForPageLoad,
};

