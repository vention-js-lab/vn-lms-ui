import { createBrowserRouter, Outlet } from "react-router";
import { privateRoutes } from "./private.route";
import { publicRoutes } from "./public.router";
import { AuthProvider } from "#/shared/providers/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    Component: () => {
      return (
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      );
    },
    children: [...publicRoutes, ...privateRoutes],
  },
]);
