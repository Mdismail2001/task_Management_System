// AuthProvider.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Example user (replace with real data from backend)
  // const [user, setUser] = useState({
  //   name: "Admin",
  //   role: "admin", // can be "admin" or "user"
  // });

  const [user, setUser] = useState(); // logged in user info
  const [token, setToken] = useState(null); // session token
  // console.log(user);
  // console.log(token);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
