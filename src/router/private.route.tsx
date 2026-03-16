import type { RouteObject } from 'react-router';
import { AuthGuard } from './auth.guard';
import { ROUTES } from '#/shared/constants';
import Courses from '#/modules/courses/components';
import { coursesRoutes } from '#/modules/courses';

export const privateRoutes: RouteObject[] = [
  {
    Component: AuthGuard,
    children: [
      {
        path: ROUTES.ROOT,
        lazy: () => import('#/modules/root').then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.DASHBOARD,
        lazy: () => import('#/modules/dashboard').then((m) => ({ Component: m.DashboardRoute })),
      },
      {
        path: ROUTES.INVITE.MANAGEMENT,
        lazy: () => import('#/modules/invite/routes/invite-management.route').then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.COURSES.ROOT,
        Component: Courses,
        children: [...coursesRoutes],
      },
    ],
  },
];
