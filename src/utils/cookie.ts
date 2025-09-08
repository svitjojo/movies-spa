interface CookieOptions {
  days?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.days) {
    const date = new Date();
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
    cookieStr += `; expires=${date.toUTCString()}`;
  }

  cookieStr += `; path=${options.path ?? '/'}`;

  if (options.secure) {
    cookieStr += '; Secure';
  }

  if (options.sameSite) {
    cookieStr += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieStr;
}

function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function deleteCookie(name: string, path: string = '/'): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}

export { deleteCookie, getCookie, setCookie };
