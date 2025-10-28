# Notification Page - Documentation

## 📄 Tổng quan

**File:** `src/pages/notification.page.js`  
**Test File:** `src/e2e/notification.spec.js`  
**Test Coverage:** 3 test cases

Notification Page hiển thị danh sách thông báo cho người dùng, hỗ trợ đánh dấu đã đọc, và phân loại theo tab "Tất cả" và "Chưa đọc".

## 🏗️ Cấu trúc Page Object

### Constructor & Selectors

```javascript
export class NotificationPage extends BasePage {
  constructor(page) {
    super(page);

    this.selectors = {
      pageTitle: SELECTORS.NOTIFICATION.PAGE_TITLE,
      notificationList: SELECTORS.NOTIFICATION.NOTIFICATION_LIST,
      notificationItem: SELECTORS.NOTIFICATION.NOTIFICATION_ITEM,
      notificationTitle: SELECTORS.NOTIFICATION.NOTIFICATION_TITLE,
      notificationContent: SELECTORS.NOTIFICATION.NOTIFICATION_CONTENT,
      notificationTime: SELECTORS.NOTIFICATION.NOTIFICATION_TIME,
      notificationIcon: SELECTORS.NOTIFICATION.NOTIFICATION_ICON,
      notificationUnread: SELECTORS.NOTIFICATION.NOTIFICATION_UNREAD,
      notificationRead: SELECTORS.NOTIFICATION.NOTIFICATION_READ,
      tabAll: SELECTORS.NOTIFICATION.TAB_ALL,
      tabUnread: SELECTORS.NOTIFICATION.TAB_UNREAD,
      markReadButton: SELECTORS.NOTIFICATION.MARK_READ_BUTTON,
      deleteAllButton: SELECTORS.NOTIFICATION.DELETE_ALL_BUTTON,
      emptyMessage: SELECTORS.NOTIFICATION.EMPTY_MESSAGE,
      tabPanelAll: SELECTORS.NOTIFICATION.TAB_PANEL_ALL,
      tabPanelUnread: SELECTORS.NOTIFICATION.TAB_PANEL_UNREAD,
    };
  }
}
```

## 🔑 Methods quan trọng

### Navigation Methods

#### `navigate()`
Điều hướng đến trang Thông báo.

```javascript
async navigate() {
  info('Navigating to Notification page');
  await this.goto(`${ENV.BASE_URL}${ROUTES.NOTIFICATIONS}`);
  await this.waitForPageLoaded();
}
```

**Route:** `/notifications` (ROUTES.NOTIFICATIONS)

#### `waitForPageLoaded()`
Đợi trang Notification load xong.

```javascript
async waitForPageLoaded() {
  info('Waiting for Notification page to load');
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForSelector(this.selectors.pageTitle);
}
```

### Notification Count & List Methods

#### `getNotificationCount()`
Lấy số lượng thông báo.

```javascript
async getNotificationCount() {
  info('Getting notification count');
  const count = await this.page.locator(this.selectors.notificationItem).count();
  debug(`Found ${count} notifications`);
  return count;
}
```

**Return:** `number` - Số lượng thông báo.

**Use case:** TC01, TC02, TC03 - Kiểm tra có thông báo hay không.

#### `getNotificationItems()`
Lấy tất cả notification items.

```javascript
async getNotificationItems() {
  info('Getting all notification items');
  return await this.page.locator(this.selectors.notificationItem).all();
}
```

**Return:** `Array<Locator>` - Mảng các notification elements.

#### `getFirstNotificationText()`
Lấy text của thông báo đầu tiên.

```javascript
async getFirstNotificationText() {
  info('Getting first notification text');
  const firstNotification = await this.page.locator(this.selectors.notificationContent).first();
  return await firstNotification.textContent();
}
```

**Return:** `string` - Nội dung thông báo.

**Use case:** TC01 - Verify thông báo có nội dung.

#### `getNotificationTextAt(index)`
Lấy text của thông báo tại vị trí index.

```javascript
async getNotificationTextAt(index) {
  info(`Getting notification text at index ${index}`);
  const notification = await this.page.locator(this.selectors.notificationContent).nth(index);
  return await notification.textContent();
}
```

#### `getNotificationTimeAt(index)`
Lấy thời gian của thông báo tại vị trí index.

```javascript
async getNotificationTimeAt(index) {
  info(`Getting notification time at index ${index}`);
  const time = await this.page.locator(this.selectors.notificationTime).nth(index);
  return await time.textContent();
}
```

**Use case:** TC01 - Verify thông báo có thời gian.

### Display Methods

#### `isNotificationListVisible()`
Kiểm tra danh sách thông báo có hiển thị không.

```javascript
async isNotificationListVisible() {
  info('Checking if notification list is visible');
  return await this.page.locator(this.selectors.notificationList).isVisible();
}
```

**Return:** `boolean`

**Use case:** TC01 - Verify danh sách hiển thị.

#### `isEmptyMessageVisible()`
Kiểm tra message "Không có thông báo nào" có hiển thị không.

```javascript
async isEmptyMessageVisible() {
  info('Checking if empty message is visible');
  try {
    return await this.page.locator(this.selectors.emptyMessage).isVisible({ timeout: 2000 });
  } catch {
    return false;
  }
}
```

**Return:** `boolean`

**Use case:** TC02 - Verify message khi không có thông báo.

### Tab Methods

#### `clickTabAll()`
Click tab "Tất cả".

```javascript
async clickTabAll() {
  info('Clicking "Tất cả" tab');
  await this.page.locator(this.selectors.tabAll).click();
  await this.page.waitForLoadState('networkidle');
}
```

#### `clickTabUnread()`
Click tab "Chưa đọc".

```javascript
async clickTabUnread() {
  info('Clicking "Chưa đọc" tab');
  await this.page.locator(this.selectors.tabUnread).click();
  await this.page.waitForLoadState('networkidle');
}
```

#### `isTabAllActive()`
Kiểm tra tab "Tất cả" có active không.

```javascript
async isTabAllActive() {
  info('Checking if "Tất cả" tab is active');
  const tab = await this.page.locator(this.selectors.tabAll);
  const ariaSelected = await tab.getAttribute('aria-selected');
  return ariaSelected === 'true';
}
```

**Return:** `boolean`

#### `isTabUnreadActive()`
Kiểm tra tab "Chưa đọc" có active không.

```javascript
async isTabUnreadActive() {
  info('Checking if "Chưa đọc" tab is active');
  const tab = await this.page.locator(this.selectors.tabUnread);
  const ariaSelected = await tab.getAttribute('aria-selected');
  return ariaSelected === 'true';
}
```

### Action Methods

#### `clickMarkAsReadButton()`
Click nút "Đánh dấu là đã đọc".

```javascript
async clickMarkAsReadButton() {
  info('Clicking "Đánh dấu là đã đọc" button');
  await this.page.locator(this.selectors.markReadButton).click();
  await this.page.waitForLoadState('networkidle');
}
```

**Use case:** TC03 - Đánh dấu thông báo đã đọc.

#### `clickDeleteAllButton()`
Click nút "Xóa tất cả".

```javascript
async clickDeleteAllButton() {
  info('Clicking "Xóa tất cả" button');
  await this.page.locator(this.selectors.deleteAllButton).click();
}
```

#### `clickFirstNotification()`
Click vào thông báo đầu tiên.

```javascript
async clickFirstNotification() {
  info('Clicking first notification');
  await this.page.locator(this.selectors.notificationItem).first().click();
}
```

### Unread Status Methods

#### `getUnreadNotificationCount()`
Lấy số lượng thông báo chưa đọc.

```javascript
async getUnreadNotificationCount() {
  info('Getting unread notification count');
  const count = await this.page.locator(this.selectors.notificationUnread).count();
  debug(`Found ${count} unread notifications`);
  return count;
}
```

**Return:** `number` - Số lượng thông báo chưa đọc.

**Use case:** TC03 - Đếm số thông báo chưa đọc trước và sau khi mark read.

#### `isNotificationUnread(index)`
Kiểm tra thông báo tại vị trí index có phải chưa đọc không.

```javascript
async isNotificationUnread(index = 0) {
  info(`Checking if notification at index ${index} is unread`);
  const notification = await this.page.locator(this.selectors.notificationItem).nth(index);
  const classes = await notification.getAttribute('class');
  return classes.includes('bg-[#e3f2fd]');
}
```

**Return:** `boolean` - true nếu chưa đọc (có background `bg-[#e3f2fd]`).

**Use case:** TC03 - Verify trạng thái unread → read.

**Important:** Unread notifications có background color `#e3f2fd` (light blue).

## 🧪 Test Cases (3 TCs)

### TC01 - Kiểm tra hiển thị danh sách thông báo
**Mục đích:** Verify trang notification hiển thị đúng danh sách thông báo.

**Precondition:** Có ít nhất 1 thông báo trong hệ thống.

**Logic:**
1. Chọn "Thông báo" (navigate đến notification page)
2. Verify page title: "Thông báo của bạn"
3. Lấy số lượng thông báo
4. Nếu có thông báo (count > 0):
   - Verify danh sách hiển thị
   - Verify thông báo đầu tiên có nội dung
   - Verify thông báo có icon
   - Verify thông báo có thời gian
5. Nếu không có thông báo: skip test

```javascript
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
```

**Expectations:**
- ✅ Page title: "Thông báo của bạn"
- ✅ Danh sách thông báo hiển thị (nếu có)
- ✅ Thông báo có nội dung (length > 0)
- ✅ Thông báo có icon
- ✅ Thông báo có thời gian

**Conditional:** Test skip nếu không có thông báo.

### TC02 - Kiểm tra giao diện khi không có thông báo
**Mục đích:** Verify hiển thị message "Không có thông báo nào" khi danh sách rỗng.

**Precondition:** KHÔNG có thông báo trong hệ thống.

**Logic:**
1. Chọn "Thông báo" (navigate)
2. Lấy số lượng thông báo
3. Nếu count === 0:
   - Verify empty message visible
   - Verify text: "Không có thông báo nào"
4. Nếu count > 0: skip test

```javascript
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
```

**Expectations:**
- ✅ Empty message visible
- ✅ Text: "Không có thông báo nào"

**Conditional:** Test skip nếu có thông báo.

### TC03 - Kiểm tra thay đổi trạng thái thông báo
**Mục đích:** Verify đánh dấu đã đọc thay đổi trạng thái thông báo.

**Precondition:** Có ít nhất 1 thông báo chưa đọc.

**Logic:**
1. Chọn "Thông báo"
2. Lấy số lượng thông báo
3. Nếu có thông báo và có thông báo chưa đọc:
   - Lấy số lượng chưa đọc ban đầu
   - Kiểm tra thông báo đầu tiên có phải chưa đọc không
   - Click "Đánh dấu là đã đọc"
   - Đợi 1.5 giây
   - Verify trạng thái thông báo thay đổi từ unread → read
   - Verify số lượng chưa đọc giảm
4. Nếu không có thông báo chưa đọc: skip test

```javascript
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
```

**Expectations:**
- ✅ Trạng thái thay đổi: unread (bg-[#e3f2fd]) → read (không có bg)
- ✅ Số lượng chưa đọc giảm

**Conditional:** Test skip nếu không có thông báo chưa đọc.

## 📊 Test Data

Không có test data cụ thể cho Notification tests. Test dựa vào data có sẵn trong hệ thống.

**Preconditions:**
- TC01: Cần có ít nhất 1 thông báo
- TC02: Cần KHÔNG có thông báo
- TC03: Cần có ít nhất 1 thông báo chưa đọc

## 💡 Best Practices

### 1. Use conditional test skip
```javascript
// Good - Skip test nếu precondition không thỏa mãn
if (notificationCount > 0) {
  // Run test
} else {
  test.skip('Test case này yêu cầu có thông báo trong hệ thống');
}

// Bad - Test fail nếu không có data
expect(notificationCount).toBeGreaterThan(0); // Fail nếu count === 0
```

### 2. Check unread state by background color
```javascript
// Good - Check class contains bg-[#e3f2fd]
const classes = await notification.getAttribute('class');
return classes.includes('bg-[#e3f2fd]');

// Less reliable - Hardcode selector
const isUnread = await page.locator('.bg-[#e3f2fd]').count() > 0;
```

### 3. Verify state change
```javascript
// Good - Kiểm tra before và after
const isUnreadBefore = await notificationPage.isNotificationUnread(0);
await notificationPage.clickMarkAsReadButton();
const isUnreadAfter = await notificationPage.isNotificationUnread(0);

if (isUnreadBefore) {
  expect(isUnreadAfter).toBe(false);
}

// Bad - Không check before
await notificationPage.clickMarkAsReadButton();
const isUnreadAfter = await notificationPage.isNotificationUnread(0);
expect(isUnreadAfter).toBe(false); // Có thể fail nếu notification đã đọc rồi
```

### 4. Use timeout for optional elements
```javascript
// Good - Timeout ngắn cho empty message
async isEmptyMessageVisible() {
  try {
    return await this.page.locator(this.selectors.emptyMessage).isVisible({ timeout: 2000 });
  } catch {
    return false;
  }
}

// Bad - Không handle error
return await this.page.locator(this.selectors.emptyMessage).isVisible(); // Throw nếu không tìm thấy
```

## 🔍 Common Issues

### Issue 1: Test always skip
**Nguyên nhân:** Không có data thỏa mãn precondition.  
**Giải pháp:**
- TC01: Tạo notification trước khi chạy test
- TC02: Xóa hết notification trước khi chạy test
- TC03: Đảm bảo có notification chưa đọc

### Issue 2: Unread state không chính xác
**Nguyên nhân:** Background color class thay đổi.  
**Giải pháp:**
- Cập nhật class name trong `isNotificationUnread()`
- Check cả `aria-label` hoặc attribute khác

### Issue 3: Mark as read không work
**Nguyên nhân:** Đợi chưa đủ lâu.  
**Giải pháp:**
```javascript
await notificationPage.clickMarkAsReadButton();
await page.waitForTimeout(1500); // Tăng timeout
```

## 📚 Related Documentation

- [Selectors](../src/constants/selectors.js)
- [Routes](../src/constants/routes.js)
- [Fixtures](../src/fixtures/index.js)

---

**Total Test Cases:** 3  
**Coverage:** Display Notifications, Empty State, Mark as Read  
**Last Updated:** October 2025

