import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '#/shared/providers/auth';
import { AuthStatus, ROUTES } from '#/shared/constants';

export function AuthGuard() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status !== AuthStatus.AUTHENTICATED) {
    const redirect = location.pathname + location.search;
    return <Navigate to={`${ROUTES.AUTH.LOGIN}?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <Outlet />;
}
