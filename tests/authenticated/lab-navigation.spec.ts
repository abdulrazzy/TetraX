import { test, expect } from '@fixtures/authenticated-fixtures';
import { routes } from '@config/environments';

test.describe('Lab Navigation', () => {
  test('should navigate to referral inbox from sidebar', async ({ labDashboardPage, referralInboxPage, page }) => {
    await labDashboardPage.open();
    await labDashboardPage.goToReferralInbox();

    await expect(page).toHaveURL(new RegExp(routes.lab.referralInbox));
    await expect(referralInboxPage.pageHeading).toBeVisible();
    await expect(referralInboxPage.searchInput).toBeVisible();
    await expect(referralInboxPage.exportButton).toBeVisible();
  });

  test('should show empty state on referral inbox', async ({ referralInboxPage }) => {
    await referralInboxPage.open();

    await expect(referralInboxPage.pageDescription).toBeVisible();
    await expect(referralInboxPage.emptyState).toBeVisible();
    await expect(referralInboxPage.pendingFilter).toBeVisible();
    await expect(referralInboxPage.completedFilter).toBeVisible();
  });

  test('should navigate back to dashboard from referral inbox', async ({ referralInboxPage, labDashboardPage, page }) => {
    await referralInboxPage.open();
    await referralInboxPage.goToDashboard();

    await expect(page).toHaveURL(new RegExp(routes.lab.dashboard));
    await expect(labDashboardPage.pageHeading).toBeVisible();
  });
});
