import { API_ENDPOINTS } from '#/shared/constants';
import { apiClient } from '#/shared/lib/api-client';
import type { CreateCourseRequest, CreateCourseResponse } from '../types';

export const coursesApi = {
  create: (data: CreateCourseRequest) => apiClient.post<CreateCourseResponse>(API_ENDPOINTS.COURSE.CREATE, data),
};
