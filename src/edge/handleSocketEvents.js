export default (socket) => {
  socket.on('message', (data) => {
    console.log("<<", data.data);
  });

  socket.on('disconnect', () => console.log('service: client disconnected'))
}

