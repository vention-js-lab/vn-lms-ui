import React, { createContext, useContext, useMemo, useState } from 'react';

type AuthContextValue = {
  token: string | null;
  setToken: (t: string | null) => void;
  isAuthenticated: boolean;
  getAuthHeader: () => Record<string, string>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const value = useMemo<AuthContextValue>(() => {
    return {
      token,
      setToken,
      isAuthenticated: Boolean(token),
      getAuthHeader: () =>
        token ? { Authorization: `Bearer ${token}` } : ({} as Record<string, string>),
    };
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
