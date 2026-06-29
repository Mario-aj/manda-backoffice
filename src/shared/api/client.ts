import {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
  create,
} from "axios";

import { staffStorage } from "@/features/auth/storage/staff-storage";
import type { StaffAuthTokens } from "@/features/auth/api/types";
import {
  ApiError,
  normalizeApiMessage,
  type ApiErrorBody,
} from "@/shared/api/api-error";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000";

if (import.meta.env.PROD && !API_BASE_URL.startsWith("https://")) {
  throw new Error(
    "Configuração insegura: VITE_API_URL tem de ser uma URL https:// em produção."
  );
}

export const api = create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { "content-type": "application/json" },
});

const refreshClient = create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { "content-type": "application/json" },
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<StaffAuthTokens | null> | null = null;
let authLostListener: (() => Promise<void> | void) | null = null;

export function setAuthLostListener(cb: (() => Promise<void> | void) | null) {
  authLostListener = cb;
}

function isStaffAuthEndpoint(url: string | undefined): boolean {
  if (!url) return false;
  return (
    url.endsWith("/staff/auth/login") || url.endsWith("/staff/auth/refresh")
  );
}

api.interceptors.request.use(async (config) => {
  if (!isStaffAuthEndpoint(config.url)) {
    const tokens = await staffStorage.load();
    if (tokens?.accessToken) {
      const headers = AxiosHeaders.from(config.headers);
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${tokens.accessToken}`);
      }
      config.headers = headers;
    }
  }
  return config;
});

async function refreshOnce(): Promise<StaffAuthTokens | null> {
  const tokens = await staffStorage.load();
  if (!tokens?.refreshToken) return null;

  try {
    const res = await refreshClient.post<StaffAuthTokens>(
      "/staff/auth/refresh",
      {
        refreshToken: tokens.refreshToken,
      }
    );
    const next: StaffAuthTokens = {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      expiresIn: res.data.expiresIn,
    };
    await staffStorage.save(next);
    return next;
  } catch {
    return null;
  }
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError<ApiErrorBody>) => {
    const original = error.config as RetriableConfig | undefined;
    const status = error.response?.status;
    const body = error.response?.data;

    if (
      status === 401 &&
      original &&
      !original._retry &&
      !isStaffAuthEndpoint(original.url)
    ) {
      original._retry = true;
      refreshPromise ??= refreshOnce().finally(() => {
        refreshPromise = null;
      });

      const refreshed = await refreshPromise;
      if (refreshed) {
        const headers = AxiosHeaders.from(original.headers);
        headers.set("Authorization", `Bearer ${refreshed.accessToken}`);
        original.headers = headers;
        return api(original);
      }

      await staffStorage.clear();
      if (authLostListener) await authLostListener();
    }

    const message = normalizeApiMessage(
      body,
      error.message || "Erro de rede. Tente novamente."
    );
    return Promise.reject(new ApiError(message, status ?? 0, body));
  }
);
