// src/Components/InterviewRoom.jsx
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import useSocket from "../hooks/useSocket";
import { SOCKET_URL } from "../config/api.js";
import useWebRTC from "../hooks/useWebRTC";
import ChatBox from "./ChatBox";
import VideoChat from "./VideoChat";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import AgenticAIPanel from "./AI/AgenticAIPanel";
import { Toaster } from "react-hot-toast";
import InterviewerPanel from "./InterviewerPanel";
import CandidateWorkspace from "./CandidateWorkspace";
import LiveCodeView from "./LiveCodeView";

export default function InterviewRoom() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  
  // FIXED: Get userId and userRole properly from URL params
  const userId = searchParams.get("userId");
  const userRole = searchParams.get("role");
  const userName = searchParams.get("name") || "User";

  const socket = useSocket(SOCKET_URL);

  const [participants, setParticipants] = useState([]);
  const [otherUserId, setOtherUserId] = useState(null);
  const [allParticipants, setAllParticipants] = useState(new Map());

  // State for the generated problem (shared via socket)
  const [problem, setProblem] = useState(null);
  // State for candidate code monitoring (received via socket)
  const [candidateCode, setCandidateCode] = useState("");

  // AI panel visibility
  const [showAIPanel, setShowAIPanel] = useState(false);

  console.log("🚀 InterviewRoom initialized:", {
    userId,
    userRole,
    userName,
    roomId,
  });

  // ----- Socket event handling (connection, participants) -----
  useEffect(() => {
    if (!socket || !userId || !userRole) return;

    socket.on("connect", () => {
      console.log("🔌 Connected to server, joining room as:", {
        roomId,
        userId,
        userRole,
        userName,
      });
      // FIXED: Join room with proper user data
      socket.emit("join-room", roomId, userId, userRole, userName);
    });

    socket.on(
      "user-connected",
      ({ userId: newUserId, userRole: newUserRole }) => {
        console.log("👤 User connected:", newUserId, newUserRole);
        setParticipants((prev) => {
          const filtered = prev.filter((p) => p.userId !== newUserId);
          const updated = [
            ...filtered,
            { userId: newUserId, userRole: newUserRole },
          ];
          console.log("👥 Updated participants:", updated);
          return updated;
        });
        setAllParticipants((prev) => {
          const updated = new Map(prev);
          updated.set(newUserId, {
            userId: newUserId,
            userRole: newUserRole,
          });
          return updated;
        });
        // FIXED: Set remote user for WebRTC when someone joins
        if (newUserId !== userId && !otherUserId) {
          console.log("🎯 Setting remote user:", newUserId);
          setOtherUserId(newUserId);
        }
      }
    );

    socket.on("user-disconnected", (disconnectedUserId) => {
      console.log("👋 User disconnected:", disconnectedUserId);
      setParticipants((prev) =>
        prev.filter((p) => p.userId !== disconnectedUserId)
      );
      setAllParticipants((prev) => {
        const updated = new Map(prev);
        updated.delete(disconnectedUserId);
        return updated;
      });
      if (disconnectedUserId === otherUserId) {
        setOtherUserId(null);
      }
    });

    socket.on("existing-messages", () => {
      // Request current participants when we join
      socket.emit("get-participants", (response) => {
        if (response.success) {
          const existingParticipants = response.participants.filter(
            (p) => p.userId !== userId
          );
          setParticipants(existingParticipants);
          console.log("👥 Existing participants:", existingParticipants);
          if (existingParticipants.length === 1) {
            const otherUser = existingParticipants[0];
            console.log("🎯 Setting remote user from existing:", otherUser.userId);
            setOtherUserId(otherUser.userId);
          }
        }
      });
    });

    // ----- Problem generation event -----
    socket.on("problem-generated", (newProblem) => {
      console.log("📝 Problem received via socket:", newProblem);
      setProblem(newProblem);
    });

    // ----- Candidate code update event -----
    socket.on("code-update", ({ code }) => {
      console.log("⌨️ Candidate code update received, length:", code?.length);
      setCandidateCode(code);
    });

    return () => {
      socket.off("connect");
      socket.off("user-connected");
      socket.off("user-disconnected");
      socket.off("existing-messages");
      socket.off("problem-generated");
      socket.off("code-update");
    };
  }, [socket, roomId, userId, userRole, userName, otherUserId]);

  // ----- WebRTC connection -----
  const {
    localStream,
    remoteStream,
    isCallActive,
    connectionState,
    isConnected,
  } = useWebRTC(socket, roomId, userId, otherUserId);

  // ----- Debug logging -----
  useEffect(() => {
    console.log("🔍 Debug Info:", {
      userId,
      userRole,
      otherUserId,
      participants: participants.length,
      hasLocalStream: !!localStream,
      hasRemoteStream: !!remoteStream,
      isCallActive,
      connectionState,
      isConnected,
      hasProblem: !!problem,
    });
  }, [
    userId,
    userRole,
    otherUserId,
    participants,
    localStream,
    remoteStream,
    isCallActive,
    connectionState,
    isConnected,
    problem,
  ]);

  if (!userId || !userRole) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Invalid Room Access</h2>
          <p className="text-gray-600">
            Missing userId or role. Please return to the dashboard and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Interview Room
            </h1>
            <p className="text-sm text-gray-600">
              Room: {roomId} • Role:{" "}
              <span className="capitalize font-medium">{userRole}</span>
              {otherUserId && (
                <span className="ml-2 text-green-600">
                  • Remote connected: {otherUserId}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Participants: {participants.length + 1}</span>
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  socket?.connected ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span>
                {socket?.connected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content – Role-based layout */}
      <div className="flex-1 flex overflow-hidden">
        {userRole === "interviewer" ? (
          // ======= INTERVIEWER LAYOUT =======
          <div className="flex w-full h-full">
            {/* Left: Video area (large, fills most space) */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
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
            </div>

            {/* Right sidebar: Chat + Interviewer prompt + Candidate code */}
            <div className="w-[400px] border-l border-gray-200 flex flex-col">
              {/* Chat */}
              <div className="h-[40%] border-b border-gray-200">
                <ChatBox
                  socket={socket}
                  roomId={roomId}
                  userId={userId}
                  userRole={userRole}
                />
              </div>
              {/* Interviewer Prompt Panel */}
              <div className="h-[30%] border-b border-gray-200 bg-white p-3">
                <InterviewerPanel
                  socket={socket}
                  roomId={roomId}
                  currentProblem={problem}
                />
              </div>
              {/* Candidate's Live Code */}
              <div className="h-[30%] bg-white p-3">
                <LiveCodeView code={candidateCode} />
              </div>
            </div>
          </div>
        ) : (
          // ======= CANDIDATE LAYOUT =======
          <div className="flex w-full h-full">
            {/* Left: Problem + Code editor */}
            <div className="flex-1 overflow-hidden">
              <CandidateWorkspace
                problem={problem}
                socket={socket}
                roomId={roomId}
                userRole={userRole}
                userId={userId}
              />
            </div>

            {/* Right sidebar: Video + Chat */}
            <div className="w-[400px] border-l border-gray-200 flex flex-col">
              <div className="h-[40%] border-b border-gray-200">
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
              <div className="h-[60%]">
                <ChatBox
                  socket={socket}
                  roomId={roomId}
                  userId={userId}
                  userRole={userRole}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating AI assistant button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAIPanel(true)}
        className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg"
        title="Smart Coding Assistant"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* AI Panel Modal */}
      <AgenticAIPanel
        isOpen={showAIPanel}
        onClose={() => setShowAIPanel(false)}
        currentCode={userRole === "candidate" ? candidateCode : ""}
        currentLanguage="javascript"
        problemStatement={problem?.description || ""}
        socket={socket}
        roomId={roomId}
        username={userId}
        userRole={userRole}
      />
    </div>
  );
}