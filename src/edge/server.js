import http from "http"
import express from "express"
import io from "socket.io"
import socketIoClient from "socket.io-client"
import { EDGE_PORT, AGGREGATION_PORT } from '../../config.js'
  
const app = express();
const server = http.Server(app);
const ioServer = io(server);

server.listen(EDGE_PORT);

ioServer.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log("<<", data);
  });
  // Disconnect listener
  socket.on('disconnect', () => console.log('edge: client disconnected'))
});

const getRandom = (min, max) =>  Math.floor(Math.random() * (max - min + 1)) + min;

function send() {
  const random = getRandom(10, 200)
  setTimeout(() => {
    ioClient.emit('message', { data: random });
    if(ioClient.connected) {
      send()
      console.log('edge >>', random );
    }
  }, random)
}

const ioClient = socketIoClient.connect(`http://localhost:${AGGREGATION_PORT}`, {reconnect: true});

ioClient.on('connect', () => {
  send()
  console.log('Connected!');
});