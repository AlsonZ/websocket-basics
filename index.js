const sendButton = document.getElementById('sendButton');
const messageText = document.getElementById('messageText');
const messages = document.getElementById('messages');
let ws;

// ws.addEventListener('open', () => {
//   console.log('we are connected');

//   ws.send('this is some data sent from frontend');
//   // enter room?
//   // get history
// })

// ws.addEventListener('message', (e) => {
//   console.log(e);
//   //add message to messages
// });
const init = () => {
  if(ws) {
    ws.close();
  }
  ws = new WebSocket('ws://localhost:8082');
  ws.onopen = () => {
    console.log('Connection made!');
  }
  ws.onmessage = ({ data }) => showMessage(data);
  ws.onclose = () => {
    ws = null;
  }
}
sendButton.onclick = () => {
  if(!ws) {
    showMessage('No Connection avaliable!');
    return;
  }
  ws.send(messageText.value);
  showMessage(messageText.value);
}
const showMessage = (message) => {
  messages.textContent += `\r\n${message}`;
  messageText.value = '';
}

init();