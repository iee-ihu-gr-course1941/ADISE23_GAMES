let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");

const toggle = () => { profileDropdownList.classList.toggle('active'); }

window.addEventListener('click', function(e){
    if(!btn.contains(e.target)) profileDropdownList.classList.remove("active");
});
function logoutUser() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/logout.php', true);
  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          if (response.success) {
              alert(response.message); // Show success message
              window.location.href = '../HTML/main.html';
          } else {
              alert(response.message); // Show failure message
          }
      }
  };
  xhr.send();
}

window.onload = function() {
  checkLoginStatus();
};

function checkLoginStatus() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/check_login_status.php', true);
  xhr.onload = function() {
      var response = JSON.parse(xhr.responseText);
      if (response.loggedIn) {
          // Set the username in the UI
          document.querySelector('.profile-dropdown-btn span').textContent = response.username;
      }
  };
  xhr.send();
}

function startGame() { 
  // Send an AJAX request to check login status on the server
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/check_login_status.php', true); // 'check_login_status.php' is a PHP script you'll create
  xhr.onload = function() {
      var response = JSON.parse(xhr.responseText);
      if(response.loggedIn) {
          // If logged in, redirect to lobby.html
          window.location.href = '../HTML/lobby.html';
      } else {
          // If not logged in, open the login popup
          var popup = document.getElementById("popup");
          popup.classList.add("open-popup");
      }
  };
  xhr.send();
}


  function closePopup() {
  var Popup = document.getElementById("popup");
  Popup.classList.remove("open-popup");
  }

  //open register.html
  function registerForm(){
      window.location.href="register.html"
      //redirect to main.html mallon tha prepei apo to login na ginei
  }

  //authentication mesw apps
  function loginIT()
  {
      window.location.href="https://login.it.teithe.gr/authorization/?client_id=65947fc49847e402c7acae18&response_type=code&scope=profile&redirect_uri=http://localhost:4000/Desktop/ADISE23_GAMES-main/HTML/main.html"

  }

  //an kanei login as a guest
  //kapou na mpei an thelei telika na kanei login, (otan epileksei to login tha treksei o kwdikas apo logout gia na katharisei to session kai na treksei allo)
  //MPorei to koumpi login na ginei save progress kai na vgazei pop up oti tha aposundethei ws guest kai tha prepei na kanei login meta
  function loginGuest() {
  // Send an AJAX request to a PHP script to handle guest login
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/guest_login.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
      // Parse the JSON response
      var response = JSON.parse(xhr.responseText);
      if(response.success) {
          // Update the username display with the guest player ID
          document.querySelector('.profile-dropdown-btn span').textContent = "User " + response.playerId;
          document.getElementById('lgn').textContent= "Save progress"
          closePopup();
      } else {
          // Handle errors here
          console.error('Error logging in as guest:', response.error);
      }
  };
  xhr.send();
}
