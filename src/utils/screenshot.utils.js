/**
 * Screenshot Utilities
 * Các hàm tiện ích để chụp màn hình
 */

import path from 'path';
import { TEST_CONFIG } from '../config/test.config.js';

/**
 * Chụp full page screenshot
 * @param {import('@playwright/test').Page} page 
 * @param {string} name 
 */
export async function takeFullPageScreenshot(page, name) {
  const timestamp = Date.now();
  const filename = `${name}_${timestamp}.png`;
  const screenshotPath = path.join(TEST_CONFIG.PATHS.SCREENSHOTS, filename);
  
  await page.screenshot({ 
    path: screenshotPath, 
    fullPage: true 
  });
  
  return screenshotPath;
}

/**
 * Chụp screenshot của element cụ thể
 * @param {import('@playwright/test').Page} page 
 * @param {string} selector 
 * @param {string} name 
 */
export async function takeElementScreenshot(page, selector, name) {
  const timestamp = Date.now();
  const filename = `${name}_${timestamp}.png`;
  const screenshotPath = path.join(TEST_CONFIG.PATHS.SCREENSHOTS, filename);
  
  const element = await page.locator(selector);
  await element.screenshot({ path: screenshotPath });
  
  return screenshotPath;
}

/**
 * Chụp screenshot khi test fail
 * @param {import('@playwright/test').Page} page 
 * @param {import('@playwright/test').TestInfo} testInfo 
 */
export async function takeScreenshotOnFailure(page, testInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    const filename = `failure_${testInfo.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
    const screenshotPath = path.join(TEST_CONFIG.PATHS.SCREENSHOTS, filename);
    
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: true 
    });
    
    // Attach to test report
    await testInfo.attach('screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  }
}

export default {
  takeFullPageScreenshot,
  takeElementScreenshot,
  takeScreenshotOnFailure,
};

