/**
 * Test Data - User Profile
 * Dữ liệu test cho trang Thông tin cá nhân
 */

export const USER_PROFILE_TEST_DATA = {
  // Dữ liệu cập nhật hợp lệ
  VALID_UPDATE: {
    username: 'Test06',
    email: 'test06@gmail.com',
    phone: '0987654321',
  },

  // Định dạng email không hợp lệ
  INVALID_EMAIL: {
    missingAt: 'testgmail.com',
    missingDomain: 'test@',
    onlyAt: '@gmail.com',
    spaces: 'test @gmail.com',
    specialChars: 'test!#$@gmail.com',
  },

  // Định dạng email hợp lệ
  VALID_EMAIL: {
    standard: 'test06@gmail.com',
    withDot: 'test.06@gmail.com',
    withPlus: 'test+06@gmail.com',
  },

  // File avatar
  AVATAR_FILES: {
    valid: 'arsenal.png',
    validPath: 'src/test-data/uploads/arsenal.png',
    invalid: 'test-file.txt',
    invalidPath: 'src/test-data/uploads/test-file.txt',
    executable: 'test-file.exe',
    executablePath: 'src/test-data/uploads/test-file.exe',
  },

  // Thông tin user mặc định
  DEFAULT_USER: {
    username: 'Test 01',
    email: 'test01@gmail.com',
    phone: '0123456789',
  },

  // Thông báo lỗi
  ERROR_MESSAGES: {
    invalidEmail: 'Email không hợp lệ',
    emailRequired: 'Email không được để trống',
    usernameRequired: 'Username không được để trống',
    phoneInvalid: 'Số điện thoại không hợp lệ',
  },

  // Thông báo thành công
  SUCCESS_MESSAGES: {
    updateSuccess: 'Cập nhật thông tin thành công',
    avatarUpdateSuccess: 'Cập nhật avatar thành công',
  },
};

export default USER_PROFILE_TEST_DATA;

