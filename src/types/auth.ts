import type { ApiError } from './error';

export type AuthResponse = { token: string; status: 1 | 0; error?: ApiError };

export type RegisterPayload = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
