#!/usr/bin/env node
// Rebuild keybindings_explained.csv from a ZMK Studio verify JSON.
// Usage: node rebuild_csv_from_verify.js <verify.json> [-o output.csv]

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (!args.length || args[0] === "--help") {
  console.log("Usage: node rebuild_csv_from_verify.js <verify.json> [-o output.csv]");
  process.exit(args[0] === "--help" ? 0 : 1);
}

const verifyPath = args[0];
const outIdx = args.indexOf("-o");
const outputPath = outIdx >= 0 && args[outIdx + 1]
  ? args[outIdx + 1]
  : path.join(path.dirname(verifyPath), "keybindings_explained.csv");

const verify = JSON.parse(fs.readFileSync(verifyPath, "utf-8"));
const flatKeys = verify.flatKeys;
if (!flatKeys || !flatKeys.length) {
  console.error("No flatKeys found in verify JSON.");
  process.exit(1);
}

function generatePurpose(row) {
  const b = row.behavior || "";
  const p = row.parameter_summary || "";
  const layer = row.layer;

  if (b.startsWith("coach_")) {
    const desc = {
      coach_l1_hold: "Hold layer 1; role is dynamic in generated layouts.",
      coach_l2_hold: "Hold layer 2; role is dynamic in generated layouts.",
      coach_l3_hold: "Hold layer 3; role is dynamic in generated layouts.",
      coach_l4_hold: "Hold layer 4; role is dynamic in generated layouts.",
      coach_base: "Exit to base layer.",
      coach_recover_base: "Recovery exit to base layer.",
      coach_mouse_lock: "Lock the configured target layer; do not infer a fixed mouse layer from the behavior name.",
      coach_game_lock: "Lock game layer.",
      coach_travel_toggle: "Toggle the configured target layer; role is dynamic in generated layouts.",
      coach_travel_off: "Exit the configured toggled layer.",
    };
    return desc[b] || `Coach behavior: ${b}.`;
  }
  if (b === "Toggle Layer") return `Toggle to ${p}.`;
  if (b === "Momentary Layer") return `Hold for ${p}.`;
  if (b === "To Layer") return `Switch to ${p}.`;
  if (b === "Key Press") return layer === "0" ? "Base typing key." : `Layer ${layer} shortcut.`;
  if (b === "Mouse Key Press") return `Mouse button: ${p}.`;
  if (b === "Transparent") return "Transparent — falls through to layer below.";
  if (b === "None") return "Explicitly no action.";
  return `${b}${p ? ": " + p : ""}.`;
}

function generateUsageNotes(row) {
  const b = row.behavior || "";
  const p = row.parameter_summary || "";
  const mods = row.checked_modifiers || "";

  if (b.startsWith("coach_")) return `Coach beacon: ${b}.`;
  if (b === "Toggle Layer") return `Toggle ${p}.`;
  if (b === "Momentary Layer") return `Momentary ${p}.`;
  if (b === "To Layer") return `To ${p}.`;
  if (b === "Key Press") {
    const parts = [];
    if (mods) parts.push(mods);
    parts.push(p);
    return `Sends ${parts.join("+")}.`;
  }
  if (b === "Transparent") return "";
  if (b === "None") return "";
  return `${b} ${p}`.trim() + ".";
}

function csvEscape(val) {
  const s = String(val ?? "");
  if (s.includes('"') || s.includes(",") || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return '"' + s + '"';
}

const headers = ["layer", "layer_role", "x", "y", "visual_label", "behavior", "parameter", "modifiers", "purpose", "usage_notes"];
const lines = [headers.map(csvEscape).join(",")];

for (const row of flatKeys) {
  if (row.error) continue;
  const csvRow = {
    layer: row.layer,
    layer_role: row.layer_name || `Layer ${row.layer}`,
    x: row.x,
    y: row.y,
    visual_label: row.visual_label || "",
    behavior: row.behavior || "",
    parameter: row.parameter_summary || "",
    modifiers: row.checked_modifiers || "",
    purpose: generatePurpose(row),
    usage_notes: generateUsageNotes(row),
  };
  lines.push(headers.map((h) => csvEscape(csvRow[h])).join(","));
}

fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf-8");
console.log(`Wrote ${lines.length - 1} keys to ${outputPath}`);
