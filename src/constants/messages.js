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
    PASSWORD_TOO_SHORT: 'Mật khẩu quá ngắn',
    PASSWORD_MIN_LENGTH: 'Mật khẩu phải có ít nhất 6 ký tự',
    ACCOUNT_NOT_EXIST: 'Tài khoản không tồn tại',
    EMAIL_NOT_REGISTERED: 'Email chưa được đăng ký',
    RESET_LINK_SENT: 'Liên kết đặt lại mật khẩu đã gửi',
    NETWORK_ERROR: 'Lỗi kết nối mạng',
    SERVER_ERROR: 'Lỗi server',
    UNAUTHORIZED: 'Không có quyền truy cập',
    ACCOUNT_LOCKED: 'Tài khoản đã bị khóa tạm thời',
    SPAM_PROTECTION: 'Vui lòng đợi trước khi gửi lại',
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

