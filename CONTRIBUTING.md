# Contributing Guide

Hướng dẫn đóng góp cho project Matching Queue Auto Test.

## 📋 Quy tắc viết test

### 1. Naming Convention

#### Test Files
- Format: `feature-name.spec.js`
- Examples: 
  - `login.spec.js` (42 test cases)
  - `community.spec.js` (6 test cases)
  - `team.spec.js` (4 test cases)
  - `matching.spec.js` (4 test cases)
  - `notification.spec.js` (3 test cases)
  - `user-profile.spec.js` (4 test cases)
  - `logout.spec.js` (2 test cases)

#### Test Cases
- Format: `TC{number} - {description}` hoặc `TC{number}: {description}`
- Số TC có thể có 2-3 chữ số: TC01, TC001, TC-01
- Examples:
  ```javascript
  test('TC01 - Hiển thị đúng tiêu đề trang', async () => {
    // test code
  });
  
  test('TC001: Hiển thị thông tin user đúng', async () => {
    // test code
  });
  ```

#### Page Object Models
- Format: `page-name.page.js`
- Class name: `PageNamePage`
- Examples:
  - `login.page.js` → `LoginPage`
  - `user-profile.page.js` → `UserProfilePage`
  - `notification.page.js` → `NotificationPage`

### 2. Test Structure

```javascript
import { test, expect } from '../fixtures/index.js';
import { YourPage } from '../pages/your-page.page.js';
import { YOUR_TEST_DATA } from '../test-data/your-test-data.js';

test.describe('Feature Name Tests', () => {
  let yourPage;
  let page;

  // Setup before each test
  test.beforeEach(async ({ authenticatedPage }) => {
    // Sử dụng authenticatedPage nếu cần đăng nhập
    yourPage = new YourPage(authenticatedPage);
    page = authenticatedPage;
    
    // Navigate to page
    await yourPage.navigate();
  });

  // Group related tests
  test.describe('Sub-group Name', () => {
    test('TC01 - Test description', async () => {
      // Use test steps for clarity
      await test.step('Step 1: Description', async () => {
        // Test logic
      });

      await test.step('Step 2: Verification', async () => {
        // Assertions
      });
    });
  });

  // Cleanup after each test (optional)
  test.afterEach(async ({ page }) => {
    // Cleanup code if needed
  });
});
```

### 3. Page Object Model Pattern

```javascript
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
      element: SELECTORS.YOUR_PAGE.ELEMENT,
      button: SELECTORS.YOUR_PAGE.BUTTON,
    };
  }

  /**
   * Navigate to your page
   */
  async navigate() {
    info('Navigating to Your Page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.YOUR_PAGE}`);
    await this.waitForPageLoaded();
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoaded() {
    debug('Waiting for Your Page to load');
    await this.waitFor(this.selectors.element);
  }

  /**
   * Action methods with JSDoc
   * @param {string} value - Description
   */
  async clickElement(value) {
    info(`Clicking element with value: ${value}`);
    await this.click(this.selectors.element);
  }

  /**
   * Verification methods
   * @returns {Promise<boolean>}
   */
  async isElementVisible() {
    debug('Checking if element is visible');
    return await this.isVisible(this.selectors.element);
  }
}
```

### 4. Constants Organization

#### Selectors (src/constants/selectors.js)
```javascript
export const SELECTORS = {
  YOUR_PAGE: {
    ELEMENT_NAME: 'selector-string',
    BUTTON: 'button[type="submit"]',
    INPUT: 'input[name="field"]',
    ERROR_MESSAGE: '.error-message',
  },
};
```

#### Routes (src/constants/routes.js)
```javascript
export const ROUTES = {
  YOUR_PAGE: '/your-page',
};
```

## 🎯 Test Case Categories

### 1. UI Tests
- Element visibility
- Element state (enabled/disabled)
- Element content
- Layout and positioning
- Responsive design

### 2. Functional Tests
- User flows (create, read, update, delete)
- Form submissions
- Data validation
- Error handling
- Success messages

### 3. Integration Tests
- API interactions
- Navigation flows
- Cross-page interactions
- Data persistence

### 4. Security Tests
- Input validation
- XSS prevention (TC38 in login)
- SQL injection prevention (TC37 in login)
- Authentication/Authorization
- Token management
- Password security

### 5. Performance Tests
- Page load time
- API response time
- Resource loading

### 6. Accessibility Tests
- Keyboard navigation (TC39)
- Tab order
- Enter key functionality (TC40)
- Error message clarity (TC41)
- Loading indicators (TC42)

## 📝 Code Style

### 1. JavaScript/ES6+
- Use ES6 modules (`import/export`)
- Use `async/await` instead of promises
- Use arrow functions where appropriate
- Use destructuring for cleaner code
- Use template literals for strings

### 2. Comments
- Add JSDoc comments for functions
- Explain complex logic
- Document assumptions
- Use Vietnamese for test descriptions
- Use English for code comments

```javascript
/**
 * Login with credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<void>}
 */
async login(email, password) {
  info(`Logging in with email: ${email}`);
  await this.enterEmail(email);
  await this.enterPassword(password);
  await this.clickSubmit();
}
```

### 3. Error Handling
```javascript
try {
  const result = await somethingRisky();
  return result;
} catch (error) {
  debug(`Error occurred: ${error.message}`);
  return null; // Return null instead of throwing in helper methods
}
```

### 4. Logging
- Use `info()` for important actions
- Use `debug()` for detailed debug information
- Use `error()` for errors
- Log before and after important actions

```javascript
info('Clicking submit button');
await this.click(this.selectors.submitButton);
debug('Submit button clicked successfully');
```

## 🔍 Best Practices

### 1. Selectors
- ✅ Use data-testid attributes (best)
- ✅ Use semantic selectors (role, text)
- ✅ Use stable class names or IDs
- ❌ Avoid CSS classes used for styling
- ❌ Avoid XPath when possible

### 2. Waits
- ✅ Use built-in Playwright waits
- ✅ Use `waitFor()` utilities
- ✅ Wait for network idle when needed
- ❌ Avoid hard-coded `setTimeout`
- ❌ Avoid arbitrary timeouts

```javascript
// Good
await this.waitFor(this.selectors.element);
await this.page.waitForLoadState('networkidle');

// Bad
await this.page.waitForTimeout(5000);
```

### 3. Test Data
- ✅ Use data generators for dynamic data
- ✅ Use environment variables for credentials
- ✅ Store test data in `test-data/` folder
- ✅ Use timestamps for unique data
- ❌ Hard-code sensitive data
- ❌ Use production data

```javascript
// Good
const timestamp = Date.now();
const postContent = `Test post ${timestamp}`;

// Bad
const postContent = 'Test post 123';
```

### 4. Assertions
- ✅ Use descriptive assertion messages
- ✅ One logical assertion per test step
- ✅ Verify both positive and negative cases
- ❌ Multiple unrelated assertions
- ❌ Assertions without context

```javascript
// Good
await test.step('Verify user is logged in', async () => {
  const currentUrl = page.url();
  expect(currentUrl).toContain('/dashboard');
});

// Bad
expect(page.url()).toContain('/dashboard');
```

### 5. Test Independence
- ✅ Each test should run independently
- ✅ Clean up after tests
- ✅ Use fixtures for setup
- ❌ Depend on execution order
- ❌ Share state between tests

### 6. Fixtures Usage
- ✅ Use `authenticatedPage` for tests requiring login
- ✅ Use `page` for tests on public pages
- ✅ Create custom fixtures for common setup

```javascript
// For authenticated tests
test.beforeEach(async ({ authenticatedPage }) => {
  yourPage = new YourPage(authenticatedPage);
  // User is already logged in
});

// For public pages
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  // No authentication
});
```

## 🚀 Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/test-name
   ```

2. **Write tests**
   - Follow naming conventions
   - Add test documentation
   - Update README if needed
   - Add selectors to constants/selectors.js
   - Add routes to constants/routes.js

3. **Run tests locally**
   ```bash
   npm test
   npm run test:ui
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "test: add test cases for feature X"
   ```
   
   Commit message format:
   - `test: add test cases for feature X`
   - `fix: fix failing test in feature Y`
   - `docs: update documentation for feature Z`
   - `refactor: improve page object for feature W`

5. **Push and create PR**
   ```bash
   git push origin feature/test-name
   ```

6. **PR Requirements**
   - All tests pass ✅
   - Code follows style guide ✅
   - Documentation updated ✅
   - Selectors added to constants ✅
   - Test data added if needed ✅
   - Review by at least 1 person ✅

## 📊 Test Coverage Goals

Aim for:
- UI Elements: 100%
- Happy paths: 100%
- Error cases: 80%+
- Edge cases: 70%+
- Security: 50%+
- Accessibility: 50%+

Current Coverage (65 test cases total):
- Login & Auth: 42 TCs (100% coverage)
- Community: 6 TCs (good coverage)
- Team: 4 TCs (good coverage)
- Matching: 4 TCs (good coverage)
- Notifications: 3 TCs (basic coverage)
- User Profile: 4 TCs (good coverage)
- Logout: 2 TCs (complete coverage)

## 🐛 Reporting Issues

When reporting bugs:
1. Describe the expected behavior
2. Describe the actual behavior
3. Provide steps to reproduce
4. Include screenshots/videos
5. Include browser/OS information
6. Include test environment details
7. Include error logs/traces

## 📖 Writing Documentation

When adding new tests:
1. Update README.md with new test count
2. Update QUICK_START.md if setup changes
3. Update PROJECT_STRUCTURE.md if files change
4. Create/update docs/{page-name}.md with:
   - Code explanation
   - Test case logic
   - Examples
   - Best practices

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Library](https://testing-library.com/docs/queries/about)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

## ✅ Checklist

Before submitting PR:
- [ ] Tests pass locally (`npm test`)
- [ ] Tests pass in UI mode (`npm run test:ui`)
- [ ] Code follows style guide
- [ ] Comments added for complex logic
- [ ] README.md updated (if needed)
- [ ] Constants updated (selectors, routes)
- [ ] Test data added (if needed)
- [ ] No hard-coded values
- [ ] Error handling implemented
- [ ] Logging added for debugging
- [ ] JSDoc added for public methods
- [ ] Test steps are clear and descriptive
- [ ] No flaky tests (run multiple times)

## 🎓 Examples

### Example 1: Creating a new Page Object

1. Create page file: `src/pages/your-page.page.js`
2. Add selectors to `src/constants/selectors.js`
3. Add routes to `src/constants/routes.js`
4. Create test data: `src/test-data/your-page.test-data.js`
5. Create test file: `src/e2e/your-page.spec.js`
6. Update documentation: `docs/your-page.md`

### Example 2: Adding a new test case

1. Identify the page object to use
2. Add test data if needed
3. Write test with clear steps
4. Add logging
5. Verify test passes
6. Update test count in README

### Example 3: Updating selectors

1. Update `src/constants/selectors.js`
2. Update page object if needed
3. Run affected tests
4. Verify all tests pass
5. Document changes

## 🤝 Getting Help

- Read [README.md](./README.md) for overview
- Check [docs/](./docs/) for page-specific details
- Review existing tests for examples
- Ask in project discussions
- Create an issue for bugs

---

**Remember:** Quality over quantity. Write meaningful tests that add value! 🎯
