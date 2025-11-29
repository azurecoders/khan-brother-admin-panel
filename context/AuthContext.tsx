"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import { LOGIN_ADMIN, FETCH_CURRENT_ADMIN } from "@/graphql/auth";
import { Admin } from "@/types/admin";

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "admin_token";
const ADMIN_KEY = "admin_data";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [loginMutation] = useMutation(LOGIN_ADMIN);
  const [fetchCurrentAdmin] = useLazyQuery(FETCH_CURRENT_ADMIN, {
    fetchPolicy: "network-only",
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedAdmin = localStorage.getItem(ADMIN_KEY);

        if (storedToken && storedAdmin) {
          setToken(storedToken);
          setAdmin(JSON.parse(storedAdmin));

          // Verify token is still valid
          const { data } = await fetchCurrentAdmin();
          if (data?.fetchCurrentAdmin) {
            setAdmin(data.fetchCurrentAdmin);
            localStorage.setItem(
              ADMIN_KEY,
              JSON.stringify(data.fetchCurrentAdmin)
            );
          } else {
            // Token is invalid, clear auth
            logout();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.loginAdmin) {
        const { token: newToken, admin: newAdmin } = data.loginAdmin;

        setToken(newToken);
        setAdmin(newAdmin);

        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(ADMIN_KEY, JSON.stringify(newAdmin));

        router.push("/");
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    router.push("/login");
  };

  const refreshAdmin = async () => {
    try {
      const { data } = await fetchCurrentAdmin();
      if (data?.fetchCurrentAdmin) {
        setAdmin(data.fetchCurrentAdmin);
        localStorage.setItem(ADMIN_KEY, JSON.stringify(data.fetchCurrentAdmin));
      }
    } catch (error) {
      console.error("Failed to refresh admin:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isLoading,
        isAuthenticated: !!token && !!admin,
        login,
        logout,
        refreshAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
