// Application constants

export const CATEGORIES = [
  { name: 'All', value: 'all' },
  { name: 'Announcements', value: 'announcements' },
  { name: 'Events', value: 'events' },
  { name: 'Lost & Found', value: 'lost-found' },
  { name: 'Study Groups', value: 'study-groups' },
  { name: 'Campus Life', value: 'campus-life' },
  { name: 'Academics', value: 'academics' },
];

export const POST_CATEGORIES = CATEGORIES.filter(cat => cat.value !== 'all');

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
};

export const VALIDATION_RULES = {
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Please enter a valid email address',
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: 'Password must be at least 8 characters long',
    WEAK: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  },
  NAME: {
    REQUIRED: 'Name is required',
    MIN_LENGTH: 'Name must be at least 2 characters long',
    MAX_LENGTH: 'Name must be less than 50 characters',
  },
  POST: {
    TITLE_REQUIRED: 'Title is required',
    TITLE_MAX_LENGTH: 'Title must be less than 100 characters',
    CONTENT_REQUIRED: 'Content is required',
    CONTENT_MAX_LENGTH: 'Content must be less than 1000 characters',
    CATEGORY_REQUIRED: 'Category is required',
  },
  COMMENT: {
    REQUIRED: 'Comment cannot be empty',
    MAX_LENGTH: 'Comment must be less than 500 characters',
  },
};

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
  SKELETON_COUNT: 3,
  POSTS_PER_PAGE: 10,
  TRENDING_POSTS_COUNT: 3,
};

export const ROUTES = {
  HOME: '/',
  FEED: '/feed',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  GROUPS: '/groups',
  MESSAGES: '/messages',
  CREATE_POST: '/create-post',
  POST_DETAIL: '/post/[id]',
  FORGOT_PASSWORD: '/forgot-password',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
};

export const API_ENDPOINTS = {
  POSTS: '/posts',
  POST_DETAIL: '/posts/[id]',
  POST_LIKE: '/posts/[id]/like',
  POST_COMMENTS: '/posts/[id]/comments',
  GROUPS: '/groups',
  GROUP_JOIN: '/groups/[id]/join',
  GROUP_LEAVE: '/groups/[id]/leave',
  USER_PROFILE: '/user/profile',
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};

export const SUCCESS_MESSAGES = {
  POST_CREATED: 'Post created successfully!',
  POST_UPDATED: 'Post updated successfully!',
  POST_DELETED: 'Post deleted successfully!',
  COMMENT_ADDED: 'Comment added successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_RESET_SENT: 'Password reset link sent to your email!',
  LOGIN_SUCCESS: 'Welcome back!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
};

export const THEME = {
  COLORS: {
    PRIMARY: '#2563eb',
    PRIMARY_HOVER: '#1d4ed8',
    SECONDARY: '#6b7280',
    SUCCESS: '#10b981',
    ERROR: '#ef4444',
    WARNING: '#f59e0b',
    INFO: '#3b82f6',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
  },
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'campus_connect_auth_token',
  USER_PREFERENCES: 'campus_connect_user_preferences',
  DRAFT_POST: 'campus_connect_draft_post',
  THEME_PREFERENCE: 'campus_connect_theme',
};
