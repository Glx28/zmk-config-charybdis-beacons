/*
Charybdis optimizer layout — evolved-gen150
616 key changes across layers [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].
Self-contained: paste this one file in ZMK Studio console to apply all changes.
*/


// Post-apply summary — runs after apply_every_key.js finishes
window._CHARYBDIS_APPLY_ERRORS = window._CHARYBDIS_APPLY_ERRORS || [];
window._CHARYBDIS_APPLY_SKIPPED = window._CHARYBDIS_APPLY_SKIPPED || [];
const _origError = console.error.bind(console);
const _origWarn = console.warn.bind(console);
console.error = function(...args) {
  const msg = args.map(String).join(" ");
  if (msg.includes("UNKNOWN KEY") || msg.includes("NO MATCHING") || msg.includes("Failed L")) {
    window._CHARYBDIS_APPLY_ERRORS.push(msg);
  }
  _origError(...args);
};
console.warn = function(...args) {
  const msg = args.map(String).join(" ");
  if (msg.includes("No exact visible") || msg.includes("Verify manually")) {
    window._CHARYBDIS_APPLY_ERRORS.push(msg);
  }
  _origWarn(...args);
};


window.CHARYBDIS_FINAL_LAYOUT = {
  "project": "Charybdis Optimizer Layout",
  "version": "evolved-gen150",
  "keyCount": 616,
  "keys": [
  {
    "layer": 0,
    "x": 0,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Escape",
    "modifiers": [],
    "label": "Esc",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 1,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 1 and Bang",
    "modifiers": [],
    "label": "1",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 2,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 2 and At",
    "modifiers": [],
    "label": "2",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 3,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 3 and Hash",
    "modifiers": [],
    "label": "3",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 4 and Dollar",
    "modifiers": [],
    "label": "4",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 5,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 5 and Percent",
    "modifiers": [],
    "label": "5",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 7,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 6 and Caret",
    "modifiers": [],
    "label": "6",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 8,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 7 and Ampersand",
    "modifiers": [],
    "label": "7",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 9,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 8 and Star",
    "modifiers": [],
    "label": "8",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 10,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 9 and Left Bracket",
    "modifiers": [],
    "label": "9",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 11,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 0 and Right Bracket",
    "modifiers": [],
    "label": "0",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 12,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Delete",
    "modifiers": [],
    "label": "BkSp",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 0,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [],
    "label": "Tab",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Q",
    "modifiers": [],
    "label": "Q",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard W",
    "modifiers": [],
    "label": "W",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [],
    "label": "E",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard R",
    "modifiers": [],
    "label": "R",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard T",
    "modifiers": [],
    "label": "T",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 7,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Y",
    "modifiers": [],
    "label": "Y",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 8,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard U",
    "modifiers": [],
    "label": "U",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 9,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard I",
    "modifiers": [],
    "label": "I",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard O",
    "modifiers": [],
    "label": "O",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 11,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard P",
    "modifiers": [],
    "label": "P",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 12,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Left Brace",
    "modifiers": [],
    "label": "\u00e5",
    "rationale": "Norwegian \u00e5. Sends the [ scancode (ZMK Studio name 'Left Brace', same key as Layer 1 x9 y3) = \u00e5 on Norwegian Windows. Label is for the coach only.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 0,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftShift",
    "modifiers": [],
    "label": "Shft",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard A",
    "modifiers": [],
    "label": "A",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [],
    "label": "S",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 3,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard D",
    "modifiers": [],
    "label": "D",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F",
    "modifiers": [],
    "label": "F",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 5,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [],
    "label": "G",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 7,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [],
    "label": "H",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard J",
    "modifiers": [],
    "label": "J",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard K",
    "modifiers": [],
    "label": "K",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard L",
    "modifiers": [],
    "label": "L",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard SemiColon and Colon",
    "modifiers": [],
    "label": "\u00f8",
    "rationale": "Norwegian \u00f8. Keycode is unchanged (SemiColon scancode); Windows Norwegian layout renders it as \u00f8. Label is for the coach only.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 12,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Left Apos and Double",
    "modifiers": [],
    "label": "\u00e6",
    "rationale": "Norwegian \u00e6. Keycode is unchanged (Apostrophe/Quote scancode); Windows Norwegian layout renders it as \u00e6. Label is for the coach only.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 0,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftControl",
    "modifiers": [],
    "label": "Ctrl",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 1,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Z",
    "modifiers": [],
    "label": "Z",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 2,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard X",
    "modifiers": [],
    "label": "X",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [],
    "label": "C",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard V",
    "modifiers": [],
    "label": "V",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard B",
    "modifiers": [],
    "label": "B",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 7,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard N",
    "modifiers": [],
    "label": "N",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard M",
    "modifiers": [],
    "label": "M",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 9,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Comma and LessThan",
    "modifiers": [],
    "label": ",",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 10,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Period and GreaterThan",
    "modifiers": [],
    "label": ".",
    "rationale": "CRITICAL v1.9: Period must be on base layer for typing flow. Moves [ to Layer 1.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 11,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard ForwardSlash and QuestionMark",
    "modifiers": [],
    "label": "/",
    "rationale": "Base typing key for the main work layout.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 12,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Backslash and Pipe",
    "modifiers": [],
    "label": "\\",
    "rationale": "International backslash/pipe (US HID). On Norwegian Windows this key is layout-dependent (often |); not English apostrophe \u2014 use Win+Space to US English for ' in contractions, or type \u00f8/\u00e6 on their base positions.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 3,
    "y": 4,
    "behavior": "coach_l1_hold",
    "parameter": "",
    "modifiers": [],
    "label": "Nav",
    "rationale": "Hold Nav for layer 1 navigation/editing.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 4,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard Spacebar",
    "modifiers": [],
    "label": "\u2423",
    "rationale": "Thumb/control key for typing, layer access, mouse access, or Enter.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 5,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftAlt",
    "modifiers": [
      "L Alt"
    ],
    "label": "Alt",
    "rationale": "Thumb/control key for typing, layer access, mouse access, or Enter.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 7,
    "y": 4,
    "behavior": "coach_l4_hold",
    "parameter": "",
    "modifiers": [],
    "label": "System",
    "rationale": "Hold System for layer 4 Bluetooth/output/helpers.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 8,
    "y": 4,
    "behavior": "coach_l3_hold",
    "parameter": "",
    "modifiers": [],
    "label": "Window",
    "rationale": "Hold Window for layer 3 window/app/desktop control.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 4,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [],
    "label": "Down",
    "rationale": "Arrow key for navigation.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 5,
    "y": 5,
    "behavior": "coach_l2_hold",
    "parameter": "",
    "modifiers": [],
    "label": "Mouse",
    "rationale": "Hold Mouse for layer 2 mouse lock/buttons.",
    "apply_batch": true
  },
  {
    "layer": 0,
    "x": 7,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [],
    "label": "Ret",
    "rationale": "Thumb/control key for typing, layer access, mouse access, or Enter.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 0,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard B",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+B",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+B.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 1,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 2,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard F",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "F",
    "rationale": "Programming/editing shortcut for find, replace, word movement, or word deletion.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 3,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 1 and Bang",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+1",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+1.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard I",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+I",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+I.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 5,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+G",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+G.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 7,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 8,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard O",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+O",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+O.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 9,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 10,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 11,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 12,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 0,
    "y": 1,
    "behavior": "Toggle Layer",
    "parameter": "Layer::5",
    "modifiers": [],
    "label": "Code",
    "rationale": "v2.2: Toggle Code/IDE layer (Layer 5). Replaces duplicate game lock (game lock remains on L3 x12,y2).",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F12",
    "modifiers": [
      "L Alt"
    ],
    "label": "Alt+F12",
    "rationale": "Evolved (evo_best_gen150): Sends L Alt+F12.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+Tab",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+Tab.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard W",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+W",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+W.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [
      "L Shift",
      "L Alt"
    ],
    "label": "Shift+Alt+Right",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+L Alt+RightArrow.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard V",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "V",
    "rationale": "Control-modified editing shortcut.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 7,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+E",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+E.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 8,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+H",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+H.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 9,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard R",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+R",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+R.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+C",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+C.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 11,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Up",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+UpArrow.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 12,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 0,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+G",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+G.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [],
    "label": "leftarrow_combo",
    "rationale": "Evolved (evo_best_gen150): Sends LeftArrow.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard U",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+U",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+U.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 3,
    "y": 2,
    "behavior": "Momentary Layer",
    "parameter": "Layer::6",
    "modifiers": [],
    "label": "Scroll",
    "rationale": "Left-hand scroll hold (hold Nav with left thumb, hold here with middle finger). Release to stop scrolling.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 4,
    "y": 2,
    "behavior": "coach_travel_toggle",
    "parameter": "",
    "modifiers": [],
    "label": "Speed",
    "rationale": "Left-hand speed/travel toggle (hold Nav, tap here, release Nav). Speed stays on until tapped again or Exit Travel on Layer 8. Right hand stays on trackball. Mirrors right-hand speed on Layer 3.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 5,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F2",
    "modifiers": [],
    "label": "f2",
    "rationale": "Evolved (evo_best_gen150): Sends F2.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 7,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L GUI"
    ],
    "label": "Search",
    "rationale": "v1.9: Left-hand Win+S Windows Search: hold Nav thumb + tap A position.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [],
    "label": "\u2193",
    "rationale": "Navigation key for cursor/page movement.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [],
    "label": "\u2191",
    "rationale": "Navigation key for cursor/page movement.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [],
    "label": "\u2192",
    "rationale": "Navigation key for cursor/page movement.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard End",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+End",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+End.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 12,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+Up",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+UpArrow.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 0,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 1,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 2,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard F5",
    "modifiers": [],
    "label": "f5",
    "rationale": "Evolved (evo_best_gen150): Sends F5.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 3,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [],
    "label": "Up",
    "rationale": "Evolved (evo_best_gen150): Sends UpArrow.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard A",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+A",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+A.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 7,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "C",
    "rationale": "Control-modified editing shortcut.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard K",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+K",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+K.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 9,
    "y": 3,
    "behavior": "coach_game_lock",
    "parameter": "",
    "modifiers": [],
    "label": "coach_game_lock",
    "rationale": "Evolved (evo_best_gen150): coach_game_lock",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 10,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 11,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Shift",
      "L Alt"
    ],
    "label": "Shift+Alt+Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+L Alt+DownArrow.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 12,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 3,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard N",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+N",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+N.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 4,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard 2 and At",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+2",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+2.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 7,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard Comma and LessThan",
    "modifiers": [],
    "label": "comma_combo",
    "rationale": "Evolved (evo_best_gen150): Sends <.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 8,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard P",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+P",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+P.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 4,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+DownArrow.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 5,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard Dash and Underscore",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+-",
    "rationale": "Zoom out.",
    "apply_batch": true
  },
  {
    "layer": 1,
    "x": 7,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard Left GUI",
    "modifiers": [],
    "label": "left gui",
    "rationale": "Evolved (evo_best_gen150): Sends LeftGUI.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 0,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard PrintScreen and SysReq",
    "modifiers": [
      "L GUI",
      "L Shift"
    ],
    "label": "Snip",
    "rationale": "v2.5: Mouse QoL \u2014 Win+Shift+S screenshot snip tool for capturing while browsing.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 1,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard F9",
    "modifiers": [],
    "label": "f9",
    "rationale": "Evolved (evo_best_gen150): Sends F9.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 2,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard D",
    "modifiers": [
      "L GUI"
    ],
    "label": "Desktop",
    "rationale": "v2.0: Left-hand mouse QoL \u2014 Win+D toggles show desktop.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 3,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard F10",
    "modifiers": [],
    "label": "f10",
    "rationale": "Evolved (evo_best_gen150): Sends F10.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+G",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+G.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 5,
    "y": 0,
    "behavior": "Momentary Layer",
    "parameter": "Layer::6",
    "modifiers": [],
    "label": "Scroll",
    "rationale": "v2.0: Left-hand mouse QoL \u2014 hold for scroll overlay.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 7,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 8,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 2 and At",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+2",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+2.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 9,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 10,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard F",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+F",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+F.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 11,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 12,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 0,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+E",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+E.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard K",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+K",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+K.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard W",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Close",
    "rationale": "v2.0: Left-hand mouse QoL \u2014 Ctrl+W close tab.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [],
    "label": "Enter",
    "rationale": "Evolved (evo_best_gen150): Sends Enter.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F5",
    "modifiers": [],
    "label": "F5",
    "rationale": "Evolved (evo_best_gen150): Sends F5.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Equals and Plus",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Zoom In",
    "rationale": "v2.5: Mouse QoL \u2014 Ctrl+= zoom in for detailed viewing while pointing.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 7,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Left GUI",
    "modifiers": [],
    "label": "Win",
    "rationale": "v2.0: Right-hand mouse QoL \u2014 Win key to show auto-hide taskbar / Start menu.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 8,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [],
    "label": "Enter",
    "rationale": "v2.0: Right-hand mouse QoL \u2014 Enter to confirm dialogs/actions while navigating.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 9,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+S",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+S.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Dash and Underscore",
    "modifiers": [],
    "label": "minus",
    "rationale": "Evolved (evo_best_gen150): Sends _.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 11,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F6",
    "modifiers": [],
    "label": "f6",
    "rationale": "Evolved (evo_best_gen150): Sends F6.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 12,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard X",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Cut",
    "rationale": "v2.0: Left-hand mouse QoL \u2014 Ctrl+X cut (unique to left hand).",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 0,
    "y": 2,
    "behavior": "Mouse Key Press",
    "parameter": "MB4",
    "modifiers": [],
    "label": "MB4",
    "rationale": "Evolved (evo_best_gen150): Mouse Key Press: MB4",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+H",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+H.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 2,
    "y": 2,
    "behavior": "Mouse Key Press",
    "parameter": "select:MB2",
    "modifiers": [],
    "label": "MB2",
    "rationale": "v2.0: Left-hand mouse QoL \u2014 right click on home row.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 3,
    "y": 2,
    "behavior": "Mouse Key Press",
    "parameter": "select:MB3",
    "modifiers": [],
    "label": "MB3",
    "rationale": "v2.0: Left-hand mouse QoL \u2014 middle click on home row.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard I",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+I",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+I.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 5,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard 6 and Caret",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+6",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+6.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 7,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+C",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+C.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F4",
    "modifiers": [],
    "label": "f4",
    "rationale": "Evolved (evo_best_gen150): Sends F4.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 9,
    "y": 2,
    "behavior": "coach_travel_toggle",
    "parameter": "",
    "modifiers": [],
    "label": "coach_travel_toggle",
    "rationale": "Evolved (evo_best_gen150): coach_travel_toggle",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 10,
    "y": 2,
    "behavior": "coach_base",
    "parameter": "",
    "modifiers": [],
    "label": "coach_base",
    "rationale": "Evolved (evo_best_gen150): coach_base",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F5",
    "modifiers": [],
    "label": "f5",
    "rationale": "Evolved (evo_best_gen150): Sends F5.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 12,
    "y": 2,
    "behavior": "Toggle Layer",
    "parameter": "Layer::6",
    "modifiers": [],
    "label": "Scroll",
    "rationale": "v1.9: Right-hand scroll toggle: in mouse mode, tap pinky to toggle Layer 6 scroll overlay.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 0,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 1,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 2,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard A",
    "modifiers": [
      "L Shift",
      "L Alt"
    ],
    "label": "Shift+Alt+A",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+L Alt+A.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+G",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+G.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+E",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+E.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard V",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Paste",
    "rationale": "v2.0: Left-hand mouse QoL \u2014 Ctrl+V paste.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 7,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Shift",
      "L Alt"
    ],
    "label": "Shift+Alt+Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+L Alt+DownArrow.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keypad 9 and PageUp",
    "modifiers": [],
    "label": "pageup",
    "rationale": "Evolved (evo_best_gen150): Sends Keypad 9 and PageUp.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 9,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 10,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Z",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Undo",
    "rationale": "v2.0: Right-hand mouse QoL \u2014 Ctrl+Z undo after accidental edit.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 11,
    "y": 3,
    "behavior": "Momentary Layer",
    "parameter": "Layer::8",
    "modifiers": [],
    "label": "Speed",
    "rationale": "v2.4: Mouse-locked speed hold \u2014 hold for fast travel, release to return to precision. Ring/pinky reach while right thumb stays on trackball.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 12,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+Enter",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+Enter.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 3,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard PageUp",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Page Up",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+PageUp.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 4,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 7,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard ForwardSlash and QuestionMark",
    "modifiers": [],
    "label": "forwardslash_combo",
    "rationale": "Evolved (evo_best_gen150): Sends ?.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 8,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard Left Brace",
    "modifiers": [],
    "label": "left brace_combo",
    "rationale": "Evolved (evo_best_gen150): Sends {.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 4,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard Left Brace",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+[",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+{.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 5,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 2,
    "x": 7,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard Right Brace",
    "modifiers": [],
    "label": "right brace_combo",
    "rationale": "Evolved (evo_best_gen150): Sends }.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 0,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 1,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 2,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Equals and Plus",
    "modifiers": [],
    "label": "equal",
    "rationale": "Evolved (evo_best_gen150): Sends =.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 3,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Period and GreaterThan",
    "modifiers": [
      "L GUI"
    ],
    "label": "Emoji",
    "rationale": "Win+. Emoji picker on L3 x0,y0. Fills x0 column.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard A",
    "modifiers": [
      "L GUI"
    ],
    "label": "QSett",
    "rationale": "v2.2: Win+A \u2014 Quick Settings. Fills empty L3 y0.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 5,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard N",
    "modifiers": [
      "L GUI"
    ],
    "label": "Notif",
    "rationale": "v2.2: Win+N \u2014 Notifications. Fills empty L3 y0.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 7,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard T",
    "modifiers": [
      "L GUI"
    ],
    "label": "TskCy",
    "rationale": "v2.2: Win+T \u2014 Cycle taskbar. Fills empty L3 y0.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 8,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 9,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard P",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+P",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+P.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 10,
    "y": 0,
    "behavior": "Bluetooth",
    "parameter": "BT_SEL",
    "modifiers": [],
    "label": "BT",
    "rationale": "Bluetooth selection.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 11,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard 9 and Left Bracket",
    "modifiers": [],
    "label": "left bracket_combo",
    "rationale": "Evolved (evo_best_gen150): Sends 9.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 12,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 0,
    "y": 1,
    "behavior": "Bluetooth",
    "parameter": "BT_SEL 1",
    "modifiers": [],
    "label": "Bluetooth",
    "rationale": "Evolved (evo_best_gen150): Bluetooth: BT_SEL 1",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F17",
    "modifiers": [],
    "label": "f17",
    "rationale": "Evolved (evo_best_gen150): Sends F17.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 2,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [
      "L GUI"
    ],
    "label": "\u2192",
    "rationale": "Window, app, language, or desktop workflow shortcut.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard M",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+M",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+M.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Spacebar",
    "modifiers": [
      "L GUI"
    ],
    "label": "Lang",
    "rationale": "Win+Space \u2014 Switch input language. Replaces dupe emoji picker.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 7,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Escape",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "TskMg",
    "rationale": "v2.2: Ctrl+Shift+Esc \u2014 Task Manager. Fills empty L3 y0.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 8,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard V",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+V",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+V.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 9,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F16",
    "modifiers": [],
    "label": "f16",
    "rationale": "Evolved (evo_best_gen150): Sends F16.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 11,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard K",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+K",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+K.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 12,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F8",
    "modifiers": [
      "L Shift"
    ],
    "label": "Shift+F8",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+F8.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 0,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard U",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+U",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+U.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 1,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+G",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+G.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 3,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard 1 and Bang",
    "modifiers": [
      "L GUI"
    ],
    "label": "1",
    "rationale": "Windows app/taskbar launcher shortcut.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard 4 and Dollar",
    "modifiers": [
      "L GUI"
    ],
    "label": "4",
    "rationale": "Windows app/taskbar launcher shortcut.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 5,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard 5 and Percent",
    "modifiers": [
      "L GUI"
    ],
    "label": "5",
    "rationale": "Windows app/taskbar launcher shortcut.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 7,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L GUI"
    ],
    "label": "Search",
    "rationale": "Windows Search (Win+S) on home row.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 8,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard ForwardSlash and QuestionMark",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+/",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+?.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard SemiColon and Colon",
    "modifiers": [],
    "label": ";",
    "rationale": "Semicolon key.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+H",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+H.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 12,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+E",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+E.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 0,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard O",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+O",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+O.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 1,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 2,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [
      "L GUI"
    ],
    "label": "Voice",
    "rationale": "Win+H \u2014 Voice typing. Fills L3 transparent slot.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L Shift",
      "L GUI"
    ],
    "label": "S",
    "rationale": "Window, app, language, or desktop workflow shortcut.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 5,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 7,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [
      "L Alt"
    ],
    "label": "Tab",
    "rationale": "Window, app, language, or desktop workflow shortcut.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Y",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Y",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+Y.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 9,
    "y": 3,
    "behavior": "Bluetooth",
    "parameter": "BT_SEL 3",
    "modifiers": [],
    "label": "Bluetooth",
    "rationale": "Evolved (evo_best_gen150): Bluetooth: BT_SEL 3",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 10,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard R",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+R",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+R.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 11,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Tab",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+Tab.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 12,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard N",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+N",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+N.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 3,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keypad 3 and PageDn",
    "modifiers": [],
    "label": "keypad 3",
    "rationale": "Evolved (evo_best_gen150): Sends Keypad 3 and PageDn.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 4,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard B",
    "modifiers": [
      "L GUI"
    ],
    "label": "SysTray",
    "rationale": "Focus system tray (Win+B). Evolution-optimized thumb fill for Window layer.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 7,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 8,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 4,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+Left",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+LeftArrow.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 5,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 3,
    "x": 7,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 0,
    "y": 0,
    "behavior": "Bluetooth",
    "parameter": "BT_SEL 0",
    "modifiers": [],
    "label": "Bluetooth",
    "rationale": "Bluetooth profile management.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 1,
    "y": 0,
    "behavior": "Bluetooth",
    "parameter": "BT_SEL 1",
    "modifiers": [],
    "label": "Bluetooth",
    "rationale": "Bluetooth profile management.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 2,
    "y": 0,
    "behavior": "Bluetooth",
    "parameter": "BT_SEL 2",
    "modifiers": [],
    "label": "Bluetooth",
    "rationale": "Bluetooth profile management.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 3,
    "y": 0,
    "behavior": "Bluetooth",
    "parameter": "BT_SEL 3",
    "modifiers": [],
    "label": "Bluetooth",
    "rationale": "Bluetooth profile management.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 4,
    "y": 0,
    "behavior": "Bluetooth",
    "parameter": "BT_SEL 4",
    "modifiers": [],
    "label": "Bluetooth",
    "rationale": "Bluetooth profile management.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 5,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 7,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard X",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+X",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+X.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 8,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard F6",
    "modifiers": [],
    "label": "f6",
    "rationale": "Evolved (evo_best_gen150): Sends F6.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 9,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 10,
    "y": 0,
    "behavior": "Studio Unlock",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Studio Unlock",
    "rationale": "Unlocks ZMK Studio access from the keyboard.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 11,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Enter",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+Enter.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 12,
    "y": 0,
    "behavior": "Bootloader",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Bootloader",
    "rationale": "Bootloader entry for flashing firmware.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 0,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+G",
    "rationale": "v2.3: L4 power shortcut \u2014 Go to (line/page/vault).",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard O",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+O",
    "rationale": "v2.3: L4 power shortcut \u2014 Open file.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F15",
    "modifiers": [],
    "label": "F15",
    "rationale": "v2.1: Sequential F13-F24 macro keys.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F16",
    "modifiers": [],
    "label": "F16",
    "rationale": "v2.1: Sequential F13-F24 macro keys.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F14",
    "modifiers": [],
    "label": "F14",
    "rationale": "v2.1: Sequential F13-F24 macro keys.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [],
    "label": "return enter",
    "rationale": "Evolved (evo_best_gen150): Sends Enter.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 7,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+S",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+S.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 8,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard End",
    "modifiers": [],
    "label": "end",
    "rationale": "Evolved (evo_best_gen150): Sends End.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 9,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard L",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+L",
    "rationale": "v2.3: L4 power shortcut \u2014 Address bar / Select line.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 11,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Delete",
    "modifiers": [],
    "label": "delete",
    "rationale": "Evolved (evo_best_gen150): Sends Delete.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 12,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard U",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+U",
    "rationale": "v2.3: L4 power shortcut \u2014 Underline / Upload.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 0,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Delete",
    "modifiers": [],
    "label": "Backspace",
    "rationale": "Evolved (evo_best_gen150): Sends Delete.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F19",
    "modifiers": [],
    "label": "F19",
    "rationale": "v2.1: Sequential F13-F24 macro keys. F19-F23 on home row.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F20",
    "modifiers": [],
    "label": "F20",
    "rationale": "v2.1: Sequential F13-F24 macro keys.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 3,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F21",
    "modifiers": [],
    "label": "F21",
    "rationale": "v2.1: Sequential F13-F24 macro keys.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard I",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+I",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+I.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 5,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Right Brace",
    "modifiers": [],
    "label": "right bracket",
    "rationale": "Evolved (evo_best_gen150): Sends }.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 7,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftShift",
    "modifiers": [],
    "label": "leftshift",
    "rationale": "Evolved (evo_best_gen150): Sends LeftShift.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Left Brace",
    "modifiers": [],
    "label": "left bracket",
    "rationale": "Evolved (evo_best_gen150): Sends {.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F12",
    "modifiers": [],
    "label": "f12",
    "rationale": "Evolved (evo_best_gen150): Sends F12.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F5",
    "modifiers": [],
    "label": "f5",
    "rationale": "Evolved (evo_best_gen150): Sends F5.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 12,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Share",
    "rationale": "v2.3: L4 power shortcut \u2014 Teams screen share.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 0,
    "y": 3,
    "behavior": "Toggle Layer",
    "parameter": "10",
    "modifiers": [],
    "label": "Excel",
    "rationale": "Toggle Excel layer (L10). Hold System thumb + tap here.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 1,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [
      "L Shift",
      "L Alt"
    ],
    "label": "Shift+Alt+Up",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+L Alt+UpArrow.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 2,
    "y": 3,
    "behavior": "Toggle Layer",
    "parameter": "Layer::9",
    "modifiers": [],
    "label": "DMS",
    "rationale": "v2.2: Toggle M-Files/DMS layer (Layer 9). Uses freed F-key slot.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard D",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+D",
    "rationale": "v2.3: L4 power shortcut \u2014 Duplicate / Delete / Bookmark.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [],
    "label": "Tab",
    "rationale": "Evolved (evo_best_gen150): Sends Tab.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard F22",
    "modifiers": [],
    "label": "F22",
    "rationale": "v2.1: Sequential F13-F24 macro keys.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 7,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard V",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+V",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+V.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Home",
    "modifiers": [],
    "label": "home",
    "rationale": "Evolved (evo_best_gen150): Sends Home.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 9,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard F11",
    "modifiers": [],
    "label": "f11",
    "rationale": "Evolved (evo_best_gen150): Sends F11.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 10,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard F7",
    "modifiers": [],
    "label": "f7",
    "rationale": "Evolved (evo_best_gen150): Sends F7.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 11,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Hangup",
    "rationale": "v2.3: L4 power shortcut \u2014 Teams end call.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 12,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard A",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Accept",
    "rationale": "v2.3: L4 power shortcut \u2014 Teams accept call.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 3,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Tab",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+Tab.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 4,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard T",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+T",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+T.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 7,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard D",
    "modifiers": [
      "L GUI",
      "L Ctrl"
    ],
    "label": "Win+Ctrl+D",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+L Ctrl+D.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 8,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard F9",
    "modifiers": [],
    "label": "f9",
    "rationale": "Evolved (evo_best_gen150): Sends F9.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 4,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard ForwardSlash and QuestionMark",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+/",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+?.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 5,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard ForwardSlash and QuestionMark",
    "modifiers": [],
    "label": "forwardslash_combo",
    "rationale": "Evolved (evo_best_gen150): Sends ?.",
    "apply_batch": true
  },
  {
    "layer": 4,
    "x": 7,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 0,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 1,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 2,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard F5",
    "modifiers": [
      "L Shift"
    ],
    "label": "Stop",
    "rationale": "v2.2: Code/IDE \u2014 Stop debugging.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 3,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard O",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "GoSym",
    "rationale": "v2.2: Code/IDE \u2014 Go to symbol.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 5,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 7,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+H",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+H.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 8,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+G",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+G.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 9,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard D",
    "modifiers": [
      "L GUI",
      "L Ctrl"
    ],
    "label": "Win+Ctrl+D",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+L Ctrl+D.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 10,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Explr",
    "rationale": "v2.2: Code/IDE \u2014 Explorer panel.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 11,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 12,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 0,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Z",
    "modifiers": [
      "L Alt"
    ],
    "label": "Wrap",
    "rationale": "Alt+Z Toggle word wrap.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+F",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+F.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F18",
    "modifiers": [],
    "label": "f18",
    "rationale": "Evolved (evo_best_gen150): Sends F18.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [
      "L GUI",
      "L Ctrl"
    ],
    "label": "Win+Ctrl+Right",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+L Ctrl+RightArrow.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "InsUp",
    "rationale": "v2.2: Code/IDE \u2014 Insert line above.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Grave Accent and Tilde",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+`",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+`.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 7,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 8,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 9,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard W",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+W",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+W.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F1",
    "modifiers": [],
    "label": "f1",
    "rationale": "Evolved (evo_best_gen150): Sends F1.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 11,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Backslash and Pipe",
    "modifiers": [],
    "label": "backslash",
    "rationale": "Evolved (evo_best_gen150): Sends |.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 12,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 0,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard N",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+N",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+N.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Save",
    "rationale": "v2.2: Code/IDE \u2014 Save.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard J",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+J",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+J.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 3,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Comma and LessThan",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Sett",
    "rationale": "v2.2: Code/IDE \u2014 Settings.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard K",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "DelLn",
    "rationale": "v2.2: Code/IDE \u2014 Delete line.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 5,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+S",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+S.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 7,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 8,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard L",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+L",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 10,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 11,
    "y": 2,
    "behavior": "coach_travel_toggle",
    "parameter": "",
    "modifiers": [],
    "label": "coach_travel_toggle",
    "rationale": "Evolved (evo_best_gen150): coach_travel_toggle",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 12,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 0,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 1,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard V",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "PstNF",
    "rationale": "v2.2: Code/IDE \u2014 Paste no formatting.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 2,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Grave Accent and Tilde",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "NTerm",
    "rationale": "v2.2: Code/IDE \u2014 New terminal.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard X",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ext",
    "rationale": "v2.2: Code/IDE \u2014 Extensions panel.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard F8",
    "modifiers": [],
    "label": "f8",
    "rationale": "Evolved (evo_best_gen150): Sends F8.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 7,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 8,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 9,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 10,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keypad 3 and PageDn",
    "modifiers": [],
    "label": "keypad 3",
    "rationale": "Evolved (evo_best_gen150): Sends Keypad 3 and PageDn.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 11,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 12,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 3,
    "y": 4,
    "behavior": "coach_base",
    "parameter": "",
    "modifiers": [],
    "label": "Base",
    "rationale": "Exit Code layer to base.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 4,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 7,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 8,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 4,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 5,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 5,
    "x": 7,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 0,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 1,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 2,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 3,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Equals and Plus",
    "modifiers": [
      "L Alt"
    ],
    "label": "Alt+=",
    "rationale": "Evolved (evo_best_gen150): Sends L Alt+=.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Left",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+LeftArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 5,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 7,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 8,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Q",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Q",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+Q.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 9,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 10,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 11,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 12,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 0,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 1,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Spacebar",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Space",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+Space.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F10",
    "modifiers": [],
    "label": "F10",
    "rationale": "Evolved (evo_best_gen150): Sends F10.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [
      "L GUI",
      "L Shift"
    ],
    "label": "Win+Shift+Left",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+L Shift+LeftArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Right",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+RightArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 7,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard R",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+R",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+R.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 8,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [
      "L Alt"
    ],
    "label": "Alt+Right",
    "rationale": "Evolved (evo_best_gen150): Sends L Alt+RightArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 9,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard 5 and Percent",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+5",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+5.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+Left",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+LeftArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 11,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 12,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 0,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+DownArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F9",
    "modifiers": [],
    "label": "F9",
    "rationale": "Evolved (evo_best_gen150): Sends F9.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 3,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard 3 and Hash",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+3",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+3.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 5,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Spacebar",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+Space",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+Space.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 7,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard 4 and Dollar",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+4",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+4.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F5",
    "modifiers": [],
    "label": "F5",
    "rationale": "Evolved (evo_best_gen150): Sends F5.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Ctrl",
      "L Alt"
    ],
    "label": "Ctrl+Alt+Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Alt+DownArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+Up",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+UpArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 12,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 0,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 1,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 2,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Equals and Plus",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift++",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+=.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard F11",
    "modifiers": [
      "L Shift"
    ],
    "label": "Shift+F11",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+F11.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [
      "L GUI",
      "L Shift"
    ],
    "label": "Win+Shift+Right",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+L Shift+RightArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard F4",
    "modifiers": [],
    "label": "F4",
    "rationale": "Evolved (evo_best_gen150): Sends F4.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 7,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard I",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+I",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+I.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard T",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+T",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+T.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 9,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard 6 and Caret",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+6",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+6.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 10,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+Right",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+RightArrow.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 11,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 12,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 3,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 4,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard 0 and Right Bracket",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+0",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+0.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 7,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 8,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 4,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 5,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 6,
    "x": 7,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 0,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 1,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 2,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 3,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 4,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 5,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 7,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 8,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 9,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 10,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 11,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 12,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 0,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keypad 9 and PageUp",
    "modifiers": [],
    "label": "9 PU",
    "rationale": "RPG/game movement or menu navigation.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [],
    "label": "\u2191",
    "rationale": "RPG/game movement or menu navigation.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keypad 3 and PageDn",
    "modifiers": [],
    "label": "3 PD",
    "rationale": "RPG/game movement or menu navigation.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 4,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 5,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 7,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 8,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 9,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keypad 3 and PageDn",
    "modifiers": [],
    "label": "3 PD",
    "rationale": "RPG/game movement or menu navigation. Right-hand column-mirror of left x3 (reversed cluster).",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [],
    "label": "\u2191",
    "rationale": "RPG/game movement or menu navigation. Right-hand column-mirror of left x2.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 11,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keypad 9 and PageUp",
    "modifiers": [],
    "label": "9 PU",
    "rationale": "RPG/game movement or menu navigation. Right-hand column-mirror of left x1.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 12,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 0,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [],
    "label": "\u2190",
    "rationale": "RPG/game movement or menu navigation.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [],
    "label": "\u2193",
    "rationale": "RPG/game movement or menu navigation.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 3,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [],
    "label": "\u2192",
    "rationale": "RPG/game movement or menu navigation.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Z",
    "modifiers": [],
    "label": "Z",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 5,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 7,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Z",
    "modifiers": [],
    "label": "Z",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key. Right-hand column-mirror of left x4 (outer column).",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [],
    "label": "\u2190",
    "rationale": "RPG/game movement: left arrow on left column of right-hand cluster (x9).",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [],
    "label": "\u2193",
    "rationale": "RPG/game movement or menu navigation. Right-hand column-mirror of left x2.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [],
    "label": "\u2192",
    "rationale": "RPG/game movement: right arrow on right column of right-hand cluster (x11).",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 12,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 0,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 1,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard X",
    "modifiers": [],
    "label": "X",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 2,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [],
    "label": "C",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftShift",
    "modifiers": [],
    "label": "Shft",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Escape",
    "modifiers": [],
    "label": "Esc",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 5,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 7,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Escape",
    "modifiers": [],
    "label": "Esc",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key. Right-hand column-mirror of left x4 (outer column).",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 9,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftShift",
    "modifiers": [],
    "label": "Shft",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key. Right-hand column-mirror of left x3.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 10,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [],
    "label": "C",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key. Right-hand column-mirror of left x2.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 11,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard X",
    "modifiers": [],
    "label": "X",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key. Right-hand column-mirror of left x1.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 12,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 3,
    "y": 4,
    "behavior": "coach_base",
    "parameter": "",
    "modifiers": [],
    "label": "Exit Base",
    "rationale": "Left-thumb exit from locked game layer to base. Must use coach_base (not plain To Layer) so the beacon listener clears lockedLayer 7.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 4,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard Spacebar",
    "modifiers": [],
    "label": "\u2423",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 5,
    "y": 4,
    "behavior": "coach_base",
    "parameter": "",
    "modifiers": [],
    "label": "Exit Base",
    "rationale": "Left support-thumb exit from locked game layer to base.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 7,
    "y": 4,
    "behavior": "coach_base",
    "parameter": "",
    "modifiers": [],
    "label": "Exit Base",
    "rationale": "Right-thumb exit from locked game layer to base.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 8,
    "y": 4,
    "behavior": "coach_base",
    "parameter": "",
    "modifiers": [],
    "label": "Exit Base",
    "rationale": "Second right-thumb exit from locked game layer to base.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 4,
    "y": 5,
    "behavior": "Mouse Key Press",
    "parameter": "select:MB1",
    "modifiers": [],
    "label": "Click",
    "rationale": "Mouse button binding: select:MB1.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 5,
    "y": 5,
    "behavior": "Mouse Key Press",
    "parameter": "select:MB2",
    "modifiers": [],
    "label": "Right Click",
    "rationale": "Mouse button binding: select:MB2.",
    "apply_batch": true
  },
  {
    "layer": 7,
    "x": 7,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [],
    "label": "Ret",
    "rationale": "RPG/game action, cancel, menu, dash, pause, or confirm key.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 0,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 1,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 2,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 3,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Escape",
    "modifiers": [],
    "label": "escape",
    "rationale": "Evolved (evo_best_gen150): Sends Escape.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 5,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 7,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 8,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Spacebar",
    "modifiers": [
      "L Shift"
    ],
    "label": "Shift+Space",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+Space.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 9,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 10,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 11,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 12,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 0,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 1,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F11",
    "modifiers": [],
    "label": "F11",
    "rationale": "Evolved (evo_best_gen150): Sends F11.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+S",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+S.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Home",
    "modifiers": [],
    "label": "home",
    "rationale": "Evolved (evo_best_gen150): Sends Home.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [
      "L GUI",
      "L Ctrl"
    ],
    "label": "Win+Ctrl+Right",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+L Ctrl+RightArrow.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 7,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Escape",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+Esc",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+Escape.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 8,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Z",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+Z",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+Z.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 9,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Dash and Underscore",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+-",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+_.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 10,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 11,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 12,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 0,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 1,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F6",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+F6",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+F6.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 3,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Left GUI",
    "modifiers": [],
    "label": "left gui",
    "rationale": "Evolved (evo_best_gen150): Sends LeftGUI.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 5,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 7,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Grave Accent and Tilde",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+`",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+`.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F4",
    "modifiers": [
      "L Alt"
    ],
    "label": "Alt+F4",
    "rationale": "Evolved (evo_best_gen150): Sends L Alt+F4.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Alt"
    ],
    "label": "Alt+Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Alt+DownArrow.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Period and GreaterThan",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+.",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+>.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 11,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 12,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 0,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 1,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 2,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard B",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Ctrl+Shift+B",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Shift+B.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [],
    "label": "tab",
    "rationale": "Evolved (evo_best_gen150): Sends Tab.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Period and GreaterThan",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+.",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+>.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 7,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard SemiColon and Colon",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+;",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+:.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [
      "L Alt"
    ],
    "label": "Alt+Up",
    "rationale": "Evolved (evo_best_gen150): Sends L Alt+UpArrow.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 9,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Home",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Home",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+Home.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 10,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 11,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 12,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 3,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 4,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 7,
    "y": 4,
    "behavior": "coach_travel_off",
    "parameter": "",
    "modifiers": [],
    "label": "Exit Travel",
    "rationale": "Right-thumb exit from speed/travel overlay. Must use coach_travel_off (not plain To Layer) so the beacon listener clears toggled layer 8.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 8,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 4,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard Delete",
    "modifiers": [],
    "label": "Delete",
    "rationale": "Evolved (evo_best_gen150): Sends Delete.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 5,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard F10",
    "modifiers": [],
    "label": "F10",
    "rationale": "Evolved (evo_best_gen150): Sends F10.",
    "apply_batch": true
  },
  {
    "layer": 8,
    "x": 7,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 0,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 1,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 2,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 3,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard End",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+End",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+End.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 5,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 7,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 8,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Up",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+UpArrow.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 9,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 10,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 11,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 12,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 0,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard F2",
    "modifiers": [],
    "label": "f2",
    "rationale": "Evolved (evo_best_gen150): Sends F2.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard W",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "WfSt",
    "rationale": "v2.2: M-Files \u2014 Change workflow state.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 2,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard A",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Asgn",
    "rationale": "v2.2: M-Files \u2014 Assign to user.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 3,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 4,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard M",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Fav",
    "rationale": "v2.2: M-Files \u2014 Add to favorites.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard 1 and Bang",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "List",
    "rationale": "v2.2: M-Files \u2014 List view.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 7,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard P",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Print",
    "rationale": "v2.2: M-Files \u2014 Print.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 8,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Shift",
      "L Alt"
    ],
    "label": "Shift+Alt+Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Shift+L Alt+DownArrow.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 9,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 10,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 11,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 12,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 0,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keypad 9 and PageUp",
    "modifiers": [],
    "label": "pageup",
    "rationale": "Evolved (evo_best_gen150): Sends Keypad 9 and PageUp.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard S",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Save",
    "rationale": "v2.2: M-Files \u2014 Save.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "ChkIn",
    "rationale": "v2.2: M-Files \u2014 Check in.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 3,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+Tab",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+Tab.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 5,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard 2 and At",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Icon",
    "rationale": "v2.2: M-Files \u2014 Icon view.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 7,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftShift",
    "modifiers": [],
    "label": "leftshift",
    "rationale": "Evolved (evo_best_gen150): Sends LeftShift.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 9,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Hist",
    "rationale": "v2.2: M-Files \u2014 Version history.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard K",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Rel",
    "rationale": "v2.2: M-Files \u2014 Add relationship.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 12,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard U",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "UndCO",
    "rationale": "v2.2: M-Files \u2014 Undo checkout.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 0,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 1,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard D",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "DLoad",
    "rationale": "v2.2: M-Files \u2014 Download copy.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 2,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard O",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Open",
    "rationale": "v2.2: M-Files \u2014 Open document.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "CpLnk",
    "rationale": "v2.2: M-Files \u2014 Copy object link.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard F5",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Notif",
    "rationale": "v2.2: M-Files \u2014 Send notification.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Group",
    "rationale": "v2.2: M-Files \u2014 Group by.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 7,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard G",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Vault",
    "rationale": "v2.2: M-Files \u2014 Go to vault.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard RightArrow",
    "modifiers": [],
    "label": "rightarrow_combo",
    "rationale": "Evolved (evo_best_gen150): Sends RightArrow.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 9,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+DownArrow.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 10,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 11,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 12,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 3,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 4,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 7,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 8,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 4,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 5,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 9,
    "x": 7,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 0,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Return Enter",
    "modifiers": [
      "L Shift"
    ],
    "label": "ShftEnt",
    "rationale": "Confirm and move up (Shift+Enter).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 1,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard A",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "SelAll",
    "rationale": "Select all / current region (Ctrl+A).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 2,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Copy",
    "rationale": "Copy (Ctrl+C).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 3,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard X",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Cut",
    "rationale": "Cut (Ctrl+X).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 4,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard Equals and Plus",
    "modifiers": [
      "L Alt"
    ],
    "label": "AutoSum",
    "rationale": "AutoSum (Alt+=).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 5,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 7,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 8,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 9,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 10,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard DownArrow",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Dn",
    "rationale": "Jump to bottom edge of data region.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 11,
    "y": 0,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 12,
    "y": 0,
    "behavior": "Key Press",
    "parameter": "Keyboard C",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+C",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+C.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 0,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Tab",
    "modifiers": [
      "L Shift"
    ],
    "label": "ShftTab",
    "rationale": "Move to previous cell (Shift+Tab).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 1,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Sel\u2190",
    "rationale": "Select to left edge of data.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 2,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 3,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "Sel\u2191",
    "rationale": "Select to top edge of data.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 4,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 5,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard SemiColon and Colon",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "InsTime",
    "rationale": "Insert current time (Ctrl+Shift+;).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 7,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 8,
    "y": 1,
    "behavior": "coach_mouse_lock",
    "parameter": "",
    "modifiers": [],
    "label": "coach_mouse_lock",
    "rationale": "Evolved (evo_best_gen150): coach_mouse_lock",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 9,
    "y": 1,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 10,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard Home",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "SelHome",
    "rationale": "Select to cell A1 (Ctrl+Shift+Home).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 11,
    "y": 1,
    "behavior": "Key Press",
    "parameter": "Keyboard B",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+B",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+B.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 12,
    "y": 1,
    "behavior": "coach_game_lock",
    "parameter": "",
    "modifiers": [],
    "label": "coach_game_lock",
    "rationale": "Evolved (evo_best_gen150): coach_game_lock",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 0,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Find",
    "rationale": "Find (Ctrl+F).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 1,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Spacebar",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "SelCol",
    "rationale": "Select entire column (Ctrl+Space).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 2,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard F4",
    "modifiers": [],
    "label": "F4 $Ref",
    "rationale": "Toggle absolute reference ($) in formulas.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 3,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 4,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard End",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "SelEnd",
    "rationale": "Select to last used cell (Ctrl+Shift+End).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 5,
    "y": 2,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 7,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard L",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+L",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+L.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 8,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard V",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Paste",
    "rationale": "Paste (Ctrl+V).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 9,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard PageDown",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "NextSht",
    "rationale": "Next sheet tab (Ctrl+Page Down).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 10,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard Z",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Undo",
    "rationale": "Undo (Ctrl+Z).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 11,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard 2 and At",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+2",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+2.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 12,
    "y": 2,
    "behavior": "Key Press",
    "parameter": "Keyboard N",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+N",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+N.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 0,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard 9 and Left Bracket",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "HideRow",
    "rationale": "Hide selected rows (Ctrl+9).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 1,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard H",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Replace",
    "rationale": "Find and replace (Ctrl+H).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 2,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Dash and Underscore",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Delete",
    "rationale": "Delete cells/rows/columns (Ctrl+-).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 3,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard 1 and Bang",
    "modifiers": [
      "L Ctrl",
      "L Shift"
    ],
    "label": "NumFmt",
    "rationale": "Number format (Ctrl+Shift+!).",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 4,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard UpArrow",
    "modifiers": [
      "L Ctrl",
      "L Alt"
    ],
    "label": "Ctrl+Alt+Up",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+L Alt+UpArrow.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 5,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard PageDown",
    "modifiers": [
      "L Ctrl"
    ],
    "label": "Ctrl+Page Down",
    "rationale": "Evolved (evo_best_gen150): Sends L Ctrl+PageDown.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 7,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 8,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard E",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+E",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+E.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 9,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 10,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard Grave Accent and Tilde",
    "modifiers": [],
    "label": "grave accent_combo",
    "rationale": "Evolved (evo_best_gen150): Sends `.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 11,
    "y": 3,
    "behavior": "Key Press",
    "parameter": "Keyboard LeftArrow",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+Left",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+LeftArrow.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 12,
    "y": 3,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 3,
    "y": 4,
    "behavior": "coach_base",
    "parameter": "",
    "modifiers": [],
    "label": "Base",
    "rationale": "Exit Excel layer to base.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 4,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard F13",
    "modifiers": [],
    "label": "f13",
    "rationale": "Evolved (evo_best_gen150): Sends F13.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 5,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 7,
    "y": 4,
    "behavior": "Key Press",
    "parameter": "Keyboard T",
    "modifiers": [
      "L GUI"
    ],
    "label": "Win+T",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+T.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 8,
    "y": 4,
    "behavior": "Transparent",
    "parameter": "",
    "modifiers": [],
    "label": "Transparen",
    "rationale": "Evolved (evo_best_gen150): Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 4,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 5,
    "y": 5,
    "behavior": "Transparent",
    "parameter": "default_transform:default_transform",
    "modifiers": [],
    "label": "Transparent",
    "rationale": "Transparent/reserved: falls through to lower active layer or does nothing if no lower binding applies.",
    "apply_batch": true
  },
  {
    "layer": 10,
    "x": 7,
    "y": 5,
    "behavior": "Key Press",
    "parameter": "Keyboard D",
    "modifiers": [
      "L GUI",
      "L Ctrl"
    ],
    "label": "Win+Ctrl+D",
    "rationale": "Evolved (evo_best_gen150): Sends L GUI+L Ctrl+D.",
    "apply_batch": true
  }
]
};

window.CHARYBDIS_MODE = "applyLayer";
window.CHARYBDIS_APPLY_LAYER_INDEX = "all";
window.CHARYBDIS_ENABLE_LAYER_APPLY = true;

console.log("Applying " + window.CHARYBDIS_FINAL_LAYOUT.keyCount + " keys across layers [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]...");

(async function CharybdisStudioAssistant() {
  const MODE = window.CHARYBDIS_MODE || "applyLayer";
  const APPLY_LAYER_INDEX = window.CHARYBDIS_APPLY_LAYER_INDEX === undefined
    ? "all"
    : (window.CHARYBDIS_APPLY_LAYER_INDEX === "all"
      ? "all"
      : (Number.isInteger(Number(window.CHARYBDIS_APPLY_LAYER_INDEX)) ? Number(window.CHARYBDIS_APPLY_LAYER_INDEX) : 2));
  const ENABLE_LAYER_APPLY = window.CHARYBDIS_ENABLE_LAYER_APPLY !== false;
  const APPLY_ONLY_BATCH = window.CHARYBDIS_APPLY_ONLY_BATCH !== false;
  const APPLY_LAYERS = Array.isArray(window.CHARYBDIS_APPLY_LAYERS)
    ? window.CHARYBDIS_APPLY_LAYERS.map((layer) => Number(layer)).filter(Number.isInteger)
    : null;
  const ONE_KEY_TEST = window.CHARYBDIS_ONE_KEY_TEST || { layer: 9, x: 4, y: 5, behavior: "Key Press", parameter: "F24", label: "TEST F24" };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const FALLBACK_LAYOUT = {
    project: "Charybdis Ultimate Keyboard Experience",
    version: "fallback-one-key-test-only",
    keys: [
      { layer: 9, x: 4, y: 5, behavior: "Key Press", parameter: "F24", label: "TEST F24", rationale: "Fallback one-key test only. Paste final_v1_layout.json into CHARYBDIS_FINAL_LAYOUT for real work.", apply_batch: false }
    ]
  };

  function clean(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function visible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 1 && r.height > 1 && cs.display !== "none" && cs.visibility !== "hidden" && cs.opacity !== "0";
  }

  function qa(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  }

  function nativeSetValue(el, value) {
    const proto = el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, "value");
    desc.set.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function nativeSetChecked(el, checked) {
    const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "checked");
    desc.set.call(el, checked);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  async function click(el, delay = 180) {
    el.scrollIntoView({ block: "center", inline: "center" });
    el.click();
    await sleep(delay);
  }

  function getLayout() {
    const data = window.CHARYBDIS_FINAL_LAYOUT || FALLBACK_LAYOUT;
    if (!data || !Array.isArray(data.keys)) {
      throw new Error("Layout data must be an object with a keys array.");
    }
    return data;
  }

  function plannedKeys() {
    return getLayout().keys
      .filter((item) => item && Number.isInteger(Number(item.layer)))
      .filter((item) => !APPLY_ONLY_BATCH || item.apply_batch === true || MODE === "oneKeyTest");
  }

  function visibleSelects() {
    return qa("select").filter(visible);
  }

  function visibleInputs() {
    return qa("input").filter(visible);
  }

  function cleanLabel(el) {
    const id = el.getAttribute("id");
    const aria = el.getAttribute("aria-labelledby");
    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel) return clean(ariaLabel);
    if (aria) {
      return aria.split(/\s+/).map((part) => clean(document.getElementById(part)?.textContent)).filter(Boolean).join(" ");
    }
    if (id) {
      const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
      if (label) return clean(label.textContent);
    }
    const nearbyLabel = el.closest("div")?.querySelector("label");
    return clean(nearbyLabel?.textContent);
  }

  function findLayerButton(layer) {
    const layerList = document.querySelector('[aria-label="Keymap Layer"]');
    return layerList?.querySelector(`[role="option"][data-key="${layer}"]`)
      || qa('[role="option"]', layerList || document).find((el) => clean(el.textContent) === String(layer));
  }

  function selectedLayer() {
    const selected = document.querySelector('[aria-label="Keymap Layer"] [role="option"][aria-selected="true"]');
    return clean(selected?.textContent || "");
  }

  function findKeyElement(x, y) {
    const holder = document.querySelector(`[x="${x}"][y="${y}"]`);
    return holder?.querySelector("button") || holder;
  }

  function keyExistsInDom(x, y) {
    return Boolean(document.querySelector(`[x="${x}"][y="${y}"]`));
  }

  function validatePlanCoordinates(items) {
    const missing = items.filter((item) => !keyExistsInDom(item.x, item.y));
    if (!missing.length) {
      console.info(`Coordinate validation passed for ${items.length} planned key(s).`);
      return true;
    }

    console.group("Coordinate validation failed");
    console.error("The following planned keys do not exist in the visible ZMK Studio keymap. Nothing was applied.");
    for (const item of missing) {
      console.error(`Layer ${item.layer} x${item.x} y${item.y}: ${item.behavior} ${item.parameter || ""} [${item.label || ""}]`);
    }
    console.groupEnd();
    return false;
  }

  function validateSupportedBehaviors(items) {
    const supported = new Set(["Key Press", "Mouse Key Press", "Momentary Layer", "To Layer", "Toggle Layer", "Bluetooth", "Output Selection", "Studio Unlock", "Reset", "Bootloader", "Transparent", "None", "coach_l1_hold", "coach_l2_hold", "coach_l3_hold", "coach_l4_hold", "coach_mouse_lock", "coach_game_lock", "coach_base", "coach_travel_toggle", "coach_travel_off", "coach_recover_base"]);
    const unsupported = items.filter((item) => !supported.has(item.behavior));
    if (!unsupported.length) return true;

    console.group("Unsupported behavior validation failed");
    console.error("These behaviors are not automated because their Studio controls are firmware/source-dependent or unverified.");
    for (const item of unsupported) {
      console.error(`Layer ${item.layer} x${item.x} y${item.y}: ${item.behavior} ${item.parameter || ""} [${item.label || ""}]`);
    }
    console.groupEnd();
    return false;
  }

  async function selectLayer(layer) {
    if (selectedLayer() === String(layer)) return;
    const el = findLayerButton(layer);
    if (!el) throw new Error(`Layer ${layer} was not found in the ZMK Studio layer list.`);
    await click(el, 650);
    if (selectedLayer() !== String(layer)) {
      throw new Error(`Tried to select layer ${layer}, but selected layer is ${selectedLayer() || "unknown"}.`);
    }
  }

  async function selectKey(x, y) {
    const el = findKeyElement(x, y);
    if (!el) throw new Error(`Key x${x} y${y} was not found in the visible keymap.`);
    await click(el.closest("button") || el, 220);
  }

  async function setBehavior(behaviorName) {
    const select = visibleSelects().find((s) => [...s.options].some((o) => clean(o.textContent) === behaviorName));
    if (!select) throw new Error(`Could not find visible Behavior select with option "${behaviorName}".`);
    const option = [...select.options].find((o) => clean(o.textContent) === behaviorName);
    nativeSetValue(select, option.value);
    await sleep(behaviorName === "Key Press" ? 900 : 350);
  }

  function behaviorSelect() {
    return visibleSelects().find(isBehaviorSelect);
  }

  function currentBehaviorName() {
    const select = behaviorSelect();
    if (!select) return "";
    return clean(select.options[select.selectedIndex]?.textContent);
  }

  function currentTextParameters() {
    return visibleInputs()
      .filter((input) => input.type === "text")
      .map((input) => clean(input.value || input.getAttribute("value") || ""))
      .filter(Boolean);
  }

  function currentSelectParameters() {
    return visibleSelects()
      .filter((select) => !isBehaviorSelect(select) && !isZoomSelect(select))
      .map((select) => clean(select.options[select.selectedIndex]?.textContent || select.value))
      .filter(Boolean);
  }

  function currentImplicitModifiers() {
    const group = qa('[role="group"]').find((el) => /Implicit Modifiers/i.test(clean(el.getAttribute("aria-label") || el.textContent)));
    if (!group) return [];

    return qa("label", group)
      .map((label) => {
        const input = label.querySelector('input[type="checkbox"]');
        return input?.checked ? normalizeModifierName(label.textContent) : "";
      })
      .filter(Boolean)
      .sort();
  }

  function normalizeKeyName(value) {
    const raw = clean(String(value || ""))
      .replace(/^Keyboard\s+/i, "")
      .replace(/\s+/g, " ")
      .toUpperCase();
    const aliases = {
      LEFT: "LEFTARROW",
      RIGHT: "RIGHTARROW",
      UP: "UPARROW",
      DOWN: "DOWNARROW",
      "PAGE UP": "PAGEUP",
      "PAGE DOWN": "PAGEDOWN",
      "PG UP": "PAGEUP",
      PGUP: "PAGEUP",
      "PG DOWN": "PAGEDOWN",
      PGDN: "PAGEDOWN",
      "KEYPAD 9 AND PAGEUP": "PAGEUP",
      "KEYPAD 3 AND PAGEDN": "PAGEDOWN",
      DELETE: "DELETE",
      DEL: "DELETE",
      INSERT: "INSERT",
      INS: "INSERT",
      ESC: "ESCAPE",
      SPACE: "SPACEBAR",
      LEFTSHIFT: "LEFTSHIFT",
      "LEFT SHIFT": "LEFTSHIFT",
      LSHIFT: "LEFTSHIFT",
      LEFTCTRL: "LEFTCTRL",
      "LEFT CTRL": "LEFTCTRL",
      LCTRL: "LEFTCTRL",
      LEFTALT: "LEFTALT",
      "LEFT ALT": "LEFTALT",
      LALT: "LEFTALT",
      "1 AND BANG": "1",
      "2 AND AT": "2",
      "3 AND HASH": "3",
      "4 AND DOLLAR": "4",
      "5 AND PERCENT": "5",
      "6 AND CARET": "6",
      "7 AND AMPERSAND": "7",
      "8 AND ASTERISK": "8",
      "9 AND LEFT PARENTHESIS": "9",
      "0 AND RIGHT PARENTHESIS": "0",
      "GRAVE ACCENT AND TILDE": "GRAVE",
      LEFTARROW: "LEFTARROW",
      RIGHTARROW: "RIGHTARROW",
      UPARROW: "UPARROW",
      DOWNARROW: "DOWNARROW"
    };
    return aliases[raw] || raw.replace(/\s+/g, "");
  }

  function currentLooksLike(item) {
    if (currentBehaviorName() !== item.behavior) return false;

    if (["Transparent", "None", "Studio Unlock", "Reset", "Bootloader"].includes(item.behavior)) {
      return true;
    }

    const wantedModifiers = (item.modifiers || []).map(normalizeModifierName).sort();
    const currentModifiers = currentImplicitModifiers();
    if (wantedModifiers.join("|") !== currentModifiers.join("|")) {
      return false;
    }

    if (!item.parameter) return true;

    const wanted = normalizeKeyName(item.parameter);
    const visibleValues = [...currentTextParameters(), ...currentSelectParameters()].map(normalizeKeyName);

    if (visibleValues.includes(wanted)) return true;
    if (item.behavior === "Bluetooth" && /^BTSEL\d+$/i.test(wanted)) {
      return visibleValues.includes("SELECTPROFILE") && currentTextParameters().some((value) => clean(value) === wanted.replace(/^BTSEL/i, ""));
    }
    return false;
  }

  async function setTextParameter(parameter) {
    const inputs = visibleInputs().filter((i) => i.type === "text");
    const candidate = inputs.find((i) => /^Key:?$/i.test(cleanLabel(i)))
      || inputs.find((i) => /Key:/i.test(cleanLabel(i)))
      || inputs[1]
      || inputs[0];
    if (!candidate) throw new Error(`Could not find a visible text input for parameter "${parameter}".`);
    candidate.focus();
    candidate.select?.();
    nativeSetValue(candidate, parameter);
    candidate.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));
    candidate.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true }));
    candidate.blur();
    await sleep(180);
  }

  function findKeyInput() {
    const inputs = visibleInputs().filter((i) => i.type === "text");
    return inputs.find((i) => i.getAttribute("role") === "combobox" && /^Key:?$/i.test(cleanLabel(i)))
      || inputs.find((i) => /^Key:?$/i.test(cleanLabel(i)))
      || inputs.find((i) => i.getAttribute("role") === "combobox")
      || inputs.find((i) => /Key:/i.test(cleanLabel(i)))
      || inputs[1]
      || inputs[0];
  }

  function keySearchTerms(parameter) {
    const text = clean(String(parameter || ""));
    const upper = text.toUpperCase();
    const terms = new Set([text]);
    const known = {
      "1": ["Keyboard 1 and Bang", "1"],
      "2": ["Keyboard 2 and At", "2"],
      "3": ["Keyboard 3 and Hash", "3"],
      "4": ["Keyboard 4 and Dollar", "4"],
      "5": ["Keyboard 5 and Percent", "5"],
      "6": ["Keyboard 6 and Caret", "6"],
      "7": ["Keyboard 7 and Ampersand", "7"],
      "8": ["Keyboard 8 and Star", "8"],
      "9": ["Keyboard 9 and Left Bracket", "9"],
      "0": ["Keyboard 0 and Right Bracket", "0"],
      GRAVE: ["Keyboard Grave Accent and Tilde", "Keyboard Grave", "Grave"],
      LEFT: ["Keyboard LeftArrow", "Left"],
      RIGHT: ["Keyboard RightArrow", "Right"],
      UP: ["Keyboard UpArrow", "Up"],
      DOWN: ["Keyboard DownArrow", "Down"],
      "PAGE UP": ["Keypad 9 and PageUp", "Keyboard Page Up", "Keyboard PageUp", "Page Up", "PageUp", "Keyboard Prior", "Prior"],
      PAGEUP: ["Keypad 9 and PageUp", "Keyboard Page Up", "Keyboard PageUp", "Page Up", "PageUp", "Keyboard Prior", "Prior"],
      PGUP: ["Keypad 9 and PageUp", "Keyboard Page Up", "Keyboard PageUp", "Page Up", "PageUp", "Keyboard Prior", "Prior"],
      "PAGE DOWN": ["Keypad 3 and PageDn", "Keyboard Page Down", "Keyboard PageDown", "Page Down", "PageDown", "Keyboard Next", "Next"],
      PAGEDOWN: ["Keypad 3 and PageDn", "Keyboard Page Down", "Keyboard PageDown", "Page Down", "PageDown", "Keyboard Next", "Next"],
      PGDN: ["Keypad 3 and PageDn", "Keyboard Page Down", "Keyboard PageDown", "Page Down", "PageDown", "Keyboard Next", "Next"],
      SPACE: ["Keyboard Space", "Space"],
      LEFTSHIFT: ["Keyboard LeftShift", "LeftShift", "Left Shift"],
      "LEFT SHIFT": ["Keyboard LeftShift", "LeftShift", "Left Shift"],
      LSHIFT: ["Keyboard LeftShift", "LeftShift", "Left Shift"],
      LEFTCTRL: ["Keyboard LeftControl", "LeftControl", "Left Control"],
      LEFTALT: ["Keyboard LeftAlt", "LeftAlt", "Left Alt"],
      LEFTGUI: ["Keyboard Left GUI", "Left GUI", "LeftGUI"],
      APOSTROPHE: ["Keyboard Left Apos and Double", "Keyboard Apostrophe and Quotation Mark", "Keyboard Apostrophe", "Apostrophe", "'"],
      KEYBOARDAPOSTROPHE: ["Keyboard Left Apos and Double", "Keyboard Apostrophe and Quotation Mark", "Keyboard Apostrophe", "Apostrophe", "'"],
      APOS: ["Keyboard Left Apos and Double", "Keyboard Apostrophe and Quotation Mark", "Keyboard Apostrophe", "Apostrophe", "'"],
      "'": ["Keyboard Left Apos and Double", "Keyboard Apostrophe and Quotation Mark", "Keyboard Apostrophe", "Apostrophe", "'"]
    };
    if (known[upper]) {
      known[upper].forEach((term) => terms.add(term));
    }
    return [...terms].filter(Boolean);
  }

  function optionScore(text, terms) {
    const actual = clean(text).toUpperCase();
    const normalizedTerms = terms.map((term) => clean(term).toUpperCase());
    const exactIndex = normalizedTerms.findIndex((term) => actual === term);
    if (exactIndex >= 0) return 1000 - exactIndex;
    const keyboardExactIndex = normalizedTerms.findIndex((term) => actual === `KEYBOARD ${term}`);
    if (keyboardExactIndex >= 0) return 900 - keyboardExactIndex;
    const containsIndex = normalizedTerms.findIndex((term) => actual.includes(term));
    if (containsIndex >= 0) return 100 - containsIndex;
    return 0;
  }

  function listboxForKeyCombobox(input) {
    const controls = input?.getAttribute("aria-controls");
    if (controls) {
      const controlled = document.getElementById(controls);
      if (controlled && controlled.getAttribute("aria-label") !== "Keymap Layer") return controlled;
    }
    return qa('[role="listbox"]')
      .filter(visible)
      .filter((listbox) => listbox.getAttribute("aria-label") !== "Keymap Layer")
      .find((listbox) => qa('[role="option"]', listbox).some(visible));
  }

  function visibleSuggestionNodes(parameter, input) {
    const terms = keySearchTerms(parameter);
    const scopedList = listboxForKeyCombobox(input);
    const roots = scopedList
      ? [scopedList]
      : qa('[role="listbox"]').filter((listbox) => listbox.getAttribute("aria-label") !== "Keymap Layer");
    return roots
      .flatMap((root) => qa('[role="option"]', root))
      .filter(visible)
      .map((el) => ({ el, text: clean(el.textContent || el.getAttribute("aria-label") || "") }))
      .filter((item) => item.text.length > 0 && item.text.length < 120)
      .map((item) => ({ ...item, score: optionScore(item.text, terms) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }

  const KNOWN_KEY_NAMES = new Set([
    "Keyboard 0 and Right Bracket","Keyboard 1 and Bang","Keyboard 2 and At","Keyboard 3 and Hash",
    "Keyboard 4 and Dollar","Keyboard 5 and Percent","Keyboard 6 and Caret","Keyboard 7 and Ampersand",
    "Keyboard 8 and Star","Keyboard 9 and Left Bracket","Keyboard A","Keyboard B","Keyboard Backslash and Pipe",
    "Keyboard C","Keyboard Comma and LessThan","Keyboard D","Keyboard Dash and Underscore","Keyboard Delete",
    "Keyboard Delete Forward","Keyboard DownArrow","Keyboard E","Keyboard End","Keyboard Equals and Plus",
    "Keyboard Escape","Keyboard F","Keyboard F1","Keyboard F2","Keyboard F3","Keyboard F4","Keyboard F5",
    "Keyboard F6","Keyboard F7","Keyboard F8","Keyboard F9","Keyboard F10","Keyboard F11","Keyboard F12",
    "Keyboard F13","Keyboard F14","Keyboard F15","Keyboard F16","Keyboard F17","Keyboard F18","Keyboard F19",
    "Keyboard F20","Keyboard F21","Keyboard F22","Keyboard F23","Keyboard F24",
    "Keyboard ForwardSlash and QuestionMark","Keyboard G","Keyboard Grave Accent and Tilde","Keyboard H",
    "Keyboard Home","Keyboard I","Keyboard J","Keyboard K","Keyboard L","Keyboard Left Apos and Double",
    "Keyboard Left Brace","Keyboard Left GUI","Keyboard LeftAlt","Keyboard LeftArrow","Keyboard LeftControl",
    "Keyboard LeftShift","Keyboard M","Keyboard N","Keyboard O","Keyboard P","Keyboard PageDown",
    "Keyboard PageUp","Keyboard Period","Keyboard Period and GreaterThan","Keyboard PrintScreen and SysReq",
    "Keyboard Q","Keyboard R","Keyboard Return Enter","Keyboard Right Brace","Keyboard RightArrow",
    "Keyboard RightAlt","Keyboard RightControl","Keyboard RightShift","Keyboard Right GUI",
    "Keyboard S","Keyboard SemiColon and Colon","Keyboard Spacebar","Keyboard T","Keyboard Tab",
    "Keyboard U","Keyboard UpArrow","Keyboard V","Keyboard W","Keyboard X","Keyboard Y","Keyboard Z",
    "Keypad 0 and Insert","Keypad 1 and End","Keypad 2 and DownArrow","Keypad 3 and PageDn",
    "Keypad 4 and LeftArrow","Keypad 5","Keypad 6 and RightArrow","Keypad 7 and Home",
    "Keypad 8 and UpArrow","Keypad 9 and PageUp","Keypad Asterisk","Keypad Enter","Keypad Equals",
    "Keypad ForwardSlash","Keypad Minus","Keypad Period and Delete","Keypad Plus"
  ]);

  async function setComboboxKeyParameter(parameter) {
    if (parameter && parameter.startsWith("Keyboard ") && !KNOWN_KEY_NAMES.has(parameter)) {
      const candidates = [...KNOWN_KEY_NAMES].filter(k => {
        const pWords = parameter.toLowerCase().split(/\s+/);
        return pWords.some(w => w.length > 2 && k.toLowerCase().includes(w));
      });
      console.error(`UNKNOWN KEY: "${parameter}"`);
      if (candidates.length) console.log("  Candidates:", candidates.join(", "));
      window._CHARYBDIS_APPLY_ERRORS.push({parameter, candidates, layer: arguments[0]?.layer, x: arguments[0]?.x, y: arguments[0]?.y});
      return;
    }

    const input = findKeyInput();
    if (!input) throw new Error(`Could not find Key combobox for parameter "${parameter}".`);

    input.scrollIntoView({ block: "center", inline: "center" });
    input.focus();
    input.select?.();
    nativeSetValue(input, "");
    await sleep(80);
    const searchTerm = keySearchTerms(parameter)[0] || parameter;
    nativeSetValue(input, searchTerm);
    input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: searchTerm }));
    await sleep(450);

    const comboButton = input.closest(".react-aria-ComboBox")?.querySelector("button")
      || input.parentElement?.querySelector("button");
    if (comboButton && comboButton.getAttribute("aria-expanded") !== "true") {
      comboButton.click();
      await sleep(450);
    }

    let suggestions = visibleSuggestionNodes(parameter, input);
    if (!suggestions.length) {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", code: "ArrowDown", bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowDown", code: "ArrowDown", bubbles: true }));
      await sleep(250);
      suggestions = visibleSuggestionNodes(parameter, input);
    }

    if (suggestions.length) {
      const chosen = suggestions[0];
      chosen.el.scrollIntoView({ block: "center", inline: "center" });
      chosen.el.click();
      await sleep(350);
    } else {
      const allOptions = [...document.querySelectorAll("[role=option], li")]
        .filter(el => el.offsetParent !== null)
        .map(el => el.textContent.trim())
        .filter(Boolean);
      console.error(`NO MATCH: "${parameter}"`);
      if (allOptions.length) console.log("  Visible options:", allOptions.slice(0, 10).join(", "));
      window._CHARYBDIS_APPLY_ERRORS.push({parameter, visibleOptions: allOptions.slice(0, 10)});
      return;
    }

    document.activeElement?.blur?.();
    input.blur();
    await sleep(250);
  }

  async function setKeyPressParameter(parameter) {
    await setComboboxKeyParameter(parameter);
    await sleep(350);
    const selected = document.querySelector('[x][y] button[aria-selected="true"]');
    const visibleText = clean(selected?.innerText);
    if (!visibleText.includes(parameter)) {
      console.info(`Key Press parameter "${parameter}" was entered. ZMK Studio may update the visible key label asynchronously; verify this key manually before saving.`);
    }
  }

  function normalizeModifierName(name) {
    const compact = clean(name).toUpperCase().replace(/[_-]+/g, " ");
    const aliases = {
      "LC": "L CTRL",
      "LCTRL": "L CTRL",
      "LEFT CTRL": "L CTRL",
      "LEFT CONTROL": "L CTRL",
      "LS": "L SHIFT",
      "LSHIFT": "L SHIFT",
      "LEFT SHIFT": "L SHIFT",
      "LA": "L ALT",
      "LALT": "L ALT",
      "LEFT ALT": "L ALT",
      "LG": "L GUI",
      "LGUI": "L GUI",
      "LEFT GUI": "L GUI",
      "WIN": "L GUI",
      "WINDOWS": "L GUI",
      "GUI": "L GUI",
      "RC": "R CTRL",
      "RCTRL": "R CTRL",
      "RIGHT CTRL": "R CTRL",
      "RIGHT CONTROL": "R CTRL",
      "RS": "R SHIFT",
      "RSHIFT": "R SHIFT",
      "RIGHT SHIFT": "R SHIFT",
      "RA": "R ALT",
      "RALT": "R ALT",
      "RIGHT ALT": "R ALT",
      "RG": "R GUI",
      "RGUI": "R GUI",
      "RIGHT GUI": "R GUI"
    };
    return aliases[compact.replace(/\s+/g, "")] || aliases[compact] || compact;
  }

  async function setCheckboxChecked(input, checked) {
    if (input.checked === checked) return;
    const label = input.closest("label");
    if (label) {
      label.click();
      await sleep(120);
    }
    if (input.checked !== checked) {
      input.click();
      await sleep(120);
    }
    if (input.checked !== checked) {
      nativeSetChecked(input, checked);
      await sleep(120);
    }
  }

  async function setImplicitModifiers(modifiers) {
    const wanted = new Set((modifiers || []).map(normalizeModifierName));
    const group = qa('[role="group"]')
      .filter((el) => /Implicit Modifiers/i.test(clean(el.getAttribute("aria-label") || el.textContent)))
      .find((el) => visible(el) && el.getAttribute("aria-hidden") !== "true")
      || qa('[role="group"]').find((el) => /Implicit Modifiers/i.test(clean(el.getAttribute("aria-label") || el.textContent)));
    if (!group) {
      if (wanted.size) console.warn("Could not find Implicit Modifiers group. Verify modifiers manually:", [...wanted]);
      return;
    }

    const byValue = {
      "1": "L CTRL",
      "2": "L SHIFT",
      "4": "L ALT",
      "8": "L GUI",
      "16": "R CTRL",
      "32": "R SHIFT",
      "64": "R ALT",
      "128": "R GUI"
    };
    const rows = qa('input[type="checkbox"]', group).map((input) => ({
      input,
      name: byValue[input.value || ""] || normalizeModifierName(input.closest("label")?.textContent || "")
    }));
    for (const row of rows) {
      await setCheckboxChecked(row.input, wanted.has(row.name));
      await sleep(60);
    }

    const missing = [...wanted].filter((modifier) => !rows.some((row) => row.name === modifier));
    if (missing.length) {
      console.warn("Some requested modifiers were not found in Studio:", missing);
    }
  }

  function parameterAliases(parameter) {
    const text = clean(String(parameter));
    const upper = text.toUpperCase();
    const aliases = new Set([text, upper]);

    const mouseAliases = { MB1: "MB1", MB2: "MB2", MB3: "MB3", MB4: "MB4", MB5: "MB5" };
    if (mouseAliases[upper]) aliases.add(mouseAliases[upper]);

    const outputAliases = {
      OUT_TOG: "Toggle Outputs",
      OUT_TOGGLE: "Toggle Outputs",
      OUT_USB: "USB Output",
      USB: "USB Output",
      OUT_BLE: "BLE Output",
      BLE: "BLE Output"
    };
    if (outputAliases[upper]) aliases.add(outputAliases[upper]);

    const bluetoothAliases = {
      BT_NXT: "Next Profile",
      BT_NEXT: "Next Profile",
      BT_PRV: "Previous Profile",
      BT_PREV: "Previous Profile",
      BT_CLR: "Clear Selected Profile",
      BT_CLEAR: "Clear Selected Profile",
      BT_CLR_ALL: "Clear All Profiles",
      BT_DISC: "Disconnect Profile"
    };
    if (bluetoothAliases[upper]) aliases.add(bluetoothAliases[upper]);

    if (/^BT_SEL\s+\d+$/i.test(text) || /^BT_SEL_\d+$/i.test(text)) aliases.add("Select Profile");
    return [...aliases].filter(Boolean);
  }

  function profileFromParameter(parameter) {
    const match = clean(String(parameter)).match(/^BT_SEL(?:\s+|_)(\d+)$/i);
    return match ? match[1] : null;
  }

  function isBehaviorSelect(select) {
    return [...select.options].some((o) => clean(o.textContent) === "Key Press")
      && [...select.options].some((o) => clean(o.textContent) === "Transparent");
  }

  function isZoomSelect(select) {
    return [...select.options].some((o) => clean(o.textContent) === "Auto")
      && [...select.options].some((o) => clean(o.textContent) === "100%");
  }

  async function setSelectParameter(parameter) {
    const normalized = clean(parameter);
    const aliases = parameterAliases(normalized);
    const select = visibleSelects().find((s) => !isBehaviorSelect(s) && !isZoomSelect(s) && [...s.options].some((o) => aliases.includes(clean(o.textContent)) || aliases.includes(clean(o.value))));
    if (!select) return false;
    const option = [...select.options].find((o) => aliases.includes(clean(o.textContent)) || aliases.includes(clean(o.value)));
    nativeSetValue(select, option.value);
    await sleep(180);

    const profile = profileFromParameter(normalized);
    if (profile !== null) {
      await sleep(250);
      const profileInput = visibleInputs().find((input) => input.type === "number" && Number(input.min) <= Number(profile) && Number(input.max) >= Number(profile));
      if (profileInput) {
        profileInput.focus();
        nativeSetValue(profileInput, profile);
        profileInput.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: profile }));
        profileInput.dispatchEvent(new Event("change", { bubbles: true }));
        profileInput.blur();
        await sleep(180);
        return true;
      }

      const profileSelect = visibleSelects().find((s) => !isBehaviorSelect(s) && !isZoomSelect(s) && s !== select && [...s.options].some((o) => clean(o.textContent) === profile || clean(o.value) === profile));
      if (!profileSelect) {
        console.warn(`Selected Bluetooth "Select Profile", but could not find a number/select Profile field for profile ${profile}. Verify manually before saving.`);
        return true;
      }
      const profileOption = [...profileSelect.options].find((o) => clean(o.textContent) === profile || clean(o.value) === profile);
      nativeSetValue(profileSelect, profileOption.value);
      await sleep(180);
    }
    return true;
  }

  async function applyItem(item) {
    if (item.studio_skip || item.behavior === "Output Selection") {
      console.log("Skipping (firmware-only, not in Studio UI):", item);
      return;
    }

    await selectLayer(item.layer);
    await selectKey(item.x, item.y);

    if (currentLooksLike(item)) {
      console.log("Already correct, skipping", item);
      return;
    }

    await setBehavior(item.behavior);

    if (["Transparent", "None", "Studio Unlock", "Reset", "Bootloader"].includes(item.behavior) || /^coach_/.test(item.behavior)) {
      return;
    }

    const supported = ["Key Press", "Mouse Key Press", "Momentary Layer", "To Layer", "Toggle Layer", "Bluetooth", "Output Selection"];
    if (!supported.includes(item.behavior)) {
      throw new Error(`Behavior "${item.behavior}" has behavior-specific controls that this applier does not safely automate yet. Use manualSteps or inspect_selected_behavior_controls.js.`);
    }

    if (!item.parameter) {
      console.warn("No parameter supplied for", item);
      return;
    }

    if (item.behavior === "Key Press") {
      await setKeyPressParameter(item.parameter);
      await setImplicitModifiers(item.modifiers || []);
      return;
    }

    const selectWorked = await setSelectParameter(item.parameter);
    if (!selectWorked) {
      console.warn(`No exact visible select option matched parameter "${item.parameter}". Trying visible text input/combobox. Verify manually before saving.`);
      await setTextParameter(item.parameter);
    }
  }

  function printPlan(items) {
    console.group("Charybdis ZMK Studio planned changes");
    console.warn("Safety: this script never clicks Save. Export backup first. Verify every key in Studio before saving.");
    for (const item of items) {
      const modifiers = item.modifiers?.length ? ` modifiers=${item.modifiers.join("+")}` : "";
      console.log(`Layer ${item.layer} x${item.x} y${item.y}: ${item.behavior} ${item.parameter || ""}${modifiers} [${item.label || ""}] - ${item.rationale || ""}`);
    }
    console.groupEnd();
  }

  function printManualSteps(items) {
    console.group("Manual ZMK Studio steps");
    for (const item of items) {
      console.log([
        `Layer ${item.layer}`,
        `click key x${item.x} y${item.y}`,
        `set Behavior = ${item.behavior}`,
        item.parameter ? `set parameter/key = ${item.parameter}` : "no parameter",
        item.modifiers?.length ? `set implicit modifiers = ${item.modifiers.join(", ")}` : "",
        item.label ? `label/check = ${item.label}` : "",
        item.rationale ? `why: ${item.rationale}` : ""
      ].filter(Boolean).join(" | "));
    }
    console.groupEnd();
  }

  const allItems = plannedKeys();
  const layerFilteredItems = APPLY_LAYERS
    ? allItems.filter((item) => APPLY_LAYERS.includes(Number(item.layer)))
    : allItems;
  const modeItems = MODE === "applyLayer" && APPLY_LAYER_INDEX !== "all"
    ? layerFilteredItems.filter((item) => Number(item.layer) === Number(APPLY_LAYER_INDEX))
    : layerFilteredItems;

  if (MODE === "dryRun") {
    validatePlanCoordinates(modeItems);
    validateSupportedBehaviors(modeItems);
    printPlan(modeItems);
    return;
  }

  if (MODE === "manualSteps") {
    validatePlanCoordinates(modeItems);
    validateSupportedBehaviors(modeItems);
    printManualSteps(modeItems);
    return;
  }

  if (MODE === "oneKeyTest") {
    console.warn("ONE KEY TEST: applying exactly one test key. Do not save until manually verified.");
    console.log(ONE_KEY_TEST);
    if (!validatePlanCoordinates([ONE_KEY_TEST]) || !validateSupportedBehaviors([ONE_KEY_TEST])) return;
    await applyItem(ONE_KEY_TEST);
    console.warn("One-key test complete. Verify the key in ZMK Studio. Save manually only if correct.");
    return;
  }

  if (MODE === "applyLayer") {
    if (!ENABLE_LAYER_APPLY) {
      console.error("Layer application is disabled. Set ENABLE_LAYER_APPLY = true only after dryRun and oneKeyTest succeed.");
      printPlan(modeItems);
      return;
    }
    if (!validatePlanCoordinates(modeItems) || !validateSupportedBehaviors(modeItems)) return;
    const confirmed = window.confirm(`Apply ${modeItems.length} planned changes ${APPLY_LAYER_INDEX === "all" ? "across multiple layers" : `to layer ${APPLY_LAYER_INDEX}`}? This will NOT save.`);
    if (!confirmed) {
      console.warn("Cancelled by user.");
      return;
    }
    for (const item of modeItems) {
      console.log("Applying", item);
      await applyItem(item);
    }
    console.warn("Layer apply complete. This script did NOT save. Verify in the UI before saving manually.");
    return;
  }

  throw new Error(`Unknown MODE "${MODE}". Use dryRun, manualSteps, oneKeyTest, or applyLayer.`);
})();






// Restore console and print summary with suggestions
setTimeout(function() {
  if (typeof _origError !== "undefined") {
    console.error = _origError;
    console.warn = _origWarn;
  }
  const errors = window._CHARYBDIS_APPLY_ERRORS || [];
  const total = window.CHARYBDIS_FINAL_LAYOUT?.keyCount || 0;
  console.log("\n" + "=".repeat(60));
  console.log("APPLY SUMMARY");
  console.log("=".repeat(60));
  console.log("Total keys: " + total);
  console.log("Errors: " + errors.length);
  if (errors.length > 0) {
    console.log("\nFAILED KEYS WITH SUGGESTIONS:");
    errors.forEach(function(e) {
      if (typeof e === "object") {
        const pos = e.layer !== undefined ? "L" + e.layer + " (" + e.x + "," + e.y + ")" : "";
        console.log("  " + pos + " " + (e.parameter || ""));
        if (e.candidates && e.candidates.length) {
          console.log("    Candidates: " + e.candidates.join(", "));
        }
        if (e.visibleOptions && e.visibleOptions.length) {
          console.log("    Visible options: " + e.visibleOptions.join(", "));
        }
      } else {
        console.log("  " + e);
      }
    });
    console.log("\nFix these parameter names in export_zmk.py, regenerate, and re-apply.");
  } else {
    console.log("All keys applied or already correct.");
  }
  console.log("=".repeat(60));
}, 2000);




// Restore console and print summary with suggestions
setTimeout(function() {
  if (typeof _origError !== "undefined") {
    console.error = _origError;
    console.warn = _origWarn;
  }
  const errors = window._CHARYBDIS_APPLY_ERRORS || [];
  const total = window.CHARYBDIS_FINAL_LAYOUT?.keyCount || 0;
  console.log("\n" + "=".repeat(60));
  console.log("APPLY SUMMARY");
  console.log("=".repeat(60));
  console.log("Total keys: " + total);
  console.log("Errors: " + errors.length);
  if (errors.length > 0) {
    console.log("\nFAILED KEYS WITH SUGGESTIONS:");
    errors.forEach(function(e) {
      if (typeof e === "object") {
        const pos = e.layer !== undefined ? "L" + e.layer + " (" + e.x + "," + e.y + ")" : "";
        console.log("  " + pos + " " + (e.parameter || ""));
        if (e.candidates && e.candidates.length) {
          console.log("    Candidates: " + e.candidates.join(", "));
        }
        if (e.visibleOptions && e.visibleOptions.length) {
          console.log("    Visible options: " + e.visibleOptions.join(", "));
        }
      } else {
        console.log("  " + e);
      }
    });
    console.log("\nFix these parameter names in export_zmk.py, regenerate, and re-apply.");
  } else {
    console.log("All keys applied or already correct.");
  }
  console.log("=".repeat(60));
}, 2000);




// Restore console and print summary with suggestions
setTimeout(function() {
  if (typeof _origError !== "undefined") {
    console.error = _origError;
    console.warn = _origWarn;
  }
  const errors = window._CHARYBDIS_APPLY_ERRORS || [];
  const total = window.CHARYBDIS_FINAL_LAYOUT?.keyCount || 0;
  console.log("\n" + "=".repeat(60));
  console.log("APPLY SUMMARY");
  console.log("=".repeat(60));
  console.log("Total keys: " + total);
  console.log("Errors: " + errors.length);
  if (errors.length > 0) {
    console.log("\nFAILED KEYS WITH SUGGESTIONS:");
    errors.forEach(function(e) {
      if (typeof e === "object") {
        const pos = e.layer !== undefined ? "L" + e.layer + " (" + e.x + "," + e.y + ")" : "";
        console.log("  " + pos + " " + (e.parameter || ""));
        if (e.candidates && e.candidates.length) {
          console.log("    Candidates: " + e.candidates.join(", "));
        }
        if (e.visibleOptions && e.visibleOptions.length) {
          console.log("    Visible options: " + e.visibleOptions.join(", "));
        }
      } else {
        console.log("  " + e);
      }
    });
    console.log("\nFix these parameter names in export_zmk.py, regenerate, and re-apply.");
  } else {
    console.log("All keys applied or already correct.");
  }
  console.log("=".repeat(60));
}, 2000);




// Restore console and print summary with suggestions
setTimeout(function() {
  if (typeof _origError !== "undefined") {
    console.error = _origError;
    console.warn = _origWarn;
  }
  const errors = window._CHARYBDIS_APPLY_ERRORS || [];
  const total = window.CHARYBDIS_FINAL_LAYOUT?.keyCount || 0;
  console.log("\n" + "=".repeat(60));
  console.log("APPLY SUMMARY");
  console.log("=".repeat(60));
  console.log("Total keys: " + total);
  console.log("Errors: " + errors.length);
  if (errors.length > 0) {
    console.log("\nFAILED KEYS WITH SUGGESTIONS:");
    errors.forEach(function(e) {
      if (typeof e === "object") {
        const pos = e.layer !== undefined ? "L" + e.layer + " (" + e.x + "," + e.y + ")" : "";
        console.log("  " + pos + " " + (e.parameter || ""));
        if (e.candidates && e.candidates.length) {
          console.log("    Candidates: " + e.candidates.join(", "));
        }
        if (e.visibleOptions && e.visibleOptions.length) {
          console.log("    Visible options: " + e.visibleOptions.join(", "));
        }
      } else {
        console.log("  " + e);
      }
    });
    console.log("\nFix these parameter names in export_zmk.py, regenerate, and re-apply.");
  } else {
    console.log("All keys applied or already correct.");
  }
  console.log("=".repeat(60));
}, 2000);




// Restore console and print summary with suggestions
setTimeout(function() {
  if (typeof _origError !== "undefined") {
    console.error = _origError;
    console.warn = _origWarn;
  }
  const errors = window._CHARYBDIS_APPLY_ERRORS || [];
  const total = window.CHARYBDIS_FINAL_LAYOUT?.keyCount || 0;
  console.log("\n" + "=".repeat(60));
  console.log("APPLY SUMMARY");
  console.log("=".repeat(60));
  console.log("Total keys: " + total);
  console.log("Errors: " + errors.length);
  if (errors.length > 0) {
    console.log("\nFAILED KEYS WITH SUGGESTIONS:");
    errors.forEach(function(e) {
      if (typeof e === "object") {
        const pos = e.layer !== undefined ? "L" + e.layer + " (" + e.x + "," + e.y + ")" : "";
        console.log("  " + pos + " " + (e.parameter || ""));
        if (e.candidates && e.candidates.length) {
          console.log("    Candidates: " + e.candidates.join(", "));
        }
        if (e.visibleOptions && e.visibleOptions.length) {
          console.log("    Visible options: " + e.visibleOptions.join(", "));
        }
      } else {
        console.log("  " + e);
      }
    });
    console.log("\nFix these parameter names in export_zmk.py, regenerate, and re-apply.");
  } else {
    console.log("All keys applied or already correct.");
  }
  console.log("=".repeat(60));
}, 2000);

