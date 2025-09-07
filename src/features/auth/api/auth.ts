import { apiCall } from '@/api/client';
import { setToken } from '@/features/auth/utils/token';
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth';

export const register = async (payload: RegisterPayload) => {
  const res = await apiCall.post<AuthResponse, RegisterPayload>('/users', payload);
  if (res.status === 1 && res.token) setToken(res.token);
  return res;
};

export const login = async (payload: LoginPayload) => {
  const res = await apiCall.post<AuthResponse, LoginPayload>('/sessions', payload);
  if (res.status === 1 && res.token) setToken(res.token);
  return res;
};
