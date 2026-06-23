#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "scripts/zmk-studio/apply_every_key.js"), "utf8");
const m = js.match(/window\.CHARYBDIS_FINAL_LAYOUT\s*=\s*(\{[\s\S]*?\n\})\s*;/);
if (!m) throw new Error("Could not locate CHARYBDIS_FINAL_LAYOUT object");
const obj = Function(`return ${m[1]}`)();

function keyOf(k) {
  return `${k.layer}:${k.x}:${k.y}`;
}

const jsMap = new Map(obj.keys.map((k) => [keyOf(k), k]));

const EXIT = {
  "1:5:4": "coach_base",
  "2:5:4": "coach_base",
  "2:7:4": "coach_base",
  "2:8:4": "coach_base",
  "7:3:4": "coach_base",
  "7:5:4": "coach_base",
  "7:7:4": "coach_base",
  "7:8:4": "coach_base",
  "8:7:4": "coach_travel_off",
  "8:8:4": "coach_travel_off",
};

const NORWEGIAN_L0 = {
  "0:11:2": { behavior: "Key Press", parameter: "Keyboard SemiColon and Colon", label: "ø" },
  "0:12:2": { behavior: "Key Press", parameter: "Keyboard Left Apos and Double", label: "æ" },
  "0:12:1": { behavior: "Key Press", parameter: "Keyboard Left Brace", label: "å" },
  "0:12:3": { behavior: "Key Press", parameter: "Keyboard Backslash and Pipe", label: "\\" },
  "0:10:3": {
    behavior: "Key Press",
    parameter: ["Keyboard Period", "Keyboard Period and GreaterThan"],
    label: ".",
  },
};

const L1_PROG = {
  "1:9:3": ["Keyboard Left Bracket", "Keyboard Left Brace"],
  "1:10:3": ["Keyboard Right Bracket", "Keyboard Right Brace"],
  "1:11:3": ["Keyboard Backslash", "Keyboard Backslash and Pipe"],
  "1:12:3": ["Keyboard Minus", "Keyboard Dash and Underscore"],
};

const COACH_ENTRY = {
  "1:0:1": "coach_game_lock",
  "3:12:2": "coach_game_lock",
  "3:10:2": "coach_mouse_lock",
  "1:4:2": "coach_travel_toggle",
  "3:11:2": "coach_travel_toggle",
};

const issues = [];

for (const [k, exp] of Object.entries(EXIT)) {
  const j = jsMap.get(k);
  if (!j) issues.push(`MISSING exit key ${k}`);
  else if (j.behavior !== exp) issues.push(`EXIT ${k}: got ${j.behavior}, want ${exp}`);
}

for (const [k, exp] of Object.entries(NORWEGIAN_L0)) {
  const j = jsMap.get(k);
  if (!j) issues.push(`MISSING Norwegian L0 ${k}`);
  else {
    if (j.behavior !== exp.behavior) issues.push(`NO L0 behavior ${k}: ${j.behavior}`);
    const params = Array.isArray(exp.parameter) ? exp.parameter : [exp.parameter];
    if (!params.includes(j.parameter)) issues.push(`NO L0 param ${k}: ${j.parameter} (want ${params.join(" or ")})`);
    if (j.label !== exp.label) issues.push(`NO L0 label ${k}: ${j.label} (want ${exp.label})`);
  }
}

for (const [k, params] of Object.entries(L1_PROG)) {
  const j = jsMap.get(k);
  const allowed = Array.isArray(params) ? params : [params];
  if (!j) issues.push(`MISSING L1 prog ${k}`);
  else if (!allowed.includes(j.parameter)) issues.push(`L1 prog ${k}: ${j.parameter} (want ${allowed.join(" or ")})`);
}

for (const [k, exp] of Object.entries(COACH_ENTRY)) {
  const j = jsMap.get(k);
  if (!j) issues.push(`MISSING coach entry ${k}`);
  else if (j.behavior !== exp) issues.push(`COACH entry ${k}: ${j.behavior} (want ${exp})`);
}

// No plain To Layer 0 left anywhere
for (const k of obj.keys) {
  if (k.behavior === "To Layer" && String(k.parameter) === "0") {
    issues.push(`STALE To Layer 0 at ${keyOf(k)} (${k.label})`);
  }
}

console.log("=== apply_every_key.js audit ===\n");
if (!issues.length) {
  console.log("PASS: exits, Norwegian L0, L1 punctuation, coach entries, no plain To Layer 0");
  process.exit(0);
}
issues.forEach((i) => console.log("FAIL:", i));
console.log(`\n${issues.length} issue(s)`);
process.exit(1);