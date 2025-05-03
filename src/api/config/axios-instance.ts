// src/utils/axios-instance.ts
import axios from 'axios';

import { localStorageService } from '../../services/shared-service/local-storage.service';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// List of endpoints that DO NOT require token
const excludeTokenUrls = ['/auth', '/signin', '/signup', '/forgot-password'];

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorageService.getItem('auth_token'); // or sessionStorage

    // Check if the request should skip adding the token
    const shouldSkip = excludeTokenUrls.some(url => config.url?.includes(url));

    if (!shouldSkip && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
