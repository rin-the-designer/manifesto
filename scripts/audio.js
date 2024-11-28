const audioElement = document.querySelector("audio");
const playButton = document.querySelector("#play");
let isFirstPlay = true;

audioElement.addEventListener('play', startMidiPlayback);
audioElement.addEventListener('pause', pauseMidiPlayback);

// Add this event listener to track when audio is loaded
audioElement.addEventListener('canplaythrough', () => {
    console.log('Audio loaded');
    isAudioLoaded = true;
    checkResourcesLoaded();
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

// Update audio element setup
audioElement.preload = "auto";  // Ensure preload is set
audioElement.playsinline = true;  // Enable inline playback
audioElement.setAttribute('webkit-playsinline', 'true');  // For older iOS versions

// Modify togglePlay function
function togglePlay() {
    const $intro = $('#intro');

    // Add promise handling for iOS
    if (audioElement.paused) {
        const playPromise = audioElement.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                startWordDisplay();
                
                if (isFirstPlay) {
                    $intro.fadeOut(0);
                    isFirstPlay = false;
                    $('#nav').hide();
                } 

                playButton.textContent = "Pause";
                document.body.style.cursor = 'none';
            })
            .catch(error => {
                // Handle play error (likely autoplay policy)
                console.error("Playback failed:", error);
                // Show some user feedback
                playButton.textContent = "Tap to Play";
            });
        }
    } else {
        audioElement.pause();
        pauseWordDisplay();
        playButton.textContent = "Play";
        $('#nav').fadeIn(300);
        document.body.style.cursor = 'default';
    }
}

// Add this function to handle initial user interaction
function initAudio() {
    // Create and play a silent audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    
    // Resume audio context on user interaction
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    // Remove the initialization once it's done
    document.body.removeEventListener('touchstart', initAudio);
    document.body.removeEventListener('click', initAudio);
}

// Add event listeners for user interaction
document.body.addEventListener('touchstart', initAudio);
document.body.addEventListener('click', initAudio);

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