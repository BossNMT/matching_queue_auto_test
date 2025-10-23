/**
 * Validation Utilities
 * Các hàm tiện ích để validate dữ liệu
 */

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password 
 * @returns {Object}
 */
export function validatePassword(password) {
  return {
    isValid: password.length >= 6,
    hasMinLength: password.length >= 6,
    hasMaxLength: password.length <= 50,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
}

/**
 * Validate phone number (Vietnam format)
 * @param {string} phone 
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate URL
 * @param {string} url 
 * @returns {boolean}
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize input
 * @param {string} input 
 * @returns {string}
 */
export function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, '');
}

export default {
  isValidEmail,
  validatePassword,
  isValidPhone,
  isValidUrl,
  sanitizeInput,
};

