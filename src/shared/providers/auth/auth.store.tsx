import { createContext } from "react";

type AuthContextAuthenticatedState = {
  status: "authenticated";
  user: {
    id: string;
    email: string;
  };
  token: string;
};

type AuthContextNonAuthenticatedState = {
  status: "guest" | "pending";
  user: null;
  token: null;
};

type AuthState =
  | AuthContextAuthenticatedState
  | AuthContextNonAuthenticatedState;

export type AuthContextStore = AuthState & {
  // You can add methods for login, logout, etc. here if needed
};

export const AuthContext = createContext<AuthContextStore>({
  status: "pending",
  user: null,
  token: null,
});
