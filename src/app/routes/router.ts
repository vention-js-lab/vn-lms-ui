import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../ui/AppLayout";
import LoginPage from "../../pages/login";
import { AdminInvitesComponent } from "../../pages/admin/components/invite/invites";
import { AcceptInviteComponent } from "../../pages/invite/components/AcceptInvite";
import { NotFoundPage } from "../../pages/notfound/NotFoundPage";
import { RouteConstantPaths as route } from "./constant/path";
export const router = createBrowserRouter([
  {
    path: route.ROOT,
    Component: AppLayout,
    ErrorBoundary: NotFoundPage,
    children: [

      {
        path: route.LOGIN,
        Component: LoginPage,
      },
      {
        path: route.ADMIN.INVITES,
        Component: AdminInvitesComponent,
      },
      {
        path: route.ACCEPT_INVITE,
        Component: AcceptInviteComponent,
      },
      {
        path: route.NOT_FOUND,
        Component: NotFoundPage,
      },
    ],
  },
]);
