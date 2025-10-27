# Matching Queue Auto Test

Automated E2E testing suite cho Matching Queue application sử dụng Playwright framework.

## 🚀 Quick Start

```bash
# 1. Clone và cài đặt dependencies
npm install

# 2. Cài đặt browsers
npm run install:browsers

# 3. Cấu hình environment
cp env.example .env
# Cập nhật TEST_EMAIL và TEST_PASSWORD trong file .env

# 4. Chạy tests
npm test

# 5. Xem report
npm run report
```

## 🔧 Tech Stack

- **Framework**: [Playwright](https://playwright.dev/) v1.56.1
- **Language**: JavaScript (ES Modules)
- **Test Runner**: Playwright Test Runner
- **Reporting**: HTML, JSON, Console
- **CI/CD Ready**: ✅
- **Cross-browser**: Chromium, Firefox, WebKit
- **Mobile Testing**: ✅ Chrome Mobile, Safari Mobile

## 🎯 Tính năng được test

Project này bao gồm các test cases cho các tính năng chính sau:

### 🔐 Authentication (Login)
- Đăng nhập với thông tin hợp lệ
- Xử lý đăng nhập với thông tin không hợp lệ
- Validation các trường input
- Hiển thị error messages

### 📝 Community/Posts
- Tạo bài đăng chỉ có text
- Tạo bài đăng có hình ảnh
- Upload và hiển thị hình ảnh trong bài đăng
- Hiển thị thông tin người đăng (avatar, username)
- Hiển thị thứ tự bài đăng (mới nhất trên cùng)
- Validation bài đăng rỗng

### ⚽ Team/Club Management
- Tạo câu lạc bộ mới
- Upload hình ảnh cho CLB
- Validation tên CLB không được để trống
- Validation hình ảnh không được để trống
- Kiểm tra file upload không hợp lệ

### 🏆 Matching (Trận đấu)
- Tạo trận đấu mới
- Chọn câu lạc bộ
- Chọn sân bóng
- Thiết lập ngày giờ thi đấu
- Nhập thông tin liên hệ
- Quản lý các trận đấu đã tạo
- Validation các trường bắt buộc

## 📁 Cấu trúc thư mục

```
matching_queue_auto_test/
├── src/                   # Source code
│   ├── config/           # Cấu hình chung
│   │   ├── env.config.js      # Environment configuration (BASE_URL, API_URL, timeout, retry)
│   │   └── test.config.js     # Test configuration (viewport, browser context, paths)
│   ├── constants/        # Constants và định nghĩa
│   │   ├── routes.js         # Application routes (login, matching, community, admin)
│   │   └── selectors.js      # Element selectors (login, community, team, matching)
│   ├── common/          # Common classes
│   │   ├── base.page.js     # Base Page Object Model
│   │   └── api.helper.js    # API helper functions
│   ├── utils/          # Utility functions
│   │   ├── wait.utils.js      # Wait utilities
│   │   ├── validation.utils.js # Validation utilities
│   │   ├── data.utils.js      # Test data generators
│   │   ├── screenshot.utils.js # Screenshot utilities
│   │   └── logger.utils.js    # Logging utilities
│   ├── fixtures/       # Custom fixtures
│   │   ├── base.fixtures.js  # Base fixtures
│   │   └── index.js         # Fixtures export
│   ├── pages/         # Page Object Models
│   │   ├── login.page.js    # Login page
│   │   ├── community.page.js # Community page (posts, images)
│   │   ├── team.page.js     # Team/Club page (create team)
│   │   ├── matching.page.js # Matching page (create/manage matches)
│   │   └── index.js        # Pages export
│   ├── helpers/       # Helper functions
│   │   ├── auth.helper.js  # Authentication helpers
│   │   └── index.js       # Helpers export
│   ├── test-data/     # Test data
│   │   ├── users.data.js         # User test data
│   │   ├── community.test-data.js # Community test data
│   │   ├── team.test-data.js     # Team test data
│   │   ├── matching.test-data.js # Matching test data
│   │   ├── uploads/             # Test files for upload
│   │   │   ├── arsenal.png      # Image for testing
│   │   │   ├── team-test.jpg    # Team image
│   │   │   ├── test-file.exe    # Invalid file type
│   │   │   └── test-file.txt    # Text file for testing
│   │   └── index.js            # Test data export
│   └── e2e/          # E2E test cases
│       ├── login.spec.js    # Login test cases
│       ├── community.spec.js # Community/Post test cases
│       ├── team.spec.js     # Team/Club test cases
│       └── matching.spec.js # Matching test cases
├── playwright.config.js # Playwright configuration
├── package.json        # Dependencies
└── .env               # Environment variables
```

## 🚀 Cài đặt

### 1. Cài đặt dependencies

```bash
# Sử dụng npm
npm install

# Hoặc yarn
yarn install
```

### 2. Cài đặt browsers

```bash
# Cài đặt tất cả browsers
npm run install:browsers

# Cài đặt dependencies cho browsers (Linux)
npm run install:deps
```

### 3. Cấu hình environment

```bash
# Copy file ENV.example sang .env
cp ENV.example .env

# Cập nhật các giá trị trong file .env
# Đặc biệt quan trọng: TEST_EMAIL và TEST_PASSWORD
```

**Các environment variables quan trọng:**

| Variable | Mô tả | Default | Required |
|----------|-------|---------|----------|
| `BASE_URL` | URL của application | `http://localhost:5173` | ✅ |
| `API_URL` | URL của API backend | `http://localhost:3000/api` | ⚠️ |
| `TEST_EMAIL` | Email để test login | `test@example.com` | ✅ |
| `TEST_PASSWORD` | Password để test login | `Test@123456` | ✅ |
| `HEADLESS` | Chạy browser ẩn | `false` | ❌ |
| `SLOW_MO` | Slow motion (ms) | `0` | ❌ |
| `VIDEO` | Record video | `false` | ❌ |
| `SCREENSHOT` | Chụp screenshot | `only-on-failure` | ❌ |
| `DEBUG` | Debug mode | `false` | ❌ |
| `CI` | CI/CD mode | `false` | ❌ |

## 📊 Test Coverage

### Login Tests (`src/e2e/login.spec.js`)
- ✅ Đăng nhập với thông tin hợp lệ
- ✅ Validation email và password
- ✅ Error messages
- ✅ UI elements hiển thị đúng

### Community Tests (`src/e2e/community.spec.js`)
- ✅ TC01: Đăng bài chỉ có nội dung text
- ✅ TC02: Đăng bài có hình ảnh
- ✅ TC03: Validation bài đăng rỗng
- ✅ TC04: Hiển thị thông tin người đăng
- ✅ TC05: Kiểm tra thứ tự hiển thị bài đăng
- ✅ TC06: Hiển thị ảnh bài đăng

### Team Tests (`src/e2e/team.spec.js`)
- ✅ TC01: Tạo CLB thành công với thông tin hợp lệ
- ✅ TC02: Validation tên CLB không được để trống
- ✅ TC03: Validation hình ảnh không được để trống
- ✅ TC04: Upload file không hợp lệ (.exe, .txt)
- ✅ TC05: Hiển thị preview hình ảnh

### Matching Tests (`src/e2e/matching.spec.js`)
- ✅ TC01: Tạo trận đấu thành công
- ✅ TC02: Validation các trường bắt buộc
- ✅ TC03: Hiển thị form tạo trận đấu
- ✅ TC04: Quản lý trận đấu đã tạo
- ✅ TC05: Hiển thị danh sách trận đấu

## 🧪 Chạy tests

### Chạy tất cả tests

```bash
npm test
```

### Chạy tests với UI mode (khuyến nghị cho development)

```bash
npm run test:ui
```

### Chạy tests với headed mode (xem browser)

```bash
npm run test:headed
```

### Chạy tests với debug mode

```bash
npm run test:debug
```

### Chạy tests trên browser cụ thể

```bash
# Chromium
npm run test:chromium

# Firefox
npm run test:firefox

# WebKit (Safari)
npm run test:webkit

# Mobile devices
npm run test:mobile
```

### Chạy test cases cụ thể

```bash
# Login tests
npm run test:login

# Community tests (Post features)
npm test src/e2e/community.spec.js

# Team/Club tests
npm test src/e2e/team.spec.js

# Matching tests (Create/Manage matches)
npm test src/e2e/matching.spec.js
```

### Chạy tests parallel/serial

```bash
# Parallel (4 workers)
npm run test:parallel

# Serial (1 worker)
npm run test:serial
```

## 📊 Reports

### Xem HTML report

```bash
npm run report
```

Report sẽ được tạo tại `playwright-report/index.html`

### JSON report

JSON report được tạo tự động tại `test-results/results.json`

## 🛠️ Development

### Generate test code (Codegen)

```bash
npm run codegen
```

Tool này sẽ mở browser và record các actions của bạn thành test code.

### Debug tests

1. Sử dụng `test:debug` để chạy test với debugger:
```bash
npm run test:debug
```

2. Hoặc sử dụng `test:ui` để chạy test với UI mode:
```bash
npm run test:ui
```

## 📝 Viết test cases mới

### 1. Tạo Page Object Model

```javascript
// pages/your-page.page.js
import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { ENV } from '../config/env.config.js';
import { info, debug } from '../utils/logger.utils.js';

export class YourPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define selectors
    this.selectors = {
      inputField: SELECTORS.YOUR_PAGE.INPUT_FIELD,
      submitButton: SELECTORS.YOUR_PAGE.SUBMIT_BUTTON,
      // ... more selectors
    };
  }

  async navigate() {
    info('Navigating to Your Page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.YOUR_PAGE}`);
    await this.waitForPageLoaded();
  }

  async waitForPageLoaded() {
    debug('Waiting for Your Page to load');
    await this.waitFor(this.selectors.submitButton);
  }

  async yourMethod() {
    info('Executing your method');
    // Implement your methods using logger and selectors
  }
}
```

### 2. Thêm selectors vào constants

```javascript
// constants/selectors.js
export const SELECTORS = {
  // ... existing selectors
  YOUR_PAGE: {
    INPUT_FIELD: 'input[name="field"]',
    SUBMIT_BUTTON: 'button[type="submit"]',
    ERROR_MESSAGE: '.error-message',
  },
};
```

### 3. Thêm routes vào constants

```javascript
// constants/routes.js
export const ROUTES = {
  // ... existing routes
  YOUR_PAGE: '/your-page',
};
```

### 4. Tạo test data

```javascript
// test-data/your-feature.test-data.js
export const YOUR_FEATURE_TEST_DATA = {
  VALID: {
    field1: 'Valid data',
    field2: 'Valid data 2',
  },
  INVALID: {
    field1: '',
    field2: 'Invalid',
  },
};
```

### 5. Viết test cases

```javascript
// e2e/your-feature.spec.js
import { test, expect } from '../fixtures/index.js';
import { YourPage } from '../pages/your-page.page.js';
import { YOUR_FEATURE_TEST_DATA } from '../test-data/your-feature.test-data.js';

test.describe('Your Feature Tests', () => {
  let yourPage;

  test.beforeEach(async ({ page }) => {
    yourPage = new YourPage(page);
    await yourPage.navigate();
  });

  test('TC01 - Test with valid data', async ({ page }) => {
    await test.step('Step 1: Enter valid data', async () => {
      await yourPage.fillField(YOUR_FEATURE_TEST_DATA.VALID.field1);
    });
    
    await test.step('Step 2: Submit form', async () => {
      await yourPage.clickSubmitButton();
    });
    
    await test.step('Step 3: Verify success', async () => {
      const successMessage = await yourPage.getSuccessMessage();
      expect(successMessage).toBeTruthy();
    });
  });

  test('TC02 - Test with invalid data', async ({ page }) => {
    await test.step('Step 1: Enter invalid data', async () => {
      await yourPage.fillField(YOUR_FEATURE_TEST_DATA.INVALID.field1);
    });
    
    await test.step('Step 2: Submit form', async () => {
      await yourPage.clickSubmitButton();
    });
    
    await test.step('Step 3: Verify error message', async () => {
      const errorMessage = await yourPage.getErrorMessage();
      expect(errorMessage).toContain('Expected error text');
    });
  });
});
```

## 📖 Page Objects Reference

### LoginPage
**File:** `src/pages/login.page.js`

**Methods:**
- `navigate()` - Điều hướng đến trang login
- `login(email, password)` - Thực hiện đăng nhập
- `fillEmail(email)` - Nhập email
- `fillPassword(password)` - Nhập password
- `clickSubmitButton()` - Click nút đăng nhập
- `getErrorMessage()` - Lấy error message

### CommunityPage
**File:** `src/pages/community.page.js`

**Methods:**
- `navigate()` - Điều hướng đến trang community
- `clickCreatePostButton()` - Click nút tạo bài đăng
- `enterPostContent(content)` - Nhập nội dung bài đăng
- `uploadImage(imagePath)` - Upload hình ảnh
- `createTextPost(content)` - Tạo bài đăng text
- `createImagePost(content, imagePath)` - Tạo bài đăng có hình ảnh
- `getAllPosts()` - Lấy tất cả bài đăng
- `getFirstPost()` - Lấy bài đăng đầu tiên
- `getPostContent(post)` - Lấy nội dung bài đăng
- `getPostImage(post)` - Lấy hình ảnh của bài đăng
- `getPostUsername(post)` - Lấy tên người đăng
- `verifyPostAtTop(expectedContent)` - Kiểm tra bài đăng ở đầu list

### TeamPage
**File:** `src/pages/team.page.js`

**Methods:**
- `navigate()` - Điều hướng đến trang tạo team
- `fillTeamName(teamName)` - Nhập tên CLB
- `fillTeamDescription(description)` - Nhập mô tả CLB
- `uploadTeamImage(filePath)` - Upload hình ảnh CLB
- `createTeam(teamData)` - Tạo CLB với thông tin đầy đủ
- `isImagePreviewVisible()` - Kiểm tra preview hình ảnh
- `getErrorMessage()` - Lấy error message
- `getNameErrorMessage()` - Lấy error message tên CLB
- `getImageErrorMessage()` - Lấy error message hình ảnh

### MatchingPage
**File:** `src/pages/matching.page.js`

**Methods:**
- `navigate()` - Điều hướng đến trang matching list
- `navigateToCreatePage()` - Điều hướng đến trang tạo trận đấu
- `navigateToManagePage()` - Điều hướng đến trang quản lý trận đấu
- `selectClub(clubName)` - Chọn câu lạc bộ
- `selectStadium(stadiumName)` - Chọn sân bóng
- `fillDate(date)` - Nhập ngày thi đấu
- `fillTime(time)` - Nhập giờ thi đấu
- `fillContactNumber(contactNumber)` - Nhập số điện thoại
- `fillDescription(description)` - Nhập mô tả
- `createMatch(matchData)` - Tạo trận đấu với thông tin đầy đủ
- `getAllErrorMessages()` - Lấy tất cả error messages
- `getMatchCount()` - Lấy số lượng trận đấu
- `hasCancelButton()` - Kiểm tra có nút hủy trận không

## 🔧 Configuration

### playwright.config.js

Cấu hình chính cho Playwright:
- Test directory: `./src/e2e`
- Timeout: 30s
- Browsers: Chromium, Firefox, WebKit, Mobile
- Reporters: HTML, List, JSON
- Screenshots: On failure
- Videos: On failure
- Traces: On failure

## 🏗️ Architecture & Design Patterns

### Page Object Model (POM)
Project sử dụng Page Object Model pattern để:
- Tách biệt test logic và page interactions
- Dễ dàng maintain khi UI thay đổi
- Tái sử dụng code giữa các tests
- Mỗi page có một class riêng extends từ `BasePage`

### BasePage Pattern
**File:** `src/common/base.page.js`

Tất cả page objects kế thừa từ `BasePage` để có:
- Common methods: `goto()`, `click()`, `fill()`, `waitFor()`
- Error handling consistency
- Screenshot utilities
- Logger integration

### Test Data Management
- Test data được tách riêng trong `src/test-data/`
- Dễ dàng update data mà không touch test code
- Có thể sử dụng data factories để generate dynamic data

### Constants Management
- Selectors: `src/constants/selectors.js`
- Routes: `src/constants/routes.js`
- Centralized configuration giúp dễ maintain

### Configuration Layers
1. **Environment Config** (`env.config.js`) - URLs, timeouts, credentials
2. **Test Config** (`test.config.js`) - Viewport, browser context, paths
3. **Playwright Config** (`playwright.config.js`) - Playwright settings

## 📋 Constants Reference

### Routes (`src/constants/routes.js`)
```javascript
ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  MATCHING: '/matching',
  MATCHING_CREATE: '/matching/create',
  MATCHING_MANAGE: '/matching/manage-match',
  COMMUNITY: '/',
  CLUB: '/club/create',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_STADIUM: '/admin/stadium',
}
```

### Selectors (`src/constants/selectors.js`)
Organized by page:
- `SELECTORS.LOGIN.*` - Login page elements
- `SELECTORS.COMMUNITY.*` - Community page elements
- `SELECTORS.TEAM.*` - Team/Club page elements
- `SELECTORS.MATCHING.*` - Matching page elements
- `SELECTORS.COMMON.*` - Common elements (loading, modal, toast)

### Environment Variables

Xem file `ENV.example` để biết tất cả các environment variables và cách sử dụng chi tiết.

**Quick Reference:**
```bash
# Development mode
HEADLESS=false
SLOW_MO=500
DEBUG=true

# CI/CD mode
HEADLESS=true
CI=true
VIDEO=false

# Debug failed tests
HEADLESS=false
SLOW_MO=1000
```

## 📚 Best Practices

1. **Page Object Model**: Sử dụng POM để tổ chức code tốt hơn
   - Mỗi page có một file riêng trong `src/pages/`
   - Kế thừa từ `BasePage` để sử dụng các methods chung
   - Định nghĩa selectors trong constructor

2. **Test Steps**: Chia test thành các steps nhỏ với `test.step()`
   - Mỗi step có mô tả rõ ràng
   - Dễ dàng debug khi test fail
   - Report chi tiết hơn

3. **Selectors**: Định nghĩa selectors trong `src/constants/selectors.js`
   - Tập trung quản lý selectors
   - Dễ dàng maintain khi UI thay đổi
   - Sử dụng các selector strategy tốt nhất (data-testid, role, text)

4. **Routes**: Định nghĩa routes trong `src/constants/routes.js`
   - Tập trung quản lý các routes của application
   - Dễ dàng update khi routes thay đổi

5. **Test Data**: Tổ chức test data trong `src/test-data/`
   - Tách biệt test data khỏi test logic
   - Có thể reuse data cho nhiều tests
   - Upload files test được lưu trong `src/test-data/uploads/`

6. **Fixtures**: Sử dụng custom fixtures để tái sử dụng code
   - Setup/teardown chung cho các tests
   - Authentication state management

7. **Logging**: Sử dụng logger utilities để debug
   - `info()` cho các actions quan trọng
   - `debug()` cho chi tiết debug
   - Logs được hiển thị trong terminal và reports

8. **Screenshots**: Tự động chụp screenshot khi test fail
   - Sử dụng `screenshot.utils.js`
   - Screenshots lưu trong `test-results/`

9. **Wait Strategies**: Sử dụng wait utilities thay vì hard-coded timeouts
   - `waitFor()` để đợi element visible
   - `waitForPageLoaded()` để đợi page load
   - Tránh dùng `page.waitForTimeout()` trừ khi thực sự cần thiết

10. **Error Handling**: Xử lý errors một cách graceful
    - Try-catch cho các operations có thể fail
    - Return null/false thay vì throw error trong helper methods
    - Log errors để dễ debug

## 🗂️ Test Data Reference

### users.data.js
**File:** `src/test-data/users.data.js`
- Dữ liệu user để test đăng nhập
- Email và password hợp lệ/không hợp lệ

### community.test-data.js
**File:** `src/test-data/community.test-data.js`
- Nội dung bài đăng test
- Dữ liệu cho các scenarios khác nhau

### team.test-data.js
**File:** `src/test-data/team.test-data.js`
- Thông tin CLB test
- Tên, mô tả, và đường dẫn hình ảnh

### matching.test-data.js
**File:** `src/test-data/matching.test-data.js`
- Thông tin trận đấu test
- Club, stadium, date, time, contact

### Upload Files
**Folder:** `src/test-data/uploads/`
- `arsenal.png` - Hình ảnh hợp lệ cho bài đăng
- `team-test.jpg` - Hình ảnh cho CLB
- `test-file.exe` - File không hợp lệ để test validation
- `test-file.txt` - File text để test validation

## 🛠️ Utilities Reference

### logger.utils.js
**File:** `src/utils/logger.utils.js`
- `info(message)` - Log thông tin quan trọng
- `debug(message)` - Log chi tiết debug
- `error(message)` - Log errors

### wait.utils.js
**File:** `src/utils/wait.utils.js`
- Wait utilities để xử lý các tình huống chờ đợi
- Tránh sử dụng hard-coded timeouts

### validation.utils.js
**File:** `src/utils/validation.utils.js`
- Validation helpers cho email, password, etc.
- Kiểm tra format và độ dài

### data.utils.js
**File:** `src/utils/data.utils.js`
- Generate test data động
- Random strings, dates, etc.

### screenshot.utils.js
**File:** `src/utils/screenshot.utils.js`
- Chụp screenshot với tên custom
- Lưu screenshot vào thư mục test-results

## 🐛 Troubleshooting

### Tests fail with timeout

- Tăng timeout trong `playwright.config.js`
- Kiểm tra application đã chạy chưa
- Kiểm tra network connection

### Browsers không cài đặt

```bash
npm run install:browsers
```

### Selectors không tìm thấy elements

- Cập nhật selectors trong `src/constants/selectors.js`
- Sử dụng Playwright Inspector để debug: `npm run test:debug`
- Kiểm tra element có đúng visible state không
- Thử sử dụng nhiều selector strategies (CSS, XPath, text, role)

### Tests fail intermittently (flaky tests)

- Thêm proper wait conditions thay vì hard-coded timeouts
- Sử dụng `waitFor()` để đợi element visible/hidden
- Kiểm tra network requests đã hoàn thành chưa
- Tăng stability với `page.waitForLoadState('networkidle')`

### File upload không hoạt động

- Kiểm tra đường dẫn file đúng chưa (absolute path)
- Verify file selector đúng: `input[type="file"]`
- Sử dụng `setInputFiles()` thay vì `click()` để upload

### Test data không đúng

- Kiểm tra file `.env` có đúng không
- Verify `BASE_URL` và `API_URL` trong env config
- Check test data files trong `src/test-data/`

## 💡 Tips & Tricks

### 1. Debug một test cụ thể

```bash
# Chạy một test file với debug mode
npm run test:debug src/e2e/login.spec.js

# Chạy một test case cụ thể (grep by name)
npm test -- --grep "TC01"
```

### 2. Xem trace của test failed

```bash
# Sau khi test fail, mở trace viewer
npx playwright show-trace test-results/<test-name>/trace.zip
```

### 3. Update snapshot nếu UI thay đổi

```bash
# Update tất cả screenshots/snapshots
npm test -- --update-snapshots
```

### 4. Chạy tests trên port khác

```bash
# Update BASE_URL trong .env hoặc
BASE_URL=http://localhost:3000 npm test
```

### 5. Sử dụng Codegen để generate selectors

```bash
npm run codegen
# Sau đó interact với app, Playwright sẽ generate code
```

### 6. Chạy specific browser với headed mode

```bash
# Chromium với UI
npm run test:chromium -- --headed

# Firefox với debug
npm run test:firefox -- --debug
```

### 7. Filter tests by tag

Thêm tag vào test:
```javascript
test.only('TC01 - Test with tag', async ({ page }) => {
  // This test will run exclusively
});

test.skip('TC02 - Skip this test', async ({ page }) => {
  // This test will be skipped
});
```

### 8. Parallel vs Serial execution

```bash
# Chạy parallel với 4 workers (nhanh hơn)
npm run test:parallel

# Chạy serial (chậm nhưng ổn định hơn)
npm run test:serial

# Custom số workers
npm test -- --workers=2
```

## 📚 Documentation Files

### Internal Documentation
- **[README.md](./README.md)** - Tài liệu chính (file này)
- **[QUICK_START.md](./QUICK_START.md)** - Hướng dẫn bắt đầu nhanh 5 phút
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Hướng dẫn contribute và viết tests
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Chi tiết cấu trúc project

### External Resources
- [Playwright Documentation](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)

## 📧 Contact

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trong repository.

## 📄 License

MIT

