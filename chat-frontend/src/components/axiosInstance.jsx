import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // your backend base URL
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
      localStorage.removeItem('accessToken')
    return Promise.reject(error);
  }
);

export default axiosInstance;
