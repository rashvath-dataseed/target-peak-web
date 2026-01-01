import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth.types';
import { login as loginApi, logout as logoutApi, getCurrentUser } from '@/utils/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setAuthenticatedUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session on mount
    const user = getCurrentUser();
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const user = await loginApi(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = (): void => {
    logoutApi();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const setAuthenticatedUser = (user: User): void => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, setAuthenticatedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
