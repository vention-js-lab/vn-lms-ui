import type { RouteObject } from 'react-router';
import { LoginRoute } from '#/modules/auth/routes/login.route';
import { AcceptInviteRoute } from '#/modules/auth/routes/accept-invite.route';
import { ForgotPasswordRoute } from '#/modules/auth/routes/forgot-password.route';
import { ResendInviteRoute } from '#/modules/auth/routes/resend-invite.route';
import { ROUTES } from '#/shared/constants';

export const authRoutes: RouteObject[] = [
  {
    path: ROUTES.AUTH.LOGIN,
    element: <LoginRoute />,
  },
  {
    path: ROUTES.AUTH.ACCEPT_INVITE,
    element: <AcceptInviteRoute />,
  },
  {
    path: ROUTES.AUTH.FORGOT_PASSWORD,
    element: <ForgotPasswordRoute />,
  },
  {
    path: ROUTES.AUTH.RESEND_INVITE,
    element: <ResendInviteRoute />,
  },
];
