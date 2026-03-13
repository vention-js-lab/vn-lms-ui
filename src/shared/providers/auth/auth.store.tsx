import { create } from 'zustand';
import { LOCAL_STORAGE } from './auth.storage';
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

export function isAccessTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as {
      exp?: number;
    };

    if (!payload.exp) return false;

    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function getInitialAuthState(): AuthState {
  const token = LOCAL_STORAGE.GET_ACCESS_TOKEN();

  if (!token) {
    return { status: AuthStatus.GUEST, user: null, token: null };
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as {
      sub: string;
      email: string;
      exp?: number;
    };

    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      LOCAL_STORAGE.SET_ACCESS_TOKEN(null);
      return { status: AuthStatus.GUEST, user: null, token: null };
    }

    return {
      status: AuthStatus.AUTHENTICATED,
      user: { id: payload.sub, email: payload.email },
      token,
    };
  } catch {
    LOCAL_STORAGE.SET_ACCESS_TOKEN(null);
    return { status: AuthStatus.GUEST, user: null, token: null };
  }
}

export const useAuthStore = create<AuthStore>()((set) => ({
  ...getInitialAuthState(),
  login: (token, user) => {
    set({ status: AuthStatus.AUTHENTICATED, user, token });
  },
  logout: () => {
    LOCAL_STORAGE.SET_ACCESS_TOKEN(null);
    set({ status: AuthStatus.GUEST, user: null, token: null });
  },
}));
