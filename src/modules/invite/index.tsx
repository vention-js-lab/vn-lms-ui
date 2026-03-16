import type { RouteObject } from 'react-router';
import InviteManagementRoute from './routes/invite-management.route';
import { ROUTES } from '#/shared/constants';

export const inviteRoutes: RouteObject[] = [
  {
    path: ROUTES.INVITE.MANAGEMENT,
    element: <InviteManagementRoute />,
  },
];
