import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/auth/login.page';
import { testUsers } from '@utils/test-data';
import { routes } from '@config/environments';
import { hasLabCredentials, saveLabSession, storageStateFile } from '@utils/auth-storage';

setup('authenticate as lab user', async ({ page }) => {
  if (!hasLabCredentials()) {
    setup.skip(true, 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env to run authenticated tests');
    return;
  }

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(testUsers.lab.email, testUsers.lab.password);

  await expect(page).toHaveURL(new RegExp(routes.lab.dashboard));
  await page.waitForFunction(() => sessionStorage.getItem('token') !== null);

  const session = await page.evaluate(() => ({
    token: sessionStorage.getItem('token')!,
    user: sessionStorage.getItem('user')!,
    refreshToken: sessionStorage.getItem('refreshToken')!,
  }));

  saveLabSession(session);
  await page.context().storageState({ path: storageStateFile });
});
