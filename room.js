const sendButton = document.getElementById('sendButton');
const messageText = document.getElementById('messageText');
const messages = document.getElementById('messages');
const messageList = document.getElementById('messageList');

const username = localStorage.getItem('username');
let ws;

const openWebSocket = () => {
  if(ws) {
    ws.close();
  }
  ws = new WebSocket(`ws://localhost:8082/?username=${username}`);
  ws.onopen = () => {
    console.log('Connection made!');
  }
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
  let newMessage = document.createElement('li');
  newMessage.textContent += `[${author}] ${message}`;
  // if(author === username) {
  //   newMessage.classList += 'own-message';
  // }
  messageList.appendChild(newMessage);

  messageText.value = '';
}

if(!username) {
  window.location.href="index.html";
}

openWebSocket();