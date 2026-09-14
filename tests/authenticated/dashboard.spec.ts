import { test, expect } from '@fixtures/authenticated-fixtures';
import { routes } from '@config/environments';

test.describe('Lab Dashboard', () => {
  test.beforeEach(async ({ labDashboardPage }) => {
    await labDashboardPage.open();
  });

  test('should load lab dashboard with navigation and quick actions', async ({ labDashboardPage, page }) => {
    await expect(page).toHaveURL(new RegExp(routes.lab.dashboard));
    await expect(labDashboardPage.pageHeading).toBeVisible();
    await expect(labDashboardPage.welcomeMessage).toBeVisible();
    await expect(labDashboardPage.recentReferralsHeading).toBeVisible();
    await expect(labDashboardPage.quickActionsHeading).toBeVisible();
    await expect(labDashboardPage.viewAllReferralsLink).toBeVisible();
    await expect(labDashboardPage.uploadResultsLink).toBeVisible();
    await expect(labDashboardPage.addTechnicianLink).toBeVisible();
    await expect(labDashboardPage.addTestLink).toBeVisible();
    await expect(labDashboardPage.exportReportLink).toBeVisible();
  });

  test('should display full lab sidebar navigation', async ({ labDashboardPage }) => {
    await expect(labDashboardPage.sidebarDashboard).toBeVisible();
    await expect(labDashboardPage.sidebarReferralInbox).toBeVisible();
    await expect(labDashboardPage.sidebarBranchManagement).toBeVisible();
    await expect(labDashboardPage.sidebarTestCatalogue).toBeVisible();
    await expect(labDashboardPage.sidebarTechnicianManagement).toBeVisible();
    await expect(labDashboardPage.sidebarCommissionManagement).toBeVisible();
    await expect(labDashboardPage.sidebarProfileSettings).toBeVisible();
  });
});
