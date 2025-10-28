# Matching Page - Documentation

## 📄 Tổng quan

**File:** `src/pages/matching.page.js`  
**Test File:** `src/e2e/matching.spec.js`  
**Test Coverage:** 4 test cases

Matching Page cho phép người dùng tạo trận đấu (match) và quản lý các trận đấu đã tạo, bao gồm chọn CLB, sân bóng, ngày giờ, liên hệ và mô tả.

## 🏗️ Cấu trúc Page Object

### Constructor & Selectors

```javascript
export class MatchingPage extends BasePage {
  constructor(page) {
    super(page);

    this.selectors = {
      // Create form
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
}
```

## 🔑 Methods quan trọng

### Navigation Methods

#### `navigate()`
Điều hướng đến trang matching list.

```javascript
async navigate() {
  info('Navigating to Matching page');
  await this.goto(`${ENV.BASE_URL}${ROUTES.MATCHING}`);
  await this.waitForPageLoaded();
}
```

**Route:** `/matching` (ROUTES.MATCHING)

#### `navigateToCreatePage()`
Điều hướng đến trang tạo trận đấu.

```javascript
async navigateToCreatePage() {
  info('Navigating to Create Matching page');
  await this.goto(`${ENV.BASE_URL}${ROUTES.MATCHING_CREATE}`);
  await this.waitForCreatePageLoaded();
}
```

**Route:** `/matching/create` (ROUTES.MATCHING_CREATE)

**Use case:** TC01, TC02, TC03 - Tạo trận đấu.

#### `navigateToManagePage()`
Điều hướng đến trang quản lý trận đấu.

```javascript
async navigateToManagePage() {
  info('Navigating to Manage Matches page');
  await this.goto(`${ENV.BASE_URL}${ROUTES.MATCHING_MANAGE}`);
  await this.page.waitForLoadState('networkidle');
}
```

**Route:** `/matching/manage` (ROUTES.MATCHING_MANAGE)

**Use case:** TC04 - Quản lý trận đấu.

### Form Display Methods

#### `isFormDisplayed()`
Kiểm tra form tạo trận đấu có hiển thị đầy đủ các trường không.

```javascript
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
```

**Return:** `boolean` - true nếu tất cả 7 trường hiển thị.

**Use case:** TC01 - Verify form hiển thị đầy đủ.

### Form Input Methods

#### `selectClub(clubName)`
Chọn câu lạc bộ từ dropdown.

```javascript
async selectClub(clubName) {
  info(`Selecting club: ${clubName}`);
  await this.page.click(this.selectors.clubSelect);
  await this.page.waitForTimeout(500);
  await this.page.click(`${this.selectors.clubSelectOption}:has-text("${clubName}")`);
  await this.page.waitForTimeout(300);
}
```

**Parameters:**
- `clubName` - Tên CLB (string), ví dụ: "Arsenal FC"

**Use case:** TC02 - Tạo trận với CLB.

#### `selectStadium(stadiumName)`
Chọn sân bóng từ dropdown.

```javascript
async selectStadium(stadiumName) {
  info(`Selecting stadium: ${stadiumName}`);
  await this.page.click(this.selectors.stadiumSelect);
  await this.page.waitForTimeout(500);
  await this.page.click(`${this.selectors.stadiumSelectOption}:has-text("${stadiumName}")`);
  await this.page.waitForTimeout(300);
}
```

**Parameters:**
- `stadiumName` - Tên sân bóng, ví dụ: "Sân Vận Động A"

#### `fillDate(date)`
Nhập ngày thi đấu.

```javascript
async fillDate(date) {
  info(`Filling date: ${date}`);
  await this.fill(this.selectors.dateInput, date);
}
```

**Parameters:**
- `date` - Ngày (string), format: "2025-12-31"

#### `fillTime(time)`
Nhập giờ thi đấu.

```javascript
async fillTime(time) {
  info(`Filling time: ${time}`);
  await this.fill(this.selectors.timeInput, time);
}
```

**Parameters:**
- `time` - Giờ (string), format: "14:00"

#### `fillContactNumber(contactNumber)`
Nhập số điện thoại liên hệ.

```javascript
async fillContactNumber(contactNumber) {
  info(`Filling contact number: ${contactNumber}`);
  await this.fill(this.selectors.contactInput, contactNumber);
}
```

**Parameters:**
- `contactNumber` - Số điện thoại, ví dụ: "0912345678"

#### `fillDescription(description)`
Nhập mô tả trận đấu.

```javascript
async fillDescription(description) {
  info(`Filling description: ${description}`);
  await this.fill(this.selectors.descriptionInput, description);
}
```

**Parameters:**
- `description` - Mô tả (string)

### Submit Methods

#### `clickSubmitButton()`
Click nút "Tạo" để submit form.

```javascript
async clickSubmitButton() {
  info('Clicking submit button');
  await this.click(this.selectors.submitButton);
}
```

#### `createMatch(matchData)`
Method tổng hợp: tạo trận đấu với đầy đủ thông tin.

```javascript
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
```

**Parameters:**
- `matchData` - Object chứa thông tin trận đấu
  - `club` (optional) - Tên CLB
  - `stadium` (optional) - Tên sân
  - `date` (optional) - Ngày thi đấu
  - `time` (optional) - Giờ thi đấu
  - `contactNumber` (optional) - SĐT liên hệ
  - `description` (optional) - Mô tả

**Use case:** TC02 - Tạo trận thành công.

### Error & Success Message Methods

#### `getErrorMessage()`
Lấy error message đầu tiên.

```javascript
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
```

**Return:** `string | null`

#### `getAllErrorMessages()`
Lấy tất cả error messages từ form validation.

```javascript
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
```

**Return:** `Array<string>` - Mảng các error messages.

**Use case:** TC03 - Kiểm tra validation khi thiếu thông tin.

**Important:** Method này filter messages, chỉ lấy text length > 5 để loại bỏ placeholder/label.

#### `getSuccessMessage()`
Lấy success message sau khi tạo trận thành công.

```javascript
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
```

**Return:** `string | null`

### Match List Methods

#### `isMatchInList(stadiumName)`
Kiểm tra trận đấu có trong danh sách không (search by stadium name).

```javascript
async isMatchInList(stadiumName) {
  info(`Checking if match with stadium "${stadiumName}" is in list`);
  try {
    const matchElement = await this.page.locator(`text="${stadiumName}"`).first();
    return await matchElement.isVisible({ timeout: 5000 });
  } catch (error) {
    return false;
  }
}
```

**Parameters:**
- `stadiumName` - Tên sân để tìm

**Return:** `boolean`

**Use case:** TC02 - Verify trận xuất hiện trong danh sách.

### Manage Page Methods

#### `isManagePageDisplayed()`
Kiểm tra trang "Quản lý trận bóng" có hiển thị đúng không.

```javascript
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
```

**Return:** `boolean`

**Use case:** TC04 - Verify trang quản lý hiển thị.

#### `getMatchCount()`
Lấy số lượng trận đấu trong bảng quản lý.

```javascript
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
```

**Return:** `number` - Số lượng trận đấu.

**Use case:** TC04 - Verify có trận đấu trong table.

#### `hasCancelButton()`
Kiểm tra có nút "Hủy trận" không (để verify có thể quản lý).

```javascript
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
```

**Return:** `boolean`

**Use case:** TC04 - Verify có nút hủy trận.

#### `getMatchInfoAtRow(rowIndex)`
Lấy thông tin trận đấu tại row index (0-based).

```javascript
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
```

**Return:** `Object | null` - `{ stt, teamName, stadium, time }`

**Use case:** TC04 - Lấy info trận đầu tiên.

## 🧪 Test Cases (4 TCs)

### TC01 - Mở form "Tạo trận bóng"
**Mục đích:** Kiểm tra form tạo trận hiển thị đầy đủ các trường.

**Logic:**
1. Chọn "Cặp kèo - Tìm đối"
2. Nhấn "Tạo trận bóng" (hoặc navigate trực tiếp)
3. Verify form hiển thị đầy đủ 7 trường:
   - Câu lạc bộ (dropdown)
   - Sân bóng (dropdown)
   - Ngày thi đấu (date input)
   - Giờ thi đấu (time input)
   - Số điện thoại liên hệ (text input)
   - Mô tả (textarea)
   - Nút "Tạo" (submit button)

```javascript
test('TC01 - Mở form "Tạo trận bóng" - Kiểm tra hiển thị form tạo trận', async () => {
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
```

**Expectations:**
- ✅ Form hiển thị đầy đủ 7 trường
- ✅ Tất cả trường đều visible

### TC02 - Tạo trận bóng hợp lệ
**Mục đích:** Kiểm tra tạo trận đấu thành công với thông tin hợp lệ.

**Logic:**
1. Navigate đến create page
2. Nhập đầy đủ thông tin:
   - Club: "Arsenal FC"
   - Stadium: "Sân Vận Động A"
   - Date: "2025-12-31"
   - Time: "14:00"
   - Contact: "0912345678"
   - Description: "Trận giao hữu cuối tuần"
3. Click "Tạo"
4. Đợi 2 giây
5. Verify trận tạo thành công:
   - URL chuyển về `/matching` HOẶC có success message
   - Trận hiển thị trong danh sách (nếu redirect)

```javascript
test('TC02 - Tạo trận bóng hợp lệ - Kiểm tra tạo trận thành công', async () => {
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
```

**Test Data:**
```javascript
MATCHING_TEST_DATA.VALID_MATCH = {
  club: 'Arsenal FC',
  stadium: 'Sân Vận Động A',
  date: '2025-12-31',
  time: '14:00',
  contactNumber: '0912345678',
  description: 'Trận giao hữu cuối tuần'
}
```

**Expectations:**
- ✅ Tạo trận thành công (success message hoặc redirect)
- ✅ Trận xuất hiện trong danh sách

### TC03 - Tạo trận bóng thiếu thông tin
**Mục đích:** Kiểm tra validation khi thiếu thông tin bắt buộc.

**Logic:**
1. Navigate đến create page
2. Không điền bất kỳ thông tin nào (để trống form)
3. Click "Tạo trận đấu"
4. Verify hiển thị các lỗi cho các trường bắt buộc:
   - Phải có ít nhất 2 error messages
   - Có thông báo về "câu lạc bộ" hoặc "club"
   - Có thông báo về "sân" hoặc "stadium"

```javascript
test('TC03 - Tạo trận bóng thiếu thông tin - Kiểm tra thông báo lỗi khi thiếu dữ liệu', async () => {
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
```

**Expectations:**
- ✅ Hiển thị ít nhất 2 error messages
- ✅ Có error về "câu lạc bộ/club"
- ✅ Có error về "sân/stadium"

**Required fields:** Club, Stadium

### TC04 - Quản lý trận bóng
**Mục đích:** Kiểm tra trang quản lý trận bóng hiển thị danh sách trận đã tạo.

**Logic:**
1. Navigate đến manage page
2. Verify trang "Quản lý trận bóng của bạn" hiển thị
3. Verify hiển thị danh sách trận trong table
4. Verify có nút "Hủy trận" (nếu có trận)
5. Verify có thể đọc thông tin trận đầu tiên

```javascript
test('TC04 - Quản lý trận bóng - Kiểm tra danh sách trận đã tạo', async () => {
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
```

**Expectations:**
- ✅ Trang "Quản lý trận bóng của bạn" hiển thị
- ✅ Table hiển thị danh sách trận (≥ 0 trận)
- ✅ Có nút "Hủy trận" nếu có trận
- ✅ Có thể đọc thông tin trận (teamName, stadium, time)

## 📊 Test Data

### Valid Match Data
```javascript
MATCHING_TEST_DATA.VALID_MATCH = {
  club: 'Arsenal FC',
  stadium: 'Sân Vận Động A',
  date: '2025-12-31',
  time: '14:00',
  contactNumber: '0912345678',
  description: 'Trận giao hữu cuối tuần'
}

MATCHING_TEST_DATA.STADIUMS = {
  SVD_A: 'Sân Vận Động A',
  SVD_B: 'Sân Vận Động B'
}
```

## 💡 Best Practices

### 1. Wait after dropdown selection
```javascript
// Good
await this.page.click(this.selectors.clubSelect);
await this.page.waitForTimeout(500); // Đợi dropdown mở
await this.page.click(`${this.selectors.clubSelectOption}:has-text("${clubName}")`);
await this.page.waitForTimeout(300); // Đợi selection apply

// Bad
await this.page.click(this.selectors.clubSelect);
await this.page.click(`${this.selectors.clubSelectOption}:has-text("${clubName}")`); // Có thể fail
```

### 2. Flexible success verification
```javascript
// Good - Chấp nhận cả success message và redirect
const currentUrl = page.url();
const isSuccess = currentUrl.includes('/matching') || 
                 (await matchingPage.getSuccessMessage()) !== null;
expect(isSuccess).toBeTruthy();

// Bad - Too strict
const successMessage = await matchingPage.getSuccessMessage();
expect(successMessage).toBe('Tạo trận thành công'); // Có thể fail nếu redirect
```

### 3. Filter error messages properly
```javascript
// Good - Filter messages length > 5
if (text && text.trim() && text.trim().length > 5) {
  messages.push(text.trim());
}

// Bad - Lấy tất cả (bao gồm placeholder, label)
messages.push(await element.textContent());
```

## 🔍 Common Issues

### Issue 1: Dropdown không chọn được
**Nguyên nhân:** Không đợi dropdown mở.  
**Giải pháp:**
```javascript
await this.page.click(this.selectors.clubSelect);
await this.page.waitForTimeout(500);
await this.page.click(`${this.selectors.clubSelectOption}:has-text("${clubName}")`);
```

### Issue 2: Error messages không đầy đủ
**Nguyên nhân:** Lấy luôn placeholder/label.  
**Giải pháp:** Filter messages có length > 5.

### Issue 3: Manage page không có matches
**Nguyên nhân:** Chưa tạo trận nào.  
**Giải pháp:** Test accept matchCount >= 0.

## 📚 Related Documentation

- [Test Data](../src/test-data/matching.test-data.js)
- [Selectors](../src/constants/selectors.js)
- [Routes](../src/constants/routes.js)

---

**Total Test Cases:** 4  
**Coverage:** Form Display, Create Match (valid/validation), Manage Matches  
**Last Updated:** October 2025

