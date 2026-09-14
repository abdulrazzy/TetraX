import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/auth/login.page';
import { ForgotPasswordPage } from '@pages/auth/forgot-password.page';
import { LabDashboardPage } from '@pages/lab/dashboard.page';
import { ReferralInboxPage } from '@pages/lab/referral-inbox.page';
import { BranchManagementPage } from '@pages/lab/branch-management.page';
import { TestCataloguePage } from '@pages/lab/test-catalogue.page';
import { TechnicianManagementPage } from '@pages/lab/technician-management.page';
import { CommissionManagementPage } from '@pages/lab/commission-management.page';
import { LabSettingsPage } from '@pages/lab/settings.page';

type PageFixtures = {
  loginPage: LoginPage;
  forgotPasswordPage: ForgotPasswordPage;
  labDashboardPage: LabDashboardPage;
  referralInboxPage: ReferralInboxPage;
  branchManagementPage: BranchManagementPage;
  testCataloguePage: TestCataloguePage;
  technicianManagementPage: TechnicianManagementPage;
  commissionManagementPage: CommissionManagementPage;
  labSettingsPage: LabSettingsPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },

  labDashboardPage: async ({ page }, use) => {
    await use(new LabDashboardPage(page));
  },

  referralInboxPage: async ({ page }, use) => {
    await use(new ReferralInboxPage(page));
  },

  branchManagementPage: async ({ page }, use) => {
    await use(new BranchManagementPage(page));
  },

  testCataloguePage: async ({ page }, use) => {
    await use(new TestCataloguePage(page));
  },

  technicianManagementPage: async ({ page }, use) => {
    await use(new TechnicianManagementPage(page));
  },

  commissionManagementPage: async ({ page }, use) => {
    await use(new CommissionManagementPage(page));
  },

  labSettingsPage: async ({ page }, use) => {
    await use(new LabSettingsPage(page));
  },
});

export { expect } from '@playwright/test';
