import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import type { LoginRequest } from '../types';
import { LOCAL_STORAGE, useAuthStore } from '#/shared/providers/auth';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      LOCAL_STORAGE.SET_ACCESS_TOKEN(data.accessToken);

      useAuthStore.getState().login(data.accessToken, data.user);
    },
  });
}
