import axios from "axios";
import { Role } from "../types";

export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
});

export const setAuthToken = (token: string) => {
    localStorage.setItem("authToken", token);
};

export const removeAuthToken = () => {
    localStorage.removeItem("authToken");
};

export const getAuthToken = () => {
    const authToken = localStorage.getItem("authToken");
    return authToken;
};

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const authToken = getAuthToken();
        if (authToken) {
            config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getMe = () => {
    return api.get("/profile");
};

export const login = (email: string, password: string) => {
    return api.post("/user/login", { email, password });
};

export const register = (username: string, role: Role, email: string, password: string) => {
    return api.post("/user/register", { username, role, email, password });
};

export const logout = (authToken: string) => {
    return api.post("/user/logout",{authToken});
};

export const fetchAllCourse = (page = 1, limit = 10) => {
    try {
      return api.get(`/course/getAll?page=${page}&limit=${limit}`);
    } catch (err) {
      console.error(err);
    }
  };