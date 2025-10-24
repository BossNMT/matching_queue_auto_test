# Matching Queue Auto Test

Automated E2E testing suite cho Matching Queue application sử dụng Playwright framework.

## 📁 Cấu trúc thư mục

```
matching_queue_auto_test/
├── src/                   # Source code
│   ├── config/           # Cấu hình chung
│   │   ├── env.config.js      # Environment configuration
│   │   └── test.config.js     # Test configuration
│   ├── constants/        # Constants và định nghĩa
│   │   ├── routes.js         # Application routes
│   │   ├── messages.js       # Messages và validation
│   │   └── selectors.js      # Element selectors
│   ├── common/          # Common classes
│   │   ├── base.page.js     # Base Page Object Model
│   │   └── api.helper.js    # API helper functions
│   ├── utils/          # Utility functions
│   │   ├── wait.utils.js   # Wait utilities
│   │   ├── validation.utils.js # Validation utilities
│   │   ├── data.utils.js   # Test data generators
│   │   ├── screenshot.utils.js # Screenshot utilities
│   │   └── logger.utils.js # Logging utilities
│   ├── fixtures/       # Custom fixtures
│   │   ├── base.fixtures.js # Base fixtures
│   │   └── index.js        # Fixtures export
│   ├── pages/         # Page Object Models
│   │   ├── login.page.js # Login page
│   │   ├── dashboard.page.js # Dashboard page
│   │   └── index.js      # Pages export
│   ├── helpers/       # Helper functions
│   │   ├── auth.helper.js # Authentication helpers
│   │   └── index.js      # Helpers export
│   ├── test-data/     # Test data
│   │   ├── users.data.js # User test data
│   │   └── index.js      # Test data export
│   └── e2e/          # E2E test cases
│       ├── login.spec.js # Login test cases
│       └── login-advanced.spec.js # Advanced login tests
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

# Advanced login tests
npm run test:login-advanced
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

export class YourPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      // Define your selectors
    };
  }

  async yourMethod() {
    // Implement your methods
  }
}
```

### 2. Viết test cases

```javascript
// e2e/your-feature.spec.js
import { test, expect } from '../fixtures/index.js';
import { YourPage } from '../pages/your-page.page.js';

test.describe('Your Feature Tests', () => {
  test('TC01 - Test description', async ({ page }) => {
    const yourPage = new YourPage(page);
    
    await test.step('Step description', async () => {
      // Your test logic
    });
  });
});
```

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
2. **Test Steps**: Chia test thành các steps nhỏ với `test.step()`
3. **Selectors**: Định nghĩa selectors trong `src/constants/selectors.js`
4. **Fixtures**: Sử dụng custom fixtures để tái sử dụng code
5. **Logging**: Sử dụng logger utilities để debug
6. **Screenshots**: Tự động chụp screenshot khi test fail
7. **Wait Strategies**: Sử dụng wait utilities thay vì hard-coded timeouts

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

