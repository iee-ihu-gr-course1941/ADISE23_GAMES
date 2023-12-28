//REGISTER CODE

//Tsekarisma otan vgei apo to input tou username
document.getElementById("username").addEventListener("blur", function() {
    checkUsername(this.value);
});

//Elegxos an to username uparxei mesw AJAX request
function checkUsername(username)
{
  var xhr = new XMLHttpRequest();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    xhr.open("POST", "../lib/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "exists") {
                showErrorPopup("Username already exists. Please choose another username.");
            } 
          }
        }
   xhr.send("action=check_username&username=" + encodeURIComponent(username));

}

//Elegxos an to username uparxei mesw AJAX request kai emfanish success pop up
function checkUsernameAvailability(username) {
    var xhr = new XMLHttpRequest();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    xhr.open("POST", "../lib/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "exists") { //an to username uparxei , epistrefei h php exists
                showErrorPopup(); //error pop up
            } else if(username.trim() !== "" && password.trim() !== "" && email.trim() !== "")  { //an einai ola sumplhrwmena 
                openPopup(); // anoikse success pop up
                
            }
        }
    };
    xhr.send("action=check_username&username=" + encodeURIComponent(username));
}

//Elegxos otan kanei click sto submit kalei thn panw sunarthsh
function checkBeforeSubmit() {
    var username = document.getElementById("username").value;
      checkUsernameAvailability(username);

}

//POP UP FUNCTIONS
function openPopup() { 
    var popup = document.getElementById("popup");
    popup.classList.add("open-popup");
}


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

//Otan pathsei OK tha ginei to submit
function submitForm() {
    var popup = document.getElementById("popup"); 
    popup.classList.remove("open-popup"); //kleise to pop up
    document.getElementById("registerForm").submit(); //kane submit
}

//