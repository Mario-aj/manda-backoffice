import type { StaffAuthTokens } from "@/features/auth/api/types";

export const staffStorage = {
  async load(): Promise<StaffAuthTokens | null> {
    if (!window.staffStorage) return null;
    const tokens = await window.staffStorage.load();
    if (!tokens) return null;
    return { ...tokens, expiresIn: 0 };
  },

  async save(tokens: Pick<StaffAuthTokens, "accessToken" | "refreshToken">) {
    if (!window.staffStorage) {
      throw new Error("staffStorage indisponível");
    }
    await window.staffStorage.save(tokens);
  },

  async clear() {
    if (!window.staffStorage) return;
    await window.staffStorage.clear();
  },
};
