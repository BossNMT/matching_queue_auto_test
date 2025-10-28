import { test, expect } from '../fixtures/index.js';
import { UserProfilePage } from '../pages/user-profile.page.js';
import { USER_PROFILE_TEST_DATA } from '../test-data/user-profile.test-data.js';
import path from 'path';

test.describe('Trang Hồ Sơ Người Dùng', () => {
  let userProfilePage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    userProfilePage = new UserProfilePage(authenticatedPage);
    page = authenticatedPage;
    await userProfilePage.navigate();
  });

  test.describe('Hiển thị Thông tin User', () => {
    test('TC001: Hiển thị thông tin user đúng', async () => {
      // Kiểm tra tiêu đề trang
      await expect(page.locator(userProfilePage.selectors.pageTitle)).toBeVisible();

      // Kiểm tra tab Thông tin đang active mặc định
      const isInfoTabActive = await userProfilePage.isInfoTabActive();
      expect(isInfoTabActive).toBeTruthy();

      // Lấy thông tin user
      const userInfo = await userProfilePage.getUserInfo();

      // Kiểm tra username hiển thị
      expect(userInfo.username).toBeTruthy();
      expect(userInfo.username.length).toBeGreaterThan(0);

      // Kiểm tra email hiển thị
      expect(userInfo.email).toBeTruthy();
      expect(userInfo.email).toContain('@');

      // Kiểm tra phone hiển thị (nếu có)
      if (userInfo.phone) {
        expect(userInfo.phone.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Cập nhật Thông tin Hợp lệ', () => {
    test('TC002: Cập nhật username thành công', async () => {
      // Lấy username ban đầu
      const initialUserInfo = await userProfilePage.getUserInfo();
      const newUsername = USER_PROFILE_TEST_DATA.VALID_UPDATE.username;

      // Nhấn nút Chỉnh sửa
      await userProfilePage.clickEditButton();

      // Kiểm tra các trường đã được kích hoạt
      const isUsernameEnabled = await userProfilePage.isUsernameFieldEnabled();
      expect(isUsernameEnabled).toBeTruthy();

      // Cập nhật username
      await userProfilePage.updateUsername(newUsername);

      // Nhấn nút Lưu
      await userProfilePage.clickSaveButton();

      // Chờ cập nhật hoàn tất
      await page.waitForTimeout(2000);

      // Kiểm tra username đã được cập nhật
      const updatedUserInfo = await userProfilePage.getUserInfo();
      expect(updatedUserInfo.username).toBe(newUsername);
    });
  });

  test.describe('Validation Email Không Hợp Lệ', () => {
    test('TC003: Hiển thị lỗi khi email không hợp lệ', async () => {
      const invalidEmail = USER_PROFILE_TEST_DATA.INVALID_EMAIL.missingAt;

      // Nhấn nút Chỉnh sửa
      await userProfilePage.clickEditButton();

      // Nhập email không hợp lệ
      await userProfilePage.updateEmail(invalidEmail);

      // Nhấn nút Lưu
      await userProfilePage.clickSaveButton();

      // Chờ validation
      await page.waitForTimeout(1000);

      // Kiểm tra thông báo lỗi xuất hiện
      const errorMessageAppeared = await userProfilePage.waitForErrorMessage(3000);
      expect(errorMessageAppeared).toBeTruthy();

      // Lấy và kiểm tra nội dung thông báo lỗi
      const errorMessage = await userProfilePage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.toLowerCase()).toContain('email');
    });
  });

  test.describe('Upload Avatar', () => {
    test('TC004: Upload avatar hợp lệ thành công', async () => {
      // Xây dựng đường dẫn tuyệt đối đến ảnh test
      const testImagePath = path.resolve(USER_PROFILE_TEST_DATA.AVATAR_FILES.validPath);

      // Nhấn nút Chỉnh sửa để kích hoạt upload
      await userProfilePage.clickEditButton();

      // Kiểm tra upload avatar đã được kích hoạt
      const isUploadEnabled = await userProfilePage.isAvatarUploadInputEnabled();
      expect(isUploadEnabled).toBeTruthy();

      // Upload avatar
      await userProfilePage.uploadAvatar(testImagePath);

      // Chờ xử lý upload
      await page.waitForTimeout(2000);

      // Lưu thay đổi
      await userProfilePage.clickSaveButton();

      // Chờ lưu hoàn tất
      await page.waitForTimeout(2000);

      // Kiểm tra không có lỗi xảy ra
      const hasError = await userProfilePage.isErrorMessageVisible();
      expect(hasError).toBeFalsy();
    });
  });
});
