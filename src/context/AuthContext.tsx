'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '@/lib/api/auth';
import { setToken, removeToken } from '@/lib/utils/token';
import type { User, AuthTokens } from '@/types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (tokens: AuthTokens) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authApi.getProfile()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (tokens: AuthTokens) => {
    setToken(tokens.accessToken);
    const profile = await authApi.getProfile();
    setUser(profile);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const refreshUser = async () => {
    const profile = await authApi.getProfile();
    setUser(profile);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAdmin: user?.role === 'admin', login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
