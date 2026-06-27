// src/Components/CandidateWorkspace.jsx
import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { apiFetch } from "../config/api";

const templates = {
  javascript: `function solution() {\n  // Write your solution here\n}`,
  python: `def solution():\n    # Write your solution here\n    pass`,
  java: `public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
};

const CandidateWorkspace = ({ problem, socket, roomId, userId }) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(templates.javascript);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [running, setRunning] = useState(false);
  const editorRef = useRef(null);

  // Emit code updates to interviewer
  useEffect(() => {
    if (!socket) return;
    const timeout = setTimeout(() => {
      socket.emit("code-update", { code, userId });
    }, 300);
    return () => clearTimeout(timeout);
  }, [code, socket, userId]);

  // Reset code when problem changes
  useEffect(() => {
    if (problem) {
      setCode(templates[language] || templates.javascript);
      setTestResults(null);
      setAnalysisResult(null);
      setError(null);
    }
  }, [problem]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(templates[lang] || templates.javascript);
  };

  const handleRun = async () => {
    if (!problem) {
      setError("No problem to run against.");
      return;
    }
    setRunning(true);
    setError(null);
    setTestResults(null);
    try {
      const result = await apiFetch("/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ps: problem.description,
          code,
          language,
        }),
      });
      setTestResults(result.output || result);
    } catch (err) {
      setError("Code execution failed: " + err.message);
    } finally {
      setRunning(false);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError(null);
    try {
      const result = await apiFetch("/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ps: problem?.description || "Coding problem",
          code,
          language,
        }),
      });
      setAnalysisResult({
        timeComplexity: result.timeComplexity || "Unknown",
        spaceComplexity: result.spaceComplexity || "Unknown",
        efficiencyScore: result.efficiencyScore || 5,
        comment: result.comment || "No feedback",
      });
    } catch (err) {
      setError("Analysis failed: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-900">
      {/* Problem panel */}
      <div className="w-1/2 border-r border-gray-700 overflow-auto bg-gray-800 p-4">
        {!problem ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-lg">Waiting for problem...</p>
              <p className="text-sm">The interviewer will generate a coding problem for you.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">{problem.title}</h2>
            <div className="text-gray-300 whitespace-pre-wrap">{problem.description}</div>
            {problem.requirements?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-300 mb-1">Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  {problem.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {problem.sampleInput && (
                <div className="bg-gray-700 p-3 rounded">
                  <span className="text-xs font-medium text-gray-400">Sample Input</span>
                  <pre className="text-sm text-gray-200 mt-1">{problem.sampleInput}</pre>
                </div>
              )}
              {problem.sampleOutput && (
                <div className="bg-gray-700 p-3 rounded">
                  <span className="text-xs font-medium text-gray-400">Sample Output</span>
                  <pre className="text-sm text-gray-200 mt-1">{problem.sampleOutput}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Editor + tools */}
      <div className="w-1/2 flex flex-col">
        {/* Toolbar */}
        <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={running}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              {running ? "Running..." : "Run"}
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>

        {/* Editor – fills remaining space */}
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
            onMount={(editor) => { editorRef.current = editor; }}
          />
        </div>

        {/* Output panel – increased height to h-64 */}
        <div className="h-64 border-t border-gray-700 overflow-auto bg-gray-800 p-3">
          {error && (
            <div className="text-red-400 bg-red-900/30 p-2 rounded mb-2 text-sm">{error}</div>
          )}
          {testResults && (
            <div className="mb-2">
              <h4 className="font-medium text-sm text-gray-300">Output:</h4>
              <pre className="bg-gray-700 p-2 rounded text-xs text-gray-200 mt-1 overflow-auto max-h-48">
                {typeof testResults === "string" ? testResults : JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}
          {analysisResult && (
            <div className="text-sm space-y-1 text-gray-300">
              <h4 className="font-medium">Code Analysis:</h4>
              <div>Time: {analysisResult.timeComplexity}, Space: {analysisResult.spaceComplexity}</div>
              <div>Score: {analysisResult.efficiencyScore}/10</div>
              <div className="text-gray-400">{analysisResult.comment}</div>
            </div>
          )}
          {!analysisResult && !testResults && !error && (
            <div className="text-gray-500 text-sm italic">Run or analyze your code to see results.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateWorkspace;