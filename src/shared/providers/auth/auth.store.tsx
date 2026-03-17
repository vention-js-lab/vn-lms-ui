import { create } from 'zustand';
import { tokenStore } from './auth.storage';
import { AuthStatus } from '#/shared/constants';

type AuthenticatedState = {
  status: typeof AuthStatus.AUTHENTICATED;
  user: {
    id: string;
    email: string;
  };
  token: string;
};

type NonAuthenticatedState = {
  status: typeof AuthStatus.GUEST;
  user: null;
  token: null;
};

type AuthState = AuthenticatedState | NonAuthenticatedState;

type AuthActions = {
  login: (token: string, user: { id: string; email: string }) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

const INITIAL_GUEST_STATE: AuthState = { status: AuthStatus.GUEST, user: null, token: null };

export const useAuthStore = create<AuthStore>()((set) => ({
  ...INITIAL_GUEST_STATE,
  login: (token, user) => {
    tokenStore.setAccessToken(token);
    set({ status: AuthStatus.AUTHENTICATED, user: user ?? { id: '', email: '' }, token });
  },
  logout: () => {
    tokenStore.clearAccessToken();
    set({ status: AuthStatus.GUEST, user: null, token: null });
  },
}));
