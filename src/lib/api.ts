import axios from "axios";
import { Course, CreateCourseData } from "../types";

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

export const register = (email: string, username: string,  password: string) => {
    return api.post("/user/register", { username, email, password });
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

export const fetchCoursesByCategory = (category: string) => {
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

export const getInstructorCourses = async () => {
    try {
        console.log('Fetching instructor courses...');
        const response = await api.get("/course/instructor");
        console.log('API Response:', response);
        
        if (!response) {
            throw new Error('No response received from the server');
        }
        
        if (!response.data) {
            throw new Error('No data in the response');
        }
        
        if (!response.data.data) {
            throw new Error('No courses data in the response');
        }
        
        return response;
    } catch (err) {
        console.error('Error fetching instructor courses:', err);
        if (axios.isAxiosError(err)) {
            console.error('Axios error details:', {
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                headers: err.response?.headers
            });
        }
        throw err;
    }
}

export const getCourseContent = (courseId: string) => {
    try {
        return api.get(`/course/content?courseId=${courseId}`);
    } catch (err) {
        console.error(err);
    }
}

export const updateCourseStatus = (courseId: string, status: 'published' | 'draft') => {
    try {
        return api.put(`/course/status?courseId=${courseId}`, { status });
    } catch (err) {
        console.error(err);
    }
}

export const getTrackContent = (trackId: string) => {
    try {
        return api.get(`/course/content/track?trackId=${trackId}`);
    } catch (err) {
        console.error(err);
    }
}

export const addTrackContent = (trackId: string, content: string) => {
    try {
        return api.post("/course/content/track/add", { trackId, content });
    } catch (err) {
        console.error(err);
    }
}

export const createOrder = ({
    amount,
    currency,
}: {
    amount: number,
    currency: string
}) => {
    try {
        return api.post("/order/create", { amount, currency });
    } catch (err) {
        console.error(err);
    }
}

export const purchaseCourse = (items: Course[]) => {
    try {
        return api.post("/course/purchase", { items });
    } catch (err) {
        console.error(err);
    }
}

export const getInstructorDashboardData = () => {
    try {
        return api.get(`/dashboard`);
    } catch (err) {
        console.error(err);
    }
}