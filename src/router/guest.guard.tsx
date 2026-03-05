import { Navigate, Outlet } from 'react-router';
import { useAuth } from '#/shared/providers/auth';
import { AuthStatus } from '#/shared/providers/auth/auth.store';
import { DEFAULT_REDIRECT } from '#/shared/utils/router.util';

export function GuestGuard() {
  const auth = useAuth();

  if (auth.status === AuthStatus.AUTHENTICATED) {
    return <Navigate to={DEFAULT_REDIRECT} replace />;
  }

  return <Outlet />;
}
