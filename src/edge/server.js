import http from "http"
import express from "express"
import io from "socket.io"
import socketIoClient from "socket.io-client"
import { EDGE_PORT, AGGREGATION_PORT } from '../../config.js'
import handleClientEvents from './handleClientEvents'

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



const ioClient = socketIoClient.connect(`http://localhost:${AGGREGATION_PORT}`, {reconnect: true});

ioClient.on('connect', handleClientEvents(ioClient));