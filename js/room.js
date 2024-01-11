let turnTimeoutDuration = 30;
let currentCountdown;

function startTurn(gameId, playerId) {
  let timerElement = document.getElementById("timer");
  currentCountdown = turnTimeoutDuration;
  timerElement.innerText = currentCountdown;

  let countdownInterval = setInterval(() => {
      currentCountdown -= 1;
      timerElement.innerText = currentCountdown;

      if (currentCountdown <= 0) {
          clearInterval(countdownInterval);
          getNextPlayerAndChangeTurn(gameId, playerId);
      }
  }, 1000);
}


openPopup();



function startWithTheme() {
  setDeckPreference('theme');
  closePopup();
}

function openPopup() { 
  var popup = document.getElementById("popup");
  popup.classList.add("open-popup");
}

function closePopup()
{
  var Popup = document.getElementById("popup");
  Popup.classList.remove("open-popup");
}

function startWithClassic() {
  setDeckPreference('classic');
  closePopup();
}

function setDeckPreference(deckType) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/deck_preference.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (this.status === 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        flipCards(deckType); 
      } else {
        console.error('Error setting deck preference: ', response.error);
      }
    }
  };
  xhr.send('deckType=' + encodeURIComponent(deckType));
}

function flipCards(deckType) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/deck.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (this.status === 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        // gurna tis kartes
        document.querySelector('.first-tcard img').src = response.cards[0];
        document.querySelector('.second-tcard img').src = response.cards[1];
        document.querySelector('.third-tcard img').src = response.cards[2];
        document.querySelector('.fourth-tcard img').src = response.cards[3];


        document.querySelector('.first-card img').src = response.cards[4];
        document.querySelector('.second-card img').src = response.cards[5];
        document.querySelector('.third-card img').src = response.cards[6];
        document.querySelector('.fourth-card img').src = response.cards[7];
      } else {
        console.error('Error retrieving cards: ', response.error);
      }
    }
  };
  xhr.send('deckType=' + encodeURIComponent(deckType));
}





