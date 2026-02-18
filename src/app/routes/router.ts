import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '../ui/AppLayout';
import LoginPage from '../../pages/login';
import { AdminInvitesComponent } from '../../pages/admin/components/invite/AdminInvites';
import { AcceptInviteComponent } from '../../pages/invite/components/AcceptInvite';
import { NotFoundPage } from '../../pages/notfound/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    ErrorBoundary: NotFoundPage,
    children: [
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'admin/invites',
        Component: AdminInvitesComponent,
      },
      {
        path: 'accept-invite',
        Component: AcceptInviteComponent,
      },
      {
        path: 'not-found',
        Component: NotFoundPage,
      },
    ],
  },
]);
