import type { UserRole } from '#/shared/enums';

export type UserProfile = {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
};
