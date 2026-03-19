export type LoginRequest = {
  email: string;
  password: string;
};

import type { UserRole } from '#/shared/enums';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; role?: UserRole | null };
};
