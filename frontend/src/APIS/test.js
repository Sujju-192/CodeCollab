import { apiClient } from '../config/api.js';

export const testApi = async () => {
  try {
    const res = await apiClient.post('/');
    return res.data;
  } catch (error) {
    console.error('[API] testApi failed:', error.message);
    return null;
  }
};
