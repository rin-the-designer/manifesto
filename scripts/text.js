let manifestoWords = [];
let mainWords = [];
let currentWordIndex = 0;
let wordInterval;
let currentTextSource = 'main';

function loadTexts() {
    // Load main.txt
    fetch('assets/text/main.txt')
        .then(response => response.text())
        .then(text => {
            mainWords = text.split(/\s+/).filter(word => word.length > 0);
        })
        .catch(error => console.error('Error loading main text:', error));

    // Load manifesto.txt
    fetch('assets/text/manifesto.txt')
        .then(response => response.text())
        .then(text => {
            manifestoWords = text.split(/\s+/).filter(word => word.length > 0);
        })
        .catch(error => console.error('Error loading manifesto:', error));
}

function startWordDisplay() {
    if (currentWordIndex >= getCurrentWords().length) {
        currentWordIndex = 0;
        // Switch to manifesto after main text completes
        if (currentTextSource === 'main') {
            currentTextSource = 'manifesto';
        }
    }
    
    wordInterval = setInterval(() => {
        const currentWords = getCurrentWords();
        if (currentWordIndex < currentWords.length) {
            const wordDisplay = document.getElementById('word-display');
            const randomColorPair = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
            
            wordDisplay.textContent = currentWords[currentWordIndex];
            wordDisplay.style.backgroundColor = randomColorPair[0];
            wordDisplay.style.color = randomColorPair[1];
            
            currentWordIndex++;
        } else {
            currentWordIndex = 0;
            if (currentTextSource === 'main') {
                currentTextSource = 'manifesto';
            }
        }
    }, 500);
}

function pauseWordDisplay() {
    clearInterval(wordInterval);
}

// Helper function to get current word array
function getCurrentWords() {
    return currentTextSource === 'main' ? mainWords : manifestoWords;
}

// Update the initial load call
loadTexts();
