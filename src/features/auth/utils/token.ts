import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';

const KEY = 'auth_token';

export const getToken = () => getCookie(KEY);
export const setToken = (t: string) => setCookie(KEY, t, { days: 2, secure: true });
export const clearToken = () => deleteCookie(KEY);
