import { Routes, Route, Navigate } from "react-router";
import Auth from "./Components/Auth/Auth";
import { useContext } from "react";
import UserContext from "./context/UserContext";

import CodeEditor from "./Components/CodeEditor";
import LandingPage from "./Components/LandingPage";
import InterviewDashboard from "./Components/InterviewDashboard";
import Board from "./Components/Board";
import InterviewRoom from "./Components/InterviewRoom";
import Editor from "./Components/Editor";
import Dashboard from "./Components/Dashboard";
import Learn from "./Components/Learn";


function App() {
  const { user, checkingAuth } = useContext(UserContext);

  if (checkingAuth) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg">
        Checking authentication...
      </div>
    );
  }

  return (
    <Routes>

      <Route path="/test/:roomId/:initialPrompt" element={<CodeEditor />} />

      {!user && (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/room/:roomId" element={<InterviewRoom/>} />

          <Route path="/wb" element={<Board/>} />
          <Route path="/code" element={<Auth />} />
          {/* <Route path="/interview/" element={<InterviewRoom/>} /> */}
          <Route path="/editor/" element={<Editor/>} />
          <Route path="/interview" element={<InterviewRoom />} />




        </>
      )}
      {user && (
        <>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room/:roomId" element={<InterviewRoom />} />
          <Route path="/editor/" element={<Editor />} />
          <Route path="/interview-dashboard" element={<InterviewDashboard currentUser={user ? { id: user.uid, email: user.email, name: user.name } : null} />} />
          <Route path="/learn" element={<Learn/>}/>
          
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}

    </Routes>
  );
}

export default App;

