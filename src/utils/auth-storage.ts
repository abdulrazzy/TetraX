import fs from 'fs';
import path from 'path';

export type LabSession = {
  token: string;
  user: string;
  refreshToken: string;
};

const authDir = path.join(__dirname, '../../playwright/.auth');
export const sessionFile = path.join(authDir, 'lab-session.json');
export const storageStateFile = path.join(authDir, 'user.json');

export function saveLabSession(session: LabSession): void {
  fs.mkdirSync(authDir, { recursive: true });
  fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));
}

export function loadLabSession(): LabSession | null {
  if (!fs.existsSync(sessionFile)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(sessionFile, 'utf-8')) as LabSession;
}

export function hasLabCredentials(): boolean {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;
  return Boolean(email && password && password !== 'REPLACE_WITH_VALID_PASSWORD');
}
