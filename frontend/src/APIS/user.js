import { apiClient } from '../config/api.js';

export const getSetUser = async (id, name, email) => {
  try {
    await apiClient.post('/get-set-user', { id, name, email });
    return true;
  } catch (error) {
    console.error('[API] getSetUser failed:', error.message);
    return false;
  }
};
