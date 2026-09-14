import { Locator, Page } from '@playwright/test';
import { LabBasePage } from './lab-base.page';
import { routes } from '@config/environments';

export class ReferralInboxPage extends LabBasePage {
  readonly path = routes.lab.referralInbox;

  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly searchInput: Locator;
  readonly exportButton: Locator;
  readonly allStatusFilter: Locator;
  readonly pendingFilter: Locator;
  readonly receivedFilter: Locator;
  readonly completedFilter: Locator;
  readonly rejectedFilter: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Referral Inbox', level: 1 });
    this.pageDescription = page.getByText('View and manage incoming referrals.');
    this.searchInput = page.getByPlaceholder('Search referrals...');
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.allStatusFilter = page.getByRole('button', { name: /^All \d+/ });
    this.pendingFilter = page.getByRole('button', { name: /^Pending \d+/ });
    this.receivedFilter = page.getByRole('button', { name: /^Received \d+/ });
    this.completedFilter = page.getByRole('button', { name: /^Completed \d+/ });
    this.rejectedFilter = page.getByRole('button', { name: /^Rejected \d+/ });
    this.emptyState = page.getByText('No referrals found');
  }

  async open(): Promise<void> {
    await this.goto(this.path);
    await this.pageHeading.waitFor({ state: 'visible' });
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }
}
