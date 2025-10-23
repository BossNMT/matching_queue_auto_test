/**
 * Test Configuration
 * Cấu hình chung cho tất cả các test cases
 */

export const TEST_CONFIG = {
  // Viewport sizes
  VIEWPORT: {
    DESKTOP: { width: 1920, height: 1080 },
    TABLET: { width: 768, height: 1024 },
    MOBILE: { width: 375, height: 667 },
  },

  // Browser contexts
  BROWSER_CONTEXT: {
    locale: 'vi-VN',
    timezone: 'Asia/Ho_Chi_Minh',
    permissions: [],
    geolocation: { latitude: 21.0285, longitude: 105.8542 }, // Hanoi
  },

  // Test data paths
  PATHS: {
    SCREENSHOTS: './test-results/screenshots',
    REPORTS: './test-results/reports',
    VIDEOS: './test-results/videos',
    DOWNLOADS: './test-results/downloads',
  },

  // API endpoints
  API_ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/users/profile',
    MATCHES: '/matches',
  },
};

export default TEST_CONFIG;

