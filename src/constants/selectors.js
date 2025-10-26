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
    FORGOT_PASSWORD_LINK: '//*[@id="root"]/div[1]/div/div/div/div[3]/div/form/div[3]/span',
    REGISTER_LINK: '//*[@id="root"]/div[1]/div/div/div/div[3]/div/form/p/span',
    GOOGLE_LOGIN_BUTTON: 'button:has-text("Google")',
    FACEBOOK_LOGIN_BUTTON: 'button:has-text("Facebook")',
    ERROR_MESSAGE: '.error-message, .alert-error, [role="alert"], .text-red-500, .text-danger',
    SUCCESS_MESSAGE: '.success-message, .alert-success, .Toastify__toast-body',
    EMAIL_ERROR_MESSAGE: '//*[@id="root"]/div[1]/div/div/div/div[3]/div/form/div[1]/p',
    PASSWORD_ERROR_MESSAGE: '//*[@id="root"]/div[1]/div/div/div/div[3]/div/form/div[2]/p',
    EMAIL_FORGOT_PASSWORD_MESSAGE: '//*[@id="root"]/div[1]/div/div/div/div[2]/div/form/div[1]/p',
    REMEMBER_ME_CHECKBOX: 'input[type="checkbox"][name="user[remember_me]"], input[type="checkbox"]#remember',
    PAGE_TITLE: 'h1, h2, .page-title, .login-title',
    LOGO: 'img[alt*="logo"], img[src*="/img/logo.svg"], img[alt*="Logo"], .logo, [data-testid="logo"]',
    FEATURE_TITLE_1: '//*[@id="root"]/div[1]/div/div/div/div[1]/div/div[1]/div/h3',
    FEATURE_DESCRIPTION_1: '//*[@id="root"]/div[1]/div/div/div/div[1]/div/div[1]/div/p',
    FEATURE_TITLE_2: '//*[@id="root"]/div[1]/div/div/div/div[1]/div/div[2]/div/h3',
    FEATURE_DESCRIPTION_2: '//*[@id="root"]/div[1]/div/div/div/div[1]/div/div[2]/div/p',
    FEATURE_TITLE_3: '//*[@id="root"]/div[1]/div/div/div/div[1]/div/div[3]/div/h3',
    FEATURE_DESCRIPTION_3: '//*[@id="root"]/div[1]/div/div/div/div[1]/div/div[3]/div/p',
    LOADING_SPINNER: '.loading, .spinner, [data-testid="loading"]',
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

