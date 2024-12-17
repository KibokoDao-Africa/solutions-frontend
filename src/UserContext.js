import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  
  // Function to update user information
  const updateUser = ({ userId, username, token }) => {
    setUserId(userId);
    setUsername(username);
    setToken(token);
  };

  // Persist changes to localStorage
  useEffect(() => {
    if (userId) localStorage.setItem("user_id", userId);
    if (username) localStorage.setItem("username", username);
    if (token) localStorage.setItem("accessToken", token); // Store token
  }, [userId, username, token]);

  // Fetch user data using token
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("No token found, skipping fetch.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from localStorage
          },
        });

        if (response.data) {
          // If response is valid, update user context
          updateUser({
            userId: response.data.userId,
            username: response.data.username,
            token, // Retain token after user data fetch
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          console.log("Token might be expired or invalid.");
          // You can implement token refresh logic here or clear invalid token
        }
      }
    };

    fetchUserData();
  }, [token]); // Run effect only when the token changes

  return (
    <UserContext.Provider value={{ userId, updateUser, username, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for easier access
export const useUser = () => useContext(UserContext);
