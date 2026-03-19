import { Navigate, Outlet } from 'react-router';
import { useAuth } from '#/shared/providers/auth';
import { DEFAULT_REDIRECT } from '#/shared/utils/router.util';
import type { UserRole } from '#/shared/enums';

type RoleGuardProps = {
  allowedRoles: UserRole[];
  redirectTo?: string;
};

export function RoleGuard({ allowedRoles, redirectTo }: RoleGuardProps) {
  const auth = useAuth();

  const role = auth.user?.role as UserRole;
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo ?? DEFAULT_REDIRECT} replace />;
  }

  return <Outlet />;
}
