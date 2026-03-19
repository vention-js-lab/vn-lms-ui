import { API_ENDPOINTS } from '#/shared/constants';
import { apiClient } from '#/shared/lib/api-client';
import type { CreateCourseRequest, CreateCourseResponse, ListCoursesParams, ListCoursesResponse } from '../types';

export const coursesApi = {
  list: (params?: ListCoursesParams) => apiClient.get<ListCoursesResponse>(API_ENDPOINTS.COURSE.LIST, { params }),
  create: (data: CreateCourseRequest) => apiClient.post<CreateCourseResponse>(API_ENDPOINTS.COURSE.CREATE, data),
};
