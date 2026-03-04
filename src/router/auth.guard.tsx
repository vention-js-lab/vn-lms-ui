import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '#/shared/providers/auth';
import { AuthStatus } from '#/shared/providers/auth/auth.store';
import { ROUTES } from './routes';

export function AuthGuard() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status !== AuthStatus.AUTHENTICATED) {
    const redirect = location.pathname + location.search;
    return <Navigate to={`${ROUTES.auth.login}?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <Outlet />;
}
