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

### 🔐 Authentication & Login (38 test cases)
- **UI Display Tests (9 TCs)**: Kiểm tra hiển thị các elements trên trang login
- **Validation Tests (4 TCs)**: Kiểm tra validation email, password, form rỗng
- **Authentication Tests (3 TCs)**: Đăng nhập thành công, sai mật khẩu, email không tồn tại
- **Token Tests (3 TCs)**: Kiểm tra lưu token, reload trang, mở tab mới
- **Navigation Tests (3 TCs)**: Forgot password, Google login, Register
- **Forgot Password Tests (5 TCs)**: Reset password flow validation
- **Security Tests (7 TCs)**: Password masking, SQL injection, XSS, rate limiting, token expiration
- **Accessibility Tests (4 TCs)**: Tab navigation, Enter key, error display, loading spinner
- **Responsive Tests (2 TCs)**: Mobile, tablet, desktop

### 📝 Community/Posts (6 test cases)
- **TC01**: Đăng bài chỉ có text - Kiểm tra đăng bài text đơn giản
- **TC02**: Đăng bài có hình ảnh Arsenal - Kiểm tra upload và hiển thị ảnh
- **TC03**: Đăng bài rỗng - Kiểm tra validation bài đăng không có nội dung
- **TC04**: Kiểm tra thứ tự hiển thị bài đăng - Bài mới nhất lên đầu
- **TC05**: Hiển thị thông tin người đăng - Avatar, username, thời gian
- **TC06**: Hiển thị ảnh bài đăng - Kiểm tra ảnh hiển thị đúng kích thước

### ⚽ Team/Club Management (4 test cases)
- **TC01**: Upload ảnh đội bóng hợp lệ - Kiểm tra upload file ảnh PNG/JPG
- **TC02**: Upload file không hợp lệ - Kiểm tra thông báo lỗi file sai định dạng (.exe, .txt)
- **TC03**: Tạo CLB thành công - Kiểm tra tạo đội hợp lệ với đầy đủ thông tin
- **TC04**: Thiếu tên CLB - Kiểm tra lỗi khi không nhập tên đội

### 🏆 Matching (Trận đấu) (4 test cases)
- **TC01**: Mở form "Tạo trận bóng" - Kiểm tra hiển thị form tạo trận
- **TC02**: Tạo trận bóng hợp lệ - Kiểm tra tạo trận thành công
- **TC03**: Tạo trận bóng thiếu thông tin - Kiểm tra validation các trường bắt buộc
- **TC04**: Quản lý trận bóng - Kiểm tra danh sách trận đã tạo

### 🔔 Notifications (3 test cases)
- **TC01**: Kiểm tra hiển thị danh sách thông báo - Hiển thị list thông báo
- **TC02**: Kiểm tra giao diện khi không có thông báo - Empty state
- **TC03**: Kiểm tra thay đổi trạng thái thông báo - Đánh dấu đã đọc

### 👤 User Profile (4 test cases)
- **TC01**: Hiển thị thông tin user đúng - Username, email, phone, avatar
- **TC02**: Cập nhật username thành công - Edit và save thông tin
- **TC03**: Hiển thị lỗi khi email không hợp lệ - Validation email format
- **TC04**: Upload avatar hợp lệ thành công - Kiểm tra upload ảnh đại diện

### 🚪 Logout (2 test cases)
- **TC01**: Đăng xuất thành công và quay về trang đăng nhập
- **TC02**: Bị chuyển hướng về trang login khi chưa đăng nhập

## 📊 Tổng quan Test Coverage

| Module | Test Cases | Status |
|--------|-----------|--------|
| Login & Authentication | 38 | ✅ |
| Community/Posts | 6 | ✅ |
| Team/Club | 4 | ✅ |
| Matching | 4 | ✅ |
| Notifications | 3 | ✅ |
| User Profile | 4 | ✅ |
| Logout | 2 | ✅ |
| **TOTAL** | **61** | **✅** |

## 📁 Cấu trúc thư mục

```
matching_queue_auto_test/
├── src/                   # Source code
│   ├── config/           # Cấu hình chung
│   │   ├── env.config.js      # Environment configuration (BASE_URL, API_URL, timeout, retry)
│   │   └── test.config.js     # Test configuration (viewport, browser context, paths)
│   ├── constants/        # Constants và định nghĩa
│   │   ├── routes.js         # Application routes (login, matching, community, admin)
│   │   └── selectors.js      # Element selectors (login, community, team, matching, notifications, user-profile, logout)
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
│   │   ├── base.fixtures.js  # Base fixtures (authenticated session)
│   │   └── index.js         # Fixtures export
│   ├── pages/         # Page Object Models
│   │   ├── login.page.js        # Login page (38 TCs)
│   │   ├── community.page.js    # Community page (6 TCs)
│   │   ├── team.page.js         # Team/Club page (4 TCs)
│   │   ├── matching.page.js     # Matching page (4 TCs)
│   │   ├── notification.page.js # Notification page (3 TCs)
│   │   ├── user-profile.page.js # User Profile page (4 TCs)
│   │   ├── logout.page.js       # Logout page (2 TCs)
│   │   └── index.js            # Pages export
│   ├── helpers/       # Helper functions
│   │   ├── auth.helper.js  # Authentication helpers
│   │   └── index.js       # Helpers export
│   ├── test-data/     # Test data
│   │   ├── users.data.js         # User test data
│   │   ├── community.test-data.js # Community test data
│   │   ├── team.test-data.js     # Team test data
│   │   ├── matching.test-data.js # Matching test data
│   │   ├── user-profile.test-data.js # User profile test data
│   │   ├── uploads/             # Test files for upload
│   │   │   ├── arsenal.png      # Image for testing
│   │   │   ├── team-test.jpg    # Team image
│   │   │   ├── test-file.exe    # Invalid file type
│   │   │   └── test-file.txt    # Text file for testing
│   │   └── index.js            # Test data export
│   └── e2e/          # E2E test cases
│       ├── login.spec.js        # Login test cases (38 tests)
│       ├── community.spec.js    # Community/Post test cases (6 tests)
│       ├── team.spec.js         # Team/Club test cases (4 tests)
│       ├── matching.spec.js     # Matching test cases (4 tests)
│       ├── notification.spec.js # Notification test cases (3 tests)
│       ├── user-profile.spec.js # User Profile test cases (4 tests)
│       └── logout.spec.js       # Logout test cases (2 tests)
├── docs/                  # Documentation
│   ├── login-page.md          # Login page & tests explanation
│   ├── community-page.md      # Community page & tests explanation
│   ├── team-page.md           # Team page & tests explanation
│   ├── matching-page.md       # Matching page & tests explanation
│   ├── notification-page.md   # Notification page & tests explanation
│   ├── user-profile-page.md   # User Profile page & tests explanation
│   └── logout-page.md         # Logout page & tests explanation
├── playwright.config.js # Playwright configuration
├── package.json        # Dependencies
├── .env               # Environment variables
├── README.md          # Main documentation (this file)
├── QUICK_START.md     # Quick start guide
├── PROJECT_STRUCTURE.md # Detailed project structure
└── CONTRIBUTING.md    # Contributing guidelines
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
# Copy file env.example sang .env
cp env.example .env

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
# Login tests (38 test cases)
npm run test:login

# Community tests (6 test cases)
npm test src/e2e/community.spec.js

# Team/Club tests (4 test cases)
npm test src/e2e/team.spec.js

# Matching tests (4 test cases)
npm test src/e2e/matching.spec.js

# Notification tests (3 test cases)
npm test src/e2e/notification.spec.js

# User Profile tests (4 test cases)
npm test src/e2e/user-profile.spec.js

# Logout tests (2 test cases)
npm test src/e2e/logout.spec.js
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

## 📖 Page Objects Reference

### LoginPage
**File:** `src/pages/login.page.js`  
**Test Coverage:** 42 test cases

**Key Methods:**
- `navigate()` - Điều hướng đến trang login
- `login(email, password)` - Thực hiện đăng nhập
- `enterEmail(email)` - Nhập email
- `enterPassword(password)` - Nhập password
- `clickSubmit()` - Click nút đăng nhập
- `getErrorMessage()` - Lấy error message
- `getAuthToken()` - Lấy token từ localStorage
- `isPasswordMasked()` - Kiểm tra password bị che

**Chi tiết:** Xem [docs/login-page.md](docs/login-page.md)

### CommunityPage
**File:** `src/pages/community.page.js`  
**Test Coverage:** 6 test cases

**Key Methods:**
- `navigate()` - Điều hướng đến trang community
- `clickCreatePostButton()` - Click nút tạo bài đăng
- `enterPostContent(content)` - Nhập nội dung bài đăng (CKEditor5)
- `uploadImage(imagePath)` - Upload hình ảnh
- `createTextPost(content)` - Tạo bài đăng text
- `createImagePost(content, imagePath)` - Tạo bài đăng có hình ảnh
- `getFirstPost()` - Lấy bài đăng đầu tiên
- `verifyPostAtTop(expectedContent)` - Kiểm tra bài đăng ở đầu list

**Chi tiết:** Xem [docs/community-page.md](docs/community-page.md)

### TeamPage
**File:** `src/pages/team.page.js`  
**Test Coverage:** 4 test cases

**Key Methods:**
- `navigate()` - Điều hướng đến trang tạo team
- `fillTeamName(teamName)` - Nhập tên CLB
- `fillTeamDescription(description)` - Nhập mô tả CLB
- `uploadTeamImage(filePath)` - Upload hình ảnh CLB
- `createTeam(teamData)` - Tạo CLB với thông tin đầy đủ
- `isImagePreviewVisible()` - Kiểm tra preview hình ảnh
- `getNameErrorMessage()` - Lấy error message tên CLB

**Chi tiết:** Xem [docs/team-page.md](docs/team-page.md)

### MatchingPage
**File:** `src/pages/matching.page.js`  
**Test Coverage:** 4 test cases

**Key Methods:**
- `navigateToCreatePage()` - Điều hướng đến trang tạo trận đấu
- `navigateToManagePage()` - Điều hướng đến trang quản lý trận đấu
- `selectClub(clubName)` - Chọn câu lạc bộ
- `selectStadium(stadiumName)` - Chọn sân bóng
- `fillDate(date)` - Nhập ngày thi đấu
- `fillTime(time)` - Nhập giờ thi đấu
- `createMatch(matchData)` - Tạo trận đấu với thông tin đầy đủ
- `getAllErrorMessages()` - Lấy tất cả error messages

**Chi tiết:** Xem [docs/matching-page.md](docs/matching-page.md)

### NotificationPage
**File:** `src/pages/notification.page.js`  
**Test Coverage:** 3 test cases

**Key Methods:**
- `navigate()` - Điều hướng đến trang thông báo
- `getNotificationCount()` - Lấy số lượng thông báo
- `getFirstNotificationText()` - Lấy text thông báo đầu tiên
- `clickMarkAsReadButton()` - Đánh dấu đã đọc
- `isNotificationUnread(index)` - Kiểm tra thông báo chưa đọc
- `getUnreadNotificationCount()` - Lấy số thông báo chưa đọc

**Chi tiết:** Xem [docs/notification-page.md](docs/notification-page.md)

### UserProfilePage
**File:** `src/pages/user-profile.page.js`  
**Test Coverage:** 4 test cases

**Key Methods:**
- `navigate()` - Điều hướng đến trang profile
- `getUserInfo()` - Lấy thông tin user (username, email, phone)
- `clickEditButton()` - Click nút chỉnh sửa
- `updateUsername(newUsername)` - Cập nhật username
- `updateEmail(newEmail)` - Cập nhật email
- `uploadAvatar(filePath)` - Upload avatar mới
- `clickSaveButton()` - Lưu thay đổi

**Chi tiết:** Xem [docs/user-profile-page.md](docs/user-profile-page.md)

### LogoutPage
**File:** `src/pages/logout.page.js`  
**Test Coverage:** 2 test cases

**Key Methods:**
- `clickLogoutButton()` - Nhấn nút đăng xuất
- `isOnLoginPage()` - Kiểm tra đã về trang login
- `isLoginFormVisible()` - Kiểm tra form login hiển thị
- `isLogoutButtonVisible()` - Kiểm tra nút logout hiển thị

**Chi tiết:** Xem [docs/logout-page.md](docs/logout-page.md)

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

### Fixtures Pattern
**File:** `src/fixtures/base.fixtures.js`

Custom fixtures cho Playwright:
- `authenticatedPage` - Page đã đăng nhập sẵn
- Tự động setup/teardown
- Quản lý authentication state

### Test Data Management
- Test data được tách riêng trong `src/test-data/`
- Dễ dàng update data mà không touch test code
- Có thể sử dụng data factories để generate dynamic data

## 📋 Constants Reference

### Routes (`src/constants/routes.js`)
```javascript
ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/',
  MATCHING: '/matching',
  MATCHING_CREATE: '/matching/create',
  MATCHING_MANAGE: '/matching/manage-match',
  COMMUNITY: '/',
  CLUB: '/club/create',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
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
- `SELECTORS.NOTIFICATION.*` - Notification page elements
- `SELECTORS.USER_PROFILE.*` - User Profile page elements
- `SELECTORS.LOGOUT.*` - Logout page elements
- `SELECTORS.COMMON.*` - Common elements (loading, modal, toast)

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

4. **Test Data**: Tổ chức test data trong `src/test-data/`
   - Tách biệt test data khỏi test logic
   - Có thể reuse data cho nhiều tests
   - Upload files test được lưu trong `src/test-data/uploads/`

5. **Fixtures**: Sử dụng custom fixtures để tái sử dụng code
   - Setup/teardown chung cho các tests
   - Authentication state management
   - `authenticatedPage` fixture tự động đăng nhập

6. **Logging**: Sử dụng logger utilities để debug
   - `info()` cho các actions quan trọng
   - `debug()` cho chi tiết debug
   - Logs được hiển thị trong terminal và reports

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

### Tests fail intermittently (flaky tests)

- Thêm proper wait conditions thay vì hard-coded timeouts
- Sử dụng `waitFor()` để đợi element visible/hidden
- Kiểm tra network requests đã hoàn thành chưa

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

### 3. Chạy tests trên port khác

```bash
# Update BASE_URL trong .env hoặc
BASE_URL=http://localhost:3000 npm test
```

### 4. Sử dụng Codegen để generate selectors

```bash
npm run codegen
# Sau đó interact với app, Playwright sẽ generate code
```

## 📚 Documentation Files

### Internal Documentation
- **[README.md](./README.md)** - Tài liệu chính (file này)
- **[QUICK_START.md](./QUICK_START.md)** - Hướng dẫn bắt đầu nhanh 5 phút
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Hướng dẫn contribute và viết tests
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Chi tiết cấu trúc project

### Page Documentation (docs/)
- **[docs/login-page.md](docs/login-page.md)** - Login page code & test cases explanation
- **[docs/community-page.md](docs/community-page.md)** - Community page code & test cases explanation
- **[docs/team-page.md](docs/team-page.md)** - Team page code & test cases explanation
- **[docs/matching-page.md](docs/matching-page.md)** - Matching page code & test cases explanation
- **[docs/notification-page.md](docs/notification-page.md)** - Notification page code & test cases explanation
- **[docs/user-profile-page.md](docs/user-profile-page.md)** - User Profile page code & test cases explanation
- **[docs/logout-page.md](docs/logout-page.md)** - Logout page code & test cases explanation

### External Resources
- [Playwright Documentation](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)

## 📧 Contact

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trong repository.

## 📄 License

MIT

---

**Total Test Cases: 61**  
**Total Lines of Code: ~8000+ LOC**  
**Last Updated:** October 2025
