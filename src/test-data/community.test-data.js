/**
 * Community Test Data
 * Dữ liệu test cho các test cases community
 */

export const COMMUNITY_TEST_DATA = {
  // Text posts
  TEXT_POSTS: {
    SIMPLE: 'hello',
    VIETNAMESE: 'Đồ án',
    LONG_TEXT: 'Đây là một bài viết dài để test hiển thị nội dung bài đăng trong community. Bài viết này chứa nhiều thông tin và có thể được sử dụng để kiểm tra giao diện hiển thị.',
    EMOJI: 'Hello world! 😊🎉',
    SPECIAL_CHARS: 'Test với ký tự đặc biệt: @#$%^&*()',
    MULTILINE: 'Dòng 1\nDòng 2\nDòng 3',
    EMPTY: '',
    WHITESPACE: '   ',
    VERY_LONG: 'a'.repeat(1001), // For validation testing
  },

  // Image test data
  IMAGE_POSTS: {
    WITH_TEXT: {
      content: 'Bài viết có ảnh',
      imagePath: 'test-results/test-image.jpg'
    },
    IMAGE_ONLY: {
      content: '',
      imagePath: 'test-results/test-image.jpg'
    },
    MULTIPLE_IMAGES: {
      content: 'Bài viết có nhiều ảnh',
      imagePaths: [
        'test-results/test-image-1.jpg',
        'test-results/test-image-2.jpg'
      ]
    }
  },

  // Expected error messages
  ERROR_MESSAGES: {
    EMPTY_POST: 'Vui lòng nhập nội dung bài đăng',
    TOO_LONG: 'Nội dung bài đăng quá dài',
    INVALID_FILE: 'File không hợp lệ',
    UPLOAD_FAILED: 'Tải ảnh lên thất bại',
  },

  // Test users
  USERS: {
    VALID_USER: {
      email: 'test@example.com',
      username: 'testuser',
      avatar: 'https://example.com/avatar.jpg'
    },
    ADMIN_USER: {
      email: 'admin@example.com',
      username: 'admin',
      avatar: 'https://example.com/admin-avatar.jpg'
    }
  },

  // Post validation rules
  VALIDATION: {
    MAX_LENGTH: 1000,
    MIN_LENGTH: 1,
    ALLOWED_IMAGE_TYPES: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_IMAGES_PER_POST: 5
  },

  // Test scenarios
  SCENARIOS: {
    NEW_USER_FIRST_POST: {
      content: 'Xin chào mọi người! Đây là bài viết đầu tiên của tôi.',
      expectedBehavior: 'Post should appear at top of list'
    },
    RAPID_POSTING: {
      posts: [
        'Bài viết 1',
        'Bài viết 2', 
        'Bài viết 3'
      ],
      expectedBehavior: 'All posts should appear in correct order'
    },
    MIXED_CONTENT: {
      textPost: 'Bài viết chỉ có text',
      imagePost: {
        content: 'Bài viết có ảnh',
        imagePath: 'test-results/test-image.jpg'
      },
      expectedBehavior: 'Both posts should display correctly'
    }
  },

  // Performance test data
  PERFORMANCE: {
    LOAD_TIME_THRESHOLD: 5000, // 5 seconds
    POST_TIME_THRESHOLD: 3000, // 3 seconds
    IMAGE_UPLOAD_THRESHOLD: 10000, // 10 seconds
  },

  // Responsive test data
  VIEWPORTS: {
    MOBILE: { width: 375, height: 667 },
    TABLET: { width: 768, height: 1024 },
    DESKTOP: { width: 1920, height: 1080 },
    LARGE_DESKTOP: { width: 2560, height: 1440 }
  }
};

export default COMMUNITY_TEST_DATA;
