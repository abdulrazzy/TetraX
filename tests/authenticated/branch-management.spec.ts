import { test, expect } from '@fixtures/authenticated-fixtures';
import { routes } from '@config/environments';

test.describe('Branch Management', () => {
  test.beforeEach(async ({ branchManagementPage }) => {
    await branchManagementPage.open();
  });

  test('should display branch management page with search and filters', async ({
    branchManagementPage,
    page,
  }) => {
    await expect(page).toHaveURL(new RegExp(routes.lab.branchManagement));
    await expect(branchManagementPage.pageHeading).toBeVisible();
    await expect(branchManagementPage.pageDescription).toBeVisible();
    await expect(branchManagementPage.addBranchButton).toBeVisible();
    await expect(branchManagementPage.searchInput).toBeVisible();
    await expect(branchManagementPage.statusFilter).toBeVisible();
  });

  test('should show empty state when no branches exist', async ({ branchManagementPage }) => {
    await expect(branchManagementPage.emptyState).toBeVisible();
  });

  test('should accept search input', async ({ branchManagementPage }) => {
    await branchManagementPage.search('Main');
    await expect(branchManagementPage.searchInput).toHaveValue('Main');
  });
});
