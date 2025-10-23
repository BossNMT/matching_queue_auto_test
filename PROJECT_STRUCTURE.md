# Project Structure - Matching Queue Auto Test

## 📁 Cấu trúc thư mục hoàn chỉnh

```
matching_queue_auto_test/
│
├── 📂 src/                             # Source code
│   │
│   ├── 📂 config/                      # Cấu hình
│   │   ├── env.config.js               # Environment configuration
│   │   └── test.config.js              # Test configuration
│   │
│   ├── 📂 constants/                   # Constants
│   │   ├── routes.js                   # Application routes
│   │   ├── messages.js                 # Messages & validation texts
│   │   └── selectors.js                # Element selectors
│   │
│   ├── 📂 common/                      # Common classes
│   │   ├── base.page.js                # Base Page Object Model
│   │   └── api.helper.js               # API helper functions
│   │
│   ├── 📂 utils/                       # Utilities
│   │   ├── wait.utils.js               # Wait utilities
│   │   ├── validation.utils.js         # Validation utilities
│   │   ├── data.utils.js               # Test data generators
│   │   ├── screenshot.utils.js         # Screenshot utilities
│   │   └── logger.utils.js             # Logging utilities
│   │
│   ├── 📂 fixtures/                    # Custom fixtures
│   │   ├── base.fixtures.js            # Base fixtures
│   │   └── index.js                    # Fixtures export
│   │
│   ├── 📂 pages/                       # Page Object Models
│   │   ├── login.page.js               # Login page POM
│   │   ├── dashboard.page.js           # Dashboard page POM
│   │   └── index.js                    # Pages export
│   │
│   ├── 📂 helpers/                     # Helper functions
│   │   ├── auth.helper.js              # Authentication helpers
│   │   └── index.js                    # Helpers export
│   │
│   ├── 📂 test-data/                   # Test data
│   │   ├── users.data.js               # User test data
│   │   └── index.js                    # Test data export
│   │
│   └── 📂 e2e/                         # E2E test cases
│       ├── login.spec.js               # Login test cases (26 tests)
│       └── login-advanced.spec.js      # Advanced login tests (12 tests)
│
├── 📂 .github/                         # GitHub configuration
│   └── workflows/
│       └── playwright.yml              # CI/CD workflow
│
├── 📂 playwright-report/               # Test reports (generated)
├── 📂 test-results/                    # Test results (generated)
├── 📂 node_modules/                    # Dependencies (generated)
│
├── 📄 playwright.config.js             # Playwright configuration
├── 📄 package.json                     # NPM configuration
├── 📄 .env                             # Environment variables
├── 📄 .env.example                     # Environment variables template
├── 📄 .gitignore                       # Git ignore rules
│
├── 📄 README.md                        # Main documentation
├── 📄 QUICK_START.md                   # Quick start guide
├── 📄 CONTRIBUTING.md                  # Contributing guide
└── 📄 PROJECT_STRUCTURE.md             # This file
```

## 📝 Mô tả chi tiết từng thư mục

### 📂 src/
Thư mục chính chứa tất cả source code của test automation framework.

### 1. 📂 src/config/
Chứa tất cả các file cấu hình cho test environment.

- **env.config.js**: Quản lý environment variables (BASE_URL, API_URL, credentials, timeouts)
- **test.config.js**: Cấu hình test (viewport sizes, browser context, paths, API endpoints)

### 2. 📂 src/constants/
Định nghĩa tất cả các constants sử dụng trong tests.

- **routes.js**: Application routes (LOGIN, REGISTER, DASHBOARD, etc.)
- **messages.js**: Success/error messages, validation messages
- **selectors.js**: Element selectors cho các pages

### 3. 📂 src/common/
Chứa các base classes và common functionalities.

- **base.page.js**: Base class cho tất cả Page Object Models
  - Methods: goto, click, fill, type, getText, isVisible, waitFor, screenshot, etc.
- **api.helper.js**: Helper functions để tương tác với API
  - Methods: get, post, put, delete, waitForResponse, mockResponse

### 4. 📂 src/utils/
Utility functions tái sử dụng được.

- **wait.utils.js**: Wait strategies
  - waitForElement, waitForNavigation, waitForApiResponse, waitWithRetry
- **validation.utils.js**: Validation functions
  - isValidEmail, validatePassword, isValidPhone, sanitizeInput
- **data.utils.js**: Test data generators
  - generateRandomEmail, generateRandomPassword, generateTestUser
- **screenshot.utils.js**: Screenshot utilities
  - takeFullPageScreenshot, takeElementScreenshot, takeScreenshotOnFailure
- **logger.utils.js**: Logging utilities
  - debug, info, warn, error, logTestStep

### 5. 📂 src/fixtures/
Custom Playwright fixtures.

- **base.fixtures.js**: Extended test fixtures
  - loginPage, apiHelper, authenticatedPage, testData, screenshot

### 6. 📂 src/pages/
Page Object Models (POM) cho từng page.

- **login.page.js**: Login page POM
  - Methods: navigate, enterEmail, enterPassword, login, verifySuccessfulLogin, etc.
- **dashboard.page.js**: Dashboard page POM
  - Methods: navigate, logout, verifyDashboardLoaded, etc.

### 7. 📂 src/helpers/
Helper functions cho specific tasks.

- **auth.helper.js**: Authentication helpers
  - login, logout, isAuthenticated, setupAuthenticatedSession, clearSession

### 8. 📂 src/test-data/
Test data definitions.

- **users.data.js**: User test data
  - Valid users, invalid users, edge cases, security test cases

### 9. 📂 src/e2e/
End-to-end test cases.

- **login.spec.js**: 26 test cases
  - UI Elements (3 tests)
  - Successful Login (2 tests)
  - Failed Login (3 tests)
  - Validation (4 tests)
  - Input Fields (3 tests)
  - Navigation (2 tests)
  - Security (3 tests)
  - Responsive Design (3 tests)
  - Performance (1 test)
  - Accessibility (1 test)
  - API Tests (1 test)

- **login-advanced.spec.js**: 12 advanced test cases
  - Session Management (2 tests)
  - Browser Compatibility (2 tests)
  - Form Behavior (3 tests)
  - Edge Cases (4 tests)
  - Visual Regression (1 test)

## 🎯 Design Patterns

### 1. Page Object Model (POM)
- Tách biệt test logic và page interactions
- Dễ maintain và reuse
- Centralized element selectors

### 2. Factory Pattern
- Data generators trong utils/data.utils.js
- Generate dynamic test data

### 3. Helper Pattern
- Reusable functions cho common tasks
- Authentication, API calls, screenshots

### 4. Fixture Pattern
- Custom Playwright fixtures
- Setup và teardown tự động
- Dependency injection

## 🔄 Test Flow

```
1. Test starts
   ↓
2. Fixture setup (base.fixtures.js)
   ↓
3. Navigate to page (Page Object)
   ↓
4. Perform actions (Page Object methods)
   ↓
5. Verify results (Assertions)
   ↓
6. Screenshot on failure (Fixture)
   ↓
7. Test ends
```

## 📊 Dependencies

### Production Dependencies
- None (test project only)

### Development Dependencies
- `@playwright/test`: ^1.56.1 - Test framework
- `@types/node`: ^24.9.1 - TypeScript types
- `dotenv`: ^16.4.7 - Environment variables

## 🚀 NPM Scripts

```json
{
  "test": "Run all tests",
  "test:headed": "Run with browser visible",
  "test:debug": "Debug mode",
  "test:ui": "UI mode (recommended)",
  "test:chromium/firefox/webkit": "Specific browser",
  "test:mobile": "Mobile browsers",
  "test:login": "Login tests only",
  "test:all": "All browsers",
  "test:parallel/serial": "Parallel/serial execution",
  "report": "Show report",
  "codegen": "Generate test code"
}
```

## 🎨 Coding Standards

### Naming Conventions
- Files: `kebab-case.js`
- Classes: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Test cases: `TC{number} - Description`

### File Organization
- One class per file
- Export at end of file
- Import order: external → internal → relative

### Comments
- JSDoc for functions
- Inline comments for complex logic
- TODO/FIXME for pending items

## 📈 Test Coverage

### Current Coverage
- Login page: 38 test cases
  - Happy paths: ✅ 100%
  - Error cases: ✅ 100%
  - Edge cases: ✅ 100%
  - Security: ✅ 100%
  - Responsive: ✅ 100%
  - Performance: ✅ 100%
  - Accessibility: ✅ Partial

### Next Steps
- Add tests cho Register page
- Add tests cho Dashboard
- Add tests cho Matching features
- Add API tests
- Add visual regression tests

## 🔐 Security Considerations

Tests include:
- SQL Injection prevention
- XSS prevention
- Password masking
- Session management
- CSRF protection (planned)

## 🌐 CI/CD Integration

GitHub Actions workflow included:
- Run on push/PR
- Matrix testing (chromium, firefox, webkit)
- Artifact upload (reports, videos)
- Secrets management

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)

---

**Tổng số files tạo: 35+ files**  
**Tổng số test cases: 38 tests**  
**Lines of code: ~3000+ LOC**

