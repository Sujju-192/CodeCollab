// import { useState, useEffect } from "react";
// import { RoomProvider } from "../../liveblocks.config";
// import { CollaborativeEditor } from "./CollaborativeEditor";
// import Navbar from "./Navbar";
// import { motion } from 'framer-motion';
// import { Bot } from 'lucide-react';
// import AgenticAIPanel from './AI/AgenticAIPanel';
// import { Toaster } from 'react-hot-toast';
// import useSocket from "../hooks/useSocket";

// export default function EditorWrapper() {
//   const [roomId, setRoomId] = useState("");
//   const [activeRoom, setActiveRoom] = useState("");
//   const [showShareModal, setShowShareModal] = useState(false);

//     // const { roomId } = useParams();
//   // const [searchParams] = useSearchParams();
//   // const userId = searchParams.get('userId');
//   // const userRole = searchParams.get('role');
//   const socket = useSocket('http://localhost:5000');

//   // Add these state variables in your component
// const [showAIPanel, setShowAIPanel] = useState(false);
// const [currentCode, setCurrentCode] = useState('');
// const [currentLanguage, setCurrentLanguage] = useState('javascript');
// const [problemStatement, setProblemStatement] = useState('');

//   // Get room ID from URL if exists
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const urlRoomId = params.get("room");
//     if (urlRoomId) {
//       setRoomId(urlRoomId);
//     }
//   }, []);

//   //AI Bot
//   useEffect(() => {
//     // Replace these with actual connections to your code editor
//     // Example: setCurrentCode(editor.getValue());
//     // Example: setCurrentLanguage(editor.getLanguage());

//     // Mock data for demonstration
//     setCurrentCode(
//       `
// // Binary Search Implementation
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
  
//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);
    
//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
  
//   return -1;
// }

// // Test the function
// const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
// console.log(binarySearch(numbers, 7)); // Should return 3
//   `.trim()
//     );

//     setProblemStatement(
//       `
// Write a function multiply of Ten that takes a single integer num as input and returns the result of multiplying num by 10.

// Example:

// Input: 5
// Output: 50

// Input: -3
// Output: -30
//   `.trim()
//     );
//   }, []);

//   const createNewRoom = () => {
//     const newRoomId = `room-${Math.random().toString(36).substring(2, 9)}`;
//     setRoomId(newRoomId);
//     setActiveRoom(newRoomId);
//     updateUrl(newRoomId);
//   };

//   const joinRoom = (e) => {
//     e.preventDefault();
//     if (roomId.trim()) {
//       setActiveRoom(roomId);
//       updateUrl(roomId);
//     }
//   };

//   const updateUrl = (roomId) => {
//     const url = new URL(window.location.href);
//     url.searchParams.set("room", roomId);
//     window.history.pushState({}, "", url);
//   };

//   const copyRoomLink = () => {
//     navigator.clipboard.writeText(activeRoom);
//     setShowShareModal(false);
//   };

//   if (activeRoom) {
//     return (
//       <RoomProvider id={activeRoom} initialPresence={{}}>
//         <div className="flex flex-col h-screen min-h-screen bg-gray-950 text-white">
//           <Navbar />
//                            <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setShowAIPanel(true)}
//         className="absolute top-4 right-4 z-30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
//         title="Smart Coding Assistant"
//       >
//         <Bot className="w-6 h-6" />
//         <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />

//         {/* Tooltip */}
//         <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
//           <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
//             🤖 AI Assistant
//             <br />
//             <span className="text-green-300">Powered by GitHub Models</span>
//           </div>
//           <div className="w-2 h-2 bg-gray-900 rotate-45 absolute top-full right-3 -mt-1"></div>
//         </div>
//       </motion.button>
//       <AgenticAIPanel
//         isOpen={showAIPanel}
//         onClose={() => setShowAIPanel(false)}
//         currentCode={currentCode}
//         currentLanguage={currentLanguage}
//         problemStatement={problemStatement}
//         socket={socket}
//         roomId={roomId}
//         username={123}
//         userRole={"candidate"}
//       />
//           <CollaborativeEditor
//             roomId={activeRoom}
//             onShareClick={() => setShowShareModal(true)}
//           />
       
//           {/* Share Modal */}
//           {showShareModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full border border-gray-700">
//                 <h3 className="text-xl font-bold mb-4 text-white">
//                   Share Room
//                 </h3>
//                 <div className="flex items-center mb-4">
//                   <input
//                     type="text"
//                     value={activeRoom}
//                     readOnly
//                     className="flex-1 p-2 border border-gray-600 rounded-l bg-gray-700 text-white"
//                   />
//                   <button
//                     onClick={copyRoomLink}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
//                   >
//                     Copy
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => setShowShareModal(false)}
//                   className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </RoomProvider>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <Navbar />
     
//       <div className="container mx-auto px-4 py-12 flex flex-col items-center">
//         <div className="text-center mb-8">
      
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">CodeCollab</h1>
//           <p className="text-lg text-gray-600">
//             Real-time collaborative code editor
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
//           <div className="flex flex-col space-y-4">
//                          <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setShowAIPanel(true)}
//         className="absolute top-4 right-4 z-30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
//         title="Smart Coding Assistant"
//       >
//         <Bot className="w-6 h-6" />
//         <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />

//         {/* Tooltip */}
//         <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
//           <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
//             🤖 AI Assistant
//             <br />
//             <span className="text-green-300">Powered by GitHub Models</span>
//           </div>
//           <div className="w-2 h-2 bg-gray-900 rotate-45 absolute top-full right-3 -mt-1"></div>
//         </div>
//       </motion.button>
//       <AgenticAIPanel
//         isOpen={showAIPanel}
//         onClose={() => setShowAIPanel(false)}
//         currentCode={currentCode}
//         currentLanguage={currentLanguage}
//         problemStatement={problemStatement}
//         socket={socket}
//         roomId={roomId}
//         username={123}
//         userRole={"candidate"}
//       />
//             <button
//               onClick={createNewRoom}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
//             >
//               Create New Room
//             </button>

//             <div className="relative flex items-center py-2">
//               <div className="flex-grow border-t border-gray-300"></div>
//               <span className="mx-4 text-gray-500 text-sm">OR</span>
//               <div className="flex-grow border-t border-gray-300"></div>
//             </div>

//             <form onSubmit={joinRoom} className="space-y-3">
//               <div>
//                 <label
//                   htmlFor="roomId"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Join existing room
//                 </label>
//                 <input
//                   type="text"
//                   id="roomId"
//                   value={roomId}
//                   onChange={(e) => setRoomId(e.target.value)}
//                   placeholder="Enter room ID"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition"
//               >
//                 Join Room
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { RoomProvider } from "../../liveblocks.config";
// import { CollaborativeEditor } from "./CollaborativeEditor";
// import Navbar from "./Navbar";
// import { motion } from 'framer-motion';
// import { Bot } from 'lucide-react';
// import AgenticAIPanel from './AI/AgenticAIPanel';
// import { Toaster } from 'react-hot-toast';
// import useSocket from "../hooks/useSocket";

import { useState, useEffect } from "react";
import { RoomProvider } from "../../liveblocks.config";
import { CollaborativeEditor } from "./CollaborativeEditor";
import Navbar from "./Navbar";
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import AgenticAIPanel from './AI/AgenticAIPanel';
import { Toaster } from 'react-hot-toast';
import useSocket from "../hooks/useSocket";

export default function EditorWrapper() {
  const [roomId, setRoomId] = useState("");
  const [activeRoom, setActiveRoom] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const socket = useSocket('http://localhost:5000');

  // AI-related state variables
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  const [problemStatement, setProblemStatement] = useState('');

  // Get room ID from URL if exists
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRoomId = params.get("room");
    if (urlRoomId) {
      setRoomId(urlRoomId);
    }
  }, []);

  // Set initial problem statement for collaborative coding
  useEffect(() => {
    setProblemStatement(
      `
Collaborative Coding Session

Work together to solve coding problems, implement algorithms, or build features. 
Use the AI assistant to:
- Analyze and review your collaborative code
- Get suggestions for optimization
- Debug issues together  
- Complete partial implementations
- Explain complex logic to teammates

The AI can see the current state of your shared editor and provide contextual help.
      `.trim()
    );
  }, []);

  // Function to update current code - this will be called by the CollaborativeEditor
  const updateCurrentCode = (newCode, language = 'javascript') => {
    setCurrentCode(newCode);
    setCurrentLanguage(language);
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
    navigator.clipboard.writeText(activeRoom);
    setShowShareModal(false);
  };

  if (activeRoom) {
    return (
      <RoomProvider id={activeRoom} initialPresence={{}}>
        <div className="flex flex-col h-screen min-h-screen bg-gray-950 text-white relative">
          {/* Toast notifications */}
          <Toaster position="top-right" />
          
          <Navbar />
          
          {/* AI Assistant Floating Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAIPanel(true)}
            className="absolute top-20 right-4 z-30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
            title="Smart Coding Assistant"
          >
            <Bot className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                🤖 AI Collaborative Assistant
                <br />
                <span className="text-green-300">Analyze shared code in real-time</span>
              </div>
              <div className="w-2 h-2 bg-gray-900 rotate-45 absolute top-full right-3 -mt-1"></div>
            </div>
          </motion.button>

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
            userRole="collaborator"
          />
          
          {/* Collaborative Editor - Pass the update function */}
          <CollaborativeEditor
            roomId={activeRoom}
            onShareClick={() => setShowShareModal(true)}
            onCodeChange={updateCurrentCode} // Pass the function to update code
          />
       
          {/* Share Modal */}
          {showShareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full border border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Share Collaborative Room
                </h3>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    value={`${window.location.origin}${window.location.pathname}?room=${activeRoom}`}
                    readOnly
                    className="flex-1 p-2 border border-gray-600 rounded-l bg-gray-700 text-white text-sm"
                  />
                  <button
                    onClick={copyRoomLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
                  >
                    Copy
                  </button>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </RoomProvider>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Toast notifications */}
      <Toaster position="top-right" />
      
      <Navbar />
     
      <div className="container mx-auto px-4 py-12 flex flex-col items-center relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CodeCollab</h1>
          <p className="text-lg text-gray-600">
            Real-time collaborative code editor with AI assistance
          </p>
        </div>

        {/* AI Assistant Button on Landing Page */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAIPanel(true)}
          className="absolute top-4 right-4 z-30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
          title="Smart Coding Assistant"
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

        {/* AI Assistant Panel for Landing Page */}
        <AgenticAIPanel
          isOpen={showAIPanel}
          onClose={() => setShowAIPanel(false)}
          currentCode={currentCode}
          currentLanguage={currentLanguage}
          problemStatement="General coding assistance - Ask me anything about programming!"
          socket={socket}
          roomId=""
          username="user"
          userRole="developer"
        />

        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <div className="flex flex-col space-y-4">
            <button
              onClick={createNewRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Create New Collaborative Room
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form onSubmit={joinRoom} className="space-y-3">
              <div>
                <label
                  htmlFor="roomId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Join existing room
                </label>
                <input
                  type="text"
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition"
              >
                Join Room
              </button>
            </form>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Assistance</h3>
            <p className="text-sm text-gray-600">
              Get intelligent code suggestions, debugging help, and explanations powered by GitHub Models AI
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Collaboration</h3>
            <p className="text-sm text-gray-600">
              Code together in real-time with multiple participants and see changes instantly
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Share AI Insights</h3>
            <p className="text-sm text-gray-600">
              Share AI suggestions and insights with your collaborators for better teamwork
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
