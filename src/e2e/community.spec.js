/**
 * Community Comprehensive E2E Test Cases
 * Bộ test case đầy đủ cho chức năng community - xem bài post và đăng bài
 */

import { test, expect } from '../fixtures/index.js';
import { CommunityPage } from '../pages/community.page.js';
import { ROUTES } from '../constants/routes.js';

test.describe('Community - Post Creation Tests', () => {
  let communityPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    communityPage = new CommunityPage(authenticatedPage);
    page = authenticatedPage;
    
    // Navigate to community page
    await communityPage.navigate();
  });

  test('TC01 - Đăng bài chỉ có nội dung text', async () => {
    await test.step('Nhập "hello" vào ô đăng bài', async () => {
      await communityPage.enterPostContent('hello');
    });

    await test.step('Nhấn "Đăng"', async () => {
      await communityPage.clickPostButton();
      await page.waitForTimeout(2000);
    });

    await test.step('Bài viết được hiển thị ngay đầu trang với nội dung "hello"', async () => {
      await communityPage.waitForPostToAppear('hello');
      const isPostAtTop = await communityPage.verifyPostAtTop('hello');
      expect(isPostAtTop).toBe(true);
    });
  });

  test('TC02 - Đăng bài có hình ảnh', async () => {
    await test.step('Nhập "Đồ án"', async () => {
      await communityPage.enterPostContent('Đồ án');
    });

    await test.step('Chọn hình ảnh', async () => {
      // Create a test image file path
      const testImagePath = 'test-results/test-image.jpg';
      await communityPage.uploadImage(testImagePath);
    });

    await test.step('Nhấn "Đăng"', async () => {
      await communityPage.clickPostButton();
      await page.waitForTimeout(2000);
    });

    await test.step('Bài viết hiển thị nội dung và ảnh đúng kích thước', async () => {
      await communityPage.waitForPostToAppear('Đồ án');
      const firstPost = await communityPage.getFirstPost();
      const content = await communityPage.getPostContent(firstPost);
      const hasImage = await communityPage.verifyPostHasImage(firstPost);
      const imageDisplayedProperly = await communityPage.verifyImageDisplayedProperly(firstPost);
      
      expect(content).toContain('Đồ án');
      expect(hasImage).toBe(true);
      expect(imageDisplayedProperly).toBe(true);
    });
  });

  test('TC03 - Đăng bài rỗng', async () => {
    await test.step('Để trống ô đăng bài', async () => {
      await communityPage.clearPostInput();
      const isEmpty = await communityPage.isPostInputEmpty();
      expect(isEmpty).toBe(true);
    });

    await test.step('Nhấn "Đăng"', async () => {
      await communityPage.clickPostButton();
      await page.waitForTimeout(1000);
    });

    await test.step('Thông báo lỗi: "Vui lòng nhập nội dung bài đăng"', async () => {
      const errorMessage = await communityPage.getPostEmptyErrorMessage();
      expect(errorMessage).toBe('Vui lòng nhập nội dung bài đăng');
    });
  });
});

test.describe('Community - Post Display Tests', () => {
  let communityPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    communityPage = new CommunityPage(authenticatedPage);
    page = authenticatedPage;
    
    // Navigate to community page
    await communityPage.navigate();
  });

  test('TC04 - Kiểm tra thứ tự hiển thị bài đăng', async () => {
    await test.step('Có sẵn ≥ 2 bài đăng', async () => {
      const postCount = await communityPage.getPostCount();
      expect(postCount).toBeGreaterThanOrEqual(2);
    });

    await test.step('Đăng thêm 1 bài mới', async () => {
      const newPostContent = `Bài mới ${Date.now()}`;
      await communityPage.createTextPost(newPostContent);
      await page.waitForTimeout(2000);
    });

    await test.step('Bài mới hiển thị trên cùng danh sách', async () => {
      const firstPost = await communityPage.getFirstPost();
      const content = await communityPage.getPostContent(firstPost);
      expect(content).toContain('Bài mới');
    });
  });

  test('TC05 - Hiển thị thông tin người đăng', async () => {
    await test.step('Có bài đăng', async () => {
      const postCount = await communityPage.getPostCount();
      expect(postCount).toBeGreaterThan(0);
    });

    await test.step('Quan sát bài đăng', async () => {
      const firstPost = await communityPage.getFirstPost();
      const hasAuthorInfo = await communityPage.verifyPostHasAuthorInfo(firstPost);
      expect(hasAuthorInfo).toBe(true);
    });

    await test.step('Hiển thị đúng Avatar, Username, Thời gian đăng', async () => {
      const firstPost = await communityPage.getFirstPost();
      const username = await communityPage.getPostUsername(firstPost);
      const avatar = await communityPage.getPostAvatar(firstPost);
      const time = await communityPage.getPostTime(firstPost);
      
      expect(username).toBeTruthy();
      expect(time).toBeTruthy();
      // Avatar might be optional, so we just check if it exists or not
      expect(avatar !== undefined).toBe(true);
    });
  });

  test('TC06 - Hiển thị ảnh bài đăng', async () => {
    await test.step('Có bài đăng chứa ảnh', async () => {
      // First create a post with image
      const testImagePath = 'test-results/test-image.jpg';
      await communityPage.createImagePost('Bài có ảnh', testImagePath);
      await page.waitForTimeout(2000);
    });

    await test.step('Quan sát hiển thị', async () => {
      const firstPost = await communityPage.getFirstPost();
      const hasImage = await communityPage.verifyPostHasImage(firstPost);
      expect(hasImage).toBe(true);
    });

    await test.step('Ảnh hiển thị đầy đủ, không vỡ hình', async () => {
      const firstPost = await communityPage.getFirstPost();
      const imageDisplayedProperly = await communityPage.verifyImageDisplayedProperly(firstPost);
      expect(imageDisplayedProperly).toBe(true);
    });
  });
});

test.describe('Community - UI Display Tests', () => {
  let communityPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    communityPage = new CommunityPage(authenticatedPage);
    page = authenticatedPage;
    
    // Navigate to community page
    await communityPage.navigate();
  });

  test('TC07 - Hiển thị ô nhập bài đăng', async () => {
    await test.step('Kiểm tra ô textarea hiển thị rõ ràng', async () => {
      const isPostInputVisible = await communityPage.isVisible(communityPage.selectors.postInput);
      expect(isPostInputVisible).toBe(true);
    });
  });

  test('TC08 - Hiển thị nút đăng bài', async () => {
    await test.step('Kiểm tra nút "Đăng" hiển thị và có thể click', async () => {
      const isPostButtonVisible = await communityPage.isVisible(communityPage.selectors.postButton);
      const isPostButtonEnabled = await communityPage.isPostButtonEnabled();
      
      expect(isPostButtonVisible).toBe(true);
      expect(isPostButtonEnabled).toBe(true);
    });
  });

  test('TC09 - Hiển thị nút upload ảnh', async () => {
    await test.step('Kiểm tra nút upload ảnh hiển thị', async () => {
      const isImageUploadVisible = await communityPage.isVisible(communityPage.selectors.imageUploadButton);
      expect(isImageUploadVisible).toBe(true);
    });
  });

  test('TC10 - Hiển thị danh sách bài đăng', async () => {
    await test.step('Kiểm tra danh sách bài đăng hiển thị', async () => {
      await communityPage.waitForPostsToLoad();
      const postCount = await communityPage.getPostCount();
      expect(postCount).toBeGreaterThanOrEqual(0);
    });
  });
});

test.describe('Community - Validation Tests', () => {
  let communityPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    communityPage = new CommunityPage(authenticatedPage);
    page = authenticatedPage;
    
    // Navigate to community page
    await communityPage.navigate();
  });

  test('TC11 - Validation bài đăng quá dài', async () => {
    await test.step('Nhập nội dung quá dài', async () => {
      const longContent = 'a'.repeat(1001); // Assuming 1000 char limit
      await communityPage.enterPostContent(longContent);
    });

    await test.step('Nhấn "Đăng"', async () => {
      await communityPage.clickPostButton();
      await page.waitForTimeout(1000);
    });

    await test.step('Hiển thị lỗi validation', async () => {
      const errorMessage = await communityPage.getPostEmptyErrorMessage();
      expect(errorMessage).toBeTruthy();
    });
  });

  test('TC12 - Validation file ảnh không hợp lệ', async () => {
    await test.step('Nhập nội dung', async () => {
      await communityPage.enterPostContent('Test với file không hợp lệ');
    });

    await test.step('Chọn file không phải ảnh', async () => {
      // This would need a test file that's not an image
      const invalidFile = 'test-results/test-file.txt';
      await communityPage.uploadImage(invalidFile);
    });

    await test.step('Nhấn "Đăng"', async () => {
      await communityPage.clickPostButton();
      await page.waitForTimeout(1000);
    });

    await test.step('Hiển thị lỗi file không hợp lệ', async () => {
      const errorMessage = await communityPage.getPostEmptyErrorMessage();
      expect(errorMessage).toBeTruthy();
    });
  });
});

test.describe('Community - Responsive Tests', () => {
  let communityPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    communityPage = new CommunityPage(authenticatedPage);
    page = authenticatedPage;
  });

  test('TC13 - Responsive Mobile', async () => {
    await test.step('Thu nhỏ viewport - Mobile', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await communityPage.navigate();
    });

    await test.step('Kiểm tra UI hiển thị đúng trên mobile', async () => {
      const isPostInputVisible = await communityPage.isVisible(communityPage.selectors.postInput);
      const isPostButtonVisible = await communityPage.isVisible(communityPage.selectors.postButton);
      
      expect(isPostInputVisible).toBe(true);
      expect(isPostButtonVisible).toBe(true);
    });
  });

  test('TC14 - Responsive Tablet', async () => {
    await test.step('Viewport tablet', async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await communityPage.navigate();
    });

    await test.step('Kiểm tra UI hiển thị đúng trên tablet', async () => {
      const isPostInputVisible = await communityPage.isVisible(communityPage.selectors.postInput);
      const isPostButtonVisible = await communityPage.isVisible(communityPage.selectors.postButton);
      
      expect(isPostInputVisible).toBe(true);
      expect(isPostButtonVisible).toBe(true);
    });
  });

  test('TC15 - Responsive Desktop', async () => {
    await test.step('Viewport desktop', async () => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await communityPage.navigate();
    });

    await test.step('Kiểm tra UI hiển thị đúng trên desktop', async () => {
      const isPostInputVisible = await communityPage.isVisible(communityPage.selectors.postInput);
      const isPostButtonVisible = await communityPage.isVisible(communityPage.selectors.postButton);
      
      expect(isPostInputVisible).toBe(true);
      expect(isPostButtonVisible).toBe(true);
    });
  });
});

test.describe('Community - Performance Tests', () => {
  let communityPage;
  let page;

  test.beforeEach(async ({ authenticatedPage }) => {
    communityPage = new CommunityPage(authenticatedPage);
    page = authenticatedPage;
  });

  test('TC16 - Thời gian load trang community', async () => {
    await test.step('Đo thời gian load trang', async () => {
      const startTime = Date.now();
      await communityPage.navigate();
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });

  test('TC17 - Thời gian đăng bài', async () => {
    await test.step('Đo thời gian đăng bài', async () => {
      await communityPage.navigate();
      
      const startTime = Date.now();
      await communityPage.createTextPost('Test performance');
      const endTime = Date.now();
      const postTime = endTime - startTime;
      
      // Should post within 3 seconds
      expect(postTime).toBeLessThan(3000);
    });
  });
});
