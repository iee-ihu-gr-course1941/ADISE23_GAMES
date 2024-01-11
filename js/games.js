//REGISTER CODE-------------------------------------------------------------------------
// Elegxos username enw plhktrologei
document.getElementById("username").addEventListener("input", debounce(function() {
    checkUsername(this.value);
}, 500));

//Elegxos an to username uparxei mesw AJAX request request
function checkUsername(username) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../lib/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.exists) {
                document.getElementById("input-error").innerHTML = "This username already exists!";
            } else {
                document.getElementById("input-error").innerHTML = "&nbsp";
            }
        }
    };
    xhr.send("action=check_username&username=" + encodeURIComponent(username));
}

// Check before form submission
function checkBeforeSubmit(username) {
    var xhr = new XMLHttpRequest();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; //an exei valei __@.__ sto mail
    var password = document.getElementById("password").value;
    xhr.open("POST", "../lib/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.exists) {
                document.getElementById("input-error").innerHTML = "This username already exists!";
            } else if(username.trim() !== "" && password.trim() !== "" && emailRegex.test(email) ) {
                reg_openPopup(); // Open success popup
                document.getElementById("input-error").innerHTML = "&nbsp";
            }
        }
    };
    xhr.send("action=check_username&username=" + encodeURIComponent(username));
}

// Debounce function
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Popup functions
function reg_openPopup() { 
    var popup = document.getElementById("popup");
    popup.classList.add("open-popup");
}

// Submit form
function submitForm() {
    var popup = document.getElementById("popup"); 
    popup.classList.remove("open-popup");
    document.getElementById("registerForm").submit();
    redirectPage();
}

function redirectPage() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../lib/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                window.location.href = '../HTML/login.html'; 
            } else {
                document.getElementById("input-error").innerHTML = "Registration failed: " + response.message;
            }
        }
    };
    var formData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}`;
    xhr.send(formData);
}

//main.html CODE----------------------------------------------------------------
function logoutUser() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../lib/logout.php', true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                alert(response.message); // Show success message
                // Optionally, redirect to the login page or another page
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
            document.querySelector('.profile-dropdown-btn span').textContent = response.username;
        }
    };
    xhr.send();
  }
  
  function startGame() { 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../lib/check_login_status.php', true);
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        if(response.loggedIn) {
            window.location.href = '../HTML/lobby.html';
        } else {
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
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../lib/guest_login.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            var response = JSON.parse(xhr.response);
            if(response.success) {
                document.getElementById("drop-down").style.display = "";
                document.querySelector('.profile-dropdown-btn span').textContent = response.username; // Use the actual username
                closePopup();
            } else {
                console.error('Error logging in as guest:', response.error);
            }
        };
        xhr.send();
    }
    

// Login Code-------------------------------------------------------------------------------------------------------------------------------

function showErrorPopup(message) {
    var failedPopup = document.getElementById("failed");
    // document.getElementById("error-message").textContent = message;
    failedPopup.classList.add("open-popup");
}

// Close popup
function lgn_closePopup() {
    var failedPopup = document.getElementById("failed");
    failedPopup.classList.remove("open-popup");
}

    
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
  });
  });
  
  function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../lib/login.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if (response.success) {
            window.location.href="main.html"

        } else {
          showErrorPopup();
        }
    }
  };
  xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
  }



