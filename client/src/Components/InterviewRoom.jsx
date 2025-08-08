import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import useSocket from '../hooks/useSocket';
import useWebRTC from '../hooks/useWebRTC';
import ChatBox from './ChatBox';
import VideoChat from './VideoChat';
// import { useState } from 'react';
// Add these imports at the top
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import AgenticAIPanel from './AI/AgenticAIPanel';
import { Toaster } from 'react-hot-toast';

export default function InterviewRoom() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const userRole = searchParams.get('role');
  const socket = useSocket('http://localhost:5000');

  
  const [participants, setParticipants] = useState([]);
  const [otherUserId, setOtherUserId] = useState(null);
  const [allParticipants, setAllParticipants] = useState(new Map()); // Track all participants



// Add these state variables in your component
const [showAIPanel, setShowAIPanel] = useState(false);
const [currentCode, setCurrentCode] = useState('');
const [currentLanguage, setCurrentLanguage] = useState('javascript');
const [problemStatement, setProblemStatement] = useState('');



useEffect(() => {
  // Replace these with actual connections to your code editor
  // Example: setCurrentCode(editor.getValue());
  // Example: setCurrentLanguage(editor.getLanguage());
  
  // Mock data for demonstration
  setCurrentCode(`
// Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Test the function
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7)); // Should return 3
  `.trim());
  
  setProblemStatement(`
Implement a binary search algorithm to find a target value in a sorted array.

Requirements:
- Input: sorted array of integers and target value
- Output: index of target if found, -1 if not found
- Time complexity: O(log n)
- Space complexity: O(1)

Test cases:
- binarySearch([1,3,5,7,9], 5) → 2
- binarySearch([1,3,5,7,9], 6) → -1
- binarySearch([], 1) → -1
  `.trim());
}, []);



  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('🔌 Connected to server, joining room...');
      socket.emit('join-room', roomId, userId, userRole);
    });

    socket.on('user-connected', ({ userId: newUserId, userRole: newUserRole }) => {
      console.log('👤 User connected:', newUserId, newUserRole);
      
      // Update participants list
      setParticipants(prev => {
        const filtered = prev.filter(p => p.userId !== newUserId);
        const updated = [...filtered, { userId: newUserId, userRole: newUserRole }];
        console.log('👥 Updated participants:', updated);
        return updated;
      });

      // Update all participants map
      setAllParticipants(prev => {
        const updated = new Map(prev);
        updated.set(newUserId, { userId: newUserId, userRole: newUserRole });
        return updated;
      });

      // Set remote user for WebRTC signaling (only if different from current user)
      if (newUserId !== userId && !otherUserId) {
        console.log('🎯 Setting remote user for WebRTC:', newUserId);
        setOtherUserId(newUserId);
      }
    });

    socket.on('user-disconnected', (disconnectedUserId) => {
      console.log('👋 User disconnected:', disconnectedUserId);
      
      setParticipants(prev => {
        const updated = prev.filter(p => p.userId !== disconnectedUserId);
        console.log('👥 Updated participants after disconnect:', updated);
        return updated;
      });

      // Update all participants map
      setAllParticipants(prev => {
        const updated = new Map(prev);
        updated.delete(disconnectedUserId);
        return updated;
      });
      
      if (disconnectedUserId === otherUserId) {
        console.log('🎯 Remote user disconnected, clearing...');
        setOtherUserId(null);
      }
    });

    // Handle room join confirmation and existing participants
    socket.on('existing-messages', (messages) => {
      console.log('📜 Received existing messages:', messages.length);
      
      // Request current participants when we join
      socket.emit('get-participants', (response) => {
        if (response.success) {
          console.log('👥 Existing participants:', response.participants);
          
          // Set up existing participants
          const existingParticipants = response.participants.filter(p => p.userId !== userId);
          setParticipants(existingParticipants);
          
          // Set remote user if there's exactly one other participant
          if (existingParticipants.length === 1) {
            const otherUser = existingParticipants[0];
            console.log('🎯 Setting remote user from existing participants:', otherUser.userId);
            setOtherUserId(otherUser.userId);
          }
        }
      });
    });

    return () => {
      socket.off('connect');
      socket.off('user-connected');
      socket.off('user-disconnected');
      socket.off('existing-messages');
    };
  }, [socket, roomId, userId, userRole]);

  // WebRTC connection
  const { localStream, remoteStream, isCallActive, connectionState, isConnected } = useWebRTC(
    socket, 
    roomId, 
    userId, 
    otherUserId
  );

  console.log('🔍 Debug - AI Environment Check:', {
  VITE_AI_ENABLED : import.meta.env.VITE_AI_ENABLED,
  VITE_GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN
    ? 'Set (length: ' + import.meta.env.VITE_GITHUB_TOKEN.length + ')'
    : 'Not set',
  NODE_ENV: import.meta.env.NODE_ENV,
  MODE: import.meta.env.MODE  // no trailing comma here
});

const isAIEnabled = import.meta.env.VITE_AI_ENABLED === 'true' && !!import.meta.env.VITE_GITHUB_TOKEN;
console.log("isAIEnabled..........",isAIEnabled);
// in JSX:


  // Debug information
  useEffect(() => {
    console.log('🔍 Debug Info:', {
      userId,
      userRole,
      otherUserId,
      participants: participants.length,
      hasLocalStream: !!localStream,
      hasRemoteStream: !!remoteStream,
      isCallActive,
      connectionState,
      isConnected
    });
  }, [userId, userRole, otherUserId, participants, localStream, remoteStream, isCallActive, connectionState, isConnected]);

  return (
    
    <div className="flex flex-col h-screen bg-gray-100">
      <Toaster position="top-right" />
      {/* Header with Debug Info */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Interview Room</h1>
            <p className="text-sm text-gray-600">
              Room: {roomId} • Role: <span className="capitalize font-medium">{userRole}</span>
              {otherUserId && <span className="ml-2 text-green-600">• Remote: {otherUserId}</span>}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Participants: {participants.length + 1}</span>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                socket?.connected ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span>{socket?.connected ? 'Connected' : 'Disconnected'}</span>
            </div>
            {/* Debug indicators */}
            <div className="flex items-center space-x-1 text-xs">
              <span className={`px-2 py-1 rounded ${localStream ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                Local: {localStream ? 'OK' : 'No'}
              </span>
              <span className={`px-2 py-1 rounded ${remoteStream ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                Remote: {remoteStream ? 'OK' : 'No'}
              </span>
              <span className={`px-2 py-1 rounded ${isCallActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                Call: {isCallActive ? 'Active' : 'Inactive'}
              </span>
              <span className={`px-2 py-1 rounded ${otherUserId ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                Target: {otherUserId ? 'Set' : 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
    <div className="flex-1 flex overflow-hidden">
      {/* Video Section */}
      <div className="w-[70%] h-full relative">
        {/* AI Assistant Floating Button */}
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAIPanel(true)}
          className="absolute top-4 right-4 z-30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
          title="Smart Coding Assistant"
        >
          <Bot className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
              🤖 AI Assistant
              <br />
              <span className="text-green-300">Powered by GitHub Models</span>
            </div>
            <div className="w-2 h-2 bg-gray-900 rotate-45 absolute top-full right-3 -mt-1"></div>
          </div>
        {/* </motion.button> */} 

        <VideoChat
          localStream={localStream}
          remoteStream={remoteStream}
          isCallActive={isCallActive}
          participants={participants}
          userRole={userRole}
          connectionState={connectionState}
          otherUserId={otherUserId}
        />
      </div>
      
      {/* Chat Section */}
      <div className="w-[30%] h-full border-l border-gray-200">
        <ChatBox
          socket={socket}
          roomId={roomId}
          userId={userId}
          userRole={userRole}
        />
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
      roomId={roomId}
      username={userId}
      userRole={userRole}
    />
    </div>
  );
}
