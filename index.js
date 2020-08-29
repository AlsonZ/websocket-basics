const ws = new WebSocket('ws://localhost:8082');
const button = document.getElementById('button');

ws.addEventListener('open', () => {
  console.log('we are connected');

  ws.send('this is some data sent from frontend');
})

ws.addEventListener('message', (e) => {
  console.log(e);
});