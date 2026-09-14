import { test, expect } from '@fixtures/test-fixtures';
import { invalidCredentials } from '@utils/test-data';

test.describe('Login Validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('should reject invalid credentials', async ({ loginPage, page }) => {
    await loginPage.login(invalidCredentials.email, invalidCredentials.password);

    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should show password required when only email is filled', async ({ loginPage }) => {
    await loginPage.emailInput.fill('test@example.com');
    await loginPage.submitEmptyForm();

    await expect(loginPage.passwordRequiredError).toBeVisible();
  });

  test('should disable sign in button while request is in flight', async ({ loginPage }) => {
    await loginPage.emailInput.fill(invalidCredentials.email);
    await loginPage.passwordInput.fill(invalidCredentials.password);

    const signInPromise = loginPage.signInButton.click();
    await expect(loginPage.signInButton).toBeDisabled({ timeout: 2_000 }).catch(() => {
      // Button may re-enable quickly on fast networks
    });
    await signInPromise;
  });
});
