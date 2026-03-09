import { Navigate, Outlet } from 'react-router';
import { useAuth } from '#/shared/providers/auth';
import { AuthStatus, ROUTES } from '#/shared/constants';

export function AuthGuard() {
  const auth = useAuth();

  if (auth.status !== AuthStatus.AUTHENTICATED) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
}
