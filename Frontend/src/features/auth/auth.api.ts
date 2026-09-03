import { api } from '../../services/api';
import { LoginRequest, RegisterRequest, AuthResponse, AuthUser } from './auth.types';

export async function login(
  credentials: LoginRequest,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    credentials,
  );

  return response.data;
}

export async function register(
  credentials: RegisterRequest,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    credentials,
  );

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await api.get<AuthResponse>('/auth/me');

  return response.data.user;
}