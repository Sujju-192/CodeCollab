import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

import mongoConnect from './Config/mongoConnect.js';
import codeRoutes from './Routes/code.js';
import userRoutes from './Routes/userRoutes.js';
import interviewRoutes from './Routes/interviewRoutes.js';
import { sendNotificationEmail } from './utils/sendEmail.js';
import { GitHubAIService, GITHUB_MODELS, AI_ACTIONS } from './services/githubAI.js';
import { setupSocketIO } from './socket.js';

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

const githubAI = new GitHubAIService(process.env.GITHUB_TOKEN);

const aiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many AI requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use((req, res, next) => {
  const hasBody = req.body && Object.keys(req.body).length > 0;
  console.log(`[API] ${req.method} ${req.originalUrl}`, hasBody ? req.body : '');
  next();
});

app.use(codeRoutes);
app.use(userRoutes);
app.use(interviewRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/ai/models', (req, res) => {
  try {
    console.log('[API] Fetching available AI models');
    res.json({
      success: true,
      models: GITHUB_MODELS,
      actions: AI_ACTIONS,
    });
  } catch (error) {
    console.error('[API] Error getting AI models:', error);
    res.status(500).json({ success: false, error: 'Failed to get AI models' });
  }
});

app.post('/api/ai/assistance', aiRateLimit, async (req, res) => {
  try {
    const {
      action,
      prompt,
      code = '',
      language = 'javascript',
      problemStatement = '',
      errorDescription = '',
      context = '',
      model = process.env.DEFAULT_AI_MODEL || 'gpt-4o',
    } = req.body;

    console.log(`[API] AI assistance request: action=${action}, model=${model}`);

    if (!action) {
      return res.status(400).json({ success: false, error: 'Action is required' });
    }

    if (!prompt && action === AI_ACTIONS.GENERAL) {
      return res.status(400).json({ success: false, error: 'Prompt is required for general assistance' });
    }

    if (!code && [AI_ACTIONS.ANALYZE, AI_ACTIONS.DEBUG, AI_ACTIONS.OPTIMIZE, AI_ACTIONS.EXPLAIN].includes(action)) {
      return res.status(400).json({ success: false, error: 'Code is required for this type of assistance' });
    }

    let result;

    switch (action) {
      case AI_ACTIONS.ANALYZE:
        result = await githubAI.analyzeCode(code, language, problemStatement || prompt, model);
        break;
      case AI_ACTIONS.DEBUG:
        result = await githubAI.debugCode(code, language, errorDescription || prompt, model);
        break;
      case AI_ACTIONS.OPTIMIZE:
        result = await githubAI.optimizeCode(code, language, model);
        break;
      case AI_ACTIONS.EXPLAIN:
        result = await githubAI.explainCode(code, language, model);
        break;
      case AI_ACTIONS.COMPLETE:
        result = await githubAI.completeCode(code, language, context || problemStatement, model);
        break;
      case AI_ACTIONS.REVIEW:
        result = await githubAI.analyzeCode(code, language, problemStatement || prompt, model);
        break;
      default:
        result = await githubAI.getGeneralHelp(prompt, code, language, model);
    }

    if (result.success) {
      console.log(`[API] AI assistance completed: action=${action}, model=${result.model}`);
      res.json({
        success: true,
        response: result.content,
        model: result.model,
        usage: result.usage,
        action,
      });
    } else {
      console.error('[API] AI assistance failed:', result.error);
      res.status(500).json({ success: false, error: result.error, model: result.model });
    }
  } catch (error) {
    console.error('[API] AI assistance error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/ai/health', (req, res) => {
  const isEnabled = process.env.AI_ENABLED === 'true' && !!process.env.GITHUB_TOKEN;
  console.log('[API] AI health check:', { isEnabled });
  res.json({
    success: true,
    aiEnabled: isEnabled,
    hasToken: !!process.env.GITHUB_TOKEN,
    availableModels: Object.keys(GITHUB_MODELS).length,
  });
});

app.post('/api/github-ai', async (req, res) => {
  const { model, messages, max_tokens = 1024, temperature = 0.2, top_p = 0.95 } = req.body;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  console.log('[API] GitHub AI proxy request:', { model, messageCount: messages?.length });

  try {
    const response = await axios.post(
      'https://models.inference.ai.azure.com/chat/completions',
      { model, messages, max_tokens, temperature, top_p, stream: false },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        timeout: 40000,
      }
    );
    console.log('[API] GitHub AI proxy success:', { model, status: response.status });
    res.json(response.data);
  } catch (err) {
    console.error('[API] GitHub AI proxy error:', err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data?.error || err.message });
  }
});

app.post('/', async (req, res) => {
  console.log('[API] Root POST:', req.body);
  return res.json({ message: 'CodeCollab API is running' });
});

app.get('/email', (req, res) => {
  console.log('[API] Sending test email');
  sendNotificationEmail('Test Subject', 'Hello! This is a test email.');
  res.send('Email page');
});

setupSocketIO(httpServer);

mongoConnect();

httpServer.listen(port, () => {
  console.log(`CodeCollab backend listening on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`AI Assistant: ${process.env.AI_ENABLED === 'true' ? 'Enabled' : 'Disabled'}`);
  console.log(`Socket.IO: enabled on same port`);
});
