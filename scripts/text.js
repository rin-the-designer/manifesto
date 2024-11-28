let currentWordIndex = 0;
let wordInterval;
let currentTextSource = 'main';
let textCollections = {
    main: [],
    manifesto: []
};

async function loadText(filename) {
    try {
        const response = await fetch(`assets/text/${filename}.txt`);
        const text = await response.text();
        return text.split(/\s+/).filter(word => word.length > 0);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
    }
}

async function loadTexts() {
    textCollections.main = await loadText('main');
    textCollections.manifesto = await loadText('manifesto');
}

function displayWordByWord(words, container) {
  if (currentWordIndex < words.length) {
    container.textContent = words[currentWordIndex];
  }
}

function displayFullText(words, container) {
  container.innerHTML = words.map(word => 
    `<span class="word">${word}</span>`
  ).join(' ');
}

function updateWordColors() {
  document.querySelectorAll('.word').forEach(wordSpan => {
    const colorPair = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
    wordSpan.style.backgroundColor = colorPair[0];
    wordSpan.style.color = colorPair[1];
  });
}

// Modify startWordDisplay to handle different scenes
function startWordDisplay() {
  const currentWords = getCurrentWords();
  const wordDisplay = document.getElementById('word-display');
  
  switch(currentScene) {
    case 0:
      if (currentWordIndex >= currentWords.length) {
        currentWordIndex = 0;
      }
      wordInterval = setInterval(() => {
        displayWordByWord(currentWords, wordDisplay);
        currentWordIndex++;
      }, 500);
      break;
      
    case 1:
      displayFullText(currentWords, wordDisplay);
      break;
      
    case 2:
      currentTextSource = 'manifesto';
      currentWordIndex = 0;
      const manifestoWords = getCurrentWords();
      wordInterval = setInterval(() => {
        displayWordByWord(manifestoWords, wordDisplay);
        currentWordIndex++;
      }, 500);
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
