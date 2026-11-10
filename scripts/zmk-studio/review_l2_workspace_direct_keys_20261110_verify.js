// ZMK Studio verify script for evolved V2 layout
window.CHARYBDIS_VERSION = "L2-direct-workspaces-20261110";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function visible(el) {
  return Boolean(el && el.offsetParent !== null);
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

async function selectLayer(layer) {
  if (selectedLayer() === String(layer)) return true;
  const el = findLayerButton(layer);
  if (!el) return false;
  el.scrollIntoView({ block: "center", inline: "center" });
  el.click();
  await sleep(650);
  return selectedLayer() === String(layer);
}

function findKeyElement(x, y) {
  const holder = document.querySelector(`[x="${x}"][y="${y}"]`);
  return holder?.querySelector("button") || holder;
}

async function selectKey(x, y) {
  const el = findKeyElement(x, y);
  if (!el) return false;
  const button = el.closest("button") || el;
  button.scrollIntoView({ block: "center", inline: "center" });
  button.click();
  await sleep(250);
  return true;
}

function visibleSelects() {
  return qa("select").filter(visible);
}

function visibleInputs() {
  return qa("input").filter(visible);
}

function isBehaviorSelect(select) {
  return [...select.options].some((o) => clean(o.textContent) === "Key Press")
    && [...select.options].some((o) => clean(o.textContent) === "Transparent");
}

function isZoomSelect(select) {
  return [...select.options].some((o) => clean(o.textContent) === "Auto")
    && [...select.options].some((o) => clean(o.textContent) === "100%");
}

function isDefaultTransformSelect(select) {
  return [...select.options].some((o) => clean(o.textContent) === "default_transform")
    && select.options.length <= 3;
}

function readCurrent() {
  const selects = visibleSelects();
  const behaviorSelect = selects.find(isBehaviorSelect);
  const behavior = behaviorSelect ? clean(behaviorSelect.options[behaviorSelect.selectedIndex]?.textContent) : "";

  const textValues = visibleInputs()
    .filter((input) => input.type === "text" || input.getAttribute("role") === "combobox")
    .map((input) => clean(input.value))
    .filter(Boolean);

  const selectValues = selects
    .filter((select) => select !== behaviorSelect && !isBehaviorSelect(select) && !isZoomSelect(select) && !isDefaultTransformSelect(select))
    .map((select) => clean(select.options[select.selectedIndex]?.textContent))
    .filter(Boolean);

  let parameter = textValues[0] || selectValues[0] || "";
  if (behavior === "Bluetooth" && (parameter === "Select Profile" || parameter === "Disconnect Profile")) {
    const number = visibleInputs().find((input) => input.type === "number");
    if (number && clean(number.value)) parameter = `BT_SEL ${clean(number.value)}`;
  }

  const modifiers = visibleInputs()
    .filter((input) => input.type === "checkbox" && input.checked)
    .map((input) => clean(input.closest("label")?.textContent || input.parentElement?.textContent || ""))
    .filter(Boolean);

  return { behavior, parameter, modifiers };
}

function normalizeParameter(value) {
  let text = clean(value);
  if (!text) return "";
  text = text.replace(/^Keyboard\s+/i, "");
  text = text.replace(/^Layer::/i, "");
  text = text.replace(/^Layer\s+/i, "");
  text = text.replace(/^Keypad\s+/i, "Keypad ");
  text = text.replace(/\bPage Up\b/i, "PageUp");
  text = text.replace(/\bPage Down\b/i, "PageDown");
  text = text.replace(/\bPageDn\b/i, "PageDown");
  text = text.replace(/\bReturn Enter\b/i, "ReturnEnter");
  if (/^Shift$/i.test(text)) text = "LeftShift";
  text = text.replace(/\bLeftControl\b/i, "LeftCtrl");
  text = text.replace(/\bLeftShift\b/i, "LeftShift");
  text = text.replace(/\bLeftAlt\b/i, "LeftAlt");
  text = text.replace(/\bLeft GUI\b/i, "LeftGUI");
  return text.toUpperCase().replace(/[^A-Z0-9]+/g, "");
}

function normalizeModifier(value) {
  const compact = clean(value).toUpperCase().replace(/[^A-Z0-9]+/g, "");
  const aliases = {
    LCTRL: "LCTRL", LEFTCTRL: "LCTRL", LEFTCONTROL: "LCTRL",
    LSHIFT: "LSHIFT", LEFTSHIFT: "LSHIFT",
    LALT: "LALT", LEFTALT: "LALT",
    LGUI: "LGUI", LEFTGUI: "LGUI", WIN: "LGUI", WINDOWS: "LGUI",
    RCTRL: "RCTRL", RIGHTCTRL: "RCTRL", RIGHTCONTROL: "RCTRL",
    RSHIFT: "RSHIFT", RIGHTSHIFT: "RSHIFT",
    RALT: "RALT", RIGHTALT: "RALT",
    RGUI: "RGUI", RIGHTGUI: "RGUI"
  };
  return aliases[compact] || compact;
}

function normalizeModifiers(value) {
  if (Array.isArray(value)) return value.map(normalizeModifier).filter(Boolean).sort().join("+");
  return clean(value).split("+").map(normalizeModifier).filter(Boolean).sort().join("+");
}

const EXPECTED_CSV = `"layer","x","y","label","behavior","parameter","modifiers"
"2","7","1","💼 M-Files","Key Press","F19",""
"2","7","2","🔁 Full","Key Press","F13",""
"2","8","1","💼 Jira+MF","Key Press","F20",""
"2","8","2","🔁 Split","Key Press","F14",""
"2","9","0","transparent","Transparent","",""
"2","9","1","transparent","Transparent","",""
"2","9","2","🔁 Browser","Key Press","F15",""
"2","9","3","transparent","Transparent","",""
"2","10","0","transparent","Transparent","",""
"2","10","1","transparent","Transparent","",""
"2","10","2","🔁 Collab","Key Press","F16",""
"2","10","3","transparent","Transparent","",""
"2","11","0","transparent","Transparent","",""
"2","11","1","transparent","Transparent","",""
"2","11","2","💼 Admin","Key Press","F17",""
"2","11","3","transparent","Transparent","",""
"2","12","0","transparent","Transparent","",""
"2","12","1","transparent","Transparent","",""
"2","12","2","💼 Excel","Key Press","F18",""
"2","12","3","transparent","Transparent","",""
"4","0","1","Ctrl+PageUp","Key Press","PageUp","L Ctrl"
"4","1","0","Ctrl+PageDown","Key Press","PageDown","L Ctrl"
"4","1","1","Ctrl+1","Key Press","1 and Bang","L Ctrl"
"4","5","1","Ctrl+H","Key Press","H","L Ctrl"
"5","0","1","Ctrl+Shift+X","Key Press","X","L Ctrl+L Shift"
"5","0","2","Shift+Enter","Key Press","Return Enter","L Shift"
"5","1","3","Ctrl+Enter","Key Press","Return Enter","L Ctrl"
"5","3","3","Ctrl+Shift+M","Key Press","M","L Ctrl+L Shift"
"6","0","1","Ctrl+Shift+D","Key Press","D","L Ctrl+L Shift"
"6","0","2","Ctrl+Shift+C","Key Press","C","L Ctrl+L Shift"
"6","7","2","Ctrl+G","Key Press","G","L Ctrl"
"6","11","0","Alt+Enter","Key Press","Return Enter","L Alt"
"6","12","0","Ctrl+E","Key Press","E","L Ctrl"
"6","12","1","Ctrl+N","Key Press","N","L Ctrl"
"6","12","3","Ctrl+O","Key Press","O","L Ctrl"
"8","0","2","Ctrl+R","Key Press","R","L Ctrl"
"8","3","0","Ctrl+Shift+R","Key Press","R","L Ctrl+L Shift"`;

function parseExpected() {
  const lines = EXPECTED_CSV.trim().split('\n');
  function parseCsvLine(line) {
    const values = [];
    let value = "";
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const next = line[i + 1];
      if (ch === '"') {
        if (quoted && next === '"') {
          value += '"';
          i++;
        } else {
          quoted = !quoted;
        }
      } else if (ch === "," && !quoted) {
        values.push(value.trim());
        value = "";
      } else {
        value += ch;
      }
    }
    values.push(value.trim());
    return values;
  }

  const headers = parseCsvLine(lines[0]).map(h => h.trim());
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = parseCsvLine(lines[i]);
    const obj = {};
    for (let j = 0; j < headers.length; j++) obj[headers[j]] = parts[j] || '';
    out.push(obj);
  }
  return out;
}

// A scroll-hold position ("coach_lN_scroll_hold" expected) that's still just
// plain "Momentary Layer" / "Layer::11" is the old, pre-fix behavior: scroll
// mode alone, with no target layer combined in, so it silently falls through
// to whatever layer was already active instead of exposing layer N's
// bindings. That's a distinct, known regression - flag it separately from a
// generic mismatch so it reads as "still the bad old scroll" not just "wrong".
function isScrollHoldExpectation(behavior) {
  return /^coach_l\d+_scroll_hold$/i.test(clean(behavior));
}

function isOldPlainScrollBehavior(actual) {
  return clean(actual.behavior) === "Momentary Layer" && normalizeParameter(actual.parameter) === "11";
}

async function runVerify() {
  const expected = parseExpected().filter((exp) => Number(exp.layer) !== 7);
  let pass = 0, fail = 0, errors = [];
  let scrollHoldOk = 0, scrollHoldRegressed = 0, scrollHoldOtherFail = 0;
  let currentLayer = null;
  for (const exp of expected) {
    const layer = parseInt(exp.layer);
    const x = parseInt(exp.x);
    const y = parseInt(exp.y);

    if (currentLayer !== layer) {
      const switched = await selectLayer(layer);
      if (!switched) {
        fail++;
        errors.push({layer, x, y, expected: exp, error: `could not switch to layer ${layer}; selected=${selectedLayer()}`});
        continue;
      }
      currentLayer = layer;
      console.log(`Verifying layer ${layer}...`);
    }

    const found = await selectKey(x, y);
    if (!found) {
      fail++;
      errors.push({layer, x, y, expected: exp, error: 'key not found'});
      continue;
    }

    const actual = readCurrent();
    const bMatch = clean(actual.behavior).toLowerCase() === clean(exp.behavior).toLowerCase();
    const pMatch = normalizeParameter(actual.parameter) === normalizeParameter(exp.parameter);
    const mMatch = normalizeModifiers(actual.modifiers) === normalizeModifiers(exp.modifiers);
    const expectsScrollHold = isScrollHoldExpectation(exp.behavior);

    if (bMatch && pMatch && mMatch) {
      pass++;
      if (expectsScrollHold) scrollHoldOk++;
    } else {
      fail++;
      const issues = [];
      if (!bMatch) issues.push(`behavior expected "${exp.behavior}" got "${actual.behavior}"`);
      if (!pMatch) issues.push(`parameter expected "${exp.parameter}" got "${actual.parameter}"`);
      if (!mMatch) issues.push(`modifiers expected "${exp.modifiers}" got "${actual.modifiers.join('+')}"`);

      let scrollRegression = false;
      if (expectsScrollHold && !bMatch && isOldPlainScrollBehavior(actual)) {
        scrollRegression = true;
        scrollHoldRegressed++;
        issues.push(`OLD SCROLL (bad, pre-fix): still plain "Momentary Layer" / Layer::11 - scroll mode only, target layer not exposed. Needs reflashed firmware + reapply.`);
      } else if (expectsScrollHold) {
        scrollHoldOtherFail++;
      }

      errors.push({layer, x, y, expected: exp, actual, issues, scrollRegression});
      console.warn(`FAIL L${layer} x${x} y${y} ${exp.label || ""}${scrollRegression ? " [OLD SCROLL]" : ""}: ${issues.join("; ")}`);
    }
  }
  console.log('Verify result: ' + pass + ' pass, ' + fail + ' fail (' + (pass/(pass+fail)*100).toFixed(1) + '%)');
  const scrollHoldTotal = scrollHoldOk + scrollHoldRegressed + scrollHoldOtherFail;
  if (scrollHoldTotal) {
    console.log(
      `Scroll-hold keys: ${scrollHoldOk}/${scrollHoldTotal} real per-layer coach_lN_scroll_hold, `
      + `${scrollHoldRegressed} still old plain scroll-mode-only (Momentary Layer/L11), `
      + `${scrollHoldOtherFail} other mismatch.`
    );
    if (scrollHoldRegressed) {
      console.warn(`${scrollHoldRegressed} scroll-hold key(s) are still the OLD pre-fix behavior - flash the updated firmware (coach_lN_scroll_hold macros) and reapply before trusting scroll layer access.`);
    }
  }
  window._CHARYBDIS_VERIFY_RESULT = {pass, fail, errors, scrollHoldOk, scrollHoldRegressed, scrollHoldOtherFail};
  if (errors.length) {
    console.table(errors.slice(0, 50).map((err) => ({
      pos: `L${err.layer} x${err.x} y${err.y}`,
      label: err.expected?.label || "",
      issues: (err.scrollRegression ? "[OLD SCROLL] " : "") + (err.issues?.join("; ") || err.error || "")
    })));
    console.warn(`Stored full error list in window._CHARYBDIS_VERIFY_RESULT.errors (${errors.length} entries).`);
  }
}

runVerify();
