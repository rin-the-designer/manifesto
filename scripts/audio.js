const audioElement = document.querySelector("audio");
const playButton = document.querySelector("#play");
let isFirstPlay = true;

function togglePlay() {
    const $intro = $('#intro');

    if (audioElement.paused) {
        audioElement.play();
        startWordDisplay();
        
        if (isFirstPlay) {
            $intro.fadeOut(300);
            isFirstPlay = false;
        }
        playButton.textContent = "Pause";
    } else {
        audioElement.pause();
        pauseWordDisplay();
        playButton.textContent = "Play";
    }
}

function onAudioEnded() {
    playButton.textContent = "Restart";
    $intro.fadeIn(300);
    pauseWordDisplay();
}

$(function() {

	function initEvents() {
		$("#play").on('mousedown', togglePlay);
		audioElement.addEventListener('ended', onAudioEnded);
	}

	function init() {
		initEvents();
	}

	init();
  
})