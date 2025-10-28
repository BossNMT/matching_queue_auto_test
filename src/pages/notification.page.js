import { BasePage } from '../common/base.page.js';
import { SELECTORS } from '../constants/selectors.js';
import { ROUTES } from '../constants/routes.js';
import { ENV } from '../config/env.config.js';
import { info, debug } from '../utils/logger.utils.js';

export class NotificationPage extends BasePage {
  constructor(page) {
    super(page);

    this.selectors = {
      pageTitle: SELECTORS.NOTIFICATION.PAGE_TITLE,
      notificationList: SELECTORS.NOTIFICATION.NOTIFICATION_LIST,
      notificationItem: SELECTORS.NOTIFICATION.NOTIFICATION_ITEM,
      notificationTitle: SELECTORS.NOTIFICATION.NOTIFICATION_TITLE,
      notificationContent: SELECTORS.NOTIFICATION.NOTIFICATION_CONTENT,
      notificationTime: SELECTORS.NOTIFICATION.NOTIFICATION_TIME,
      notificationIcon: SELECTORS.NOTIFICATION.NOTIFICATION_ICON,
      notificationUnread: SELECTORS.NOTIFICATION.NOTIFICATION_UNREAD,
      notificationRead: SELECTORS.NOTIFICATION.NOTIFICATION_READ,
      tabAll: SELECTORS.NOTIFICATION.TAB_ALL,
      tabUnread: SELECTORS.NOTIFICATION.TAB_UNREAD,
      markReadButton: SELECTORS.NOTIFICATION.MARK_READ_BUTTON,
      deleteAllButton: SELECTORS.NOTIFICATION.DELETE_ALL_BUTTON,
      emptyMessage: SELECTORS.NOTIFICATION.EMPTY_MESSAGE,
      tabPanelAll: SELECTORS.NOTIFICATION.TAB_PANEL_ALL,
      tabPanelUnread: SELECTORS.NOTIFICATION.TAB_PANEL_UNREAD,
    };
  }
  
  async navigate() {
    info('Navigating to Notification page');
    await this.goto(`${ENV.BASE_URL}${ROUTES.NOTIFICATIONS}`);
    await this.waitForPageLoaded();
  }

  async waitForPageLoaded() {
    info('Waiting for Notification page to load');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.selectors.pageTitle);
  }

  async getNotificationCount() {
    info('Getting notification count');
    const count = await this.page.locator(this.selectors.notificationItem).count();
    debug(`Found ${count} notifications`);
    return count;
  }

  async getNotificationItems() {
    info('Getting all notification items');
    return await this.page.locator(this.selectors.notificationItem).all();
  }

  async getFirstNotificationText() {
    info('Getting first notification text');
    const firstNotification = await this.page.locator(this.selectors.notificationContent).first();
    return await firstNotification.textContent();
  }

  async isNotificationListVisible() {
    info('Checking if notification list is visible');
    return await this.page.locator(this.selectors.notificationList).isVisible();
  }

  async isEmptyMessageVisible() {
    info('Checking if empty message is visible');
    try {
      return await this.page.locator(this.selectors.emptyMessage).isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  async clickTabAll() {
    info('Clicking "Tất cả" tab');
    await this.page.locator(this.selectors.tabAll).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickTabUnread() {
    info('Clicking "Chưa đọc" tab');
    await this.page.locator(this.selectors.tabUnread).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickMarkAsReadButton() {
    info('Clicking "Đánh dấu là đã đọc" button');
    await this.page.locator(this.selectors.markReadButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickDeleteAllButton() {
    info('Clicking "Xóa tất cả" button');
    await this.page.locator(this.selectors.deleteAllButton).click();
  }

  async getUnreadNotificationCount() {
    info('Getting unread notification count');
    const count = await this.page.locator(this.selectors.notificationUnread).count();
    debug(`Found ${count} unread notifications`);
    return count;
  }

  async isNotificationUnread(index = 0) {
    info(`Checking if notification at index ${index} is unread`);
    const notification = await this.page.locator(this.selectors.notificationItem).nth(index);
    const classes = await notification.getAttribute('class');
    return classes.includes('bg-[#e3f2fd]');
  }

  async clickFirstNotification() {
    info('Clicking first notification');
    await this.page.locator(this.selectors.notificationItem).first().click();
  }

  async getNotificationTextAt(index) {
    info(`Getting notification text at index ${index}`);
    const notification = await this.page.locator(this.selectors.notificationContent).nth(index);
    return await notification.textContent();
  }

  async getNotificationTimeAt(index) {
    info(`Getting notification time at index ${index}`);
    const time = await this.page.locator(this.selectors.notificationTime).nth(index);
    return await time.textContent();
  }

  async isTabAllActive() {
    info('Checking if "Tất cả" tab is active');
    const tab = await this.page.locator(this.selectors.tabAll);
    const ariaSelected = await tab.getAttribute('aria-selected');
    return ariaSelected === 'true';
  }

  async isTabUnreadActive() {
    info('Checking if "Chưa đọc" tab is active');
    const tab = await this.page.locator(this.selectors.tabUnread);
    const ariaSelected = await tab.getAttribute('aria-selected');
    return ariaSelected === 'true';
  }
}