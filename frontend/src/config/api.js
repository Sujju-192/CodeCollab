import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_BASE_URL;
export const LIVEBLOCKS_PUBLIC_KEY = import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
});

apiClient.interceptors.request.use((config) => {
  console.log(
    `[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    config.data ?? ''
  );
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
      response.status,
      response.data
    );
    return response;
  },
  (error) => {
    console.error(
      `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  console.log(`[API Request] ${options.method || 'GET'} ${url}`, options.body ?? '');
  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);
  console.log(`[API Response] ${options.method || 'GET'} ${path}`, response.status, data);
  if (!response.ok) {
    throw new Error(data?.error || data?.details || `Request failed: ${response.status}`);
  }
  return data;
}
