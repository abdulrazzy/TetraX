import { Locator, Page } from '@playwright/test';
import { LabBasePage } from './lab-base.page';
import { routes } from '@config/environments';

export class LabDashboardPage extends LabBasePage {
  readonly path = routes.lab.dashboard;

  readonly pageHeading: Locator;
  readonly welcomeMessage: Locator;
  readonly recentReferralsHeading: Locator;
  readonly quickActionsHeading: Locator;
  readonly viewAllReferralsLink: Locator;
  readonly uploadResultsLink: Locator;
  readonly addTechnicianLink: Locator;
  readonly addTestLink: Locator;
  readonly exportReportLink: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Dashboard', level: 1 });
    this.welcomeMessage = page.getByText(/welcome back/i);
    this.recentReferralsHeading = page.getByRole('heading', { name: 'Recent Referrals' });
    this.quickActionsHeading = page.getByRole('heading', { name: 'Quick Actions' });
    this.viewAllReferralsLink = page.getByRole('link', { name: 'View All Referrals' });
    this.uploadResultsLink = page.getByRole('link', { name: 'Upload Results' });
    this.addTechnicianLink = page.getByRole('link', { name: 'Add Technician' });
    this.addTestLink = page.getByRole('link', { name: /add test/i });
    this.exportReportLink = page.getByRole('link', { name: 'Export Report' });
  }

  async open(): Promise<void> {
    await this.goto(this.path);
    await this.expectSidebarVisible();
  }
}
