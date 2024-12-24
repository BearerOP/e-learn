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

export interface CourseProgress {
  courseId: string
  progress: number
  lastAccessed?: Date
}

export type CourseCategoryType =
  | 'academics'
  | 'arts'
  | 'business'
  | 'cooking'
  | 'crafts'
  | 'design'
  | 'fitness'
  | 'gaming'
  | 'health'
  | 'language'
  | 'lifestyle'
  | 'marketing'
  | 'music'
  | 'other'
  | 'personal-development'
  | 'photography'
  | 'programming'
  | 'technology';

export const courseCategories: CourseCategoryType[] = [
  'academics',
  'arts',
  'business',
  'cooking',
  'crafts',
  'design',
  'fitness',
  'gaming',
  'health',
  'language',
  'lifestyle',
  'marketing',
  'music',
  'other',
  'personal-development',
  'photography',
  'programming',
  'technology',
];

export const courseCategoryDisplayName: { [key in CourseCategoryType]: string } = {
  academics: 'Academics',
  arts: 'Arts',
  business: 'Business',
  cooking: 'Cooking',
  crafts: 'Crafts',
  design: 'Design',
  fitness: 'Fitness',
  gaming: 'Gaming',
  health: 'Health',
  language: 'Language',
  lifestyle: 'Lifestyle',
  marketing: 'Marketing',
  music: 'Music',
  other: 'Other',
  'personal-development': 'Personal Development',
  photography: 'Photography',
  programming: 'Programming',
  technology: 'Technology',
};



export type CourseSubCategory = {
  [key in CourseCategoryType]?: { key: string; displayName: string }[];
};
export const courseSubCategories: CourseSubCategory = {
  design: [
    { key: 'branding', displayName: 'Branding' },
    { key: 'design-tools', displayName: 'Design Tools' },
    { key: 'graphic-design', displayName: 'Graphic Design' },
    { key: 'user-experience', displayName: 'User Experience (UX)' },
    { key: 'user-interface', displayName: 'User Interface (UI)' },
    { key: 'web-design', displayName: 'Web Design' },
  ],
  marketing: [
    { key: 'advertising', displayName: 'Advertising' },
    { key: 'analytics', displayName: 'Analytics' },
    { key: 'content-marketing', displayName: 'Content Marketing' },
    { key: 'digital-marketing', displayName: 'Digital Marketing' },
    { key: 'social-media-marketing', displayName: 'Social Media Marketing' },
    { key: 'video-and-mobile-marketing', displayName: 'Video & Mobile Marketing' },
  ],
  other: [{ key: 'other', displayName: 'Other' }],
  programming: [
    { key: 'algorithms', displayName: 'Algorithms' },
    { key: 'artificial-intelligence', displayName: 'Artificial Intelligence' },
    { key: 'automation-testing', displayName: 'Automation Testing' },
    { key: 'backend-development', displayName: 'Backend Development' },
    { key: 'big-data', displayName: 'Big Data' },
    { key: 'blockchain', displayName: 'Blockchain' },
    { key: 'business-intelligence', displayName: 'Business Intelligence' },
    { key: 'cloud-computing', displayName: 'Cloud Computing' },
    { key: 'competitive-programming', displayName: 'Competitive Programming' },
    { key: 'computer-networking', displayName: 'Computer Networking' },
    { key: 'computer-science', displayName: 'Computer Science' },
    { key: 'computer-vision', displayName: 'Computer Vision' },
    { key: 'cyber-security', displayName: 'Cyber Security' },
    { key: 'data-analysis', displayName: 'Data Analysis' },
    { key: 'data-engineering', displayName: 'Data Engineering' },
    { key: 'data-mining', displayName: 'Data Mining' },
    { key: 'data-science', displayName: 'Data Science' },
    { key: 'data-structures', displayName: 'Data Structures' },
    { key: 'data-visualization', displayName: 'Data Visualization' },
    { key: 'data-warehousing', displayName: 'Data Warehousing' },
    { key: 'database-management', displayName: 'Database Management' },
    { key: 'databases', displayName: 'Databases' },
    { key: 'deep-learning', displayName: 'Deep Learning' },
    { key: 'development-tools', displayName: 'Development Tools' },
    { key: 'devops', displayName: 'DevOps' },
    { key: 'ethical-hacking', displayName: 'Ethical Hacking' },
    { key: 'frontend-development', displayName: 'Frontend Development' },
    { key: 'game-development', displayName: 'Game Development' },
    { key: 'machine-learning', displayName: 'Machine Learning' },
    { key: 'mobile-app-development', displayName: 'Mobile App Development' },
    { key: 'natural-language-processing', displayName: 'Natural Language Processing' },
    { key: 'network-security', displayName: 'Network Security' },
    { key: 'penetration-testing', displayName: 'Penetration Testing' },
    { key: 'programming-languages', displayName: 'Programming Languages' },
    { key: 'reinforcement-learning', displayName: 'Reinforcement Learning' },
    { key: 'software-engineering', displayName: 'Software Engineering' },
    { key: 'software-testing', displayName: 'Software Testing' },
    { key: 'web-development', displayName: 'Web Development' },
    { key: 'web-scraping', displayName: 'Web Scraping' },
  ],
  academics: [
    { key: 'mathematics', displayName: 'Mathematics' },
    { key: 'science', displayName: 'Science' },
    { key: 'history', displayName: 'History' },
    { key: 'geography', displayName: 'Geography' },
    { key: 'literature', displayName: 'Literature' },
  ],
  arts: [
    { key: 'drawing', displayName: 'Drawing' },
    { key: 'painting', displayName: 'Painting' },
    { key: 'sculpture', displayName: 'Sculpture' },
    { key: 'photography', displayName: 'Photography' },
    { key: 'music', displayName: 'Music' },
  ],
  business: [
    { key: 'entrepreneurship', displayName: 'Entrepreneurship' },
    { key: 'management', displayName: 'Management' },
    { key: 'finance', displayName: 'Finance' },
    { key: 'marketing', displayName: 'Marketing' },
    { key: 'sales', displayName: 'Sales' },
  ],
  cooking: [
    { key: 'baking', displayName: 'Baking' },
    { key: 'culinary-skills', displayName: 'Culinary Skills' },
    { key: 'international-cuisine', displayName: 'International Cuisine' },
    { key: 'nutrition', displayName: 'Nutrition' },
    { key: 'vegetarian', displayName: 'Vegetarian' },
  ],
  crafts: [
    { key: 'knitting', displayName: 'Knitting' },
    { key: 'crocheting', displayName: 'Crocheting' },
    { key: 'woodworking', displayName: 'Woodworking' },
    { key: 'jewelry-making', displayName: 'Jewelry Making' },
    { key: 'paper-crafts', displayName: 'Paper Crafts' },
  ],
  fitness: [
    { key: 'yoga', displayName: 'Yoga' },
    { key: 'pilates', displayName: 'Pilates' },
    { key: 'strength-training', displayName: 'Strength Training' },
    { key: 'cardio', displayName: 'Cardio' },
    { key: 'nutrition', displayName: 'Nutrition' },
  ],
  gaming: [
    { key: 'game-design', displayName: 'Game Design' },
    { key: 'game-development', displayName: 'Game Development' },
    { key: 'game-theory', displayName: 'Game Theory' },
    { key: 'esports', displayName: 'Esports' },
    { key: 'game-marketing', displayName: 'Game Marketing' },
  ],
  health: [
    { key: 'mental-health', displayName: 'Mental Health' },
    { key: 'physical-health', displayName: 'Physical Health' },
    { key: 'nutrition', displayName: 'Nutrition' },
    { key: 'wellness', displayName: 'Wellness' },
    { key: 'fitness', displayName: 'Fitness' },
  ],
  language: [
    { key: 'english', displayName: 'English' },
    { key: 'spanish', displayName: 'Spanish' },
    { key: 'french', displayName: 'French' },
    { key: 'german', displayName: 'German' },
    { key: 'chinese', displayName: 'Chinese' },
  ],
  lifestyle: [
    { key: 'travel', displayName: 'Travel' },
    { key: 'home-improvement', displayName: 'Home Improvement' },
    { key: 'gardening', displayName: 'Gardening' },
    { key: 'fashion', displayName: 'Fashion' },
    { key: 'beauty', displayName: 'Beauty' },
  ],
  music: [
    { key: 'instrumental', displayName: 'Instrumental' },
    { key: 'vocal', displayName: 'Vocal' },
    { key: 'music-theory', displayName: 'Music Theory' },
    { key: 'music-production', displayName: 'Music Production' },
    { key: 'songwriting', displayName: 'Songwriting' },
  ],
  'personal-development': [
    { key: 'self-improvement', displayName: 'Self Improvement' },
    { key: 'productivity', displayName: 'Productivity' },
    { key: 'leadership', displayName: 'Leadership' },
    { key: 'communication', displayName: 'Communication' },
    { key: 'career-development', displayName: 'Career Development' },
    { key: 'self-improvement', displayName: 'Self Improvement' },
    { key: 'productivity', displayName: 'Productivity' },
    { key: 'leadership', displayName: 'Leadership' },
    { key: 'communication', displayName: 'Communication' },
  ],
  technology: [
    { key: 'software-development', displayName: 'Software Development' },
    { key: 'data-science', displayName: 'Data Science' },
    { key: 'cyber-security', displayName: 'Cyber Security' },
    { key: 'cloud-computing', displayName: 'Cloud Computing' },
    { key: 'artificial-intelligence', displayName: 'Artificial Intelligence' },
  ]
};

export const Tags = [
  'beginner',
  'intermediate',
  'advanced',
  'english',
  'spanish',
  'french',
  'german',
  'chinese',
  'yoga',
  'pilates',
  'strength-training',
  'cardio',
  'nutrition',
  'mental-health',
  'physical-health',
  'wellness',
  'fitness',
  'travel',
  'home-improvement',
  'gardening',
  'fashion',
  'beauty',
  'instrumental',
  'vocal',
  'music-theory',
  'music-production',
  'songwriting',
  'self-improvement',
  'productivity',
  'leadership',
  'communication',
  'career-development',
  'self-improvement',
  'productivity',
  'leadership',
  'communication',

  'branding',
  'design-tools',
  'graphic-design',
  'user-experience',
  
]