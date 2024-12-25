import axios from "axios";
import { CreateCourseData, Role } from "../types";

export const api = axios.create({
    // baseURL: "https://e-learn-backend-6qyz.onrender.com/api/v1",
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
    return api.get("/user/me");
};

export const login = (email: string, password: string) => {
    return api.post("/user/login", { email, password });
};

export const register = (username: string, role: Role, email: string, password: string) => {
    return api.post("/user/register", { username, role, email, password });
};

export const logout = (authToken: string) => {
    return api.post("/user/logout", { authToken });
};

export const fetchAllCourse = (page = 1, limit = 10) => {
    try {
        return api.get(`/course/getAll?page=${page}&limit=${limit}`);
    } catch (err) {
        console.error(err);
    }
};

export const fetchMyCourse = (page = 1, limit = 10) => {
    try {
        return api.get(`/course/my?page=${page}&limit=${limit}`);
    } catch (err) {
        console.error(err);
    }
}

export const fetchCourse = (id: string) => {
    try {
        return api.get(`/course/get?courseId=${id}`);
    } catch (err) {
        console.error(err);
    }
}

export const fetchCoursesByCategory = (category:string) => {
    try {
        category = category.toLowerCase().replace(/ /g, "-");
        return api.get(`/course/category?category=${category}`);
    } catch (err) {
        console.error(err);
    }
}

export const getCartItems = () => {
    try {
        return api.get("/cart");
    } catch (err) {
        console.error(err);
    }
}

export const addToCart = (courseId: string) => {
    try {
        return api.post("/cart/add", { courseId });
    } catch (err) {
        console.error(err);
    }
}   

export const removeFromCart = (courseId: string) => {
    try {
        return api.post("/cart/remove", { courseId });
    } catch (err) {
        console.error(err);
    }
}

export const createCourse = (formData: CreateCourseData) => {
    try {
        return api.post("/course/add", formData);
    } catch (err) {
        console.error(err);
    }
}