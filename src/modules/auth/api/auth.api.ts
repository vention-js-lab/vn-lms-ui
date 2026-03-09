import { API_ENDPOINTS } from '#/shared/constants';
import { apiClient } from '#/shared/lib/api-client';
import type { LoginRequest, LoginResponse } from '../types';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data),
};
