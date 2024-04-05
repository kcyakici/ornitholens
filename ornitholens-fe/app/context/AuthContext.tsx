// AuthContext.tsx
"use client";
import React, { createContext, useState, useEffect } from "react";
import { isTokenExpired } from "../utils/JwtUtil";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<{
  isContextLoggedIn: boolean;
  contextLogin: (jwt: string) => void;
  contextLogout: () => void;
  token: string;
}>({
  isContextLoggedIn: false,
  token: "",
  contextLogin: () => {},
  contextLogout: () => {},
});

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isContextLoggedIn, setIsContextLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Check if JWT exists in local storage
    const token = localStorage.getItem("jwt");
    if (token) {
      if (isTokenExpired(token)) {
        contextLogout();
      } else {
        // If JWT exists, set isContextLoggedIn to true
        setToken(token);
        setIsContextLoggedIn(true);
      }
    }
  }, []); // Run this effect only once on component mount

  const contextLogin = (jwt: string) => {
    localStorage.setItem("jwt", jwt);
    setToken(jwt);
    setIsContextLoggedIn(true);
  };

  const contextLogout = () => {
    localStorage.removeItem("jwt");
    setToken("");
    setIsContextLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isContextLoggedIn, contextLogin, contextLogout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
