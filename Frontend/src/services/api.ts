// Shared API client for the real Express backend.
// The fake login currently does not use this file.

const API_URL = 'http://localhost:3000/api';

export async function api<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error('API request failed.');
  }

  return response.json() as Promise<T>;
}
