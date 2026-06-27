// src/Pages/EditorWrapper.jsx (or wherever this file lives)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { RoomProvider } from "../../liveblocks.config";
import { CollaborativeEditor } from "./CollaborativeEditor";
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import AgenticAIPanel from './AI/AgenticAIPanel';
import { Toaster } from 'react-hot-toast';
import useSocket from "../hooks/useSocket";
import { SOCKET_URL } from "../config/api.js";

export default function EditorWrapper() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [activeRoom, setActiveRoom] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  // AI Integration States
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  const [problemStatement, setProblemStatement] = useState('');

  const socket = useSocket(SOCKET_URL);

  // Get room ID from URL if exists
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRoomId = params.get("room");
    if (urlRoomId) {
      setRoomId(urlRoomId);
    }
  }, []);

  // Initialize AI context for collaborative coding
  useEffect(() => {
    setProblemStatement(`
**Collaborative Coding Session**

Welcome to CodeCollab! Work together with your team to:
- Solve coding problems and implement algorithms
- Build features and applications collaboratively
- Debug and optimize code in real-time
- Share knowledge and learn from each other

**AI Assistant Features:**
- 📊 **Code Analysis**: Get quality scores and improvement suggestions
- 🐛 **Debug Help**: Identify and fix issues in your collaborative code
- ⚡ **Optimization**: Improve performance and efficiency
- 💡 **Code Explanation**: Understand complex algorithms and patterns
- ✅ **Auto-completion**: Complete partial implementations
- 🔍 **Code Review**: Professional review like in technical interviews

The AI can see your current collaborative editor content and provide contextual assistance based on what you and your teammates are working on together.
    `.trim());
  }, []);

  // Function to receive code changes from CollaborativeEditor
  const handleCodeChange = (newCode, newLanguage) => {
    setCurrentCode(newCode || '');
    setCurrentLanguage(newLanguage || 'javascript');
  };

  const createNewRoom = () => {
    const newRoomId = `room-${Math.random().toString(36).substring(2, 9)}`;
    setRoomId(newRoomId);
    setActiveRoom(newRoomId);
    updateUrl(newRoomId);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      setActiveRoom(roomId);
      updateUrl(roomId);
    }
  };

  const updateUrl = (roomId) => {
    const url = new URL(window.location.href);
    url.searchParams.set("room", roomId);
    window.history.pushState({}, "", url);
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareModal(false);
  };

  if (activeRoom) {
    return (
      <RoomProvider id={activeRoom} initialPresence={{}}>
        <div className="flex flex-col h-screen min-h-screen bg-gray-900 text-gray-100 relative">
          {/* Toast Notifications */}
          <Toaster position="top-right" />

          {/* Header with Back Button + AI Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              {/* Back to Dashboard Button */}
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
                title="Back to Dashboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Dashboard</span>
              </button>
              <div className="text-sm font-mono text-gray-400">
                Room: <span className="text-blue-400">{activeRoom}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* AI Assistant Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAIPanel(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group flex items-center space-x-1"
                title="AI Coding Assistant"
              >
                <Bot className="w-4 h-4" />
                <span className="text-xs font-medium">AI</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </motion.button>

              {/* Share Button */}
              <button
                onClick={() => setShowShareModal(true)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>

          {/* AI Assistant Panel */}
          <AgenticAIPanel
            isOpen={showAIPanel}
            onClose={() => setShowAIPanel(false)}
            currentCode={currentCode}
            currentLanguage={currentLanguage}
            problemStatement={problemStatement}
            socket={socket}
            roomId={activeRoom}
            username="collaborator"
            userRole="developer"
          />
          
          {/* Collaborative Editor with AI Integration */}
          <CollaborativeEditor
            roomId={activeRoom}
            onShareClick={() => setShowShareModal(true)}
            onCodeChange={handleCodeChange}
          />

          {/* Share Modal */}
          {showShareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full border border-gray-700 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">
                    Share Collaborative Room
                  </h3>
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-1 p-2 border border-gray-600 rounded-l bg-gray-700 text-gray-200 font-mono text-sm truncate"
                  />
                  <button
                    onClick={copyRoomLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </button>
                </div>
                <div className="text-xs text-gray-400">
                  Anyone with this link can join the room and collaborate with AI assistance
                </div>
              </div>
            </div>
          )}
        </div>
      </RoomProvider>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Back to Dashboard Button (top-left) */}
      <button
        onClick={() => navigate('/dashboard')}
        className="fixed top-4 left-4 z-30 flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700 shadow-lg"
        title="Back to Dashboard"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm">Dashboard</span>
      </button>

      {/* AI Assistant Button on Landing Page */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAIPanel(true)}
        className="fixed top-4 right-4 z-30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        title="AI Coding Assistant"
      >
        <Bot className="w-5 h-5" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
            🤖 AI Assistant
            <br />
            <span className="text-green-300">Get coding help</span>
          </div>
          <div className="w-2 h-2 bg-gray-900 rotate-45 absolute top-full right-3 -mt-1"></div>
        </div>
      </motion.button>

      {/* AI Panel for Landing Page */}
      <AgenticAIPanel
        isOpen={showAIPanel}
        onClose={() => setShowAIPanel(false)}
        currentCode={currentCode}
        currentLanguage={currentLanguage}
        problemStatement="General coding assistance - Ask me anything about programming, algorithms, or data structures!"
        socket={socket}
        roomId=""
        username="user"
        userRole="developer"
      />

      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-400 mb-3 font-mono">CodeCollab</h1>
          <p className="text-lg text-gray-400">
            Real-time collaborative code editor with AI assistance
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-700">
          <div className="flex flex-col space-y-5">
            <button
              onClick={createNewRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Room
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <form onSubmit={joinRoom} className="space-y-4">
              <div>
                <label
                  htmlFor="roomId"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Join existing room
                </label>
                <input
                  type="text"
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                Join Room
              </button>
            </form>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-white mb-2">AI-Powered Assistance</h3>
            <p className="text-sm text-gray-400">
              Get intelligent code suggestions, debugging help, and explanations powered by GitHub Models AI
            </p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Real-time Collaboration</h3>
            <p className="text-sm text-gray-400">
              Code together in real-time with multiple participants and see changes instantly
            </p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Share AI Insights</h3>
            <p className="text-sm text-gray-400">
              Share AI suggestions and insights with your collaborators for better teamwork
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Collaborate on code in real-time with your team • AI-powered coding assistance included</p>
        </div>
      </div>
    </div>
  );
}