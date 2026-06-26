#!/usr/bin/env node
/*
Layout sync: propagates the canonical layout CSV to all downstream consumers.

Usage:
  node scripts/zmk-studio/sync_layout.js [--dry-run]

What it does:
1. Reads layout/keybindings_explained.csv (canonical source of truth).
2. Regenerates the EXPECTED_CSV inside verify_every_key.js to match.
3. Copies the canonical CSV to ../charybdis-coach/data/keybindings_explained.csv.
4. Cross-checks apply_every_key.js keys against the canonical CSV.
5. Reports mismatches between apply script and canonical CSV.

Run this EVERY TIME the layout changes, before committing.
*/

const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");

const REPO_ROOT = path.resolve(__dirname, "../..");
const CANONICAL_CSV_PATH = path.join(REPO_ROOT, "layout/keybindings_explained.csv");
const VERIFY_SCRIPT_PATH = path.join(REPO_ROOT, "scripts/zmk-studio/verify_every_key.js");
const APPLY_SCRIPT_PATH = path.join(REPO_ROOT, "scripts/zmk-studio/apply_every_key.js");
const COACH_CSV_PATH = path.resolve(REPO_ROOT, "../charybdis-coach/data/keybindings_explained.csv");
const KEY_NAMES_PATH = path.join(REPO_ROOT, "scripts/zmk-studio/zmk_studio_key_names.json");

function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const next = line[i + 1];
    if (ch === '"' && quoted && next === '"') { cur += '"'; i++; }
    else if (ch === '"') quoted = !quoted;
    else if (ch === ',' && !quoted) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

function parseCsv(text) {
  const lines = text.trim().replace(/\r\n/g, "\n").split("\n");
  const headers = splitCsvLine(lines.shift());
  return lines.filter(Boolean).map((line) => {
    const values = splitCsvLine(line);
    const row = {};
    headers.forEach((h, i) => row[h] = values[i] || "");
    return row;
  });
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

// Map canonical CSV parameter shorthand to full ZMK Studio key names
const PARAMETER_TO_STUDIO = {
  "Escape": "Keyboard Escape",
  "Tab": "Keyboard Tab",
  "Spacebar": "Keyboard Spacebar",
  "Return Enter": "Keyboard Return Enter",
  "Delete": "Keyboard Delete",
  "Delete Forward": "Keyboard Delete Forward",
  "LeftShift": "Keyboard LeftShift",
  "LeftControl": "Keyboard LeftControl",
  "LeftAlt": "Keyboard LeftAlt",
  "Left GUI": "Keyboard Left GUI",
  "RightShift": "Keyboard RightShift",
  "RightControl": "Keyboard RightControl",
  "RightAlt": "Keyboard RightAlt",
  "Right GUI": "Keyboard Right GUI",
  "LeftArrow": "Keyboard LeftArrow",
  "RightArrow": "Keyboard RightArrow",
  "UpArrow": "Keyboard UpArrow",
  "DownArrow": "Keyboard DownArrow",
  "Home": "Keyboard Home",
  "End": "Keyboard End",
  "PageUp": "Keyboard PageUp",
  "PageDown": "Keyboard PageDown",
  "PrintScreen": "Keyboard PrintScreen",
  "Backslash and Pipe": "Keyboard Backslash and Pipe",
  "ForwardSlash and QuestionMark": "Keyboard ForwardSlash and QuestionMark",
  "SemiColon and Colon": "Keyboard SemiColon and Colon",
  "Left Apos and Double": "Keyboard Left Apos and Double",
  "Left Brace": "Keyboard Left Brace",
  "Right Brace": "Keyboard Right Brace",
  "Dash and Underscore": "Keyboard Dash and Underscore",
  "Equals and Plus": "Keyboard Equals and Plus",
  "Grave Accent and Tilde": "Keyboard Grave Accent and Tilde",
  "Comma and LessThan": "Keyboard Comma and LessThan",
  "Period and GreaterThan": "Keyboard Period and GreaterThan",
  "Period": "Keyboard Period",
  "Minus": "Keyboard Dash and Underscore",
  "Equal": "Keyboard Equals and Plus",
  "Equal and Plus": "Keyboard Equals and Plus",
  "Equals and Plus": "Keyboard Equals and Plus",
  "Left Bracket": "Keyboard Left Brace",
  "Right Bracket": "Keyboard Right Brace",
  "Backslash": "Keyboard Backslash and Pipe",
  "Print Screen": "Keyboard PrintScreen and SysReq",
  "PrintScreen": "Keyboard PrintScreen and SysReq",
  "Apostrophe": "Keyboard Left Apos and Double",
  "Enter": "Keyboard Return Enter",
  "Space": "Keyboard Spacebar",
  "LeftGUI": "Keyboard Left GUI",
  "<": "Keyboard Comma and LessThan",
  ">": "Keyboard Period and GreaterThan",
  "?": "Keyboard ForwardSlash and QuestionMark",
  "{": "Keyboard Left Brace",
  "}": "Keyboard Right Brace",
  "_": "Keyboard Dash and Underscore",
  "=": "Keyboard Equals and Plus",
  ":": "Keyboard SemiColon and Colon",
  "`": "Keyboard Grave Accent and Tilde",
  "|": "Keyboard Backslash and Pipe",
  "0": "Keyboard 0 and Right Bracket",
  "1": "Keyboard 1 and Bang",
  "2": "Keyboard 2 and At",
  "3": "Keyboard 3 and Hash",
  "4": "Keyboard 4 and Dollar",
  "5": "Keyboard 5 and Percent",
  "6": "Keyboard 6 and Caret",
  "7": "Keyboard 7 and Ampersand",
  "8": "Keyboard 8 and Star",
  "9": "Keyboard 9 and Left Bracket",
};

function canonicalParamToStudioName(param) {
  if (!param) return "";
  if (PARAMETER_TO_STUDIO[param]) return PARAMETER_TO_STUDIO[param];
  if (param.startsWith("Keyboard ") || param.startsWith("Keypad ")) return param;
  // Single letter or number+symbol
  if (/^[A-Z]$/i.test(param)) return `Keyboard ${param.toUpperCase()}`;
  if (/^\d+ and /.test(param)) return `Keyboard ${param}`;
  if (/^F\d+$/i.test(param)) return `Keyboard ${param.toUpperCase()}`;
  return param;
}

function canonicalToVerifierRow(row) {
  const behavior = row.behavior || "Transparent";
  const param = row.parameter || "";
  const mods = row.modifiers || "";

  const studioParam = canonicalParamToStudioName(param);
  const modList = mods.split(",").map(m => m.trim()).filter(Boolean);
  const modPrefix = modList.length ? modList.join("+") + "+" : "";

  let paramSummary = "";
  if (behavior === "Key Press") {
    paramSummary = modPrefix ? `${modPrefix}${studioParam}` : studioParam;
  } else if (behavior === "Transparent" || behavior === "None") {
    paramSummary = "default_transform";
  } else {
    paramSummary = "default_transform";
  }

  let textParams = "";
  let selectParams = "";
  if (behavior === "Key Press") {
    textParams = `default_transform: | Key::${studioParam}`;
    selectParams = "default_transform:default_transform";
  } else if (behavior === "Momentary Layer" || behavior === "To Layer" || behavior === "Toggle Layer") {
    textParams = "default_transform:";
    const layerMatch = param.match(/(\d+)/);
    selectParams = layerMatch
      ? `default_transform:default_transform | Layer::${layerMatch[1]}`
      : "default_transform:default_transform";
  } else if (behavior === "Mouse Key Press") {
    textParams = "default_transform:";
    selectParams = `default_transform:default_transform | select:${param || "MB1"}`;
  } else if (behavior === "Bluetooth") {
    const profileMatch = param.match(/(\d+)/);
    textParams = profileMatch
      ? `default_transform: | Profile::${profileMatch[1]}`
      : "default_transform:";
    selectParams = "default_transform:default_transform | select:Select Profile";
  } else if (behavior === "Output Selection") {
    textParams = "default_transform:";
    selectParams = `default_transform:default_transform | select:${param || "Toggle Outputs"}`;
  } else {
    textParams = "default_transform:";
    selectParams = "default_transform:default_transform";
  }

  return {
    layer: row.layer,
    layer_name: row.layer,
    x: row.x,
    y: row.y,
    visual_label: row.visual_label || "",
    visual_text: behavior,
    visual_behavior: behavior,
    behavior: behavior,
    parameter_summary: paramSummary,
    text_parameters: textParams,
    select_parameters: selectParams,
    checked_modifiers: mods.split(",").map(m => m.trim()).filter(Boolean).join("+")
  };
}

function verifierRowToCsvLine(row) {
  const fields = [
    "layer", "layer_name", "x", "y", "visual_label", "visual_text",
    "visual_behavior", "behavior", "parameter_summary", "text_parameters",
    "select_parameters", "checked_modifiers"
  ];
  return fields.map(f => csvEscape(row[f])).join(",");
}

// ---- Main ----

console.log("=== Charybdis Layout Sync ===\n");

// 1. Read canonical CSV
if (!fs.existsSync(CANONICAL_CSV_PATH)) {
  console.error(`ERROR: Canonical CSV not found: ${CANONICAL_CSV_PATH}`);
  process.exit(1);
}
const canonicalText = fs.readFileSync(CANONICAL_CSV_PATH, "utf8");
const canonicalRows = parseCsv(canonicalText);
console.log(`Canonical CSV: ${canonicalRows.length} keys from ${CANONICAL_CSV_PATH}`);

// 2. Generate verifier EXPECTED_CSV
const verifierHeader = '"layer","layer_name","x","y","visual_label","visual_text","visual_behavior","behavior","parameter_summary","text_parameters","select_parameters","checked_modifiers"';
const verifierLines = [verifierHeader];
for (const row of canonicalRows) {
  verifierLines.push(verifierRowToCsvLine(canonicalToVerifierRow(row)));
}
const newExpectedCsv = verifierLines.join("\\r\\n");

// Update verify_every_key.js
if (fs.existsSync(VERIFY_SCRIPT_PATH)) {
  const verifyScript = fs.readFileSync(VERIFY_SCRIPT_PATH, "utf8");
  const csvMatch = verifyScript.match(/(const EXPECTED_CSV = ")([\s\S]*?)(";?\s*\n)/);
  if (csvMatch) {
    const escapedCsv = newExpectedCsv.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const newVerifyScript = verifyScript.substring(0, csvMatch.index) +
      `const EXPECTED_CSV = "${escapedCsv}";\n` +
      verifyScript.substring(csvMatch.index + csvMatch[0].length);
    if (DRY_RUN) {
      console.log(`[DRY RUN] Would update verifier EXPECTED_CSV (${canonicalRows.length} rows)`);
    } else {
      fs.writeFileSync(VERIFY_SCRIPT_PATH, newVerifyScript, "utf8");
      console.log(`Updated verifier EXPECTED_CSV: ${canonicalRows.length} rows`);
    }
  } else {
    console.error("ERROR: Could not find EXPECTED_CSV in verify_every_key.js");
  }
} else {
  console.warn(`WARN: Verifier not found: ${VERIFY_SCRIPT_PATH}`);
}

// 3. Copy canonical CSV to coach
if (fs.existsSync(path.dirname(COACH_CSV_PATH))) {
  const currentCoach = fs.existsSync(COACH_CSV_PATH) ? fs.readFileSync(COACH_CSV_PATH, "utf8") : "";
  if (currentCoach === canonicalText) {
    console.log("Coach CSV: already in sync");
  } else if (DRY_RUN) {
    console.log(`[DRY RUN] Would copy canonical CSV to coach`);
  } else {
    fs.writeFileSync(COACH_CSV_PATH, canonicalText, "utf8");
    console.log(`Copied canonical CSV to coach: ${COACH_CSV_PATH}`);
  }
} else {
  console.warn(`WARN: Coach data dir not found: ${path.dirname(COACH_CSV_PATH)}`);
}

// 4. Cross-check apply_every_key.js
if (fs.existsSync(APPLY_SCRIPT_PATH)) {
  const applyScript = fs.readFileSync(APPLY_SCRIPT_PATH, "utf8");
  const keysMatch = applyScript.match(/"keys"\s*:\s*\[/);
  if (keysMatch) {
    // Extract the keys array by finding matching bracket (string-aware)
    let depth = 0, start = keysMatch.index + keysMatch[0].length - 1;
    let i = start;
    let inString = false;
    for (; i < applyScript.length; i++) {
      const ch = applyScript[i];
      if (ch === '"') {
        let backslashes = 0;
        for (let j = i - 1; j >= 0 && applyScript[j] === '\\'; j--) backslashes++;
        if (backslashes % 2 === 0) inString = !inString;
        continue;
      }
      if (inString) continue;
      if (ch === "[") depth++;
      else if (ch === "]") { depth--; if (depth === 0) break; }
    }
    try {
      const keysJson = applyScript.substring(start, i + 1);
      const applyKeys = JSON.parse(keysJson);
      console.log(`Apply script: ${applyKeys.length} keys`);

      // Build canonical lookup
      const canonicalByCoord = new Map();
      for (const row of canonicalRows) {
        canonicalByCoord.set(`${row.layer}:${row.x}:${row.y}`, row);
      }

      // Build apply lookup
      const applyByCoord = new Map();
      for (const key of applyKeys) {
        applyByCoord.set(`${key.layer}:${key.x}:${key.y}`, key);
      }

      // Load known key names for validation
      let knownNames = null;
      if (fs.existsSync(KEY_NAMES_PATH)) {
        knownNames = new Set(JSON.parse(fs.readFileSync(KEY_NAMES_PATH, "utf8")).key_names);
      }

      let mismatches = 0;
      let missingInApply = 0;
      let extraInApply = 0;

      for (const [coord, canonical] of canonicalByCoord) {
        const apply = applyByCoord.get(coord);
        if (!apply) {
          // Non-Transparent keys missing from apply script are worth flagging
          if (canonical.behavior && canonical.behavior !== "Transparent") {
            console.warn(`  MISSING in apply: ${coord} (${canonical.visual_label} / ${canonical.behavior})`);
            missingInApply++;
          }
          continue;
        }

        if (canonical.behavior === "Key Press" && apply.behavior === "Key Press") {
          const expectedParam = canonicalParamToStudioName(canonical.parameter);
          const normalizeParam = p => p.replace(/^Keyboard\s+/, "").replace(/^Keypad\s+/, "")
            .replace(/\s+and\s+\S+/gi, "").toUpperCase().trim();
          if (apply.parameter !== expectedParam && normalizeParam(apply.parameter) !== normalizeParam(expectedParam)) {
            console.warn(`  PARAM MISMATCH ${coord}: canonical="${expectedParam}" apply="${apply.parameter}"`);
            mismatches++;
          }
          // Check modifiers
          const normMod = m => m.trim().replace(/^Left\s+/i, "L ").replace(/^Right\s+/i, "R ");
          const canonModsRaw = typeof canonical.modifiers === "string"
            ? canonical.modifiers.split(/[,+]/) : (canonical.modifiers || []);
          const applyModsRaw = typeof apply.modifiers === "string"
            ? apply.modifiers.split(/[,+]/) : (apply.modifiers || []);
          const canonMods = canonModsRaw.map(m => normMod(m)).filter(Boolean).sort().join("+");
          const applyMods = applyModsRaw.map(m => normMod(m)).filter(Boolean).sort().join("+");
          if (canonMods !== applyMods) {
            console.warn(`  MOD MISMATCH ${coord}: canonical="${canonMods}" apply="${applyMods}"`);
            mismatches++;
          }
          // Validate parameter against known Studio names
          if (knownNames && apply.parameter && apply.parameter.startsWith("Keyboard ") && !knownNames.has(apply.parameter)) {
            console.warn(`  UNKNOWN KEY NAME in apply: ${coord} "${apply.parameter}"`);
            mismatches++;
          }
        }
      }

      for (const [coord] of applyByCoord) {
        if (!canonicalByCoord.has(coord)) {
          extraInApply++;
        }
      }

      console.log(`\nCross-check: ${mismatches} mismatches, ${missingInApply} missing non-transparent, ${extraInApply} extra in apply`);
      if (mismatches > 0) {
        console.error("\nERROR: Apply script and canonical CSV are out of sync!");
        if (!DRY_RUN) process.exitCode = 1;
      }
    } catch (e) {
      console.error("ERROR parsing apply script keys:", e.message);
    }
  }
} else {
  console.warn(`WARN: Apply script not found: ${APPLY_SCRIPT_PATH}`);
}

console.log("\n=== Sync complete ===");
if (DRY_RUN) console.log("(dry run — no files modified)");
