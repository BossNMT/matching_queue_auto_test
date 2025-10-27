/**
 * Team Test Data
 * Dữ liệu test cho các test cases của Team/Club
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const TEAM_TEST_DATA = {
  VALID_TEAM: {
    name: 'CLB OOP',
    description: 'Câu lạc bộ bóng đá OOP với đội ngũ nhiệt huyết',
  },

  LONG_NAME_TEAM: {
    name: 'A'.repeat(100),
    description: 'Mô tả team với tên dài',
  },

  SPECIAL_CHAR_TEAM: {
    name: 'CLB @#$%',
    description: 'Team với ký tự đặc biệt',
  },

  EMPTY_TEAM: {
    name: '',
    description: '',
  },

  ONLY_NAME_TEAM: {
    name: 'CLB Test',
    description: '',
  },

  // File paths cho testing upload
  FILES: {
    VALID_IMAGE_JPG: path.join(__dirname, 'uploads', 'team-test.jpg'),
    VALID_IMAGE_PNG: path.join(__dirname, 'uploads', 'arsenal.png'),
    INVALID_FILE_EXE: path.join(__dirname, 'uploads', 'test-file.exe'),
    INVALID_FILE_TXT: path.join(__dirname, 'uploads', 'test-file.txt'),
  },

  // Error messages
  ERROR_MESSAGES: {
    EMPTY_NAME: 'Tên CLB không được để trống',
    INVALID_FILE_FORMAT: 'Định dạng không hợp lệ',
    REQUIRED_FIELD: 'Trường này là bắt buộc',
  },

  // Success messages
  SUCCESS_MESSAGES: {
    CREATE_SUCCESS: 'Tạo CLB thành công',
    TEAM_CREATED: 'CLB được tạo thành công',
  },
};

export default TEAM_TEST_DATA;

