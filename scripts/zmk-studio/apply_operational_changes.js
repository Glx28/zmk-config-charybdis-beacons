/*
Legacy canonical Charybdis v1.8 operational pointer-travel ZMK Studio apply-all payload.

This file predates dynamic layer assignment. Do not use its historical labels
as evidence that any non-L0/non-L7 layer has a fixed role. Current generated
layouts infer layer purpose from the CSV, usage data, and access paths.

Usage:
1. Open https://zmk.studio/ and connect the keyboard.
2. Open DevTools > Console.
3. Paste this entire file.
4. Run scripts/zmk-studio/verify_every_key.js afterwards.
5. This script never clicks Save. It applies a historical operational layout. Layer numbers outside L0/L7 are not role definitions for generated layouts.
*/

window.CHARYBDIS_FINAL_LAYOUT = {
  "project": "Charybdis Ultimate Keyboard Experience",
  "version": "final-v1.9-user-custom",
  "device": "V&Z-Charydbis",
  "policy": "v1.8 plus user customizations: period fix, PowerToys launchers (both hands), and right-hand scroll toggle.",
  "keys": [
    {
      "layer": 0,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Period",
      "label": ".",
      "rationale": "CRITICAL: Period must be on base layer for typing flow. Moves [ to Layer 1.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 0,
      "x": 12,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Apostrophe",
      "label": "'",
      "rationale": "CRITICAL: Apostrophe for English contractions (can't, don't, it's). Sacrifices minus which moves to Layer 1.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 1,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Left Bracket",
      "label": "[",
      "rationale": "Move bracket from base to Layer 1 programming layer. Replaces duplicate period.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 1,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Right Bracket",
      "label": "]",
      "rationale": "Add ] bracket for programming pairs on Layer 1.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 1,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Backslash",
      "label": "\\",
      "rationale": "Add \\ backslash for programming (file paths, escapes) on Layer 1.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 1,
      "x": 12,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Minus",
      "label": "-",
      "rationale": "Move minus from base layer to Layer 1. Displaced by apostrophe on base.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 1,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "S",
      "modifiers": [
        "L GUI"
      ],
      "label": "Search",
      "rationale": "Left-hand Win+S Windows Search: hold Nav thumb + tap A position.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 1,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Space",
      "modifiers": [
        "L Alt"
      ],
      "label": "PT Run",
      "rationale": "Left-hand Alt+Space PowerToys Run: hold Nav thumb + tap S position.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 3,
      "x": 6,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "S",
      "modifiers": [
        "L GUI"
      ],
      "label": "Search",
      "rationale": "Right-hand Win+S: hold Window thumb + tap H position.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 3,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Space",
      "modifiers": [
        "L Alt"
      ],
      "label": "PT Run",
      "rationale": "Right-hand Alt+Space PowerToys: hold Window thumb + tap pinky position.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 2,
      "x": 12,
      "y": 2,
      "behavior": "Toggle Layer",
      "parameter": "6",
      "label": "Scroll",
      "rationale": "Historical right-hand scroll toggle: tap pinky to toggle the configured scroll-mode target layer.",
      "apply_batch": true,
      "v19_user": true,
      "operational_v19": true
    },
    {
      "layer": 1,
      "x": 0,
      "y": 1,
      "behavior": "To Layer",
      "parameter": "7",
      "label": "Game",
      "rationale": "Optional left-side entry: hold Nav x3 y4, tap x0 y1 to lock into RPG/Game Layer 7.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 1,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "F",
      "modifiers": [
        "L Ctrl"
      ],
      "label": "Find",
      "rationale": "v1.5 Ctrl+F on support column, replacing duplicate F8.",
      "apply_batch": true,
      "v15": true,
      "operational_v18": true
    },
    {
      "layer": 1,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "Left",
      "modifiers": [
        "L Ctrl"
      ],
      "label": "Prev Word",
      "rationale": "v1.5 Ctrl+Left near arrow cluster.",
      "apply_batch": true,
      "v15": true,
      "operational_v18": true
    },
    {
      "layer": 1,
      "x": 5,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Delete",
      "modifiers": [
        "L Ctrl"
      ],
      "label": "Del Prev Word",
      "rationale": "v1.5 Ctrl+Backspace using the board Backspace/Delete key name.",
      "apply_batch": true,
      "v15": true,
      "operational_v18": true
    },
    {
      "layer": 1,
      "x": 11,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Right",
      "modifiers": [
        "L Ctrl"
      ],
      "label": "Next Word",
      "rationale": "v1.5 Ctrl+Right, replacing duplicate Page Down.",
      "apply_batch": true,
      "v15": true,
      "operational_v18": true
    },
    {
      "layer": 1,
      "x": 5,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "H",
      "modifiers": [
        "L Ctrl"
      ],
      "label": "Replace",
      "rationale": "v1.5 Ctrl+H on support column, replacing duplicate F12.",
      "apply_batch": true,
      "v15": true,
      "operational_v18": true
    },
    {
      "layer": 2,
      "x": 7,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "Coach beacon: exit locked generated target layer back to Base.",
      "apply_batch": true,
      "v16_right_mouse": true,
      "operational_v18": true
    },
    {
      "layer": 2,
      "x": 8,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "Coach beacon: second right-thumb exit from locked generated target layer back to Base.",
      "apply_batch": true,
      "v16_right_mouse": true,
      "operational_v18": true
    },
    {
      "layer": 3,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "Left",
      "modifiers": [
        "L GUI",
        "L Shift"
      ],
      "label": "Monitor L",
      "rationale": "v1.5 Win+Shift+Left, replacing duplicate Win+D.",
      "apply_batch": true,
      "v15": true,
      "operational_v18": true
    },
    {
      "layer": 3,
      "x": 5,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "5",
      "modifiers": [
        "L GUI"
      ],
      "label": "App 5",
      "rationale": "v1.5 Win+5, replacing duplicate Win+4.",
      "apply_batch": true,
      "v15": true,
      "operational_v18": true
    },
    {
      "layer": 3,
      "x": 10,
      "y": 2,
      "behavior": "To Layer",
      "parameter": "2",
      "label": "Mouse Lock",
      "rationale": "Historical right-hand-only entry: hold the configured access key, tap x10 y2, release to stay on the generated target layer.",
      "apply_batch": true,
      "v16_right_mouse": true,
      "operational_v18": true
    },
    {
      "layer": 3,
      "x": 11,
      "y": 2,
      "behavior": "Toggle Layer",
      "parameter": "8",
      "label": "Ptr Travel",
      "rationale": "Historical pointer-travel toggle: hold the configured access key and tap x11 y2. The target layer role is dynamic in generated layouts.",
      "apply_batch": true,
      "operational_v18": true,
      "pointer_travel": true
    },
    {
      "layer": 3,
      "x": 12,
      "y": 2,
      "behavior": "To Layer",
      "parameter": "7",
      "label": "Game",
      "rationale": "Optional right-side entry: hold Window x8 y4, tap x12 y2 to lock into RPG/Game Layer 7.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 3,
      "x": 5,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Right",
      "modifiers": [
        "L GUI",
        "L Shift"
      ],
      "label": "Monitor R",
      "rationale": "v1.5 Win+Shift+Right, replacing duplicate Win+Right.",
      "apply_batch": true,
      "v15": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "Page Up",
      "label": "PgUp/LB",
      "rationale": "Left shoulder/tab/page key for RPG menus.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "Up",
      "label": "Up",
      "rationale": "Left-hand WASD-style movement: W position sends Up.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "Page Down",
      "label": "PgDn/RB",
      "rationale": "Right shoulder/tab/page key for RPG menus.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "Page Up",
      "label": "PgUp/LB",
      "rationale": "Right-hand menu shoulder previous page.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 9,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "Up",
      "label": "Up",
      "rationale": "Right-hand arrow cluster: Up.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 11,
      "y": 1,
      "behavior": "Key Press",
      "parameter": "Page Down",
      "label": "PgDn/RB",
      "rationale": "Right-hand menu shoulder next page.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Left",
      "label": "Left",
      "rationale": "Left-hand WASD-style movement: A position sends Left.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Down",
      "label": "Down",
      "rationale": "Left-hand WASD-style movement: S position sends Down.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 3,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Right",
      "label": "Right",
      "rationale": "Left-hand WASD-style movement: D position sends Right.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 4,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Z",
      "label": "Confirm",
      "rationale": "RPG Maker-style confirm/action key on the left prime row.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 8,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Left",
      "label": "Left",
      "rationale": "Right-hand arrow cluster: Left.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 9,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Down",
      "label": "Down",
      "rationale": "Right-hand arrow cluster: Down.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 10,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Right",
      "label": "Right",
      "rationale": "Right-hand arrow cluster: Right.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "X",
      "label": "Cancel",
      "rationale": "RPG Maker-style cancel/menu-back key near the movement cluster.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 2,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "C",
      "label": "Menu",
      "rationale": "Common alternate action/menu key for games that use Z/X/C patterns.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "LeftShift",
      "label": "Dash",
      "rationale": "Dash/run modifier for RPG movement.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Escape",
      "label": "Esc/Menu",
      "rationale": "Escape/menu key for pause/cancel in RPG Maker-style games.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Z",
      "label": "Confirm",
      "rationale": "Right-hand confirm/action key.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 8,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "X",
      "label": "Cancel",
      "rationale": "Right-hand cancel/back key.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "C",
      "label": "Menu",
      "rationale": "Right-hand alternate action/menu key.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "LeftShift",
      "label": "Dash",
      "rationale": "Right-hand dash/run modifier.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Escape",
      "label": "Esc/Menu",
      "rationale": "Right-hand escape/menu key.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 3,
      "y": 4,
      "behavior": "coach_base",
      "label": "Exit Base",
      "rationale": "Coach beacon: left-thumb exit from locked game layer to base (Ctrl+Alt+Shift+F22).",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 4,
      "y": 4,
      "behavior": "Key Press",
      "parameter": "Space",
      "label": "Space/Confirm",
      "rationale": "Thumb confirm/action for games that accept Space.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 5,
      "y": 4,
      "behavior": "coach_base",
      "label": "Exit Base",
      "rationale": "Coach beacon: left support-thumb exit from locked game layer to base.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 4,
      "behavior": "coach_base",
      "label": "Exit Base",
      "rationale": "Coach beacon: right-thumb exit from locked game layer to base.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 8,
      "y": 4,
      "behavior": "coach_base",
      "label": "Exit Base",
      "rationale": "Coach beacon: second right-thumb exit from locked game layer to base.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 4,
      "y": 5,
      "behavior": "Mouse Key Press",
      "parameter": "MB1",
      "label": "Click",
      "rationale": "Optional left click for RPGs that use mouse interaction.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 5,
      "y": 5,
      "behavior": "Mouse Key Press",
      "parameter": "MB2",
      "label": "Right Click",
      "rationale": "Optional right click/menu for mouse-enabled RPGs.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 5,
      "behavior": "Key Press",
      "parameter": "Return Enter",
      "label": "Enter/Confirm",
      "rationale": "Right-thumb confirm/action for games that accept Enter.",
      "apply_batch": true,
      "v17_game": true,
      "operational_v18": true
    },
    {
      "layer": 8,
      "x": 7,
      "y": 4,
      "behavior": "coach_travel_off",
      "label": "Exit Travel",
      "rationale": "Coach beacon: exit configured toggled target layer; clears toggle state (Ctrl+Alt+Win+F14).",
      "apply_batch": true,
      "operational_v18": true,
      "pointer_travel": true
    },
    {
      "layer": 8,
      "x": 8,
      "y": 4,
      "behavior": "coach_travel_off",
      "label": "Exit Travel",
      "rationale": "Coach beacon: second thumb exit from speed/travel overlay.",
      "apply_batch": true,
      "operational_v18": true,
      "pointer_travel": true
    }
  ]
}
;

/*
ZMK Studio best-effort layout assistant/applier.

USAGE IN ZMK STUDIO DEVTOOLS CONSOLE:
1. Open https://zmk.studio/ and connect the V&Z-Charydbis.
2. Export a fresh backup first with export_current_layout_console.js.
3. Paste this script into DevTools Console.
4. Set mode from the Console before pasting this script, for example:
   window.CHARYBDIS_MODE = "dryRun";
   window.CHARYBDIS_MODE = "manualSteps";
   window.CHARYBDIS_MODE = "oneKeyTest";
   window.CHARYBDIS_MODE = "applyLayer";
5. Or edit MODE below:
   - "dryRun"      : print planned changes only. Default and safest.
   - "manualSteps" : print exact manual ZMK Studio steps.
   - "oneKeyTest" : apply one harmless test key only, then stop.
   - "applyLayer" : disabled unless ENABLE_LAYER_APPLY is true.
6. Never save until you verify the UI manually. This script never clicks Save.

This file is already a complete ready-to-paste payload for the final
operational layout.

By default, this script applies only JSON entries with "apply_batch": true.
Set window.CHARYBDIS_APPLY_ONLY_BATCH = false only for manual experiments.
*/

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
    const supported = new Set(["Key Press", "Mouse Key Press", "Momentary Layer", "To Layer", "Toggle Layer", "Bluetooth", "Output Selection", "Studio Unlock", "Reset", "Bootloader", "Transparent", "None"]);
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
      "8": ["Keyboard 8 and Asterisk", "8"],
      "9": ["Keyboard 9 and Left Parenthesis", "9"],
      "0": ["Keyboard 0 and Right Parenthesis", "0"],
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
      LEFTGUI: ["Keyboard Left GUI", "Left GUI", "LeftGUI"]
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

  async function setComboboxKeyParameter(parameter) {
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
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true }));
      await sleep(350);
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
    await selectLayer(item.layer);
    await selectKey(item.x, item.y);

    if (currentLooksLike(item)) {
      console.log("Already correct, skipping", item);
      return;
    }

    await setBehavior(item.behavior);

    if (["Transparent", "None", "Studio Unlock", "Reset", "Bootloader"].includes(item.behavior)) {
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



