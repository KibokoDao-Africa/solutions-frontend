import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);

  // Persist changes to localStorage
  useEffect(() => {
    if (userId) localStorage.setItem("user_id", userId);
    if (username) localStorage.setItem("username", username);
    if (token) localStorage.setItem("accessToken", token); // Store token
  }, [userId, username, token]);

  // Fetch user data using token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from localStorage
          },
        });

        if (response.data) {
          setUser({
            userId: response.data.user.id,
            username: response.data.username,
            token, // Retain token after user data fetch
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  // Function to update both userId, username, and token
  const setUser = ({ userId, username, token }) => {
    setUserId(userId);
    setUsername(username);
    setToken(token); // Store the token
  };

  return (
    <UserContext.Provider value={{ userId, setUser, username, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for easier access
export const useUser = () => useContext(UserContext);
