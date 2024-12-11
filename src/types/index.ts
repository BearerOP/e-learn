export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  token: string;
  purchasedCourses: string[];
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  category: string;
  status: string;
  thumbnail: string;
  rating: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export type Role = 'user' | 'admin';