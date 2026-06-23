#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const csv = fs.readFileSync(path.join(root, "layout/keybindings_explained.csv"), "utf8");

function parseRow(line) {
  const m = line.match(/"((?:[^"]|"")*)"/g);
  if (!m) return null;
  return m.map((s) => s.slice(1, -1).replace(/""/g, '"'));
}

const EXPECTED = {
  "1:5:4": { behavior: "coach_base", why: "Nav thumb home — must clear locked/toggled coach state" },
  "2:5:4": { behavior: "coach_base", why: "Mouse lock exit" },
  "2:7:4": { behavior: "coach_base", why: "Mouse lock exit" },
  "2:8:4": { behavior: "coach_base", why: "Mouse lock exit" },
  "7:3:4": { behavior: "coach_base", why: "Game lock exit" },
  "7:5:4": { behavior: "coach_base", why: "Game lock exit" },
  "7:7:4": { behavior: "coach_base", why: "Game lock exit" },
  "7:8:4": { behavior: "coach_base", why: "Game lock exit" },
  "8:7:4": { behavior: "coach_travel_off", why: "Speed overlay exit (toggled L8)" },
  "8:8:4": { behavior: "coach_travel_off", why: "Speed overlay exit (toggled L8)" },
};

const rows = [];
for (const line of csv.trim().split(/\r?\n/).slice(1)) {
  const cols = parseRow(line);
  if (!cols) continue;
  const [layer, , x, y, label, behavior, param] = cols;
  const key = `${layer}:${x}:${y}`;
  if (!EXPECTED[key]) continue;
  rows.push({ key, layer, x, y, label, behavior, param, expected: EXPECTED[key] });
}

let ok = 0;
let bad = 0;
for (const r of rows) {
  const match = r.behavior.toLowerCase() === r.expected.behavior;
  if (match) {
    ok++;
    console.log(`OK  L${r.layer} ${r.x},${r.y} ${r.label} -> ${r.behavior}`);
  } else {
    bad++;
    console.log(`BAD L${r.layer} ${r.x},${r.y} ${r.label} -> ${r.behavior} (want ${r.expected.behavior}) — ${r.expected.why}`);
  }
}

const missing = Object.keys(EXPECTED).filter((k) => !rows.find((r) => r.key === k));
for (const k of missing) console.log(`MISSING ${k} in CSV`);

console.log(`\n${ok} correct, ${bad} wrong, ${missing.length} missing`);
process.exit(bad || missing.length ? 1 : 0);