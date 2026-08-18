import { LoginRequest, LoginResponse } from './auth.types';

// Temporary fake login. This will later be replaced with a real API request.
export async function login(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const validEmail = 'test@example.com';
  const validPassword = 'password';

  if (
    credentials.email.trim().toLowerCase() !== validEmail ||
    credentials.password !== validPassword
  ) {
    throw new Error('Napačen e-mail ali geslo.');
  }

  return {
    token: 'fake-jwt-token',
    user: {
      id: '1',
      email: validEmail,
    },
  };
}
