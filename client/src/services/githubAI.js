import axios from 'axios';

// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Available AI Actions
export const AI_ACTIONS = {
  ANALYZE: 'analyze',
  DEBUG: 'debug',
  OPTIMIZE: 'optimize',
  EXPLAIN: 'explain',
  COMPLETE: 'complete',
  REVIEW: 'review',
  GENERAL: 'general'
};

// GitHub AI Service Class
export class GitHubAIService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get available models from backend
  async getAvailableModels() {
    try {
      const response = await axios.get(`${this.baseURL}/api/ai/models`);
      return response.data;
    } catch (error) {
      console.error('Failed to get AI models:', error);
      throw error;
    }
  }

  // Main AI assistance method
  async getAIAssistance({
    action,
    prompt,
    code = '',
    language = 'javascript',
    problemStatement = '',
    errorDescription = '',
    context = '',
    model = 'gpt-4.1' // Default to GPT-4.1
  }) {
    try {
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
          model
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 45000
        }
      );

      return {
        success: true,
        content: response.data.response,
        model: response.data.model,
        usage: response.data.usage,
        action: response.data.action
      };

    } catch (error) {
      console.error('AI assistance error:', error);
      
      let errorMessage = 'AI service temporarily unavailable';
      
      if (error.response) {
        errorMessage = error.response.data?.error || `Error: ${error.response.status}`;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. AI is taking too long to respond';
      }

      return {
        success: false,
        error: errorMessage,
        model: model
      };
    }
  }

  // Health check
  async checkHealth() {
    try {
      const response = await axios.get(`${this.baseURL}/api/ai/health`);
      return response.data;
    } catch (error) {
      console.error('AI health check failed:', error);
      return { success: false, aiEnabled: false };
    }
  }
}

// Export default instance
export const githubAI = new GitHubAIService();

// Helper function to get optimal model for action type
export function getOptimalModel(actionType) {
  const modelMap = {
    [AI_ACTIONS.ANALYZE]: 'gpt-4.1',        // Best for coding analysis
    [AI_ACTIONS.DEBUG]: 'DeepSeek-V3-0324', // Best for debugging
    [AI_ACTIONS.OPTIMIZE]: 'DeepSeek-V3-0324', // Best for optimization
    [AI_ACTIONS.EXPLAIN]: 'gpt-4.1',        // Best for explanations
    [AI_ACTIONS.COMPLETE]: 'DeepSeek-V3-0324', // Best for code generation
    [AI_ACTIONS.REVIEW]: 'gpt-4.1',         // Best for code review
    [AI_ACTIONS.GENERAL]: 'gpt-4.1'         // Best for general questions
  };
  
  return modelMap[actionType] || 'gpt-4.1';
}
