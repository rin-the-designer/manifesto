let currentScene = 0;

// Function to handle the midi playback
function playMidiStems(currentCentiseconds) {
  if (midiStems[currentCentiseconds]) {
    // Create a log message that combines all events
    let logMessage = `${currentCentiseconds}:`;
    
    midiStems[currentCentiseconds].forEach(stem => {
      const [type, value] = stem;
      const midiType = midiTypes[type];
      
      // Add each event to the log message
      logMessage += ` ${midiType}=${value},`;
      
      // Call the appropriate handler function
      switch(midiType) {
        case 'SCENE':
          onSCENE(value);
          break;
        case 'CHORD':
          onCHORD(value);
          break;
        case 'MELODY':
          onMELODY(value);
          break;
        case 'KICK':
          onKICK(value);
          break;
        case 'SNARE':
          onSNARE(value);
          break;
        case 'HIHAT':
          onHIHAT(value);
          break;
        case 'BASS':
          onBASS(value);
          break;
      }
    });
    
    // Remove trailing comma and log the combined message
    console.log(logMessage.slice(0, -1));
  }
}

let midiInterval = null;
let currentCentiseconds = 0;

function startMidiPlayback() {
  if (midiInterval) {
    clearInterval(midiInterval);
  }
  
  midiInterval = setInterval(() => {
    playMidiStems(currentCentiseconds);
    currentCentiseconds += 1;
  }, 10); // Check every centisecond (10ms)
}

function pauseMidiPlayback() {
  if (midiInterval) {
    clearInterval(midiInterval);
    midiInterval = null;
  }
}

// SCENE
function onSCENE(value) {
  // Clear any existing intervals
  if (wordInterval) {
    clearInterval(wordInterval);
  }
  
  // Reset the display
  const wordDisplay = document.getElementById('word-display');
  wordDisplay.innerHTML = '';
  wordDisplay.className = ''; // Clear any existing classes
  
  currentScene = value;
  currentWordIndex = 0;
  
  // Set initial class for each scene
  if (value === 0) {
    wordDisplay.className = 'scene0-1';
  } else if (value === 1) {
    wordDisplay.className = 'scene1-1';
  } else if (value === 2) {
    wordDisplay.className = 'scene2-1';
  }
  
  startWordDisplay();
  console.log(`Scene changed to: ${value}`);
}

// CHORD
function onCHORD(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
  }
}

// MELODY
function onMELODY(value) {
  if (currentScene === 1) {
    const words = getCurrentWords();
    const targetIndices = [0, 3, 8, 13];
    
    const tempWord = document.createElement('div');
    tempWord.textContent = words[targetIndices[Math.floor(Math.random() * targetIndices.length)]];
    tempWord.className = 'temp-word-1';
    tempWord.style.cssText = `
      position: fixed;
      left: ${Math.random() * 80}vw;
      top: ${Math.random() * 80}vh;
      opacity: 0.025;
      pointer-events: none;
      transition: opacity 250ms;
      font-size: calc(100vw / 24);
      color: #FFFFFF;
      z-index: -1;
    `;
    document.body.appendChild(tempWord);
    
    // Remove the element after a short delay
    setTimeout(() => {
      tempWord.style.opacity = '0';
      setTimeout(() => tempWord.remove(), 250);
    }, 500);
  } else if (currentScene === 2) {
    // setTimeout(() => {
    //   tempWord.style.opacity = '0';
    //   setTimeout(() => tempWord.remove(), 0);
    // }, 0);
    return;
  }
}

// KICK
function onKICK(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
  }
}

// SNARE
function onSNARE(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
  }
}

// HIHAT
function onHIHAT(value) {
  if (currentScene === 0) {
    const wordDisplay = document.getElementById('word-display');
    const words = getCurrentWords();
    switch(currentCentiseconds) {
      case 50:
        displaySpecificWords(words, 0, 0, wordDisplay); // "Design"
        wordDisplay.className = 'scene0-1';
        break;
      case 150:
        displaySpecificWords(words, 1, 2, wordDisplay); // "should be"
        break;
      case 250:
        displaySpecificWords(words, 3, 3, wordDisplay); // "simple,"
        break;
      case 350:
        displaySpecificWords(words, 4, 5, wordDisplay); // "not for"
        break;
      case 450:
        displaySpecificWords(words, 6, 8, wordDisplay); // "a better aesthetic"
        break;
      case 550:
        displaySpecificWords(words, 9, 10, wordDisplay); // "but for"
        break;
      case 650:
        displaySpecificWords(words, 11, 13, wordDisplay); // "a better experience."
        break;
      case 750:
        displaySpecificWords(words, 13, 13, wordDisplay); // "a better experience."
        wordDisplay.className = 'scene0-2';
        break;
    }
  } else if (currentScene === 1) { 
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.className = 'scene1-1';
    updateWordColors([0, 3, 8, 13]);
  }
}

// BASS
function onBASS(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
    // ... etc
  }
}