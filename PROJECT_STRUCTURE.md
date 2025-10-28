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
│   │   ├── base.fixtures.js            # Base fixtures (authenticated session)
│   │   └── index.js                    # Fixtures export
│   │
│   ├── 📂 pages/                       # Page Object Models
│   │   ├── login.page.js               # Login page POM (42 TCs)
│   │   ├── community.page.js           # Community page POM (6 TCs)
│   │   ├── team.page.js                # Team/Club page POM (4 TCs)
│   │   ├── matching.page.js            # Matching page POM (4 TCs)
│   │   ├── notification.page.js        # Notification page POM (3 TCs)
│   │   ├── user-profile.page.js        # User Profile page POM (4 TCs)
│   │   ├── logout.page.js              # Logout page POM (2 TCs)
│   │   └── index.js                    # Pages export
│   │
│   ├── 📂 helpers/                     # Helper functions
│   │   ├── auth.helper.js              # Authentication helpers
│   │   └── index.js                    # Helpers export
│   │
│   ├── 📂 test-data/                   # Test data
│   │   ├── users.data.js               # User test data
│   │   ├── community.test-data.js      # Community test data
│   │   ├── team.test-data.js           # Team test data
│   │   ├── matching.test-data.js       # Matching test data
│   │   ├── user-profile.test-data.js   # User profile test data
│   │   ├── uploads/                    # Test files for upload
│   │   │   ├── arsenal.png             # Image for testing
│   │   │   ├── team-test.jpg           # Team image
│   │   │   ├── test-file.exe           # Invalid file type
│   │   │   └── test-file.txt           # Text file for testing
│   │   └── index.js                    # Test data export
│   │
│   └── 📂 e2e/                         # E2E test cases
│       ├── login.spec.js               # Login test cases (42 tests)
│       ├── community.spec.js           # Community test cases (6 tests)
│       ├── team.spec.js                # Team test cases (4 tests)
│       ├── matching.spec.js            # Matching test cases (4 tests)
│       ├── notification.spec.js        # Notification test cases (3 tests)
│       ├── user-profile.spec.js        # User Profile test cases (4 tests)
│       └── logout.spec.js              # Logout test cases (2 tests)
│
├── 📂 docs/                            # Documentation
│   ├── login-page.md                   # Login page & tests explanation
│   ├── community-page.md               # Community page & tests explanation
│   ├── team-page.md                    # Team page & tests explanation
│   ├── matching-page.md                # Matching page & tests explanation
│   ├── notification-page.md            # Notification page & tests explanation
│   ├── user-profile-page.md            # User Profile page & tests explanation
│   └── logout-page.md                  # Logout page & tests explanation
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
├── 📄 env.example                      # Environment variables template
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

- **env.config.js**: Quản lý environment variables
  - BASE_URL: `http://localhost:5173`
  - API_URL: `http://localhost:3000/api`
  - TEST_USER credentials
  - Timeouts, retries
  
- **test.config.js**: Cấu hình test
  - Viewport sizes
  - Browser context
  - Paths
  - API endpoints

### 2. 📂 src/constants/
Định nghĩa tất cả các constants sử dụng trong tests.

- **routes.js**: Application routes
  - LOGIN, REGISTER, FORGOT_PASSWORD
  - DASHBOARD, COMMUNITY
  - MATCHING, MATCHING_CREATE, MATCHING_MANAGE
  - CLUB, PROFILE, NOTIFICATIONS
  - ADMIN routes
  
- **selectors.js**: Element selectors cho các pages
  - LOGIN selectors (email, password, buttons, errors)
  - COMMUNITY selectors (posts, images, create button)
  - TEAM selectors (team name, description, image upload)
  - MATCHING selectors (club, stadium, date, time)
  - NOTIFICATION selectors (list, items, actions)
  - USER_PROFILE selectors (username, email, phone, avatar)
  - LOGOUT selectors (logout button)

### 3. 📂 src/common/
Chứa các base classes và common functionalities.

- **base.page.js**: Base class cho tất cả Page Object Models
  - Methods: `goto()`, `click()`, `fill()`, `type()`, `getText()`
  - Methods: `isVisible()`, `waitFor()`, `screenshot()`
  - Methods: `getCurrentUrl()`, `getTitle()`
  
- **api.helper.js**: Helper functions để tương tác với API
  - Methods: `get()`, `post()`, `put()`, `delete()`
  - Methods: `waitForResponse()`, `mockResponse()`

### 4. 📂 src/utils/
Utility functions tái sử dụng được.

- **wait.utils.js**: Wait strategies
  - `waitForElement()`, `waitForNavigation()`
  - `waitForApiResponse()`, `waitWithRetry()`
  
- **validation.utils.js**: Validation functions
  - `isValidEmail()`, `validatePassword()`
  - `isValidPhone()`, `sanitizeInput()`
  
- **data.utils.js**: Test data generators
  - `generateRandomEmail()`, `generateRandomPassword()`
  - `generateTestUser()`, `generateTimestamp()`
  
- **screenshot.utils.js**: Screenshot utilities
  - `takeFullPageScreenshot()`, `takeElementScreenshot()`
  - `takeScreenshotOnFailure()`
  
- **logger.utils.js**: Logging utilities
  - `debug()`, `info()`, `warn()`, `error()`
  - `logTestStep()`

### 5. 📂 src/fixtures/
Custom Playwright fixtures.

- **base.fixtures.js**: Extended test fixtures
  - `authenticatedPage`: Page đã đăng nhập sẵn
  - Tự động setup/teardown
  - Authentication state management

### 6. 📂 src/pages/
Page Object Models (POM) cho từng page.

- **login.page.js**: Login page POM (42 test cases)
  - Authentication flow
  - Validation
  - Token management
  - Security features
  
- **community.page.js**: Community page POM (6 test cases)
  - Create posts (text, image)
  - Display posts
  - Post information
  
- **team.page.js**: Team/Club page POM (4 test cases)
  - Create team
  - Upload team image
  - Validation
  
- **matching.page.js**: Matching page POM (4 test cases)
  - Create match
  - Manage matches
  - Form validation
  
- **notification.page.js**: Notification page POM (3 test cases)
  - Display notifications
  - Mark as read
  - Empty state
  
- **user-profile.page.js**: User Profile page POM (4 test cases)
  - Display user info
  - Update profile
  - Upload avatar
  - Validation
  
- **logout.page.js**: Logout page POM (2 test cases)
  - Logout flow
  - Redirect validation

### 7. 📂 src/helpers/
Helper functions cho specific tasks.

- **auth.helper.js**: Authentication helpers
  - `login()`, `logout()`
  - `isAuthenticated()`
  - `setupAuthenticatedSession()`
  - `clearSession()`

### 8. 📂 src/test-data/
Test data definitions.

- **users.data.js**: User test data
  - Valid users
  - Invalid users (email format, short password)
  - Security test cases (SQL injection, XSS)
  
- **community.test-data.js**: Community test data
  - Post content samples
  - Image paths
  
- **team.test-data.js**: Team test data
  - Team names, descriptions
  - Valid/invalid file paths
  
- **matching.test-data.js**: Matching test data
  - Club names
  - Stadium names
  - Match details
  
- **user-profile.test-data.js**: User profile test data
  - Valid updates
  - Invalid email formats
  - Avatar file paths

- **uploads/**: Test files
  - `arsenal.png`: Valid image for posts/teams
  - `team-test.jpg`: Valid team image
  - `test-file.exe`: Invalid file type
  - `test-file.txt`: Invalid file type

### 9. 📂 src/e2e/
End-to-end test cases.

- **login.spec.js**: 42 test cases
  - UI Display Tests (9 TCs)
  - Validation Tests (5 TCs)
  - Authentication Tests (3 TCs)
  - Token Tests (4 TCs)
  - Navigation Tests (3 TCs)
  - Forgot Password Tests (5 TCs)
  - Security Tests (7 TCs)
  - Accessibility Tests (4 TCs)
  - Responsive Tests (2 TCs)

- **community.spec.js**: 6 test cases
  - Post Creation Tests (3 TCs)
  - Post Display Tests (3 TCs)

- **team.spec.js**: 4 test cases
  - Create Team Tests (4 TCs)

- **matching.spec.js**: 4 test cases
  - Create Match Tests (4 TCs)

- **notification.spec.js**: 3 test cases
  - Notification Display Tests (3 TCs)

- **user-profile.spec.js**: 4 test cases
  - Profile Management Tests (4 TCs)

- **logout.spec.js**: 2 test cases
  - Logout Tests (2 TCs)

### 10. 📂 docs/
Chi tiết documentation cho từng page.

Mỗi file chứa:
- Giải thích code của Page Object
- Giải thích logic của từng Test Case
- Ví dụ sử dụng
- Best practices

## 🎯 Design Patterns

### 1. Page Object Model (POM)
- Tách biệt test logic và page interactions
- Dễ maintain và reuse
- Centralized element selectors
- Inheritance từ BasePage

### 2. Fixture Pattern
- Custom Playwright fixtures
- Setup và teardown tự động
- Dependency injection
- Authenticated session management

### 3. Helper Pattern
- Reusable functions cho common tasks
- Authentication helpers
- API call helpers
- Data generation helpers

### 4. Constants Pattern
- Centralized routes
- Centralized selectors
- Easy maintenance khi UI thay đổi

## 🔄 Test Flow

```
1. Test starts
   ↓
2. Fixture setup (base.fixtures.js)
   - authenticatedPage: Auto login nếu cần
   ↓
3. Navigate to page (Page Object)
   - Using routes from constants
   ↓
4. Perform actions (Page Object methods)
   - Fill forms
   - Click buttons
   - Upload files
   ↓
5. Verify results (Assertions)
   - Check UI elements
   - Verify data
   - Validate messages
   ↓
6. Screenshot on failure (Automatic)
   ↓
7. Test ends
```

## 📊 Test Coverage by Module

| Module | Test Cases | Files | Lines of Code |
|--------|-----------|-------|---------------|
| Login & Auth | 42 | 2 | ~1200 |
| Community | 6 | 2 | ~600 |
| Team | 4 | 2 | ~400 |
| Matching | 4 | 2 | ~450 |
| Notifications | 3 | 2 | ~350 |
| User Profile | 4 | 2 | ~550 |
| Logout | 2 | 2 | ~150 |
| **TOTAL** | **65** | **14** | **~3700** |

**Additional Files:**
- Config: 2 files (~200 LOC)
- Constants: 2 files (~400 LOC)
- Common: 2 files (~500 LOC)
- Utils: 5 files (~800 LOC)
- Fixtures: 2 files (~200 LOC)
- Helpers: 2 files (~300 LOC)
- Test Data: 6 files (~600 LOC)

**Grand Total: ~8000+ Lines of Code**

## 📈 Dependencies

### Production Dependencies
- None (test project only)

### Development Dependencies
- `@playwright/test`: ^1.56.1 - Test framework
- `@types/node`: ^24.9.1 - TypeScript types
- `dotenv`: ^16.6.1 - Environment variables

## 🚀 NPM Scripts

```json
{
  "test": "Run all tests (65 TCs)",
  "test:headed": "Run with browser visible",
  "test:debug": "Debug mode",
  "test:ui": "UI mode (recommended)",
  "test:chromium/firefox/webkit": "Specific browser",
  "test:mobile": "Mobile browsers",
  "test:login": "Login tests only (42 TCs)",
  "test:all": "All browsers",
  "test:parallel/serial": "Parallel/serial execution",
  "report": "Show HTML report",
  "codegen": "Generate test code"
}
```

## 🎨 Coding Standards

### Naming Conventions
- Files: `kebab-case.js`
- Classes: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Test cases: `TC{number} - Description` hoặc `TC{number}: Description`

### File Organization
- One class per file
- Export at end of file
- Import order: external → internal → relative
- Selectors trong constants/selectors.js
- Routes trong constants/routes.js

### Comments
- JSDoc for functions
- Inline comments for complex logic
- Vietnamese for test descriptions
- English for code comments

## 📚 Resources

- [Playwright Docs](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)

## 🔐 Security Considerations

Tests include:
- SQL Injection prevention (TC37)
- XSS prevention (TC38)
- Password masking (TC32)
- Token management (TC20-TC23, TC36)
- Rate limiting (TC35)
- Session management (TC21, TC23)

## 🌐 CI/CD Integration

GitHub Actions workflow included:
- Run on push/PR
- Matrix testing (chromium, firefox, webkit)
- Artifact upload (reports, videos)
- Secrets management
- Parallel execution

---

**Tổng số files: 50+ files**  
**Tổng số test cases: 65 tests**  
**Lines of code: ~8000+ LOC**  
**Last Updated:** October 2025
