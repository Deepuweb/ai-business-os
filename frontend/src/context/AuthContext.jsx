import React, { createContext, useContext, useState } from "react";

// Context ek "global box" jaisa hai jisme hum user ki login info
// rakhte hain, taaki har page/component se easily access ho sake
// bina baar-baar props pass kiye.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
};

// Custom hook - components isse call karke user info le sakte hain
export const useAuth = () => useContext(AuthContext);
