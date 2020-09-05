const WebSocket = require('ws');
const url = require('url');

const wss = new WebSocket.Server({port: 8082});

const rooms = {}

wss.on('connection', (ws, req) => {
  // ws.id = url.parse(req,url, true);
  // console.log(url.parse(req.url, true).query.username);
  ws.id = url.parse(req.url, true).query.username;
  ws.room = url.parse(req.url, true).query.room;

  ws.isMsg = false;// might not need this

  console.log(ws.id, ws.room);
  // wss.clients.forEach((client) => {
  //   const data = {
  //     username: ws.id,
  //   }
  //   client.send(JSON.stringify(data));
  // });
  if(ws.isMsg) {
    // sendMsgToUsers(msg.room, msg.author, msg.message);
  } else {
    if(rooms[`${ws.room}`]) {
      //exists
      addToRoom(ws);
    } else if(!rooms[`${ws.room}`]) {
      // make new room if doesnt exist
      makeRoom(ws);
    }
  }
  

  ws.on('message', (res) => {

    resData = JSON.parse(res);
    if(resData.isMsg) {
      console.log(ws.id, ws.room, resData.message);
      sendMsgToUsers(ws.room, ws.id, resData.message);
    }

    //send data to all other clients
    // wss.clients.forEach((client) => {
      // console.log(client.id);
      // if(client !== ws && client.readyState === WebSocket.OPEN) {
      // if(client.readyState === WebSocket.OPEN) {
      //   const data = {
      //     author: ws.id,
      //     message: message,
      //   }
      //   client.send(JSON.stringify(data));
      // }
    // });
    // const msg = JSON.parse(message);
    // check if room exists
    
  });
});

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