import { test, expect } from '../fixtures/index.js';
import { LogoutPage } from '../pages/logout.page.js';
import { ROUTES } from '../constants/routes.js';

test.describe('Logout Tests', () => {
  test.describe('Đăng xuất khỏi hệ thống', () => {
    test('TC01: Đăng xuất thành công và quay về trang đăng nhập', async ({ authenticatedPage }) => {
      const logoutPage = new LogoutPage(authenticatedPage);
      const page = authenticatedPage;

      // Điều hướng đến trang chứa nút Đăng xuất (có thể là Dashboard hoặc bất kỳ trang nào)
      await page.goto(ROUTES.DASHBOARD);
      await page.waitForLoadState('networkidle');

      // Kiểm tra nút Đăng xuất có hiển thị không
      const isLogoutButtonVisible = await logoutPage.isLogoutButtonVisible();
      expect(isLogoutButtonVisible).toBeTruthy();

      // Nhấn nút Đăng xuất
      await logoutPage.clickLogoutButton();

      // Chờ chuyển hướng
      await page.waitForTimeout(2000);

      // Kiểm tra đã chuyển về trang Login
      const isOnLoginPage = await logoutPage.isOnLoginPage();
      expect(isOnLoginPage).toBeTruthy();

      // Kiểm tra form Login hiển thị
      const isLoginFormVisible = await logoutPage.isLoginFormVisible();
      expect(isLoginFormVisible).toBeTruthy();

      // Kiểm tra URL chứa '/login'
      const currentURL = logoutPage.getCurrentURL();
      expect(currentURL).toContain('/login');
    });
  });

  test.describe('Truy cập khi chưa đăng nhập', () => {
    test('TC002: Bị chuyển hướng về trang login khi chưa đăng nhập', async ({ page }) => {
      const logoutPage = new LogoutPage(page);

      // Thử truy cập trang Community khi chưa đăng nhập
      await page.goto(ROUTES.COMMUNITY);

      // Chờ chuyển hướng
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Kiểm tra đã bị chuyển hướng về trang Login
      const isOnLoginPage = await logoutPage.isOnLoginPage();
      expect(isOnLoginPage).toBeTruthy();

      // Kiểm tra form Login hiển thị
      const isLoginFormVisible = await logoutPage.isLoginFormVisible();
      expect(isLoginFormVisible).toBeTruthy();

      // Kiểm tra URL chứa '/login'
      const currentURL = logoutPage.getCurrentURL();
      expect(currentURL).toContain('/login');
    });
  });
});