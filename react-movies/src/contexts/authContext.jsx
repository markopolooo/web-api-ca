// Authentication context - manages user login state and authentication logic
import { useState, createContext } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  // Check if token exists in localStorage from previous session
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  // Store JWT token in localStorage
  const setToken = (data) => {
    localStorage.setItem("token", data);
  }

  // Login user with username and password, returns JWT token
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

  // Register new user with username and password
  const register = async (username, password) => {
    const response = await fetch("http://localhost:8080/api/users?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    return result.success;
  };

  // Logout user - clear authentication state and remove token
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