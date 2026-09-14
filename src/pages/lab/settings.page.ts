import { Locator, Page } from '@playwright/test';
import { LabBasePage } from './lab-base.page';
import { routes } from '@config/environments';

export class LabSettingsPage extends LabBasePage {
  readonly path = routes.lab.settings;

  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly saveChangesButton: Locator;
  readonly labProfileTab: Locator;
  readonly complianceTab: Locator;
  readonly notificationsTab: Locator;
  readonly userRolesTab: Locator;

  readonly laboratoryNameInput: Locator;
  readonly registrationNumberInput: Locator;
  readonly directorNameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly locationInput: Locator;
  readonly uploadLogoButton: Locator;

  readonly hipaaHeading: Locator;
  readonly certificationsHeading: Locator;
  readonly notificationsHeading: Locator;
  readonly roleManagementHeading: Locator;
  readonly addRoleEmptyState: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Lab Profile & Settings', level: 1 });
    this.pageDescription = page.getByText(
      'Configure lab information, compliance settings, notifications, and security preferences.',
    );
    this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
    this.labProfileTab = page.getByRole('button', { name: /lab profile/i });
    this.complianceTab = page.getByRole('button', { name: 'Compliance', exact: true });
    this.notificationsTab = page.getByRole('button', { name: 'Notifications' }).nth(1);
    this.userRolesTab = page.getByRole('button', { name: 'User Roles' });

    this.laboratoryNameInput = page.getByLabel('Laboratory Name');
    this.registrationNumberInput = page.getByLabel('Registration Number');
    this.directorNameInput = page.getByLabel('Director Name');
    this.phoneInput = page.getByLabel('Phone');
    this.emailInput = page.getByLabel('Email');
    this.locationInput = page.getByLabel('Location');
    this.uploadLogoButton = page.getByRole('button', { name: 'Upload New' });

    this.hipaaHeading = page.getByRole('heading', { name: 'HIPAA Compliance Settings' });
    this.certificationsHeading = page.getByRole('heading', { name: 'Certifications & Licenses' });
    this.notificationsHeading = page.getByRole('heading', { name: 'Notifications', exact: true, level: 3 });
    this.roleManagementHeading = page.getByRole('heading', { name: 'Role Management' });
    this.addRoleEmptyState = page.getByText(/no roles found/i);
  }

  async open(): Promise<void> {
    await this.goto(this.path);
    await this.pageHeading.waitFor({ state: 'visible' });
  }

  async switchToCompliance(): Promise<void> {
    await this.complianceTab.click();
  }

  async switchToNotifications(): Promise<void> {
    await this.notificationsTab.click();
  }

  async switchToUserRoles(): Promise<void> {
    await this.userRolesTab.click();
  }

  async switchToLabProfile(): Promise<void> {
    await this.labProfileTab.click();
  }
}
