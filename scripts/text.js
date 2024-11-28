let currentWordIndex = 0;
let wordInterval;
let currentTextSource = 'main';
let textCollections = {
    main: [],
    manifesto: []
};

// Load text from file
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
    try {
        textCollections.main = await loadText('main');
        textCollections.manifesto = await loadText('manifesto');
        isTextLoaded = true;
    } catch (error) {
        console.error('Error loading texts:', error);
    }
}

function displaySingleWord(words, container) {
    if (currentWordIndex < words.length) {
        container.textContent = words[currentWordIndex];
    }
}

function displaySpecificWords(words, startIndex, endIndex, container) {
    const textToShow = words.slice(startIndex, endIndex + 1).join(' ');
    container.textContent = textToShow;
}

function displaySentence(words, container) {
  container.innerHTML = words.map(word => 
    `<span class="word">${word}</span>`
  ).join(' ');
}
// Reusable function that can color specific word indices
function updateWordColors(specificIndices) {
  if (!specificIndices || !Array.isArray(specificIndices)) return;
  
  const wordSpans = document.querySelectorAll('.word');
  if (!wordSpans.length) return;

  wordSpans.forEach((wordSpan, index) => {
    if (specificIndices.includes(index)) {
      const colorPair = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
      wordSpan.style.backgroundColor = colorPair[0];
      wordSpan.style.color = colorPair[1];
    }
  });
}

// Modify startWordDisplay to handle different scenes
function startWordDisplay() {
  const currentWords = getCurrentWords();
  const wordDisplay = document.getElementById('word-display');
  
  switch(currentScene) {
    case 0:
      displaySingleWord(currentWords, wordDisplay);
      break;
      
    case 1:
      wordDisplay.innerHTML = currentWords.map((word, index) => {
        let styles = 'class="word"';
        if (index === 8) {
          styles += ' style="text-decoration: line-through;"';
        }
        return `<span ${styles}>${word}</span>`;
      }).join(' ');
      // Color specific words after they're rendered
      
      break;
      
    case 2:
      currentTextSource = 'manifesto';
      currentWordIndex = 0;
      const manifestoWords = getCurrentWords();
      wordInterval = setInterval(() => {
        displaySingleWord(manifestoWords, wordDisplay);
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
