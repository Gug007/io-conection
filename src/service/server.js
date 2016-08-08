import http from "http"
import express from "express"
import io from "socket.io"
import { SERVICE_PORT } from '../../config.js'

const app = express();
const server = http.Server(app);
const ioServer = io(server);

server.listen(SERVICE_PORT);

ioServer.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log("<<", data);
  });
  // Disconnect listener
  socket.on('disconnect', () => console.log('service: client disconnected'))
}); 