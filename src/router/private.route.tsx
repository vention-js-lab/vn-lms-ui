import type { RouteObject } from 'react-router';
import { AuthGuard } from './auth.guard';
import { ROUTES } from './routes';

export const privateRoutes: RouteObject[] = [
  {
    Component: AuthGuard,
    children: [
      {
        path: ROUTES.dashboard,
        lazy: () => import('#/modules/dashboard').then((m) => ({ Component: m.DashboardRoute })),
      },
    ],
  },
];
