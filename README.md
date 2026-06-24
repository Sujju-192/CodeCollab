````md
# 🚀 CodeCollab
### Real-Time Collaborative Code Editor with AI-Powered Assistance

<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![Monaco](https://img.shields.io/badge/Monaco-Editor-007ACC?logo=visualstudiocode&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-Peer--to--Peer-333333?logo=webrtc&logoColor=white)
![Yjs](https://img.shields.io/badge/Yjs-CRDT-FF6C2C)
![Gemini](https://img.shields.io/badge/Gemini-AI-8E75B2)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)

</p>

---

## 📌 Overview

CodeCollab is an AI-powered real-time collaborative coding platform designed for developers, coding teams, interview sessions, and learning environments.

Instead of switching between multiple tools for coding, debugging, documentation, execution, and collaboration, CodeCollab combines everything into one seamless workspace.

Users can create a room, share a link, and instantly collaborate with others while receiving AI-powered assistance directly inside the editor.

---

## ✨ Features

### 🔄 Real-Time Collaboration

- Live multiplayer editing
- Multi-user cursor presence
- Instant synchronization
- Peer-to-peer collaborative workflow
- Shared rooms with unique links

---

### 🤖 AI Coding Assistant

Generate and improve code using AI:

- Code generation
- Debugging
- Optimization
- Explanation of code
- Context-aware suggestions
- Auto-completion support

Supports:

- GPT-4.1
- DeepSeek-V3
- Llama 4 Scout
- Gemini AI

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

- Browser sandbox execution
- Piston API integration

---

### 📚 Interactive Learning Hub

Built-in documentation and guides:

- JavaScript
- Python
- Java
- C++
- C

Features:

- Copy-ready examples
- Syntax highlighting
- Dark mode support
- Organized navigation

---

### 🎨 AI Whiteboard

Collaborative whiteboard for:

- Architecture diagrams
- Flowcharts
- Sketches
- Problem explanations

Includes AI-based interpretation and explanations.

---

### 🔗 One Click Sharing

- No signup required
- Room-based collaboration
- Share links instantly
- Quick join experience

---

## 📷 Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

---

### Code Editor

![Editor](./screenshots/editor.png)

---

### Real-Time Collaboration

![Collaboration](./screenshots/collaboration.png)

---

### Documentation Hub

![Documentation](./screenshots/documentation.png)

---

### Whiteboard

![Whiteboard](./screenshots/whiteboard.png)

---

## 🏗 System Architecture

```text
Frontend (React + Vite)
   │
   ├── Monaco Editor
   ├── Yjs Collaboration Layer
   ├── WebRTC
   ├── AI Panel
   └── Whiteboard
         │
         ▼
Backend (Node.js + Express)
   │
   ├── WebSocket Signaling
   ├── AI API Proxy
   └── Collaboration Services
         │
         ▼
External Services
   │
   ├── GitHub Models API
   ├── Google Gemini
   └── Piston API
```

---

## ⚙️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Monaco Editor
- Framer Motion
- React Hot Toast

### Collaboration Layer

- Yjs
- WebRTC
- Liveblocks

### Backend

- Node.js
- Express
- WebSocket
- dotenv

### AI Services

- GitHub Models API
- Gemini AI

### Code Execution

- Piston API
- Browser Sandbox Execution

---

## 📂 Project Structure

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

# 🚀 Installation Guide

## Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/CodeCollab.git

cd CodeCollab
```

---

## Step 2: Backend Setup

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

Backend runs on:

```bash
http://localhost:3000
```

---

## Step 3: Frontend Setup

Open new terminal:

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

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## ▶️ Running Application

Start backend:

```bash
cd server

npm run dev
```

Start frontend:

```bash
cd client

npm run dev
```

Open browser:

```bash
http://localhost:5173
```

---

## 📚 Learn Hub

The built-in learning section provides documentation and tutorials for:

### JavaScript

- ES6+
- Async/Await
- DOM Manipulation

### Python

- OOP
- Functions
- Libraries

### Java

- Collections
- OOP
- Multithreading

### C++

- STL
- Memory Management
- Competitive Programming

### C

- Fundamentals
- Pointers
- File Handling

---

## 🔮 Future Enhancements

- User authentication
- Room history
- Voice and video communication
- Multi-file support
- AI-generated unit testing
- Community templates
- One-click deployment
- Project history

---

## 👨‍💻 Author

Aditya Gowda

GitHub:

https://github.com/yourusername

LinkedIn:

https://linkedin.com/in/yourprofile

---

## ⭐ Support

If you liked this project:

⭐ Star the repository

🍴 Fork the project

🛠 Contribute improvements

🐛 Report bugs

Happy Coding 🚀
````
