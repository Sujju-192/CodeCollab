# 🚀 CodeCollab - Real-time Collaborative Code Editor with AI Assistance

CodeCollab is a powerful web-based tool that enables developers, interviewers, and teams to collaborate on code in real-time. Featuring live code sharing, AI-powered assistance, chat, whiteboarding, instant execution, and comprehensive documentation, it's your complete coding collaboration solution — no sign-up required.

---

## 📸 CodeCollab Preview

<div align="center">

![Dashboard](https://raw.githubusercontent.com/AdityaGowda23/CodeCollab-AI/main/client/public/Screenshot%202025-08-09%20000318.png)
*Dashboard Interface*

![Code Editor](https://raw.githubusercontent.com/AdityaGowda23/CodeCollab-AI/main/client/public/Screenshot%202025-08-09%20000339.png)
*Real-time Code Editor*

![Learn Documentation](https://github.com/Sujju-192/ProjectPics/blob/main/Screenshot%20(157).png)
*Comprehensive Documentation*

![AI Assistance](https://via.placeholder.com/800x400/1f2937/ffffff?text=AI+Powered+Assistance)
*AI Coding Copilot*

</div>

---

## ✨ Features

### 🧑‍💻 Real-Time Collaboration
- Multiple participants can edit the same file simultaneously.
- See collaborators' cursors and changes in real-time.
- Built using **Monaco Editor**, **Yjs**, and **WebRTC**.

### 🤖 AI Coding Copilot
- Powered by **GitHub Models API** and **Google Gemini**.
- Context-aware suggestions:
  - 📊 Code Analysis & Complexity
  - 🐞 Debugging & Error Fixes
  - 🚀 Performance Optimization
  - ✍️ Auto-Completion & Code Generation
  - 📘 Step-by-Step Explanations

### 📚 Learn Documentation Hub
- **Comprehensive programming guides** for 5 languages:
  - **JavaScript** - Modern ES6+, DOM, Async Programming
  - **Python** - Data Science, Web Development, OOP
  - **Java** - Enterprise Development, Collections, Multithreading
  - **C++** - System Programming, STL, Memory Management
  - **C** - Fundamentals, Pointers, File I/O
- **Interactive code examples** with copy-paste functionality
- **Dark theme** consistent with the entire platform
- **Topic-based navigation** with search functionality

### 🧠 Whiteboard Integration
- Collaborative drawing canvas.
- AI support to interpret and explain diagrams.

### ⚙️ Code Execution Engine
- ✅ JavaScript runs directly in-browser (JS sandbox).
- 🔧 Python, Java, and C++ run via **Piston API**.

### 🔗 Shareable Room Links
- One-click room creation with public URLs.
- Join with a single link — **no account needed**.

---

## 🏗️ Architecture Overview

**Frontend**
- React + Vite
- Monaco Editor
- Framer Motion
- Liveblocks (presence & events)
- React Hot Toast
- Tailwind CSS

**Backend**
- Node.js + Express
- GitHub Models API Proxy
- WebSocket Signaling for WebRTC

**Collaboration Stack**
- Yjs + WebRTC (peer-to-peer code sync)
- Liveblocks for presence & awareness

**AI Services**
- GPT-4.1, DeepSeek-V3-0324, Llama 4 Scout (via GitHub Models API)
- Google Gemini (structured AI insights)

**Execution Engines**
- JavaScript Sandbox (client-side)
- Piston API for Python, Java, and C++

**Documentation System**
- React-based interactive learning platform
- Multi-language support with syntax highlighting
- Responsive sidebar navigation

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/AdityaGowda23/CodeCollab-AI.git
cd CodeCollab-AI

# Server
cd server
npm install

# Client
cd ../client
npm install


# server/.env
GITHUB_TOKEN=ghp_your_github_token
AI_ENABLED=true

# client/.env
VITE_API_BASE_URL=http://localhost:3000


# Start backend
cd server
npm run dev

# Start frontend (in a separate terminal)
cd ../client
npm run dev
