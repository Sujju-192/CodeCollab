// src/Components/VideoChat.jsx
import { useEffect, useRef, useState } from 'react';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiUser, FiClock, FiCamera } from 'react-icons/fi';

export default function VideoChat({ 
  localStream, 
  remoteStream, 
  isCallActive, 
  participants = [], 
  userRole,
  connectionState = 'new',
  otherUserId
}) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Local stream setup (hidden video element for track management)
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
      const videoTrack = localStream.getVideoTracks()[0];
      const audioTrack = localStream.getAudioTracks()[0];
      if (videoTrack) setIsVideoOff(!videoTrack.enabled);
      if (audioTrack) setIsMuted(!audioTrack.enabled);
    }
  }, [localStream]);

  // Remote stream setup
  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      const stream = Array.isArray(remoteStream) ? remoteStream[0] : remoteStream;
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play().catch(e => console.log('Video play prevented:', e));
    }
  }, [remoteStream]);

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const displayInfo = {
    otherRole: userRole === 'interviewer' ? 'candidate' : 'interviewer',
    hasOtherParticipant: participants.some(p => p.userRole === (userRole === 'interviewer' ? 'candidate' : 'interviewer')),
    displayName: userRole === 'interviewer' ? 'Candidate' : 'Interviewer',
    icon: userRole === 'interviewer' ? '👨‍💻' : '👨‍💼',
    color: userRole === 'interviewer' ? 'green' : 'blue'
  };

  const shouldShowRemoteVideo = remoteStream && isCallActive && otherUserId;

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Hidden local video for track management */}
      <video ref={localVideoRef} autoPlay playsInline muted className="hidden" />

      {/* Main video display area – takes remaining space, but we limit with flex-1 and min-h-0 */}
      <div className="flex-1 min-h-0 relative flex items-center justify-center bg-gray-800">
        {shouldShowRemoteVideo ? (
          <div className="relative w-full h-full">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-contain bg-gray-800"
              onLoadedMetadata={() => console.log('📺 Remote video metadata loaded')}
              onCanPlay={() => console.log('📺 Remote video can play')}
            />
            {/* Overlay info */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${displayInfo.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}>
                  <span className="text-white">{displayInfo.icon}</span>
                </div>
                <span className="text-sm font-semibold">{displayInfo.displayName}</span>
              </div>
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">HD</div>
            </div>
          </div>
        ) : displayInfo.hasOtherParticipant ? (
          <div className="text-center text-gray-300">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${displayInfo.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}>
              <span className="text-3xl">{displayInfo.icon}</span>
            </div>
            <div className="text-lg font-medium mb-2">{displayInfo.displayName}</div>
            <div className="flex items-center justify-center space-x-2 text-yellow-400">
              <FiClock className="animate-spin" />
              <span>Connecting video...</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-300">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse ${displayInfo.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}>
              <span className="text-3xl">{displayInfo.icon}</span>
            </div>
            <div className="text-lg font-medium">Waiting for {displayInfo.displayName}</div>
            <div className="text-sm text-gray-400 mt-2">Share the room link</div>
          </div>
        )}

        {/* Top status bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm ${
            shouldShowRemoteVideo ? 'bg-green-500/90 text-white' : 
            displayInfo.hasOtherParticipant && connectionState === 'connecting' ? 'bg-yellow-500/90' : 'bg-gray-600/90 text-white'
          }`}>
            {shouldShowRemoteVideo ? 'Video Connected' : displayInfo.hasOtherParticipant ? 'Connecting...' : 'Waiting...'}
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs backdrop-blur-sm ${isVideoOff ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'}`}>
              Camera {isVideoOff ? 'Off' : 'On'}
            </div>
            <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
              {participants.length + 1} participant(s)
            </div>
          </div>
        </div>

        {/* Your role indicator (bottom-right) */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className={`px-3 py-1 rounded-full backdrop-blur-sm text-xs ${
            userRole === 'interviewer' ? 'bg-blue-500/90' : 'bg-green-500/90'
          } text-white`}>
            You ({userRole})
          </div>
        </div>
      </div>

      {/* Controls – always visible at the bottom, fixed height */}
      <div className="flex-shrink-0 p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex justify-center gap-6">
          <button
            onClick={toggleMute}
            disabled={!localStream}
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-105 ${
              isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            } text-white disabled:opacity-50`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <FiMicOff size={24} /> : <FiMic size={24} />}
          </button>
          <button
            onClick={toggleVideo}
            disabled={!localStream}
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-105 ${
              isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            } text-white disabled:opacity-50`}
            title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
          >
            {isVideoOff ? <FiVideoOff size={24} /> : <FiVideo size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}