import type { PropsWithChildren } from "react";
import { AuthContext, type AuthContextStore } from "./auth.store";

const defaultAuthState: AuthContextStore = {
  status: "pending",
  user: null,
  token: null,
};

export function AuthProvider({ children }: PropsWithChildren) {
  return <AuthContext value={defaultAuthState}>{children}</AuthContext>;
}
