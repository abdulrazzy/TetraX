import { test, expect } from '@fixtures/authenticated-fixtures';
import { routes } from '@config/environments';

test.describe('Test Catalogue', () => {
  test.beforeEach(async ({ testCataloguePage }) => {
    await testCataloguePage.open();
  });

  test('should display test catalogue with actions and filters', async ({ testCataloguePage, page }) => {
    await expect(page).toHaveURL(new RegExp(routes.lab.testCatalogue));
    await expect(testCataloguePage.pageHeading).toBeVisible();
    await expect(testCataloguePage.pageDescription).toBeVisible();
    await expect(testCataloguePage.exportButton).toBeVisible();
    await expect(testCataloguePage.addTestButton).toBeVisible();
    await expect(testCataloguePage.searchInput).toBeVisible();
    await expect(testCataloguePage.categoryFilter).toBeVisible();
    await expect(testCataloguePage.statusFilter).toBeVisible();
    await expect(testCataloguePage.branchFilter).toBeVisible();
  });

  test('should show empty state when no tests exist', async ({ testCataloguePage }) => {
    await expect(testCataloguePage.emptyState).toBeVisible();
  });

  test('should accept search by specimen type', async ({ testCataloguePage }) => {
    await testCataloguePage.search('blood');
    await expect(testCataloguePage.searchInput).toHaveValue('blood');
  });
});
