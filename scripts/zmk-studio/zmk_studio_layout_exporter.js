(async function ZMK_STUDIO_EXPORTER(){
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function clean(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function isVisible(el) {
    if (!el) return false;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return false;
    const r = el.getBoundingClientRect();
    return r.width > 5 && r.height > 5;
  }

  function downloadJSON(obj, filename) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
  }

  function getDeviceName() {
    const headerButtons = [...document.querySelectorAll("header button")].map(b => clean(b.innerText)).filter(Boolean);
    return headerButtons.find(t => /Chary|ZMK|V&Z|keyboard/i.test(t)) || headerButtons[0] || "";
  }

  function getLayoutName() {
    const layoutLabel = [...document.querySelectorAll("span,label")].find(e => clean(e.innerText) === "Layout:");
    if (!layoutLabel) return "";
    const panel = layoutLabel.closest("div");
    return clean(panel?.innerText || "").replace(/^Layout:\s*/, "");
  }

  function getLayers() {
    return [...document.querySelectorAll('[aria-label="Keymap Layer"] [role="option"]')]
      .map((el, idx) => ({
        idx,
        domKey: el.getAttribute("data-key"),
        name: clean(el.innerText).replace(/[✎鉛筆pencil]+/gi, "").trim() || String(idx),
        selected: el.getAttribute("aria-selected") === "true",
        el
      }));
  }

  function getVisibleKeyButtons() {
    return [...document.querySelectorAll('div[zoom] button[data-zoomer="true"]')]
      .filter(isVisible)
      .map((btn, index) => {
        const holder = btn.closest("[x][y]");
        const abs = btn.closest("div.absolute");
        const rect = btn.getBoundingClientRect();
        const labelSpan = btn.querySelector("span[aria-label]");
        const behaviorSpan = btn.querySelector("span.text-xs");
        return {
          index,
          x: holder?.getAttribute("x") ?? null,
          y: holder?.getAttribute("y") ?? null,
          w: holder?.getAttribute("width") ?? null,
          h: holder?.getAttribute("height") ?? null,
          cssTop: abs?.style?.top ?? null,
          cssLeft: abs?.style?.left ?? null,
          screenX: Math.round(rect.left),
          screenY: Math.round(rect.top),
          label: labelSpan?.getAttribute("aria-label") || clean(labelSpan?.innerText) || clean(btn.innerText),
          visibleText: clean(btn.innerText),
          behaviorShown: clean(behaviorSpan?.innerText),
          selected: btn.getAttribute("aria-selected") === "true",
          btn
        };
      })
      .sort((a,b) => (parseInt(a.cssTop)||a.screenY) - (parseInt(b.cssTop)||b.screenY) || (parseInt(a.cssLeft)||a.screenX) - (parseInt(b.cssLeft)||b.screenX));
  }

  function readEditorState() {
    const visibleSelects = [...document.querySelectorAll("select")]
      .filter(isVisible)
      .map((s, i) => ({
        index: i,
        className: s.className || "",
        value: s.value,
        selectedText: clean(s.selectedOptions?.[0]?.textContent || ""),
        options: [...s.options].map(o => ({value: o.value, text: clean(o.textContent)}))
      }));

    const visibleInputs = [...document.querySelectorAll("input")]
      .filter(isVisible)
      .map((inp, i) => ({
        index: i,
        type: inp.type,
        value: inp.value,
        placeholder: inp.placeholder || "",
        ariaLabel: inp.getAttribute("aria-label") || ""
      }));

    const editorButtons = [...document.querySelectorAll("button")]
      .filter(isVisible)
      .map((b, i) => ({
        index: i,
        text: clean(b.innerText) || b.getAttribute("aria-label") || "",
        ariaPressed: b.getAttribute("aria-pressed"),
        ariaSelected: b.getAttribute("aria-selected"),
        disabled: b.disabled,
        className: b.className || ""
      }))
      .filter(b => b.text && !/Undo|Redo|Save|Discard|V&Z|Studio|Close|Restore Stock/i.test(b.text));

    const bodyText = document.body.innerText || "";
    let editorText = "";
    const behaviorPos = bodyText.lastIndexOf("Behavior:");
    if (behaviorPos >= 0) editorText = clean(bodyText.slice(behaviorPos, behaviorPos + 2500));

    return {
      visibleSelects,
      visibleInputs,
      editorButtons,
      editorText
    };
  }

  const initialLayers = getLayers();
  if (!initialLayers.length) {
    alert("ZMK Studio exporter: I could not find the layer list. Make sure ZMK Studio is connected to the keyboard first.");
    return;
  }

  const exportData = {
    exporter: "ChatGPT ZMK Studio DOM Exporter",
    exporterVersion: "2026-06-17.1",
    createdAt: new Date().toISOString(),
    pageTitle: document.title,
    url: location.href,
    userAgent: navigator.userAgent,
    deviceName: getDeviceName(),
    layoutName: getLayoutName(),
    note: "This is a DOM/UI export from ZMK Studio, not an official ZMK .keymap export.",
    layers: []
  };

  for (const layer of initialLayers) {
    layer.el.scrollIntoView({block:"center"});
    layer.el.click();
    await sleep(450);

    const layerKeys = getVisibleKeyButtons();
    const keys = [];

    for (let i = 0; i < layerKeys.length; i++) {
      const liveKeys = getVisibleKeyButtons();
      const k = liveKeys[i];
      if (!k || !k.btn) continue;
      k.btn.scrollIntoView({block:"center", inline:"center"});
      k.btn.click();
      await sleep(120);

      const {btn, ...serializableKey} = k;
      keys.push({
        ...serializableKey,
        editor: readEditorState()
      });
    }

    exportData.layers.push({
      layerIndex: layer.idx,
      domKey: layer.domKey,
      name: layer.name,
      keyCount: keys.length,
      keys
    });
  }

  const filename = `zmk-studio-layout-export-${new Date().toISOString().replace(/[:.]/g,"-")}.json`;
  downloadJSON(exportData, filename);
  console.log("ZMK Studio layout export complete:", exportData);
  alert(`ZMK Studio export complete.\nDownloaded: ${filename}\nUpload that JSON to ChatGPT.`);
})();