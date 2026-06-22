/*
ZMK Studio behavior option catalog exporter.

Usage:
1. Open ZMK Studio and connect the keyboard.
2. Click one safe spare key, for example Layer 9 x4 y5.
3. Paste this whole script in DevTools Console and press Enter.
4. The script will select each Behavior option on that key, inspect the visible
   controls/options for that behavior, and download a JSON catalog.
5. Do not click Save after running this. This script changes the visible editor
   state while inspecting, but it is for cataloging only.

Safety:
- This script never clicks Save.
- Use a spare key/layer because it changes the selected key's unsaved editor state.
- Reload ZMK Studio afterward if you do not want to keep the last inspected behavior.
*/

(async function ExportZmkStudioBehaviorOptionCatalog() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function clean(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function visible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return rect.width > 1 && rect.height > 1 && cs.display !== "none" && cs.visibility !== "hidden" && cs.opacity !== "0";
  }

  function nativeSetValue(el, value) {
    const proto = el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, "value");
    desc.set.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function labelFor(el) {
    const id = el.getAttribute("id");
    const aria = el.getAttribute("aria-labelledby");
    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel;
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

  function selectedKeyInfo() {
    const holder = document.querySelector('[x][y] button[aria-selected="true"]')?.closest("[x][y]");
    if (!holder) return null;
    return {
      x: holder.getAttribute("x"),
      y: holder.getAttribute("y"),
      width: holder.getAttribute("width") || holder.getAttribute("w"),
      height: holder.getAttribute("height") || holder.getAttribute("h")
    };
  }

  function readControls() {
    const bodyText = document.body.innerText || "";
    return {
      selectedKey: selectedKeyInfo(),
      selects: [...document.querySelectorAll("select")].filter(visible).map((select, index) => ({
        index,
        label: labelFor(select),
        value: select.value,
        selectedText: clean(select.selectedOptions?.[0]?.textContent),
        options: [...select.options].map((option) => ({ value: option.value, text: clean(option.textContent) }))
      })),
      inputs: [...document.querySelectorAll("input")].filter(visible).map((input, index) => ({
        index,
        label: labelFor(input),
        type: input.type,
        value: input.value,
        checked: input.checked,
        placeholder: input.placeholder || "",
        ariaLabel: input.getAttribute("aria-label") || "",
        title: input.getAttribute("title") || ""
      })),
      buttons: [...document.querySelectorAll("button")].filter(visible).map((button, index) => ({
        index,
        text: clean(button.textContent) || button.getAttribute("aria-label") || "",
        ariaLabel: button.getAttribute("aria-label") || "",
        ariaExpanded: button.getAttribute("aria-expanded"),
        ariaPressed: button.getAttribute("aria-pressed"),
        ariaSelected: button.getAttribute("aria-selected"),
        disabled: button.disabled
      })).filter((button) => button.text && !/Save|Discard|Undo|Redo/i.test(button.text)),
      editorText: (() => {
        const pos = bodyText.lastIndexOf("Behavior:");
        return pos >= 0 ? clean(bodyText.slice(pos, pos + 3000)) : "";
      })()
    };
  }

  function findBehaviorSelect() {
    const selects = [...document.querySelectorAll("select")].filter(visible);
    return selects.find((select) => [...select.options].some((option) => clean(option.textContent) === "Key Press"))
      || selects.find((select) => [...select.options].some((option) => clean(option.textContent) === "Transparent"));
  }

  function downloadJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 1000);
  }

  const behaviorSelect = findBehaviorSelect();
  if (!behaviorSelect) {
    alert("Could not find the visible Behavior select. Click a key in ZMK Studio first, then rerun.");
    return;
  }

  const originalValue = behaviorSelect.value;
  const originalText = clean(behaviorSelect.selectedOptions?.[0]?.textContent);
  const options = [...behaviorSelect.options].map((option) => ({
    value: option.value,
    text: clean(option.textContent)
  })).filter((option) => option.text);

  const catalog = {
    exporter: "Charybdis ZMK Studio behavior option catalog exporter",
    exporterVersion: "2026-06-17.v1",
    createdAt: new Date().toISOString(),
    pageTitle: document.title,
    url: location.href,
    userAgent: navigator.userAgent,
    selectedKeyAtStart: selectedKeyInfo(),
    originalBehavior: { value: originalValue, text: originalText },
    warning: "This is a DOM/UI catalog. It is not an official ZMK schema.",
    behaviors: []
  };

  console.group("Collecting ZMK Studio behavior option catalog");
  for (const option of options) {
    console.log(`Inspecting behavior: ${option.text}`);
    nativeSetValue(behaviorSelect, option.value);
    await sleep(350);
    catalog.behaviors.push({
      behavior: option.text,
      behaviorValue: option.value,
      controls: readControls()
    });
  }
  console.groupEnd();

  const filename = `zmk-studio-behavior-option-catalog-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  downloadJson(catalog, filename);
  console.log("ZMK Studio behavior option catalog:", catalog);
  alert(`Behavior option catalog exported.\nDownloaded: ${filename}\nReload ZMK Studio if you do not want to keep the last inspected unsaved editor state.`);
})();
