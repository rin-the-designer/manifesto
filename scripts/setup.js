let predefinedColors = [
  ["#FF7700", "#181818"],
  ["#FFAA22", "#181818"],
  ["#006AFF", "#181818"],
  ["#FFFFFF", "#181818"],
  //["#181818", "#FFFFFF"],
];

let isAudioLoaded = false;
let isTextLoaded = false;

function keyPressed() {
  if (key === " ") {
    togglePlay();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent page scrolling
    togglePlay();
  }
});

function checkResourcesLoaded() {
  console.log("Checking resources:", {
    audio: isAudioLoaded,
    text: isTextLoaded,
  });
  if (isAudioLoaded && isTextLoaded) {
    playButton.textContent = "Play";
    playButton.disabled = false;
  } else {
    playButton.textContent = "Loading...";
    playButton.disabled = true;
  }
}

// Add this function to load all resources
function preloadResources() {
  // Load audio
  loadAudio()
    .then(() => {
      isAudioLoaded = true;
      checkResourcesLoaded();
    })
    .catch((error) => {
      console.error("Error loading audio:", error);
    });

  // Load text
  loadText()
    .then(() => {
      isTextLoaded = true;
      checkResourcesLoaded();
    })
    .catch((error) => {
      console.error("Error loading text:", error);
    });
}

// Example audio loading function
async function loadAudio() {
  return new Promise((resolve, reject) => {
    // Replace with your actual audio loading logic
    const audio = new Audio("/assets/audio/oxygen.mp3");
    audio.addEventListener("canplaythrough", () => {
      resolve();
    });
    audio.addEventListener("error", reject);
    audio.load();
  });
}

// Example text loading function
async function loadText() {
  try {
    const [mainResponse, manifestoResponse] = await Promise.all([
      fetch("/assets/text/main.txt"),
      fetch("/assets/text/manifesto.txt"),
    ]);

    const mainText = await mainResponse.text();
    const manifestoText = await manifestoResponse.text();

    // Store the text content in variables that you can access later
    window.mainText = mainText; // or store it however you prefer
    window.manifestoText = manifestoText; // or store it however you prefer

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

// Call this when the page loads
window.addEventListener("load", preloadResources);

// For Nav Item
fetch("/assets/text/main.txt")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("main-text").textContent = data;
  });

fetch("/assets/text/manifesto.txt")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("manifesto-text").innerText = data;
  });

function showReadContent() {
  const readContent = document.getElementById("read-content");
  const readButton = document.getElementById("read");

  if (readContent.style.display === "block") {
    readContent.style.display = "none";
    readButton.textContent = "Read";
  } else {
    readContent.style.display = "block";
    readButton.textContent = "Close";
  }
}

document.getElementById("read").addEventListener("click", showReadContent);

document.getElementById("play").addEventListener("click", () => {
  const readContent = document.getElementById("read-content");
  if (readContent.style.display === "block") {
    readContent.style.display = "none";
    document.getElementById("read").textContent = "Read";
  }
});
