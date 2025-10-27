import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { ENV } from '../config/env.config.js';
import { info, debug } from '../utils/logger.utils.js';

export class MatchingPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.selectors = {
      pageTitle: SELECTORS.MATCHING.PAGE_TITLE,
      createMatchButton: SELECTORS.MATCHING.CREATE_MATCH_BUTTON,
      clubSelect: SELECTORS.MATCHING.CLUB_SELECT,
      clubSelectLabel: SELECTORS.MATCHING.CLUB_SELECT_LABEL,
      clubSelectOption: SELECTORS.MATCHING.CLUB_SELECT_OPTION,
      stadiumSelect: SELECTORS.MATCHING.STADIUM_SELECT,
      stadiumSelectLabel: SELECTORS.MATCHING.STADIUM_SELECT_LABEL,
      stadiumSelectOption: SELECTORS.MATCHING.STADIUM_SELECT_OPTION,
      dateInput: SELECTORS.MATCHING.DATE_INPUT,
      dateButton: SELECTORS.MATCHING.DATE_BUTTON,
      timeInput: SELECTORS.MATCHING.TIME_INPUT,
      timeButton: SELECTORS.MATCHING.TIME_BUTTON,
      contactInput: SELECTORS.MATCHING.CONTACT_INPUT,
      descriptionInput: SELECTORS.MATCHING.DESCRIPTION_INPUT,
      submitButton: SELECTORS.MATCHING.SUBMIT_BUTTON,
      errorMessage: SELECTORS.MATCHING.ERROR_MESSAGE,
      successMessage: SELECTORS.MATCHING.SUCCESS_MESSAGE,
      // Manage page selectors
      managePageTitle: SELECTORS.MATCHING.MANAGE_PAGE_TITLE,
      manageTable: SELECTORS.MATCHING.MANAGE_TABLE,
      manageTableBody: SELECTORS.MATCHING.MANAGE_TABLE_BODY,
      manageTableRow: SELECTORS.MATCHING.MANAGE_TABLE_ROW,
      cancelMatchButton: SELECTORS.MATCHING.CANCEL_MATCH_BUTTON,
      
      // Legacy list selectors
      matchList: SELECTORS.MATCHING.MATCH_LIST,
      matchItem: SELECTORS.MATCHING.MATCH_ITEM,
      matchTitle: SELECTORS.MATCHING.MATCH_TITLE,
      matchStadium: SELECTORS.MATCHING.MATCH_STADIUM,
      matchTime: SELECTORS.MATCHING.MATCH_TIME,
    };
  }

  /**
   * Navigate to matching list page
   */
  async navigate() {
    info('Navigating to Matching page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.MATCHING}`);
    await this.waitForPageLoaded();
  }

  /**
   * Navigate to create matching page
   */
  async navigateToCreatePage() {
    info('Navigating to Create Matching page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.MATCHING_CREATE}`);
    await this.waitForCreatePageLoaded();
  }

  /**
   * Navigate to manage matches page
   */
  async navigateToManagePage() {
    info('Navigating to Manage Matches page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.MATCHING_MANAGE}`);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForPageLoaded() {
    debug('Waiting for Matching page to load');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForCreatePageLoaded() {
    debug('Waiting for Create Matching page to load');
    await this.waitFor(this.selectors.submitButton);
  }

  /**
   * Kiểm tra form tạo trận đấu có hiển thị đầy đủ các trường không
   */
  async isFormDisplayed() {
    debug('Checking if create match form is displayed');
    try {
      await this.page.waitForSelector(this.selectors.clubSelect, { timeout: 5000 });
      await this.page.waitForSelector(this.selectors.stadiumSelect, { timeout: 5000 });
      await this.page.waitForSelector(this.selectors.dateInput, { timeout: 5000 });
      await this.page.waitForSelector(this.selectors.timeInput, { timeout: 5000 });
      await this.page.waitForSelector(this.selectors.contactInput, { timeout: 5000 });
      await this.page.waitForSelector(this.selectors.descriptionInput, { timeout: 5000 });
      await this.page.waitForSelector(this.selectors.submitButton, { timeout: 5000 });
      return true;
    } catch (error) {
      debug(`Form not fully displayed: ${error.message}`);
      return false;
    }
  }

  /**
   * Chọn câu lạc bộ từ dropdown
   */
  async selectClub(clubName) {
    info(`Selecting club: ${clubName}`);
    await this.page.click(this.selectors.clubSelect);
    await this.page.waitForTimeout(500);
    await this.page.click(`${this.selectors.clubSelectOption}:has-text("${clubName}")`);
    await this.page.waitForTimeout(300);
  }

  /**
   * Chọn sân bóng từ dropdown
   */
  async selectStadium(stadiumName) {
    info(`Selecting stadium: ${stadiumName}`);
    await this.page.click(this.selectors.stadiumSelect);
    await this.page.waitForTimeout(500);
    await this.page.click(`${this.selectors.stadiumSelectOption}:has-text("${stadiumName}")`);
    await this.page.waitForTimeout(300);
  }

  /**
   * Nhập ngày thi đấu
   */
  async fillDate(date) {
    info(`Filling date: ${date}`);
    await this.fill(this.selectors.dateInput, date);
  }

  /**
   * Nhập giờ thi đấu
   */
  async fillTime(time) {
    info(`Filling time: ${time}`);
    await this.fill(this.selectors.timeInput, time);
  }

  /**
   * Nhập số điện thoại liên hệ
   */
  async fillContactNumber(contactNumber) {
    info(`Filling contact number: ${contactNumber}`);
    await this.fill(this.selectors.contactInput, contactNumber);
  }

  /**
   * Nhập mô tả trận đấu
   */
  async fillDescription(description) {
    info(`Filling description: ${description}`);
    await this.fill(this.selectors.descriptionInput, description);
  }

  /**
   * Click nút tạo trận đấu
   */
  async clickSubmitButton() {
    info('Clicking submit button');
    await this.click(this.selectors.submitButton);
  }

  /**
   * Tạo trận đấu với thông tin đầy đủ
   */
  async createMatch(matchData) {
    info('Creating match with data:', matchData);
    
    if (matchData.club) {
      await this.selectClub(matchData.club);
    }
    
    if (matchData.stadium) {
      await this.selectStadium(matchData.stadium);
    }
    
    if (matchData.date) {
      await this.fillDate(matchData.date);
    }
    
    if (matchData.time) {
      await this.fillTime(matchData.time);
    }
    
    if (matchData.contactNumber) {
      await this.fillContactNumber(matchData.contactNumber);
    }
    
    if (matchData.description) {
      await this.fillDescription(matchData.description);
    }
    
    await this.clickSubmitButton();
  }

  /**
   * Kiểm tra thông báo lỗi (lấy message đầu tiên)
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
   * Lấy tất cả thông báo lỗi từ form validation
   */
  async getAllErrorMessages() {
    debug('Getting all error messages from form validation');
    try {
      // Đợi form validation trigger (sau khi submit)
      await this.page.waitForTimeout(1000);
      
      const errorElements = await this.page.locator(this.selectors.errorMessage).all();
      const messages = [];
      
      for (const element of errorElements) {
        try {
          const isVisible = await element.isVisible({ timeout: 500 });
          if (isVisible) {
            const text = await element.textContent();
            // Filter: chỉ lấy text có nội dung hợp lệ (không phải placeholder, label, etc.)
            if (text && text.trim() && text.trim().length > 5) {
              messages.push(text.trim());
              debug(`  - Found error: "${text.trim()}"`);
            }
          }
        } catch (e) {
          // Element không visible hoặc không tồn tại, skip
        }
      }
      
      debug(`Total error messages found: ${messages.length}`);
      return messages;
    } catch (error) {
      debug('Error in getAllErrorMessages:', error);
      return [];
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
   * Kiểm tra trận đấu có trong danh sách không
   */
  async isMatchInList(stadiumName) {
    info(`Checking if match with stadium "${stadiumName}" is in list`);
    try {
      const matchElement = await this.page.locator(`text="${stadiumName}"`).first();
      return await matchElement.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Kiểm tra trang Quản lý trận bóng hiển thị đúng
   */
  async isManagePageDisplayed() {
    debug('Checking if manage page is displayed');
    try {
      const title = await this.page.locator(this.selectors.managePageTitle);
      await title.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      debug('Manage page title not found:', error);
      return false;
    }
  }

  /**
   * Lấy số lượng trận đấu trong bảng quản lý
   */
  async getMatchCount() {
    debug('Getting match count from manage table');
    try {
      await this.page.waitForTimeout(1000); // Đợi table load
      const rows = await this.page.locator(this.selectors.manageTableRow).all();
      debug(`Found ${rows.length} matches in table`);
      return rows.length;
    } catch (error) {
      debug('Error getting match count:', error);
      return 0;
    }
  }

  /**
   * Kiểm tra có nút "Hủy trận" không (để verify có thể quản lý)
   */
  async hasCancelButton() {
    debug('Checking if cancel button exists');
    try {
      const cancelBtn = await this.page.locator(this.selectors.cancelMatchButton).first();
      const isVisible = await cancelBtn.isVisible({ timeout: 3000 });
      debug(`Cancel button visible: ${isVisible}`);
      return isVisible;
    } catch (error) {
      debug('Cancel button not found:', error);
      return false;
    }
  }

  /**
   * Lấy thông tin trận đấu tại row index (0-based)
   */
  async getMatchInfoAtRow(rowIndex) {
    debug(`Getting match info at row ${rowIndex}`);
    try {
      const row = await this.page.locator(this.selectors.manageTableRow).nth(rowIndex);
      const cells = await row.locator('th, td').all();
      
      if (cells.length >= 5) {
        const info = {
          stt: await cells[0].textContent(),
          teamName: await cells[1].textContent(),
          stadium: await cells[2].textContent(),
          time: await cells[3].textContent(),
        };
        debug('Match info:', info);
        return info;
      }
      return null;
    } catch (error) {
      debug('Error getting match info:', error);
      return null;
    }
  }
}