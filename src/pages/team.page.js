import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { ENV } from '../config/env.config.js';
import { info, debug } from '../utils/logger.utils.js';

export class TeamPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.selectors = {
      teamNameInput: SELECTORS.TEAM.TEAM_NAME_INPUT,
      teamDescriptionInput: SELECTORS.TEAM.TEAM_DESCRIPTION_INPUT,
      imageUploadInput: SELECTORS.TEAM.IMAGE_UPLOAD_INPUT,
      imageUploadLabel: SELECTORS.TEAM.IMAGE_UPLOAD_LABEL,
      imagePreviewContainer: SELECTORS.TEAM.IMAGE_PREVIEW_CONTAINER,
      imagePreview: SELECTORS.TEAM.IMAGE_PREVIEW,
      submitButton: SELECTORS.TEAM.SUBMIT_BUTTON,
      imageErrorMessage: SELECTORS.TEAM.IMAGE_ERROR_MESSAGE,
      nameErrorMessage: SELECTORS.TEAM.NAME_ERROR_MESSAGE,
      errorMessage: SELECTORS.TEAM.ERROR_MESSAGE,
      successMessage: SELECTORS.TEAM.SUCCESS_MESSAGE,
      teamList: SELECTORS.TEAM.TEAM_LIST,
      teamItem: SELECTORS.TEAM.TEAM_ITEM,
    };
  }

  async navigate() {
    info('Navigating to Team page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.CLUB}`);
    await this.waitForPageLoaded();
  }

  async waitForPageLoaded() {
    debug('Waiting for Team page to load');
    await this.waitFor(this.selectors.teamNameInput);
  }

  /**
   * Nhập tên CLB
   */
  async fillTeamName(teamName) {
    info(`Filling team name: ${teamName}`);
    await this.fill(this.selectors.teamNameInput, teamName);
  }

  /**
   * Nhập mô tả CLB
   */
  async fillTeamDescription(description) {
    info(`Filling team description: ${description}`);
    await this.fill(this.selectors.teamDescriptionInput, description);
  }

  /**
   * Upload ảnh cho CLB
   */
  async uploadTeamImage(filePath) {
    info(`Uploading team image: ${filePath}`);
    const fileInput = await this.page.locator(this.selectors.imageUploadInput);
    await fileInput.setInputFiles(filePath);
    // Đợi một chút để preview load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Kiểm tra ảnh preview có hiển thị không
   */
  async isImagePreviewVisible() {
    debug('Checking if image preview is visible');
    try {
      const preview = await this.page.locator(this.selectors.imagePreview);
      const isVisible = await preview.isVisible({ timeout: 5000 });
      return isVisible;
    } catch (error) {
      // Nếu không tìm thấy preview, kiểm tra xem có thông báo lỗi không
      return false;
    }
  }

  /**
   * Click nút Tạo để submit form
   */
  async clickSubmitButton() {
    info('Clicking submit button');
    await this.click(this.selectors.submitButton);
  }

  /**
   * Tạo CLB với thông tin đầy đủ
   */
  async createTeam(teamData) {
    info('Creating team with data:', teamData);
    
    if (teamData.name !== undefined) {
      await this.fillTeamName(teamData.name);
    }
    
    if (teamData.description) {
      await this.fillTeamDescription(teamData.description);
    }
    
    if (teamData.imagePath) {
      await this.uploadTeamImage(teamData.imagePath);
    }
    
    await this.clickSubmitButton();
  }

  /**
   * Kiểm tra thông báo lỗi
   */
  async getErrorMessage() {
    debug('Getting error message');
    try {
      const errorElement = await this.page.locator(this.selectors.errorMessage).first();
      const isVisible = await errorElement.isVisible({ timeout: 3000 });
      if (isVisible) {
        return await errorElement.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Kiểm tra thông báo thành công
   */
  async getSuccessMessage() {
    debug('Getting success message');
    try {
      const successElement = await this.page.locator(this.selectors.successMessage).first();
      await successElement.waitFor({ state: 'visible', timeout: 5000 });
      return await successElement.textContent();
    } catch (error) {
      return null;
    }
  }

  /**
   * Kiểm tra CLB có trong danh sách không
   */
  async isTeamInList(teamName) {
    info(`Checking if team "${teamName}" is in list`);
    try {
      const teamElement = await this.page.locator(`text="${teamName}"`).first();
      return await teamElement.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Kiểm tra validation message cho trường cụ thể
   */
  async getFieldValidationMessage(fieldSelector) {
    debug('Getting field validation message');
    try {
      // Tìm validation message gần field
      const field = await this.page.locator(fieldSelector);
      const validationMsg = await field.evaluate((el) => el.validationMessage);
      return validationMsg;
    } catch (error) {
      return null;
    }
  }

  /**
   * Kiểm tra lỗi "Tên đội bóng không được để trống"
   */
  async getNameErrorMessage() {
    debug('Getting name error message');
    try {
      const errorElement = await this.page.locator(this.selectors.nameErrorMessage);
      const isVisible = await errorElement.isVisible({ timeout: 3000 });
      if (isVisible) {
        return await errorElement.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Kiểm tra lỗi "Hình ảnh không được để trống"
   */
  async getImageErrorMessage() {
    debug('Getting image error message');
    try {
      const errorElement = await this.page.locator(this.selectors.imageErrorMessage);
      const isVisible = await errorElement.isVisible({ timeout: 3000 });
      if (isVisible) {
        return await errorElement.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Kiểm tra có lỗi validation nào không
   */
  async hasAnyError() {
    debug('Checking if any error exists');
    const nameError = await this.getNameErrorMessage();
    const imageError = await this.getImageErrorMessage();
    const genericError = await this.getErrorMessage();
    
    return nameError !== null || imageError !== null || genericError !== null;
  }
}