import { test, expect } from '@fixtures/authenticated-fixtures';
import { routes } from '@config/environments';

test.describe('Technician Management', () => {
  test.beforeEach(async ({ technicianManagementPage }) => {
    await technicianManagementPage.open();
  });

  test('should display technician management with filters', async ({
    technicianManagementPage,
    page,
  }) => {
    await expect(page).toHaveURL(new RegExp(routes.lab.technicianManagement));
    await expect(technicianManagementPage.pageHeading).toBeVisible();
    await expect(technicianManagementPage.pageDescription).toBeVisible();
    await expect(technicianManagementPage.addTechnicianButton).toBeVisible();
    await expect(technicianManagementPage.searchInput).toBeVisible();
    await expect(technicianManagementPage.roleFilter).toBeVisible();
    await expect(technicianManagementPage.branchFilter).toBeVisible();
    await expect(technicianManagementPage.statusFilter).toBeVisible();
  });

  test('should show empty state when no technicians exist', async ({ technicianManagementPage }) => {
    await expect(technicianManagementPage.emptyState).toBeVisible();
  });

  test('should accept user search input', async ({ technicianManagementPage }) => {
    await technicianManagementPage.search('technician');
    await expect(technicianManagementPage.searchInput).toHaveValue('technician');
  });
});
