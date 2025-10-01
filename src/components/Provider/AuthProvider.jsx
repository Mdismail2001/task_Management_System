// AuthProvider.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // logged in user info
  const [token, setToken] = useState(null); // session token

  // Restore session if exists
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  //  Login function to update state + storage
  const login = (userData, tokenData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", tokenData);

    setUser(userData);   // update immediately
    setToken(tokenData);
  };

  //  Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
