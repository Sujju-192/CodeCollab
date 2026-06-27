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

    socket.on('join-room', (roomId, userId, userRole) => {
      try {
        socket.join(roomId);
        socket.roomId = roomId;
        socket.userId = userId;
        socket.userRole = userRole;

        console.log(`[Socket] User ${userId} joining room ${roomId} as ${userRole}`);

        if (!rooms.has(roomId)) {
          rooms.set(roomId, {
            participants: new Map(),
            messages: [],
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
          joinedAt: new Date(),
        });

        socket.to(roomId).emit('user-connected', { userId, userRole });
        socket.emit('existing-messages', room.messages);

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
