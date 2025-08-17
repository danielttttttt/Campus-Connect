// API service layer for handling all API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(
          errorData?.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(
        'Network error. Please check your connection and try again.',
        0,
        { originalError: error.message }
      );
    }
  }

  // Posts API
  static async getPosts() {
    return this.request('/posts');
  }

  static async getPost(id) {
    return this.request(`/posts/${id}`);
  }

  static async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  static async updatePost(id, postData) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  static async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  static async likePost(id, isLiked) {
    return this.request(`/posts/${id}/like`, {
      method: 'POST',
      body: JSON.stringify({ isLiked }),
    });
  }

  // Comments API
  static async getComments(postId) {
    return this.request(`/posts/${postId}/comments`);
  }

  static async createComment(postId, commentData) {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  // Groups API
  static async getGroups() {
    return this.request('/groups');
  }

  static async joinGroup(groupId) {
    return this.request(`/groups/${groupId}/join`, {
      method: 'POST',
    });
  }

  static async leaveGroup(groupId) {
    return this.request(`/groups/${groupId}/leave`, {
      method: 'POST',
    });
  }

  // User API
  static async getProfile() {
    return this.request('/user/profile');
  }

  static async updateProfile(profileData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Auth API
  static async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  static async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  static async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  static async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
}

export { ApiService, ApiError };
