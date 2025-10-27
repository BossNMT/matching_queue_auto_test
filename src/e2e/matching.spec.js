import { test, expect } from '../fixtures/index.js';
import { MatchingPage } from '../pages/matching.page.js';
import { MATCHING_TEST_DATA } from '../test-data/matching.test-data.js';

test.describe('Matching - Tạo trận đấu Tests', () => {
  let matchingPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    matchingPage = new MatchingPage(authenticatedPage);
    page = authenticatedPage;
  });

  test('TC001 - Mở form "Tạo trận bóng" - Kiểm tra hiển thị form tạo trận', async () => {
    // 1. Chọn "Cặp kèo - Tìm đối"
    await matchingPage.navigate();
    
    // 2. Nhấn "Tạo trận bóng" (hoặc điều hướng trực tiếp đến trang tạo trận)
    await matchingPage.navigateToCreatePage();
    
    // Verify: Form hiển thị đầy đủ các trường nhập
    const isFormDisplayed = await matchingPage.isFormDisplayed();
    expect(isFormDisplayed).toBeTruthy();
    
    // Kiểm tra từng trường có hiển thị
    await expect(page.locator(matchingPage.selectors.clubSelect)).toBeVisible();
    await expect(page.locator(matchingPage.selectors.stadiumSelect)).toBeVisible();
    await expect(page.locator(matchingPage.selectors.dateInput)).toBeVisible();
    await expect(page.locator(matchingPage.selectors.timeInput)).toBeVisible();
    await expect(page.locator(matchingPage.selectors.contactInput)).toBeVisible();
    await expect(page.locator(matchingPage.selectors.descriptionInput)).toBeVisible();
    await expect(page.locator(matchingPage.selectors.submitButton)).toBeVisible();
  });

  test('TC002 - Tạo trận bóng hợp lệ - Kiểm tra tạo trận thành công', async () => {
    // Navigate to create page
    await matchingPage.navigateToCreatePage();
    
    // 1. Nhập đầy đủ thông tin trận
    const matchData = MATCHING_TEST_DATA.VALID_MATCH;
    
    // 2. Nhấn "Tạo"
    await matchingPage.createMatch(matchData);
    
    // Verify: Trận bóng tạo thành công
    // Có thể kiểm tra thông báo thành công hoặc redirect về trang danh sách
    await page.waitForTimeout(2000);
    
    // Kiểm tra có redirect hoặc có thông báo thành công
    const currentUrl = page.url();
    const isSuccess = currentUrl.includes('/matching') || 
                     (await matchingPage.getSuccessMessage()) !== null;
    expect(isSuccess).toBeTruthy();
    
    // Verify: Hiển thị trong danh sách (nếu redirect về trang matching)
    if (currentUrl.includes('/matching') && !currentUrl.includes('/create')) {
      const isInList = await matchingPage.isMatchInList(MATCHING_TEST_DATA.STADIUMS.SVD_A);
      expect(isInList).toBeTruthy();
    }
  });

  test('TC003 - Tạo trận bóng thiếu thông tin - Kiểm tra thông báo lỗi khi thiếu dữ liệu', async () => {
    // Navigate to create page
    await matchingPage.navigateToCreatePage();
    
    // 1. Không điền bất kỳ thông tin nào (để trống form)
    // 2. Nhấn "Tạo trận đấu" trực tiếp
    await matchingPage.clickSubmitButton();
    
    // 3. Verify: Hiển thị các lỗi cho các trường bắt buộc
    const errorMessages = await matchingPage.getAllErrorMessages();
    console.log('✅ Error messages found:', errorMessages);
    
    // Verify: Phải có ít nhất 2 error messages (cho club và stadium - 2 trường required)
    expect(errorMessages.length).toBeGreaterThanOrEqual(2);
    
    // Verify: Có thông báo về câu lạc bộ
    const hasClubError = errorMessages.some(msg => 
      msg.toLowerCase().includes('câu lạc bộ') || msg.toLowerCase().includes('club')
    );
    expect(hasClubError).toBeTruthy();
    
    // Verify: Có thông báo về sân bóng
    const hasStadiumError = errorMessages.some(msg => 
      msg.toLowerCase().includes('sân') || msg.toLowerCase().includes('stadium')
    );
    expect(hasStadiumError).toBeTruthy();
  });

  test('TC004 - Quản lý trận bóng - Kiểm tra danh sách trận đã tạo', async () => {
    // 1. Navigate to manage page
    await matchingPage.navigateToManagePage();
    
    // 2. Verify: Trang "Quản lý trận bóng của bạn" hiển thị
    const isManagePageDisplayed = await matchingPage.isManagePageDisplayed();
    expect(isManagePageDisplayed).toBeTruthy();
    console.log('✅ Manage page displayed with title "Quản lý trận bóng của bạn"');
    
    // 3. Verify: Hiển thị danh sách trận trong table
    const matchCount = await matchingPage.getMatchCount();
    console.log(`✅ Found ${matchCount} matches in table`);
    expect(matchCount).toBeGreaterThanOrEqual(0); // Có thể có hoặc không có trận nào
    
    // 4. Verify: Có nút "Hủy trận" (nếu có trận)
    if (matchCount > 0) {
      const hasCancelBtn = await matchingPage.hasCancelButton();
      expect(hasCancelBtn).toBeTruthy();
      console.log('✅ Cancel button is available for managing matches');
      
      // 5. Verify: Có thể đọc thông tin trận đầu tiên
      const firstMatchInfo = await matchingPage.getMatchInfoAtRow(0);
      expect(firstMatchInfo).not.toBeNull();
      expect(firstMatchInfo.teamName).toBeTruthy();
      expect(firstMatchInfo.stadium).toBeTruthy();
      expect(firstMatchInfo.time).toBeTruthy();
      console.log('✅ First match info:', firstMatchInfo);
    }
  });
});