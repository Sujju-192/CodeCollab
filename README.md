```markdown
# 🚀 CodeCollab
### Real-Time Collaborative Code Editor with AI-Powered Assistance

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Monaco-Editor-007ACC?logo=visualstudiocode&logoColor=white" alt="Monaco" />
  <img src="https://img.shields.io/badge/WebRTC-Peer--to--Peer-333333?logo=webrtc&logoColor=white" alt="WebRTC" />
  <img src="https://img.shields.io/badge/Yjs-CRDT-FF6C2C?logo=yjs&logoColor=white" alt="Yjs" />
  <img src="https://img.shields.io/badge/Gemini-AI-8E75B2?logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/GitHub_Models-API-181717?logo=github&logoColor=white" alt="GitHub Models" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Liveblocks-Collab-000000?logo=liveblocks&logoColor=white" alt="Liveblocks" />
</p>

---

## 📌 Overview

CodeCollab is an all-in-one web-based collaboration platform for developers, interviewers, and coding teams. It combines **real-time code editing**, **AI-powered coding assistance**, **interactive documentation**, **whiteboarding**, and **instant code execution** – no sign-up required. Just create a room, share the link, and start building together.

### 🌟 Why CodeCollab?

- 🔄 **Live Multiplayer Editing** – See everyone’s changes and cursors in real-time
- 🤖 **AI Copilot Inside Your Editor** – Debug, optimise, and generate code with context-aware AI
- ⚡ **Instant Code Execution** – Run JavaScript, Python, Java, and C++ without leaving the browser
- 📚 **Built-in Learning Hub** – Interactive programming guides for 5 major languages
- 🎨 **Whiteboard + AI** – Sketch ideas and let AI explain them
- 🔗 **One-Click Rooms** – Create a shareable link, no accounts needed
- 🛡️ **Privacy First** – Peer-to-peer WebRTC sync; no server stores your code

---

## 📸 CodeCollab Preview

<div align="center">

![Dashboard](https://raw.githubusercontent.com/AdityaGowda23/CodeCollab-AI/main/client/public/Screenshot%202025-08-09%20000318.png)
*Dashboard Interface*

![Code Editor](https://raw.githubusercontent.com/AdityaGowda23/CodeCollab-AI/main/client/public/Screenshot%202025-08-09%20000339.png)
*Feature-Rich Code Editor*

![Real-time Editor](https://github.com/Sujju-192/ProjectPics/blob/main/image.png?raw=true)
*Real-time Collaboration & Cursors*

![Learn Documentation](https://github.com/Sujju-192/ProjectPics/blob/main/Screenshot%20(157).png)
*Interactive Documentation Hub – JavaScript, Python, Java, C++, C*

</div>

---

## ✨ Core Features

| Category | Feature | Details |
|----------|---------|---------|
| 🧑‍💻 **Real-Time Collaboration** | Multi-cursor editing, peer-to-peer sync, presence awareness | Powered by Yjs + WebRTC, with Liveblocks for room state |
| 🤖 **AI Copilot** | Code analysis, debugging, optimisation, auto-completion, explanations | Supports GPT-4.1, DeepSeek-V3-0324, Llama 4 Scout (GitHub Models), and Gemini |
| 📚 **Learn Hub** | Interactive programming guides for 5 languages | JavaScript, Python, Java, C++, C with copy-paste code examples and dark theme |
| 🧠 **Whiteboard** | Collaborative drawing canvas with AI diagram interpretation | Draw flows, architectures, and get AI-generated explanations |
| ⚙️ **Code Execution** | Run code instantly in-browser or via Piston API | JavaScript (client-side), Python/Java/C++ (Piston API) |
| 🔗 **Shareable Rooms** | One-click room creation with public URL | No sign-up; just share the link to invite collaborators |
| 🎨 **Modern UI** | Smooth animations, dark theme, toast notifications | Built with Framer Motion, React Hot Toast, Tailwind CSS |

---

## 🏗️ System Architecture

```text
Frontend (React + Vite)
   │
   ├── Monaco Editor (Code)
   ├── Yjs + WebRTC (Peer-to-Peer sync)
   ├── Liveblocks (Presence & Room events)
   └── AI Panel / Whiteboard / Execution
         │
         ▼
Backend (Node.js + Express)
   ├── WebSocket Signaling for WebRTC
   └── GitHub Models API Proxy (AI)
         │
         ▼
External APIs
   ├── GitHub Models (GPT-4.1, DeepSeek, Llama)
   ├── Google Gemini (Structured insights)
   └── Piston API (Code execution)
```

- **Peer-to-Peer Collaboration**: Yjs CRDT ensures all changes are instantly synchronised without a central server storing your code.  
- **AI Services**: The backend securely proxies requests to GitHub Models and Gemini, keeping your API keys safe.  
- **Execution**: JavaScript runs directly in the browser’s sandbox; Python/Java/C++ are executed via Piston API.

---

## ⚙️ Installation & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/AdityaGowda23/CodeCollab-AI.git
cd CodeCollab-AI
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
GITHUB_TOKEN=ghp_your_github_token
AI_ENABLED=true
```

Start the server:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../client
npm install
```

Create a `.env` file inside `client/`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

Start the frontend:
```bash
npm run dev
```

Your full-stack CodeCollab is now running on `http://localhost:5173`!

---

## 🧰 Tech Stack

### Frontend
- React + Vite
- Monaco Editor
- Tailwind CSS
- Framer Motion
- React Hot Toast
- Liveblocks (presence & events)

### Collaboration Layer
- Yjs (CRDT)
- WebRTC (peer-to-peer data channel)
- Liveblocks (room management)

### Backend
- Node.js + Express
- WebSocket (ws)
- GitHub Models API (proxy)
- dotenv

### AI Models
- GitHub Models: GPT-4.1, DeepSeek-V3-0324, Llama 4 Scout
- Google Gemini

### Execution Engine
- In-browser JavaScript sandbox
- Piston API (Python, Java, C++)

### Documentation System
- React-based interactive learning platform
- Multi-language syntax highlighting
- Responsive sidebar navigation

---

## 📚 Learn Documentation Hub

The built-in **Learn** section offers comprehensive, interactive guides for:

- **JavaScript** – ES6+, DOM manipulation, async/await
- **Python** – Data science, web frameworks, OOP concepts
- **Java** – Enterprise patterns, collections, multithreading
- **C++** – STL, memory management, system programming
- **C** – Pointers, file I/O, fundamentals

All examples are copy-paste ready and follow the platform’s dark theme.

---

## 🔮 Future Enhancements

- 🔐 Optional user accounts & room history
- 🎥 Integrated video/voice chat
- 📁 File tree & multi-file support
- 🧪 AI unit test generation
- 🚀 One-click deployment of frontend projects
- 🌍 Community templates & snippet library

---

## 👨‍💻 Author

Project by **Aditya Gowda**  
(Add your GitHub/LinkedIn links here)

---

## ⭐ Support the Project

If you find CodeCollab useful:

- ⭐ **Star** the repository
- 🍴 **Fork** it and build your own features
- 🐛 **Report bugs** or suggest enhancements
- 🛠️ **Contribute** – pull requests welcome!

Happy collaborating! 🚀
```
