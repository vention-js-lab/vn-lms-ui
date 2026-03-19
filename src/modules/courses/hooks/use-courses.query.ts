import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../api';
import type { ListCoursesParams } from '../types';

export function useCoursesQuery(params: ListCoursesParams) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => coursesApi.list(params),
  });
}
