const WebSocket = require('ws');

const socketServer = new WebSocket.Server({port: 8082});


socketServer.on('connection', (socket) => {
  console.log('new client connected');

  socket.on('message', (data) => {
    console.log('data from client:', data);

    socket.send('hello this is a return message');
  });

  socket.on('close', () => {
    console.log('client has disconnected');
  })
})