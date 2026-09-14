import { Locator, Page } from '@playwright/test';
import { LabBasePage } from './lab-base.page';
import { routes } from '@config/environments';

export class TestCataloguePage extends LabBasePage {
  readonly path = routes.lab.testCatalogue;

  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly exportButton: Locator;
  readonly addTestButton: Locator;
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly statusFilter: Locator;
  readonly branchFilter: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Test Catalogue Management', level: 1 });
    this.pageDescription = page.getByText('Manage laboratory tests, pricing, and availability across branches.');
    this.exportButton = page.getByRole('button', { name: 'Export', exact: true });
    this.addTestButton = page.getByRole('button', { name: 'Add Test' });
    this.searchInput = page.getByPlaceholder('Search by name, or specimen type...');
    this.categoryFilter = page.getByRole('button', { name: 'All Categories' });
    this.statusFilter = page.getByRole('button', { name: 'All Status' });
    this.branchFilter = page.getByRole('button', { name: 'All Branches' });
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
