import { createBrowserRouter, Outlet } from 'react-router';
import { privateRoutes } from './private.route';
import { publicRoutes } from './public.router';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    id: 'root',
    Component: () => {
      return <Outlet />;
    },
    children: [...publicRoutes, ...privateRoutes],
  },
]);
