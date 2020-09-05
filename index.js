const usernameText = document.getElementById('usernameText');
const usernameButton = document.getElementById('createUsername');
const roomText = document.getElementById('roomText');
const roomButton = document.getElementById('createRoom');

if(usernameButton) {
  usernameButton.onclick = () => {
    if(usernameText.value === '' || usernameText.value === ' ' || roomText.value === '' || usernameText.value === ' ') {
      return;
    } else {
      localStorage.setItem('room', roomText.value)
      localStorage.setItem('username', usernameText.value)
      window.location.href="room.html";
    }
  }
}

