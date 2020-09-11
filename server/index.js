const WebSocket = require('ws');
const url = require('url');
const express = require('express');
const http = require('http');

const app = express();
app.use(express.static('../../websocket-basics'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = {}

wss.on('connection', (ws, req) => {
  ws.id = url.parse(req.url, true).query.username;
  ws.room = url.parse(req.url, true).query.room;

  if(rooms[`${ws.room}`]) {
    // exists
    addToRoom(ws);
  } else if(!rooms[`${ws.room}`]) {
    // make new room if doesnt exist
    makeRoom(ws);
  }
  ws.on('message', (res) => {
    resData = JSON.parse(res);
    if(resData.isMsg) {
      console.log(ws.id, ws.room, resData.message);
      sendMsgToUsers(ws.room, ws.id, resData.message);
    }
  });
  ws.on('close', () => {
    console.log(ws.id, 'has exited');
    const index = rooms[ws.room].users.findIndex(user => user === ws)
    if(index !== -1) {
      rooms[ws.room].users.splice(index, 1);
      console.log(ws.id, 'has been removed');
    }
    ws.terminate();
  })
});

server.listen(process.env.PORT || 8082, () => {
  console.log(`Server has started on port: ${server.address().port}`);
})

const addToRoom = (ws) => {
  console.log("user:", ws.id, "added to room");
  //check if room exists

  // add user to the room with room name
  rooms[`${ws.room}`].users.push(ws);

  //send added to room msg
  sendMsgToUsers(ws.room, "Server", `${ws.id} has joined the room.`);
}

const makeRoom = (ws) => {
  console.log("user:", ws.id, "created room:", ws.room);
  //check if room exists

  //make object with room name and array of users in room
  rooms[`${ws.room}`] = {
    name: ws.room,
    users: [],
  }
  addToRoom(ws);

}

const sendMsgToUsers = (room, author, message) => {
  rooms[`${room}`].users.forEach((user) => {
    if(user.readyState === WebSocket.OPEN) {
      const data = {
        author: author,
        message: message,
      }
      user.send(JSON.stringify(data));
    }
  });
}