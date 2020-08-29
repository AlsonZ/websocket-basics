const WebSocket = require('ws');

const socketServer = new WebSocket.Server({port: 8082});


socketServer.on('connection', (socket) => {
  console.log('new client connected');

  socket.on('close', () => {
    console.log('client has disconnected');
  })
})