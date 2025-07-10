// socket.js
import { Server } from 'socket.io';

export const setupSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // For development; restrict in production
    },
  });

  const roomToUsers = {};

  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    socket.on('join-room', ({ roomId }) => {
      socket.join(roomId);
      console.log(`➡️ ${socket.id} joined room: ${roomId}`);

      const usersInRoom = roomToUsers[roomId] || [];

      if (usersInRoom.length > 0) {
        const existingUserId = usersInRoom[0];

        // Existing user becomes initiator
        io.to(existingUserId).emit('user-joined', socket.id);

        // New user waits for signal
        socket.emit('new-user', existingUserId);
      }

      roomToUsers[roomId] = [...usersInRoom, socket.id];

      socket.on('disconnect', () => {
        roomToUsers[roomId] = roomToUsers[roomId]?.filter(id => id !== socket.id);
        socket.to(roomId).emit('user-disconnected', socket.id);
        console.log(`❌ User ${socket.id} disconnected from room ${roomId}`);
      });
    });
  });
};
