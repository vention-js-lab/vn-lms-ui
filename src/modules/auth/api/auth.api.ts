import { API_ENDPOINTS } from '#/shared/constants';
import type { UserRole } from '#/shared/enums';
import { apiClient } from '#/shared/lib/api-client';
import type { InviteResponse, LoginRequest, LoginResponse } from '../types';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data),
  inviteByToken: (token: string) => apiClient.get<InviteResponse>(API_ENDPOINTS.INVITE.BY_TOKEN, { params: { token } }),
  createInvite: (data: { first_name: string; last_name: string; email: string; role: UserRole }) =>
    apiClient.post<{ message: string }>(API_ENDPOINTS.INVITE.CREATE, data),
  acceptInvite: (token: string, password: string) =>
    apiClient.post<{ message: string }>(`${API_ENDPOINTS.INVITE.ACCEPT_INVITE}/${token}`, {
      password,
    }),
};
