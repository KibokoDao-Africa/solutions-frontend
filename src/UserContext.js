import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";  // Import jwt-decode to decode the token

// Create the Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);

  // Function to update user information (renamed to setUser for consistency)
  const setUser = ({ userId, username, token }) => {
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

  // Check token expiry using jwt-decode
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now();
  };

  // Fetch user data using token
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || isTokenExpired(token)) {
        console.error("Token is invalid or expired, skipping fetch.");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        setUser({ userId: null, username: null, token: null });
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setUser({
            userId: response.data.userId,
            username: response.data.username,
            token,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          console.log("Token might be expired or invalid.");
          // Clear invalid token and user data from localStorage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user_id');
          localStorage.removeItem('username');
          setUser({ userId: null, username: null, token: null });
        }
      }
    };

    fetchUserData();
  }, [token]); // Adding token as a dependency for the effect

  return (
    <UserContext.Provider value={{ userId, setUser, username, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for easier access
export const useUser = () => useContext(UserContext);
