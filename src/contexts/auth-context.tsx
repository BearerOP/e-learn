import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { removeAuthToken } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Retrieve user from localStorage on initial load
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("authUser"));

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("authUser", JSON.stringify(user)); // Persist user data
    console.log("Login triggered:", { isAuthenticated, user });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authUser"); // Clear user data
    removeAuthToken();
    console.log("User logged out.");
  };

  useEffect(() => {
    console.log("Authentication state updated:", { isAuthenticated, user });
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
