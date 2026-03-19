import { useEffect } from 'react';
import { isAccessTokenExpired, useAuthStore } from './auth.store';
import { AuthStatus } from '#/shared/constants';

export function useAuth() {
  const auth = useAuthStore();
  const isExpired = auth.status === AuthStatus.AUTHENTICATED && isAccessTokenExpired(auth.token ?? '');

  useEffect(() => {
    if (isExpired) {
      auth.logout();
    }
  }, [auth, isExpired]);

  if (isExpired) {
    return {
      ...auth,
      status: AuthStatus.GUEST,
      user: null,
      token: null,
    };
  }

  return auth;
}
