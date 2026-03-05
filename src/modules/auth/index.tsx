import type { RouteObject } from 'react-router';
import { LoginRoute } from '#/modules/auth/routes/login.route';
import { AcceptInviteRoute } from '#/modules/auth/routes/accept-invite.route';
import { ForgotPasswordRoute } from '#/modules/auth/routes/forgot-password.route';
import { ResendInviteRoute } from '#/modules/auth/routes/resend-invite.route';
import { ROUTES } from '#/router/routes';

export const authRoutes: RouteObject[] = [
  {
    path: ROUTES.auth.login,
    element: <LoginRoute />,
  },
  {
    path: ROUTES.auth.acceptInvite,
    element: <AcceptInviteRoute />,
  },
  {
    path: ROUTES.auth.forgotPassword,
    element: <ForgotPasswordRoute />,
  },
  {
    path: ROUTES.auth.resendInvite,
    element: <ResendInviteRoute />,
  },
];
