# Login Page - Documentation

## 📄 Tổng quan

**File:** `src/pages/login.page.js`  
**Test File:** `src/e2e/login.spec.js`  
**Test Coverage:** 38 test cases

Login Page là trang quan trọng nhất của hệ thống, đảm bảo xác thực người dùng trước khi truy cập vào các tính năng chính.

## 🏗️ Cấu trúc Page Object

### Constructor & Selectors

```javascript
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.selectors = {
      // Input fields
      emailInput: SELECTORS.LOGIN.EMAIL_INPUT,
      passwordInput: SELECTORS.LOGIN.PASSWORD_INPUT,
      
      // Buttons
      submitButton: SELECTORS.LOGIN.SUBMIT_BUTTON,
      googleLoginButton: SELECTORS.LOGIN.GOOGLE_LOGIN_BUTTON,
      facebookLoginButton: SELECTORS.LOGIN.FACEBOOK_LOGIN_BUTTON,
      
      // Links
      forgotPasswordLink: SELECTORS.LOGIN.FORGOT_PASSWORD_LINK,
      registerLink: SELECTORS.LOGIN.REGISTER_LINK,
      
      // Messages
      errorMessage: SELECTORS.LOGIN.ERROR_MESSAGE,
      successMessage: SELECTORS.LOGIN.SUCCESS_MESSAGE,
      emailErrorMessage: SELECTORS.LOGIN.EMAIL_ERROR_MESSAGE,
      passwordErrorMessage: SELECTORS.LOGIN.PASSWORD_ERROR_MESSAGE,
      
      // UI Elements
      rememberMeCheckbox: SELECTORS.LOGIN.REMEMBER_ME_CHECKBOX,
      pageTitle: SELECTORS.LOGIN.PAGE_TITLE,
      logo: SELECTORS.LOGIN.LOGO,
      loadingSpinner: SELECTORS.LOGIN.LOADING_SPINNER,
      
      // Features (3 tính năng giới thiệu)
      featureTitle1: SELECTORS.LOGIN.FEATURE_TITLE_1,
      featureDescription1: SELECTORS.LOGIN.FEATURE_DESCRIPTION_1,
      featureTitle2: SELECTORS.LOGIN.FEATURE_TITLE_2,
      featureDescription2: SELECTORS.LOGIN.FEATURE_DESCRIPTION_2,
      featureTitle3: SELECTORS.LOGIN.FEATURE_TITLE_3,
      featureDescription3: SELECTORS.LOGIN.FEATURE_DESCRIPTION_3,
    };
  }
}
```

## 🔑 Methods quan trọng

### Navigation Methods

#### `navigate()`
Điều hướng đến trang login và đợi page load xong.

```javascript
async navigate() {
  info('Navigating to Login page');
  await this.goto(`${ENV.BASE_URL}${ROUTES.LOGIN}`);
  await this.waitForPageLoaded();
}
```

**Use case:** Sử dụng trong `beforeEach` để navigate đến trang login trước mỗi test.

#### `navigateWithRedirect()`
Điều hướng đến trang login với xử lý redirect (nếu đã đăng nhập sẽ redirect về dashboard).

```javascript
async navigateWithRedirect() {
  info('Navigating to Login page (with redirect handling)');
  await this.goto(`${ENV.BASE_URL}${ROUTES.LOGIN}`);
  await this.waitForRedirectOnly();
}
```

**Use case:** Sử dụng trong TC23 để kiểm tra đã đăng nhập hay chưa.

### Form Interaction Methods

#### `enterEmail(email)`
Nhập email vào ô input.

```javascript
async enterEmail(email) {
  info(`Entering email: ${email}`);
  await this.fill(this.selectors.emailInput, email);
}
```

#### `enterPassword(password)`
Nhập password vào ô input.

```javascript
async enterPassword(password) {
  info('Entering password');
  await this.fill(this.selectors.passwordInput, password);
}
```

#### `clickSubmit()`
Click nút submit để đăng nhập.

```javascript
async clickSubmit() {
  info('Clicking submit button');
  await this.click(this.selectors.submitButton);
}
```

#### `login(email, password)`
Method tổng hợp: nhập email, password và submit.

```javascript
async login(email, password) {
  info(`Performing login with email: ${email}`);
  await this.enterEmail(email);
  await this.enterPassword(password);
  await this.clickSubmit();
}
```

**Use case:** Sử dụng trong các test cần login nhanh.

### Verification Methods

#### `getErrorMessage()`
Lấy error message từ toast/alert.

```javascript
async getErrorMessage() {
  try {
    const isErrorVisible = await this.isVisible(this.selectors.errorMessage);
    if (isErrorVisible) {
      const message = await this.getText(this.selectors.errorMessage);
      return message;
    }
    return null;
  } catch {
    return null;
  }
}
```

**Return:** `string | null` - Error message hoặc null nếu không có lỗi.

#### `getEmailErrorMessage()`
Lấy validation error của field email.

```javascript
async getEmailErrorMessage() {
  try {
    const isErrorVisible = await this.isVisible(this.selectors.emailErrorMessage);
    if (isErrorVisible) {
      const message = await this.getText(this.selectors.emailErrorMessage);
      return message;
    }
    return null;
  } catch {
    return null;
  }
}
```

### Token & Security Methods

#### `getAuthToken()`
Lấy access token từ localStorage.

```javascript
async getAuthToken() {
  return await this.page.evaluate(() => {
    return localStorage.getItem('accessToken');
  });
}
```

**Use case:** TC20 - Kiểm tra token được lưu sau khi đăng nhập thành công.

#### `isPasswordMasked()`
Kiểm tra password có bị che (type="password") không.

```javascript
async isPasswordMasked() {
  const type = await this.page.locator(this.selectors.passwordInput).getAttribute('type');
  return type === 'password';
}
```

**Use case:** TC32 - Security test kiểm tra password bị ẩn.

#### `getPasswordFromLocalStorage()`
Kiểm tra password KHÔNG được lưu trong localStorage.

```javascript
async getPasswordFromLocalStorage() {
  return await this.page.evaluate(() => {
    return localStorage.getItem('password');
  });
}
```

**Use case:** TC33 - Security test đảm bảo password không lưu trong localStorage.

## 🧪 Test Cases (38 TCs)

### Group 1: UI Display Tests (9 TCs - TC01 to TC09)

#### TC01 - Hiển thị đúng tiêu đề trang
**Mục đích:** Kiểm tra trang login hiển thị tiêu đề đúng.

**Logic:**
1. Navigate đến trang login
2. Lấy text của page title
3. Verify title không rỗng

```javascript
test('TC01 - Hiển thị đúng tiêu đề trang', async () => {
  const titleText = await loginPage.getPageTitleText();
  expect(titleText).toBeTruthy();
});
```

#### TC02 - Hiển thị logo hoặc icon app
**Mục đích:** Kiểm tra logo "Matching Queue" hiển thị.

**Logic:**
1. Kiểm tra logo có visible không
2. Verify logo hiển thị

```javascript
test('TC02 - Hiển thị logo hoặc icon app', async () => {
  const isLogoVisible = await loginPage.isLogoVisible();
  expect(isLogoVisible).toBe(true);
});
```

#### TC03 - Hiển thị 3 tính năng giới thiệu bên trái
**Mục đích:** Kiểm tra 3 features được hiển thị đúng text.

**Features:**
1. "Tìm sân nhanh chóng" - "Tìm sân bóng quanh bạn nhanh chóng"
2. "Tìm đối thủ phù hợp" - "Tìm ra ngay kèo hay đối phù hợp trình độ uy tín"
3. "Tìm câu lạc bộ để tham gia" - "Hàng trăm clb uy tín chờ bạn vào chơi"

**Logic:**
1. Lấy title và description của từng feature
2. Verify text khớp chính xác

```javascript
test('TC03 - Hiển thị 3 tính năng giới thiệu bên trái', async () => {
  expect(await loginPage.getFeatureTitle1()).toBe('Tìm sân nhanh chóng');
  expect(await loginPage.getFeatureDescription1()).toBe('Tìm sân bóng quanh bạn nhanh chóng');
  // ... tương tự cho feature 2 và 3
});
```

#### TC04 - Có ô nhập Email và Mật khẩu
**Mục đích:** Kiểm tra 2 input fields hiển thị.

**Logic:**
1. Verify email input visible
2. Verify password input visible

#### TC05 - Có checkbox Remember me và link Forgot password
**Mục đích:** Kiểm tra UI elements phụ.

**Logic:**
1. Verify Remember me checkbox visible
2. Verify Forgot password link visible

#### TC06 - Có nút Đăng nhập với Google
**Mục đích:** Kiểm tra Google OAuth button.

**Logic:**
1. Verify Google login button visible

#### TC07 - Có nút Đăng nhập màu cam
**Mục đích:** Kiểm tra submit button và hover effect.

**Logic:**
1. Verify submit button visible
2. Hover vào button
3. Đợi 500ms để xem hiệu ứng

#### TC08 - Có link Đăng ký ở đây
**Mục đích:** Kiểm tra link dẫn đến trang register.

**Logic:**
1. Verify register link visible

#### TC09 - Kiểm tra bố cục responsive
**Mục đích:** Kiểm tra UI responsive trên nhiều kích thước màn hình.

**Logic:**
1. Set viewport Mobile (375x667)
2. Verify page elements
3. Set viewport Tablet (768x1024)
4. Verify page elements
5. Set viewport Desktop (1920x1080)
6. Verify page elements

### Group 2: Validation Tests (4 TCs - TC10 to TC13)

#### TC10 - Bỏ trống cả hai ô
**Mục đích:** Kiểm tra validation khi để trống cả email và password.

**Logic:**
1. Để trống email (nhập "")
2. Để trống password (nhập "")
3. Click Đăng nhập
4. Verify hiển thị lỗi email: "Email không được để trống"
5. Verify hiển thị lỗi password: "Mật khẩu không được để trống"

```javascript
test('TC10 - Bỏ trống cả hai ô', async ({ page }) => {
  await loginPage.enterEmail('');
  await loginPage.enterPassword('');
  await loginPage.clickSubmit();
  await page.waitForTimeout(1000);
  
  const emailError = await loginPage.getEmailErrorMessage();
  expect(emailError).toBe('Email không được để trống');
  
  const passwordError = await loginPage.getPasswordErrorMessage();
  expect(passwordError).toBe('Mật khẩu không được để trống');
});
```

#### TC11 - Email sai định dạng
**Mục đích:** Kiểm tra validation email không đúng format.

**Logic:**
1. Nhập email sai định dạng (ví dụ: "invalid-email")
2. Nhập password hợp lệ
3. Click Đăng nhập
4. Verify hiển thị lỗi: "Email không đúng định dạng"

**Test Data:** `TEST_USERS.INVALID_EMAIL_FORMAT.email`

#### TC12 - Mật khẩu ngắn
**Mục đích:** Kiểm tra validation password quá ngắn (< 6 ký tự).

**Logic:**
1. Nhập email hợp lệ
2. Nhập password ngắn (ví dụ: "123")
3. Click Đăng nhập
4. Verify hiển thị lỗi: "Mật khẩu phải có ít nhất 6 ký tự"

**Test Data:** `TEST_USERS.SHORT_PASSWORD.password`

#### TC13 - Nhập hợp lệ
**Mục đích:** Kiểm tra KHÔNG hiển thị lỗi validation khi nhập đúng.

**Logic:**
1. Nhập email hợp lệ
2. Nhập password hợp lệ (≥ 6 ký tự)
3. Click Đăng nhập
4. Verify KHÔNG hiển thị lỗi email
5. Verify KHÔNG hiển thị lỗi password

```javascript
test('TC13 - Nhập hợp lệ', async ({ page }) => {
  await loginPage.enterEmail(TEST_USERS.VALID_USER_1.email);
  await loginPage.enterPassword(TEST_USERS.VALID_USER_1.password);
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000);
  
  const emailError = await loginPage.getEmailErrorMessage();
  expect(emailError).toBeNull();
  
  const passwordError = await loginPage.getPasswordErrorMessage();
  expect(passwordError).toBeNull();
});
```

### Group 3: Authentication Tests (3 TCs - TC14 to TC16)

#### TC14 - Đăng nhập thành công
**Mục đích:** Kiểm tra flow đăng nhập thành công.

**Logic:**
1. Nhập email từ ENV (TEST_EMAIL)
2. Nhập password từ ENV (TEST_PASSWORD)
3. Click Đăng nhập
4. Đợi 3 giây
5. Verify URL chuyển đến `/` (dashboard)

**Important:** Email và password phải là credentials THẬT trong hệ thống.

```javascript
test('TC14 - Đăng nhập thành công', async ({ page }) => {
  await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
  await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
  await loginPage.clickSubmit();
  await page.waitForTimeout(3000);
  
  const currentUrl = loginPage.getCurrentUrl();
  expect(currentUrl).toContain(ROUTES.DASHBOARD);
});
```

#### TC15 - Sai mật khẩu
**Mục đích:** Kiểm tra hiển thị lỗi khi sai password.

**Logic:**
1. Nhập email đúng
2. Nhập password sai
3. Click Đăng nhập
4. Verify hiển thị lỗi: "Email or password is incorrect"
5. Verify vẫn ở trang login

#### TC16 - Email không tồn tại
**Mục đích:** Kiểm tra hiển thị lỗi khi email không tồn tại trong hệ thống.

**Logic:**
1. Nhập email không tồn tại
2. Nhập password hợp lệ
3. Click Đăng nhập
4. Verify hiển thị lỗi: "Email or password is incorrect"
5. Verify vẫn ở trang login

### Group 4: Token Tests (3 TCs - TC17 to TC19)

#### TC17 - Login thành công - Token lưu trong LocalStorage
**Mục đích:** Kiểm tra token được lưu vào localStorage sau khi login.

**Logic:**
1. Đăng nhập thành công
2. Lấy token từ localStorage với key `accessToken`
3. Verify token không null

```javascript
test('TC17 - Login thành công - Token lưu trong LocalStorage', async ({ page }) => {
  await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
  await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
  await loginPage.clickSubmit();
  await page.waitForTimeout(3000);
  
  const token = await loginPage.getAuthToken();
  expect(token).not.toBeNull();
});
```

#### TC18 - Reload lại trang
**Mục đích:** Kiểm tra vẫn đăng nhập sau khi F5.

**Logic:**
1. Đăng nhập thành công (có check Remember me)
2. F5 (reload) trang
3. Verify vẫn ở trang dashboard (không bị logout)

#### TC19 - Mở lại trình duyệt
**Mục đích:** Kiểm tra session persist qua tabs/windows mới.

**Logic:**
1. Đăng nhập thành công
2. Kiểm tra token được lưu
3. Mở tab mới (newPage)
4. Navigate đến login page trong tab mới
5. Verify tự động redirect về dashboard (do đã có token)
6. Verify token vẫn tồn tại trong tab mới

```javascript
test('TC19 - Mở lại trình duyệt', async ({ context, page }) => {
  // Login in first page
  await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
  await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
  await loginPage.clickSubmit();
  await page.waitForTimeout(3000);
  
  // Open new page/tab
  const newPage = await context.newPage();
  const newLoginPage = new LoginPage(newPage);
  await newLoginPage.navigateWithRedirect();
  await newPage.waitForTimeout(2000);
  
  // Should be redirected to dashboard
  const currentUrl = newLoginPage.getCurrentUrl();
  expect(currentUrl).not.toContain('/login');
  expect(currentUrl).toContain(ROUTES.DASHBOARD);
  
  // Token should exist
  const newToken = await newLoginPage.getAuthToken();
  expect(newToken).not.toBeNull();
});
```

### Group 5: Navigation Tests (3 TCs - TC20 to TC22)

#### TC20 - Forgot password
**Mục đích:** Kiểm tra click link Forgot password chuyển đến đúng trang.

**Logic:**
1. Click link "Forgot password"
2. Verify URL chuyển đến `/forgot-password`

#### TC21 - Đăng nhập với Google
**Mục đích:** Kiểm tra Google OAuth flow.

**Logic:**
1. Click nút "Đăng nhập với Google"
2. Chờ redirect đến Google OAuth
3. Verify URL chứa `accounts.google.com`
4. Verify URL có các params OAuth: `client_id`, `response_type`, `redirect_uri`

```javascript
test('TC21 - Đăng nhập với Google', async ({ page }) => {
  const navigationPromise = page.waitForURL(url => {
    return url.toString().includes('accounts.google.com');
  }, { timeout: 10000 });
  
  await loginPage.loginWithGoogle();
  await navigationPromise;
  
  const currentUrl = page.url();
  expect(currentUrl).toContain('accounts.google.com');
  expect(currentUrl).toMatch(/client_id|response_type|redirect_uri/);
});
```

#### TC22 - Đi đến trang đăng ký
**Mục đích:** Kiểm tra link "Đăng ký" chuyển đến trang register.

**Logic:**
1. Click link "Đăng ký ở đây"
2. Verify URL chuyển đến `/register`

### Group 6: Forgot Password Tests (5 TCs - TC23 to TC27)

#### TC23 - Đi đến trang quên mật khẩu
**Mục đích:** Verify điều hướng đến forgot password page.

#### TC24 - Email hợp lệ
**Mục đích:** Kiểm tra gửi email reset password thành công.

**Logic:**
1. Navigate đến forgot password page
2. Nhập email hợp lệ
3. Click gửi
4. Verify hiển thị success: "Reset password link sent successfully"

#### TC25 - Email không tồn tại
**Mục đích:** Kiểm tra lỗi khi email không tồn tại.

**Logic:**
1. Nhập email không tồn tại
2. Click gửi
3. Verify hiển thị lỗi: "Email không tồn tại"

#### TC26 - Email sai định dạng
**Mục đích:** Kiểm tra validation email format.

**Logic:**
1. Nhập email sai định dạng
2. Click gửi
3. Verify hiển thị lỗi: "Email không đúng định dạng"

#### TC27 - Gửi lại nhiều lần
**Mục đích:** Kiểm tra rate limiting để tránh spam.

**Logic:**
1. Gửi email reset password
2. Gửi lại ngay lập tức
3. Verify hiển thị lỗi: "You have requested too many password reset emails. Please wait 1 minute before trying again."

### Group 7: Security Tests (7 TCs - TC28 to TC34)

#### TC28 - Mật khẩu bị che
**Mục đích:** Kiểm tra password field có type="password".

**Logic:**
1. Nhập password
2. Verify input type là "password" (hiển thị ●●●●●●)

```javascript
test('TC28 - Mật khẩu bị che', async ({ page }) => {
  await loginPage.enterPassword(TEST_USERS.VALID_USER_1.password);
  
  const isMasked = await loginPage.isPasswordMasked();
  expect(isMasked).toBeTruthy();
});
```

#### TC29 - Không lưu password trong LocalStorage
**Mục đích:** Security check - password KHÔNG được lưu trong localStorage.

**Logic:**
1. Đăng nhập
2. Kiểm tra localStorage không có key "password"
3. Verify `getPasswordFromLocalStorage()` return null

#### TC30 - Không có password trong HTML
**Mục đích:** Kiểm tra password không xuất hiện trong page source.

**Logic:**
1. Nhập password
2. Lấy toàn bộ HTML content
3. Verify HTML không chứa password text

#### TC31 - Ngăn login nhiều lần sai
**Mục đích:** Kiểm tra rate limiting - khóa tạm thời sau nhiều lần đăng nhập sai.

**Logic:**
1. Đăng nhập sai 5 lần liên tục
2. Verify hiển thị: "Your account has been temporarily locked due to too many failed login attempts. Please try again later."

**Note:** Cần hệ thống implement rate limiting.

#### TC32 - Token hết hạn
**Mục đích:** Kiểm tra redirect về login khi token hết hạn.

**Logic:**
1. Đăng nhập thành công
2. Set token thành giá trị invalid: `invalid_expired_token_12345`
3. Reload trang
4. Verify redirect về trang login
5. Verify token bị xóa

#### TC33 - Ngăn SQL Injection
**Mục đích:** Kiểm tra hệ thống chống SQL injection.

**Logic:**
1. Nhập password là SQL injection payload: `' OR '1'='1`
2. Click đăng nhập
3. Verify KHÔNG thể đăng nhập
4. Verify vẫn ở trang login
5. Verify hiển thị error message

**Test Data:** `TEST_USERS.SQL_INJECTION.password`

```javascript
test('TC33 - Ngăn SQL Injection', async ({ page }) => {
  await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
  await loginPage.enterPassword(TEST_USERS.SQL_INJECTION.password);
  await loginPage.clickSubmit();
  await page.waitForTimeout(3000);
  
  const currentUrl = loginPage.getCurrentUrl();
  expect(currentUrl).toContain(ROUTES.LOGIN);
  
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toBeTruthy();
});
```

#### TC34 - Ngăn XSS
**Mục đích:** Kiểm tra hệ thống chống XSS (Cross-Site Scripting).

**Logic:**
1. Nhập password là XSS payload: `<img src=x onerror=alert('XSS')>`
2. Click đăng nhập
3. Verify KHÔNG có alert popup
4. Verify input được sanitize (không chứa `<img`)

**Test Data:** `TEST_USERS.XSS_ATTACK.password`

### Group 8: Accessibility Tests (4 TCs - TC35 to TC38)

#### TC35 - Tab chuyển input
**Mục đích:** Kiểm tra keyboard navigation với Tab key.

**Logic:**
1. Nhấn Tab nhiều lần
2. Verify focus chuyển qua email → password → button

#### TC36 - Enter để đăng nhập
**Mục đích:** Kiểm tra có thể submit form bằng Enter key.

**Logic:**
1. Nhập email và password
2. Nhấn Enter (không click button)
3. Verify đăng nhập thành công

```javascript
test('TC36 - Enter để đăng nhập', async ({ page }) => {
  await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
  await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  
  const currentUrl = loginPage.getCurrentUrl();
  expect(currentUrl).toContain(ROUTES.DASHBOARD);
});
```

#### TC37 - Hiển thị lỗi rõ ràng
**Mục đích:** Kiểm tra error messages dễ đọc và nổi bật.

**Logic:**
1. Nhập sai thông tin
2. Click đăng nhập
3. Verify error message xuất hiện
4. Verify message có nội dung (length > 0)

#### TC38 - Loading khi xử lý
**Mục đích:** Kiểm tra hiển thị loading spinner khi đang xử lý login.

**Logic:**
1. Nhập thông tin đăng nhập
2. Click submit
3. Verify loading spinner hiển thị trong quá trình xử lý

## 📊 Test Data

### Valid User
```javascript
TEST_USERS.VALID_USER_1 = {
  email: 'test@example.com',
  password: 'Test@123456'
}
```

### Invalid Data
```javascript
TEST_USERS.EMPTY_EMAIL = { email: '' }
TEST_USERS.EMPTY_PASSWORD = { password: '' }
TEST_USERS.INVALID_EMAIL_FORMAT = { email: 'invalid-email' }
TEST_USERS.INVALID_EMAIL = { email: 'notexist@example.com' }
TEST_USERS.SHORT_PASSWORD = { password: '123' }
TEST_USERS.INVALID_PASSWORD = { password: 'wrongpassword' }
```

### Security Test Data
```javascript
TEST_USERS.SQL_INJECTION = {
  password: "' OR '1'='1"
}

TEST_USERS.XSS_ATTACK = {
  password: "<img src=x onerror=alert('XSS')>"
}
```

## 💡 Best Practices

### 1. Sử dụng logger
```javascript
info('Performing important action');
debug('Detailed debug information');
```

### 2. Error handling
```javascript
try {
  const errorMessage = await this.getErrorMessage();
  return errorMessage;
} catch {
  return null; // Không throw error
}
```

### 3. Wait strategies
```javascript
// Good
await this.waitFor(this.selectors.element);
await page.waitForLoadState('networkidle');

// Bad
await page.waitForTimeout(5000);
```

### 4. Assertions
```javascript
// Good - với test step
await test.step('Verify redirect to dashboard', async () => {
  const currentUrl = loginPage.getCurrentUrl();
  expect(currentUrl).toContain(ROUTES.DASHBOARD);
});

// Bad - không có context
expect(page.url()).toContain('/dashboard');
```

## 🔍 Common Issues

### Issue 1: Test timeout
**Nguyên nhân:** Application chưa chạy hoặc network chậm.  
**Giải pháp:** 
- Check application đang chạy tại `http://localhost:5173`
- Tăng timeout trong config

### Issue 2: Selector không tìm thấy
**Nguyên nhân:** UI đã thay đổi.  
**Giải pháp:**
- Update selectors trong `constants/selectors.js`
- Sử dụng `npm run codegen` để get selector mới

### Issue 3: Token không lưu
**Nguyên nhân:** Backend không trả về token.  
**Giải pháp:**
- Check network tab
- Verify API response có chứa accessToken

## 📚 Related Documentation

- [Test Data](../src/test-data/users.data.js)
- [Selectors](../src/constants/selectors.js)
- [Routes](../src/constants/routes.js)
- [Base Fixtures](../src/fixtures/base.fixtures.js)

---

**Total Test Cases:** 38  
**Coverage:** Authentication, Validation, Security, Accessibility, Token Management, Navigation, Forgot Password  
**Last Updated:** October 2025

