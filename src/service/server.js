import http from "http"
import express from "express"
import io from "socket.io"
import { SERVICE_PORT } from '../../config.js'
import handleEvents from './handleSocketEvents'

const app = express();
const server = http.Server(app);
const ioServer = io(server);

server.listen(SERVICE_PORT);

ioServer.on('connection', handleEvents);