// AuthContext.tsx
"use client";
import React, { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<{
  isContextLoggedIn: boolean;
  contextLogin: (jwt: string) => void;
  contextLogout: () => void;
}>({
  isContextLoggedIn: false,
  contextLogin: () => {},
  contextLogout: () => {},
});

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isContextLoggedIn, setIsContextLoggedIn] = useState(false);

  useEffect(() => {
    // Check if JWT exists in local storage
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // If JWT exists, set isContextLoggedIn to true
      setIsContextLoggedIn(true);
    }
  }, []); // Run this effect only once on component mount

  const contextLogin = (jwt: string) => {
    localStorage.setItem("jwt", jwt);
    setIsContextLoggedIn(true);
  };

  const contextLogout = () => {
    localStorage.removeItem("jwt");
    setIsContextLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isContextLoggedIn, contextLogin, contextLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
