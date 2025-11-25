import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  role: "user" | "creator" | "admin";
  followers: number;
  following: number;
  appsCount: number;
  isVerified: boolean;
  coverImage?: string;
  provider: "google" | "github";
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/user");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("authToken", token);

    try {
      const response = await api.get("/auth/user");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user after login:", error);
      localStorage.removeItem("authToken");
      throw error;
    }
  };

  const logout = () => {
    try {
      // Remove token from localStorage
      localStorage.removeItem("authToken");

      // Reset user state
      setUser(null);

      // Redirect to login or homepage
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
