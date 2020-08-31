const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8082});

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    //send data to all other clients
    wss.clients.forEach((client) => {
      if(client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
});

// socketServer.on('connection', (socket) => {
//   console.log('new client connected');

//   socket.on('message', (data) => {
//     console.log('data from client:', data);

//     socket.send('hello this is a return message');
//   });

//   socket.on('close', () => {
//     console.log('client has disconnected');
//   })
// })