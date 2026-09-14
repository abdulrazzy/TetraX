import { test as base } from '@playwright/test';
import { test as pageTest } from './test-fixtures';
import { loadLabSession } from '@utils/auth-storage';

export const test = pageTest.extend({
  context: async ({ context }, use) => {
    const session = loadLabSession();

    if (session) {
      await context.addInitScript((storage) => {
        sessionStorage.setItem('token', storage.token);
        sessionStorage.setItem('user', storage.user);
        sessionStorage.setItem('refreshToken', storage.refreshToken);
      }, session);
    }

    await use(context);
  },
});

export { expect } from '@playwright/test';
