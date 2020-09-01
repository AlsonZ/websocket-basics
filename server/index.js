const WebSocket = require('ws');
const url = require('url');

const wss = new WebSocket.Server({port: 8082});

wss.on('connection', (ws, req) => {
  // ws.id = url.parse(req,url, true);
  // console.log(url.parse(req.url, true).query.username);
  ws.id = url.parse(req.url, true).query.username;
  wss.clients.forEach((client) => {
    const data = {
      username: ws.id,
    }
    client.send(JSON.stringify(data));
  });

  ws.on('message', (message) => {
    //send data to all other clients
    wss.clients.forEach((client) => {
      // console.log(client.id);
      // if(client !== ws && client.readyState === WebSocket.OPEN) {
      if(client.readyState === WebSocket.OPEN) {
        const data = {
          author: ws.id,
          message: message,
        }
        client.send(JSON.stringify(data));
      }
    });
  });
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