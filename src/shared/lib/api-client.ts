import { tokenStore } from '#/shared/providers/auth/auth.storage';
import { API_ENDPOINTS } from '#/shared/constants';
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export class ApiError extends Error {
  public status: number;
  public data: unknown;

  constructor(status: number, data: unknown) {
    super(`Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
};

export function getCookie(name: string): string | null {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

const MODIFYING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.json().catch(() => null));
  }

  const data = (await response.json()) as { access_token: string };
  tokenStore.setAccessToken(data.access_token);
  return data.access_token;
}

function buildUrl(endpoint: string, params?: RequestOptions['params']): string {
  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }
  return url;
}

function buildHeaders(method: string, token: string | null, extra?: HeadersInit): Record<string, string> {
  const csrfToken = getCookie('csrf_token');
  const isModifying = MODIFYING_METHODS.has(method.toUpperCase());

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isModifying && csrfToken ? { 'x-csrf-token': csrfToken } : {}),
    ...(extra as Record<string, string>),
  };
}

async function executeRequest<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, credentials: 'include' });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(response.status, data);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, params, method = 'GET', ...rest } = options;
  const url = buildUrl(endpoint, params);
  const token = tokenStore.getAccessToken();

  const init: RequestInit = {
    method,
    headers: buildHeaders(method, token, headers),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    ...rest,
  };

  try {
    return await executeRequest<T>(url, init);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }
        const newToken = await refreshPromise;

        const retryInit: RequestInit = {
          ...init,
          headers: buildHeaders(method, newToken, headers),
        };
        return await executeRequest<T>(url, retryInit);
      } catch {
        tokenStore.clearAccessToken();
        throw new ApiError(401, { message: 'Session expired. Please log in again.' });
      }
    }

    throw error;
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, body, method: 'POST' }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, body, method: 'PUT' }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, body, method: 'PATCH' }),

  delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export function getError(error: unknown, value: 'error' | 'message' | 'statusCode'): string {
  if (error instanceof ApiError) {
    const data = error.data as { message?: string; type?: string; statusCode?: number } | null;

    if (value === 'statusCode') {
      return String(data?.statusCode);
    }

    if (value === 'error') {
      return data?.type || 'error';
    }

    return data?.message || 'Something went wrong. Please try again later.';
  }

  if (value === 'statusCode') {
    return '500';
  }

  if (value === 'error') {
    return 'error';
  }

  return 'Unable to connect. Please check your internet connection.';
}
