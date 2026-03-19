import type { RouteObject } from 'react-router';
import { RoleGuard } from '#/router/role.guard';
import { UserRole } from '#/shared/enums';
import { CoursesRoute } from './routes/courses.route';
import { CreateCourseRoute } from './routes/create-course.route';
import { CourseDetailRoute } from './routes/course-detail.route';

export const coursesRoutes: RouteObject[] = [
  {
    index: true,
    Component: CoursesRoute,
  },
  {
    element: <RoleGuard allowedRoles={[UserRole.INSTRUCTOR, UserRole.ADMIN]} />,
    children: [
      {
        path: 'create',
        Component: CreateCourseRoute,
      },
    ],
  },
  {
    path: ':courseId',
    Component: CourseDetailRoute,
  },
];
