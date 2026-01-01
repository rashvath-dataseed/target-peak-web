import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthState, LoginCredentials } from "@/types/auth.types";
import { login as loginApi, logout as logoutApi } from "@/utils/auth";

const TOKEN_KEY = "target_peak_token";
const USER_KEY = "target_peak_profile";

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

  // 🔥 Hydrate from localStorage
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);

    if (token && user) {
      try {
        setAuthState({
          user: JSON.parse(user),
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);
  useEffect(() => {
    console.log("🔵 AuthProvider mounted");

    const token = localStorage.getItem("target_peak_token");
    const user = localStorage.getItem("target_peak_profile");

    console.log("🟡 LocalStorage values:", {
      token,
      user,
    });

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("🟢 Auth hydrated successfully", parsedUser);

        setAuthState({
          user: parsedUser,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (err) {
        console.error("🔴 Failed to parse user", err);

        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      console.warn("🟠 No auth data found in localStorage");

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const user = await loginApi(credentials);

      // 🔐 Persist
      localStorage.setItem(TOKEN_KEY, "mock-token");
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw error;
    }
  };

  const logout = (): void => {
    logoutApi();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const setAuthenticatedUser = (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
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
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
