const sendButton = document.getElementById('sendButton');
const messageText = document.getElementById('messageText');
const messages = document.getElementById('messages');
let ws;

const openWebSocket = () => {
  if(ws) {
    ws.close();
  }
  ws = new WebSocket('ws://localhost:8082/?username=thisbeusername');
  ws.onopen = () => {
    console.log('Connection made!');
  }
  // ws.onmessage = ({ data }) => showMessage(data);
  ws.onmessage = (res) => {
    const resData = JSON.parse(res.data);
    console.log(resData);
    if(resData.message) {
      showMessage(resData);
    }
  }
  ws.onclose = () => {
    ws = null;
  }
}

sendButton.onclick = () => {
  if(!ws) {
    showMessage('No Connection avaliable!');
    return;
  }
  if(messageText.value === '' || messageText.value === ' ') {
    return;
  }
  ws.send(messageText.value);
}

const showMessage = ({author, message}) => {
  messages.textContent += `\r\n [${author}]: ${message}`;
  messageText.value = '';
}

openWebSocket();