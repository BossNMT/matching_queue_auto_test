/**
 * Community Page Object Model
 * Quản lý tất cả các interactions với trang Community
 */

import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { ENV } from '../config/env.config.js';
import { info, debug } from '../utils/logger.utils.js';

export class CommunityPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.selectors = {
      createPostButton: SELECTORS.COMMUNITY.CREATE_POST_BUTTON,
      postInput: SELECTORS.COMMUNITY.POST_INPUT,
      postButton: SELECTORS.COMMUNITY.POST_BUTTON,
      imageUploadInput: SELECTORS.COMMUNITY.IMAGE_UPLOAD_INPUT,
      imageUploadButton: SELECTORS.COMMUNITY.IMAGE_UPLOAD_BUTTON,
      postList: SELECTORS.COMMUNITY.POST_LIST,
      postItem: SELECTORS.COMMUNITY.POST_ITEM,
      postContent: SELECTORS.COMMUNITY.POST_CONTENT,
      postImage: SELECTORS.COMMUNITY.POST_IMAGE,
      postAuthor: SELECTORS.COMMUNITY.POST_AUTHOR,
      postUsername: SELECTORS.COMMUNITY.POST_USERNAME,
      postAvatar: SELECTORS.COMMUNITY.POST_AVATAR,
      postTime: SELECTORS.COMMUNITY.POST_TIME,
      postEmptyError: SELECTORS.COMMUNITY.POST_EMPTY_ERROR,
      loadingPosts: SELECTORS.COMMUNITY.LOADING_POSTS,
    };
  }

  /**
   * Navigate to community page
   */
  async navigate() {
    info('Navigating to Community page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.COMMUNITY}`);
    await this.waitForPageLoaded();
  }

  /**
   * Wait for community page to load
   */
  async waitForPageLoaded() {
    debug('Waiting for community page to load');
    await Promise.all([
      this.waitFor(this.selectors.createPostButton),
    ]);
  }

  async clickCreatePostButton() {
    info('Clicking create post button');
    const createPostButton = this.page.locator(this.selectors.createPostButton);
    await createPostButton.click();
  }

  /**
   * Enter post content in CKEditor5
   * @param {string} content 
   */
  async enterPostContent(content) {
    info(`Entering post content: ${content}`);
    const editor = this.page.locator(this.selectors.postInput);
    
    // Click on the editor to focus it
    await editor.click();
    
    // Clear existing content if any
    await editor.clear();
    
    // Type the content into the CKEditor5
    await editor.type(content);
  }

  /**
   * Clear post input
   */
  async clearPostInput() {
    info('Clearing post input');
    const editor = this.page.locator(this.selectors.postInput);
    await editor.click();
    await editor.clear();
  }

  /**
   * Click post button
   */
  async clickPostButton() {
    info('Clicking post button');
    const postButton = this.page.locator(this.selectors.postButton);
    await postButton.click();
  }

  /**
   * Upload image for post
   * @param {string} imagePath 
   */
  async uploadImage(imagePath) {
    info(`Uploading image: ${imagePath}`);
    await this.page.setInputFiles(this.selectors.imageUploadInput, imagePath);
  }

  /**
   * Click image upload button
   */
  async clickImageUploadButton() {
    info('Clicking image upload button');
    await this.click(this.selectors.imageUploadButton);
  }

  /**
   * Create a text-only post
   * @param {string} content 
   */
  async createTextPost(content) {
    info(`Creating text post: ${content}`);
    await this.enterPostContent(content);
    await this.clickPostButton();
  }

  /**
   * Create a post with image
   * @param {string} content 
   * @param {string} imagePath 
   */
  async createImagePost(content, imagePath) {
    info(`Creating image post: ${content} with image: ${imagePath}`);
    await this.enterPostContent(content);
    await this.uploadImage(imagePath);
    await this.clickPostButton();
  }

  /**
   * Get all posts
   * @returns {Promise<Array>}
   */
  async getAllPosts() {
    debug('Getting all posts');
    const posts = await this.page.locator(this.selectors.postItem).all();
    return posts;
  }

  /**
   * Get first post
   * @returns {Promise<Object>}
   */
  async getFirstPost() {
    debug('Getting first post');
    const firstPost = this.page.locator(this.selectors.postItem).first();
    return firstPost;
  }

  /**
   * Get post content
   * @param {Object} post 
   * @returns {Promise<string>}
   */
  async getPostContent(post) {
    const content = await post.locator(this.selectors.postContent).textContent();
    return content?.trim() || '';
  }

  /**
   * Get post image
   * @param {Object} post 
   * @returns {Promise<string|null>}
   */
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

  /**
   * Get post author username
   * @param {Object} post 
   * @returns {Promise<string>}
   */
  async getPostUsername(post) {
    try {
      const username = await post.locator(this.selectors.postUsername).textContent();
      return username?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Get post author avatar
   * @param {Object} post 
   * @returns {Promise<string|null>}
   */
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

  /**
   * Get post time
   * @param {Object} post 
   * @returns {Promise<string>}
   */
  async getPostTime(post) {
    try {
      const time = await post.locator(this.selectors.postTime).textContent();
      return time?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Get post empty error message
   * @returns {Promise<string|null>}
   */
  async getPostEmptyErrorMessage() {
    try {
      const isErrorVisible = await this.isVisible(this.selectors.postEmptyError);
      if (isErrorVisible) {
        const message = await this.getText(this.selectors.postEmptyError);
        info(`Post empty error message: ${message}`);
        return message;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if post input is empty
   * @returns {Promise<boolean>}
   */
  async isPostInputEmpty() {
    const editor = this.page.locator(this.selectors.postInput);
    const text = await editor.textContent();
    return !text || text.trim() === '';
  }

  /**
   * Check if post button is enabled
   * @returns {Promise<boolean>}
   */
  async isPostButtonEnabled() {
    return await this.isEnabled(this.selectors.postButton);
  }

  /**
   * Check if posts are loading
   * @returns {Promise<boolean>}
   */
  async isLoadingPosts() {
    try {
      return await this.page.locator(this.selectors.loadingPosts).isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Wait for posts to load
   */
  async waitForPostsToLoad() {
    debug('Waiting for posts to load');
    try {
      await this.page.waitForSelector(this.selectors.postItem, { timeout: 10000 });
    } catch {
      // Posts might not exist yet, that's okay
      debug('No posts found or still loading');
    }
  }

  /**
   * Get post count
   * @returns {Promise<number>}
   */
  async getPostCount() {
    const posts = await this.page.locator(this.selectors.postItem).count();
    return posts;
  }

  /**
   * Verify post appears at top of list
   * @param {string} expectedContent 
   * @returns {Promise<boolean>}
   */
  async verifyPostAtTop(expectedContent) {
    debug(`Verifying post "${expectedContent}" appears at top`);
    const firstPost = await this.getFirstPost();
    const content = await this.getPostContent(firstPost);
    return content.includes(expectedContent);
  }

  /**
   * Verify post has image
   * @param {Object} post 
   * @returns {Promise<boolean>}
   */
  async verifyPostHasImage(post) {
    const imageSrc = await this.getPostImage(post);
    return imageSrc !== null && imageSrc !== '';
  }

  /**
   * Verify post has author info
   * @param {Object} post 
   * @returns {Promise<boolean>}
   */
  async verifyPostHasAuthorInfo(post) {
    const username = await this.getPostUsername(post);
    const avatar = await this.getPostAvatar(post);
    
    // Username is required, avatar is also required for basic author info
    return username !== '' && avatar !== null;
  }

  /**
   * Verify image is displayed properly
   * @param {Object} post 
   * @returns {Promise<boolean>}
   */
  async verifyImageDisplayedProperly(post) {
    try {
      const image = post.locator(this.selectors.postImage).first();
      const isVisible = await image.isVisible();
      if (!isVisible) return false;
      
      // Check if image has proper dimensions
      const boundingBox = await image.boundingBox();
      return boundingBox && boundingBox.width > 0 && boundingBox.height > 0;
    } catch {
      return false;
    }
  }

  /**
   * Take screenshot of community page
   * @param {string} name 
   */
  async takeCommunityPageScreenshot(name = 'community_page') {
    return await this.screenshot(name);
  }

  /**
   * Wait for post to appear
   * @param {string} content 
   * @param {number} timeout 
   */
  async waitForPostToAppear(content, timeout = 10000) {
    debug(`Waiting for post with content "${content}" to appear`);
    try {
      await this.page.waitForFunction(
        (expectedContent) => {
          const posts = document.querySelectorAll('.bg-white.rounded-2xl.shadow-md, .rounded-2xl.shadow-md');
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

  /**
   * Refresh posts
   */
  async refreshPosts() {
    info('Refreshing posts');
    await this.page.reload();
    await this.waitForPageLoaded();
  }
}

export default CommunityPage;
