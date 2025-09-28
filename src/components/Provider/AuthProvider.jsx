// AuthProvider.jsx
import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Example user (replace with real data from backend)
  const [user, setUser] = useState({
    name: "Admin",
    role: "admin", // can be "admin" or "user"
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
