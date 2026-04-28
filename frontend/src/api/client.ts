import axios from 'axios';

// Create a centralized Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust in production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to every request automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
