const BPM = 120;

const midiTypes = [
  'SCENE',
  'CHORD',
  'MELODY',
  'KICK',
  'SNARE',
  'HIHAT',
  'BASS'
]

function syncMidi(A, B) {
  let midiType = midiTypes[A];

  let SCENE = A == 0;
  let CHORD = A == 1;
  let MELODY = A == 2;
  let KICK = A == 3;
  let SNARE = A == 4;
  let HIHAT = A == 5;
  let BASS = A == 6;
}

const midiStems = {
  // SCENE 0
  0: [ [0,0], [1,0] ],
  50: [ [5,0] ],
  150: [ [5,0] ],
  200: [ [1,0] ],
  250: [ [5,0] ],
  350: [ [5,0] ],
  400: [ [1,0] ],
  450: [ [5,0] ],
  550: [ [5,0] ],
  600: [ [1,0] ],
  650: [ [5,0] ],
  750: [ [5,0] ],

  // SCENE 1
  800: [ [0,1], [1,0], [2,0] ],
  817: [ [2,0] ],
  833: [ [2,0] ],
  850: [ [2,0], [5,0] ],
  867: [ [2,0] ],
  883: [ [2,0] ],
  900: [ [2,0] ],
  917: [ [2,0] ],
  933: [ [2,0] ],
  950: [ [2,0], [5,0] ],
  1000: [ [2,0] ],
  1017: [ [2,0] ],
  1033: [ [2,0] ],
  1050: [ [2,0], [5,0] ],
  1067: [ [2,0] ],
  1083: [ [2,0] ],
  1100: [ [2,0] ],
  1117: [ [2,0] ],
  1133: [ [2,0] ],
  1150: [ [2,0], [5,0] ],
  1167: [ [2,0] ],
  1183: [ [2,0] ],
  1200: [ [2,0] ],
  1217: [ [2,0] ],
  1233: [ [2,0] ],
  1250: [ [2,0], [5,0] ],
  1267: [ [2,0] ],
  1283: [ [2,0] ],
  1300: [ [2,0] ],
  1317: [ [2,0] ],
  1333: [ [2,0] ],
  1350: [ [2,0], [5,0] ],
  1367: [ [2,0] ],
  1383: [ [2,0] ],
  1400: [ [2,0] ],
  1417: [ [2,0] ],
  1433: [ [2,0] ],
  1450: [ [2,0], [5,0] ],
  1467: [ [2,0] ],
  1483: [ [2,0] ],
  1500: [ [2,0] ],
  1517: [ [2,0] ],
  1533: [ [2,0] ],
  1550: [ [2,0], [5,0] ],

  // SCENE 2
  1600: [ [0,2], [3,0] ],
  1650: [ [4,0] ],
  1700: [ [3,0] ],
  1750: [ [4,0] ],
  1800: [ [3,0] ],
  1850: [ [4,0] ],
  1900: [ [3,0] ],
  1950: [ [4,0] ],
  2000: [ [3,0] ],
  2050: [ [4,0] ],
  2100: [ [3,0] ],
  2150: [ [4,0] ],
  2200: [ [3,0] ],
  2250: [ [4,0] ],
  2300: [ [3,0] ],
  2350: [ [4,0] ],
  2400: [ [3,0] ],
  2450: [ [4,0] ],
  2500: [ [3,0] ],
  2550: [ [4,0] ],
  2600: [ [3,0] ],
  2650: [ [4,0] ],
  2700: [ [3,0] ],
  2750: [ [4,0] ],
  2800: [ [3,0] ],
  2850: [ [4,0] ],
  2900: [ [3,0] ],
  2950: [ [4,0] ],
  3000: [ [3,0] ],
  3050: [ [4,0] ],
  3100: [ [3,0] ],
  3150: [ [4,0] ],
  3200: [ [3,0] ],
  3250: [ [4,0] ],
  3300: [ [3,0] ],
  3350: [ [4,0] ],
  3400: [ [3,0] ],
  3450: [ [4,0] ],
  3500: [ [3,0] ],
  3550: [ [4,0] ],
  3600: [ [3,0] ],
  3650: [ [4,0] ],
  3700: [ [3,0] ],
  3750: [ [4,0] ],
  3800: [ [3,0] ],
  3850: [ [4,0] ],
  3900: [ [3,0] ],
  3950: [ [4,0] ],
  4000: [ [3,0] ],
  4050: [ [4,0] ],
  4100: [ [3,0] ],
  4150: [ [4,0] ],
  4200: [ [3,0] ],
  4250: [ [4,0] ],
  4300: [ [3,0] ],
  4350: [ [4,0] ],
  4400: [ [3,0] ],
  4450: [ [4,0] ],
  4500: [ [3,0] ],
  4550: [ [4,0] ],
  4650: [ [5,0] ],
  4700: [ [5,0] ],
  4750: [ [5,0] ],

  // SCENE 3
  4800: [ [0,3] ],

  // SCENE 4
  9600: [ [0,4] ],

  // SCENE 5
  11200: [ [0,5] ],

  // SCENE 6
  12800: [ [0,6] ],

  // SCENE 7
  14400: [ [0,7] ],

  // SCENE 8
  16000: [ [0,8] ],

  // SCENE 9
  19200: [ [0,9] ],

  // SCENE 10
  21000: [ [0,10] ]
}

