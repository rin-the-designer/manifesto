let predefinedColors = [
    ["#FF7700", "#181818"],
    ["#FFAA22", "#181818"],
    ["#006AFF", "#181818"],
    ["#FFFFFF", "#181818"],
    //["#181818", "#FFFFFF"],
];

function keyPressed() {
  if (key === ' ') {
    togglePlay();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
      event.preventDefault(); // Prevent page scrolling
      togglePlay();
  }
});

function checkResourcesLoaded() {
  console.log('Checking resources:', { audio: isAudioLoaded, text: isTextLoaded });
  if (isAudioLoaded && isTextLoaded) {
      playButton.textContent = "Play";
      playButton.disabled = false;
  } else {
      playButton.textContent = "Loading...";
      playButton.disabled = true;
  }
}