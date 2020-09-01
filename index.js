const usernameText = document.getElementById('usernameText');
const usernameButton = document.getElementById('createUsername');

if(usernameButton) {
  usernameButton.onclick = () => {
    if(usernameText.value === '' || usernameText.value === ' ') {
      return;
    } else {
      localStorage.setItem('username', usernameText.value)
      window.location.href="room.html";
    }
  }
}

