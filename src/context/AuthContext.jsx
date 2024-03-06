import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUsername());
  function getUsername() {
    const temp = localStorage.getItem("username");
    const savedUsername = JSON.parse(temp);
    return savedUsername || "";
  }
  useEffect(() => {
    const temp = JSON.stringify(user);
    localStorage.setItem("username", temp);
  }, [user]);
  const login = (user) => setUser(user);
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
