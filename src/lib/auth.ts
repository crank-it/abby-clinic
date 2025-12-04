import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'admin_session';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);

  if (!session?.value) {
    return false;
  }

  // Simple token validation - in production, use proper JWT or session management
  const expectedToken = Buffer.from(process.env.AUTH_SECRET || 'fallback').toString('base64');
  return session.value === expectedToken;
}

export function getAuthToken(): string {
  return Buffer.from(process.env.AUTH_SECRET || 'fallback').toString('base64');
}

export { AUTH_COOKIE_NAME };
