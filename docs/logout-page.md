# Logout Page - Documentation

## 📄 Tổng quan

**File:** `src/pages/logout.page.js`  
**Test File:** `src/e2e/logout.spec.js`  
**Test Coverage:** 2 test cases

Logout Page kiểm tra chức năng đăng xuất và authorization guard (chuyển hướng về login khi chưa đăng nhập).

## 🏗️ Cấu trúc Page Object

### Constructor & Selectors

```javascript
export class LogoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.selectors = {
      logoutButton: SELECTORS.LOGOUT.LOGOUT_BUTTON,
      
      // Login page selectors để verify redirect
      emailInput: SELECTORS.LOGIN.EMAIL_INPUT,
      passwordInput: SELECTORS.LOGIN.PASSWORD_INPUT,
      submitButton: SELECTORS.LOGIN.SUBMIT_BUTTON,
    };
  }
}
```

**Note:** LogoutPage cũng chứa selectors của Login page để verify redirect.

## 🔑 Methods quan trọng

### Navigation Methods

#### `navigate()`
Điều hướng đến route logout (nếu có).

```javascript
async navigate() {
  info('Navigating to Logout page');
  await this.page.goto(ROUTES.LOGOUT);
}
```

**Note:** Thường không dùng vì logout là action (click button) chứ không phải page riêng.

#### `waitForPageLoaded()`
Đợi page load xong.

```javascript
async waitForPageLoaded() {
  info('Waiting for Logout page to load');
  await this.page.waitForLoadState('networkidle');
}
```

### Logout Action Methods

#### `clickLogoutButton()`
Click nút "Đăng xuất" và đợi redirect.

```javascript
async clickLogoutButton() {
  info('Clicking Logout button');
  await this.page.locator(this.selectors.logoutButton).click();
  await this.page.waitForLoadState('networkidle');
}
```

**Use case:** TC01 - Đăng xuất thành công.

**Important:** Method này tự động đợi `networkidle` sau click để đảm bảo redirect hoàn tất.

#### `isLogoutButtonVisible()`
Kiểm tra nút "Đăng xuất" có hiển thị không.

```javascript
async isLogoutButtonVisible() {
  info('Checking if Logout button is visible');
  const count = await this.page.locator(this.selectors.logoutButton).count();
  if (count === 0) return false;
  
  const button = await this.page.locator(this.selectors.logoutButton).first();
  return await button.isVisible();
}
```

**Return:** `boolean` - true nếu nút logout visible.

**Use case:** TC01 - Verify nút logout hiển thị trước khi click.

### Verification Methods

#### `isOnLoginPage()`
Kiểm tra có đang ở trang Login không (kiểm tra URL).

```javascript
async isOnLoginPage() {
  info('Checking if on Login page');
  const currentURL = this.page.url();
  return currentURL.includes('/login');
}
```

**Return:** `boolean` - true nếu URL chứa "/login".

**Use case:** TC01, TC02 - Verify redirect về login page.

#### `isLoginFormVisible()`
Kiểm tra form login có hiển thị đầy đủ không (email, password, submit button).

```javascript
async isLoginFormVisible() {
  info('Checking if Login form is visible');
  const emailInput = await this.page.locator(this.selectors.emailInput).first();
  const passwordInput = await this.page.locator(this.selectors.passwordInput).first();
  const submitButton = await this.page.locator(this.selectors.submitButton).first();

  const isEmailVisible = await emailInput.isVisible();
  const isPasswordVisible = await passwordInput.isVisible();
  const isSubmitVisible = await submitButton.isVisible();

  return isEmailVisible && isPasswordVisible && isSubmitVisible;
}
```

**Return:** `boolean` - true nếu cả 3 elements (email, password, submit) đều visible.

**Use case:** TC01, TC02 - Verify login form hiển thị sau redirect.

#### `getCurrentURL()`
Lấy URL hiện tại.

```javascript
getCurrentURL() {
  return this.page.url();
}
```

**Return:** `string` - URL hiện tại.

**Use case:** TC01, TC02 - Verify URL chứa "/login".

## 🧪 Test Cases (2 TCs)

### TC1 - Đăng xuất thành công và quay về trang đăng nhập
**Mục đích:** Kiểm tra flow đăng xuất thành công.

**Precondition:** User đã đăng nhập (sử dụng `authenticatedPage` fixture).

**Logic:**
1. Navigate đến Dashboard (hoặc trang bất kỳ có nút Logout)
2. Đợi page load (networkidle)
3. Verify nút "Đăng xuất" hiển thị
4. Click nút "Đăng xuất"
5. Đợi 2 giây redirect
6. Verify đã chuyển về trang Login (URL chứa "/login")
7. Verify form Login hiển thị (email, password, submit)
8. Verify URL chứa "/login"

```javascript
test('TC01: Đăng xuất thành công và quay về trang đăng nhập', async ({ authenticatedPage }) => {
  const logoutPage = new LogoutPage(authenticatedPage);
  const page = authenticatedPage;

  // Điều hướng đến trang chứa nút Đăng xuất (có thể là Dashboard hoặc bất kỳ trang nào)
  await page.goto(ROUTES.DASHBOARD);
  await page.waitForLoadState('networkidle');

  // Kiểm tra nút Đăng xuất có hiển thị không
  const isLogoutButtonVisible = await logoutPage.isLogoutButtonVisible();
  expect(isLogoutButtonVisible).toBeTruthy();

  // Nhấn nút Đăng xuất
  await logoutPage.clickLogoutButton();

  // Chờ chuyển hướng
  await page.waitForTimeout(2000);

  // Kiểm tra đã chuyển về trang Login
  const isOnLoginPage = await logoutPage.isOnLoginPage();
  expect(isOnLoginPage).toBeTruthy();

  // Kiểm tra form Login hiển thị
  const isLoginFormVisible = await logoutPage.isLoginFormVisible();
  expect(isLoginFormVisible).toBeTruthy();

  // Kiểm tra URL chứa '/login'
  const currentURL = logoutPage.getCurrentURL();
  expect(currentURL).toContain('/login');
});
```

**Expectations:**
- ✅ Nút "Đăng xuất" visible trước khi click
- ✅ Sau logout, redirect về trang Login (URL contains "/login")
- ✅ Form Login hiển thị đầy đủ (email, password, submit)

**Fixture:** `authenticatedPage` - Page đã đăng nhập sẵn.

### TC02 - Bị chuyển hướng về trang login khi chưa đăng nhập
**Mục đích:** Kiểm tra Authorization Guard - trang yêu cầu login sẽ redirect về login page.

**Precondition:** User CHƯA đăng nhập (sử dụng `page` fixture thông thường, KHÔNG dùng `authenticatedPage`).

**Logic:**
1. Thử truy cập trang Community (protected route) khi chưa đăng nhập
2. Đợi page load và redirect (networkidle)
3. Đợi thêm 2 giây
4. Verify đã bị chuyển hướng về trang Login
5. Verify form Login hiển thị
6. Verify URL chứa "/login"

```javascript
test('TC02: Bị chuyển hướng về trang login khi chưa đăng nhập', async ({ page }) => {
  const logoutPage = new LogoutPage(page);

  // Thử truy cập trang Community khi chưa đăng nhập
  await page.goto(ROUTES.COMMUNITY);

  // Chờ chuyển hướng
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Kiểm tra đã bị chuyển hướng về trang Login
  const isOnLoginPage = await logoutPage.isOnLoginPage();
  expect(isOnLoginPage).toBeTruthy();

  // Kiểm tra form Login hiển thị
  const isLoginFormVisible = await logoutPage.isLoginFormVisible();
  expect(isLoginFormVisible).toBeTruthy();

  // Kiểm tra URL chứa '/login'
  const currentURL = logoutPage.getCurrentURL();
  expect(currentURL).toContain('/login');
});
```

**Expectations:**
- ✅ Không thể truy cập Community page khi chưa login
- ✅ Tự động redirect về trang Login
- ✅ Form Login hiển thị đầy đủ

**Fixture:** `page` - Page thông thường (chưa đăng nhập).

**Important:** Test này verify **Authorization Guard** hoạt động đúng.

## 📊 Test Data

Không có test data cụ thể cho Logout tests, chỉ sử dụng routes:

```javascript
ROUTES.DASHBOARD = '/';
ROUTES.COMMUNITY = '/';
ROUTES.LOGIN = '/login';
ROUTES.LOGOUT = '/logout'; // Nếu có
```

## 💡 Best Practices

### 1. Sử dụng đúng fixture
```javascript
// Good - TC01: Logout test cần authenticated user
test('TC01: Logout', async ({ authenticatedPage }) => {
  const logoutPage = new LogoutPage(authenticatedPage);
  // ...
});

// Good - TC02: Auth guard test cần NON-authenticated user
test('TC02: Auth guard', async ({ page }) => {
  const logoutPage = new LogoutPage(page);
  // ...
});

// Bad - Dùng sai fixture
test('TC01: Logout', async ({ page }) => { // Cần authenticatedPage
  // ...
});
```

### 2. Wait cho redirect properly
```javascript
// Good - Đợi networkidle sau logout
await logoutPage.clickLogoutButton(); // Method này tự động đợi networkidle
await page.waitForTimeout(2000); // Đợi thêm để chắc chắn

// Good - Verify redirect thành công
const isOnLoginPage = await logoutPage.isOnLoginPage();
expect(isOnLoginPage).toBeTruthy();

// Bad - Không đợi đủ
await logoutPage.clickLogoutButton();
const isOnLoginPage = await logoutPage.isOnLoginPage(); // Có thể false nếu redirect chưa xong
```

### 3. Verify cả URL và UI
```javascript
// Good - Verify cả 2
const isOnLoginPage = await logoutPage.isOnLoginPage(); // URL
const isLoginFormVisible = await logoutPage.isLoginFormVisible(); // UI
const currentURL = logoutPage.getCurrentURL();

expect(isOnLoginPage).toBeTruthy();
expect(isLoginFormVisible).toBeTruthy();
expect(currentURL).toContain('/login');

// Less reliable - Chỉ check URL
expect(currentURL).toContain('/login');
```

### 4. Handle logout button visibility
```javascript
// Good - Check count trước khi check visible
async isLogoutButtonVisible() {
  const count = await this.page.locator(this.selectors.logoutButton).count();
  if (count === 0) return false;
  
  const button = await this.page.locator(this.selectors.logoutButton).first();
  return await button.isVisible();
}

// Bad - Không check count (có thể throw error)
async isLogoutButtonVisible() {
  return await this.page.isVisible(this.selectors.logoutButton); // Throw nếu không tìm thấy
}
```

## 🔍 Common Issues

### Issue 1: Logout button không tìm thấy
**Nguyên nhân:** Selector sai hoặc button nằm trong menu/dropdown.  
**Giải pháp:**
- Cập nhật selector trong `constants/selectors.js`
- Nếu button trong dropdown, phải click mở dropdown trước
- Sử dụng `isLogoutButtonVisible()` để check trước

### Issue 2: Redirect chậm
**Nguyên nhân:** Network chậm hoặc backend xử lý chậm.  
**Giải pháp:**
```javascript
await logoutPage.clickLogoutButton(); // Đã có waitForLoadState('networkidle')
await page.waitForTimeout(2000); // Đợi thêm 2 giây
```

### Issue 3: Auth guard không hoạt động
**Nguyên nhân:** Hệ thống chưa implement auth guard hoặc route public.  
**Giải pháp:**
- Kiểm tra route COMMUNITY có yêu cầu auth không
- Thử với route khác yêu cầu auth (ví dụ: PROFILE, TEAM)
- Verify backend trả về 401/redirect

### Issue 4: TC02 pass nhưng không nên pass
**Nguyên nhân:** Route COMMUNITY là public (không yêu cầu login).  
**Giải pháp:**
- Đổi sang route khác yêu cầu auth:
```javascript
await page.goto(ROUTES.PROFILE); // Thường yêu cầu auth
```

## 🎯 Key Concepts

### Fixture: `authenticatedPage` vs `page`

#### `authenticatedPage`
- **Mục đích:** Page đã đăng nhập sẵn
- **Sử dụng:** TC01 - Logout test
- **Setup:** Fixture tự động login trước khi chạy test

```javascript
test('TC01: Logout', async ({ authenticatedPage }) => {
  // authenticatedPage đã có token, đã login
});
```

#### `page`
- **Mục đích:** Page mới, chưa login
- **Sử dụng:** TC02 - Auth guard test
- **Setup:** Không có setup gì, page rỗng

```javascript
test('TC02: Auth guard', async ({ page }) => {
  // page chưa có token, chưa login
});
```

### Authorization Guard
Guard là middleware kiểm tra user đã login chưa. Nếu chưa login, redirect về `/login`.

**Protected routes:** COMMUNITY, PROFILE, TEAM, MATCHING, NOTIFICATION  
**Public routes:** LOGIN, REGISTER, FORGOT_PASSWORD

TC02 test guard hoạt động đúng.

## 📚 Related Documentation

- [Fixtures](../src/fixtures/index.js)
- [Selectors](../src/constants/selectors.js)
- [Routes](../src/constants/routes.js)
- [Login Page](./login-page.md)

---

**Total Test Cases:** 2  
**Coverage:** Logout Flow, Authorization Guard  
**Last Updated:** October 2025

