import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { ENV } from '../config/env.config.js';
import { info, debug, error } from '../utils/logger.utils.js';

export class UserProfilePage extends BasePage {
  constructor(page) {
    super(page);

    this.selectors = {
      // Trang
      pageTitle: SELECTORS.USER_PROFILE.PAGE_TITLE,
      
      // Tabs
      tabInfo: SELECTORS.USER_PROFILE.TAB_INFO,
      tabPosts: SELECTORS.USER_PROFILE.TAB_POSTS,
      tabPanelInfo: SELECTORS.USER_PROFILE.TAB_PANEL_INFO,
      tabPanelPosts: SELECTORS.USER_PROFILE.TAB_PANEL_POSTS,
      
      // Thông tin User
      userInfoContainer: SELECTORS.USER_PROFILE.USER_INFO_CONTAINER,
      
      // Avatar
      avatar: SELECTORS.USER_PROFILE.AVATAR,
      avatarUploadInput: SELECTORS.USER_PROFILE.AVATAR_UPLOAD_INPUT,
      
      // Các trường Form
      usernameLabel: SELECTORS.USER_PROFILE.USERNAME_LABEL,
      usernameInput: SELECTORS.USER_PROFILE.USERNAME_INPUT,
      emailLabel: SELECTORS.USER_PROFILE.EMAIL_LABEL,
      emailInput: SELECTORS.USER_PROFILE.EMAIL_INPUT,
      phoneLabel: SELECTORS.USER_PROFILE.PHONE_LABEL,
      phoneInput: SELECTORS.USER_PROFILE.PHONE_INPUT,
      
      // Nút bấm
      editButton: SELECTORS.USER_PROFILE.EDIT_BUTTON,
      saveButton: SELECTORS.USER_PROFILE.SAVE_BUTTON,
      cancelButton: SELECTORS.USER_PROFILE.CANCEL_BUTTON,
      
      // Thông báo
      errorMessage: SELECTORS.USER_PROFILE.ERROR_MESSAGE,
      emailErrorMessage: SELECTORS.USER_PROFILE.EMAIL_ERROR_MESSAGE,
      successMessage: SELECTORS.USER_PROFILE.SUCCESS_MESSAGE,
    };
  }

  async navigate() {
    info('Điều hướng đến trang Hồ sơ người dùng');
    await this.goto(`${ENV.BASE_URL}${ROUTES.PROFILE}`);
    await this.waitForPageLoaded();
  }

  async waitForPageLoaded() {
    info('Đợi trang Hồ sơ người dùng tải xong');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.selectors.pageTitle, { timeout: 10000 });
  }

  // ==================== Hành động Tab ====================
  
  async clickInfoTab() {
    info('Nhấn tab Thông tin');
    await this.page.click(this.selectors.tabInfo);
    await this.page.waitForTimeout(500);
  }

  async clickPostsTab() {
    info('Nhấn tab Bài đăng');
    await this.page.click(this.selectors.tabPosts);
    await this.page.waitForTimeout(500);
  }

  async isInfoTabActive() {
    debug('Kiểm tra tab Thông tin đang active');
    const tab = await this.page.locator(this.selectors.tabInfo);
    const ariaSelected = await tab.getAttribute('aria-selected');
    return ariaSelected === 'true';
  }

  // ==================== Hiển thị Thông tin User ====================

  async getUserInfo() {
    info('Lấy thông tin người dùng');
    try {
      const username = await this.getUsernameValue();
      const email = await this.getEmailValue();
      const phone = await this.getPhoneValue();
      
      debug(`Thông tin user - Username: ${username}, Email: ${email}, Phone: ${phone}`);
      
      return { username, email, phone };
    } catch (err) {
      error(`Lỗi khi lấy thông tin user: ${err.message}`);
      throw err;
    }
  }

  async getUsernameValue() {
    debug('Lấy giá trị username');
    const input = await this.page.locator(this.selectors.usernameInput).first();
    return await input.inputValue();
  }

  async getEmailValue() {
    debug('Lấy giá trị email');
    const input = await this.page.locator(this.selectors.emailInput).first();
    return await input.inputValue();
  }

  async getPhoneValue() {
    debug('Lấy giá trị phone');
    const input = await this.page.locator(this.selectors.phoneInput).first();
    return await input.inputValue();
  }

  async isAvatarVisible() {
    debug('Kiểm tra avatar hiển thị');
    return await this.page.isVisible(this.selectors.avatar);
  }

  // ==================== Chế độ Chỉnh sửa ====================

  async clickEditButton() {
    info('Nhấn nút Chỉnh sửa');
    await this.page.click(this.selectors.editButton);
    await this.page.waitForTimeout(500);
  }

  async clickSaveButton() {
    info('Nhấn nút Lưu');
    await this.page.click(this.selectors.saveButton);
    await this.page.waitForTimeout(1000);
  }

  async clickCancelButton() {
    info('Nhấn nút Hủy');
    await this.page.click(this.selectors.cancelButton);
    await this.page.waitForTimeout(500);
  }

  async isEditButtonVisible() {
    debug('Kiểm tra nút Chỉnh sửa hiển thị');
    return await this.page.isVisible(this.selectors.editButton);
  }

  async isSaveButtonVisible() {
    debug('Kiểm tra nút Lưu hiển thị');
    try {
      return await this.page.isVisible(this.selectors.saveButton);
    } catch {
      return false;
    }
  }

  async isFieldEnabled(fieldSelector) {
    debug(`Kiểm tra trường được kích hoạt: ${fieldSelector}`);
    const field = await this.page.locator(fieldSelector).first();
    const isDisabled = await field.getAttribute('disabled');
    return isDisabled === null;
  }

  async isUsernameFieldEnabled() {
    return await this.isFieldEnabled(this.selectors.usernameInput);
  }

  async isEmailFieldEnabled() {
    return await this.isFieldEnabled(this.selectors.emailInput);
  }

  async isPhoneFieldEnabled() {
    return await this.isFieldEnabled(this.selectors.phoneInput);
  }

  // ==================== Cập nhật Thông tin User ====================

  async updateUsername(newUsername) {
    info(`Cập nhật username thành: ${newUsername}`);
    const input = await this.page.locator(this.selectors.usernameInput).first();
    await input.clear();
    await input.fill(newUsername);
    await this.page.waitForTimeout(300);
  }

  async updateEmail(newEmail) {
    info(`Cập nhật email thành: ${newEmail}`);
    const input = await this.page.locator(this.selectors.emailInput).first();
    await input.clear();
    await input.fill(newEmail);
    await this.page.waitForTimeout(300);
  }

  async updatePhone(newPhone) {
    info(`Cập nhật phone thành: ${newPhone}`);
    const input = await this.page.locator(this.selectors.phoneInput).first();
    await input.clear();
    await input.fill(newPhone);
    await this.page.waitForTimeout(300);
  }

  async updateUserInfo(userData) {
    info('Cập nhật thông tin người dùng');
    
    if (userData.username !== undefined) {
      await this.updateUsername(userData.username);
    }
    
    if (userData.email !== undefined) {
      await this.updateEmail(userData.email);
    }
    
    if (userData.phone !== undefined) {
      await this.updatePhone(userData.phone);
    }
  }

  // ==================== Upload Avatar ====================

  async uploadAvatar(filePath) {
    info(`Upload avatar: ${filePath}`);
    try {
      const fileInput = await this.page.locator(this.selectors.avatarUploadInput);
      await fileInput.setInputFiles(filePath);
      await this.page.waitForTimeout(1000);
      debug('Upload avatar thành công');
    } catch (err) {
      error(`Lỗi khi upload avatar: ${err.message}`);
      throw err;
    }
  }

  async isAvatarUploadInputEnabled() {
    debug('Kiểm tra input upload avatar được kích hoạt');
    const input = await this.page.locator(this.selectors.avatarUploadInput);
    const isDisabled = await input.getAttribute('disabled');
    return isDisabled === null;
  }

  // ==================== Validation & Thông báo Lỗi ====================

  async getErrorMessage() {
    info('Lấy thông báo lỗi');
    try {
      const errorElement = await this.page.locator(this.selectors.errorMessage).first();
      const isVisible = await errorElement.isVisible();
      if (isVisible) {
        const errorText = await errorElement.textContent();
        debug(`Thông báo lỗi: ${errorText}`);
        return errorText;
      }
      return null;
    } catch (err) {
      debug('Không tìm thấy thông báo lỗi');
      return null;
    }
  }

  async getEmailErrorMessage() {
    info('Lấy thông báo lỗi email');
    try {
      const errorElement = await this.page.locator(this.selectors.emailErrorMessage).first();
      const isVisible = await errorElement.isVisible();
      if (isVisible) {
        const errorText = await errorElement.textContent();
        debug(`Thông báo lỗi email: ${errorText}`);
        return errorText;
      }
      return null;
    } catch (err) {
      debug('Không tìm thấy thông báo lỗi email');
      return null;
    }
  }

  async isErrorMessageVisible() {
    debug('Kiểm tra thông báo lỗi hiển thị');
    try {
      return await this.page.isVisible(this.selectors.errorMessage);
    } catch {
      return false;
    }
  }

  async waitForErrorMessage(timeout = 5000) {
    info('Đợi thông báo lỗi');
    try {
      await this.page.waitForSelector(this.selectors.errorMessage, { 
        state: 'visible',
        timeout 
      });
      return true;
    } catch {
      debug('Thông báo lỗi không xuất hiện');
      return false;
    }
  }

  // ==================== Thông báo Thành công ====================

  async getSuccessMessage() {
    info('Lấy thông báo thành công');
    try {
      const successElement = await this.page.locator(this.selectors.successMessage).first();
      const isVisible = await successElement.isVisible();
      if (isVisible) {
        const successText = await successElement.textContent();
        debug(`Thông báo thành công: ${successText}`);
        return successText;
      }
      return null;
    } catch (err) {
      debug('Không tìm thấy thông báo thành công');
      return null;
    }
  }

  async isSuccessMessageVisible() {
    debug('Kiểm tra thông báo thành công hiển thị');
    try {
      return await this.page.isVisible(this.selectors.successMessage);
    } catch {
      return false;
    }
  }

  async waitForSuccessMessage(timeout = 5000) {
    info('Đợi thông báo thành công');
    try {
      await this.page.waitForSelector(this.selectors.successMessage, { 
        state: 'visible',
        timeout 
      });
      return true;
    } catch {
      debug('Thông báo thành công không xuất hiện');
      return false;
    }
  }

  // ==================== Hành động Kết hợp ====================

  async editAndSaveUserInfo(userData) {
    info('Chỉnh sửa và lưu thông tin người dùng');
    
    // Nhấn nút chỉnh sửa
    await this.clickEditButton();
    
    // Cập nhật các trường
    await this.updateUserInfo(userData);
    
    // Nhấn nút lưu
    await this.clickSaveButton();
    
    // Đợi phản hồi
    await this.page.waitForTimeout(1500);
  }

  async editUserInfoWithoutSaving(userData) {
    info('Chỉnh sửa thông tin người dùng không lưu');
    
    // Nhấn nút chỉnh sửa
    await this.clickEditButton();
    
    // Cập nhật các trường
    await this.updateUserInfo(userData);
  }
}