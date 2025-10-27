/**
 * Matching Test Data
 * Dữ liệu test cho các test cases của Matching (Tạo trận đấu)
 */

export const MATCHING_TEST_DATA = {
  // Valid match data
  VALID_MATCH: {
    club: 'Shin',
    stadium: 'Sân bóng Quân Đội',
    date: '12/31/2025',
    time: '06:00 PM', // 18h
    contactNumber: '0123456789',
    description: 'Trận đấu giao hữu'
  },

  VALID_MATCH_2: {
    club: 'Shin',
    stadium: 'Sân bóng Quân Đội',
    date: '01/15/2026',
    time: '07:00 PM', // 19h
    contactNumber: '0987654321',
    description: 'Trận đấu giao hữu cuối tuần'
  },

  // Match with minimal info
  MINIMAL_MATCH: {
    club: 'Shin',
    stadium: 'Sân bóng Quân Đội',
    date: '12/31/2025',
    time: '06:00 PM',
    contactNumber: '0123456789',
  },

  // Match missing stadium (địa điểm)
  MISSING_STADIUM: {
    club: 'Shin',
    // stadium: missing
    date: '12/31/2025',
    time: '06:00 PM',
    contactNumber: '0123456789',
    description: 'Trận đấu thiếu địa điểm'
  },

  // Match missing club
  MISSING_CLUB: {
    // club: missing
    stadium: 'Sân bóng Quân Đội',
    date: '12/31/2025',
    time: '06:00 PM',
    contactNumber: '0123456789',
    description: 'Trận đấu thiếu CLB'
  },

  // Match missing date
  MISSING_DATE: {
    club: 'Shin',
    stadium: 'Sân bóng Quân Đội',
    // date: missing
    time: '06:00 PM',
    contactNumber: '0123456789',
    description: 'Trận đấu thiếu ngày'
  },

  // Match missing time
  MISSING_TIME: {
    club: 'Shin',
    stadium: 'Sân bóng Quân Đội',
    date: '12/31/2025',
    // time: missing
    contactNumber: '0123456789',
    description: 'Trận đấu thiếu giờ'
  },

  // Match with past date
  PAST_DATE_MATCH: {
    club: 'Shin',
    stadium: 'Sân bóng Quân Đội',
    date: '01/01/2020',
    time: '06:00 PM',
    contactNumber: '0123456789',
    description: 'Trận đấu với ngày quá khứ'
  },

  // Match with invalid contact number
  INVALID_CONTACT: {
    club: 'Shin',
    stadium: 'Sân bóng Quân Đội',
    date: '12/31/2025',
    time: '06:00 PM',
    contactNumber: '123', // Too short
    description: 'Trận đấu với SĐT không hợp lệ'
  },

  // Match with special characters
  SPECIAL_CHAR_DESCRIPTION: {
    club: 'Shin',
    stadium: 'Sân bóng Quân Đội',
    date: '12/31/2025',
    time: '06:00 PM',
    contactNumber: '0123456789',
    description: 'Trận đấu @#$%^&*() với ký tự đặc biệt'
  },

  // Error messages
  ERROR_MESSAGES: {
    MISSING_REQUIRED_FIELDS: 'Vui lòng nhập đầy đủ thông tin',
    MISSING_STADIUM: 'Vui lòng chọn sân bóng.',
    MISSING_CLUB: 'Vui lòng chọn câu lạc bộ.',
    MISSING_DATE: 'Vui lòng chọn ngày thi đấu',
    MISSING_TIME: 'Vui lòng chọn giờ thi đấu',
    INVALID_DATE: 'Ngày thi đấu không hợp lệ',
    INVALID_CONTACT: 'Số điện thoại không hợp lệ',
  },

  // Success messages
  SUCCESS_MESSAGES: {
    CREATE_SUCCESS: 'Tạo trận đấu thành công',
    MATCH_CREATED: 'Trận đấu được tạo thành công',
  },

  // Stadium names for testing
  STADIUMS: {
    SVD_A: 'Sân bóng Quân Đội',
    SVD_B: 'Sân bóng đại học Mỏ',
    SVD_C: 'Sân Hòa Lạc',
  },

  // Club names for testing
  CLUBS: {
    TEST_CLUB: 'Shin',
    ARSENAL: 'Arsenal FC',
    BREN: 'Bren Esports',
  },
};

export default MATCHING_TEST_DATA;

