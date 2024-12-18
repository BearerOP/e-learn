export interface User {
  _id: string;
  avatar: string;
  username: string;
  email: string;
  roles: [Role];
  token: string;
  purchasedCourses: string[];
  role: Role;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export type Role = 'both' | 'student';

export interface CarouselItem {
  id: string;
  title: string;
  imageUrl: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  createdBy: {
    _id: string;
    email: string;
    username: string;
  };
  tracks: string[];
  studentsEnrolled: string[];
  reviews: {
    _id: string;
    student: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
  averageRating: number;
  status: string;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
}

