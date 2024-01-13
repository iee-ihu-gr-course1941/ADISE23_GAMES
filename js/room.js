let turnTimeoutDuration = 100; // Timer 30 deuterolepta
let currentCountdown;
let currentCountdownInterval = null;
let deck;
let sweeppop=0;
let wins;

openPopup();


function startWithTheme() {
  setDeckPreference('theme');
  closePopup();
}

function startWithClassic() {
  setDeckPreference('classic');
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



function setDeckPreference(deckType) {
  var popup = document.getElementById("exchange-card");
  popup.classList.add("open-popup");

  setTimeout(function() {
    var Popup = document.getElementById("exchange-card");
    Popup.classList.remove("open-popup");
}, 2000); 

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/deck_preference.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (this.status === 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        deck=deckType;
        flipCards(deckType); 
        
      } else {
        console.error('Error deck preference: ', response.error);
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
        startTurn();

        document.querySelector('.first-tcard img').src = response.cards[0];
        document.querySelector('.second-tcard img').src = response.cards[1];
        document.querySelector('.third-tcard img').src = response.cards[2];
        document.querySelector('.fourth-tcard img').src = response.cards[3];


        document.querySelector('.first-card img').src = response.cards[4];
        document.querySelector('.second-card img').src = response.cards[5];
        document.querySelector('.third-card img').src = response.cards[6];
        document.querySelector('.fourth-card img').src = response.cards[7];
      } else {
        console.error('Error taking cards: ', response.error);
      }
    }
  };
  xhr.send('deckType=' + encodeURIComponent(deckType));
}




//ksekina xronometrhsh
function startTurn() {
  if (currentCountdownInterval) {
    clearInterval(currentCountdownInterval);
    currentCountdownInterval = null;
  }  
    let timerElement = document.getElementById("timer");
    currentCountdown = turnTimeoutDuration;
    timerElement.innerText = currentCountdown;

    currentCountdownInterval = setInterval(() => {
      currentCountdown -= 1;
      timerElement.innerText = currentCountdown;

      if (currentCountdown <= 0) {
        clearInterval(currentCountdownInterval);
        var popup = document.getElementById("defeat");
        popup.classList.add("open-popup");

        currentCountdownInterval = null;
    }
    }, 1000);
  
}



//antallagh kartwn-----------------------------------------


var selectedUserCardId = null;
var selectedTableCardId = null;


//xartia tou user
function takeUserCardPath(cardId) {
  if (selectedTableCardId) {
    exchangeCards(cardId, selectedTableCardId);
    resetCardSelection();
  } else {
    resetCardSelection(); 
    selectedUserCardId = cardId;
    document.getElementById(cardId).style.transform = 'scale(1.1)';
    document.getElementById(cardId).style.transition = 'transform 0.3s ease';
  }
}

//xartia trapeziou
function takeTableCardPath(cardId) {
  if (selectedUserCardId) {
    exchangeCards(selectedUserCardId, cardId);
    resetCardSelection();
  } else {
    resetCardSelection();
    selectedTableCardId = cardId;
    document.getElementById(cardId).style.transform = 'scale(1.1)';
    document.getElementById(cardId).style.transition = 'transform 0.3s ease';
  }
}

function exchangeCards(userCardId, tableCardId) {


  var userCardElement = document.getElementById(userCardId);
  var tableCardElement = document.getElementById(tableCardId);
  var tempSrc = userCardElement.src;
  userCardElement.src = tableCardElement.src;
  tableCardElement.src = tempSrc;

  //des an mazepse 4 idies kartes
  if (checkWin()) {
    Win(); 
    clearInterval(currentCountdownInterval);
    currentCountdownInterval = null;
  }
  else{
    sweepCards(); // allakse kartes
  }

}

function resetCardSelection() {
  var allCards = document.querySelectorAll('.first-card img, .second-card img, .third-card img, .fourth-card img,  .first-tcard img, .second-tcard img, .third-tcard img, .fourth-tcard img ');
  allCards.forEach(function(card) {
    card.style.transform = '';
  });

  selectedUserCardId = null;
  selectedTableCardId = null;
}

//----------------------------------------------------------------------------




//allakse mono tis kartes tou trapeziou
function sweepCards()
{
  if(sweeppop==0)
  {   
  var popup = document.getElementById("sweep");
  popup.classList.add("open-popup");

  setTimeout(function() {
    var Popup = document.getElementById("sweep");
    Popup.classList.remove("open-popup");
  }, 2000); 
  sweeppop=1;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/deck.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (this.status === 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {

        document.querySelector('.first-tcard img').src = response.cards[0];
        document.querySelector('.second-tcard img').src = response.cards[1];
        document.querySelector('.third-tcard img').src = response.cards[2];
        document.querySelector('.fourth-tcard img').src = response.cards[3];
      } else {
        console.error('Error taking cards: ', response.error);
      }
    }
  };
  xhr.send('deckType=' + encodeURIComponent(deck));
  
}


//des an nikhse kapoios
function checkWin() {
  // pare ta paths
  var card1Src = document.getElementById('first-card').src;
  var card2Src = document.getElementById('second-card').src;
  var card3Src = document.getElementById('third-card').src;
  var card4Src = document.getElementById('fourth-card').src;

  // pare ta ranks
  var rank1 = getCardRank(card1Src);
  var rank2 = getCardRank(card2Src);
  var rank3 = getCardRank(card3Src);
  var rank4 = getCardRank(card4Src);

  // an einai ola me idio rank
  if (rank1 === rank2 && rank1 === rank3 && rank1 === rank4) {
    return true;
  } else {
    return false;
  }
}

function getCardRank(cardSrc) {
  var parts = cardSrc.split('/');
  var fileName = parts[parts.length - 1]; 
  var rank = fileName.split('-')[0];
  return rank;
}


function Win()
{
  var popup = document.getElementById("win");
  popup.classList.add("open-popup");
  wins=wins+1;
  document.getElementById("points").innerHTML=wins

}
