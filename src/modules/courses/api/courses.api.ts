import { apiClient } from '#/shared/lib/api-client';
import { ENDPOINTS } from '#/shared/routes/endpoints';
import type { CreateCourseRequest, CreateCourseResponse } from '../types';

export const coursesApi = {
  create: (data: CreateCourseRequest) => apiClient.post<CreateCourseResponse>(ENDPOINTS.courses.create, data),
};
