// src/Components/Dashboard.jsx
import React, { useContext, useState } from "react";
import {
  FaBars,
  FaSignOutAlt,
  FaUserFriends,
  FaClock,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";
import { useFirebase } from "../FireBase/FireBaseAuth";
import { auth } from "../FireBase/FireBaseAuth";
import { Link } from "react-router";

// SVG data URI as a fallback avatar (no network request needed)
const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Crect width='36' height='36' rx='18' fill='%23374151'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='16' font-family='sans-serif'%3E?%3C/text%3E%3C/svg%3E";

const Dashboard = () => {
  const { signOut } = useFirebase();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [joinCode, setJoinCode] = useState("");
  const [joinMessage, setJoinMessage] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  // ---- Create room as interviewer ----
  const handleCreateRoom = () => {
    const roomId = Math.floor(100000 + Math.random() * 900000).toString();
    const userId = user?.uid || user?.email || "interviewer-" + Date.now();
    const userName = user?.name || user?.displayName || "Interviewer";
    navigate(`/room/${roomId}?userId=${encodeURIComponent(userId)}&role=interviewer&name=${encodeURIComponent(userName)}`);
  };

  // ---- Join room as candidate ----
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      setJoinMessage({ type: "error", text: "Please enter a room code." });
      return;
    }
    const userId = user?.uid || user?.email || "candidate-" + Date.now();
    const userName = user?.name || user?.displayName || "Candidate";
    navigate(
      `/room/${encodeURIComponent(joinCode.trim())}?userId=${encodeURIComponent(userId)}&role=candidate&name=${encodeURIComponent(userName)}`
    );
    setJoinMessage({
      type: "success",
      text: `Joined room: ${joinCode.trim()}`,
    });
    setJoinCode("");
  };

  // Get the avatar source safely
  const avatarSrc = imgError 
    ? FALLBACK_AVATAR 
    : user?.profilePic || user?.photoURL || FALLBACK_AVATAR;

  // Animation variants
  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "4rem" },
  };
  const contentVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <motion.aside
        initial={sidebarOpen ? "open" : "closed"}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="flex flex-col bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <motion.div
            className="flex items-center gap-3"
            animate={sidebarOpen ? "open" : "closed"}
            variants={contentVariants}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-md">
              M
            </div>
            {sidebarOpen && (
              <span className="font-semibold text-blue-400">InterviewHub</span>
            )}
          </motion.div>
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto my-5">
          <Link to="/dashboard">
            <motion.button
              className={`my-1.5 w-full flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${
                window.location.pathname === "/dashboard"
                  ? "bg-gray-700 text-blue-400"
                  : "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <FaUserFriends
                  className={
                    window.location.pathname === "/dashboard"
                      ? "text-blue-400"
                      : "text-gray-400"
                  }
                />
              </div>
              {sidebarOpen && <span>Interview</span>}
            </motion.button>
          </Link>

          <Link to={"/editor"}>
            <motion.button
              className={`my-1.5 w-full flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${
                window.location.pathname === "/editor"
                  ? "bg-gray-700 text-purple-400"
                  : "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <FaClock
                  className={
                    window.location.pathname === "/editor"
                      ? "text-purple-400"
                      : "text-gray-400"
                  }
                />
              </div>
              {sidebarOpen && <span>Collaborative Code Editor</span>}
            </motion.button>
          </Link>

          <Link to={"/learn"}>
            <motion.button
              className={`my-1.5w-full flex items-center gap-3 p-2 rounded-lg text-sm ${
                window.location.pathname === "/learn"
                  ? "bg-gray-700 text-green-400"
                  : "text-gray-400 hover:bg-gray-700 hover:text-green-400"
              } transition-colors`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              {sidebarOpen && <span>Learn</span>}
            </motion.button>
          </Link>
        </nav>

        <div className="p-3 border-t border-gray-700">
          <motion.button
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 text-sm text-gray-400 hover:text-red-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <FaSignOutAlt />
            </div>
            {sidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.header
          className="flex items-center justify-between bg-gray-800 p-4 border-b border-gray-700"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-xl font-bold text-gray-200">
              Interview Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Host or join a technical interview
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400 hidden md:block">
              Welcome, {user?.name || user?.displayName || "User"}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <img
                src={avatarSrc}
                alt="User avatar"
                className="w-9 h-9 rounded-full border-2 border-blue-800 shadow"
                onError={() => setImgError(true)}
              />
            </motion.div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto bg-gray-900 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Create Room (Interviewer) */}
            <motion.section
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
                    <span className="p-2 bg-blue-900 rounded-lg text-blue-400">
                      <FaUserFriends />
                    </span>
                    Create Room
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Start an interview as the host
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  You will enter a room where you can generate coding problems
                  for the candidate and monitor their live code.
                </p>

                <motion.button
                  onClick={handleCreateRoom}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-600 shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPlay className="text-xs" /> Create Room
                </motion.button>
              </div>
            </motion.section>

            {/* Join Room (Candidate) */}
            <motion.section
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
                    <span className="p-2 bg-green-900 rounded-lg text-green-400">
                      <FaUserFriends />
                    </span>
                    Join Room
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter the room code provided by your interviewer
                  </p>
                </div>
                <motion.div
                  whileHover={{ rotate: 90 }}
                  className="text-gray-500 hover:text-gray-300 cursor-pointer"
                  onClick={() => {
                    setJoinCode("");
                    setJoinMessage(null);
                  }}
                >
                  <FaTimes />
                </motion.div>
              </div>

              <form onSubmit={handleJoinRoom} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Room Code
                  </label>
                  <motion.input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-200"
                    aria-label="Room code"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <motion.button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-600 shadow-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPlay className="text-xs" /> Join Room
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => {
                      setJoinCode("");
                      setJoinMessage(null);
                    }}
                    className="px-4 py-2.5 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <AnimatePresence>
                  {joinMessage && (
                    <motion.div
                      className={`text-sm mt-2 p-3 rounded-lg ${
                        joinMessage.type === "success"
                          ? "bg-green-900 text-green-400 border border-green-800"
                          : "bg-red-900 text-red-400 border border-red-800"
                      }`}
                      role="status"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {joinMessage.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;