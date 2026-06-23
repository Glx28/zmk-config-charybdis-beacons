#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const host = JSON.parse(fs.readFileSync(path.join(root, "layout/windows_norwegian_host.json"), "utf8"));
const csv = fs.readFileSync(path.join(root, "layout/keybindings_explained.csv"), "utf8");
const lines = csv.trim().split(/\r?\n/).slice(1);
const codeMap = host.event_code_to_zmk;
const keyAlias = host.event_key_to_zmk;

function parseRow(line) {
  const m = line.match(/"((?:[^"]|"")*)"/g);
  if (!m) return null;
  return m.map((s) => s.slice(1, -1).replace(/""/g, '"'));
}

const keyPressRows = [];
for (const line of lines) {
  const cols = parseRow(line);
  if (!cols) continue;
  const [layer, , x, y, label, behavior, param] = cols;
  if (!/key press/i.test(behavior)) continue;
  keyPressRows.push({ layer, x, y, label, param });
}

const zmkToCodes = {};
for (const [code, zmk] of Object.entries(codeMap)) {
  if (!zmkToCodes[zmk]) zmkToCodes[zmk] = [];
  zmkToCodes[zmk].push(code);
}

const aliasZmk = new Set(Object.values(keyAlias));
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

const issues = [];
for (const row of keyPressRows) {
  const p = row.param.replace(/^Keyboard\s+/i, "").trim();
  const tokens = [p, p.split(" and ")[0]];
  const covered = tokens.some(
    (t) =>
      zmkToCodes[t] ||
      aliasZmk.has(t) ||
      letters.includes(t) ||
      /^F\d+$/.test(t) ||
      /^Keypad/.test(t)
  );
  if (!covered) issues.push({ ...row, param: p });
}

const scancodeNO = {
  "SemiColon and Colon": "ø",
  "Left Apos and Double": "æ",
  "Left Brace": "å",
  "Left Bracket": "å (same [ scancode)",
  "Right Bracket": "^ (NO dead key, not ])",
  Backslash: "varies",
  Minus: "+ on unshifted minus key (NO layout)",
};

console.log("=== Coach host-map gaps ===");
if (!issues.length) console.log("None");
else issues.forEach((r) => console.log(`L${r.layer} ${r.x},${r.y} ${r.label} param=${r.param}`));

console.log("\n=== Layer 1 punctuation vs Norwegian Windows output ===");
const progOnL1 = keyPressRows.filter(
  (r) => r.layer === "1" && ["[", "]", "\\", ";", "'", "-"].includes(r.label)
);
for (const r of progOnL1) {
  const out = scancodeNO[r.param] || scancodeNO[r.param.split(" and ")[0]] || "US-like";
  console.log(`L${r.layer} ${r.x},${r.y} label=${r.label} param=${r.param} => NO: ${out}`);
}

console.log("\n=== Base layer Norwegian exceptions ===");
for (const ex of host.norwegian_base_exceptions) {
  console.log(`${ex.x},${ex.y} ${ex.label} code=${ex.event_code} zmk=${ex.zmk_parameter}`);
}

console.log(`\nKey Press rows: ${keyPressRows.length}, event_code entries: ${Object.keys(codeMap).length}`);