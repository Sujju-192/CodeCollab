import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

export class GitHubAIService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async getAvailableModels() {
    try {
      console.log('[API Request] GET /api/ai/models');
      const response = await axios.get(`${this.baseURL}/api/ai/models`);
      console.log('[API Response] GET /api/ai/models', response.status, response.data);
      return response.data;
    } catch (error) {
      console.error('[API Error] GET /api/ai/models', error.response?.data || error.message);
      throw error;
    }
  }

  async getAIAssistance({
    action,
    prompt,
    code = '',
    language = 'javascript',
    problemStatement = '',
    errorDescription = '',
    context = '',
    model = 'gpt-4.1',
  }) {
    try {
      console.log('[API Request] POST /api/ai/assistance', { action, model });
      const response = await axios.post(
        `${this.baseURL}/api/ai/assistance`,
        {
          action,
          prompt,
          code,
          language,
          problemStatement,
          errorDescription,
          context,
          model,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 45000,
        }
      );
      console.log('[API Response] POST /api/ai/assistance', response.status);

      return {
        success: true,
        content: response.data.response,
        model: response.data.model,
        usage: response.data.usage,
        action: response.data.action,
      };
    } catch (error) {
      console.error('[API Error] POST /api/ai/assistance', error.response?.data || error.message);

      let errorMessage = 'AI service temporarily unavailable';
      if (error.response) {
        errorMessage = error.response.data?.error || `Error: ${error.response.status}`;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. AI is taking too long to respond';
      }

      return { success: false, error: errorMessage, model };
    }
  }

  async checkHealth() {
    try {
      console.log('[API Request] GET /api/ai/health');
      const response = await axios.get(`${this.baseURL}/api/ai/health`);
      console.log('[API Response] GET /api/ai/health', response.status, response.data);
      return response.data;
    } catch (error) {
      console.error('[API Error] GET /api/ai/health', error.message);
      return { success: false, aiEnabled: false };
    }
  }
}

export const AI_ACTIONS = {
  ANALYZE: 'analyze',
  DEBUG: 'debug',
  OPTIMIZE: 'optimize',
  EXPLAIN: 'explain',
  COMPLETE: 'complete',
  REVIEW: 'review',
  GENERAL: 'general',
};

export const githubAI = new GitHubAIService();

export function getOptimalModel(actionType) {
  const modelMap = {
    [AI_ACTIONS.ANALYZE]: 'gpt-4.1',
    [AI_ACTIONS.DEBUG]: 'DeepSeek-V3-0324',
    [AI_ACTIONS.OPTIMIZE]: 'DeepSeek-V3-0324',
    [AI_ACTIONS.EXPLAIN]: 'gpt-4.1',
    [AI_ACTIONS.COMPLETE]: 'DeepSeek-V3-0324',
    [AI_ACTIONS.REVIEW]: 'gpt-4.1',
    [AI_ACTIONS.GENERAL]: 'gpt-4.1',
  };

  return modelMap[actionType] || 'gpt-4.1';
}
