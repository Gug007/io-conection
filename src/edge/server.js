import http from "http"
import express from "express"
import io from "socket.io"
import socketIoClient from "socket.io-client"
import { EDGE_PORT, AGGREGATION_PORT } from '../../config.js'
import getFiles from '../utils/getFiles'

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

ioClient.on('connect', () => {
  console.log('Connected!');
  send()
});

// const getRandom = (min, max) =>  Math.floor(Math.random() * (max - min + 1)) + min;

const list = getFiles('public/scene').reduce((arr, val) => {
  return arr.concat(val.data)
}, [])

function send(t=0, i=0) {
  // const random = getRandom(10, 200)
  setTimeout(() => {
    if(ioClient.connected) {
      ioClient.emit('message', { data: list[i] });
      send(t, ++i >= list.length-1 ? 0 : i)
      console.log('edge >>', list[i].data.lastEventId );
    }
  }, t)
}