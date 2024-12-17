// src/components/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);

  // Persist changes to localStorage
  useEffect(() => {
    if (userId) localStorage.setItem("user_id", userId);
    if (username) localStorage.setItem("username", username);
  }, [userId, username]);

  return (
    <UserContext.Provider value={{ userId, setUserId, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for easier access
export const useUser = () => useContext(UserContext);
