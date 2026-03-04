import { apiClient } from '#/shared/lib/api-client';
import type { LoginRequest, LoginResponse } from '../types';
import { ENDPOINTS } from '#/shared/routes/endpoints';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<LoginResponse>(ENDPOINTS.auth.login, data),
};
