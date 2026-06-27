import { Router } from 'express';
import axios from 'axios';

const codeRoutes = Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function buildPrompt({ ps, code, language }) {
  return `
Analyze this ${language} code for time/space complexity and correctness.
Return ONLY this JSON structure (no extra text):

{
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "efficiencyScore": 1-10,
  "comment": "Over here you have to provide a short comment on the code where it was right or wrong you dont have to give any solution to the problem keep this part as small as possible one more this here dont tell what is wrong just"
}

Problem: ${ps.substring(0, 500)}
Code:
\`\`\`${language}
${code.substring(0, 1000)}
\`\`\``.trim();
}

async function callGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  console.log('[API] Calling Gemini API:', { model: GEMINI_MODEL, promptLength: prompt.length });

  const response = await axios.post(
    `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
        maxOutputTokens: 3000,
      },
    },
    { timeout: 60000 }
  );

  console.log('[API] Gemini API response received');
  return response.data;
}

function extractJsonFromResponse(text) {
  const cleanText = text.replace(/```json|```/g, '').trim();
  const jsonStart = cleanText.indexOf('{');
  const jsonEnd = cleanText.lastIndexOf('}');

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('No JSON found in response');
  }

  return JSON.parse(cleanText.substring(jsonStart, jsonEnd + 1));
}

codeRoutes.post('/run', async (req, res) => {
  try {
    const { ps, code, language } = req.body;
    console.log('[API] Code analysis request:', { language, codeLength: code?.length });

    if (!ps || !code || !language) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['ps', 'code', 'language'],
      });
    }

    const prompt = buildPrompt({ ps, code, language });
    const geminiResponse = await callGemini(prompt);

    const responseText =
      geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text ||
      JSON.stringify(geminiResponse);

    console.log('[API] Gemini raw response length:', responseText.length);

    let analysis;
    try {
      analysis = extractJsonFromResponse(responseText);
    } catch (parseError) {
      return res.status(500).json({
        error: 'Failed to parse analysis',
        details: parseError.message,
        rawResponse: responseText,
      });
    }

    const result = {
      timeComplexity: analysis.timeComplexity || 'Not provided',
      spaceComplexity: analysis.spaceComplexity || 'Not provided',
      efficiencyScore: analysis.efficiencyScore
        ? Math.max(1, Math.min(10, Math.round(analysis.efficiencyScore)))
        : null,
      comment: analysis.comment || 'No analysis provided',
      success: true,
    };

    console.log('[API] Code analysis completed:', { efficiencyScore: result.efficiencyScore });
    return res.status(200).json(result);
  } catch (error) {
    console.error('[API] Analysis error:', error.message);
    return res.status(500).json({
      error: 'Analysis failed',
      details: error.message,
      success: false,
    });
  }
});

codeRoutes.post('/generate-question', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('[API] Generate question request:', { promptLength: prompt?.length });

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const geminiPrompt = `Generate a Data Structures and Algorithms coding problem based on the following prompt:

${prompt}

Return the result as JSON exactly in this format:
{ "title": "", "description": "", "requirements": [""], "sampleInput": "", "sampleOutput": "" }

IMPORTANT: ensure all fields are either strings or arrays of strings.`;

    const geminiResponse = await callGemini(geminiPrompt);
    const responseText =
      geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text ||
      JSON.stringify(geminiResponse);

    const analysis = extractJsonFromResponse(responseText);
    console.log('[API] Question generated:', { title: analysis.title });
    return res.status(200).json({ success: true, ...analysis });
  } catch (error) {
    console.error('[API] Generate question error:', error.message);
    return res.status(500).json({ error: 'Failed to generate question', details: error.message });
  }
});

export default codeRoutes;
