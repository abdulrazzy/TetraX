import { Locator, Page } from '@playwright/test';
import { LabBasePage } from './lab-base.page';
import { routes } from '@config/environments';

export class TechnicianManagementPage extends LabBasePage {
  readonly path = routes.lab.technicianManagement;

  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly addTechnicianButton: Locator;
  readonly searchInput: Locator;
  readonly roleFilter: Locator;
  readonly branchFilter: Locator;
  readonly statusFilter: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Technician Management', level: 1 });
    this.pageDescription = page.getByText('Manage lab technicians, roles, and assignments.');
    this.addTechnicianButton = page.getByRole('button', { name: 'Add Technician' });
    this.searchInput = page.getByPlaceholder('Search user...');
    this.roleFilter = page.getByRole('button', { name: 'All Roles' });
    this.branchFilter = page.getByRole('button', { name: 'All Branches' });
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
