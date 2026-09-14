import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { routes } from '@config/environments';

export class ForgotPasswordPage extends BasePage {
  readonly path = routes.auth.forgotPassword;

  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly backToLoginLink: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByLabel(/email/i);
    this.submitButton = page.getByRole('button', { name: /reset|submit|send/i });
    this.backToLoginLink = page.getByRole('link', { name: /back|sign in|login/i });
  }

  async open(): Promise<void> {
    await this.goto(this.path);
  }

  async requestReset(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}
