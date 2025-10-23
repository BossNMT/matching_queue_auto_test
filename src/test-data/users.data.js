/**
 * Test Data - Users
 * Dữ liệu test cho users
 */

export const TEST_USERS = {
  // Valid users
  VALID_USER_1: {
    email: 'test1@example.com',
    password: 'Test@123456',
    name: 'Test User 1',
  },
  
  VALID_USER_2: {
    email: 'test2@example.com',
    password: 'Test@123456',
    name: 'Test User 2',
  },

  // Invalid users
  INVALID_EMAIL: {
    email: 'invalid@example.com',
    password: 'Test@123456',
  },

  INVALID_PASSWORD: {
    email: 'test@example.com',
    password: 'wrongpassword',
  },

  // Edge cases
  EMPTY_EMAIL: {
    email: '',
    password: 'Test@123456',
  },

  EMPTY_PASSWORD: {
    email: 'test@example.com',
    password: '',
  },

  INVALID_EMAIL_FORMAT: {
    email: 'not-an-email',
    password: 'Test@123456',
  },

  SHORT_PASSWORD: {
    email: 'test@example.com',
    password: '123',
  },

  // SQL Injection attempts
  SQL_INJECTION: {
    email: "admin' OR '1'='1",
    password: "' OR '1'='1",
  },

  // XSS attempts
  XSS_ATTACK: {
    email: '<script>alert("XSS")</script>@test.com',
    password: '<script>alert("XSS")</script>',
  },

  // Special characters
  SPECIAL_CHARS: {
    email: 'test+special@example.com',
    password: 'Test@#$%^&*()123',
  },

  // Long inputs
  LONG_EMAIL: {
    email: 'a'.repeat(100) + '@example.com',
    password: 'Test@123456',
  },

  LONG_PASSWORD: {
    email: 'test@example.com',
    password: 'A'.repeat(200),
  },

  // Unicode
  UNICODE: {
    email: 'test@ví-dụ.com',
    password: 'Mật-Khẩu-123',
  },
};

export default TEST_USERS;

