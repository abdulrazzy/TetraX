# Tetra Dx — Playwright Automation Framework

End-to-end test automation for [Tetra Dx](https://tetradxmvp.web.app/), a laboratory operations platform for medical referrals, results, branch operations, and financial commissions.

## Stack

- [Playwright Test](https://playwright.dev/) — browser automation
- TypeScript — type-safe page objects and fixtures
- Page Object Model (POM) — maintainable UI abstractions
- [@playwright/mcp](https://playwright.dev/docs/getting-started-mcp) — AI-assisted browser exploration in Cursor

## Project Structure

```
├── .cursor/mcp.json          # Playwright MCP server config for Cursor
├── playwright.config.ts      # Test runner configuration
├── src/
│   ├── config/               # Environment URLs and route constants
│   ├── fixtures/             # Custom Playwright fixtures (page objects)
│   ├── pages/                # Page Object Model classes
│   │   ├── base.page.ts
│   │   └── auth/
│   └── utils/                # Test data helpers
├── tests/
│   ├── auth/                 # Unauthenticated auth flow tests
│   ├── authenticated/        # Tests requiring login (add as app grows)
│   └── setup/                # Global auth setup (storage state)
├── test-data/                # Static test data (JSON)
└── .github/workflows/        # CI pipeline
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
npx playwright install chromium
```

### Configure credentials

```bash
cp .env.example .env
```

Set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` in `.env` for Lab user authenticated tests.

The app stores JWT tokens in `sessionStorage` (not cookies). The framework saves these to `playwright/.auth/lab-session.json` during setup and injects them before each authenticated test.

### Run tests

```bash
# Auth tests (no login required)
npm run test:auth

# Lab user tests (requires .env credentials)
npm run test:lab

# Headed mode (watch browser)
npm run test:auth:headed

# UI mode (interactive debugger)
npm run test:ui

# Specific file
npx playwright test tests/auth/login.spec.ts

# All browsers
npm test
```

### View report

```bash
npm run report
```

## Playwright MCP (Cursor)

The project includes `.cursor/mcp.json` with the official [Playwright MCP server](https://playwright.dev/docs/getting-started-mcp).

**To enable:**

1. Restart Cursor (or reload MCP servers in Settings → MCP)
2. Confirm **playwright** shows a green status indicator
3. Ask Cursor to explore pages or generate tests using Playwright MCP tools

Config:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

## Application Under Test

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/auth/login` |
| `/auth/login` | Sign in — email/phone, password, remember me |
| `/auth/create-account` | Registration |
| `/auth/forgot-password` | Password recovery |
| `/lab/dashboard` | Lab user dashboard (post-login) |
| `/lab/referral-inbox` | Referral inbox |
| `/lab/branch-management` | Branch management |
| `/lab/test-catalogue` | Test catalogue management |
| `/lab/technician-management` | Technician management |
| `/lab/commission-management` | Commission management |
| `/lab/settings` | Lab profile & settings |

**Login page features explored:**

- Email or phone number field (`email@tetradx.com` placeholder)
- Password field with client-side validation
- Remember me checkbox
- Dark/light mode toggle
- HIPAA compliance messaging and branding panel

## Writing Tests

Use custom fixtures for page objects:

```typescript
import { test, expect } from '@fixtures/test-fixtures';

test('example', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('user@tetradx.com', 'password');
});
```

Add new page objects under `src/pages/` and register them in `src/fixtures/test-fixtures.ts`.

## CI

GitHub Actions workflow runs auth tests on push/PR to `main`. Artifacts include HTML report and JUnit XML.

## License

ISC
