import { test, expect } from '@fixtures/authenticated-fixtures';
import { routes } from '@config/environments';

test.describe('Lab Profile & Settings', () => {
  test.beforeEach(async ({ labSettingsPage }) => {
    await labSettingsPage.open();
  });

  test('should display settings page with profile form fields', async ({ labSettingsPage, page }) => {
    await expect(page).toHaveURL(new RegExp(routes.lab.settings));
    await expect(labSettingsPage.pageHeading).toBeVisible();
    await expect(labSettingsPage.pageDescription).toBeVisible();
    await expect(labSettingsPage.saveChangesButton).toBeVisible();
    await expect(labSettingsPage.laboratoryNameInput).toBeVisible();
    await expect(labSettingsPage.registrationNumberInput).toBeVisible();
    await expect(labSettingsPage.directorNameInput).toBeVisible();
    await expect(labSettingsPage.phoneInput).toBeVisible();
    await expect(labSettingsPage.emailInput).toBeVisible();
    await expect(labSettingsPage.locationInput).toBeVisible();
    await expect(labSettingsPage.uploadLogoButton).toBeVisible();
  });

  test('should show populated lab profile data', async ({ labSettingsPage }) => {
    await expect(labSettingsPage.laboratoryNameInput).not.toBeEmpty();
    await expect(labSettingsPage.registrationNumberInput).not.toBeEmpty();
    await expect(labSettingsPage.directorNameInput).not.toBeEmpty();
    await expect(labSettingsPage.locationInput).not.toBeEmpty();
  });

  test('should display compliance and certification sections', async ({ labSettingsPage, page }) => {
    await labSettingsPage.switchToCompliance();
    await expect(labSettingsPage.certificationsHeading).toBeVisible();
    await expect(labSettingsPage.hipaaHeading).toBeVisible();
    await expect(page.getByText('Data Encryption at Rest')).toBeVisible();
    await expect(page.getByText('Audit Logging')).toBeVisible();
  });

  test('should navigate settings tabs', async ({ labSettingsPage, page }) => {
    await expect(labSettingsPage.labProfileTab).toBeVisible();
    await expect(labSettingsPage.complianceTab).toBeVisible();
    await expect(labSettingsPage.notificationsTab).toBeVisible();
    await expect(labSettingsPage.userRolesTab).toBeVisible();

    await labSettingsPage.switchToNotifications();
    await expect(labSettingsPage.notificationsHeading).toBeVisible();
    await expect(page.getByText('New Referral Received')).toBeVisible();
    await expect(page.getByText('Critical Results Alert')).toBeVisible();

    await labSettingsPage.switchToUserRoles();
    await expect(labSettingsPage.roleManagementHeading).toBeVisible();
    await expect(labSettingsPage.addRoleEmptyState).toBeVisible();

    await labSettingsPage.switchToLabProfile();
    await expect(labSettingsPage.laboratoryNameInput).toBeVisible();
  });
});
