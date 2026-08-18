import { api } from '../../services/api';
import { LoginRequest, RegisterRequest, AuthResponse } from './auth.types';

// Replace the endpoint below with the real endpoint from your Express backend.
export async function login(
  credentials: LoginRequest,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', credentials);

  return response.data;
}

export async function register(
  credentials: RegisterRequest,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', credentials);

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}
