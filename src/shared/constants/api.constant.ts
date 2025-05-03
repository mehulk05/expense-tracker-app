// src/lib/constants/api.constants.ts

export const API = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update',
  },
  APPOINTMENT: {
    LIST: '/appointments',
    detail: (id: string) => `/appointments/${id}`, 
    getDetailPath: (id: string) => `/appointments/${id}`,
  },
  // Add more modules here...
};
  