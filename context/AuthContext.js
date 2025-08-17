import { createContext, useContext, useReducer, useEffect } from 'react';
import { ApiService } from '../utils/api';
import { storage } from '../utils/helpers';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

// Auth state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth actions
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER',
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = storage.get(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        
        if (token) {
          // In a real app, you would validate the token with the server
          // For now, we'll simulate a logged-in user
          const mockUser = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            profilePic: 'https://i.pravatar.cc/150?u=john_doe_profile',
          };
          
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: { user: mockUser },
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      // In a real app, this would call the API
      // const response = await ApiService.login(credentials);
      
      // Mock successful login
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        profilePic: 'https://i.pravatar.cc/150?u=john_doe_profile',
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store token
      storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, mockToken);
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user: mockUser },
      });

      return { success: true, user: mockUser };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message || 'Login failed',
      });
      return { success: false, error: error.message };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      // In a real app, this would call the API
      // const response = await ApiService.signup(userData);
      
      // Mock successful signup
      const mockUser = {
        id: Date.now(),
        name: userData.fullName,
        email: userData.email,
        profilePic: `https://i.pravatar.cc/150?u=${userData.email}`,
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store token
      storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, mockToken);
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user: mockUser },
      });

      return { success: true, user: mockUser };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message || 'Signup failed',
      });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // In a real app, you might call the API to invalidate the token
      // await ApiService.logout();
      
      // Remove token from storage
      storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, we should still log out locally
      storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: true };
    }
  };

  // Update user profile
  const updateUser = async (updates) => {
    try {
      // In a real app, this would call the API
      // const response = await ApiService.updateProfile(updates);
      
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: updates,
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message || 'Profile update failed',
      });
      return { success: false, error: error.message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
