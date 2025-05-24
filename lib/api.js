import axios from 'axios';
import Cookies from 'js-cookie';
import API_ENDPOINT from "@/api_config";

const api = axios.create({
  baseURL: API_ENDPOINT,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = Cookies.get('refresh_token');
        const response = await axios.post(`${API_ENDPOINT}/api/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        Cookies.set('access_token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token failed - logout user
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;