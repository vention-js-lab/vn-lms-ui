import { useMutation } from '@tanstack/react-query';
import { coursesApi } from '../api';
import type { CreateCourseRequest } from '../types';

export function useCreateCourseMutation() {
  return useMutation({
    mutationFn: (data: CreateCourseRequest) => coursesApi.create(data),
  });
}
