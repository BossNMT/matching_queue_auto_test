/**
 * Messages & Validation
 * Định nghĩa các messages, error messages và validation messages
 */

export const MESSAGES = {
  // Success messages
  SUCCESS: {
    LOGIN: 'Đăng nhập thành công',
    LOGOUT: 'Đăng xuất thành công',
    REGISTER: 'Đăng ký thành công',
    UPDATE_PROFILE: 'Cập nhật thông tin thành công',
  },

  // Error messages
  ERROR: {
    LOGIN_FAILED: 'Đăng nhập thất bại',
    INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng',
    EMAIL_REQUIRED: 'Vui lòng nhập email',
    PASSWORD_REQUIRED: 'Vui lòng nhập mật khẩu',
    EMAIL_INVALID: 'Email không hợp lệ',
    PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
    NETWORK_ERROR: 'Lỗi kết nối mạng',
    SERVER_ERROR: 'Lỗi server',
    UNAUTHORIZED: 'Không có quyền truy cập',
  },

  // Validation messages
  VALIDATION: {
    REQUIRED_FIELD: 'Trường này là bắt buộc',
    INVALID_EMAIL_FORMAT: 'Định dạng email không đúng',
    PASSWORD_MIN_LENGTH: 'Mật khẩu phải có ít nhất 6 ký tự',
    PASSWORD_MAX_LENGTH: 'Mật khẩu không được quá 50 ký tự',
  },

  // Page titles
  PAGE_TITLES: {
    LOGIN: 'Đăng nhập',
    REGISTER: 'Đăng ký',
    DASHBOARD: 'Trang chủ',
    PROFILE: 'Thông tin cá nhân',
  },
};

export default MESSAGES;

