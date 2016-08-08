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
  res.sendFile(path.join(__dirname, '../../public/service', 'index.html'))
})

server.listen(SERVICE_PORT);

let delivery = true;

ioServer.on('connection', (socket) => {
  socket.on('message', (data) => {
    if(delivery) {
      socket.broadcast.emit('message for service', { data: data.data });
    }
    console.log("<<", data.data);
  });

  socket.on('message delivery bc', function(data) {
    console.log(delivery, data)
    delivery = data.status;
  });

  // Disconnect listener
  socket.on('disconnect', () => console.log('service: client disconnected'))
}); 