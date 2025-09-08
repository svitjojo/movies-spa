import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { getCookie } from '@/utils/cookie';

let api: AxiosInstance | null = null;

export function initApi(API_URL: string) {
  api = axios.create({ baseURL: API_URL });

  // Attach Authorization automatically
  api.interceptors.request.use((config) => {
    const token = getCookie('auth_token');
    if (token) {
      config.headers.set('Authorization', token);
    }

    return config;
  });

  return api;
}

/** Internal guard */
function getApi(): AxiosInstance {
  if (!api) throw new Error('API not initialized! Call initApi(API_URL) first.');
  return api;
}

/** Normalize backend payloads (API returns 200 always; errors encoded as status: 0) */
function normalizeOrThrow<T>(raw: any): T {
  if (raw?.status === 0) {
    const err = new Error(raw?.error?.code || 'API_ERROR');
    (err as any).code = raw?.error?.code;
    (err as any).fields = raw?.error?.fields;
    throw err;
  }
  return raw as T;
}

export const apiCall = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await getApi().get(url, config);
    return normalizeOrThrow<T>(data);
  },
  async post<T, BodyType>(url: string, body?: BodyType, config?: AxiosRequestConfig) {
    const { data } = await getApi().post(url, body, config);
    return normalizeOrThrow<T>(data);
  },
  async patch<T, BodyType>(url: string, body?: BodyType, config?: AxiosRequestConfig) {
    const { data } = await getApi().patch(url, body, config);
    return normalizeOrThrow<T>(data);
  },
  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const { data } = await getApi().delete(url, config);
    return normalizeOrThrow<T>(data);
  },
};
