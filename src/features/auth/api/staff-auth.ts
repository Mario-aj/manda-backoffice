import { api } from "@/shared/api/client";
import { staffStorage } from "@/features/auth/storage/staff-storage";
import type {
  LoginInput,
  StaffAuthTokens,
  StaffProfile,
  TokenResponse,
} from "@/features/auth/api/types";

export async function login(input: LoginInput): Promise<StaffAuthTokens> {
  const res = await api.post<TokenResponse>("/staff/auth/login", input);
  const tokens: StaffAuthTokens = {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
    expiresIn: res.data.expiresIn,
  };
  await staffStorage.save(tokens);
  return tokens;
}

export async function fetchMe(): Promise<StaffProfile> {
  const res = await api.get<StaffProfile>("/staff/auth/me");
  return res.data;
}

export async function logout(): Promise<void> {
  const tokens = await staffStorage.load();
  if (tokens?.refreshToken) {
    try {
      await api.post("/staff/auth/logout", {
        refreshToken: tokens.refreshToken,
      });
    } catch {
      // best-effort: clear locally even if server call fails
    }
  }
  await staffStorage.clear();
}
