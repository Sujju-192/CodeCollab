import axios from 'axios';

// Available GitHub Models (Updated with actual available models)
export const GITHUB_MODELS = {
  'gpt-4.1': {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    maxTokens: 4096,
    strengths: ['Coding', 'Instruction following', 'Long-context understanding'],
    description: 'Outperforms GPT-4o across the board with major gains in coding and instruction following'
  },
  'DeepSeek-V3-0324': {
    id: 'DeepSeek-V3-0324',
    name: 'DeepSeek-V3-0324',
    provider: 'DeepSeek',
    maxTokens: 8192,
    strengths: ['Enhanced reasoning', 'Function calling', 'Code generation'],
    description: 'Notable improvements in reasoning, function calling, and superior code generation'
  },
  'llama-4-scout-17b-16e': {
    id: 'llama-4-scout-17b-16e',
    name: 'Llama 4 Scout 17B',
    provider: 'Meta',
    maxTokens: 4096,
    strengths: ['General purpose', 'Fast inference'],
    description: 'Efficient model for general-purpose tasks'
  }
};

// AI Action Types
export const AI_ACTIONS = {
  ANALYZE: 'analyze',
  DEBUG: 'debug',
  OPTIMIZE: 'optimize',
  EXPLAIN: 'explain',
  COMPLETE: 'complete',
  REVIEW: 'review',
  GENERAL: 'general'
};

export class GitHubAIService {
  constructor(token) {
    this.token = token;
    this.baseURL = 'https://models.inference.ai.azure.com';
  }

  async makeRequest(model, messages, options = {}) {
    if (!this.token) {
      throw new Error('GitHub token is required');
    }

    const {
      maxTokens = GITHUB_MODELS[model]?.maxTokens || 4096,
      temperature = 0.1,
      topP = 0.9
    } = options;

    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: model,
          messages: messages,
          max_tokens: maxTokens,
          temperature: temperature,
          top_p: topP,
          stream: false
        },
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          timeout: 45000
        }
      );

      return {
        success: true,
        content: response.data.choices[0].message.content,
        model: model,
        usage: response.data.usage,
        provider: 'github'
      };

    } catch (error) {
      console.error('GitHub AI API Error:', error);
      
      let errorMessage = 'AI service temporarily unavailable';
      
      if (error.response) {
        const status = error.response.status;
        
        if (status === 401) {
          errorMessage = 'Invalid GitHub token';
        } else if (status === 429) {
          errorMessage = 'Rate limit exceeded';
        } else if (status >= 500) {
          errorMessage = 'AI service is experiencing issues';
        } else {
          errorMessage = error.response.data?.error?.message || `API Error: ${status}`;
        }
      }

      return {
        success: false,
        error: errorMessage,
        model: model,
        provider: 'github'
      };
    }
  }

  // Analyze code quality and provide suggestions
  async analyzeCode(code, language, problemStatement, model = 'gpt-4.1') {
    const messages = [
      {
        role: 'system',
        content: 'You are an expert code reviewer and mentor. Analyze code thoroughly and provide actionable feedback for coding interviews.'
      },
      {
        role: 'user',
        content: `Please analyze this ${language} code:

**Problem Statement:**
${problemStatement}

**Code to Analyze:**
\`\`\`${language}
${code}
\`\`\`

Provide analysis in this format:

## 📊 Code Quality Score: X/10

## ✅ Strengths
- List positive aspects

## ⚠️ Issues Found
- List bugs, logic errors, edge cases

## 🚀 Specific Improvements
\`\`\`${language}
// Show improved code with comments
\`\`\`

## 📈 Time/Space Complexity
- Current: O(?)
- Can be improved to: O(?)

## 💡 Interview Tips
- What interviewers would notice`
      }
    ];

    return await this.makeRequest(model, messages, { maxTokens: 3000 });
  }

  // Debug code and find issues
  async debugCode(code, language, errorDescription, model = 'DeepSeek-V3-0324') {
    const messages = [
      {
        role: 'system',
        content: 'You are a debugging expert with superior code generation capabilities. Help identify and fix code issues with clear explanations.'
      },
      {
        role: 'user',
        content: `Help me debug this ${language} code:

**Code with Issues:**
\`\`\`${language}
${code}
\`\`\`

**Problem Description:**
${errorDescription}

Please provide:

## 🔍 Issue Analysis
- What's causing the problem

## 🛠️ Fixed Code
\`\`\`${language}
// Your corrected version with comments
\`\`\`

## 📝 Explanation
- What was wrong
- How the fix works`
      }
    ];

    return await this.makeRequest(model, messages);
  }

  // Optimize code for better performance
  async optimizeCode(code, language, model = 'DeepSeek-V3-0324') {
    const messages = [
      {
        role: 'system',
        content: 'You are a performance optimization expert with enhanced reasoning capabilities. Focus on algorithmic improvements and efficiency.'
      },
      {
        role: 'user',
        content: `Optimize this ${language} code for better performance:

\`\`\`${language}
${code}
\`\`\`

Provide:

## ⚡ Optimized Code
\`\`\`${language}
// Your optimized version
\`\`\`

## 📊 Performance Analysis
- **Before:** Time: O(?), Space: O(?)
- **After:** Time: O(?), Space: O(?)

## 💡 Optimization Techniques Used
- List specific optimizations applied`
      }
    ];

    return await this.makeRequest(model, messages);
  }

  // Explain code functionality
  async explainCode(code, language, model = 'gpt-4.1') {
    const messages = [
      {
        role: 'system',
        content: 'You are a coding instructor with excellent instruction following abilities. Explain code clearly and educationally.'
      },
      {
        role: 'user',
        content: `Explain this ${language} code step by step:

\`\`\`${language}
${code}
\`\`\`

Format your explanation as:

## 🎯 What This Code Does
- High-level purpose

## 🔍 Step-by-Step Breakdown
1. **Line X-Y:** Explanation
2. **Line X-Y:** Next step

## 🧠 Key Concepts
- Programming concepts demonstrated

## 💬 Interview Discussion Points
- How to explain to an interviewer`
      }
    ];

    return await this.makeRequest(model, messages);
  }

  // Complete partial code
  async completeCode(partialCode, language, context, model = 'DeepSeek-V3-0324') {
    const messages = [
      {
        role: 'system',
        content: 'You are a code completion assistant with superior code generation capabilities. Complete partial code following best practices.'
      },
      {
        role: 'user',
        content: `Complete this partial ${language} code:

**Context/Requirements:**
${context}

**Partial Code:**
\`\`\`${language}
${partialCode}
\`\`\`

Provide:

## ✅ Completed Code
\`\`\`${language}
// Your completed implementation
\`\`\`

## 📝 Implementation Notes
- Explain completion choices`
      }
    ];

    return await this.makeRequest(model, messages);
  }

  // General coding assistance
  async getGeneralHelp(question, code, language, model = 'gpt-4.1') {
    const messages = [
      {
        role: 'system',
        content: 'You are an experienced programming mentor and coding interview expert with excellent instruction following abilities.'
      },
      {
        role: 'user',
        content: `**Question:** ${question}

${code ? `**Current Code:**
\`\`\`${language}
${code}
\`\`\`
` : ''}

Please provide:
- Direct answer to the question
- Code examples if relevant
- Best practices and tips`
      }
    ];

    return await this.makeRequest(model, messages);
  }
}
