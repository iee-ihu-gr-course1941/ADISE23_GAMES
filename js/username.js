function fetchUserInfo() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../lib/get_user_info.php', true);
  xhr.onload = function() {
      if (this.status == 200) {
          var response = JSON.parse(this.responseText);
          if (response.username) {
              document.querySelector('.profile-dropdown-btn span').textContent = response.username;
              document.getElementById("drop-down").style.display=""
          }
      }
  };
  xhr.send();
}

document.addEventListener('DOMContentLoaded', fetchUserInfo);