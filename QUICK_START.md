# Quick Start Guide

Hướng dẫn nhanh để bắt đầu với Matching Queue Auto Test.

## 🚀 Setup nhanh (5 phút)

### Bước 1: Cài đặt dependencies

```bash
# Di chuyển vào thư mục project
cd matching_queue_auto_test

# Cài đặt packages
npm install

# Cài đặt browsers
npm run install:browsers
```

### Bước 2: Cấu hình credentials

```bash
# Copy file ENV.example sang .env
cp env.example .env
```

Mở file `.env` và cập nhật thông tin test user:

```env
# Cập nhật với credentials thật của bạn
TEST_EMAIL=your-test-email@example.com
TEST_PASSWORD=your-test-password

# Optional: Adjust browser settings
HEADLESS=false
SLOW_MO=0
DEBUG=false
```

**⚠️ Quan trọng:** `TEST_EMAIL` và `TEST_PASSWORD` phải là credentials thật trong hệ thống để login thành công!

### Bước 3: Đảm bảo application đang chạy

```bash
# Application phải chạy tại http://localhost:5173
# Nếu chưa chạy, mở terminal mới và chạy:
cd ../matching_queue-main
npm run dev
```

### Bước 4: Chạy tests

```bash
# Chạy với UI mode (khuyến nghị cho lần đầu)
npm run test:ui

# Hoặc chạy trực tiếp
npm test
```

## 🎯 Commands cơ bản

```bash
# Xem UI và chạy tests
npm run test:ui

# Chạy tất cả tests
npm test

# Chạy tests và xem browser
npm run test:headed

# Debug tests
npm run test:debug

# Chỉ chạy login tests
npm run test:login

# Xem report
npm run report
```

## 📁 Files quan trọng

```
matching_queue_auto_test/
├── .env                    # ⚙️  Cấu hình (CẬP NHẬT ĐÂY TRƯỚC)
├── src/
│   ├── e2e/
│   │   └── login.spec.js  # 🧪 Test cases
│   └── pages/
│       └── login.page.js  # 📄 Page Object
└── playwright.config.js   # ⚙️  Config Playwright
```

## 🔧 Troubleshooting nhanh

### Lỗi: Tests timeout
```bash
# Check application có chạy không
curl http://localhost:5173
```

### Lỗi: Browser không tìm thấy
```bash
# Cài lại browsers
npm run install:browsers
```

### Lỗi: Module not found
```bash
# Cài lại dependencies
rm -rf node_modules
npm install
```

## 📝 Viết test đầu tiên

### 1. Tạo file test mới

```javascript
// src/e2e/my-feature.spec.js
import { test, expect } from '../fixtures/index.js';

test.describe('My Feature Tests', () => {
  test('TC01 - My first test', async ({ page }) => {
    // Navigate to page
    await page.goto('http://localhost:5173');
    
    // Verify something
    await expect(page).toHaveTitle(/Matching/);
  });
});
```

### 2. Chạy test

```bash
npm run test:ui
```

## 💡 Tips

1. **Dùng UI Mode** để debug và xem tests chạy
   ```bash
   npm run test:ui
   ```

2. **Record actions** để generate test code
   ```bash
   npm run codegen
   ```

3. **Chạy 1 test cụ thể**
   ```bash
   npx playwright test src/e2e/login.spec.js -g "TC01"
   ```

4. **Xem trace** khi test fail
   - Mở report: `npm run report`
   - Click vào failed test
   - Click "View trace"

## 📖 Đọc thêm

- [README.md](./README.md) - Tài liệu đầy đủ
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Hướng dẫn contribute
- [Playwright Docs](https://playwright.dev) - Official documentation

## 🎓 Học Playwright

### Video tutorials
- [Playwright Tutorial](https://www.youtube.com/results?search_query=playwright+tutorial)

### Docs quan trọng
- [Writing Tests](https://playwright.dev/docs/writing-tests)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Page Object Model](https://playwright.dev/docs/pom)

## ✅ Checklist

Sau khi setup:
- [ ] `npm install` thành công
- [ ] Browsers đã cài đặt
- [ ] File `.env` đã cập nhật credentials
- [ ] Application chạy tại `http://localhost:5173`
- [ ] `npm run test:ui` chạy được
- [ ] Ít nhất 1 test pass

## 🆘 Cần giúp?

1. Đọc [README.md](./README.md)
2. Check [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Xem [Playwright Docs](https://playwright.dev)
4. Tạo issue trong repository

---

**Happy Testing! 🎉**

