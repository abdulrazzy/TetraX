import users from '../../test-data/users.json';

export type TestUser = {
  email: string;
  password: string;
  phone?: string;
  role?: string;
  persona?: string;
};

export const testUsers = {
  lab: {
    email: process.env.TEST_USER_EMAIL ?? users.lab.email,
    password: process.env.TEST_USER_PASSWORD ?? users.lab.password,
    phone: process.env.TEST_USER_PHONE ?? users.lab.phone,
    role: users.lab.role,
    persona: users.lab.persona,
  } satisfies TestUser,

  invalid: users.invalid satisfies TestUser,
} as const;

export const invalidCredentials = {
  email: 'invalid@example.com',
  password: 'WrongPassword123!',
} as const;
