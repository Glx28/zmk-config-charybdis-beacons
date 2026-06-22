/*
ZMK Studio current layout exporter for DevTools Console.

Usage:
1. Open https://zmk.studio/ in Edge or Chrome.
2. Connect the V&Z-Charydbis keyboard.
3. Open DevTools (F12) > Console.
4. Paste this whole script and press Enter.
5. A JSON backup will download. Keep it before applying any layout changes.

This is a DOM/UI export, not an official ZMK .keymap file.
*/

(async function ExportCurrentZmkStudioLayout() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function clean(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function visible(el) {
    if (!el) return false;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return rect.width > 5 && rect.height > 5 && cs.display !== "none" && cs.visibility !== "hidden" && cs.opacity !== "0";
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

  function getLayers() {
    return [...document.querySelectorAll('[aria-label="Keymap Layer"] [role="option"]')]
      .map((el, index) => ({
        index,
        domKey: el.getAttribute("data-key"),
        name: clean(el.textContent) || String(index),
        selected: el.getAttribute("aria-selected") === "true",
        el
      }));
  }

  function getDeviceName() {
    const headerText = [...document.querySelectorAll("header button, header [role='button'], header")]
      .map((el) => clean(el.textContent))
      .filter(Boolean);
    return headerText.find((text) => /Chary|V&Z|keyboard|ZMK/i.test(text)) || headerText[0] || "";
  }

  function getVisibleKeys() {
    return [...document.querySelectorAll('div[zoom] button[data-zoomer="true"], [x][y] button')]
      .filter(visible)
      .map((button, index) => {
        const holder = button.closest("[x][y]");
        const rect = button.getBoundingClientRect();
        const labelSpan = button.querySelector("span[aria-label]");
        const behaviorSpan = button.querySelector("span.text-xs");
        return {
          index,
          x: holder?.getAttribute("x") ?? null,
          y: holder?.getAttribute("y") ?? null,
          w: holder?.getAttribute("width") ?? holder?.getAttribute("w") ?? null,
          h: holder?.getAttribute("height") ?? holder?.getAttribute("h") ?? null,
          screenX: Math.round(rect.left),
          screenY: Math.round(rect.top),
          label: labelSpan?.getAttribute("aria-label") || clean(labelSpan?.textContent) || clean(button.textContent),
          visibleText: clean(button.textContent),
          behaviorShown: clean(behaviorSpan?.textContent),
          selected: button.getAttribute("aria-selected") === "true",
          button
        };
      })
      .sort((a, b) => Number(a.y) - Number(b.y) || Number(a.x) - Number(b.x) || a.screenY - b.screenY || a.screenX - b.screenX);
  }

  function readEditorState() {
    return {
      visibleSelects: [...document.querySelectorAll("select")].filter(visible).map((select, index) => ({
        index,
        value: select.value,
        selectedText: clean(select.selectedOptions?.[0]?.textContent),
        options: [...select.options].map((option) => ({ value: option.value, text: clean(option.textContent) }))
      })),
      visibleInputs: [...document.querySelectorAll("input")].filter(visible).map((input, index) => ({
        index,
        type: input.type,
        value: input.value,
        placeholder: input.placeholder || "",
        ariaLabel: input.getAttribute("aria-label") || ""
      })),
      visibleButtons: [...document.querySelectorAll("button")].filter(visible).map((button, index) => ({
        index,
        text: clean(button.textContent) || button.getAttribute("aria-label") || "",
        ariaPressed: button.getAttribute("aria-pressed"),
        ariaSelected: button.getAttribute("aria-selected"),
        disabled: button.disabled
      })).filter((button) => button.text && !/Save|Discard|Undo|Redo/i.test(button.text))
    };
  }

  const layers = getLayers();
  if (!layers.length) {
    alert("No ZMK Studio layers found. Connect the keyboard first, then rerun the exporter.");
    return;
  }

  const exportData = {
    exporter: "Charybdis ZMK Studio Console Exporter",
    exporterVersion: "2026-06-17.v1",
    createdAt: new Date().toISOString(),
    pageTitle: document.title,
    url: location.href,
    userAgent: navigator.userAgent,
    deviceName: getDeviceName(),
    note: "DOM/UI export for backup and planning only. Not an official .keymap export.",
    layers: []
  };

  for (const layer of layers) {
    layer.el.scrollIntoView({ block: "center" });
    layer.el.click();
    await sleep(450);

    const visibleKeys = getVisibleKeys();
    const keys = [];
    for (let i = 0; i < visibleKeys.length; i++) {
      const liveKeys = getVisibleKeys();
      const key = liveKeys[i];
      if (!key?.button) continue;
      key.button.scrollIntoView({ block: "center", inline: "center" });
      key.button.click();
      await sleep(120);
      const { button, ...serializable } = key;
      keys.push({ ...serializable, editor: readEditorState() });
    }

    exportData.layers.push({
      layerIndex: layer.index,
      domKey: layer.domKey,
      name: layer.name,
      keyCount: keys.length,
      keys
    });
  }

  const filename = `zmk-studio-layout-export-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  downloadJson(exportData, filename);
  console.log("ZMK Studio layout export complete:", exportData);
  alert(`ZMK Studio export complete.\nDownloaded: ${filename}\nKeep this as your rollback backup.`);
})();
