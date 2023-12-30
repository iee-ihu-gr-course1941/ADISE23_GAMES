//REGISTER CODE----------------------------------------------------------------------------

//Tsekarisma enw grafei to username
document.getElementById("username").addEventListener("input", debounce(function() {
    checkUsername(this.value);
}, 500));


//Elegxos an to username uparxei mesw AJAX request
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

//Elegxos gia username kai prin to submit  mesw AJAX request kai emfanish success pop up
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
                openPopup(); // Open success popup
                document.getElementById("input-error").innerHTML = "&nbsp";
            }
        }
    };
    xhr.send("action=check_username&username=" + encodeURIComponent(username));
}


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


//POP UP FUNCTIONS
function openPopup() { 
    var popup = document.getElementById("popup");
    popup.classList.add("open-popup");
}

//Otan pathsei OK tha ginei to submit
function submitForm() {
    var popup = document.getElementById("popup"); 
    popup.classList.remove("open-popup"); //kleise to pop up
    document.getElementById("registerForm").submit(); //kane submit
}

//LOGIN CODE----------------------------------------------------------------------------------

function showErrorPopup(message) {
    var failedPopup = document.getElementById("failed");
    //document.getElementById("error-message").textContent = message; //dunamiko message
    failedPopup.classList.add("open-popup");
}

//kleise pop up (tou error giati to allo ston onclick tha kanei kai submit)
function closePopup() {
    var failedPopup = document.getElementById("failed");
    failedPopup.classList.remove("open-popup");
}
