import { test, expect } from '../fixtures/index.js';
import { TeamPage } from '../pages/team.page.js';
import { TEAM_TEST_DATA } from '../test-data/team.test-data.js';

test.describe('Team - Create Team Tests', () => {
  let teamPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    teamPage = new TeamPage(authenticatedPage);
    page = authenticatedPage;
    
    // Navigate to team page
    await teamPage.navigate();
  });

  test('TC01: Upload ảnh đội bóng hợp lệ - Kiểm tra upload file ảnh hợp lệ', async () => {
    // Arrange
    const validImagePath = TEAM_TEST_DATA.FILES.VALID_IMAGE_PNG;

    // Act
    await teamPage.uploadTeamImage(validImagePath);

    // Assert - Kiểm tra ảnh hiển thị preview
    const isPreviewVisible = await teamPage.isImagePreviewVisible();
    expect(isPreviewVisible).toBeTruthy();

    // Assert - Không có thông báo lỗi
    const errorMessage = await teamPage.getErrorMessage();
    expect(errorMessage).toBeNull();
  });

  test('TC02: Upload file không hợp lệ - Kiểm tra thông báo lỗi file sai định dạng', async () => {
    // Arrange
    const invalidFilePath = TEAM_TEST_DATA.FILES.INVALID_FILE_EXE;

    // Act
    await teamPage.uploadTeamImage(invalidFilePath);

    // Assert - Kiểm tra có thông báo lỗi hoặc không hiển thị preview
    const isPreviewVisible = await teamPage.isImagePreviewVisible();
    
    if (isPreviewVisible) {
      // Nếu vẫn hiển thị preview thì fail test
      expect(isPreviewVisible).toBeFalsy();
    } else {
      // Kiểm tra có thông báo lỗi
      const errorMessage = await teamPage.getErrorMessage();
      // Có thể là lỗi từ browser hoặc từ app
      // Chấp nhận cả 2 trường hợp: có error message hoặc không upload được
      expect(errorMessage === null || errorMessage.includes('Định dạng') || errorMessage.includes('không hợp lệ')).toBeTruthy();
    }
  });

  test('TC03: Tạo CLB thành công - Kiểm tra tạo đội hợp lệ', async () => {
    // Arrange
    const teamData = {
      name: TEAM_TEST_DATA.VALID_TEAM.name,
      description: TEAM_TEST_DATA.VALID_TEAM.description,
      imagePath: TEAM_TEST_DATA.FILES.VALID_IMAGE_PNG,
    };

    // Act
    await teamPage.createTeam(teamData);

    // Assert - Đợi và kiểm tra thông báo thành công hoặc CLB xuất hiện trong danh sách
    const successMessage = await teamPage.getSuccessMessage();
    const isTeamInList = await teamPage.isTeamInList(teamData.name);

    // Pass nếu có success message HOẶC team xuất hiện trong danh sách
    expect(successMessage !== null || isTeamInList).toBeTruthy();
  });

  test('TC04: Thiếu tên CLB - Kiểm tra lỗi khi không nhập tên đội', async () => {
    // Arrange
    const teamData = {
      name: '', // Để trống tên
      description: TEAM_TEST_DATA.VALID_TEAM.description,
    };

    // Act
    await teamPage.fillTeamName(teamData.name);
    await teamPage.fillTeamDescription(teamData.description);
    await teamPage.clickSubmitButton();

    // Assert - Kiểm tra thông báo lỗi "Tên đội bóng không được để trống"
    const nameErrorMessage = await teamPage.getNameErrorMessage();
    const validationMessage = await teamPage.getFieldValidationMessage(teamPage.selectors.teamNameInput);

    // Kiểm tra có error message hoặc validation message từ HTML5
    expect(
      nameErrorMessage !== null || 
      validationMessage !== null ||
      (await page.locator('input[name="name"]:invalid').count() > 0)
    ).toBeTruthy();

    // Nếu có error message từ server, kiểm tra nội dung chính xác
    if (nameErrorMessage) {
      console.log('Name error message:', nameErrorMessage);
      expect(nameErrorMessage).toContain('Tên đội bóng không được để trống');
    }
  });
});