// src/Components/InterviewerPanel.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "../config/api";

const InterviewerPanel = ({ socket, roomId, currentProblem }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);

    try {
      console.log("🤖 Generating problem from prompt:", prompt);
      
      // Use the same backend endpoint as CodeEditor uses
      const parsed = await apiFetch("/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const newProblem = {
        title: parsed.title || "Untitled problem",
        description: parsed.description || "",
        requirements: Array.isArray(parsed.requirements)
          ? parsed.requirements.map((r) =>
              typeof r === "string" ? r : String(r)
            )
          : [],
        sampleInput: parsed.sampleInput || "",
        sampleOutput: parsed.sampleOutput || "",
      };

      console.log("✅ Problem generated, emitting via socket:", newProblem);
      
      // FIXED: Emit the problem to the room via socket
      socket.emit("problem-generated", newProblem);
      setPrompt(""); // clear input after successful generation
    } catch (err) {
      console.error("❌ Failed to generate problem:", err);
      setError(err.message || "Failed to generate problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Generate Problem
      </h3>
      <div className="flex-1 flex space-x-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the DSA problem (e.g., binary search in a sorted array)..."
          className="flex-1 resize-none border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          disabled={loading}
        />
        <div className="flex flex-col justify-between gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? "Generating..." : "Generate"}
          </motion.button>
          <button
            onClick={() => {
              setPrompt("");
              setError(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {currentProblem && (
        <div className="mt-3 bg-blue-50 p-2 rounded border border-blue-200 text-xs">
          <div className="font-medium text-blue-900">
            ✅ Current Problem: {currentProblem.title}
          </div>
          <div className="text-blue-700 truncate mt-1">
            {currentProblem.description?.slice(0, 100)}...
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewerPanel;