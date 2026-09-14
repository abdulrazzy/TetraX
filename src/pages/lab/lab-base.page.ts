import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export abstract class LabBasePage extends BasePage {
  readonly sidebarDashboard: Locator;
  readonly sidebarReferralInbox: Locator;
  readonly sidebarBranchManagement: Locator;
  readonly sidebarTestCatalogue: Locator;
  readonly sidebarTechnicianManagement: Locator;
  readonly sidebarCommissionManagement: Locator;
  readonly sidebarProfileSettings: Locator;
  readonly darkModeToggle: Locator;
  readonly notificationsButton: Locator;

  constructor(page: Page) {
    super(page);

    this.sidebarDashboard = page.getByRole('link', { name: 'Dashboard', exact: true });
    this.sidebarReferralInbox = page.getByRole('link', { name: 'Referral Inbox' });
    this.sidebarBranchManagement = page.getByRole('link', { name: 'Branch Management' });
    this.sidebarTestCatalogue = page.getByRole('link', { name: 'Test Catalogue Management' });
    this.sidebarTechnicianManagement = page.getByRole('link', { name: 'Technician Management' });
    this.sidebarCommissionManagement = page.getByRole('link', { name: 'Commission Management' });
    this.sidebarProfileSettings = page.getByRole('link', { name: 'Lab Profile & Settings' });
    this.darkModeToggle = page.getByRole('button', { name: /switch to (dark|light) mode/i });
    this.notificationsButton = page.getByRole('button', { name: 'Notifications' });
  }

  async expectSidebarVisible(): Promise<void> {
    await this.sidebarDashboard.waitFor({ state: 'visible' });
    await this.sidebarReferralInbox.waitFor({ state: 'visible' });
  }

  async goToDashboard(): Promise<void> {
    await this.sidebarDashboard.click();
  }

  async goToReferralInbox(): Promise<void> {
    await this.sidebarReferralInbox.click();
  }

  async goToBranchManagement(): Promise<void> {
    await this.sidebarBranchManagement.click();
  }

  async goToTestCatalogue(): Promise<void> {
    await this.sidebarTestCatalogue.click();
  }

  async goToTechnicianManagement(): Promise<void> {
    await this.sidebarTechnicianManagement.click();
  }

  async goToCommissionManagement(): Promise<void> {
    await this.sidebarCommissionManagement.click();
  }

  async goToProfileSettings(): Promise<void> {
    await this.sidebarProfileSettings.click();
  }
}
