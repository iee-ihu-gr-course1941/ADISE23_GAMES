function checkForGame() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/start_game.php', true); 
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          var response = JSON.parse(this.responseText);
          if (response.gameStarted) {
              window.location.href = 'room.html?gameId=' + response.gameId;
          } else {
              console.log(response.message); 
          }
      }
  };
  xhr.send();
}

var gameCheckInterval = setInterval(checkForGame, 5000);

window.onbeforeunload = function() {
  clearInterval(gameCheckInterval);
};





window.onload = function() {
      enterLobby();
};

   function enterLobby() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '../lib/enter_lobby.php', true);
      xhr.send();
  }


  function leaveLobby() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '../lib/leave_lobby.php', false);
      xhr.send();
  }

window.onbeforeunload = leaveLobby;
