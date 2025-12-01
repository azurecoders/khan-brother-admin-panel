"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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

  const logout = useCallback((reason?: string) => {
    console.log("🚪 Logout called, reason:", reason);
    setToken(null);
    setAdmin(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const initAuth = async () => {
      console.log("🔄 initAuth starting...");

      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedAdmin = localStorage.getItem(ADMIN_KEY);

        console.log("📦 Stored token exists:", !!storedToken);
        console.log("📦 Stored admin exists:", !!storedAdmin);

        if (!storedToken || !storedAdmin) {
          console.log("❌ No stored credentials, finishing load");
          setIsLoading(false);
          return;
        }

        // Set state from localStorage immediately
        setToken(storedToken);
        setAdmin(JSON.parse(storedAdmin));

        console.log("🔍 Verifying token with server...");

        // Verify token is still valid
        const result = await fetchCurrentAdmin();

        console.log("📡 Server response:", {
          data: result.data,
          error: result.error,
          loading: result.loading,
        });

        if (result.error) {
          console.error("❌ GraphQL error:", result.error.message);

          // Check if it's an auth error (adjust based on your API)
          const isAuthError =
            result.error.message.includes("unauthorized") ||
            result.error.message.includes("Unauthorized") ||
            result.error.message.includes("jwt") ||
            result.error.message.includes("token") ||
            result.error.graphQLErrors?.some(
              (e) => e.extensions?.code === "UNAUTHENTICATED"
            );

          if (isAuthError) {
            logout("Token verification failed - auth error");
            return;
          }

          // For non-auth errors (network issues, etc.), keep user logged in
          console.log("⚠️ Non-auth error, keeping user logged in");
        } else if (result.data?.fetchCurrentAdmin) {
          console.log("✅ Token verified, updating admin data");
          setAdmin(result.data.fetchCurrentAdmin);
          localStorage.setItem(
            ADMIN_KEY,
            JSON.stringify(result.data.fetchCurrentAdmin)
          );
        } else {
          console.log("⚠️ No data returned, but no error - keeping stored data");
          // Don't logout here - might be a temporary issue
        }
      } catch (error) {
        console.error("💥 Unexpected error in initAuth:", error);
        // Don't logout on unexpected errors - keep user logged in
      } finally {
        console.log("✅ initAuth complete, setting isLoading to false");
        setIsLoading(false);
      }
    };

    initAuth();
  }, [fetchCurrentAdmin, logout]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.loginAdmin) {
        const { token: newToken, admin: newAdmin } = data.loginAdmin;

        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(ADMIN_KEY, JSON.stringify(newAdmin));

        setToken(newToken);
        setAdmin(newAdmin);

        router.push("/");
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
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
        logout: () => logout("Manual logout"),
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
