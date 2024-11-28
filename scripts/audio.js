const audioElement = document.querySelector("audio");
const playButton = document.querySelector("#play");
let isFirstPlay = true;

audioElement.addEventListener('play', startMidiPlayback);
audioElement.addEventListener('pause', pauseMidiPlayback);


// Media Session API for audio controls and metadata
if ('mediaSession' in navigator) {

    navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Manifesto',
    artist: 'Rin Kim',
    album: 'Song by WonderlustBeats',
    artwork: [
        { src: '/assets/media-cover/cover-96.png',   sizes: '96x96',   type: 'image/png' },
        { src: '/assets/media-cover/cover-128.png', sizes: '128x128', type: 'image/png' },
        { src: '/assets/media-cover/cover-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/media-cover/cover-256.png', sizes: '256x256', type: 'image/png' },
        { src: '/assets/media-cover/cover-384.png', sizes: '384x384', type: 'image/png' },
        { src: '/assets/media-cover/cover-512.png', sizes: '512x512', type: 'image/png' },
    ]
    });

    navigator.mediaSession.setActionHandler('play', function() {
        audioElement.play();
        startWordDisplay();
        playButton.textContent = "Pause";
    });
    
    navigator.mediaSession.setActionHandler('pause', function() {
        audioElement.pause();
        pauseWordDisplay();
        playButton.textContent = "Play";
    });
}

function togglePlay() {
    const $intro = $('#intro');

    if (audioElement.paused) {
        audioElement.play();
        startWordDisplay();
        
        if (isFirstPlay) {
            $intro.fadeOut(300);
            isFirstPlay = false;
            $('#nav').hide();
        } else {
            $('#nav').fadeIn(300);
            setTimeout(() => {
                $('#nav').fadeOut(300);
            }, 1500);
        }
        playButton.textContent = "Pause";
    } else {
        audioElement.pause();
        pauseWordDisplay();
        playButton.textContent = "Play";
        $('#nav').fadeIn(300);
    }
}

// Mouse movement and keyboard handler
let timeout;
$(document).on('mousemove keydown', function(e) {
    // Only trigger for spacebar
    if (e.type === 'keydown' && e.code !== 'Space') return;
    
    $('#nav').fadeIn(300);
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
        $('#nav').fadeOut(300);
    }, 1500);
});

function onAudioEnded() {
    playButton.textContent = "Restart";
    $intro.fadeIn(300);
    $('#nav').fadeIn(300);
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