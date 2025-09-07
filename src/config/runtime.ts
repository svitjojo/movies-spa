type RuntimeConfig = { API_URL: string };

export async function loadRuntimeConfig(): Promise<RuntimeConfig> {
  if (import.meta.env.DEV && import.meta.env.VITE_API_URL) {
    return { API_URL: import.meta.env.VITE_API_URL };
  }

  const res = await fetch('/config.json', { cache: 'no-store' });
  return res.json();
}
