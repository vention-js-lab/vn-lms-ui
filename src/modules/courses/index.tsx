import type { RouteObject } from 'react-router';
import { CoursesRoute } from './routes/courses.route';
import { CreateCourseRoute } from './routes/create-course.route';
import { CourseDetailRoute } from './routes/course-detail.route';

export const coursesRoutes: RouteObject[] = [
  {
    index: true,
    Component: CoursesRoute,
  },
  {
    path: 'create',
    Component: CreateCourseRoute,
  },
  {
    path: ':courseId',
    Component: CourseDetailRoute,
  },
];
