export const UserRole = {
  ADMIN: 'admin',
  HR: 'hr',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
