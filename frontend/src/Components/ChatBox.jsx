// src/Components/ChatBox.jsx
import { useState, useEffect, useRef } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';

export default function ChatBox({ socket, roomId, userId, userRole }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => setMessages((prev) => [...prev, message]);
    const handleExistingMessages = (existing) => setMessages(existing);
    const handleUserConnected = ({ userId: id, userRole: role }) => {
      setParticipants(prev => [...prev.filter(p => p.userId !== id), { userId: id, userRole: role }]);
    };
    const handleUserDisconnected = (id) => setParticipants(prev => prev.filter(p => p.userId !== id));

    socket.on('receive-message', handleReceiveMessage);
    socket.on('existing-messages', handleExistingMessages);
    socket.on('user-connected', handleUserConnected);
    socket.on('user-disconnected', handleUserDisconnected);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
      socket.off('existing-messages', handleExistingMessages);
      socket.off('user-connected', handleUserConnected);
      socket.off('user-disconnected', handleUserDisconnected);
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit('send-message', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getRoleColor = (role) => (role === 'interviewer' ? 'bg-blue-600' : 'bg-green-600');
  const getRoleIcon = (role) => (role === 'interviewer' ? '👨‍💼' : '👨‍💻');
  const isOwn = (msgUserId) => msgUserId === userId;

  return (
    <div className="flex flex-col h-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden text-gray-200">
      {/* Header */}
      <div className="p-3 bg-gray-750 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-300">Chat</h3>
          <span className="text-xs text-gray-500">{participants.length + 1} participants</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiUser className="w-6 h-6 text-gray-400" />
              </div>
              <p>No messages yet.</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${isOwn(msg.userId) ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md ${isOwn(msg.userId) ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-2xl px-4 py-2 ${
                    isOwn(msg.userId)
                      ? msg.userRole === 'interviewer'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-green-600 text-white rounded-br-md'
                      : 'bg-gray-700 text-gray-200 rounded-bl-md'
                  }`}>
                    <div className="whitespace-pre-wrap break-words text-sm">{msg.text}</div>
                  </div>
                  <div className={`mt-1 flex items-center space-x-2 text-xs text-gray-500 ${isOwn(msg.userId) ? 'justify-end' : 'justify-start'}`}>
                    <span>{getRoleIcon(msg.userRole)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(msg.userRole)} text-white`}>
                      {msg.userRole}
                    </span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isOwn(msg.userId) && <span>✓</span>}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700 bg-gray-750">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message as ${userRole}...`}
            className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-md transition-colors ${
              newMessage.trim()
                ? userRole === 'interviewer'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}