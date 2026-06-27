// server/socket.js (or wherever this file lives)
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const rooms = new Map();

export function setupSocketIO(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] User connected: ${socket.id}`);

    // Modified to accept optional userName (4th param)
    socket.on('join-room', (roomId, userId, userRole, userName) => {
      try {
        socket.join(roomId);
        socket.roomId = roomId;
        socket.userId = userId;
        socket.userRole = userRole;
        socket.userName = userName || 'Unknown';

        console.log(`[Socket] User ${userId} (${userName}) joining room ${roomId} as ${userRole}`);

        if (!rooms.has(roomId)) {
          rooms.set(roomId, {
            participants: new Map(),
            messages: [],
            currentProblem: null,        // <-- store latest problem
            createdAt: new Date(),
            lastActivity: new Date(),
          });
          console.log(`[Socket] Created new room: ${roomId}`);
        }

        const room = rooms.get(roomId);
        room.lastActivity = new Date();
        room.participants.set(userId, {
          socketId: socket.id,
          userRole,
          userName: userName || 'Unknown',
          joinedAt: new Date(),
        });

        // Notify others
        socket.to(roomId).emit('user-connected', { userId, userRole, userName });

        // Send existing messages AND current problem (if any) to the joiner
        socket.emit('existing-messages', room.messages);

        if (room.currentProblem) {
          console.log(`[Socket] Sending current problem to late joiner ${userId}`);
          socket.emit('problem-generated', room.currentProblem);
        }

        console.log(`[Socket] Room ${roomId} now has ${room.participants.size} participants`);
      } catch (error) {
        console.error('[Socket] Error in join-room:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    socket.on('get-participants', (callback) => {
      try {
        const room = rooms.get(socket.roomId);
        if (room) {
          const participants = Array.from(room.participants.entries()).map(([userId, data]) => ({
            userId,
            userRole: data.userRole,
            socketId: data.socketId,
            joinedAt: data.joinedAt,
            userName: data.userName,
          }));
          console.log(`[Socket] Sending ${participants.length} participants for room ${socket.roomId}`);
          callback({ success: true, participants });
        } else {
          callback({ success: false, error: 'Room not found' });
        }
      } catch (error) {
        console.error('[Socket] Get participants error:', error);
        callback({ success: false, error: 'Failed to get participants' });
      }
    });

    socket.on('send-message', (messageText) => {
      try {
        const room = rooms.get(socket.roomId);
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        const newMessage = {
          id: uuidv4(),
          userId: socket.userId,
          userRole: socket.userRole,
          text: messageText,
          timestamp: new Date().toISOString(),
        };

        room.messages.push(newMessage);
        room.lastActivity = new Date();

        if (room.messages.length > 100) {
          room.messages = room.messages.slice(-100);
        }

        io.to(socket.roomId).emit('receive-message', newMessage);
        console.log(`[Socket] Message in room ${socket.roomId} from ${socket.userId}`);
      } catch (error) {
        console.error('[Socket] Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // ---------- NEW: problem-generated handler ----------
    socket.on('problem-generated', (problemData) => {
      try {
        const roomId = socket.roomId;
        if (!roomId) return;

        console.log(`[Socket] Problem generated in room ${roomId} by ${socket.userId}`);
        const room = rooms.get(roomId);
        if (room) {
          // Store the problem for late joiners
          room.currentProblem = problemData;
          room.lastActivity = new Date();
        }

        // Broadcast to everyone ELSE in the room (including the candidate)
        socket.to(roomId).emit('problem-generated', problemData);

        // Also emit back to the interviewer so they know it's stored? Not needed.
      } catch (error) {
        console.error('[Socket] Problem generation error:', error);
      }
    });

    // ---------- NEW: code-update handler ----------
    socket.on('code-update', (data) => {
      try {
        const roomId = socket.roomId;
        if (!roomId) return;

        // Accept both { code } object and raw string
        const code = data?.code || data;
        console.log(`[Socket] Code update in room ${roomId} from ${socket.userId}: ${typeof code === 'string' ? code.substring(0, 30) + '...' : 'non-string'}`);

        // Broadcast to everyone else in the room
        socket.to(roomId).emit('code-update', { code });
      } catch (error) {
        console.error('[Socket] Code update error:', error);
      }
    });

    // ---------- WebRTC signaling (unchanged) ----------
    socket.on('offer', ({ offer, targetUserId }) => {
      try {
        const room = rooms.get(socket.roomId);
        if (!room) return;

        const targetParticipant = room.participants.get(targetUserId);
        if (targetParticipant) {
          console.log(`[Socket] Forwarding offer from ${socket.userId} to ${targetUserId}`);
          io.to(targetParticipant.socketId).emit('offer', { offer, senderId: socket.userId });
          room.lastActivity = new Date();
        } else {
          socket.emit('error', { message: 'Target user not found' });
        }
      } catch (error) {
        console.error('[Socket] Offer forwarding error:', error);
      }
    });

    socket.on('answer', ({ answer, targetUserId }) => {
      try {
        const room = rooms.get(socket.roomId);
        if (!room) return;

        const targetParticipant = room.participants.get(targetUserId);
        if (targetParticipant) {
          console.log(`[Socket] Forwarding answer from ${socket.userId} to ${targetUserId}`);
          io.to(targetParticipant.socketId).emit('answer', { answer, senderId: socket.userId });
          room.lastActivity = new Date();
        } else {
          socket.emit('error', { message: 'Target user not found' });
        }
      } catch (error) {
        console.error('[Socket] Answer forwarding error:', error);
      }
    });

    socket.on('ice-candidate', ({ candidate, targetUserId }) => {
      try {
        const room = rooms.get(socket.roomId);
        if (!room) return;

        const targetParticipant = room.participants.get(targetUserId);
        if (targetParticipant) {
          io.to(targetParticipant.socketId).emit('ice-candidate', { candidate, senderId: socket.userId });
          room.lastActivity = new Date();
        }
      } catch (error) {
        console.error('[Socket] ICE candidate forwarding error:', error);
      }
    });

    // ---------- Disconnect (unchanged) ----------
    socket.on('disconnect', (reason) => {
      const { roomId, userId } = socket;
      console.log(`[Socket] User disconnected: ${socket.id} (${userId}) - ${reason}`);

      if (roomId && rooms.has(roomId)) {
        const room = rooms.get(roomId);
        room.participants.delete(userId);
        room.lastActivity = new Date();
        socket.to(roomId).emit('user-disconnected', userId);

        if (room.participants.size === 0) {
          setTimeout(() => {
            const currentRoom = rooms.get(roomId);
            if (currentRoom && currentRoom.participants.size === 0) {
              rooms.delete(roomId);
              console.log(`[Socket] Cleaned up empty room: ${roomId}`);
            }
          }, 30000);
        }
      }
    });

    socket.on('ping', (callback) => {
      if (typeof callback === 'function') callback('pong');
    });
  });

  // Periodic cleanup of inactive rooms (unchanged)
  setInterval(() => {
    const now = new Date();
    let cleanedRooms = 0;
    for (const [roomId, room] of rooms.entries()) {
      if (now - room.lastActivity > 60 * 60 * 1000) {
        rooms.delete(roomId);
        cleanedRooms++;
      }
    }
    if (cleanedRooms > 0) {
      console.log(`[Socket] Cleaned up ${cleanedRooms} inactive rooms`);
    }
  }, 10 * 60 * 1000);

  return io;
}