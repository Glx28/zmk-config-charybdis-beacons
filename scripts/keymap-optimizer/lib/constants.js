const LEFT_COLS = [0, 1, 2, 3, 4, 5];
const RIGHT_COLS = [7, 8, 9, 10, 11, 12];
const ALL_COLS = [...LEFT_COLS, ...RIGHT_COLS];
const FINGER_ROWS = [0, 1, 2, 3];
const THUMB_ROWS = [4, 5];
const ALL_ROWS = [...FINGER_ROWS, ...THUMB_ROWS];

const ROW_COMFORT = { 0: 3, 1: 2, 2: 1, 3: 2, 4: 4, 5: 5 };
const COL_EFFORT = { 0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 1, 7: 1, 8: 0, 9: 1, 10: 2, 11: 3, 12: 4 };

const FINGER_MAP = {
  0: "far_pinky", 1: "pinky", 2: "ring", 3: "middle", 4: "index", 5: "index_stretch",
  7: "index_stretch", 8: "index", 9: "middle", 10: "ring", 11: "pinky", 12: "far_pinky"
};

const LAYER_NAMES = {
  0: "Base QWERTY", 1: "Navigation", 2: "Mouse QoL", 3: "Window/App",
  4: "System/BT", 5: "Reserved", 6: "Scroll", 7: "Game/RPG",
  8: "Speed/Travel", 9: "Reserved", 10: "Reserved"
};

const LAYER_ACCESS = {
  1: { thumb: "left", key: { x: 3, y: 4 }, method: "momentary", behavior: "coach_l1_hold" },
  2: { thumb: "left", key: { x: 5, y: 5 }, method: "momentary_or_locked", behavior: "coach_l2_hold" },
  3: { thumb: "right", key: { x: 8, y: 4 }, method: "momentary", behavior: "coach_l3_hold" },
  4: { thumb: "right", key: { x: 7, y: 4 }, method: "momentary", behavior: "coach_l4_hold" },
  6: { thumb: null, key: null, method: "toggled", behavior: "Toggle Layer" },
  7: { thumb: null, key: null, method: "locked", behavior: "coach_game_lock" },
  8: { thumb: null, key: null, method: "toggled", behavior: "coach_travel_toggle" },
};

const LAYER_CONTEXTS = [
  { name: "base", stack: [0], thumbBusy: null },
  { name: "nav", stack: [1, 0], thumbBusy: "left" },
  { name: "mouse_hold", stack: [2, 0], thumbBusy: "left" },
  { name: "mouse_locked", stack: [2, 0], thumbBusy: null },
  { name: "window", stack: [3, 0], thumbBusy: "right" },
  { name: "system", stack: [4, 0], thumbBusy: "right" },
  { name: "scroll_from_base", stack: [6, 0], thumbBusy: null },
  { name: "scroll_from_nav", stack: [6, 1, 0], thumbBusy: "left" },
  { name: "scroll_from_mouse", stack: [6, 2, 0], thumbBusy: null },
  { name: "game", stack: [7, 0], thumbBusy: null },
  { name: "speed", stack: [8, 0], thumbBusy: null },
  { name: "speed_from_mouse", stack: [8, 2, 0], thumbBusy: null },
];

const COACH_BEHAVIORS = new Set([
  "coach_l1_hold", "coach_l2_hold", "coach_l3_hold", "coach_l4_hold",
  "coach_mouse_lock", "coach_game_lock", "coach_base",
  "coach_travel_toggle", "coach_travel_off", "coach_recover_base",
]);

function effort(x, y) {
  return (ROW_COMFORT[y] || 5) + (COL_EFFORT[x] || 5);
}

function hand(x) {
  return LEFT_COLS.includes(Number(x)) ? "left" : "right";
}

function isTransparent(behavior) {
  return /^transparent$/i.test(String(behavior).trim());
}

function isNone(behavior) {
  return /^none$/i.test(String(behavior).trim());
}

module.exports = {
  LEFT_COLS, RIGHT_COLS, ALL_COLS, FINGER_ROWS, THUMB_ROWS, ALL_ROWS,
  ROW_COMFORT, COL_EFFORT, FINGER_MAP, LAYER_NAMES, LAYER_ACCESS, LAYER_CONTEXTS,
  COACH_BEHAVIORS, effort, hand, isTransparent, isNone,
};
