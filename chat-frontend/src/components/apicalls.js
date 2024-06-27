/*
   Description: Auth service file handling authentication-related API calls such as login, registration, token refresh, and token verification.
   Author: Sujan Baskota
   Date created: June 26, 2024
   Date modified: June 27, 2024
   <Start of modification section>
       2024-06-26 => Initial creation of authService.js for handling authentication API calls.
       2024-06-26 => Added loginUser and registerUser function for handling user login.
       2024-06-26 => Added refreshToken, verifyToken function for refreshing access token and checking validity.
       2024-06-27 => Added sendMessage function for sending chat messages.
   <End of modification section>
*/

import axiosInstance from "./axiosInstance";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login/", { email, password });
    const { access, refresh, user } = response.data;

    // Save tokens to localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("user", user.user);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axiosInstance.post("/register/", {
      username,
      email,
      password,
    });
    const { access, refresh } = response.data;

    // Save tokens to localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/token/refresh/", {
      refresh: refreshToken,
    });
    const { access } = response.data;

    // Update access token in localStorage
    localStorage.setItem("accessToken", access);

    return response.data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axiosInstance.post("/token/verify/", { token });
    return response.data;
  } catch (error) {
    console.error("Verify token error:", error);
    throw error;
  }
};

export const sendMessage = async ({ content, username }) => {
  try {
    const response = await axiosInstance.post("/chat/messages/", {
      content,
      username,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("send message error:", error);
  }
};
