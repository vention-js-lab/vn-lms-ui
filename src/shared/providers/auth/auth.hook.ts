import { useEffect, useRef } from 'react';
import { AuthStatus, API_ENDPOINTS } from '#/shared/constants';
import { apiClient } from '#/shared/lib/api-client';
import { isAccessTokenExpired, useAuthStore } from './auth.store';
import type { UserProfile } from '#/shared/types';

export function useAuth() {
  const auth = useAuthStore();
  const isExpired = auth.status === AuthStatus.AUTHENTICATED && isAccessTokenExpired(auth.token);
  const hasRequestedProfile = useRef(false);

  useEffect(() => {
    if (isExpired) {
      auth.logout();
    }
  }, [auth, isExpired]);

  useEffect(() => {
    if (auth.status !== AuthStatus.AUTHENTICATED) return;
    if (auth.user || hasRequestedProfile.current) return;

    hasRequestedProfile.current = true;
    apiClient
      .get<UserProfile>(API_ENDPOINTS.USERS.PROFILE)
      .then((user) => {
        useAuthStore.getState().setUser(user);
      })
      .catch(() => {
        // Keep user as null; role-based UI will stay locked until profile is available.
      });
  }, [auth.status, auth.user]);

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
