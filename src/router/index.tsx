import { createBrowserRouter, Outlet } from 'react-router';
import { privateRoutes } from './private.route';
import { publicRoutes } from './public.router';
import { ROUTES } from '#/shared/constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    id: ROUTES.ROOT,
    Component: () => {
      return <Outlet />;
    },
    children: [...publicRoutes, ...privateRoutes],
  },
]);
