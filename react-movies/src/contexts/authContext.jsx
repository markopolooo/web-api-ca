import { useState, createContext } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const setToken = (data) => {
    localStorage.setItem("token", data);
  }

  const authenticate = async (username, password) => {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
      localStorage.setItem("userId", result.userId);
    }
  };

  const register = async (username, password) => {
    const response = await fetch("http://localhost:8080/api/users?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    return result.success;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;