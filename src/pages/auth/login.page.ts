import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { routes } from '@config/environments';

export class LoginPage extends BasePage {
  readonly path = routes.auth.login;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly darkModeToggle: Locator;

  readonly welcomeHeading: Locator;
  readonly heroHeading: Locator;
  readonly emailRequiredError: Locator;
  readonly passwordRequiredError: Locator;
  readonly formErrorBanner: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByLabel(/email or phone number/i);
    this.passwordInput = page.getByLabel(/^password/i);
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i });
    this.signInButton = page.getByRole('button', { name: /sign in/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.signUpLink = page.getByRole('link', { name: /sign up/i });
    this.darkModeToggle = page.getByRole('button', { name: /switch to (dark|light) mode/i });

    this.welcomeHeading = page.getByRole('heading', { name: /welcome back/i });
    this.heroHeading = page.getByRole('heading', { name: /streamline your/i });
    this.emailRequiredError = page.getByText('Email is required');
    this.passwordRequiredError = page.getByText('Password is required');
    this.formErrorBanner = page.getByText('Please fill in all the required fields');
  }

  async open(): Promise<void> {
    await this.goto(this.path);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Tab');
    await this.signInButton.click();
  }

  async submitEmptyForm(): Promise<void> {
    await this.signInButton.click();
  }

  async toggleDarkMode(): Promise<void> {
    await this.darkModeToggle.click();
  }

  async goToForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async goToSignUp(): Promise<void> {
    await this.signUpLink.click();
  }
}
