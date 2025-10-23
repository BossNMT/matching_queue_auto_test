/**
 * Data Utilities
 * Các hàm tiện ích để tạo và xử lý test data
 */

/**
 * Tạo random email
 * @param {string} prefix 
 * @returns {string}
 */
export function generateRandomEmail(prefix = 'test') {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}_${timestamp}_${random}@example.com`;
}

/**
 * Tạo random password
 * @param {number} length 
 * @returns {string}
 */
export function generateRandomPassword(length = 12) {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*';
  const all = uppercase + lowercase + numbers + special;
  
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }
  
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * Tạo random string
 * @param {number} length 
 * @returns {string}
 */
export function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Tạo random number trong khoảng
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function generateRandomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Tạo test user data
 * @returns {Object}
 */
export function generateTestUser() {
  const timestamp = Date.now();
  return {
    email: generateRandomEmail('testuser'),
    password: generateRandomPassword(),
    name: `Test User ${timestamp}`,
    phone: `098${generateRandomNumber(1000000, 9999999)}`,
  };
}

/**
 * Deep clone object
 * @param {Object} obj 
 * @returns {Object}
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Format date to string
 * @param {Date} date 
 * @param {string} format 
 * @returns {string}
 */
export function formatDate(date, format = 'DD/MM/YYYY') {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year);
}

export default {
  generateRandomEmail,
  generateRandomPassword,
  generateRandomString,
  generateRandomNumber,
  generateTestUser,
  deepClone,
  formatDate,
};

