import { Page } from '@playwright/test';

export async function waitForToast(page: Page, text: string | RegExp): Promise<void> {
  await page.getByText(text).waitFor({ state: 'visible' });
}

export function generateUniqueEmail(prefix = 'automation'): string {
  const timestamp = Date.now();
  return `${prefix}+${timestamp}@tetradx.test`;
}
