# 🚀 CodeCollab-**Real-time Collaborative Code Editor with AI Assistance**

CodeCollab is a powerful web-based tool that enables developers, interviewers, and teams to collaborate on code in real-time. Featuring live code sharing, AI-powered assistance, chat, whiteboarding, and instant execution, it's your complete coding collaboration solution — no sign-up required.

---

## 📸 CodeCollab Preview

<img src="https://raw.githubusercontent.com/AdityaGowda23/CodeCollab-AI/main/client/public/Screenshot%202025-08-09%20000318.png" width="45%" style="margin-right: 10px;" />
<img src="https://raw.githubusercontent.com/AdityaGowda23/CodeCollab-AI/main/client/public/Screenshot%202025-08-09%20000339.png" width="45%" />

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

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/AdityaGowda23/CodeCollab-AI.git
cd CodeCollab-AI
````

### Install Dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### Configure Environment Variables

```env
# server/.env
GITHUB_TOKEN=ghp_your_github_token
AI_ENABLED=true

# client/.env
VITE_API_BASE_URL=http://localhost:3000
```

### Run the Application

```bash
# Start backend
cd server
npm run dev

# Start frontend (in a separate terminal)
cd ../client
npm run dev
```

Open your browser at: [http://localhost:5173](http://localhost:5173) 🎉

---

## 💡 Usage Guide

1. **Create or Join Room**

   * Click on **“Create New Room”** or enter a room ID to join.

2. **Collaborate in Real-Time**

   * Edit code, chat, and whiteboard with your team.

3. **Invoke AI Copilot**

   * Click the floating 🤖 **AI** button.
   * Choose from: Analyze | Debug | Optimize | Complete | Explain

4. **Share Room**

   * Click **“Share”** to copy the room URL and invite others.

---

## 🤝 Contributing

We welcome contributions!

```bash
# Steps to contribute:
1. Fork the repository
2. Create your feature branch:
   git checkout -b feature/awesome-feature
3. Commit your changes:
   git commit -m 'Add awesome feature'
4. Push to the branch:
   git push origin feature/awesome-feature
5. Open a Pull Request
```

Please follow our **Code of Conduct** and ensure all tests pass.

---

## 🧾 License

This project is licensed under the **MIT License**.
See [LICENSE](LICENSE) for more information.

---

## 📬 Contact

If you have any questions, ideas, or feedback, feel free to open an issue or reach out to the maintainer.

---

> Built with ❤️ for developers, by developers.

```

---

### 📌 Notes:
- These images are now **left-aligned** and not centered.
- Markdown doesn't support `style="margin"` or `float:left;` reliably across GitHub, so this is as close as possible.
- If you want them stacked vertically, just reduce the `width` or remove one image per line.

Let me know if you want a vertically stacked layout or a layout with captions under each screenshot!
```
