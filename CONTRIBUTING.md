# Contributing Guide

Hướng dẫn đóng góp cho project Matching Queue Auto Test.

## 📋 Quy tắc viết test

### 1. Naming Convention

#### Test Files
- Format: `feature-name.spec.js`
- Examples: 
  - `login.spec.js`
  - `user-profile.spec.js`
  - `matching-create.spec.js`

#### Test Cases
- Format: `TC{number} - {description}`
- Examples:
  ```javascript
  test('TC01 - Should display all login page elements', async ({ page }) => {
    // test code
  });
  ```

#### Page Object Models
- Format: `page-name.page.js`
- Class name: `PageNamePage`
- Examples:
  - `login.page.js` → `LoginPage`
  - `user-profile.page.js` → `UserProfilePage`

### 2. Test Structure

```javascript
import { test, expect } from '../fixtures/index.js';

test.describe('Feature Name Tests', () => {
  // Setup before each test
  test.beforeEach(async ({ page }) => {
    // Setup code
  });

  // Group related tests
  test.describe('Sub-group Name', () => {
    test('TC01 - Test description', async ({ page }) => {
      // Use test steps for clarity
      await test.step('Step 1: Description', async () => {
        // Test logic
      });

      await test.step('Step 2: Verification', async () => {
        // Assertions
      });
    });
  });

  // Cleanup after each test
  test.afterEach(async ({ page }) => {
    // Cleanup code
  });
});
```

### 3. Page Object Model Pattern

```javascript
import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';

export class YourPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define selectors
    this.selectors = {
      element: SELECTORS.YOUR_PAGE.ELEMENT,
    };
  }

  // Action methods
  async clickElement() {
    await this.click(this.selectors.element);
  }

  // Verification methods
  async verifyElementVisible() {
    await expect(this.page.locator(this.selectors.element)).toBeVisible();
  }
}
```

### 4. Constants Organization

#### Selectors (src/constants/selectors.js)
```javascript
export const SELECTORS = {
  PAGE_NAME: {
    ELEMENT_NAME: 'selector',
  },
};
```

#### Routes (src/constants/routes.js)
```javascript
export const ROUTES = {
  ROUTE_NAME: '/path',
};
```

#### Messages (src/constants/messages.js)
```javascript
export const MESSAGES = {
  CATEGORY: {
    MESSAGE_NAME: 'message text',
  },
};
```

## 🎯 Test Case Categories

### 1. UI Tests
- Element visibility
- Element state (enabled/disabled)
- Element content
- Layout and positioning

### 2. Functional Tests
- User flows
- Form submissions
- Data validation
- Error handling

### 3. Integration Tests
- API interactions
- Navigation flows
- Cross-page interactions

### 4. Security Tests
- Input validation
- XSS prevention
- SQL injection prevention
- Authentication/Authorization

### 5. Performance Tests
- Page load time
- API response time
- Resource loading

### 6. Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- ARIA labels

## 📝 Code Style

### 1. JavaScript/ES6+
- Use ES6 modules (`import/export`)
- Use `async/await` instead of promises
- Use arrow functions where appropriate
- Use destructuring for cleaner code

### 2. Comments
- Add JSDoc comments for functions
- Explain complex logic
- Document assumptions

```javascript
/**
 * Login with credentials
 * @param {string} email - User email
 * @param {string} password - User password
 */
async login(email, password) {
  // Implementation
}
```

### 3. Error Handling
```javascript
try {
  await somethingRisky();
} catch (error) {
  logger.error('Error message', error);
  throw error;
}
```

## 🔍 Best Practices

### 1. Selectors
- ✅ Use data-testid attributes
- ✅ Use semantic selectors (role, text)
- ❌ Avoid CSS classes for styling
- ❌ Avoid XPath when possible

### 2. Waits
- ✅ Use built-in Playwright waits
- ✅ Use `waitFor` utilities
- ❌ Avoid hard-coded `setTimeout`

### 3. Test Data
- ✅ Use data generators
- ✅ Use environment variables
- ❌ Hard-code sensitive data

### 4. Assertions
- ✅ Use descriptive assertion messages
- ✅ One logical assertion per test
- ❌ Multiple unrelated assertions

### 5. Test Independence
- ✅ Each test should run independently
- ✅ Clean up after tests
- ❌ Depend on execution order

## 🚀 Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/test-name
   ```

2. **Write tests**
   - Follow naming conventions
   - Add test documentation
   - Update README if needed

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

5. **Push and create PR**
   ```bash
   git push origin feature/test-name
   ```

6. **PR Requirements**
   - All tests pass
   - Code follows style guide
   - Documentation updated
   - Review by at least 1 person

## 📊 Test Coverage

Aim for:
- UI Elements: 100%
- Happy paths: 100%
- Error cases: 80%+
- Edge cases: 70%+

## 🐛 Reporting Issues

When reporting bugs:
1. Describe the expected behavior
2. Describe the actual behavior
3. Provide steps to reproduce
4. Include screenshots/videos
5. Include browser/OS information

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Library](https://testing-library.com/docs/queries/about)

## ✅ Checklist

Before submitting PR:
- [ ] Tests pass locally
- [ ] Code follows style guide
- [ ] Comments added for complex logic
- [ ] README updated (if needed)
- [ ] Constants updated (if needed)
- [ ] No hard-coded values
- [ ] Error handling implemented
- [ ] Logging added for debugging

