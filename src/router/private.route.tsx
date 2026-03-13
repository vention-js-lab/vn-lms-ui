import type { RouteObject } from 'react-router';
import { AuthGuard } from './auth.guard';
import { ROUTES } from './routes';
import Courses from '#/modules/courses/components';
import { coursesRoutes } from '#/modules/courses';

export const privateRoutes: RouteObject[] = [
  {
    Component: AuthGuard,
    children: [
      {
        path: ROUTES.dashboard,
        lazy: () => import('#/modules/dashboard').then((m) => ({ Component: m.DashboardRoute })),
      },
      {
        path: ROUTES.courses.root,
        Component: Courses,
        children: [...coursesRoutes],
      },
    ],
  },
];
