var audio = document.getElementById('audio');
var playPauseBTN = document.getElementById('playPauseBTN');
var isPlaying = localStorage.getItem('isPlaying') === 'true';

function playPause() {
    if (!isPlaying) {
        isPlaying = true;// Function to initialize the state of each audio control on page load
        function initializeAudioControl(audioId, toggleClass, textClass) {
            var audio = document.getElementById(audioId);
            var isPlaying = localStorage.getItem(audioId + 'IsPlaying') === 'true';
            var toggle = document.querySelector(toggleClass);
            var text = document.querySelector(textClass);
        
            // Update UI and audio state based on localStorage
            if (isPlaying) {
                audio.play();
                toggle.classList.add("active");
                text.innerHTML = "Music ON";
            } else {
                audio.pause();
                toggle.classList.remove("active");
                text.innerHTML = "Music OFF";
            }
        }
        
        // Simplified toggleSound function for both audio elements
        function toggleSound(audioId, toggleClass, textClass) {
            var audio = document.getElementById(audioId);
            var isPlaying = !audio.paused;
            var toggle = document.querySelector(toggleClass);
            var text = document.querySelector(textClass);
        
            if (isPlaying) {
                audio.pause();
                text.innerHTML = "Music OFF";
            } else {
                audio.play();
                text.innerHTML = "Music ON";
            }
            toggle.classList.toggle("active");
            localStorage.setItem(audioId + 'IsPlaying', !isPlaying);
        }
        
        // Initialize audio controls on page load
        document.addEventListener("DOMContentLoaded", function() {
            initializeAudioControl('audio', '.toggle', '.text');
            initializeAudioControl('audio2', '.toggle2', '.text2');
        });
        
        audio.play();
    } else {
        isPlaying = false;
        audio.pause();
    }
    localStorage.setItem('isPlaying', isPlaying);
}

function toggleSound() {
    playPause();
    
    var toggle = document.querySelector(".toggle");
    toggle.classList.toggle("active");
    var text = document.querySelector(".text");
    if (toggle.classList.contains("active")) {
        text.innerHTML = "Music ON";
    } else {
        text.innerHTML = "Music OFF";
    }
}


/*-------------------------------------------------------------------------- */
var audio = document.getElementById('audio');
var playPauseBTN = document.getElementById('playPauseBTN');
var isPlaying = localStorage.getItem('isPlaying') === 'true';

function playPause() {
    if (!isPlaying) {
        isPlaying = true;
        audio.play();
    } else {
        isPlaying = false;
        audio.pause();
    }
    localStorage.setItem('isPlaying', isPlaying);
}

function toggleSound() {
    playPause();
    
    var toggle = document.querySelector(".toggle");
    toggle.classList.toggle("active");
    var text = document.querySelector(".text");
    if (toggle.classList.contains("active")) {
        text.innerHTML = "Music ON";
    } else {
        text.innerHTML = "Music OFF";
        if (!isPlaying) {
            audio.pause();  
        }
    }
}

/*-------------------------------------------------------------------------- */
var audio2 = document.getElementById('audio2');
var playPauseBTN2 = document.getElementById('playPauseBTN2');
var isPlaying2 = localStorage.getItem('isPlaying2') === 'true';

function playPause2() {
    if (!isPlaying2) {
        isPlaying2 = true;
        audio2.play();
    } else {
        isPlaying2 = false;
        audio2.pause();
    }
    localStorage.setItem('isPlaying2', isPlaying2);
}

function toggleSound2() {
    playPause2();

    var toggle2 = document.querySelector(".toggle2");
    toggle2.classList.toggle("active");
    var text2 = document.querySelector(".text2");

    if (toggle2.classList.contains("active")) {
        text2.innerHTML = "Sound ON";
        // Προσθήκη event listener και αφαίρεση των προηγούμενων event listeners
        document.addEventListener("click", playSound2.bind(null, audio2));
        document.removeEventListener("click", playSound2.bind(null, null));
    } else {
        text2.innerHTML = "Sound OFF";
        // Αφαίρεση των προηγούμενων event listeners
        document.removeEventListener("click", playSound2.bind(null, audio2));
        document.removeEventListener("click", playSound2.bind(null, null));
        if (!isPlaying2 && !audio2.paused) {
            audio2.pause();
        }
    }
}

function playSound2(sound) {
    if (sound) {
        sound.play();
    }
}

function playSound2() {
    audio2.play();
}


function toggleSound2() {
    playPause2();

    var toggle2 = document.querySelector(".toggle2");
    toggle2.classList.toggle("active");
    var text2 = document.querySelector(".text2");

    if (toggle2.classList.contains("active")) {
        text2.innerHTML = "Sound ON";
        document.addEventListener("click", playSound2);
    } else {
        text2.innerHTML = "Sound OFF";
        document.removeEventListener("click", playSound2);
        if (!isPlaying2) {
            audio2.pause();
        }
    }
}