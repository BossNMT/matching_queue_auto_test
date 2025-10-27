/**
 * Community Comprehensive E2E Test Cases
 * Bộ test case đầy đủ cho chức năng community - xem bài post và đăng bài
 */

import { test, expect } from '../fixtures/index.js';
import { CommunityPage } from '../pages/community.page.js';

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
    const timestamp = Date.now();
    const postContent = `hello-${timestamp}`;
    
    await test.step(`Nhập "${postContent}" vào ô đăng bài`, async () => {
      await page.waitForTimeout(2000);
      await communityPage.clickCreatePostButton();
      await page.waitForTimeout(2000);
      await communityPage.enterPostContent(postContent);
      await page.waitForTimeout(2000);
    });

    await test.step('Nhấn "Đăng"', async () => {
      await communityPage.clickPostButton();
      await page.waitForTimeout(2000);
    });

    await test.step(`Bài viết được hiển thị ngay đầu trang với nội dung "${postContent}"`, async () => {
      await communityPage.waitForPostToAppear(postContent);
      const isPostAtTop = await communityPage.verifyPostAtTop(postContent);
      expect(isPostAtTop).toBe(true);
    });
  });

  test('TC02 - Đăng bài có hình ảnh Arsenal', async () => {
    const timestamp = Date.now();
    const postContent = `Đồ án-${timestamp}`;
    
    await test.step(`Nhập "${postContent}"`, async () => {
      await page.waitForTimeout(2000);
      await communityPage.clickCreatePostButton();
      await page.waitForTimeout(2000);
      await communityPage.enterPostContent(postContent);
      await page.waitForTimeout(2000);
    });

    await test.step('Chọn hình ảnh Arsenal', async () => {
      const imagePath = 'src/test-data/uploads/arsenal.png';
      await communityPage.uploadImage(imagePath);
      await page.waitForTimeout(2000);
    });

    await test.step('Nhấn "Đăng"', async () => {
      await communityPage.clickPostButton();
      await page.waitForTimeout(2000);
    });

    await test.step('Bài viết hiển thị nội dung và ảnh đúng kích thước', async () => {
      await communityPage.waitForPostToAppear(postContent);
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
      await communityPage.clickCreatePostButton();
      await page.waitForTimeout(2000);
      await communityPage.clickPostButton();
      await page.waitForTimeout(2000);
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
    const timestamp = Date.now();
    const newPostContent = `Bài mới ${timestamp}`;
    await test.step('Có sẵn ≥ 2 bài đăng', async () => {
      const postCount = await communityPage.getPostCount();
      expect(postCount).toBeGreaterThanOrEqual(2);
    });

    await test.step('Đăng thêm 1 bài mới', async () => {
      await communityPage.clickCreatePostButton();
      await page.waitForTimeout(2000);
      await communityPage.enterPostContent(newPostContent);
      await page.waitForTimeout(2000);
      await communityPage.clickPostButton();
      await page.waitForTimeout(2000);
    });

    await test.step('Bài mới hiển thị trên cùng danh sách', async () => {
      const firstPost = await communityPage.getFirstPost();
      const content = await communityPage.getPostContent(firstPost);
      expect(content).toContain(newPostContent);
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

    await test.step('Hiển thị đúng Avatar, Username', async () => {
      const firstPost = await communityPage.getFirstPost();
      const username = await communityPage.getPostUsername(firstPost);
      const avatar = await communityPage.getPostAvatar(firstPost);
      const time = await communityPage.getPostTime(firstPost);
      
      // Username and avatar are required
      expect(username).toBeTruthy();
      expect(username).not.toBe('');
      expect(avatar).toBeTruthy();
      
      // Time might be optional, so we just check it exists or is empty string
      expect(time !== undefined).toBe(true);
    });
  });

  test('TC06 - Hiển thị ảnh bài đăng', async () => {
    const timestamp = Date.now();
    const postContent = `Bài có ảnh-${timestamp}`;
    
    await test.step('Có bài đăng chứa ảnh', async () => {
      await page.waitForTimeout(2000);
      await communityPage.clickCreatePostButton();
      await page.waitForTimeout(2000);
      await communityPage.enterPostContent(postContent);
      await page.waitForTimeout(2000);
      
      // Upload Arsenal image
      const imagePath = 'src/test-data/uploads/arsenal.png';
      await communityPage.uploadImage(imagePath);
      await page.waitForTimeout(2000);
      
      await communityPage.clickPostButton();
      await page.waitForTimeout(2000);
    });

    await test.step('Quan sát hiển thị', async () => {
      await communityPage.waitForPostToAppear(postContent);
      const firstPost = await communityPage.getFirstPost();
      const content = await communityPage.getPostContent(firstPost);
      const hasImage = await communityPage.verifyPostHasImage(firstPost);
      
      expect(content).toContain('Bài có ảnh');
      expect(hasImage).toBe(true);
    });

    await test.step('Ảnh hiển thị đầy đủ, không vỡ hình', async () => {
      const firstPost = await communityPage.getFirstPost();
      const imageDisplayedProperly = await communityPage.verifyImageDisplayedProperly(firstPost);
      expect(imageDisplayedProperly).toBe(true);
    });
  });
});
