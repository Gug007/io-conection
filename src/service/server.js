import http from "http"
import path from "path"
import express from "express"
import io from "socket.io"
import { SERVICE_PORT } from '../../config.js'

const app = express();
const server = http.Server(app);
const ioServer = io(server);

app.use('/static', express.static(path.join(__dirname, '../../public/scripts')));

app.get('*', (req, res) => {
  res.send('Hello World')
})

server.listen(SERVICE_PORT);

ioServer.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log("<<", data.data);
  });
  // Disconnect listener
  socket.on('disconnect', () => console.log('service: client disconnected'))
}); 