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
# Copy file env.example sang .env
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

# Chạy tất cả tests (65 test cases)
npm test

# Chạy tests và xem browser
npm run test:headed

# Debug tests
npm run test:debug

# Chỉ chạy login tests (42 test cases)
npm run test:login

# Xem report
npm run report
```

## 📁 Files quan trọng

```
matching_queue_auto_test/
├── .env                    # ⚙️  Cấu hình (CẬP NHẬT ĐÂY TRƯỚC)
├── src/
│   ├── e2e/                # 🧪 Test cases
│   │   ├── login.spec.js        # 42 test cases
│   │   ├── community.spec.js    # 6 test cases
│   │   ├── team.spec.js         # 4 test cases
│   │   ├── matching.spec.js     # 4 test cases
│   │   ├── notification.spec.js # 3 test cases
│   │   ├── user-profile.spec.js # 4 test cases
│   │   └── logout.spec.js       # 2 test cases
│   └── pages/              # 📄 Page Objects
│       ├── login.page.js
│       ├── community.page.js
│       ├── team.page.js
│       ├── matching.page.js
│       ├── notification.page.js
│       ├── user-profile.page.js
│       └── logout.page.js
├── docs/                   # 📚 Documentation
│   ├── login-page.md
│   ├── community-page.md
│   ├── team-page.md
│   ├── matching-page.md
│   ├── notification-page.md
│   ├── user-profile-page.md
│   └── logout-page.md
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

## 📝 Chạy tests theo module

### Login Tests (42 test cases)
```bash
npm run test:login
```
**Coverage:**
- UI Display (9 TCs)
- Validation (5 TCs)
- Authentication (3 TCs)
- Token Management (4 TCs)
- Navigation (3 TCs)
- Forgot Password (5 TCs)
- Security (7 TCs)
- Accessibility (4 TCs)
- Responsive (2 TCs)

### Community Tests (6 test cases)
```bash
npm test src/e2e/community.spec.js
```
**Coverage:**
- Đăng bài text only
- Đăng bài có ảnh
- Validation bài rỗng
- Thứ tự hiển thị
- Thông tin người đăng
- Hiển thị ảnh

### Team Tests (4 test cases)
```bash
npm test src/e2e/team.spec.js
```
**Coverage:**
- Upload ảnh hợp lệ
- Upload file không hợp lệ
- Tạo CLB thành công
- Validation tên CLB

### Matching Tests (4 test cases)
```bash
npm test src/e2e/matching.spec.js
```
**Coverage:**
- Hiển thị form tạo trận
- Tạo trận hợp lệ
- Validation thiếu thông tin
- Quản lý trận đấu

### Notification Tests (3 test cases)
```bash
npm test src/e2e/notification.spec.js
```
**Coverage:**
- Hiển thị danh sách
- Empty state
- Đánh dấu đã đọc

### User Profile Tests (4 test cases)
```bash
npm test src/e2e/user-profile.spec.js
```
**Coverage:**
- Hiển thị thông tin
- Cập nhật username
- Validation email
- Upload avatar

### Logout Tests (2 test cases)
```bash
npm test src/e2e/logout.spec.js
```
**Coverage:**
- Đăng xuất thành công
- Redirect khi chưa login

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

## 📊 Test Statistics

| Module | Test Cases | Status |
|--------|-----------|--------|
| Login & Authentication | 42 | ✅ |
| Community/Posts | 6 | ✅ |
| Team/Club | 4 | ✅ |
| Matching | 4 | ✅ |
| Notifications | 3 | ✅ |
| User Profile | 4 | ✅ |
| Logout | 2 | ✅ |
| **TOTAL** | **65** | **✅** |

## 📖 Đọc thêm

- [README.md](./README.md) - Tài liệu đầy đủ
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Hướng dẫn contribute
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Chi tiết cấu trúc project
- [docs/](./docs/) - Documentation cho từng page
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
3. Xem [docs/](./docs/) cho từng page
4. Xem [Playwright Docs](https://playwright.dev)
5. Tạo issue trong repository

---

**Happy Testing! 🎉**

**Total Test Coverage: 65 test cases**
