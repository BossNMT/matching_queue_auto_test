/**
 * Selectors
 * Định nghĩa các selectors cho các elements trong ứng dụng
 */

export const SELECTORS = {
  // Logout Page
  LOGOUT: {
    LOGOUT_BUTTON: 'button:has-text("Đăng xuất")',
  },

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

  // Community Page
  COMMUNITY: {
    CREATE_POST_BUTTON: '//*[@id="root"]/div[1]/div/div[3]/div/div/div/div[1]',
    POST_INPUT: '.ck-content, div[contenteditable="true"][role="textbox"]',
    POST_BUTTON: 'button:has-text("Đăng bài")',
    IMAGE_UPLOAD_INPUT: 'input[type="file"]',
    IMAGE_UPLOAD_BUTTON: 'button:has-text("Chọn ảnh")',
    POST_LIST: '.space-y-6, .p-4',
    POST_ITEM: '.bg-white.rounded-2xl.shadow-md, .rounded-2xl.shadow-md',
    POST_CONTENT: '.text-gray-700 p, p',
    POST_IMAGE: 'figure.image img, img:not([alt="avatar"])',
    POST_AUTHOR: '.flex.items-center.space-x-4',
    POST_USERNAME: 'h2.text-sm.font-semibold',
    POST_AVATAR: 'img[alt="avatar"], img.w-10.h-10.rounded-full',
    POST_TIME: '.text-xs.text-gray-500, time, .text-time',
    POST_EMPTY_ERROR: '.error-message, .alert-error',
    LOADING_POSTS: '.loading, .spinner',
  },

  // Team/Club Page
  TEAM: {
    CREATE_TEAM_BUTTON: 'button:has-text("Tạo")',
    TEAM_NAME_INPUT: 'input[name="name"]',
    TEAM_DESCRIPTION_INPUT: 'textarea[name="description"]',
    IMAGE_UPLOAD_INPUT: 'input[name="imageUrl"]',
    IMAGE_UPLOAD_LABEL: 'label:has-text("Chọn ảnh")',
    IMAGE_PREVIEW_CONTAINER: '.border-2.border-dashed.border-gray-300',
    IMAGE_PREVIEW: 'img[alt*="preview"], img[src*="blob:"]',
    SUBMIT_BUTTON: 'button[type="submit"]:has-text("Tạo")',
    
    // Error messages - Specific selectors based on actual HTML structure
    IMAGE_ERROR_MESSAGE: 'span.text-red-500:has-text("Hình ảnh không được để trống")',
    NAME_ERROR_MESSAGE: 'span.text-red-500:has-text("Tên đội bóng không được để trống")',
    ERROR_MESSAGE: 'span.text-red-500', // Generic error selector
    
    SUCCESS_MESSAGE: '.success-message, .alert-success, .Toastify__toast-body',
    TEAM_LIST: '.team-list, .club-list',
    TEAM_ITEM: '.team-item, .club-item',
  },

  // Matching Page
  MATCHING: {
    PAGE_TITLE: 'h2:has-text("Tạo trận đấu mới")',
    CREATE_MATCH_BUTTON: 'button:has-text("Tạo trận bóng")',
    
    // Form fields
    CLUB_SELECT: '#mui-component-select-clubId',
    CLUB_SELECT_LABEL: '#select-club-label',
    CLUB_SELECT_OPTION: 'li[role="option"]',
    
    STADIUM_SELECT: '#mui-component-select-stadiumId',
    STADIUM_SELECT_LABEL: '#select-stadium-label',
    STADIUM_SELECT_OPTION: 'li[role="option"]',
    
    DATE_INPUT: 'input[placeholder="MM/DD/YYYY"]',
    DATE_BUTTON: 'button[aria-label="Choose date"]',
    
    TIME_INPUT: 'input[placeholder="hh:mm aa"]',
    TIME_BUTTON: 'button[aria-label="Choose time"]',
    
    CONTACT_INPUT: 'input[name="contactNumber"]',
    DESCRIPTION_INPUT: 'textarea[name="description"]',
    
    SUBMIT_BUTTON: 'button[type="submit"]:has-text("Tạo trận đấu")',
    
    // Messages
    ERROR_MESSAGE: 'form .MuiFormControl-root > p, .MuiFormHelperText-root.Mui-error, .error-message, .alert-error, [role="alert"]',
    SUCCESS_MESSAGE: '.success-message, .alert-success, .Toastify__toast-body',
    
    // Manage Page
    MANAGE_PAGE_TITLE: 'h2:has-text("Quản lý trận bóng của bạn")',
    MANAGE_TABLE: 'table.MuiTable-root',
    MANAGE_TABLE_BODY: 'tbody.MuiTableBody-root',
    MANAGE_TABLE_ROW: 'tbody.MuiTableBody-root tr.MuiTableRow-root',
    CANCEL_MATCH_BUTTON: 'button:has-text("Hủy trận")',
    
    // List (legacy)
    MATCH_LIST: '.match-list, [data-testid="match-list"]',
    MATCH_ITEM: '.match-item, [data-testid="match-item"]',
    MATCH_TITLE: '.match-title, h3',
    MATCH_STADIUM: '.match-stadium, [data-testid="stadium"]',
    MATCH_TIME: '.match-time, [data-testid="time"]',
  },

  // Notification Page
  NOTIFICATION: {
    PAGE_TITLE: 'h2:has-text("Thông báo của bạn")',
    NOTIFICATION_LIST: '.scrollbar',
    NOTIFICATION_ITEM: '.mt-\\[10px\\].flex.items-center.justify-between',
    NOTIFICATION_TITLE: '.font-medium.text-\\[\\#48475e\\]',
    NOTIFICATION_CONTENT: '.font-medium.text-\\[\\#48475e\\]',
    NOTIFICATION_TIME: '.font-light.text-\\[\\#2e2e2e\\]',
    NOTIFICATION_ICON: 'svg.w-7.h-7',
    NOTIFICATION_UNREAD: '.bg-\\[\\#e3f2fd\\]',
    NOTIFICATION_READ: '.bg-white',
    
    // Tabs
    TAB_ALL: 'button#simple-tab-0',
    TAB_UNREAD: 'button#simple-tab-1',
    
    // Action buttons
    MARK_READ_BUTTON: 'button:has-text("Đánh dấu là đã đọc")',
    DELETE_ALL_BUTTON: 'button:has-text("Xóa tất cả")',
    
    // Empty state
    EMPTY_MESSAGE: 'text=Không có thông báo nào',
    
    // Tab panels
    TAB_PANEL_ALL: 'div#simple-tabpanel-0',
    TAB_PANEL_UNREAD: 'div#simple-tabpanel-1',
  },

  // User Profile Page
  USER_PROFILE: {
    PAGE_TITLE: 'h2:has-text("Thông tin cá nhân")',
    
    // Tabs
    TAB_INFO: 'button#simple-tab-0:has-text("thông tin")',
    TAB_POSTS: 'button#simple-tab-1:has-text("bài đăng")',
    TAB_PANEL_INFO: 'div#simple-tabpanel-0[role="tabpanel"]',
    TAB_PANEL_POSTS: 'div#simple-tabpanel-1[role="tabpanel"]',
    
    // User Info Section
    USER_INFO_CONTAINER: '.border.max-w-5xl.p-6.bg-white.rounded-lg.shadow-md',
    
    // Avatar
    AVATAR: 'svg.w-28.h-28.bg-gray-200.p-2.rounded-full',
    AVATAR_UPLOAD_INPUT: 'input[type="file"][accept="image/*"]',
    AVATAR_UPLOAD_LABEL: 'input[type="file"] + label',
    
    // Form Fields
    USERNAME_LABEL: 'p.font-semibold:has-text("Username")',
    USERNAME_INPUT: 'input[type="text"][value]',
    
    EMAIL_LABEL: 'p.font-semibold:has-text("Email")',
    EMAIL_INPUT: 'input[type="email"]',
    
    PHONE_LABEL: 'p.font-semibold:has-text("Phone")',
    PHONE_INPUT: 'input[type="text"][value*="0"]',
    
    // Buttons
    EDIT_BUTTON: 'button:has-text("Chỉnh sửa")',
    SAVE_BUTTON: 'button:has-text("Save")',
    CANCEL_BUTTON: 'button:has-text("Cancel")',
    
    // Error Messages
    ERROR_MESSAGE: '.text-red-500, .error-message, p.text-red-500',
    EMAIL_ERROR_MESSAGE: 'p.text-red-500:has-text("Email không hợp lệ")',
    
    // Success Messages
    SUCCESS_MESSAGE: '.success-message, .alert-success, .Toastify__toast-body',
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

