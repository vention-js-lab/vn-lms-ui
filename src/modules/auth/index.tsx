import type { RouteObject } from "react-router";
import { LoginRoute } from "./routes/login.route";
import { AcceptInviteRoute } from "./routes/accept-invite.route";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginRoute />,
  },
  {
    path: "accept-invite",
    element: <AcceptInviteRoute />,
  }
];
