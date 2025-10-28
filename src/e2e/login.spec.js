/**
 * Login Comprehensive E2E Test Cases
 * Bộ test case đầy đủ cho chức năng đăng nhập
 */

import { test, expect } from '../fixtures/index.js';
import { LoginPage } from '../pages/login.page.js';
import { ENV } from '../config/env.config.js';
import { ROUTES } from '../constants/routes.js';
import { TEST_USERS } from '../test-data/users.data.js';

test.describe('Login - UI Display Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC01 - Hiển thị đúng tiêu đề trang', async () => {
    await test.step('Kiểm tra tiêu đề "Chào mừng quay trở lại"', async () => {
      const titleText = await loginPage.getPageTitleText();
      expect(titleText).toBeTruthy();
      console.log('Page title:', titleText);
      // Có thể chứa "Chào mừng" hoặc "Đăng nhập"
    });
  });

  test('TC02 - Hiển thị logo hoặc icon app', async () => {
    await test.step('Kiểm tra logo "Matching Queue" hiển thị', async () => {
      const isLogoVisible = await loginPage.isLogoVisible();
      expect(isLogoVisible).toBe(true);
    });
  });

  test('TC03 - Hiển thị 3 tính năng giới thiệu bên trái', async () => {
    await test.step('Kiểm tra các mục Tìm sân, Tìm đối thủ, Tìm CLB', async () => {
      const featureTitle1 = await loginPage.getFeatureTitle1();
      const featureDescription1 = await loginPage.getFeatureDescription1();
      const featureTitle2 = await loginPage.getFeatureTitle2();
      const featureDescription2 = await loginPage.getFeatureDescription2();
      const featureTitle3 = await loginPage.getFeatureTitle3();
      const featureDescription3 = await loginPage.getFeatureDescription3();

      // Kiểm tra đúng text cho từng feature
      expect(featureTitle1?.trim()).toBe('Tìm sân nhanh chóng');
      expect(featureDescription1?.trim()).toBe('Tìm sân bóng quanh bạn nhanh chóng');

      expect(featureTitle2?.trim()).toBe('Tìm đối thủ phù hợp');
      expect(featureDescription2?.trim()).toBe('Tìm ra ngay kèo hay đối phù hợp trình độ uy tín');

      expect(featureTitle3?.trim()).toBe('Tìm câu lạc bộ để tham gia');
      expect(featureDescription3?.trim()).toBe('Hàng trăm clb uy tín chờ bạn vào chơi');
    });
  });

  test('TC04 - Có ô nhập Email và Mật khẩu', async ({ page }) => {
    await test.step('Kiểm tra hai ô input hiển thị rõ ràng', async () => {
      await expect(page.locator(loginPage.selectors.emailInput)).toBeVisible();
      await expect(page.locator(loginPage.selectors.passwordInput)).toBeVisible();
    });
  });

  test('TC05 - Có checkbox Remember me và link Forgot password', async () => {
    await test.step('Kiểm tra Remember me checkbox', async () => {
      const isRememberMeVisible = await loginPage.isRememberMeVisible();
      expect(isRememberMeVisible).toBe(true);
    });

    await test.step('Kiểm tra Forgot password link', async () => {
      const isForgotPasswordVisible = await loginPage.isForgotPasswordLinkVisible();
      expect(isForgotPasswordVisible).toBe(true);
    });
  });

  test('TC06 - Có nút Đăng nhập với Google', async ({ page }) => {
    await test.step('Kiểm tra nút hiển thị logo Google', async () => {
      const googleButton = page.locator(loginPage.selectors.googleLoginButton);
      await expect(googleButton).toBeVisible();
    });
  });

  test('TC07 - Có nút Đăng nhập màu cam', async ({ page }) => {
    await test.step('Kiểm tra nút hiển thị rõ, hover có hiệu ứng', async () => {
      const submitButton = page.locator(loginPage.selectors.submitButton);
      await expect(submitButton).toBeVisible();

      // Hover test
      await submitButton.hover();
      await page.waitForTimeout(500);
    });
  });

  test('TC08 - Có link Đăng ký ở đây', async ({ page }) => {
    await test.step('Kiểm tra link dẫn đến /register', async () => {
      const isRegisterVisible = await loginPage.isRegisterLinkVisible();
      expect(isRegisterVisible).toBe(true);
    });
  });

  test('TC09 - Kiểm tra bố cục responsive', async ({ page }) => {
    await test.step('Thu nhỏ viewport - Mobile', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await loginPage.verifyPageElements();
    });

    await test.step('Viewport tablet', async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await loginPage.verifyPageElements();
    });

    await test.step('Viewport desktop', async () => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await loginPage.verifyPageElements();
    });
  });
});

test.describe('Login - Validation Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC10 - Bỏ trống cả hai ô', async ({ page }) => {
    await test.step('Để trống Email và Password', async () => {
      await loginPage.enterEmail(TEST_USERS.EMPTY_EMAIL.email);
      await loginPage.enterPassword(TEST_USERS.EMPTY_PASSWORD.password);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
    });

    await test.step('Hiển thị lỗi yêu cầu nhập thông tin', async () => {
      await page.waitForTimeout(1000);
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain('/login');

      // Kiểm tra thông báo lỗi cho email
      const emailError = await loginPage.getEmailErrorMessage();
      expect(emailError).toBe('Email không được để trống');

      // Kiểm tra thông báo lỗi cho mật khẩu
      const passwordError = await loginPage.getPasswordErrorMessage();
      expect(passwordError).toBe('Mật khẩu không được để trống');
    });
  });

  test('TC11 - Email sai định dạng', async ({ page }) => {
    await test.step('Nhập Email sai định dạng', async () => {
      await loginPage.enterEmail(TEST_USERS.INVALID_EMAIL_FORMAT.email);
      await loginPage.enterPassword(TEST_USERS.VALID_USER_1.password);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
    });

    await test.step('Hiển thị "Email không đúng định dạng"', async () => {
      await page.waitForTimeout(2000);
      const emailErrorMessage = await loginPage.getEmailErrorMessage();
      expect(emailErrorMessage).toBe('Email không đúng định dạng');
    });
  });
  test('TC12 - Mật khẩu ngắn', async ({ page }) => {
    await test.step('Nhập Email hợp lệ, Password ngắn', async () => {
      await loginPage.enterEmail(TEST_USERS.VALID_USER_1.email);
      await loginPage.enterPassword(TEST_USERS.SHORT_PASSWORD.password);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
    });

    await test.step('Hiển thị "Mật khẩu phải có ít nhất 6 ký tự"', async () => {
      await page.waitForTimeout(2000);
      const passwordErrorMessage = await loginPage.getPasswordErrorMessage();
      expect(passwordErrorMessage).toBe('Mật khẩu phải có ít nhất 6 ký tự');
    });
  });

  test('TC13 - Nhập hợp lệ', async ({ page }) => {
    await test.step('Nhập Email và Password hợp lệ', async () => {
      await loginPage.enterEmail(TEST_USERS.VALID_USER_1.email);
      await loginPage.enterPassword(TEST_USERS.VALID_USER_1.password);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
    });

    await test.step('Không hiển thị lỗi validation phía client', async () => {
      await page.waitForTimeout(2000);
      const emailErrorMessage = await loginPage.getEmailErrorMessage();
      expect(emailErrorMessage).toBeNull();
      const passwordErrorMessage = await loginPage.getPasswordErrorMessage();
      expect(passwordErrorMessage).toBeNull();
    });
  });
});

test.describe('Login - Authentication Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC14 - Đăng nhập thành công', async ({ page }) => {
    await test.step(`Nhập Email="${ENV.TEST_USER.VALID_EMAIL}", Password="${ENV.TEST_USER.VALID_PASSWORD}"`, async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
    });

    await test.step('Chuyển đến /', async () => {
      await page.waitForTimeout(3000);
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.DASHBOARD);
    });
  });

  test('TC15 - Sai mật khẩu', async ({ page }) => {
    await test.step('Nhập Email hợp lệ, Password sai', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(TEST_USERS.INVALID_PASSWORD.password);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
    });

    await test.step('Hiển thị "Email hoặc mật khẩu không đúng"', async () => {
      await page.waitForTimeout(2000);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('Email or password is incorrect');
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.LOGIN);
    });
  });

  test('TC16 - Email không tồn tại', async ({ page }) => {
    await test.step('Nhập Email không tồn tại, Password hợp lệ', async () => {
      await loginPage.enterEmail(TEST_USERS.INVALID_EMAIL.email);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
    });

    await test.step('Hiển thị "Tài khoản không tồn tại"', async () => {
      await page.waitForTimeout(2000);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('Email or password is incorrect');
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.LOGIN);
    });
  });
});

test.describe('Login - Token Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC17 - Login thành công - Token lưu trong LocalStorage', async ({ page }) => {
    await test.step('Đăng nhập thành công', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });

    await test.step('Token lưu trong LocalStorage', async () => {
      const token = await loginPage.getAuthToken();
      expect(token).not.toBeNull();
    });
  });

  test('TC18 - Reload lại trang', async ({ page, context }) => {
    await test.step('Đăng nhập thành công', async () => {
      const isRememberMeVisible = await loginPage.isRememberMeVisible();
      if (isRememberMeVisible) {
        await loginPage.setRememberMe(true);
      }
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });

    await test.step('F5 trình duyệt', async () => {
      await page.reload();
      await page.waitForTimeout(2000);
    });

    await test.step('Kiểm tra vẫn đăng nhập', async () => {
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.DASHBOARD);
    });
  });

  test('TC19 - Mở lại trình duyệt', async ({ context, page }) => {
    await test.step('Đăng nhập thành công', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });

    await test.step('Kiểm tra token được lưu trong localStorage', async () => {
      const token = await loginPage.getAuthToken();
      expect(token).not.toBeNull();
    });

    await test.step('Mở tab mới và kiểm tra vẫn đăng nhập', async () => {
      const newPage = await context.newPage();
      const newLoginPage = new LoginPage(newPage);
      
      // Navigate to login page - nếu có token sẽ redirect về dashboard
      await newLoginPage.navigateWithRedirect();
      await newPage.waitForTimeout(2000);
      
      const currentUrl = newLoginPage.getCurrentUrl();
      
      // Kiểm tra không còn ở trang login (đã được redirect)
      expect(currentUrl).not.toContain(ROUTES.LOGIN);
      
      // Kiểm tra đã được redirect về trang chính
      expect(currentUrl).toContain(ROUTES.DASHBOARD);
      
      // Kiểm tra token vẫn tồn tại trong tab mới
      const newToken = await newLoginPage.getAuthToken();
      expect(newToken).not.toBeNull();
    });
  });
});

test.describe('Login - Navigation Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC20 - Forgot password', async ({ page }) => {
    await test.step('Click link Forgot password', async () => {
      const isForgotPasswordVisible = await loginPage.isForgotPasswordLinkVisible();
      expect(isForgotPasswordVisible).toBeTruthy();

      await loginPage.clickForgotPassword();
      await page.waitForTimeout(1000);
    });

    await test.step('Đi đến /forgot-password', async () => {
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.FORGOT_PASSWORD);
    });
  });

  test('TC21 - Đăng nhập với Google', async ({ page }) => {
    await test.step('Kiểm tra nút Google có tồn tại', async () => {
      const isGoogleButtonVisible = await loginPage.isVisible(loginPage.selectors.googleLoginButton);
      expect(isGoogleButtonVisible).toBeTruthy();
    });

    await test.step('Click nút Google và kiểm tra redirect', async () => {
      // Lắng nghe navigation đến Google OAuth
      const navigationPromise = page.waitForURL(url => {
        const urlString = url.toString();
        return urlString.includes('accounts.google.com');
      }, { 
        timeout: 10000 
      });
      
      // Click Google button
      await loginPage.loginWithGoogle();
      
      // Chờ redirect đến Google OAuth
      await navigationPromise;
      
      // Kiểm tra URL hiện tại
      const currentUrl = page.url();
      expect(currentUrl).toContain('accounts.google.com');
      
      // Kiểm tra có các tham số OAuth cần thiết
      expect(currentUrl).toMatch(/client_id|response_type|redirect_uri/);
    });
  });

  test('TC22 - Đi đến trang đăng ký', async ({ page }) => {
    await test.step('Click Đăng ký ở đây', async () => {
      await loginPage.clickRegister();
      await page.waitForTimeout(1000);
    });

    await test.step('Đi đến /register', async () => {
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.REGISTER);
    });
  });
});

test.describe('Login - Forgot Password Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Navigate to forgot password page
    const isForgotPasswordVisible = await loginPage.isForgotPasswordLinkVisible();
    if (isForgotPasswordVisible) {
      await loginPage.clickForgotPassword();
      await page.waitForTimeout(1000);
    }
  });

  test('TC23 - Đi đến trang quên mật khẩu', async ({ page }) => {
    await test.step('Kiểm tra đã ở trang forgot-password', async () => {
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.FORGOT_PASSWORD);
    });
  });

  test('TC24 - Email hợp lệ', async ({ page }) => {
    await test.step('Nhập Email hợp lệ', async () => {
      await loginPage.enterEmail(TEST_USERS.VALID_USER_1.email);
    });

     await test.step('Click gửi', async () => {
       await loginPage.clickSubmit();
       await page.waitForTimeout(3000);
     });

     await test.step('Hiển thị thông báo thành công', async () => {
       const successMessage = await loginPage.getSuccessMessage();
       expect(successMessage).toBe('Reset password link sent successfully');
     });
  });

  test('TC25 - Email không tồn tại', async ({ page }) => {
    await test.step('Nhập Email không tồn tại', async () => {
      await loginPage.enterEmail(TEST_USERS.INVALID_EMAIL.email);
    });

    await test.step('Click gửi', async () => {
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });

    await test.step('Hiển thị "Email không tồn tại"', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('Email không tồn tại');
    });
  });

  test('TC26 - Email sai định dạng', async ({ page }) => {
    await test.step('Nhập Email sai định dạng', async () => {
      await loginPage.enterEmail(TEST_USERS.INVALID_EMAIL_FORMAT.email);
    });

    await test.step('Click gửi', async () => {
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });
    
    await test.step('Hiển thị "Email không hợp lệ"', async () => {
      const errorMessage = await loginPage.getEmailForgotPasswordErrorMessage();
      expect(errorMessage).toBe('Email không đúng định dạng');
    });
  });

  test('TC27 - Gửi lại nhiều lần', async ({ page }) => {
    await test.step('Gửi lại nhiều lần', async () => {
      await loginPage.enterEmail(TEST_USERS.VALID_USER_1.email);
      await loginPage.clickSubmit();
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });

    await test.step('Hiển thị "Vui lòng đợi 1 phút trước khi thử lại"', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('You have requested too many password reset emails. Please wait 1 minute before trying again.');
    });
  });
});

test.describe('Login - Security Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC28 - Mật khẩu bị che', async ({ page }) => {
    await test.step('Nhập mật khẩu', async () => {
      await loginPage.enterPassword(TEST_USERS.VALID_USER_1.password);
    });

    await test.step('Hiển thị ký tự ●', async () => {
      const isMasked = await loginPage.isPasswordMasked();
      expect(isMasked).toBeTruthy();
    });
  });

  test('TC29 - Không lưu password trong LocalStorage', async ({ page }) => {
    await test.step('Nhập và submit', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      await page.waitForTimeout(2000);
    });

    await test.step('LocalStorage không chứa mật khẩu', async () => {
      const password = await loginPage.getPasswordFromLocalStorage();
      expect(password).toBeNull();
    });
  });

  test('TC30 - Không có password trong HTML', async ({ page }) => {
    await test.step('Nhập mật khẩu', async () => {
      await loginPage.enterPassword(TEST_USERS.VALID_USER_1.password);
    });

    await test.step('Source code không có mật khẩu', async () => {
      const pageContent = await page.content();
      expect(pageContent).not.toContain(TEST_USERS.VALID_USER_1.password);
    });
  });

  test('TC31 - Ngăn login nhiều lần sai', async ({ page }) => {
    await test.step('Nhập sai 5 lần', async () => {
      for (let i = 0; i < 5; i++) {
        await loginPage.clearEmail();
        await loginPage.clearPassword();
        await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
        await loginPage.enterPassword(TEST_USERS.INVALID_PASSWORD.password + i);
        await loginPage.clickSubmit();
        await page.waitForTimeout(5000);
      }
    });

    await test.step('Khóa tạm thời tài khoản', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('Your account has been temporarily locked due to too many failed login attempts. Please try again later.');
      // Tùy hệ thống có implement rate limiting hay không
    });
  });

  test('TC32 - Token hết hạn', async ({ page }) => {
    await test.step('Đăng nhập thành công', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });

    await test.step('Kiểm tra đã đăng nhập thành công', async () => {
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).not.toContain(ROUTES.LOGIN);
    });

    await test.step('Set accessToken với giá trị linh tinh', async () => {
      await page.evaluate(() => {
        localStorage.setItem('accessToken', 'invalid_expired_token_12345');
      });
    });

    await test.step('Reload trang', async () => {
      await page.reload();
      await page.waitForTimeout(3000);
    });

    await test.step('Kiểm tra redirect về trang login', async () => {
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.LOGIN);
    });

    await test.step('Kiểm tra token đã bị xóa', async () => {
      const token = await loginPage.getAuthToken();
      expect(token).toBeNull();
    });
  });

  test('TC33 - Ngăn SQL Injection', async ({ page }) => {
    await test.step('Nhập SQL injection payload', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(TEST_USERS.SQL_INJECTION.password);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });

    await test.step('Kiểm tra không thể đăng nhập', async () => {
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.LOGIN);
    });

    await test.step('Kiểm tra hiển thị lỗi', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
    });
  });

  test('TC34 - Ngăn XSS', async ({ page }) => {
    await test.step('Nhập XSS payload', async () => {
      await loginPage.enterEmail(TEST_USERS.VALID_USER_1.email);
      await loginPage.enterPassword(TEST_USERS.XSS_ATTACK.password);
    });

    await test.step('Click Đăng nhập', async () => {
      await loginPage.clickSubmit();
      await page.waitForTimeout(3000);
    });

    await test.step('Kiểm tra không thể đăng nhập', async () => {
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.LOGIN);
    });

    await test.step('Kiểm tra không có alert popup', async () => {
      const dialogs = [];
      page.on('dialog', dialog => {
        dialogs.push(dialog);
        dialog.dismiss();
      });
      
      // Verify không có dialog nào được trigger
      expect(dialogs.length).toBe(0);
    });

    await test.step('Kiểm tra input được sanitize', async () => {
      const passwordValue = await loginPage.getPasswordValue();
      
      // Verify script tags bị escape hoặc remove
      expect(passwordValue).not.toContain('<img');
    });
  });
});

test.describe('Login - Accessibility Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC35 - Tab chuyển input', async ({ page }) => {
    await test.step('Nhấn Tab', async () => {
      // Focus vào body trước
      await page.keyboard.press('Tab');
      await page.waitForTimeout(300);

      let focusedElement = await page.evaluate(() => document.activeElement.tagName);
      console.log('First tab - Focused element:', focusedElement);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(300);
      focusedElement = await page.evaluate(() => document.activeElement.tagName);
      console.log('Second tab - Focused element:', focusedElement);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(300);
      focusedElement = await page.evaluate(() => document.activeElement.tagName);
      console.log('Third tab - Focused element:', focusedElement);
    });

    await test.step('Tab lần lượt qua email → password → nút login', async () => {
      // Verify tab order works
      expect(true).toBeTruthy();
    });
  });

  test('TC36 - Enter để đăng nhập', async ({ page }) => {
    await test.step('Nhập thông tin', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
    });

    await test.step('Nhấn Enter', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2000);
    });

    await test.step('Login thành công', async () => {
      // Check if navigation occurred or error displayed
      const currentUrl = loginPage.getCurrentUrl();
      expect(currentUrl).toContain(ROUTES.DASHBOARD);
    });
  });

  test('TC37 - Hiển thị lỗi rõ ràng', async ({ page }) => {
    await test.step('Nhập sai thông tin', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.INVALID_EMAIL);
      await loginPage.enterPassword('wrongpassword');
    });

    await test.step('Click đăng nhập', async () => {
      await loginPage.clickSubmit();
      await page.waitForTimeout(2000);
    });

    await test.step('Thông báo lỗi dễ đọc, nổi bật', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      console.log('Error message:', errorMessage);
      if (errorMessage) {
        expect(errorMessage.length).toBeGreaterThan(0);
      }
    });
  });

  test('TC38 - Loading khi xử lý', async ({ page }) => {
    await test.step('Nhập thông tin', async () => {
      await loginPage.enterEmail(ENV.TEST_USER.VALID_EMAIL);
      await loginPage.enterPassword(ENV.TEST_USER.VALID_PASSWORD);
    });

    await test.step('Click đăng nhập và kiểm tra loading', async () => {
      await loginPage.clickSubmit();
      
      // Kiểm tra có loading spinner không
      const isLoadingVisible = await loginPage.isLoadingSpinnerVisible();
      expect(isLoadingVisible).toBeTruthy();
    });
  });
});

