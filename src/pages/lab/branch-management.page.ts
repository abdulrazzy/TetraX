import { Locator, Page } from '@playwright/test';
import { LabBasePage } from './lab-base.page';
import { routes } from '@config/environments';

export class BranchManagementPage extends LabBasePage {
  readonly path = routes.lab.branchManagement;

  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly addBranchButton: Locator;
  readonly searchInput: Locator;
  readonly statusFilter: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Branch Management', level: 1 });
    this.pageDescription = page.getByText('Manage all laboratory branch locations and settings.');
    this.addBranchButton = page.getByRole('button', { name: 'Add Branch' });
    this.searchInput = page.getByPlaceholder('Search branches...');
    this.statusFilter = page.getByRole('button', { name: 'All Statuses' });
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
