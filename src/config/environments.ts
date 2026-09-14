export const environments = {
  staging: {
    baseURL: 'https://tetradxmvp.web.app',
    name: 'Staging',
  },
  production: {
    baseURL: 'https://tetradxmvp.web.app',
    name: 'Production',
  },
} as const;

export type Environment = keyof typeof environments;

export const routes = {
  home: '/',
  auth: {
    login: '/auth/login',
    signup: '/auth/create-account',
    forgotPassword: '/auth/forgot-password',
  },
  lab: {
    dashboard: '/lab/dashboard',
    referralInbox: '/lab/referral-inbox',
    branchManagement: '/lab/branch-management',
    testCatalogue: '/lab/test-catalogue',
    technicianManagement: '/lab/technician-management',
    commissionManagement: '/lab/commission-management',
    settings: '/lab/settings',
  },
} as const;

export function getBaseURL(): string {
  return process.env.BASE_URL ?? environments.staging.baseURL;
}
