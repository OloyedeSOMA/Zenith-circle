// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = 'https://opportunityhubng.my.to/api/v1';

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAuth,
} from "@/lib/auth-storage";

interface ApiFetchOptions extends RequestInit {
  skipAuth?: boolean;
  _isRetry?: boolean;
}


let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) return null;

        const data = await response.json();
        setAccessToken(data.access);
        // this endpoint also returns a fresh refresh token - save it too
        if (data.refresh) setRefreshToken(data.refresh);

        return data.access as string;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

function isExpiredTokenError(status: number, data: any): boolean {
  return status === 401 && data?.code === "token_not_valid";
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { skipAuth = false, _isRetry = false, ...fetchOptions } = options;

  const isFormData = fetchOptions.body instanceof FormData;
  const token = skipAuth ? null : getAccessToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(fetchOptions.headers ?? {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  console.log(data);

  if (!response.ok) {
    // Access token expired - try to refresh and retry the request ONCE
    if (!skipAuth && !_isRetry && isExpiredTokenError(response.status, data)) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        return apiFetch<T>(endpoint, { ...options, _isRetry: true });
      }

      // refresh token itself is invalid/expired - fully log out
      clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Session expired. Please log in again.");
    }

    let message = "Something went wrong";

    if (data.detail) {
      message = data.detail;
    } else if (data.message) {
      message = data.message;
    } else if (data.non_field_errors) {
      message = Array.isArray(data.non_field_errors)
        ? data.non_field_errors.join(", ")
        : data.non_field_errors;
    } else {
      const errors = Object.entries(data)
        .map(([field, value]) => {
          if (Array.isArray(value)) {
            return `${field}: ${value.join(", ")}`;
          }
          return `${field}: ${value}`;
        })
        .join("\n");

      if (errors) {
        message = errors;
      }
    }

    throw new Error(message);
  }

  return data;
}
