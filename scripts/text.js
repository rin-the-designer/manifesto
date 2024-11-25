let manifestoWords = [];
let currentWordIndex = 0;
let wordInterval;

function loadManifesto() {
    // Load the manifesto text file
    fetch('assets/text/manifesto.txt')
        .then(response => response.text())
        .then(text => {
            // Split the text into words and remove empty strings
            manifestoWords = text.split(/\s+/).filter(word => word.length > 0);
        })
        .catch(error => console.error('Error loading manifesto:', error));
}

function startWordDisplay() {
    if (currentWordIndex >= manifestoWords.length) {
        currentWordIndex = 0;
    }
    
    wordInterval = setInterval(() => {
        if (currentWordIndex < manifestoWords.length) {
            const wordDisplay = document.getElementById('word-display');
            // Get random color pair from predefinedColors
            const randomColorPair = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
            
            wordDisplay.textContent = manifestoWords[currentWordIndex];
            // Apply the background and text colors
            wordDisplay.style.backgroundColor = randomColorPair[0];
            wordDisplay.style.color = randomColorPair[1];
            
            currentWordIndex++;
        } else {
            currentWordIndex = 0;
        }
    }, 500);
}

function pauseWordDisplay() {
    clearInterval(wordInterval);
}

// Call this when your page loads
loadManifesto();
