import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import type { LoginRequest } from '../types';
import { useAuthStore } from '#/shared/providers/auth';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      useAuthStore.getState().login(data.access_token, data.user);
    },
  });
}
