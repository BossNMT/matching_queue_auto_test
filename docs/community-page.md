# Community Page - Documentation

## 📄 Tổng quan

**File:** `src/pages/community.page.js`  
**Test File:** `src/e2e/community.spec.js`  
**Test Coverage:** 6 test cases

Community Page là trang cho phép người dùng xem và tạo bài đăng (posts), bao gồm cả bài chỉ có text và bài có kèm hình ảnh.

## 🏗️ Cấu trúc Page Object

### Constructor & Selectors

```javascript
export class CommunityPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.selectors = {
      // Create post
      createPostButton: SELECTORS.COMMUNITY.CREATE_POST_BUTTON,
      postInput: SELECTORS.COMMUNITY.POST_INPUT, // CKEditor5
      postButton: SELECTORS.COMMUNITY.POST_BUTTON,
      
      // Image upload
      imageUploadInput: SELECTORS.COMMUNITY.IMAGE_UPLOAD_INPUT,
      imageUploadButton: SELECTORS.COMMUNITY.IMAGE_UPLOAD_BUTTON,
      
      // Post list
      postList: SELECTORS.COMMUNITY.POST_LIST,
      postItem: SELECTORS.COMMUNITY.POST_ITEM,
      postContent: SELECTORS.COMMUNITY.POST_CONTENT,
      postImage: SELECTORS.COMMUNITY.POST_IMAGE,
      
      // Post author info
      postAuthor: SELECTORS.COMMUNITY.POST_AUTHOR,
      postUsername: SELECTORS.COMMUNITY.POST_USERNAME,
      postAvatar: SELECTORS.COMMUNITY.POST_AVATAR,
      postTime: SELECTORS.COMMUNITY.POST_TIME,
      
      // Error messages
      postEmptyError: SELECTORS.COMMUNITY.POST_EMPTY_ERROR,
      loadingPosts: SELECTORS.COMMUNITY.LOADING_POSTS,
    };
  }
}
```

## 🔑 Methods quan trọng

### Navigation Methods

#### `navigate()`
Điều hướng đến trang community (dashboard).

```javascript
async navigate() {
  info('Navigating to Community page');
  await this.goto(`${ENV.BASE_URL}${ROUTES.COMMUNITY}`);
  await this.waitForPageLoaded();
}
```

**Note:** ROUTES.COMMUNITY = `/` (trang chính)

### Post Creation Methods

#### `clickCreatePostButton()`
Click nút tạo bài đăng (thường mở modal hoặc form).

```javascript
async clickCreatePostButton() {
  info('Clicking create post button');
  const createPostButton = this.page.locator(this.selectors.createPostButton);
  await createPostButton.click();
}
```

#### `enterPostContent(content)`
Nhập nội dung bài đăng vào CKEditor5.

```javascript
async enterPostContent(content) {
  info(`Entering post content: ${content}`);
  const editor = this.page.locator(this.selectors.postInput);
  
  // Click để focus editor
  await editor.click();
  
  // Clear nội dung cũ
  await editor.clear();
  
  // Type nội dung mới
  await editor.type(content);
}
```

**Note:** CKEditor5 cần click() trước khi type.

#### `uploadImage(imagePath)`
Upload hình ảnh cho bài đăng.

```javascript
async uploadImage(imagePath) {
  info(`Uploading image: ${imagePath}`);
  await this.page.setInputFiles(this.selectors.imageUploadInput, imagePath);
}
```

**Use case:** TC02 - Đăng bài có hình ảnh.

#### `clickPostButton()`
Click nút "Đăng" để submit bài đăng.

```javascript
async clickPostButton() {
  info('Clicking post button');
  const postButton = this.page.locator(this.selectors.postButton);
  await postButton.click();
}
```

#### `createTextPost(content)`
Method tổng hợp: tạo bài đăng chỉ có text.

```javascript
async createTextPost(content) {
  info(`Creating text post: ${content}`);
  await this.enterPostContent(content);
  await this.clickPostButton();
}
```

#### `createImagePost(content, imagePath)`
Method tổng hợp: tạo bài đăng có text và hình ảnh.

```javascript
async createImagePost(content, imagePath) {
  info(`Creating image post: ${content} with image: ${imagePath}`);
  await this.enterPostContent(content);
  await this.uploadImage(imagePath);
  await this.clickPostButton();
}
```

### Post Retrieval Methods

#### `getAllPosts()`
Lấy tất cả bài đăng trên trang.

```javascript
async getAllPosts() {
  debug('Getting all posts');
  const posts = await this.page.locator(this.selectors.postItem).all();
  return posts;
}
```

**Return:** `Array<Locator>` - Mảng các post elements.

#### `getFirstPost()`
Lấy bài đăng đầu tiên (mới nhất).

```javascript
async getFirstPost() {
  debug('Getting first post');
  const firstPost = this.page.locator(this.selectors.postItem).first();
  return firstPost;
}
```

**Use case:** TC04 - Verify bài mới hiển thị trên cùng.

#### `getPostContent(post)`
Lấy nội dung text của một bài đăng.

```javascript
async getPostContent(post) {
  const content = await post.locator(this.selectors.postContent).textContent();
  return content?.trim() || '';
}
```

**Parameters:**
- `post` - Locator của post element (từ `getFirstPost()` hoặc `getAllPosts()`)

**Return:** `string` - Nội dung text của bài đăng.

#### `getPostImage(post)`
Lấy src của hình ảnh trong bài đăng.

```javascript
async getPostImage(post) {
  try {
    const image = post.locator(this.selectors.postImage).first();
    const isVisible = await image.isVisible();
    if (isVisible) {
      return await image.getAttribute('src');
    }
    return null;
  } catch {
    return null;
  }
}
```

**Return:** `string | null` - URL của ảnh hoặc null nếu không có.

### Post Author Methods

#### `getPostUsername(post)`
Lấy username của người đăng.

```javascript
async getPostUsername(post) {
  try {
    const username = await post.locator(this.selectors.postUsername).textContent();
    return username?.trim() || '';
  } catch {
    return '';
  }
}
```

#### `getPostAvatar(post)`
Lấy avatar URL của người đăng.

```javascript
async getPostAvatar(post) {
  try {
    const avatar = post.locator(this.selectors.postAvatar).first();
    const isVisible = await avatar.isVisible();
    if (isVisible) {
      return await avatar.getAttribute('src');
    }
    return null;
  } catch {
    return null;
  }
}
```

#### `getPostTime(post)`
Lấy thời gian đăng bài.

```javascript
async getPostTime(post) {
  try {
    const time = await post.locator(this.selectors.postTime).textContent();
    return time?.trim() || '';
  } catch {
    return '';
  }
}
```

### Verification Methods

#### `verifyPostAtTop(expectedContent)`
Kiểm tra bài đăng có nội dung cụ thể có ở đầu danh sách không.

```javascript
async verifyPostAtTop(expectedContent) {
  debug(`Verifying post "${expectedContent}" appears at top`);
  const firstPost = await this.getFirstPost();
  const content = await this.getPostContent(firstPost);
  return content.includes(expectedContent);
}
```

**Use case:** TC01, TC04 - Verify bài mới ở top.

#### `verifyPostHasImage(post)`
Kiểm tra bài đăng có hình ảnh không.

```javascript
async verifyPostHasImage(post) {
  const imageSrc = await this.getPostImage(post);
  return imageSrc !== null && imageSrc !== '';
}
```

**Use case:** TC02, TC06 - Verify bài có ảnh.

#### `verifyPostHasAuthorInfo(post)`
Kiểm tra bài đăng có thông tin tác giả (username + avatar).

```javascript
async verifyPostHasAuthorInfo(post) {
  const username = await this.getPostUsername(post);
  const avatar = await this.getPostAvatar(post);
  
  return username !== '' && avatar !== null;
}
```

**Use case:** TC05 - Verify hiển thị info người đăng.

#### `verifyImageDisplayedProperly(post)`
Kiểm tra hình ảnh hiển thị đúng (không vỡ, có kích thước hợp lý).

```javascript
async verifyImageDisplayedProperly(post) {
  try {
    const image = post.locator(this.selectors.postImage).first();
    const isVisible = await image.isVisible();
    if (!isVisible) return false;
    
    // Check bounding box (width > 0, height > 0)
    const boundingBox = await image.boundingBox();
    return boundingBox && boundingBox.width > 0 && boundingBox.height > 0;
  } catch {
    return false;
  }
}
```

**Use case:** TC02, TC06 - Verify ảnh hiển thị đúng kích thước.

### Wait & Helper Methods

#### `waitForPostToAppear(content, timeout)`
Đợi bài đăng với nội dung cụ thể xuất hiện.

```javascript
async waitForPostToAppear(content, timeout = 10000) {
  debug(`Waiting for post with content "${content}" to appear`);
  try {
    await this.page.waitForFunction(
      (expectedContent) => {
        const posts = document.querySelectorAll('.bg-white.rounded-2xl.shadow-md');
        for (let post of posts) {
          const postContent = post.querySelector('.text-gray-700 p, p');
          if (postContent && postContent.textContent.includes(expectedContent)) {
            return true;
          }
        }
        return false;
      },
      content,
      { timeout }
    );
  } catch {
    debug('Post did not appear within timeout');
  }
}
```

**Use case:** Đợi bài đăng mới xuất hiện sau khi post.

#### `getPostCount()`
Lấy số lượng bài đăng hiện có.

```javascript
async getPostCount() {
  const posts = await this.page.locator(this.selectors.postItem).count();
  return posts;
}
```

**Use case:** TC04 - Verify có ≥ 2 bài đăng.

#### `getPostEmptyErrorMessage()`
Lấy error message khi đăng bài rỗng.

```javascript
async getPostEmptyErrorMessage() {
  try {
    const isErrorVisible = await this.isVisible(this.selectors.postEmptyError);
    if (isErrorVisible) {
      const message = await this.getText(this.selectors.postEmptyError);
      return message;
    }
    return null;
  } catch {
    return null;
  }
}
```

**Use case:** TC03 - Verify lỗi "Vui lòng nhập nội dung bài đăng".

## 🧪 Test Cases (6 TCs)

### Group 1: Post Creation Tests (3 TCs)

#### TC01 - Đăng bài chỉ có nội dung text
**Mục đích:** Kiểm tra đăng bài text đơn giản thành công.

**Logic:**
1. Tạo nội dung unique với timestamp: `hello-{timestamp}`
2. Click nút "Tạo bài đăng"
3. Nhập nội dung vào editor
4. Click "Đăng"
5. Đợi bài đăng xuất hiện
6. Verify bài đăng hiển thị ở đầu danh sách với đúng nội dung

```javascript
test('TC01 - Đăng bài chỉ có nội dung text', async () => {
  const timestamp = Date.now();
  const postContent = `hello-${timestamp}`;
  
  await test.step(`Nhập "${postContent}" vào ô đăng bài`, async () => {
    await communityPage.clickCreatePostButton();
    await page.waitForTimeout(2000);
    await communityPage.enterPostContent(postContent);
    await page.waitForTimeout(2000);
  });

  await test.step('Nhấn "Đăng"', async () => {
    await communityPage.clickPostButton();
    await page.waitForTimeout(2000);
  });

  await test.step(`Bài viết được hiển thị với nội dung "${postContent}"`, async () => {
    await communityPage.waitForPostToAppear(postContent);
    const isPostAtTop = await communityPage.verifyPostAtTop(postContent);
    expect(isPostAtTop).toBe(true);
  });
});
```

**Lý do sử dụng timestamp:** Đảm bảo nội dung unique để tránh trùng với bài cũ.

#### TC02 - Đăng bài có hình ảnh Arsenal
**Mục đích:** Kiểm tra đăng bài có text và hình ảnh.

**Logic:**
1. Tạo nội dung unique: `Đồ án-{timestamp}`
2. Click nút tạo bài đăng
3. Nhập nội dung
4. Upload hình ảnh Arsenal (`src/test-data/uploads/arsenal.png`)
5. Click "Đăng"
6. Verify bài đăng hiển thị với:
   - Nội dung chứa "Đồ án"
   - Có hình ảnh
   - Hình ảnh hiển thị đúng kích thước (không vỡ)

```javascript
test('TC02 - Đăng bài có hình ảnh Arsenal', async () => {
  const timestamp = Date.now();
  const postContent = `Đồ án-${timestamp}`;
  
  await test.step(`Nhập "${postContent}"`, async () => {
    await communityPage.clickCreatePostButton();
    await communityPage.enterPostContent(postContent);
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
```

**Important checks:**
- `hasImage`: Kiểm tra có ảnh không
- `imageDisplayedProperly`: Kiểm tra ảnh không vỡ (có width, height > 0)

#### TC03 - Đăng bài rỗng
**Mục đích:** Kiểm tra validation khi đăng bài không có nội dung.

**Logic:**
1. Click nút tạo bài đăng
2. Không nhập gì (để trống)
3. Click "Đăng"
4. Verify hiển thị error: "Vui lòng nhập nội dung bài đăng"

```javascript
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
```

### Group 2: Post Display Tests (3 TCs)

#### TC04 - Kiểm tra thứ tự hiển thị bài đăng
**Mục đích:** Verify bài mới nhất hiển thị ở đầu danh sách.

**Logic:**
1. Verify có sẵn ≥ 2 bài đăng
2. Tạo bài đăng mới với content: `Bài mới {timestamp}`
3. Đợi bài đăng xuất hiện
4. Lấy bài đăng đầu tiên
5. Verify nội dung của bài đầu tiên chứa "Bài mới {timestamp}"

```javascript
test('TC04 - Kiểm tra thứ tự hiển thị bài đăng', async () => {
  const timestamp = Date.now();
  const newPostContent = `Bài mới ${timestamp}`;
  
  await test.step('Có sẵn ≥ 2 bài đăng', async () => {
    const postCount = await communityPage.getPostCount();
    expect(postCount).toBeGreaterThanOrEqual(2);
  });

  await test.step('Đăng thêm 1 bài mới', async () => {
    await communityPage.clickCreatePostButton();
    await communityPage.enterPostContent(newPostContent);
    await communityPage.clickPostButton();
    await page.waitForTimeout(2000);
  });

  await test.step('Bài mới hiển thị trên cùng danh sách', async () => {
    const firstPost = await communityPage.getFirstPost();
    const content = await communityPage.getPostContent(firstPost);
    expect(content).toContain(newPostContent);
  });
});
```

**Điều kiện:** Cần có ít nhất 2 bài đăng sẵn để test thứ tự.

#### TC05 - Hiển thị thông tin người đăng
**Mục đích:** Kiểm tra bài đăng hiển thị đầy đủ: Avatar, Username, Time.

**Logic:**
1. Verify có ít nhất 1 bài đăng
2. Lấy bài đăng đầu tiên
3. Verify có thông tin tác giả (username + avatar)
4. Verify username không rỗng
5. Verify avatar có src
6. Verify time tồn tại (có thể rỗng hoặc có giá trị)

```javascript
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
    
    // Username và avatar là required
    expect(username).toBeTruthy();
    expect(username).not.toBe('');
    expect(avatar).toBeTruthy();
    
    // Time có thể optional
    expect(time !== undefined).toBe(true);
  });
});
```

**Kiểm tra:**
- **Username:** Bắt buộc, không rỗng
- **Avatar:** Bắt buộc, có src
- **Time:** Optional, có thể có hoặc không

#### TC06 - Hiển thị ảnh bài đăng
**Mục đích:** Kiểm tra ảnh trong bài đăng hiển thị đầy đủ, không vỡ hình.

**Logic:**
1. Tạo bài đăng mới có ảnh: `Bài có ảnh-{timestamp}`
2. Upload ảnh Arsenal
3. Đăng bài
4. Đợi bài xuất hiện
5. Verify bài đăng chứa text "Bài có ảnh"
6. Verify có hình ảnh
7. Verify hình ảnh hiển thị đầy đủ (không vỡ, có width/height > 0)

```javascript
test('TC06 - Hiển thị ảnh bài đăng', async () => {
  const timestamp = Date.now();
  const postContent = `Bài có ảnh-${timestamp}`;
  
  await test.step('Có bài đăng chứa ảnh', async () => {
    await communityPage.clickCreatePostButton();
    await communityPage.enterPostContent(postContent);
    
    const imagePath = 'src/test-data/uploads/arsenal.png';
    await communityPage.uploadImage(imagePath);
    
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
```

## 📊 Test Data

### Post Content
```javascript
const timestamp = Date.now();
const postContent = `hello-${timestamp}`;  // TC01
const postContent = `Đồ án-${timestamp}`; // TC02
const postContent = `Bài mới ${timestamp}`; // TC04
const postContent = `Bài có ảnh-${timestamp}`; // TC06
```

### Image Files
```javascript
const imagePath = 'src/test-data/uploads/arsenal.png';
```

**Lưu ý:** Luôn sử dụng timestamp để tạo nội dung unique.

## 💡 Best Practices

### 1. Sử dụng waitForPostToAppear thay vì waitForTimeout
```javascript
// Good
await communityPage.waitForPostToAppear(postContent);

// Less reliable
await page.waitForTimeout(5000);
```

### 2. Verify image properly
```javascript
// Good - Kiểm tra cả visible và dimensions
const hasImage = await communityPage.verifyPostHasImage(firstPost);
const imageDisplayedProperly = await communityPage.verifyImageDisplayedProperly(firstPost);
expect(hasImage).toBe(true);
expect(imageDisplayedProperly).toBe(true);

// Bad - Chỉ kiểm tra có src
const imageSrc = await communityPage.getPostImage(firstPost);
expect(imageSrc).toBeTruthy();
```

### 3. Sử dụng unique content
```javascript
// Good - Unique với timestamp
const postContent = `Test post ${Date.now()}`;

// Bad - Có thể trùng
const postContent = 'Test post';
```

### 4. Handle CKEditor5 correctly
```javascript
// Good - Click, clear, then type
await editor.click();
await editor.clear();
await editor.type(content);

// Bad - Chỉ fill (có thể không work với CKEditor)
await editor.fill(content);
```

## 🔍 Common Issues

### Issue 1: CKEditor không nhận text
**Nguyên nhân:** CKEditor cần click trước khi type.  
**Giải pháp:**
```javascript
await editor.click();
await editor.clear();
await editor.type(content);
```

### Issue 2: Bài đăng không xuất hiện
**Nguyên nhân:** Network chậm hoặc cần reload.  
**Giải pháp:**
- Sử dụng `waitForPostToAppear(content)`
- Tăng timeout
- Check console logs

### Issue 3: Không tìm thấy bài đăng vừa tạo
**Nguyên nhân:** Nội dung trùng với bài cũ.  
**Giải pháp:**
- Sử dụng timestamp: `const content = `Test ${Date.now()}``

## 📚 Related Documentation

- [Test Data](../src/test-data/community.test-data.js)
- [Selectors](../src/constants/selectors.js)
- [Routes](../src/constants/routes.js)
- [Upload Files](../src/test-data/uploads/)

---

**Total Test Cases:** 6  
**Coverage:** Post Creation (text, image), Post Display (order, author, image)  
**Last Updated:** October 2025

