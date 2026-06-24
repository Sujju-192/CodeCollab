# 🚀 CodeCollab
### Real-Time Collaborative Code Editor with AI-Powered Assistance

<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![Monaco](https://img.shields.io/badge/Monaco-Editor-007ACC?logo=visualstudiocode&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-Peer--to--Peer-333333?logo=webrtc&logoColor=white)
![Yjs](https://img.shields.io/badge/Yjs-CRDT-FF6C2C)
![Gemini](https://img.shields.io/badge/Gemini-AI-8E75B2)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)

</p>

---

<p align="center">

A modern AI-powered collaborative coding platform that combines **real-time code editing**, **AI coding assistance**, **live collaboration**, **instant execution**, and **interactive learning** into a single workspace.

</p>

---

## 📌 Overview

CodeCollab is designed for developers, students, interviewers, and coding teams who want a seamless collaborative experience without switching between multiple tools.

Instead of opening separate applications for:

- Writing code
- Sharing screens
- Debugging
- Learning concepts
- Running code
- Brainstorming ideas

CodeCollab merges everything into one environment.

Create a room → Share the link → Start collaborating instantly.

---

## ✨ Core Features

### 🔄 Real-Time Collaboration

- Live multiplayer code editing
- Multi-cursor presence
- Shared rooms
- Instant synchronization
- Peer-to-peer collaborative workflow

Powered by:

- Yjs
- WebRTC
- Liveblocks

---

### 🤖 AI Coding Assistant

Generate and improve code using AI:

- Code generation
- Bug fixing
- Debugging
- Optimization
- Explanations
- Smart suggestions
- Context-aware responses

Supported Models:

- GPT-4.1
- Llama 4 Scout
- Google Gemini

---

### ⚡ Instant Code Execution

Execute code without leaving the browser.

Supported languages:

- JavaScript
- Python
- Java
- C++
- C

Execution methods:

- Browser JavaScript sandbox
- Piston API execution

---

### 📚 Interactive Learning Hub

Built-in documentation and learning resources:

- JavaScript
- Python
- Java
- C++
- C

Features:

- Dark theme
- Copy-ready examples
- Syntax highlighting
- Organized navigation

---

### 🎨 AI Whiteboard

Collaborative workspace for:

- Architecture diagrams
- Flowcharts
- Sketches
- Brainstorming

Includes:

- Real-time collaboration
- AI interpretation
- Visual explanations

---

### 🔗 One Click Sharing

- No signup required
- Instant room generation
- Shareable URLs
- Fast joining experience

---

# 📸 Application Preview

## Dashboard

![Dashboard](./screenshots/dashboard.png)

---

## Collaborative Editor

![Editor](./screenshots/editor.png)

---

## Live Collaboration

![Collaboration](./screenshots/collaboration.png)

---

## Documentation Hub

![Documentation](./screenshots/documentation.png)

---

## Whiteboard

![Whiteboard](./screenshots/whiteboard.png)

---

# 🏗 System Architecture

```text
Frontend (React + Vite)
        │
        │
        ├── Monaco Editor
        ├── Yjs Collaboration Layer
        ├── WebRTC
        ├── AI Panel
        ├── Whiteboard
        └── Learning Hub
                │
                ▼
Backend (Node.js + Express)
        │
        ├── WebSocket Signaling
        ├── AI Request Proxy
        └── Collaboration Services
                │
                ▼
External APIs
        │
        ├── GitHub Models
        ├── Google Gemini
        └── Piston API
```

---

### Architecture Notes

**Collaboration Layer**

- Uses Yjs CRDT model
- Peer-to-peer synchronization
- Multi-user cursor awareness

**AI Layer**

Backend securely handles:

- Model requests
- Prompt processing
- Context passing

**Execution Layer**

- JavaScript executes in browser
- Other languages run via Piston API

---

# ⚙️ Tech Stack

| Layer | Technologies |
|---------|-------------|
| Frontend | React, Vite, Monaco Editor, Tailwind CSS, Framer Motion |
| Collaboration | Yjs, WebRTC, Liveblocks |
| Backend | Node.js, Express, WebSocket |
| AI Models | GPT-4.1, Gemini, Llama 4 Scout |
| Execution | Piston API |

---

# 📂 Project Structure

```text
CodeCollab/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── public/
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── websocket/
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation & Local Development

## Prerequisites

Install:

- Node.js (v16 or higher)
- npm or yarn

---

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/CodeCollab.git

cd CodeCollab
```

---

## 2. Backend Setup

Move into backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```bash
server/.env
```

Add:

```env
GITHUB_TOKEN=your_github_token

AI_ENABLED=true

GEMINI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```bash
http://localhost:3000
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```bash
client/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

# ▶️ Running Application

Start backend:

```bash
cd server

npm run dev
```

Open new terminal:

```bash
cd client

npm run dev
```

Open browser:

```bash
http://localhost:5173
```

---

# 📚 Learning Hub

The built-in learning section contains interactive documentation for:

### JavaScript

- ES6+
- Async/Await
- DOM Manipulation
- Events

### Python

- Functions
- OOP
- Libraries

### Java

- Collections
- OOP
- Multithreading

### C++

- STL
- Competitive Programming
- Memory Management

### C

- Fundamentals
- File Handling
- Pointers

---

# 🔮 Future Enhancements

- Authentication and room history
- Voice and video collaboration
- Multi-file support
- AI generated unit tests
- Deployment support
- Community templates
- Project history
- Cloud save functionality

---

<p align="center">

Made with ❤️ for collaborative development

Happy Coding 🚀

</p>
