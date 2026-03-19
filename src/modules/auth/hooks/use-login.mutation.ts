import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import type { LoginRequest } from '../types';
import { LOCAL_STORAGE, useAuthStore } from '#/shared/providers/auth';
import { API_ENDPOINTS } from '#/shared/constants';
import { apiClient } from '#/shared/lib/api-client';
import type { UserProfile } from '#/shared/types';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: async (data) => {
      LOCAL_STORAGE.SET_ACCESS_TOKEN(data.accessToken);

      useAuthStore.getState().login(data.accessToken, data.user);

      try {
        const profile = await apiClient.get<UserProfile>(API_ENDPOINTS.USERS.PROFILE);
        useAuthStore.getState().setUser(profile);
      } catch {
        // Profile fetch failure should not block login.
      }
    },
  });
}
