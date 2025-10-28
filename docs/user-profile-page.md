# User Profile Page - Documentation

## 📄 Tổng quan

**File:** `src/pages/user-profile.page.js`  
**Test File:** `src/e2e/user-profile.spec.js`  
**Test Coverage:** 4 test cases

User Profile Page là trang cho phép người dùng xem và chỉnh sửa thông tin cá nhân (username, email, phone) và upload avatar.

## 🏗️ Cấu trúc Page Object

### Constructor & Selectors

```javascript
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
}
```

## 🔑 Methods quan trọng

### Navigation Methods

#### `navigate()`
Điều hướng đến trang User Profile.

```javascript
async navigate() {
  info('Điều hướng đến trang Hồ sơ người dùng');
  await this.goto(`${ENV.BASE_URL}${ROUTES.PROFILE}`);
  await this.waitForPageLoaded();
}
```

**Route:** `/profile` (ROUTES.PROFILE)

#### `waitForPageLoaded()`
Đợi trang Profile load xong.

```javascript
async waitForPageLoaded() {
  info('Đợi trang Hồ sơ người dùng tải xong');
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForSelector(this.selectors.pageTitle, { timeout: 10000 });
}
```

### Tab Methods

#### `clickInfoTab()`
Click tab "Thông tin".

```javascript
async clickInfoTab() {
  info('Nhấn tab Thông tin');
  await this.page.click(this.selectors.tabInfo);
  await this.page.waitForTimeout(500);
}
```

#### `clickPostsTab()`
Click tab "Bài đăng".

```javascript
async clickPostsTab() {
  info('Nhấn tab Bài đăng');
  await this.page.click(this.selectors.tabPosts);
  await this.page.waitForTimeout(500);
}
```

#### `isInfoTabActive()`
Kiểm tra tab "Thông tin" có đang active không.

```javascript
async isInfoTabActive() {
  debug('Kiểm tra tab Thông tin đang active');
  const tab = await this.page.locator(this.selectors.tabInfo);
  const ariaSelected = await tab.getAttribute('aria-selected');
  return ariaSelected === 'true';
}
```

**Return:** `boolean` - true nếu tab active.

**Use case:** TC01 - Verify tab Info active mặc định.

### Get User Info Methods

#### `getUserInfo()`
Lấy toàn bộ thông tin user (username, email, phone).

```javascript
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
```

**Return:** `Object` - `{ username: string, email: string, phone: string }`

**Use case:** TC01 - Lấy thông tin user để verify hiển thị đúng.

#### `getUsernameValue()`
Lấy giá trị username từ input.

```javascript
async getUsernameValue() {
  debug('Lấy giá trị username');
  const input = await this.page.locator(this.selectors.usernameInput).first();
  return await input.inputValue();
}
```

#### `getEmailValue()`
Lấy giá trị email từ input.

```javascript
async getEmailValue() {
  debug('Lấy giá trị email');
  const input = await this.page.locator(this.selectors.emailInput).first();
  return await input.inputValue();
}
```

#### `getPhoneValue()`
Lấy giá trị phone từ input.

```javascript
async getPhoneValue() {
  debug('Lấy giá trị phone');
  const input = await this.page.locator(this.selectors.phoneInput).first();
  return await input.inputValue();
}
```

#### `isAvatarVisible()`
Kiểm tra avatar có hiển thị không.

```javascript
async isAvatarVisible() {
  debug('Kiểm tra avatar hiển thị');
  return await this.page.isVisible(this.selectors.avatar);
}
```

### Edit Mode Methods

#### `clickEditButton()`
Click nút "Chỉnh sửa" để vào chế độ edit.

```javascript
async clickEditButton() {
  info('Nhấn nút Chỉnh sửa');
  await this.page.click(this.selectors.editButton);
  await this.page.waitForTimeout(500);
}
```

**Use case:** TC02, TC03, TC04 - Bật chế độ edit trước khi sửa thông tin.

#### `clickSaveButton()`
Click nút "Lưu" để save thay đổi.

```javascript
async clickSaveButton() {
  info('Nhấn nút Lưu');
  await this.page.click(this.selectors.saveButton);
  await this.page.waitForTimeout(1000);
}
```

#### `clickCancelButton()`
Click nút "Hủy" để hủy thay đổi.

```javascript
async clickCancelButton() {
  info('Nhấn nút Hủy');
  await this.page.click(this.selectors.cancelButton);
  await this.page.waitForTimeout(500);
}
```

#### `isEditButtonVisible()`
Kiểm tra nút "Chỉnh sửa" có hiển thị không.

```javascript
async isEditButtonVisible() {
  debug('Kiểm tra nút Chỉnh sửa hiển thị');
  return await this.page.isVisible(this.selectors.editButton);
}
```

#### `isSaveButtonVisible()`
Kiểm tra nút "Lưu" có hiển thị không.

```javascript
async isSaveButtonVisible() {
  debug('Kiểm tra nút Lưu hiển thị');
  try {
    return await this.page.isVisible(this.selectors.saveButton);
  } catch {
    return false;
  }
}
```

#### `isFieldEnabled(fieldSelector)`
Kiểm tra field có enabled (có thể chỉnh sửa) không.

```javascript
async isFieldEnabled(fieldSelector) {
  debug(`Kiểm tra trường được kích hoạt: ${fieldSelector}`);
  const field = await this.page.locator(fieldSelector).first();
  const isDisabled = await field.getAttribute('disabled');
  return isDisabled === null;
}
```

**Return:** `boolean` - true nếu field enabled (không có attribute `disabled`).

#### `isUsernameFieldEnabled()`
Kiểm tra username field có enabled không.

```javascript
async isUsernameFieldEnabled() {
  return await this.isFieldEnabled(this.selectors.usernameInput);
}
```

**Use case:** TC02 - Verify field enabled sau khi click Edit.

#### `isEmailFieldEnabled()`
Kiểm tra email field có enabled không.

#### `isPhoneFieldEnabled()`
Kiểm tra phone field có enabled không.

### Update User Info Methods

#### `updateUsername(newUsername)`
Cập nhật username mới.

```javascript
async updateUsername(newUsername) {
  info(`Cập nhật username thành: ${newUsername}`);
  const input = await this.page.locator(this.selectors.usernameInput).first();
  await input.clear();
  await input.fill(newUsername);
  await this.page.waitForTimeout(300);
}
```

**Use case:** TC02 - Update username.

#### `updateEmail(newEmail)`
Cập nhật email mới.

```javascript
async updateEmail(newEmail) {
  info(`Cập nhật email thành: ${newEmail}`);
  const input = await this.page.locator(this.selectors.emailInput).first();
  await input.clear();
  await input.fill(newEmail);
  await this.page.waitForTimeout(300);
}
```

**Use case:** TC03 - Update email (validation test).

#### `updatePhone(newPhone)`
Cập nhật phone mới.

```javascript
async updatePhone(newPhone) {
  info(`Cập nhật phone thành: ${newPhone}`);
  const input = await this.page.locator(this.selectors.phoneInput).first();
  await input.clear();
  await input.fill(newPhone);
  await this.page.waitForTimeout(300);
}
```

#### `updateUserInfo(userData)`
Method tổng hợp: cập nhật nhiều trường cùng lúc.

```javascript
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
```

**Parameters:**
- `userData` - Object chứa các trường cần update
  - `username` (optional)
  - `email` (optional)
  - `phone` (optional)

### Avatar Upload Methods

#### `uploadAvatar(filePath)`
Upload avatar mới.

```javascript
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
```

**Parameters:**
- `filePath` - Absolute path đến file ảnh

**Use case:** TC04 - Upload avatar hợp lệ.

**Important:** Phải dùng `path.resolve()` để tạo absolute path:
```javascript
const testImagePath = path.resolve('src/test-data/uploads/avatar.png');
await userProfilePage.uploadAvatar(testImagePath);
```

#### `isAvatarUploadInputEnabled()`
Kiểm tra input upload avatar có enabled không.

```javascript
async isAvatarUploadInputEnabled() {
  debug('Kiểm tra input upload avatar được kích hoạt');
  const input = await this.page.locator(this.selectors.avatarUploadInput);
  const isDisabled = await input.getAttribute('disabled');
  return isDisabled === null;
}
```

**Use case:** TC04 - Verify upload input enabled sau khi click Edit.

### Error & Success Message Methods

#### `getErrorMessage()`
Lấy error message chung.

```javascript
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
```

**Return:** `string | null`

**Use case:** TC03, TC04 - Kiểm tra có lỗi hay không.

#### `getEmailErrorMessage()`
Lấy error message cụ thể cho field email.

```javascript
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
```

**Use case:** TC03 - Validation email không hợp lệ.

#### `waitForErrorMessage(timeout)`
Đợi error message xuất hiện.

```javascript
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
```

**Return:** `boolean` - true nếu error message xuất hiện trong timeout.

#### `getSuccessMessage()`
Lấy success message sau khi save.

```javascript
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
```

### Combined Action Methods

#### `editAndSaveUserInfo(userData)`
Method tổng hợp: Edit → Update → Save.

```javascript
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
```

**Use case:** Shortcut cho flow edit-save.

#### `editUserInfoWithoutSaving(userData)`
Method tổng hợp: Edit → Update (không save).

```javascript
async editUserInfoWithoutSaving(userData) {
  info('Chỉnh sửa thông tin người dùng không lưu');
  
  // Nhấn nút chỉnh sửa
  await this.clickEditButton();
  
  // Cập nhật các trường
  await this.updateUserInfo(userData);
}
```

**Use case:** Test cancel hoặc validation mà không save.

## 🧪 Test Cases (4 TCs)

### TC01 - Hiển thị thông tin user đúng
**Mục đích:** Kiểm tra trang profile hiển thị đúng thông tin user.

**Logic:**
1. Navigate đến trang Profile
2. Verify page title hiển thị
3. Verify tab "Thông tin" active mặc định
4. Lấy thông tin user (username, email, phone)
5. Verify username không rỗng, length > 0
6. Verify email có chứa "@"
7. Verify phone có giá trị (nếu có)

```javascript
test('TC01: Hiển thị thông tin user đúng', async () => {
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
```

**Expectations:**
- ✅ Page title visible
- ✅ Tab "Thông tin" active
- ✅ Username: không rỗng, length > 0
- ✅ Email: không rỗng, chứa "@"
- ✅ Phone: nếu có thì length > 0

### TC02 - Cập nhật username thành công
**Mục đích:** Kiểm tra update username thành công.

**Logic:**
1. Lấy username ban đầu
2. Click nút "Chỉnh sửa"
3. Verify username field enabled
4. Nhập username mới: "UpdatedUser123"
5. Click nút "Lưu"
6. Đợi 2 giây
7. Lấy lại thông tin user
8. Verify username đã được cập nhật thành giá trị mới

```javascript
test('TC02: Cập nhật username thành công', async () => {
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
```

**Test Data:**
```javascript
USER_PROFILE_TEST_DATA.VALID_UPDATE = {
  username: 'UpdatedUser123'
}
```

**Expectations:**
- ✅ Field enabled sau khi click Edit
- ✅ Username được cập nhật thành công
- ✅ Lấy lại username mới khớp với giá trị đã nhập

### TC03 - Hiển thị lỗi khi email không hợp lệ
**Mục đích:** Kiểm tra validation email format.

**Logic:**
1. Click nút "Chỉnh sửa"
2. Nhập email không hợp lệ (thiếu @): "invalidemail.com"
3. Click nút "Lưu"
4. Đợi validation (1 giây)
5. Verify error message xuất hiện trong 3 giây
6. Lấy error message
7. Verify message chứa từ "email"

```javascript
test('TC03: Hiển thị lỗi khi email không hợp lệ', async () => {
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
```

**Test Data:**
```javascript
USER_PROFILE_TEST_DATA.INVALID_EMAIL = {
  missingAt: 'invalidemail.com',  // Thiếu @
  missingDomain: 'test@',           // Thiếu domain
  invalidFormat: 'test@com'         // Format sai
}
```

**Expectations:**
- ✅ Error message xuất hiện trong 3 giây
- ✅ Error message chứa từ "email"

### TC04 - Upload avatar hợp lệ thành công
**Mục đích:** Kiểm tra upload avatar (PNG/JPG) thành công.

**Logic:**
1. Tạo absolute path đến file ảnh test
2. Click nút "Chỉnh sửa" để enable upload
3. Verify avatar upload input enabled
4. Upload avatar
5. Đợi 2 giây xử lý upload
6. Click nút "Lưu"
7. Đợi 2 giây lưu
8. Verify KHÔNG có error message

```javascript
test('TC04: Upload avatar hợp lệ thành công', async () => {
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
```

**Test Data:**
```javascript
import path from 'path';

USER_PROFILE_TEST_DATA.AVATAR_FILES = {
  validPath: 'src/test-data/uploads/avatar.png'
}

// Trong test, phải dùng path.resolve()
const testImagePath = path.resolve(USER_PROFILE_TEST_DATA.AVATAR_FILES.validPath);
```

**Important:** Bắt buộc dùng `path.resolve()` để tạo absolute path.

**Expectations:**
- ✅ Upload input enabled sau khi click Edit
- ✅ Avatar upload thành công (không có lỗi)

## 📊 Test Data

### Valid Update Data
```javascript
USER_PROFILE_TEST_DATA.VALID_UPDATE = {
  username: 'UpdatedUser123',
  email: 'updated@example.com',
  phone: '0987654321'
}
```

### Invalid Email Data
```javascript
USER_PROFILE_TEST_DATA.INVALID_EMAIL = {
  missingAt: 'invalidemail.com',
  missingDomain: 'test@',
  invalidFormat: 'test@com'
}
```

### Avatar Files
```javascript
import path from 'path';

USER_PROFILE_TEST_DATA.AVATAR_FILES = {
  validPath: 'src/test-data/uploads/avatar.png'
}

// Usage in test
const testImagePath = path.resolve(USER_PROFILE_TEST_DATA.AVATAR_FILES.validPath);
```

## 💡 Best Practices

### 1. Use path.resolve() for file uploads
```javascript
// Good
import path from 'path';
const testImagePath = path.resolve('src/test-data/uploads/avatar.png');
await userProfilePage.uploadAvatar(testImagePath);

// Bad
await userProfilePage.uploadAvatar('src/test-data/uploads/avatar.png'); // Có thể fail
```

### 2. Wait for error/success messages properly
```javascript
// Good - Đợi message xuất hiện với timeout
const errorAppeared = await userProfilePage.waitForErrorMessage(3000);
expect(errorAppeared).toBeTruthy();

const errorMessage = await userProfilePage.getErrorMessage();
expect(errorMessage).toContain('email');

// Bad - Không đợi, có thể miss message
const errorMessage = await userProfilePage.getErrorMessage();
expect(errorMessage).toBeTruthy(); // Có thể fail nếu message chưa xuất hiện
```

### 3. Verify field enabled before editing
```javascript
// Good
await userProfilePage.clickEditButton();
const isEnabled = await userProfilePage.isUsernameFieldEnabled();
expect(isEnabled).toBeTruthy();
await userProfilePage.updateUsername(newUsername);

// Less safe
await userProfilePage.clickEditButton();
await userProfilePage.updateUsername(newUsername); // Có thể fail nếu field disabled
```

### 4. Clear before fill
```javascript
// Good - Clear old value first
async updateUsername(newUsername) {
  const input = await this.page.locator(this.selectors.usernameInput).first();
  await input.clear();
  await input.fill(newUsername);
}

// Bad - Fill without clear (có thể append)
await input.fill(newUsername);
```

## 🔍 Common Issues

### Issue 1: Avatar upload fail
**Nguyên nhân:** Sử dụng relative path thay vì absolute path.  
**Giải pháp:**
```javascript
import path from 'path';
const absolutePath = path.resolve('src/test-data/uploads/avatar.png');
await userProfilePage.uploadAvatar(absolutePath);
```

### Issue 2: Error message không xuất hiện
**Nguyên nhân:** Validation xử lý async, cần đợi.  
**Giải pháp:**
```javascript
await userProfilePage.clickSaveButton();
await page.waitForTimeout(1000); // Đợi validation
const errorAppeared = await userProfilePage.waitForErrorMessage(3000);
```

### Issue 3: Field không enabled sau click Edit
**Nguyên nhân:** Chưa đợi đủ thời gian sau click.  
**Giải pháp:**
```javascript
await userProfilePage.clickEditButton();
await page.waitForTimeout(500); // Đợi UI update
const isEnabled = await userProfilePage.isUsernameFieldEnabled();
```

### Issue 4: Username không update
**Nguyên nhân:** Không clear old value trước khi fill.  
**Giải pháp:**
```javascript
await input.clear();
await input.fill(newUsername);
```

## 📚 Related Documentation

- [Test Data](../src/test-data/user-profile.test-data.js)
- [Selectors](../src/constants/selectors.js)
- [Routes](../src/constants/routes.js)
- [Upload Files](../src/test-data/uploads/)

---

**Total Test Cases:** 4  
**Coverage:** Display User Info, Update Username, Email Validation, Avatar Upload  
**Last Updated:** October 2025

