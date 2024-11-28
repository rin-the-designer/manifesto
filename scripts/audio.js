const audioElement = document.querySelector("audio");
const playButton = document.querySelector("#play");
let isFirstPlay = true;
let isAudioLoaded = false;

audioElement.addEventListener('play', startMidiPlayback);
audioElement.addEventListener('pause', pauseMidiPlayback);

// Add audio loading check
audioElement.addEventListener('canplaythrough', () => {
    isAudioLoaded = true;
});

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

async function togglePlay() {
    const $intro = $('#intro');

    // Wait for both audio and text to be loaded
    if (!isAudioLoaded || !isTextLoaded) {
        console.log('Still loading resources...');
        return;
    }

    if (audioElement.paused) {
        // Reset timing variables
        currentCentiseconds = 0;
        await audioElement.play();
        startWordDisplay();
        
        if (isFirstPlay) {
            $intro.fadeOut(0);
            isFirstPlay = false;
            $('#nav').hide();
        } 

        playButton.textContent = "Pause";
        document.body.style.cursor = 'none';
    } else {
        audioElement.pause();
        pauseWordDisplay();
        playButton.textContent = "Play";
        $('#nav').fadeIn(300);
        document.body.style.cursor = 'default';
    }
}

// Mouse movement and keyboard handler
let timeout;
$(document).on('mousemove keydown', function(e) {
    // Only trigger for spacebar
    if (e.type === 'keydown' && e.code !== 'Space') return;
    
    const $intro = $('#intro');
    $('#nav').fadeIn(300);
    document.body.style.cursor = 'default';
    
    if (!$intro.is(':visible')) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            $('#nav').fadeOut(300);
            document.body.style.cursor = 'none';
        }, 1500);
    }
});

function onAudioEnded() {
    playButton.textContent = "Restart";
    $intro.fadeIn(300);
    $('#nav').fadeIn(300);
    document.body.style.cursor = 'default';
    pauseWordDisplay();
}

$(function() {

	function initEvents() {
		$("#play").on('mousedown', togglePlay);
        $("#play").on('keydown', togglePlay);
		audioElement.addEventListener('ended', onAudioEnded);
	}

	function init() {
		initEvents();
	}

	init();
  
})