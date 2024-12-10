let currentWordIndex = 0;
let wordInterval;
let currentTextSource = "main";
let textCollections = {
  main: [],
  manifesto: [],
};

function loadFiles() {
  files[MAIN] = loadStrings("/assets/text/main.txt");
  files[MANIFESTO] = loadStrings("/assets/text/manifesto.txt");
}

// Load text from file
async function loadText(filename) {
  try {
    const response = await fetch(`assets/text/${filename}.txt`);
    const text = await response.text();
    return text.split(/\s+/).filter((word) => word.length > 0);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

async function loadTexts() {
  try {
    textCollections.main = await loadText("main");
    textCollections.manifesto = await loadText("manifesto");
    isTextLoaded = true;
  } catch (error) {
    console.error("Error loading texts:", error);
  }
}

function displaySingleWord(words, container) {
  if (currentWordIndex < words.length) {
    if (
      currentScene === 2 ||
      currentScene === 3 ||
      currentScene === 4 ||
      currentScene === 5 ||
      currentScene === 6 ||
      currentScene === 7 ||
      currentScene === 8 ||
      currentScene === 9
    ) {
      // For scene 2, append words instead of replacing
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.textContent = words[currentWordIndex];
      container.appendChild(wordSpan);
    } else {
      // Original behavior for other scenes
      container.textContent = words[currentWordIndex];
    }
  }
}

function displayMultipleWords(words, spliceCount, container) {
  const endIndex = currentWordIndex + spliceCount - 1;
  $(container).text(words.slice(currentWordIndex, endIndex + 1).join(" "));
  currentWordIndex = endIndex + 1; // Update currentWordIndex to the next position
}

function displaySpecificWords(words, wordIndex, spliceCount, container) {
  currentWordIndex = wordIndex;
  const endIndex = wordIndex + spliceCount - 1;
  $(container).text(words.slice(currentWordIndex, endIndex + 1).join(" "));
  currentWordIndex = endIndex + 1; // Update currentWordIndex to the next position
}

function displaySentence(words, container) {
  container.innerHTML = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(" ");
}
// Reusable function that can color specific word indices
function updateWordColors(specificIndices) {
  if (!specificIndices || !Array.isArray(specificIndices)) return;

  const wordSpans = document.querySelectorAll(".word");
  if (!wordSpans.length) return;

  wordSpans.forEach((wordSpan, index) => {
    if (specificIndices.includes(index)) {
      const colorPair =
        predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
      wordSpan.style.backgroundColor = colorPair[0];
      wordSpan.style.color = colorPair[1];
    }
  });
}

// Modify startWordDisplay to handle different scenes
function startWordDisplay() {
  const currentWords = getCurrentWords();
  const wordDisplay = document.getElementById("word-display");

  switch (currentScene) {
    case 0:
      break;

    case 1:
      wordDisplay.innerHTML = currentWords
        .map((word, index) => {
          let styles = 'class="word"';
          if (index === 8) {
            styles += ' style="text-decoration: line-through;"';
          }
          return `<span ${styles}>${word}</span>`;
        })
        .join(" ");
      break;

    case 2:
      currentWordIndex = 0;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      currentTextSource = "manifesto";
      wordDisplay.innerHTML = ""; // Clear the container
      break;
  }
}

function pauseWordDisplay() {
  clearInterval(wordInterval);
}

// Helper function to get current word array
function getCurrentWords() {
  return textCollections[currentTextSource];
}

// Update the initial load call
loadTexts();
