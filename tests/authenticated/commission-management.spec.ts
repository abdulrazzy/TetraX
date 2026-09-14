import { test, expect } from '@fixtures/authenticated-fixtures';
import { routes } from '@config/environments';

test.describe('Commission Management', () => {
  test.beforeEach(async ({ commissionManagementPage }) => {
    await commissionManagementPage.open();
  });

  test('should display commission dashboard with summary metrics', async ({
    commissionManagementPage,
    page,
  }) => {
    await expect(page).toHaveURL(new RegExp(routes.lab.commissionManagement));
    await expect(commissionManagementPage.pageHeading).toBeVisible();
    await expect(commissionManagementPage.pageDescription).toBeVisible();
    await expect(commissionManagementPage.exportButton).toBeVisible();
    await expect(commissionManagementPage.newRateCardButton).toBeVisible();
    await expect(commissionManagementPage.exportReportButton).toBeVisible();
    await expect(commissionManagementPage.monthlySummaryHeading).toBeVisible();
    await expect(commissionManagementPage.grossRevenueLabel).toBeVisible();
    await expect(commissionManagementPage.commissionPaidLabel).toBeVisible();
    await expect(commissionManagementPage.netRevenueLabel).toBeVisible();
  });

  test('should display practitioner search and rate filters', async ({ commissionManagementPage }) => {
    await expect(commissionManagementPage.searchInput).toBeVisible();
    await expect(commissionManagementPage.rateTypeFilter).toBeVisible();
    await expect(commissionManagementPage.practitionerFilter).toBeVisible();
    await expect(commissionManagementPage.emptyState).toBeVisible();
  });

  test('should accept practitioner search input', async ({ commissionManagementPage }) => {
    await commissionManagementPage.search('cardiology');
    await expect(commissionManagementPage.searchInput).toHaveValue('cardiology');
  });
});
