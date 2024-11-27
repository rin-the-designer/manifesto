let currentScene = 0;

// Function to handle the midi playback
function playMidiStems(currentCentiseconds) {
  if (midiStems[currentCentiseconds]) {
    midiStems[currentCentiseconds].forEach(stem => {
      const [type, value] = stem;
      const midiType = midiTypes[type];
      
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
      
      console.log(`${currentCentiseconds}: ${midiType}, ${value}`);
    });
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
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
    // ... etc
  }
  currentScene = value;
  console.log(`Scene changed to: ${value}`);
}

// CHORD
function onCHORD(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
    // ... etc
  }
}

// MELODY
function onMELODY(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
    // ... etc
  }
}

// KICK
function onKICK(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
    // ... etc
  }
}

// SNARE
function onSNARE(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
    // ... etc
  }
}

// HIHAT
function onHIHAT(value) {
  switch(currentScene) {
    case 0:
      // Scene 0 behavior
      break;
    // ... etc
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