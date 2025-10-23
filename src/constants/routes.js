/**
 * Application Routes
 * Định nghĩa tất cả các routes trong ứng dụng
 */

export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Main routes
  DASHBOARD: '/dashboard',
  MATCHING: '/matching',
  MATCHING_CREATE: '/matching/create',
  MATCHING_DETAIL: '/matching/:id',
  MATCHING_MANAGE: '/matching/manage',
  
  // User routes
  PROFILE: '/profile',
  CLUB: '/club',
  NOTIFICATIONS: '/notifications',
  USER_POST: '/user-post',

  // Admin routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_STADIUM: '/admin/stadium',
};

export default ROUTES;

