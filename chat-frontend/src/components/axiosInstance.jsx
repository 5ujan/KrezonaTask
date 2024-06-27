/*
   Description: Axios instance configuration for making HTTP requests to the backend API.
   Author: Sujan Baskota
   Date created: June 26, 2024
   Date modified: June 27, 2024
   <Start of modification section>
       2024-06-26 => Initial creation of axiosInstance.js for Axios configuration.
       2024-06-27 => Added request interceptor to include access token in every request.
   <End of modification section>
*/

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      //   config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    localStorage.removeItem("accessToken");
    return Promise.reject(error);
  }
);

export default axiosInstance;
