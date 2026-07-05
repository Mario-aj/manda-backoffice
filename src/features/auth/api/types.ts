import type { StaffProfileResponseDto } from "@/shared/api/generated";

export type StaffRole = StaffProfileResponseDto["role"];

export type StaffAuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

/** Contract type from OpenAPI — see src/shared/api/generated/staff-api.ts */
export type StaffProfile = StaffProfileResponseDto;

export type LoginInput = {
  email: string;
  password: string;
};

export type TokenResponse = StaffAuthTokens & {
  tokenType: "Bearer";
};
