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

export interface MyLearningProps {
  courses: Course[]
  loading?: boolean
}

export interface CourseProgress {
  courseId: string
  progress: number
  lastAccessed?: Date
}


export interface Review {
  _id: string;
  student: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface UserCourses {
  _id: string;
  purchasedCourses: Course[];
  wishlist: Course[];
  cart: Course[];
  archivedCourses: Course[];
}

export type CourseCategory = 'purchased' | 'wishlist' | 'cart' | 'archived' | 'learning-tools';

export type TabType = 'all' | 'lists' | 'wishlist' | 'archived' | 'tools'

export interface MyLearningProps {
  courses: Course[]
  loading?: boolean
}

export interface CourseProgress {
  courseId: string
  progress: number
  lastAccessed?: Date
}

export type CourseCategoryType =
  | 'programming'
  | 'design'
  | 'business'
  | 'marketing'
  | 'music'
  | 'photography'
  | 'health'
  | 'fitness'
  | 'personal-development'
  | 'lifestyle'
  | 'academics'
  | 'language'
  | 'technology'
  | 'data-science'
  | 'arts'
  | 'crafts'
  | 'cooking'
  | 'gaming'
  | 'other';

export type CourseSubCategory = {
  [key in CourseCategoryType]?: { key: string; displayName: string }[];
};

export const courseSubCategories: CourseSubCategory = {
  programming: [
    { key: 'artificial-intelligence', displayName: 'Artificial Intelligence' },
    { key: 'blockchain', displayName: 'Blockchain' },
    { key: 'web-development', displayName: 'Web Development' },
    { key: 'data-science', displayName: 'Data Science' },
    { key: 'cyber-security', displayName: 'Cyber Security' },
    { key: 'backend-development', displayName: 'Backend Development' },
    { key: 'frontend-development', displayName: 'Frontend Development' },
    { key: 'devops', displayName: 'DevOps' },
    { key: 'cloud-computing', displayName: 'Cloud Computing' },
    { key: 'database-management', displayName: 'Database Management' },
    { key: 'mobile-app-development', displayName: 'Mobile App Development' },
    { key: 'game-development', displayName: 'Game Development' },
    { key: 'databases', displayName: 'Databases' },
    { key: 'programming-languages', displayName: 'Programming Languages' },
    { key: 'software-engineering', displayName: 'Software Engineering' },
    { key: 'development-tools', displayName: 'Development Tools' },
    { key: 'software-testing', displayName: 'Software Testing' },
    { key: 'data-analysis', displayName: 'Data Analysis' },
    { key: 'automation-testing', displayName: 'Automation Testing' },
    { key: 'web-scraping', displayName: 'Web Scraping' },
    { key: 'algorithms', displayName: 'Algorithms' },
    { key: 'data-structures', displayName: 'Data Structures' },
    { key: 'competitive-programming', displayName: 'Competitive Programming' },
    { key: 'computer-science', displayName: 'Computer Science' },
    { key: 'computer-networking', displayName: 'Computer Networking' },
    { key: 'network-security', displayName: 'Network Security' },
    { key: 'ethical-hacking', displayName: 'Ethical Hacking' },
    { key: 'penetration-testing', displayName: 'Penetration Testing' },
    { key: 'data-engineering', displayName: 'Data Engineering' },
    { key: 'big-data', displayName: 'Big Data' },
    { key: 'machine-learning', displayName: 'Machine Learning' },
    { key: 'deep-learning', displayName: 'Deep Learning' },
    { key: 'natural-language-processing', displayName: 'Natural Language Processing' },
    { key: 'reinforcement-learning', displayName: 'Reinforcement Learning' },
    { key: 'computer-vision', displayName: 'Computer Vision' },
    { key: 'data-visualization', displayName: 'Data Visualization' },
    { key: 'business-intelligence', displayName: 'Business Intelligence' },
    { key: 'data-warehousing', displayName: 'Data Warehousing' },
    { key: 'data-mining', displayName: 'Data Mining' },
  ],
  design: [
    { key: 'user-experience', displayName: 'User Experience (UX)' },
    { key: 'user-interface', displayName: 'User Interface (UI)' },
    { key: 'web-design', displayName: 'Web Design' },
    { key: 'graphic-design', displayName: 'Graphic Design' },
    { key: 'design-tools', displayName: 'Design Tools' },
    { key: 'branding', displayName: 'Branding' },
  ],
  marketing: [
    { key: 'digital-marketing', displayName: 'Digital Marketing' },
    { key: 'advertising', displayName: 'Advertising' },
    { key: 'analytics', displayName: 'Analytics' },
    { key: 'content-marketing', displayName: 'Content Marketing' },
    { key: 'video-and-mobile-marketing', displayName: 'Video & Mobile Marketing' },
    { key: 'social-media-marketing', displayName: 'Social Media Marketing' },
  ],
  // Add similar structures for other categories...
  other: [{ key: 'other', displayName: 'Other' }],
};
