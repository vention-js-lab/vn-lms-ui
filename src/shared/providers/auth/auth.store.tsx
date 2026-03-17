import { create } from 'zustand';
import { LOCAL_STORAGE } from './auth.storage';
import { AuthStatus } from '#/shared/constants';
import type { UserProfile } from '#/shared/types';

type AuthenticatedState = {
  status: typeof AuthStatus.AUTHENTICATED;
  user: UserProfile | null;
  token: string;
};

type NonAuthenticatedState = {
  status: typeof AuthStatus.GUEST;
  user: null;
  token: null;
};

type AuthState = AuthenticatedState | NonAuthenticatedState;

type AuthActions = {
  login: (token: string, user?: UserProfile | null) => void;
  setUser: (user: UserProfile) => void;
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

function normalizeUser(user: UserProfile | null | undefined): UserProfile | null {
  if (!user?.id) return null;
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

function getInitialAuthState(): AuthState {
  const token = LOCAL_STORAGE.GET_ACCESS_TOKEN();

  if (!token) {
    return { status: AuthStatus.GUEST, user: null, token: null };
  }

  if (isAccessTokenExpired(token)) {
    LOCAL_STORAGE.SET_ACCESS_TOKEN(null);
    return { status: AuthStatus.GUEST, user: null, token: null };
  }

  const storedUser = LOCAL_STORAGE.GET_USER<UserProfile>();
  return {
    status: AuthStatus.AUTHENTICATED,
    user: normalizeUser(storedUser),
    token,
  };
}

export const useAuthStore = create<AuthStore>()((set) => ({
  ...getInitialAuthState(),
  login: (token, user) => {
    const resolvedUser = normalizeUser(user);
    if (resolvedUser) {
      LOCAL_STORAGE.SET_USER(resolvedUser);
    }
    set({
      status: AuthStatus.AUTHENTICATED,
      user: resolvedUser ?? null,
      token,
    });
  },
  setUser: (user) => {
    const normalized = normalizeUser(user);
    if (!normalized) return;
    LOCAL_STORAGE.SET_USER(normalized);
    set({ user: normalized });
  },
  logout: () => {
    LOCAL_STORAGE.SET_ACCESS_TOKEN(null);
    LOCAL_STORAGE.SET_USER(null);
    set({ status: AuthStatus.GUEST, user: null, token: null });
  },
}));
