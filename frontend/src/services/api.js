import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, password) =>
    api.post('/api/auth/login', { email, password }),

  verifyToken: () =>
    api.get('/api/auth/verify')
};

// Issues API
export const issuesAPI = {
  getAll: (params) =>
    api.get('/api/issues', { params }),

  getById: (id) =>
    api.get(`/api/issues/${id}`),

  create: (formData) =>
    api.post('/api/issues', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  updateStatus: (id, status) =>
    api.patch(`/api/issues/${id}/status`, { status }),

  delete: (id) =>
    api.delete(`/api/issues/${id}`),

  getStatistics: () =>
    api.get('/api/issues/stats'),

  exportCSV: () =>
    api.get('/api/issues/export/csv', {
      responseType: 'blob'
    }),

  // Comments
  getComments: (issueId) =>
    api.get(`/api/issues/${issueId}/comments`),

  addComment: (issueId, commentData) =>
    api.post(`/api/issues/${issueId}/comments`, commentData),

  // Mark issue as viewed
  markAsViewed: (issueId, viewerType) =>
    api.post(`/api/issues/${issueId}/mark-viewed`, { viewerType })
};

export default api;
