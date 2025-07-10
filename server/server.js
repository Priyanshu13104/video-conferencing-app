import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import http from 'http';
import { setupSocketServer } from './socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

setupSocketServer(server);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb Connected.");
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
