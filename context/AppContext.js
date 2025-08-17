import { createContext, useContext, useReducer, useCallback } from 'react';
import { generateId } from '../utils/helpers';

// App state
const initialState = {
  posts: [],
  filteredPosts: [],
  activeCategory: 'All',
  isLoading: false,
  error: null,
  toasts: [],
};

// App actions
const APP_ACTIONS = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  SET_FILTERED_POSTS: 'SET_FILTERED_POSTS',
  SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  CLEAR_TOASTS: 'CLEAR_TOASTS',
  LIKE_POST: 'LIKE_POST',
};

// App reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        filteredPosts: state.activeCategory === 'All' 
          ? action.payload 
          : action.payload.filter(post => post.category === state.activeCategory),
      };

    case APP_ACTIONS.ADD_POST:
      const newPosts = [action.payload, ...state.posts];
      return {
        ...state,
        posts: newPosts,
        filteredPosts: state.activeCategory === 'All' || action.payload.category === state.activeCategory
          ? [action.payload, ...state.filteredPosts]
          : state.filteredPosts,
      };

    case APP_ACTIONS.UPDATE_POST:
      const updatedPosts = state.posts.map(post =>
        post.id === action.payload.id ? { ...post, ...action.payload } : post
      );
      return {
        ...state,
        posts: updatedPosts,
        filteredPosts: state.filteredPosts.map(post =>
          post.id === action.payload.id ? { ...post, ...action.payload } : post
        ),
      };

    case APP_ACTIONS.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        filteredPosts: state.filteredPosts.filter(post => post.id !== action.payload),
      };

    case APP_ACTIONS.SET_FILTERED_POSTS:
      return {
        ...state,
        filteredPosts: action.payload,
      };

    case APP_ACTIONS.SET_ACTIVE_CATEGORY:
      const filtered = action.payload === 'All' 
        ? state.posts 
        : state.posts.filter(post => post.category === action.payload);
      
      return {
        ...state,
        activeCategory: action.payload,
        filteredPosts: filtered,
      };

    case APP_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case APP_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case APP_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case APP_ACTIONS.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };

    case APP_ACTIONS.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload),
      };

    case APP_ACTIONS.CLEAR_TOASTS:
      return {
        ...state,
        toasts: [],
      };

    case APP_ACTIONS.LIKE_POST:
      const { postId, isLiked } = action.payload;
      const updateLikes = (posts) =>
        posts.map(post =>
          post.id === postId
            ? { ...post, likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1) }
            : post
        );

      return {
        ...state,
        posts: updateLikes(state.posts),
        filteredPosts: updateLikes(state.filteredPosts),
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// App provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Posts actions
  const setPosts = useCallback((posts) => {
    dispatch({ type: APP_ACTIONS.SET_POSTS, payload: posts });
  }, []);

  const addPost = useCallback((post) => {
    dispatch({ type: APP_ACTIONS.ADD_POST, payload: post });
  }, []);

  const updatePost = useCallback((postId, updates) => {
    dispatch({ 
      type: APP_ACTIONS.UPDATE_POST, 
      payload: { id: postId, ...updates } 
    });
  }, []);

  const deletePost = useCallback((postId) => {
    dispatch({ type: APP_ACTIONS.DELETE_POST, payload: postId });
  }, []);

  const likePost = useCallback((postId, isLiked) => {
    dispatch({ 
      type: APP_ACTIONS.LIKE_POST, 
      payload: { postId, isLiked } 
    });
  }, []);

  // Filter actions
  const setActiveCategory = useCallback((category) => {
    dispatch({ type: APP_ACTIONS.SET_ACTIVE_CATEGORY, payload: category });
  }, []);

  // Loading and error actions
  const setLoading = useCallback((loading) => {
    dispatch({ type: APP_ACTIONS.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: APP_ACTIONS.SET_ERROR, payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: APP_ACTIONS.CLEAR_ERROR });
  }, []);

  // Toast actions
  const addToast = useCallback((toast) => {
    const id = generateId();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast,
    };
    dispatch({ type: APP_ACTIONS.ADD_TOAST, payload: newToast });
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: APP_ACTIONS.REMOVE_TOAST, payload: id });
  }, []);

  const clearToasts = useCallback(() => {
    dispatch({ type: APP_ACTIONS.CLEAR_TOASTS });
  }, []);

  // Convenience toast methods
  const showSuccess = useCallback((message, options = {}) => {
    return addToast({ type: 'success', message, ...options });
  }, [addToast]);

  const showError = useCallback((message, options = {}) => {
    return addToast({ type: 'error', message, duration: 7000, ...options });
  }, [addToast]);

  const showWarning = useCallback((message, options = {}) => {
    return addToast({ type: 'warning', message, ...options });
  }, [addToast]);

  const showInfo = useCallback((message, options = {}) => {
    return addToast({ type: 'info', message, ...options });
  }, [addToast]);

  const value = {
    ...state,
    // Posts
    setPosts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    // Filters
    setActiveCategory,
    // Loading & Error
    setLoading,
    setError,
    clearError,
    // Toasts
    addToast,
    removeToast,
    clearToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};

export default AppContext;
