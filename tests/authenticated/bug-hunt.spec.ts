import { test } from '@fixtures/authenticated-fixtures';
import fs from 'fs';
import path from 'path';

type BugFinding = {
  severity: 'critical' | 'high' | 'medium' | 'low';
  area: string;
  title: string;
  steps: string;
  expected: string;
  actual: string;
};

const findings: BugFinding[] = [];

function add(finding: BugFinding) {
  findings.push(finding);
}

test.describe('Bug hunt', () => {
  test('explore app for bugs', async ({ page, context, browser }) => {
    const consoleErrors: string[] = [];
    const networkErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('response', (res) => {
      if (res.status() >= 400 && !res.url().includes('favicon')) {
        networkErrors.push(`${res.status()} ${res.url()}`);
      }
    });

    // Forgot password blank page
    await page.goto('/auth/forgot-password');
    await page.waitForLoadState('networkidle');
    const forgotText = await page.locator('body').innerText();
    const forgotHasForm = await page.getByRole('textbox').count() > 0
      || await page.getByText(/reset|forgot|email/i).count() > 0;
    if (!forgotHasForm && forgotText.replace(/\s/g, '').length < 100) {
      add({
        severity: 'high',
        area: 'Auth / Forgot Password',
        title: 'Forgot password page fails to render content',
        steps: 'Navigate to /auth/forgot-password',
        expected: 'Password reset form with email field',
        actual: `Minimal page content (${forgotText.slice(0, 120)}...)`,
      });
    }

    // Sign up page
    await page.goto('/auth/create-account');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    const signupInputs = await page.getByRole('textbox').count();
    const signupText = await page.locator('body').innerText();
    if (signupInputs === 0 && !signupText.match(/sign up|register|create account/i)) {
      add({
        severity: 'high',
        area: 'Auth / Sign Up',
        title: 'Create account page fails to render registration form',
        steps: 'Navigate to /auth/create-account',
        expected: 'Registration form visible',
        actual: `No text inputs found. Content: ${signupText.slice(0, 150)}`,
      });
    }

    // Dead routes
    for (const route of ['/auth/signup', '/lab/test-catalogue-management', '/lab/profile-settings']) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      const text = (await page.locator('body').innerText()).trim();
      if (text.length < 40 && !page.url().includes('login')) {
        add({
          severity: 'high',
          area: 'Routing',
          title: `Route ${route} renders blank page`,
          steps: `Open ${route}`,
          expected: 'Redirect or content',
          actual: `Blank at ${page.url()}`,
        });
      }
    }

    // Lab modules
    await page.goto('/lab/dashboard');

    // Sidebar label typo
    const commissionLinkText = await page.getByRole('link', { name: /commission management/i }).innerText();
    if (commissionLinkText.includes('         ')) {
      add({
        severity: 'low',
        area: 'Lab / Navigation',
        title: 'Commission Management sidebar label has extra whitespace',
        steps: 'View sidebar navigation',
        expected: 'Clean label "Commission Management"',
        actual: `"${commissionLinkText}"`,
      });
    }

    // Quick action label
    const addTestLink = page.getByRole('link', { name: /add test/i });
    const addTestText = await addTestLink.innerText();
    if (/^lab\s/i.test(addTestText.trim())) {
      add({
        severity: 'low',
        area: 'Lab / Dashboard',
        title: 'Quick action shows raw "lab" prefix before Add Test',
        steps: 'View dashboard quick actions',
        expected: '"Add Test" label',
        actual: `"${addTestText.trim()}"`,
      });
    }

    // Add Branch modal
    await page.goto('/lab/branch-management');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Add Branch' }).click();
    await page.waitForTimeout(1000);
    const branchDialog = await page.getByRole('dialog').isVisible().catch(() => false);
    const branchForm = await page.getByLabel(/branch name|name/i).isVisible().catch(() => false);
    if (!branchDialog && !branchForm) {
      add({
        severity: 'medium',
        area: 'Lab / Branch Management',
        title: 'Add Branch does not open a form',
        steps: 'Click Add Branch',
        expected: 'Modal or form to add branch',
        actual: 'No dialog or form appeared',
      });
    } else {
      await page.keyboard.press('Escape');
    }

    // Add Technician
    await page.goto('/lab/technician-management');
    await page.getByRole('button', { name: 'Add Technician' }).click();
    await page.waitForTimeout(1000);
    const techDialog = await page.getByRole('dialog').isVisible().catch(() => false);
    if (!techDialog) {
      add({
        severity: 'medium',
        area: 'Lab / Technician Management',
        title: 'Add Technician does not open a form',
        steps: 'Click Add Technician',
        expected: 'Add technician modal',
        actual: 'No dialog appeared',
      });
    } else {
      await page.keyboard.press('Escape');
    }

    // Add Test
    await page.goto('/lab/test-catalogue');
    await page.getByRole('button', { name: 'Add Test' }).click();
    await page.waitForTimeout(1000);
    const testDialog = await page.getByRole('dialog').isVisible().catch(() => false);
    if (!testDialog) {
      add({
        severity: 'medium',
        area: 'Lab / Test Catalogue',
        title: 'Add Test does not open a form',
        steps: 'Click Add Test',
        expected: 'Add test modal',
        actual: 'No dialog appeared',
      });
    }

    // Settings tab switching
    await page.goto('/lab/settings');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Compliance', exact: true }).click();
    await page.waitForTimeout(400);
    const hipaaVisibleOnCompliance = await page.getByRole('heading', { name: 'HIPAA Compliance Settings' }).isVisible();
    await page.getByRole('button', { name: /lab profile/i }).click();
    await page.waitForTimeout(400);
    const profileFieldsVisible = await page.getByLabel('Laboratory Name').isVisible();
    const hipaaStillOnProfile = await page.getByRole('heading', { name: 'HIPAA Compliance Settings' }).isVisible().catch(() => false);

    if (!hipaaVisibleOnCompliance) {
      add({
        severity: 'medium',
        area: 'Lab / Settings',
        title: 'Compliance tab does not show HIPAA section',
        steps: 'Click Compliance tab',
        expected: 'HIPAA Compliance Settings visible',
        actual: 'HIPAA section not found',
      });
    }

    if (!profileFieldsVisible && hipaaStillOnProfile) {
      add({
        severity: 'medium',
        area: 'Lab / Settings',
        title: 'Lab Profile tab does not restore profile form after switching tabs',
        steps: 'Switch Compliance → Lab Profile',
        expected: 'Profile form fields visible',
        actual: 'Profile fields hidden',
      });
    }

    // Notifications tab vs header button collision
    await page.getByRole('button', { name: 'Notifications' }).nth(1).click();
    await page.waitForTimeout(400);
    const notifSettings = await page.getByText('New Referral Received').isVisible().catch(() => false);
    if (!notifSettings) {
      add({
        severity: 'medium',
        area: 'Lab / Settings',
        title: 'Notifications settings tab does not display notification preferences',
        steps: 'Click Notifications tab in settings',
        expected: 'Notification preference toggles',
        actual: 'Preferences not visible',
      });
    }

    // User roles add
    await page.getByRole('button', { name: 'User Roles' }).click();
    await page.waitForTimeout(400);
    const addRoleBtn = page.getByRole('button', { name: /add role/i });
    if (await addRoleBtn.isVisible()) {
      await addRoleBtn.click();
      await page.waitForTimeout(800);
      const roleDialog = await page.getByRole('dialog').isVisible().catch(() => false);
      if (!roleDialog) {
        add({
          severity: 'medium',
          area: 'Lab / Settings / User Roles',
          title: 'Add Role button does not open form',
          steps: 'User Roles tab → Add Role',
          expected: 'Role creation form',
          actual: 'No dialog',
        });
      }
    }

    // Referral search with special chars
    await page.goto('/lab/referral-inbox');
    await page.getByPlaceholder('Search referrals...').fill('<script>alert(1)</script>');
    await page.waitForTimeout(500);
    const xssAlert = await page.evaluate(() => {
      return (window as unknown as { __xss?: boolean }).__xss;
    });
    const pageHtml = await page.content();
    if (pageHtml.includes('<script>alert(1)</script>') && !pageHtml.includes('&lt;script&gt;')) {
      add({
        severity: 'critical',
        area: 'Lab / Referral Inbox',
        title: 'Search input may not sanitize HTML (potential XSS)',
        steps: 'Enter script tag in search',
        expected: 'Input escaped/sanitized',
        actual: 'Raw script in DOM',
      });
    }

    // storageState session bug
    const freshContext = await browser.newContext({
      storageState: 'playwright/.auth/user.json',
      baseURL: process.env.BASE_URL ?? 'https://tetradxmvp.web.app',
    });
    const freshPage = await freshContext.newPage();
    await freshPage.goto('/lab/dashboard');
    await freshPage.waitForLoadState('networkidle');
    if (freshPage.url().includes('/auth/login')) {
      add({
        severity: 'critical',
        area: 'Auth / Session',
        title: 'Auth tokens stored only in sessionStorage — lost on new tab/session restore',
        steps: 'Open app in new browser context without sessionStorage',
        expected: 'Persistent login (if using cookies/localStorage)',
        actual: 'Redirected to login — breaks SSO, new tabs, and standard auth persistence',
      });
    }
    await freshContext.close();

    // Console and network
    const uniqueConsole = [...new Set(consoleErrors)].filter((e) => !e.includes('favicon'));
    if (uniqueConsole.length) {
      add({
        severity: 'medium',
        area: 'Console',
        title: 'JavaScript errors in browser console',
        steps: 'Browse authenticated lab pages',
        expected: 'No errors',
        actual: uniqueConsole.slice(0, 5).join(' | '),
      });
    }

    const uniqueNetwork = [...new Set(networkErrors)];
    if (uniqueNetwork.length) {
      add({
        severity: 'high',
        area: 'Network',
        title: 'Failed API or resource requests',
        steps: 'Browse app',
        expected: 'All requests succeed',
        actual: uniqueNetwork.slice(0, 8).join(' | '),
      });
    }

    const out = path.join(__dirname, '../../bug-report.json');
    fs.writeFileSync(out, JSON.stringify({ findings, consoleErrors: uniqueConsole, networkErrors: uniqueNetwork }, null, 2));
    console.log('\n=== BUG REPORT ===\n', JSON.stringify(findings, null, 2));
  });
});
