/**
 * Environment Configuration
 * Quản lý các biến môi trường và cấu hình theo từng environment
 */

export const ENV = {
  // Base URLs
  BASE_URL: process.env.BASE_URL || '',
  API_URL: process.env.API_URL || '',

  // Test Configuration
  TIMEOUT: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
    NAVIGATION: 30000,
  },

  // Retry Configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },

  // Browser Configuration
  BROWSER: {
    HEADLESS: process.env.HEADLESS !== 'false',
    SLOW_MO: parseInt(process.env.SLOW_MO || '0'),
    VIDEO: process.env.VIDEO === 'true',
    SCREENSHOT: process.env.SCREENSHOT || 'only-on-failure',
  },

  // Test Data
  TEST_USER: {
    VALID_EMAIL: process.env.TEST_EMAIL || 'test@example.com',
    VALID_PASSWORD: process.env.TEST_PASSWORD || 'Test@123456',
    INVALID_EMAIL: 'invalid@example.com',
    INVALID_PASSWORD: 'wrongpassword',
  },
};

export default ENV;

