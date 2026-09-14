import { test, expect } from '@fixtures/test-fixtures';
import { routes } from '@config/environments';

test.describe('Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('should display login page with branding and form elements', async ({ loginPage, page }) => {
    await expect(page).toHaveTitle('Tetra Dx');
    await expect(loginPage.welcomeHeading).toBeVisible();
    await expect(loginPage.heroHeading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.signUpLink).toBeVisible();
    await expect(loginPage.darkModeToggle).toBeVisible();
  });

  test('should redirect root URL to login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(new RegExp(routes.auth.login));
  });

  test('should show validation errors when submitting empty form', async ({ loginPage }) => {
    await loginPage.submitEmptyForm();

    await expect(loginPage.emailRequiredError).toBeVisible();
    await expect(loginPage.passwordRequiredError).toBeVisible();
    await expect(loginPage.formErrorBanner).toBeVisible();
  });

  test('should have correct placeholder on email field', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toHaveAttribute('placeholder', 'email@tetradx.com');
  });

  test('should toggle dark mode', async ({ loginPage, page }) => {
    const html = page.locator('html');

    await loginPage.toggleDarkMode();
    await expect(loginPage.darkModeToggle).toHaveAttribute('title', /switch to light mode/i);

    await loginPage.toggleDarkMode();
    await expect(loginPage.darkModeToggle).toHaveAttribute('title', /switch to dark mode/i);
    await expect(html).toBeVisible();
  });

  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    await loginPage.goToForgotPassword();
    await expect(page).toHaveURL(new RegExp(routes.auth.forgotPassword));
  });

  test('should navigate to sign up page', async ({ loginPage, page }) => {
    await loginPage.goToSignUp();
    await expect(page).toHaveURL(new RegExp(routes.auth.signup));
  });
});
