/**
 * Selectors
 * Định nghĩa các selectors cho các elements trong ứng dụng
 */

export const SELECTORS = {
  // Login Page
  LOGIN: {
    EMAIL_INPUT: 'input[type="email"], input[name="email"]',
    PASSWORD_INPUT: 'input[type="password"], input[name="password"]',
    SUBMIT_BUTTON: 'button[type="submit"]',
    FORGOT_PASSWORD_LINK: 'a[href*="forgot-password"]',
    REGISTER_LINK: 'a[href*="register"], a:has-text("Đăng ký"), a:has-text("đăng ký")',
    GOOGLE_LOGIN_BUTTON: 'button:has-text("Google")',
    FACEBOOK_LOGIN_BUTTON: 'button:has-text("Facebook")',
    ERROR_MESSAGE: '.error-message, .alert-error, [role="alert"], .text-red-500, .text-danger',
    SUCCESS_MESSAGE: '.success-message, .alert-success',
    REMEMBER_ME_CHECKBOX: 'input[type="checkbox"][name="remember"], input[type="checkbox"]#remember',
    PAGE_TITLE: 'h1, h2, .page-title, .login-title',
    LOGO: 'img[alt*="logo"], img[alt*="Logo"], .logo, [data-testid="logo"]',
    FEATURE_ITEMS: '.feature-item, .feature-list li',
    LOADING_SPINNER: '.loading, .spinner, [data-testid="loading"]',
  },

  // Register Page
  REGISTER: {
    NAME_INPUT: 'input[name="name"], input[name="fullName"]',
    EMAIL_INPUT: 'input[type="email"], input[name="email"]',
    PASSWORD_INPUT: 'input[type="password"][name="password"]',
    CONFIRM_PASSWORD_INPUT: 'input[type="password"][name="confirmPassword"]',
    SUBMIT_BUTTON: 'button[type="submit"]',
    LOGIN_LINK: 'a[href*="login"]',
  },

  // Dashboard
  DASHBOARD: {
    USER_MENU: '[data-testid="user-menu"], .user-menu',
    LOGOUT_BUTTON: 'button:has-text("Đăng xuất"), a:has-text("Đăng xuất")',
    PROFILE_LINK: 'a[href*="profile"]',
    NOTIFICATIONS_ICON: '[data-testid="notifications"], .notifications-icon',
  },

  // Common
  COMMON: {
    LOADING_SPINNER: '.loading, .spinner, [data-testid="loading"]',
    MODAL: '.modal, [role="dialog"]',
    MODAL_CLOSE: '.modal-close, button[aria-label="Close"]',
    TOAST_MESSAGE: '.toast, .notification, [role="status"]',
    CONFIRM_BUTTON: 'button:has-text("Xác nhận"), button:has-text("OK")',
    CANCEL_BUTTON: 'button:has-text("Hủy"), button:has-text("Cancel")',
  },
};

export default SELECTORS;

