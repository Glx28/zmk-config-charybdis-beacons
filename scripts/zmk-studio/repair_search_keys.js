/*
Repair only the Charybdis Search keys in ZMK Studio.

Use when the coach shows Search / Win+S but ZMK Studio currently shows a
different key such as Keyboard Left Brace. This script changes only:
  - Layer 1 x7 y2 -> Key Press Keyboard S with L GUI
  - Layer 3 x7 y2 -> Key Press Keyboard S with L GUI

Usage:
1. Open https://zmk.studio/ and connect the keyboard.
2. Open DevTools Console.
3. Paste this entire file.
4. Verify both keys manually in Studio, then save in Studio if correct.
*/

(async function repairCharybdisSearchKeys() {
  const REPAIRS = [
    { layer: 1, x: 7, y: 2, behavior: "Key Press", parameter: "Keyboard S", modifiers: ["L GUI"], label: "Search" },
    { layer: 3, x: 7, y: 2, behavior: "Key Press", parameter: "Keyboard S", modifiers: ["L GUI"], label: "Search" },
  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clean = (text) => String(text || "").replace(/\s+/g, " ").trim();
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const visible = (el) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return rect.width > 1 && rect.height > 1 && style.display !== "none" && style.visibility !== "hidden";
  };
  const nativeSetValue = (el, value) => {
    const proto = el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, "value");
    desc.set.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };
  const nativeSetChecked = (el, checked) => {
    const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "checked");
    desc.set.call(el, checked);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };
  const click = async (el, delay = 180) => {
    el.scrollIntoView({ block: "center", inline: "center" });
    el.click();
    await sleep(delay);
  };

  function findLayerButton(layer) {
    const list = document.querySelector('[aria-label="Keymap Layer"]');
    return list?.querySelector(`[role="option"][data-key="${layer}"]`)
      || qa('[role="option"]', list || document).find((el) => clean(el.textContent) === String(layer));
  }

  function selectedLayer() {
    return clean(document.querySelector('[aria-label="Keymap Layer"] [role="option"][aria-selected="true"]')?.textContent);
  }

  async function selectLayer(layer) {
    if (selectedLayer() === String(layer)) return;
    const button = findLayerButton(layer);
    if (!button) throw new Error(`Could not find Layer ${layer} in ZMK Studio.`);
    await click(button, 500);
  }

  async function selectKey(x, y) {
    const key = document.querySelector(`[x="${x}"][y="${y}"]`);
    if (!key) throw new Error(`Could not find key x${x} y${y}.`);
    await click(key, 350);
  }

  function visibleSelects() {
    return qa("select").filter(visible);
  }

  function cleanLabel(el) {
    const id = el.getAttribute("id");
    const aria = el.getAttribute("aria-labelledby");
    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel) return clean(ariaLabel);
    if (aria) return aria.split(/\s+/).map((part) => clean(document.getElementById(part)?.textContent)).filter(Boolean).join(" ");
    if (id) return clean(document.querySelector(`label[for="${CSS.escape(id)}"]`)?.textContent);
    return clean(el.closest("div")?.querySelector("label")?.textContent);
  }

  function behaviorSelect() {
    return visibleSelects().find((select) => [...select.options].some((option) => clean(option.textContent) === "Key Press"));
  }

  async function setBehavior(name) {
    const select = behaviorSelect();
    if (!select) throw new Error("Could not find behavior select.");
    const option = [...select.options].find((item) => clean(item.textContent) === name);
    if (!option) throw new Error(`Behavior ${name} is not available.`);
    nativeSetValue(select, option.value);
    await sleep(900);
  }

  function findKeyInput() {
    const inputs = qa("input").filter(visible).filter((input) => input.type === "text");
    return inputs.find((input) => input.getAttribute("role") === "combobox" && /^Key:?$/i.test(cleanLabel(input)))
      || inputs.find((input) => /^Key:?$/i.test(cleanLabel(input)))
      || inputs.find((input) => input.getAttribute("role") === "combobox")
      || inputs.find((input) => /Key:/i.test(cleanLabel(input)))
      || inputs[1]
      || inputs[0];
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

  async function setKey(parameter) {
    const input = findKeyInput();
    if (!input) throw new Error("Could not find Key input.");
    input.focus();
    input.select?.();
    nativeSetValue(input, parameter);
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", code: "ArrowDown", bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowDown", code: "ArrowDown", bubbles: true }));
    await sleep(250);

    const listbox = listboxForKeyCombobox(input);
    const exact = listbox
      ? qa('[role="option"]', listbox).filter(visible).find((option) => clean(option.textContent) === parameter)
      : null;
    if (exact) {
      await click(exact, 250);
    } else {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true }));
      await sleep(250);
    }
  }

  function normalizeModifierName(name) {
    return clean(name).toUpperCase().replace(/[_-]+/g, " ");
  }

  async function setImplicitModifiers(modifiers) {
    const wanted = new Set(modifiers.map(normalizeModifierName));
    const group = qa('[role="group"]')
      .find((el) => /Implicit Modifiers/i.test(clean(el.getAttribute("aria-label") || el.textContent)));
    if (!group) throw new Error("Could not find Implicit Modifiers group.");
    const byValue = {
      "L CTRL": ["LCTRL", "LEFT CONTROL", "LEFT CTRL"],
      "L SHIFT": ["LSHIFT", "LEFT SHIFT"],
      "L ALT": ["LALT", "LEFT ALT"],
      "L GUI": ["LGUI", "LEFT GUI", "GUI", "WIN", "WINDOWS"],
    };
    for (const input of qa('input[type="checkbox"]', group)) {
      const label = input.closest("label");
      const name = normalizeModifierName(label?.textContent || input.value || input.name || "");
      const shouldCheck = [...wanted].some((want) => name === want || (byValue[want] || []).includes(name));
      if (input.checked !== shouldCheck) {
        nativeSetChecked(input, shouldCheck);
        await sleep(80);
      }
    }
  }

  console.warn("Repairing only Charybdis Search keys. This script will not click Save.");
  for (const item of REPAIRS) {
    await selectLayer(item.layer);
    await selectKey(item.x, item.y);
    await setBehavior(item.behavior);
    await setKey(item.parameter);
    await setImplicitModifiers(item.modifiers);
    console.log(`Repaired Layer ${item.layer} x${item.x} y${item.y}: ${item.parameter} + ${item.modifiers.join(", ")}`);
  }
  console.warn("Done. Verify in ZMK Studio, then save manually only if both Search keys show Keyboard S with L GUI.");
})();
