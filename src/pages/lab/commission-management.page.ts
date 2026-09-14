import { Locator, Page } from '@playwright/test';
import { LabBasePage } from './lab-base.page';
import { routes } from '@config/environments';

export class CommissionManagementPage extends LabBasePage {
  readonly path = routes.lab.commissionManagement;

  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly exportButton: Locator;
  readonly newRateCardButton: Locator;
  readonly exportReportButton: Locator;
  readonly searchInput: Locator;
  readonly rateTypeFilter: Locator;
  readonly practitionerFilter: Locator;
  readonly monthlySummaryHeading: Locator;
  readonly grossRevenueLabel: Locator;
  readonly commissionPaidLabel: Locator;
  readonly netRevenueLabel: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Commission Management', level: 1 });
    this.pageDescription = page.getByText('Track and manage commissions for referrals.');
    this.exportButton = page.getByRole('button', { name: 'Export', exact: true });
    this.newRateCardButton = page.getByRole('button', { name: 'New Rate Card' });
    this.exportReportButton = page.getByRole('button', { name: /export report/i });
    this.searchInput = page.getByPlaceholder('Search by practitioner name, ID, or specialty...');
    this.rateTypeFilter = page.getByRole('button', { name: 'All Rate Types' });
    this.practitionerFilter = page.getByRole('button', { name: 'All Practitioners' });
    this.monthlySummaryHeading = page.getByRole('heading', { name: /monthly commission summary/i });
    this.grossRevenueLabel = page.getByText('Gross Revenue');
    this.commissionPaidLabel = page.getByText('Total Commission Paid');
    this.netRevenueLabel = page.getByText('Net Lab Revenue');
    this.emptyState = page.getByText('No records found');
  }

  async open(): Promise<void> {
    await this.goto(this.path);
    await this.pageHeading.waitFor({ state: 'visible' });
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }
}
