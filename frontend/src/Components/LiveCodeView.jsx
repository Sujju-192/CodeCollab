// src/Components/LiveCodeView.jsx
import React from "react";

const LiveCodeView = ({ code }) => (
  <div className="h-full flex flex-col">
    <h3 className="text-sm font-semibold text-gray-400 mb-2">Candidate's Live Code</h3>
    <div className="flex-1 bg-gray-900 text-green-400 rounded-lg p-3 overflow-auto font-mono">
      {code ? (
        <pre className="text-sm whitespace-pre-wrap">{code}</pre>
      ) : (
        <div className="text-gray-500 italic flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-2xl mb-2">💻</div>
            <p>Waiting for candidate to start coding...</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default LiveCodeView;