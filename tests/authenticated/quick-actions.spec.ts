import { test, expect } from '@fixtures/authenticated-fixtures';
import { routes } from '@config/environments';

test.describe('Dashboard Quick Actions', () => {
  test.beforeEach(async ({ labDashboardPage }) => {
    await labDashboardPage.open();
  });

  test('should navigate to referral inbox via View All Referrals', async ({ labDashboardPage, page }) => {
    await labDashboardPage.viewAllReferralsLink.click();
    await expect(page).toHaveURL(new RegExp(routes.lab.referralInbox));
  });

  test('should navigate to referral inbox via Upload Results', async ({ labDashboardPage, page }) => {
    await labDashboardPage.uploadResultsLink.click();
    await expect(page).toHaveURL(new RegExp(routes.lab.referralInbox));
  });

  test('should navigate to technician management via Add Technician', async ({ labDashboardPage, page }) => {
    await labDashboardPage.addTechnicianLink.click();
    await expect(page).toHaveURL(new RegExp(routes.lab.technicianManagement));
  });

  test('should navigate to test catalogue via Add Test', async ({ labDashboardPage, page }) => {
    await labDashboardPage.addTestLink.click();
    await expect(page).toHaveURL(new RegExp(routes.lab.testCatalogue));
  });

  test('should navigate to commission management via Export Report', async ({ labDashboardPage, page }) => {
    await labDashboardPage.exportReportLink.click();
    await expect(page).toHaveURL(new RegExp(routes.lab.commissionManagement));
  });
});

test.describe('Sidebar Navigation', () => {
  test('should navigate to all lab modules from sidebar', async ({ labDashboardPage, page }) => {
    await labDashboardPage.open();

    const modules = [
      { link: () => labDashboardPage.goToBranchManagement(), route: routes.lab.branchManagement, heading: 'Branch Management' },
      { link: () => labDashboardPage.goToTestCatalogue(), route: routes.lab.testCatalogue, heading: 'Test Catalogue Management' },
      { link: () => labDashboardPage.goToTechnicianManagement(), route: routes.lab.technicianManagement, heading: 'Technician Management' },
      { link: () => labDashboardPage.goToCommissionManagement(), route: routes.lab.commissionManagement, heading: 'Commission Management' },
      { link: () => labDashboardPage.goToProfileSettings(), route: routes.lab.settings, heading: 'Lab Profile & Settings' },
    ];

    for (const mod of modules) {
      await mod.link();
      await expect(page).toHaveURL(new RegExp(mod.route));
      await expect(page.getByRole('heading', { name: mod.heading, level: 1 })).toBeVisible();
    }
  });
});
