export type StaffRole = 'ops' | 'support' | 'compliance' | 'superAdmin';

export type StaffAuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type StaffProfile = {
  id: string;
  email: string;
  fullName: string;
  role: StaffRole;
  status: 'active' | 'disabled';
  lastLoginAt: string | null;
  createdAt: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type TokenResponse = StaffAuthTokens & {
  tokenType: 'Bearer';
};
