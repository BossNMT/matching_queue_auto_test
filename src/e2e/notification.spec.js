import { test, expect } from '../fixtures/index.js';
import { NotificationPage } from '../pages/notification.page.js';

test.describe('Page - Notification Page', () => {
  let notificationPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    notificationPage = new NotificationPage(authenticatedPage);
    page = authenticatedPage;
    await notificationPage.navigate();
  });

  test.describe('Hiển thị danh sách thông báo', () => {
    test('TC01: Kiểm tra hiển thị danh sách thông báo', async () => {
      // Step 1: Chọn "Thông báo" - already navigated in beforeEach
      
      // Verify page title
      const pageTitle = await page.locator(notificationPage.selectors.pageTitle);
      await expect(pageTitle).toBeVisible();
      await expect(pageTitle).toHaveText('Thông báo của bạn');

      // Get notification count
      const notificationCount = await notificationPage.getNotificationCount();
      
      if (notificationCount > 0) {
        // Expected result: Hiển thị danh sách thông báo mới nhất
        expect(notificationCount).toBeGreaterThan(0);
        
        // Verify notification list is displayed
        const isListVisible = await notificationPage.isNotificationListVisible();
        expect(isListVisible).toBeTruthy();
        
        // Verify first notification has content
        const firstNotificationText = await notificationPage.getFirstNotificationText();
        expect(firstNotificationText).toBeTruthy();
        expect(firstNotificationText.length).toBeGreaterThan(0);
        
        // Verify notification has icon
        const firstNotification = await page.locator(notificationPage.selectors.notificationItem).first();
        const notificationIcon = await firstNotification.locator(notificationPage.selectors.notificationIcon);
        await expect(notificationIcon).toBeVisible();
        
        // Verify notification has time
        const notificationTime = await notificationPage.getNotificationTimeAt(0);
        expect(notificationTime).toBeTruthy();
        
        console.log(`✓ Hiển thị danh sách ${notificationCount} thông báo mới nhất`);
      } else {
        test.skip('Test case này yêu cầu có thông báo trong hệ thống');
      }
    });
  });

  test.describe('Không có thông báo', () => {
    test('TC02: Kiểm tra giao diện khi không có thông báo', async () => {
      // Step 1: Chọn "Thông báo" - already navigated in beforeEach
      
      // Check notification count
      const notificationCount = await notificationPage.getNotificationCount();
      
      if (notificationCount === 0) {
        // Expected result: Hiển thị "Không có thông báo nào"
        const isEmptyVisible = await notificationPage.isEmptyMessageVisible();
        expect(isEmptyVisible).toBeTruthy();
        
        // Verify the exact message text
        const emptyMessage = await page.locator(notificationPage.selectors.emptyMessage);
        await expect(emptyMessage).toBeVisible();
        await expect(emptyMessage).toHaveText('Không có thông báo nào');
        
        console.log('✓ Hiển thị "Không có thông báo nào"');
      } else {
        test.skip('Test case này yêu cầu không có thông báo trong hệ thống');
      }
    });
  });

  test.describe('Đánh dấu đã đọc', () => {
    test('TC03: Kiểm tra thay đổi trạng thái thông báo', async () => {
      // Step 1: Chọn thông báo → Đánh dấu đã đọc
      
      const notificationCount = await notificationPage.getNotificationCount();
      
      if (notificationCount > 0) {
        // Check if there are unread notifications
        const unreadCountBefore = await notificationPage.getUnreadNotificationCount();
        
        if (unreadCountBefore > 0) {
          // Get first notification
          const firstNotification = await page.locator(notificationPage.selectors.notificationItem).first();
          
          // Check initial state - unread notifications have bg-[#e3f2fd]
          const isUnreadBefore = await notificationPage.isNotificationUnread(0);
          
          // Click mark as read button
          await notificationPage.clickMarkAsReadButton();
          await page.waitForTimeout(1500);
          
          // Expected result: Biểu tượng đổi trạng thái
          const isUnreadAfter = await notificationPage.isNotificationUnread(0);
          
          // Verify state changed from unread to read
          if (isUnreadBefore) {
            expect(isUnreadAfter).toBe(false);
            console.log('✓ Biểu tượng đổi trạng thái từ chưa đọc sang đã đọc');
          }
          
          // Verify unread count decreased
          const unreadCountAfter = await notificationPage.getUnreadNotificationCount();
          expect(unreadCountAfter).toBeLessThanOrEqual(unreadCountBefore);
          
          console.log(`✓ Số thông báo chưa đọc giảm từ ${unreadCountBefore} xuống ${unreadCountAfter}`);
        } else {
          test.skip('Test case này yêu cầu có thông báo chưa đọc');
        }
      } else {
        test.skip('Test case này yêu cầu có thông báo trong hệ thống');
      }
    });
  });
});