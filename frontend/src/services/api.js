import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Bookmarks API
export const bookmarksAPI = {
  getBookmarks: (params) => api.get('/bookmarks', { params }),
  getBookmark: (id) => api.get(`/bookmarks/${id}`),
  createBookmark: (bookmarkData) => api.post('/bookmarks', bookmarkData),
  updateBookmark: (id, bookmarkData) => api.put(`/bookmarks/${id}`, bookmarkData),
  deleteBookmark: (id) => api.delete(`/bookmarks/${id}`),
};

export default api;
