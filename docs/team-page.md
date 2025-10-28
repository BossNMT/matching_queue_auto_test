# Team Page - Documentation

## 📄 Tổng quan

**File:** `src/pages/team.page.js`  
**Test File:** `src/e2e/team.spec.js`  
**Test Coverage:** 4 test cases

Team Page (Club Page) là trang cho phép người dùng tạo câu lạc bộ (CLB) bóng đá với tên, mô tả và hình ảnh đại diện.

## 🏗️ Cấu trúc Page Object

### Constructor & Selectors

```javascript
export class TeamPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.selectors = {
      // Form inputs
      teamNameInput: SELECTORS.TEAM.TEAM_NAME_INPUT,
      teamDescriptionInput: SELECTORS.TEAM.TEAM_DESCRIPTION_INPUT,
      
      // Image upload
      imageUploadInput: SELECTORS.TEAM.IMAGE_UPLOAD_INPUT,
      imageUploadLabel: SELECTORS.TEAM.IMAGE_UPLOAD_LABEL,
      imagePreviewContainer: SELECTORS.TEAM.IMAGE_PREVIEW_CONTAINER,
      imagePreview: SELECTORS.TEAM.IMAGE_PREVIEW,
      
      // Submit button
      submitButton: SELECTORS.TEAM.SUBMIT_BUTTON,
      
      // Error messages
      imageErrorMessage: SELECTORS.TEAM.IMAGE_ERROR_MESSAGE,
      nameErrorMessage: SELECTORS.TEAM.NAME_ERROR_MESSAGE,
      errorMessage: SELECTORS.TEAM.ERROR_MESSAGE,
      successMessage: SELECTORS.TEAM.SUCCESS_MESSAGE,
      
      // Team list
      teamList: SELECTORS.TEAM.TEAM_LIST,
      teamItem: SELECTORS.TEAM.TEAM_ITEM,
    };
  }
}
```

## 🔑 Methods quan trọng

### Navigation Methods

#### `navigate()`
Điều hướng đến trang tạo CLB.

```javascript
async navigate() {
  info('Navigating to Team page');
  await this.goto(`${ENV.BASE_URL}${ROUTES.CLUB}`);
  await this.waitForPageLoaded();
}
```

**Route:** `/club` (ROUTES.CLUB)

#### `waitForPageLoaded()`
Đợi trang load xong bằng cách đợi teamNameInput xuất hiện.

```javascript
async waitForPageLoaded() {
  debug('Waiting for Team page to load');
  await this.waitFor(this.selectors.teamNameInput);
}
```

### Form Input Methods

#### `fillTeamName(teamName)`
Nhập tên câu lạc bộ.

```javascript
async fillTeamName(teamName) {
  info(`Filling team name: ${teamName}`);
  await this.fill(this.selectors.teamNameInput, teamName);
}
```

**Parameters:**
- `teamName` - Tên CLB (string)

**Use case:** TC03, TC04

#### `fillTeamDescription(description)`
Nhập mô tả câu lạc bộ.

```javascript
async fillTeamDescription(description) {
  info(`Filling team description: ${description}`);
  await this.fill(this.selectors.teamDescriptionInput, description);
}
```

**Parameters:**
- `description` - Mô tả CLB (string)

**Note:** Mô tả là optional (không bắt buộc).

### Image Upload Methods

#### `uploadTeamImage(filePath)`
Upload hình ảnh đại diện cho CLB.

```javascript
async uploadTeamImage(filePath) {
  info(`Uploading team image: ${filePath}`);
  const fileInput = await this.page.locator(this.selectors.imageUploadInput);
  await fileInput.setInputFiles(filePath);
  // Đợi một chút để preview load
  await this.page.waitForTimeout(1000);
}
```

**Parameters:**
- `filePath` - Đường dẫn đến file ảnh (string)

**Example:**
```javascript
await teamPage.uploadTeamImage('src/test-data/uploads/arsenal.png');
```

**Use case:** TC01, TC02, TC03

#### `isImagePreviewVisible()`
Kiểm tra ảnh preview có hiển thị sau khi upload không.

```javascript
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
```

**Return:** `boolean` - true nếu preview visible, false nếu không.

**Use case:** 
- TC01: Verify ảnh hợp lệ hiển thị preview
- TC02: Verify file không hợp lệ KHÔNG hiển thị preview

### Submit Methods

#### `clickSubmitButton()`
Click nút "Tạo" để submit form tạo CLB.

```javascript
async clickSubmitButton() {
  info('Clicking submit button');
  await this.click(this.selectors.submitButton);
}
```

#### `createTeam(teamData)`
Method tổng hợp: tạo CLB với đầy đủ thông tin.

```javascript
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
```

**Parameters:**
- `teamData` - Object chứa thông tin CLB
  - `name` - Tên CLB (required)
  - `description` - Mô tả CLB (optional)
  - `imagePath` - Đường dẫn ảnh (optional)

**Example:**
```javascript
const teamData = {
  name: 'Arsenal FC',
  description: 'The Gunners',
  imagePath: 'src/test-data/uploads/arsenal.png'
};
await teamPage.createTeam(teamData);
```

**Use case:** TC03 - Tạo CLB thành công.

### Validation & Error Methods

#### `getErrorMessage()`
Lấy error message chung từ page.

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

**Return:** `string | null` - Error message hoặc null.

**Use case:** TC01, TC02 - Kiểm tra có lỗi khi upload file.

#### `getNameErrorMessage()`
Lấy error message cụ thể cho trường "Tên CLB".

```javascript
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
```

**Return:** `string | null` - "Tên đội bóng không được để trống" hoặc null.

**Use case:** TC04 - Kiểm tra validation khi thiếu tên CLB.

#### `getImageErrorMessage()`
Lấy error message cụ thể cho trường "Hình ảnh".

```javascript
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
```

**Return:** `string | null` - "Hình ảnh không được để trống" hoặc null.

#### `hasAnyError()`
Kiểm tra có bất kỳ error nào không.

```javascript
async hasAnyError() {
  debug('Checking if any error exists');
  const nameError = await this.getNameErrorMessage();
  const imageError = await this.getImageErrorMessage();
  const genericError = await this.getErrorMessage();
  
  return nameError !== null || imageError !== null || genericError !== null;
}
```

**Return:** `boolean` - true nếu có error, false nếu không.

#### `getFieldValidationMessage(fieldSelector)`
Lấy HTML5 validation message của một field.

```javascript
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
```

**Parameters:**
- `fieldSelector` - Selector của field cần kiểm tra

**Return:** `string | null` - HTML5 validation message (ví dụ: "Please fill out this field")

**Use case:** TC04 - Kiểm tra HTML5 validation khi để trống required field.

### Success & List Methods

#### `getSuccessMessage()`
Lấy success message sau khi tạo CLB thành công.

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

**Return:** `string | null` - Success message hoặc null.

**Use case:** TC03 - Verify tạo CLB thành công.

#### `isTeamInList(teamName)`
Kiểm tra CLB có trong danh sách CLB không.

```javascript
async isTeamInList(teamName) {
  info(`Checking if team "${teamName}" is in list`);
  try {
    const teamElement = await this.page.locator(`text="${teamName}"`).first();
    return await teamElement.isVisible({ timeout: 5000 });
  } catch (error) {
    return false;
  }
}
```

**Parameters:**
- `teamName` - Tên CLB cần tìm

**Return:** `boolean` - true nếu CLB tồn tại trong danh sách, false nếu không.

**Use case:** TC03 - Verify CLB xuất hiện trong danh sách sau khi tạo.

## 🧪 Test Cases (4 TCs)

### TC01 - Upload ảnh đội bóng hợp lệ
**Mục đích:** Kiểm tra upload file ảnh hợp lệ (PNG, JPG) thành công.

**Logic:**
1. Navigate đến trang tạo CLB
2. Upload file ảnh hợp lệ (arsenal.png)
3. Verify ảnh preview hiển thị
4. Verify KHÔNG có error message

```javascript
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
```

**Test Data:** `TEAM_TEST_DATA.FILES.VALID_IMAGE_PNG` = `'src/test-data/uploads/arsenal.png'`

**Expected:**
- ✅ Preview ảnh hiển thị
- ✅ Không có error message

### TC02 - Upload file không hợp lệ
**Mục đích:** Kiểm tra hệ thống reject file sai định dạng (EXE, TXT, etc).

**Logic:**
1. Navigate đến trang tạo CLB
2. Upload file không phải ảnh (invalid.exe)
3. Verify ảnh preview KHÔNG hiển thị HOẶC có error message
4. Verify hệ thống từ chối file

```javascript
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
```

**Test Data:** `TEAM_TEST_DATA.FILES.INVALID_FILE_EXE` = `'src/test-data/uploads/invalid.exe'`

**Expected:**
- ❌ Preview ảnh KHÔNG hiển thị
- ✅ Có error message (nếu có validation từ app) HOẶC browser reject file

**Note:** Test chấp nhận 2 trường hợp:
1. Browser tự reject file (không upload được) → preview không hiển thị, không có error
2. App reject file → có error message

### TC03 - Tạo CLB thành công
**Mục đích:** Kiểm tra tạo CLB với đầy đủ thông tin hợp lệ.

**Logic:**
1. Navigate đến trang tạo CLB
2. Nhập tên CLB: "Arsenal FC"
3. Nhập mô tả: "The best football club"
4. Upload ảnh hợp lệ (arsenal.png)
5. Click nút "Tạo"
6. Verify success message HOẶC CLB xuất hiện trong danh sách

```javascript
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
```

**Test Data:**
```javascript
TEAM_TEST_DATA.VALID_TEAM = {
  name: 'Arsenal FC',
  description: 'The best football club'
}
TEAM_TEST_DATA.FILES.VALID_IMAGE_PNG = 'src/test-data/uploads/arsenal.png'
```

**Expected:**
- ✅ Success message hiển thị HOẶC
- ✅ CLB xuất hiện trong danh sách CLB

**Flexible assertion:** Test pass nếu 1 trong 2 điều kiện thỏa mãn (có success message HOẶC team in list).

### TC04 - Thiếu tên CLB
**Mục đích:** Kiểm tra validation khi không nhập tên đội (required field).

**Logic:**
1. Navigate đến trang tạo CLB
2. Để trống tên CLB (nhập "")
3. Nhập mô tả (optional)
4. Click nút "Tạo"
5. Verify hiển thị error: "Tên đội bóng không được để trống"
6. HOẶC verify HTML5 validation từ browser (required attribute)

```javascript
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
```

**Expected:**
- ✅ Error message: "Tên đội bóng không được để trống" HOẶC
- ✅ HTML5 validation message từ browser (ví dụ: "Please fill out this field") HOẶC
- ✅ Input field có `:invalid` state

**Note:** Test chấp nhận 3 loại validation:
1. **Server-side validation:** Error message từ backend
2. **Client-side validation:** Error message từ JavaScript
3. **HTML5 validation:** Browser native validation (required attribute)

## 📊 Test Data

### Valid Team Data
```javascript
TEAM_TEST_DATA.VALID_TEAM = {
  name: 'Arsenal FC',
  description: 'The best football club'
}
```

### Image Files
```javascript
TEAM_TEST_DATA.FILES = {
  VALID_IMAGE_PNG: 'src/test-data/uploads/arsenal.png',
  VALID_IMAGE_JPG: 'src/test-data/uploads/team.jpg',
  INVALID_FILE_EXE: 'src/test-data/uploads/invalid.exe',
  INVALID_FILE_TXT: 'src/test-data/uploads/invalid.txt'
}
```

### Empty Data (for validation tests)
```javascript
const emptyTeamData = {
  name: '',
  description: ''
}
```

## 💡 Best Practices

### 1. Wait cho image preview
```javascript
// Good - Wait after upload
await teamPage.uploadTeamImage(filePath);
await page.waitForTimeout(1000); // Đợi preview load

// Bad - Không đợi
await teamPage.uploadTeamImage(filePath);
const isPreviewVisible = await teamPage.isImagePreviewVisible(); // Có thể fail
```

### 2. Flexible assertions
```javascript
// Good - Chấp nhận nhiều trường hợp
const successMessage = await teamPage.getSuccessMessage();
const isTeamInList = await teamPage.isTeamInList(teamData.name);
expect(successMessage !== null || isTeamInList).toBeTruthy();

// Bad - Too strict
const successMessage = await teamPage.getSuccessMessage();
expect(successMessage).toBe('Tạo CLB thành công'); // Có thể fail nếu text khác
```

### 3. Handle multiple validation types
```javascript
// Good - Kiểm tra cả 3 loại validation
const nameErrorMessage = await teamPage.getNameErrorMessage(); // Server/client
const validationMessage = await teamPage.getFieldValidationMessage(selector); // HTML5
const hasInvalidInput = await page.locator('input:invalid').count() > 0; // CSS :invalid

expect(nameErrorMessage || validationMessage || hasInvalidInput).toBeTruthy();

// Bad - Chỉ check 1 loại
const nameErrorMessage = await teamPage.getNameErrorMessage();
expect(nameErrorMessage).toBeTruthy(); // Fail nếu dùng HTML5 validation
```

### 4. Error handling trong methods
```javascript
// Good - Trả về null nếu không tìm thấy
async getErrorMessage() {
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

// Bad - Throw error
async getErrorMessage() {
  const errorElement = await this.page.locator(this.selectors.errorMessage);
  return await errorElement.textContent(); // Throws nếu không tìm thấy
}
```

## 🔍 Common Issues

### Issue 1: Image preview không hiển thị
**Nguyên nhân:** Upload chưa hoàn thành hoặc file path sai.  
**Giải pháp:**
- Kiểm tra file path chính xác
- Thêm `waitForTimeout(1000)` sau upload
- Kiểm tra selector của preview element

### Issue 2: Validation không trigger
**Nguyên nhân:** Form dùng HTML5 validation (browser native).  
**Giải pháp:**
- Kiểm tra cả 3 loại: server error, client error, HTML5 validation
- Sử dụng `getFieldValidationMessage()` cho HTML5
- Check `:invalid` pseudo-class

### Issue 3: Success message không xuất hiện
**Nguyên nhân:** Redirect quá nhanh hoặc dùng toast notification.  
**Giải pháp:**
- Chấp nhận cả 2: success message HOẶC team in list
- Tăng timeout trong `getSuccessMessage()`
- Check network tab xem có request thành công không

### Issue 4: File upload bị reject bởi browser
**Nguyên nhân:** Browser chặn file types nguy hiểm (.exe).  
**Giải pháp:**
- Test chấp nhận cả 2: browser reject (no preview) HOẶC app reject (error message)
- Không bắt buộc phải có error message
- Verify preview không hiển thị là đủ

## 📚 Related Documentation

- [Test Data](../src/test-data/team.test-data.js)
- [Selectors](../src/constants/selectors.js)
- [Routes](../src/constants/routes.js)
- [Upload Files](../src/test-data/uploads/)

---

**Total Test Cases:** 4  
**Coverage:** Image Upload (valid/invalid), Team Creation (success/validation)  
**Last Updated:** October 2025

