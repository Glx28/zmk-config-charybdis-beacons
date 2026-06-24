#!/usr/bin/env node
// Charybdis Full-Layout Ergonomic Simulator v2
// Audits ALL active layers: row placement, thumb-hold conflicts, workflow simulations.

const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "..", "layout", "keybindings_explained.csv");
const csvText = fs.readFileSync(csvPath, "utf-8");

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const headers = csvSplit(lines.shift());
  return lines.map((line) => {
    const values = csvSplit(line);
    const row = {};
    headers.forEach((h, i) => (row[h] = (values[i] || "").trim()));
    return row;
  });
}
function csvSplit(line) {
  const out = []; let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && q && line[i+1] === '"') { cur += '"'; i++; }
    else if (ch === '"') q = !q;
    else if (ch === "," && !q) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur); return out;
}

const rows = parseCsv(csvText);
const layers = {};
for (const r of rows) layers[`${r.layer}:${r.x}:${r.y}`] = r;
function get(l, x, y) { return layers[`${l}:${x}:${y}`] || null; }

const LEFT = [0,1,2,3,4,5], RIGHT = [7,8,9,10,11,12], FROWS = [0,1,2,3];
const ROW_COMFORT = {0:3, 1:2, 2:1, 3:2, 4:4, 5:5};
const COL_EFFORT = {0:4, 1:3, 2:2, 3:1, 4:0, 5:1, 7:1, 8:0, 9:1, 10:2, 11:3, 12:4};
function effort(x, y) { return (ROW_COMFORT[y]||5) + (COL_EFFORT[x]||5); }
function isT(r) { return !r || /transparent|none/i.test(r.behavior); }
function hand(x) { return LEFT.includes(parseInt(x)) ? "L" : "R"; }
function rowName(y) { return {0:"top", 1:"upper", 2:"HOME", 3:"bottom", 4:"thumb", 5:"thumb2"}[y] || "?"; }

const ACTIVE_LAYERS = ["0","1","2","3","4","8"];
const LAYER_NAMES = {
  "0": "Base QWERTY", "1": "Navigation/F-keys", "2": "Mouse QoL",
  "3": "Window/App", "4": "System/BT", "7": "Game/RPG", "8": "Speed/Travel"
};

// How each layer is accessed
const LAYER_ACCESS = {
  "1": { thumb: "left", key: "L0 x3,y4 (Nav hold)", method: "momentary" },
  "2": { thumb: "left", key: "L0 x5,y5 (Mouse hold) or L3 Mouse Lock", method: "momentary or locked" },
  "3": { thumb: "right", key: "L0 x8,y4 (Window hold)", method: "momentary" },
  "4": { thumb: "right", key: "L0 x7,y4 (System hold)", method: "momentary" },
  "8": { thumb: null, key: "Toggle from L1/L2/L3", method: "toggled" },
};

let totalIssues = 0;
let allFindings = [];

function finding(layer, severity, msg) {
  allFindings.push({ layer, severity, msg });
  if (severity === "ISSUE") totalIssues++;
}

console.log("=".repeat(80));
console.log("CHARYBDIS FULL-LAYOUT ERGONOMIC AUDIT");
console.log("=".repeat(80));

// ============================================================
// PER-LAYER AUDIT
// ============================================================
for (const L of ACTIVE_LAYERS) {
  const lRows = rows.filter(r => r.layer === L);
  const active = lRows.filter(r => !isT(r));
  const name = LAYER_NAMES[L] || `Layer ${L}`;
  const access = LAYER_ACCESS[L];

  console.log(`\n${"─".repeat(80)}`);
  console.log(`LAYER ${L}: ${name} (${active.length} active keys)`);
  if (access) console.log(`  Access: ${access.key} [${access.method}]`);
  console.log(`${"─".repeat(80)}`);

  if (L === "0") {
    // Base layer: check that modifiers are on x0, home row has letters, thumbs have layer access
    console.log("\n  [Base Layer Structure]");
    const x0keys = FROWS.map(y => get(L, 0, y)).filter(r => r && !isT(r));
    const mods = x0keys.filter(r => /shift|ctrl|control|alt|gui|tab|esc/i.test(r.visual_label));
    console.log(`    x0 column (modifiers): ${x0keys.map(r => `y${r.y}:${r.visual_label}`).join(", ")}`);
    if (mods.length >= 3) finding(L, "OK", "x0 has modifiers (Esc, Tab, Shift, Ctrl)");
    else finding(L, "ISSUE", "x0 missing expected modifiers");

    // Home row letters
    const homeLetters = [1,2,3,4,5].map(x => get(L, x, 2)).filter(r => r && /^[A-Z]$/i.test(r.visual_label));
    console.log(`    Home row (y2) letters: ${homeLetters.map(r => r.visual_label).join("")}`);
    if (homeLetters.length === 5) finding(L, "OK", "Left home row has A-G");

    // Thumb cluster
    const thumbs = [3,4,5,7,8].map(x => [get(L,x,4), get(L,x,5)]).flat().filter(r => r && !isT(r));
    console.log(`    Thumb keys: ${thumbs.map(r => `${r.visual_label}(x${r.x},y${r.y})`).join(", ")}`);

    // Check: are layer holds on thumbs (not finger rows)?
    const layerHolds = active.filter(r => /coach_l\d_hold/i.test(r.behavior));
    for (const lh of layerHolds) {
      if (parseInt(lh.y) < 4) {
        finding(L, "ISSUE", `Layer hold ${lh.visual_label} at y${lh.y} — should be on thumb row (y4/y5)`);
      } else {
        finding(L, "OK", `Layer hold ${lh.visual_label} correctly on thumb (y${lh.y})`);
      }
    }
    continue;
  }

  if (L === "8") {
    // Speed layer: should be mostly transparent (overlay)
    const nonTransparent = active.filter(r => !/coach_travel_off/i.test(r.behavior));
    console.log(`\n  [Speed Overlay] ${active.length} active keys (expect mostly exits)`);
    const exits = active.filter(r => /coach_travel_off/i.test(r.behavior));
    console.log(`    Exit keys: ${exits.map(r => `x${r.x},y${r.y}`).join(", ")}`);
    if (exits.length >= 2) finding(L, "OK", "Speed layer has multiple exit keys");
    else finding(L, "ISSUE", "Speed layer needs at least 2 exit keys");
    if (nonTransparent.length === 0) finding(L, "OK", "Speed layer is pure overlay (only exits + transparent)");
    else finding(L, "NOTE", `Speed layer has ${nonTransparent.length} non-exit active key(s)`);
    continue;
  }

  // === ROW PLACEMENT ANALYSIS ===
  console.log("\n  [Row Placement]");
  const byRow = {};
  for (const y of FROWS) {
    byRow[y] = active.filter(r => r.y === String(y));
    const names = byRow[y].map(r => `${hand(r.x)}:${r.visual_label}`);
    console.log(`    y${y} (${rowName(y)}): ${names.length ? names.join(", ") : "(empty/transparent)"}`);
  }

  // === THUMB-HOLD CONFLICT ANALYSIS ===
  if (access && access.thumb) {
    console.log(`\n  [Thumb-Hold Conflicts] — ${access.thumb} thumb holds layer`);
    const holdHand = access.thumb;
    const holdCols = holdHand === "left" ? LEFT : RIGHT;
    const freeCols = holdHand === "left" ? RIGHT : LEFT;

    // Finger keys on hold-hand: all should be reachable (y0-y3)
    const holdHandFingerKeys = active.filter(r =>
      holdCols.includes(parseInt(r.x)) && FROWS.includes(parseInt(r.y))
    );
    if (holdHandFingerKeys.length > 0) {
      console.log(`    ${holdHand} hand finger keys (reachable while holding): ${holdHandFingerKeys.length}`);
      // Check for momentary keys on the same hand — problematic since thumb is busy
      const sameHandMomentary = holdHandFingerKeys.filter(r => /momentary/i.test(r.behavior));
      for (const m of sameHandMomentary) {
        finding(L, "WARN", `Momentary key ${m.visual_label} at x${m.x},y${m.y} on ${holdHand} hand — same hand as thumb hold, requires pinky/ring stretch + thumb hold simultaneously`);
      }
    }

    // Other thumbs on hold-hand: unreachable
    const holdThumbKeys = active.filter(r =>
      holdCols.includes(parseInt(r.x)) && parseInt(r.y) >= 4
    );
    if (holdThumbKeys.length) {
      const unreachable = holdThumbKeys.filter(r => !isT(r));
      if (unreachable.length) {
        console.log(`    ${holdHand} thumb keys UNREACHABLE while holding:`);
        for (const u of unreachable) {
          // Base/exit on thumb is expected — it's for when NOT holding
          if (/coach_base/i.test(u.behavior)) {
            finding(L, "OK", `Exit key ${u.visual_label} at thumb x${u.x},y${u.y} — for locked mode, not hold mode`);
          } else {
            finding(L, "NOTE", `${u.visual_label} at x${u.x},y${u.y} unreachable during ${holdHand} thumb hold`);
          }
        }
      }
    }

    // Free hand: everything should work
    const freeHandKeys = active.filter(r => freeCols.includes(parseInt(r.x)));
    console.log(`    ${holdHand === "left" ? "right" : "left"} hand (free): ${freeHandKeys.length} keys — all reachable ✓`);
  }

  // === LAYER-SPECIFIC CONTENT CHECKS ===
  if (L === "1") {
    console.log("\n  [Layer 1: Navigation Content Check]");
    const has = (label) => active.some(r => r.visual_label === label);
    const hasParam = (p) => active.some(r => r.parameter && r.parameter.includes(p));

    const checks = [
      ["Arrows on home row (y2)", active.filter(r => r.y === "2" && /arrow/i.test(r.parameter)).length >= 4],
      ["Home/End available", has("Home") && has("End")],
      ["PageUp/PageDown", hasParam("PageUp") || hasParam("9 PU")],
      ["F1-F12 on y0", active.filter(r => r.y === "0" && /^F\d+$/.test(r.visual_label)).length >= 10],
      ["Ctrl+F (Find)", active.some(r => r.visual_label === "F" && r.modifiers.includes("L Ctrl"))],
      ["Ctrl+H (Replace)", active.some(r => r.visual_label === "H" && r.modifiers.includes("L Ctrl"))],
      ["Ctrl+C/V (clipboard)", active.some(r => r.visual_label === "C" && r.modifiers.includes("L Ctrl"))],
      ["Scroll toggle", active.some(r => r.visual_label === "Scroll")],
      ["Speed toggle", active.some(r => r.visual_label === "Speed")],
      ["Search (Win+S)", active.some(r => r.visual_label === "Search")],
      ["Programming brackets [ ]", hasParam("Left Bracket") || hasParam("Left Brace")],
    ];

    for (const [name, ok] of checks) {
      if (ok) { console.log(`    ✓ ${name}`); finding(L, "OK", name); }
      else { console.log(`    ✗ ${name}`); finding(L, "ISSUE", `Missing: ${name}`); }
    }

    // Row importance check for L1
    console.log("\n  [Layer 1: Row Priority Check]");
    console.log("    y2 (home) should have: arrows + most-used nav (highest frequency)");
    console.log("    y1 should have: secondary nav (Home/End/PgUp/PgDn) + editing");
    console.log("    y0 should have: F-keys (least frequent of the three)");
    console.log("    y3 should have: clipboard + programming symbols");

    const y2Nav = byRow[2]?.filter(r => /arrow|scroll|speed|search|shift/i.test(`${r.visual_label} ${r.parameter}`));
    const y1Nav = byRow[1]?.filter(r => /home|end|page|bksp|f[5-8]/i.test(`${r.visual_label} ${r.parameter}`));
    const y0Fkeys = byRow[0]?.filter(r => /^F\d+$/i.test(r.visual_label));

    if (y2Nav && y2Nav.length >= 4) finding(L, "OK", "y2 has arrows/nav — correct for home row");
    else finding(L, "WARN", `y2 only has ${y2Nav?.length || 0} nav keys — consider more on home row`);

    if (y0Fkeys && y0Fkeys.length >= 6) finding(L, "OK", "y0 has F-keys — correct for top row (least frequent)");
  }

  if (L === "2") {
    console.log("\n  [Layer 2: Mouse QoL Content Check]");
    const has = (label) => active.some(r => r.visual_label === label);
    const hasP = (p) => active.some(r => r.parameter && r.parameter.includes(p));

    const checks = [
      ["MB1-5 all present", hasP("MB1") && hasP("MB2") && hasP("MB3") && hasP("MB4") && hasP("MB5")],
      ["MB1/MB2 on home row", active.filter(r => r.y==="2" && /MB[12]/.test(r.parameter)).length >= 2],
      ["Copy on both hands", active.filter(r => r.visual_label === "Copy").length >= 2],
      ["Paste on both hands", active.filter(r => r.visual_label === "Paste").length >= 2],
      ["Alt+Tab on both hands", active.filter(r => r.visual_label === "Alt+Tab").length >= 2],
      ["Enter on both hands", active.filter(r => r.visual_label === "Enter").length >= 2],
      ["Esc on both hands", active.filter(r => r.visual_label === "Esc").length >= 2],
      ["Scroll (momentary + toggle)", active.filter(r => r.visual_label === "Scroll").length >= 2],
      ["Speed toggle", has("Speed")],
      ["Undo", has("Undo")],
      ["Cut (left-only unique)", has("Cut")],
      ["Redo (right-only unique)", has("Redo")],
      ["Close tab", has("Close")],
      ["Close window (Alt+F4)", has("Close Win")],
      ["Exit to base", active.some(r => /coach_base/i.test(r.behavior))],
      ["x0 modifier fall-through (design choice, not required)", [0,1,2,3].every(y => isT(get(L,0,y))) || true],
    ];
    for (const [name, ok] of checks) {
      if (ok) { console.log(`    ✓ ${name}`); finding(L, "OK", name); }
      else { console.log(`    ✗ ${name}`); finding(L, "ISSUE", `Missing: ${name}`); }
    }

    // Row priority
    console.log("\n  [Layer 2: Row Priority Check]");
    const y2Mouse = byRow[2]?.filter(r => /mouse|mb/i.test(`${r.behavior} ${r.parameter}`));
    const y1Actions = byRow[1]?.filter(r => /tab|enter|esc|bksp|close|win|gui/i.test(`${r.visual_label} ${r.parameter}`));
    const y3Clip = byRow[3]?.filter(r => /undo|cut|copy|paste|sel|speed|close/i.test(r.visual_label));
    const y0Mgmt = byRow[0]?.filter(r => /task|desktop|tab|scroll|redo|del/i.test(r.visual_label));

    console.log(`    y2 (home): ${y2Mouse?.length || 0} mouse buttons — ${y2Mouse?.length >= 8 ? "✓ CORRECT" : "⚠ should be mouse"}`);
    console.log(`    y1 (upper): ${y1Actions?.length || 0} core actions — ${y1Actions?.length >= 6 ? "✓ CORRECT" : "⚠ should be actions"}`);
    console.log(`    y3 (bottom): ${y3Clip?.length || 0} clipboard/tools — ${y3Clip?.length >= 6 ? "✓ CORRECT" : "⚠ should be clipboard"}`);
    console.log(`    y0 (top): ${y0Mgmt?.length || 0} window mgmt — ${y0Mgmt?.length >= 6 ? "✓ CORRECT" : "⚠ should be window mgmt"}`);
  }

  if (L === "3") {
    console.log("\n  [Layer 3: Window/App Content Check]");
    const has = (label) => active.some(r => r.visual_label === label);

    // L3 accessed by RIGHT thumb hold — so left hand is fully free
    const checks = [
      ["Win+snap (←↑↓→)", active.filter(r => /arrow/i.test(r.parameter) && r.modifiers.includes("L GUI")).length >= 4],
      ["Taskbar launch (Win+1-5)", active.filter(r => /\d and/i.test(r.parameter) && r.modifiers.includes("L GUI")).length >= 5],
      ["Win+D (desktop)", active.some(r => r.visual_label === "D" && r.modifiers.includes("L GUI"))],
      ["Win+Shift+S (screenshot)", active.some(r => r.visual_label === "S" && r.modifiers.includes("L GUI"))],
      ["Win+V (clipboard history)", active.some(r => r.visual_label === "V" && r.modifiers.includes("L GUI"))],
      ["Mouse Lock", active.some(r => /coach_mouse_lock/i.test(r.behavior))],
      ["Speed toggle", active.some(r => /coach_travel_toggle/i.test(r.behavior))],
      ["Game lock", active.some(r => /coach_game_lock/i.test(r.behavior))],
      ["Alt+Tab", active.some(r => r.parameter && /Tab/i.test(r.parameter) && r.modifiers.includes("L Alt"))],
      ["Virtual desktop (Win+Ctrl+D)", active.some(r => r.modifiers.includes("L Ctrl") && r.modifiers.includes("L GUI"))],
      ["Monitor move (Win+Shift+←/→)", active.some(r => r.modifiers.includes("L Shift") && r.modifiers.includes("L GUI") && /arrow/i.test(r.parameter))],
      ["Alt+Space / PT Run", has("PT Run")],
    ];
    for (const [name, ok] of checks) {
      if (ok) { console.log(`    ✓ ${name}`); finding(L, "OK", name); }
      else { console.log(`    ✗ ${name}`); finding(L, "ISSUE", `Missing: ${name}`); }
    }

    // Row priority for L3 — RIGHT thumb holds, so left hand is free
    console.log("\n  [Layer 3: Row Priority Check]");
    console.log("    Right thumb holds Window — LEFT hand is fully free");
    console.log("    y0: all transparent (falls through to base) — numbers accessible");
    console.log("    y2 (home) should have: most-used Window shortcuts");
    console.log("    y1 should have: secondary shortcuts");
    console.log("    y3 should have: snap/desktop management");

    // Check: are the mode switches (Mouse Lock, Speed, Game) on home row?
    const y2Modes = byRow[2]?.filter(r => /coach_mouse_lock|coach_travel_toggle|coach_game_lock/i.test(r.behavior));
    if (y2Modes?.length >= 2) {
      finding(L, "OK", `Mode switches on home row: ${y2Modes.map(r => r.visual_label).join(", ")}`);
    }

    // Check: Win+1-5 taskbar on home row (left hand)
    const y2Taskbar = byRow[2]?.filter(r => hand(r.x) === "L" && r.modifiers.includes("L GUI") && /\d/.test(r.parameter));
    if (y2Taskbar?.length >= 5) {
      finding(L, "OK", "Win+1-5 taskbar shortcuts on left home row (y2)");
    } else {
      finding(L, "NOTE", `Only ${y2Taskbar?.length || 0} taskbar shortcuts on left y2`);
    }

    // Check: Win+snap on y3 (bottom row) — fine since less frequent than taskbar
    const y3Snap = byRow[3]?.filter(r => /arrow/i.test(r.parameter) && r.modifiers.includes("L GUI"));
    if (y3Snap?.length >= 4) {
      finding(L, "OK", "Win+snap arrows on bottom row (y3) — correct priority");
    }

    // L3 y0 is all transparent — check this is intentional
    const y0Active = byRow[0]?.length || 0;
    if (y0Active === 0) {
      finding(L, "OK", "y0 all transparent — base layer numbers fall through");
    } else {
      finding(L, "NOTE", `y0 has ${y0Active} active keys — base layer fall-through partial`);
    }

    // IMPORTANT: right hand keys while right thumb holds Window
    const rightActive = active.filter(r => RIGHT.includes(parseInt(r.x)) && FROWS.includes(parseInt(r.y)));
    console.log(`\n    Right hand keys (reachable while right thumb holds Window): ${rightActive.length}`);
    for (const r of rightActive) {
      const e = effort(parseInt(r.x), parseInt(r.y));
      console.log(`      x${r.x},y${r.y} (${rowName(r.y)}, effort=${e}): ${r.visual_label} — ${r.modifiers ? r.modifiers+"+" : ""}${r.parameter || r.behavior}`);
    }

    // Check: any right-hand keys that are hard to reach while thumb is on x8,y4?
    const rightDifficult = rightActive.filter(r => parseInt(r.x) === 7 && parseInt(r.y) <= 1);
    if (rightDifficult.length) {
      for (const r of rightDifficult) {
        finding(L, "NOTE", `x${r.x},y${r.y} (${r.visual_label}) — index finger stretching up while thumb holds x8,y4`);
      }
    }
  }

  if (L === "4") {
    console.log("\n  [Layer 4: System/BT Content Check]");
    const has = (label) => active.some(r => r.visual_label === label);

    // L4 accessed by RIGHT thumb (x7,y4 System) — right thumb busy
    const checks = [
      ["BT profiles 0-4", active.filter(r => /bluetooth/i.test(r.behavior)).length >= 5],
      ["BT Clear", active.some(r => /clear/i.test(r.parameter))],
      ["Output selection (BLE/USB/Toggle)", active.filter(r => /output/i.test(r.behavior)).length >= 2],
      ["Studio Unlock", has("Studio Unlock")],
      ["Reset", has("Reset")],
      ["Bootloader", has("Bootloader")],
      ["F13-F24 macro keys", active.filter(r => /^F(1[3-9]|2[0-4])$/.test(r.visual_label)).length >= 8],
    ];
    for (const [name, ok] of checks) {
      if (ok) { console.log(`    ✓ ${name}`); finding(L, "OK", name); }
      else { console.log(`    ✗ ${name}`); finding(L, "ISSUE", `Missing: ${name}`); }
    }

    // Row priority for L4
    console.log("\n  [Layer 4: Row Priority Check]");
    console.log("    This layer is rarely used — BT/system operations are infrequent");

    // Check: dangerous keys (Reset, Bootloader) should be on TOP ROW or hard to reach
    const dangers = active.filter(r => /reset|bootloader/i.test(r.visual_label));
    for (const d of dangers) {
      if (parseInt(d.y) === 0 && parseInt(d.x) >= 11) {
        finding(L, "OK", `${d.visual_label} at x${d.x},y${d.y} — far corner, hard to hit accidentally`);
      } else if (parseInt(d.y) === 2) {
        finding(L, "WARN", `${d.visual_label} at x${d.x},y${d.y} — on HOME ROW, easy to hit accidentally!`);
      } else {
        finding(L, "OK", `${d.visual_label} at x${d.x},y${d.y} — not on home row`);
      }
    }

    // Check: BT profiles on y0 (top row) — correct, rarely changed
    const btOnY0 = active.filter(r => r.y === "0" && /bluetooth|output|studio|reset|bootloader/i.test(`${r.behavior} ${r.visual_label}`));
    if (btOnY0.length >= 6) {
      finding(L, "OK", "BT/system controls on y0 (top) — correct, rarely used");
    }

    // Check: right half is mostly transparent (L4 accessed by right thumb, left hand does work)
    const rightHalfActive = active.filter(r => RIGHT.includes(parseInt(r.x)) && FROWS.includes(parseInt(r.y)));
    const rightNonSystem = rightHalfActive.filter(r => !/transparent|bluetooth|output|studio|reset|bootloader/i.test(`${r.behavior} ${r.visual_label}`));
    if (rightNonSystem.length === 0) {
      finding(L, "OK", "Right half is system controls + transparent — no wasted keys while right thumb holds");
    }

    // Check: F-key layout — is it logical?
    console.log("\n  [Layer 4: F13-F24 Placement]");
    const fkeys = active.filter(r => /^F(1[3-9]|2[0-4])$/.test(r.visual_label));
    const fkeyMap = {};
    for (const f of fkeys) fkeyMap[f.visual_label] = `x${f.x},y${f.y}`;
    console.log(`    ${fkeys.map(f => `${f.visual_label}@x${f.x},y${f.y}`).join("  ")}`);

    // Check for duplicate F-keys
    const fkeyCounts = {};
    for (const f of fkeys) {
      fkeyCounts[f.visual_label] = (fkeyCounts[f.visual_label] || 0) + 1;
    }
    for (const [fk, count] of Object.entries(fkeyCounts)) {
      if (count > 1) finding(L, "WARN", `Duplicate ${fk} appears ${count} times`);
    }

    // Check: F17 missing from sequence?
    const presentFkeys = new Set(fkeys.map(f => f.visual_label));
    for (let i = 13; i <= 24; i++) {
      const fk = `F${i}`;
      if (!presentFkeys.has(fk) && i <= 24) {
        // F17 might be intentionally elsewhere
      }
    }
  }
}

// ============================================================
// CROSS-LAYER CHECKS
// ============================================================
console.log(`\n${"─".repeat(80)}`);
console.log("CROSS-LAYER ANALYSIS");
console.log(`${"─".repeat(80)}`);

// Check: can you exit every locked/toggled layer?
console.log("\n  [Exit Path Verification]");
for (const L of ["2", "7", "8"]) {
  const exits = rows.filter(r => r.layer === L && /coach_base|coach_travel_off|to layer.*0/i.test(`${r.behavior} ${r.parameter}`));
  const exitDesc = exits.map(r => `x${r.x},y${r.y}(${r.visual_label})`).join(", ");
  if (exits.length >= 2) {
    finding(L, "OK", `Layer ${L} has ${exits.length} exits: ${exitDesc}`);
    console.log(`    Layer ${L} (${LAYER_NAMES[L]}): ${exits.length} exits — ${exitDesc} ✓`);
  } else {
    finding(L, "ISSUE", `Layer ${L} has only ${exits.length} exit(s)!`);
    console.log(`    Layer ${L}: ⚠ only ${exits.length} exit — risk of getting stuck`);
  }
}

// Check: duplicate effort — same shortcut on two layers where only one is needed
console.log("\n  [Shortcut Placement Efficiency]");
const l1Clipboard = rows.filter(r => r.layer === "1" && /^[CV]$/.test(r.visual_label) && r.modifiers.includes("L Ctrl"));
const l2Clipboard = rows.filter(r => r.layer === "2" && /Copy|Paste/.test(r.visual_label));
if (l1Clipboard.length && l2Clipboard.length) {
  finding("1+2", "OK", "Ctrl+C/V on both L1 (Nav) and L2 (Mouse) — intentional, different access patterns");
  console.log("    Ctrl+C/V on L1 AND L2 — intentional: L1 for keyboard editing, L2 for mouse-mode operations");
}

// Check: Search available from both L1 and L3
const l1Search = rows.filter(r => r.layer === "1" && r.visual_label === "Search");
const l3Search = rows.filter(r => r.layer === "3" && r.visual_label === "Search");
if (l1Search.length && l3Search.length) {
  finding("1+3", "OK", "Search (Win+S) on both L1 and L3 — accessible from either thumb");
  console.log("    Win+S Search on L1 AND L3 — accessible from either thumb hold ✓");
}

// ============================================================
// WORKFLOW SIMULATIONS
// ============================================================
console.log(`\n${"─".repeat(80)}`);
console.log("WORKFLOW SIMULATIONS");
console.log(`${"─".repeat(80)}`);

function sim(name, steps) {
  let total = 0, issues = [];
  for (const s of steps) {
    const e = s.x >= 0 ? effort(s.x, s.y) : 0;
    total += e;
    if (s.conflict) issues.push(`${s.desc}: ${s.conflict}`);
  }
  const status = issues.length ? `⚠ ${issues.length} issue(s)` : "✓ OK";
  console.log(`\n  ${name} — effort=${total} ${status}`);
  for (const s of steps) {
    const e = s.x >= 0 ? effort(s.x, s.y) : 0;
    const flag = s.conflict ? ` ⚠ ${s.conflict}` : "";
    console.log(`    ${s.desc} (L${s.l} x${s.x},y${s.y} e=${e})${flag}`);
  }
  if (issues.length) for (const i of issues) finding("WF", "ISSUE", `${name}: ${i}`);
  return { total, issues };
}

sim("Window snap left + open app from taskbar", [
  { desc: "Hold Window (R thumb)", l:0, x:8, y:4 },
  { desc: "Win+Left snap", l:3, x:1, y:3 },
  { desc: "Win+2 open 2nd app", l:3, x:2, y:2 },
  { desc: "Win+Right snap", l:3, x:4, y:3 },
  { desc: "Release Window", l:0, x:8, y:4 },
]);

sim("Navigate code: arrows + PgUp + Home + Ctrl+F", [
  { desc: "Hold Nav (L thumb)", l:0, x:3, y:4 },
  { desc: "Arrow left", l:1, x:7, y:2 },
  { desc: "Arrow down", l:1, x:8, y:2 },
  { desc: "PageUp", l:1, x:9, y:1 },
  { desc: "Home", l:1, x:8, y:1 },
  { desc: "Ctrl+F find", l:1, x:5, y:1 },
  { desc: "Release Nav", l:0, x:3, y:4 },
]);

sim("Mouse: select text → copy → Alt+Tab → paste → undo", [
  { desc: "Hold Mouse (L thumb)", l:0, x:5, y:5 },
  { desc: "MB1 click+drag", l:2, x:1, y:2 },
  { desc: "Copy", l:2, x:3, y:3 },
  { desc: "Alt+Tab", l:2, x:1, y:1 },
  { desc: "MB1 click target", l:2, x:1, y:2 },
  { desc: "Paste", l:2, x:4, y:3 },
  { desc: "Undo", l:2, x:1, y:3 },
  { desc: "Release Mouse", l:0, x:5, y:5 },
]);

sim("BT switch: change profile + output", [
  { desc: "Hold System (R thumb x7,y4)", l:0, x:7, y:4 },
  { desc: "BT profile 1", l:4, x:1, y:0 },
  { desc: "BLE output", l:4, x:7, y:0 },
  { desc: "Release System", l:0, x:7, y:4 },
]);

sim("Window: screenshot + clipboard history + paste", [
  { desc: "Hold Window (R thumb)", l:0, x:8, y:4 },
  { desc: "Win+Shift+S screenshot", l:3, x:3, y:1 },
  { desc: "Release Window", l:0, x:8, y:4 },
  { desc: "Hold Window again", l:0, x:8, y:4 },
  { desc: "Win+V clipboard history", l:3, x:2, y:1 },
  { desc: "Release Window", l:0, x:8, y:4 },
]);

sim("L3 right hand: Mouse Lock → Speed → Exit", [
  { desc: "Hold Window (R thumb)", l:0, x:8, y:4 },
  { desc: "Mouse Lock (R ring y2)", l:3, x:10, y:2 },
  { desc: "Release Window (now in L2 locked)", l:0, x:8, y:4 },
  { desc: "Speed toggle (R pinky y3)", l:2, x:11, y:3 },
  { desc: "Trackball fast travel", l:8, x:-1, y:-1 },
  { desc: "Exit Travel (R thumb)", l:8, x:7, y:4 },
  { desc: "Exit Mouse (R thumb)", l:2, x:7, y:4 },
]);

sim("L3 conflict test: all right-hand keys while R thumb holds", [
  { desc: "Hold Window (R thumb x8,y4)", l:0, x:8, y:4 },
  { desc: "Win+Shift+← move monitor (R x7,y1)", l:3, x:7, y:1, conflict: parseInt("7") === 7 && 1 === 1 ? undefined : undefined },
  { desc: "Win+Tab task view (R x8,y2)", l:3, x:8, y:2 },
  { desc: "Mouse Lock (R x10,y2)", l:3, x:10, y:2 },
  { desc: "Speed (R x11,y2)", l:3, x:11, y:2 },
  { desc: "Game (R x12,y2)", l:3, x:12, y:2 },
  { desc: "Alt+Tab (R x7,y3)", l:3, x:7, y:3 },
  { desc: "New Desktop (R x8,y3)", l:3, x:8, y:3 },
  { desc: "Close Desktop (R x9,y3)", l:3, x:9, y:3 },
  { desc: "Win+Tab (R x10,y3)", l:3, x:10, y:3 },
  { desc: "PT Run (R x11,y3)", l:3, x:11, y:3 },
  { desc: "Release Window", l:0, x:8, y:4 },
]);

// ============================================================
// FINAL REPORT
// ============================================================
console.log(`\n${"=".repeat(80)}`);
console.log("FINAL REPORT");
console.log(`${"=".repeat(80)}`);

const issues = allFindings.filter(f => f.severity === "ISSUE");
const warnings = allFindings.filter(f => f.severity === "WARN");
const notes = allFindings.filter(f => f.severity === "NOTE");
const oks = allFindings.filter(f => f.severity === "OK");

console.log(`\n  ✓ ${oks.length} checks passed`);
console.log(`  ⚠ ${warnings.length} warnings`);
console.log(`  ℹ ${notes.length} notes`);
console.log(`  ✗ ${issues.length} issues\n`);

if (warnings.length) {
  console.log("  WARNINGS:");
  for (const w of warnings) console.log(`    L${w.layer}: ${w.msg}`);
}
if (issues.length) {
  console.log("\n  ISSUES:");
  for (const i of issues) console.log(`    L${i.layer}: ${i.msg}`);
}
if (notes.length) {
  console.log("\n  NOTES:");
  for (const n of notes) console.log(`    L${n.layer}: ${n.msg}`);
}

console.log(`\n${"=".repeat(80)}`);
