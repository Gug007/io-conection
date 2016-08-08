import http from "http"
import express from "express"
import io from "socket.io"
import socketIoClient from "socket.io-client"
import { AGGREGATION_PORT, SERVICE_PORT } from '../../config.js'

const app = express();
const server = http.Server(app);
const ioServer = io(server);

server.listen(AGGREGATION_PORT);

ioServer.on('connection', (socket) => {
  socket.on('message', (data) => {
    if(ioClient.connected) {
      console.log("<<", data);
      ioClient.emit('message', { data });
    } else {
      console.log("disconnected", data);
    }
  });
  
  // Disconnect listener
  socket.on('disconnect', () => console.log('aggregation: client disconnected'))
});

const ioClient = socketIoClient.connect(`http://localhost:${SERVICE_PORT}`, {reconnect: true});
ioClient.on('connect', () => {
  console.log('Connected!');
});