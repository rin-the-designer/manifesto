const audioElement = document.querySelector("audio");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const playButton = document.querySelector("#play");

audioElement.addEventListener("play", startMidiPlayback);
audioElement.addEventListener("pause", pauseMidiPlayback);

// Media Session API for audio controls and metadata
if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: "Manifesto",
    artist: "Rin Kim",
    album: "Song by WonderlustBeats",
    artwork: [
      {
        src: "/assets/media-cover/cover-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/assets/media-cover/cover-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/assets/media-cover/cover-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/media-cover/cover-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/assets/media-cover/cover-384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/assets/media-cover/cover-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  });
}

function togglePlay() {
  audioContext.resume();
  if (audioElement.paused) {
    audioElement.play();
    startWordDisplay();
    playButton.textContent = "Pause";
    $("#intro").addClass("display-none");
  } else {
    audioElement.pause();
    pauseWordDisplay();
    playButton.textContent = "Play";
  }
}

$(function () {
  function initEvents() {
    $("#play").on("mousedown", togglePlay);

    var i = null;
    $(document).on("mousemove", function () {
      clearTimeout(i);
      $("#nav").removeClass("display-none");
      i = setTimeout(() => {
        if ($("#intro").css("display") !== "block") {
          $("#nav").addClass("display-none");
        }
      }, 1000);
    });

    $(audioElement)
      .on("play", function () {})
      .on("pause", function () {})
      .on("ended", function () {
        playButton.textContent = "Restart";
        $("#nav, #intro").removeClass("display-none");
        pauseWordDisplay();
      });
  }

  function init() {
    initEvents();
  }

  init();
});
