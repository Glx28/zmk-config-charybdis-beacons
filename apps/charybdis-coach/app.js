(function () {
  const LAYERS = ["0", "1", "2", "3", "4", "7", "8"];
  const X_LEFT = [0, 1, 2, 3, 4, 5];
  const X_RIGHT = [7, 8, 9, 10, 11, 12];
  const MAX_EVENTS = 12;

  const els = {
    activeLayer: document.getElementById("activeLayer"),
    activeApp: document.getElementById("activeApp"),
    lastAction: document.getElementById("lastAction"),
    transport: document.getElementById("transport"),
    deviceLabel: document.getElementById("deviceLabel"),
    layerTabs: document.getElementById("layerTabs"),
    keyboardMap: document.getElementById("keyboardMap"),
    searchInput: document.getElementById("searchInput"),
    focusImportantButton: document.getElementById("focusImportantButton"),
    showAllButton: document.getElementById("showAllButton"),
    fullscreenButton: document.getElementById("fullscreenButton"),
    selectedIcon: document.getElementById("selectedIcon"),
    selectedTitle: document.getElementById("selectedTitle"),
    selectedSubtitle: document.getElementById("selectedSubtitle"),
    selectedBehavior: document.getElementById("selectedBehavior"),
    selectedOutput: document.getElementById("selectedOutput"),
    selectedModifiers: document.getElementById("selectedModifiers"),
    selectedPurpose: document.getElementById("selectedPurpose"),
    selectedNotes: document.getElementById("selectedNotes"),
    heldLayers: document.getElementById("heldLayers"),
    lockedLayer: document.getElementById("lockedLayer"),
    toggledLayers: document.getElementById("toggledLayers"),
    stateAge: document.getElementById("stateAge"),
    eventList: document.getElementById("eventList"),
    appList: document.getElementById("appList")
  };

  const state = {
    rows: [],
    rowsByLayer: new Map(),
    apps: [],
    layoutSpec: {},
    displayedLayer: "0",
    liveLayer: "0",
    selectedKey: null,
    query: "",
    focusImportant: false,
    lastState: null,
    events: []
  };

  const icons = {
    key: '<svg viewBox="0 0 24 24"><path d="M4 7h16v10H4zM7 10h.01M11 10h.01M15 10h.01M8 14h8"/></svg>',
    layer: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>',
    mouse: '<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 1 6 6v6a6 6 0 0 1-12 0V9a6 6 0 0 1 6-6Z"/><path d="M12 3v7"/></svg>',
    bluetooth: '<svg viewBox="0 0 24 24"><path d="m7 7 10 10-5 4V3l5 4L7 17"/></svg>',
    output: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H4zM8 21h8M12 16v5"/></svg>',
    system: '<svg viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M3 12h4M17 12h4M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>',
    danger: '<svg viewBox="0 0 24 24"><path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v5M12 18h.01"/></svg>',
    transparent: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="m4 20 16-16"/></svg>'
  };

  function clean(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function csvSplit(line) {
    const out = [];
    let cur = "";
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const next = line[i + 1];
      if (ch === '"' && quoted && next === '"') {
        cur += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = !quoted;
      } else if (ch === "," && !quoted) {
        out.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur);
    return out;
  }

  function parseCsv(text) {
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    const headers = csvSplit(lines.shift());
    return lines.map((line) => {
      const values = csvSplit(line);
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      return row;
    });
  }

  async function loadJson(path, fallback) {
    try {
      const res = await fetch(`${path}?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`${res.status}`);
      return await res.json();
    } catch {
      return fallback;
    }
  }

  async function loadText(path) {
    const res = await fetch(`${path}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    return await res.text();
  }

  function behaviorKind(row) {
    const behavior = clean(row.behavior);
    const label = clean(row.visual_label);
    if (/reset|bootloader/i.test(behavior) || /reset|bootloader/i.test(label)) return "danger";
    if (/studio|system/i.test(behavior) || /studio|system/i.test(label)) return "system";
    if (/transparent|none/i.test(behavior)) return "transparent";
    if (/mouse/i.test(behavior)) return "mouse";
    if (/bluetooth/i.test(behavior)) return "bluetooth";
    if (/output/i.test(behavior)) return "output";
    if (/layer/i.test(behavior)) return "layer";
    return "key";
  }

  function iconFor(row) {
    const kind = behaviorKind(row);
    return { kind, html: icons[kind] || icons.key };
  }

  function rowSearchText(row) {
    return [
      row.layer,
      row.layer_role,
      row.visual_label,
      row.behavior,
      row.parameter,
      row.modifiers,
      row.purpose,
      row.usage_notes
    ].map(clean).join(" ").toLowerCase();
  }

  function isImportant(row) {
    return !/transparent|none/i.test(row.behavior)
      && (/layer|mouse|bluetooth|output|reset|bootloader|studio/i.test(`${row.behavior} ${row.visual_label} ${row.purpose}`)
        || row.modifiers
        || ["0", "1", "2", "3", "4", "7", "8"].includes(row.layer));
  }

  function groupRows() {
    state.rowsByLayer.clear();
    for (const layer of LAYERS) state.rowsByLayer.set(layer, []);
    for (const row of state.rows) {
      if (!state.rowsByLayer.has(row.layer)) state.rowsByLayer.set(row.layer, []);
      state.rowsByLayer.get(row.layer).push(row);
    }
  }

  function layerRole(layer) {
    const rows = state.rowsByLayer.get(layer) || [];
    return clean(rows[0]?.layer_role || state.layoutSpec.layers?.[layer] || `Layer ${layer}`);
  }

  function renderLayerTabs() {
    els.layerTabs.innerHTML = "";
    for (const layer of LAYERS) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "layer-tab";
      button.dataset.layer = layer;
      button.title = layerRole(layer);
      button.innerHTML = `<strong>${layer}</strong><span>${escapeHtml(shortLayerRole(layerRole(layer)))}</span>`;
      button.addEventListener("click", () => {
        state.displayedLayer = layer;
        render();
      });
      els.layerTabs.appendChild(button);
    }
  }

  function shortLayerRole(role) {
    return clean(role).replace(" and ", " / ").replace("Window, app, language, mouse/game/travel control", "Window");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function keyId(row) {
    return `${row.layer}:${row.x}:${row.y}`;
  }

  function renderKeyboard() {
    els.keyboardMap.innerHTML = "";
    const rows = state.rowsByLayer.get(state.displayedLayer) || [];
    const rowMap = new Map(rows.map((row) => [`${row.x}:${row.y}`, row]));
    els.keyboardMap.appendChild(renderHand("left", X_LEFT, rowMap));
    els.keyboardMap.appendChild(renderHand("right", X_RIGHT, rowMap));
    applyFilters();
  }

  function renderHand(side, xs, rowMap) {
    const hand = document.createElement("div");
    hand.className = `hand ${side}`;
    for (let y = 0; y <= 5; y++) {
      for (const x of xs) {
        const row = rowMap.get(`${x}:${y}`);
        if (!row) {
          const spacer = document.createElement("div");
          spacer.className = "key-spacer";
          hand.appendChild(spacer);
          continue;
        }
        const icon = iconFor(row);
        const button = document.createElement("button");
        button.type = "button";
        button.className = `keycap ${icon.kind}`;
        if (icon.kind === "danger") button.classList.add("warning");
        button.dataset.search = rowSearchText(row);
        button.dataset.important = String(isImportant(row));
        button.dataset.keyId = keyId(row);
        button.title = `${clean(row.visual_label)} - ${clean(row.behavior)} - ${clean(row.parameter)}`;
        button.innerHTML = [
          '<div class="key-top">',
          `<span class="behavior-icon ${icon.kind}">${icon.html}</span>`,
          `<span class="key-behavior">${escapeHtml(clean(row.behavior))}</span>`,
          "</div>",
          `<div class="key-label">${escapeHtml(clean(row.visual_label) || clean(row.parameter) || ".")}</div>`,
          `<div class="key-purpose">${escapeHtml(clean(row.modifiers || row.parameter))}</div>`
        ].join("");
        button.addEventListener("click", () => selectKey(row));
        hand.appendChild(button);
      }
    }
    return hand;
  }

  function selectKey(row) {
    state.selectedKey = row;
    const icon = iconFor(row);
    els.selectedIcon.className = `behavior-icon ${icon.kind}`;
    els.selectedIcon.innerHTML = icon.html;
    els.selectedTitle.textContent = clean(row.visual_label) || "Unnamed key";
    els.selectedSubtitle.textContent = `Layer ${row.layer} - x${row.x} y${row.y}`;
    els.selectedBehavior.textContent = clean(row.behavior) || "-";
    els.selectedOutput.textContent = clean(row.parameter) || "-";
    els.selectedModifiers.textContent = clean(row.modifiers) || "-";
    els.selectedPurpose.textContent = clean(row.purpose) || "-";
    els.selectedNotes.textContent = clean(row.usage_notes) || "-";
    document.querySelectorAll(".keycap.selected").forEach((el) => el.classList.remove("selected"));
    document.querySelector(`[data-key-id="${CSS.escape(keyId(row))}"]`)?.classList.add("selected");
  }

  function renderApps() {
    els.appList.innerHTML = "";
    for (const app of state.apps) {
      const chip = document.createElement("span");
      chip.className = "app-chip";
      chip.title = app.notes || app.id;
      chip.textContent = app.aliases?.[0] || app.id;
      els.appList.appendChild(chip);
    }
  }

  function applyFilters() {
    const query = state.query.toLowerCase();
    document.querySelectorAll(".keycap").forEach((el) => {
      const matchesSearch = !query || el.dataset.search.includes(query);
      const matchesFocus = !state.focusImportant || el.dataset.important === "true";
      el.classList.toggle("filtered-out", !(matchesSearch && matchesFocus));
    });
  }

  function renderStatus() {
    els.activeLayer.textContent = state.liveLayer || state.displayedLayer || "0";
    document.querySelectorAll(".layer-tab").forEach((tab) => {
      const layer = tab.dataset.layer;
      tab.classList.toggle("active", layer === state.displayedLayer);
      tab.classList.toggle("live", layer === state.liveLayer && layer !== state.displayedLayer);
    });
    document.querySelectorAll(".keycap.live-key").forEach((el) => el.classList.remove("live-key"));
    const liveKey = state.lastState?.lastKey;
    if (liveKey && liveKey.layer && String(liveKey.layer) === state.displayedLayer) {
      const selector = `[data-key-id="${CSS.escape(`${liveKey.layer}:${liveKey.x}:${liveKey.y}`)}"]`;
      document.querySelector(selector)?.classList.add("live-key");
    }
  }

  function renderEvents() {
    els.eventList.innerHTML = "";
    for (const event of state.events.slice(0, MAX_EVENTS)) {
      const li = document.createElement("li");
      const when = event.updatedAt ? new Date(event.updatedAt) : new Date();
      li.innerHTML = `<time>${escapeHtml(when.toLocaleTimeString())}</time>${escapeHtml(event.lastAction || "State update")}`;
      els.eventList.appendChild(li);
    }
  }

  function renderNow() {
    const live = state.lastState || {};
    els.activeApp.textContent = clean(live.activeApp) || "Unknown";
    els.lastAction.textContent = clean(live.lastAction) || "Ready";
    els.transport.textContent = clean(live.transport) || "Bluetooth";
    els.heldLayers.textContent = formatList(live.heldLayers);
    els.lockedLayer.textContent = clean(live.lockedLayer) || "-";
    els.toggledLayers.textContent = formatList(live.toggledLayers);
    els.stateAge.textContent = live.updatedAt ? `${Math.max(0, Math.round((Date.now() - Date.parse(live.updatedAt)) / 1000))}s` : "-";
  }

  function formatList(value) {
    if (Array.isArray(value) && value.length) return value.join(", ");
    return "-";
  }

  function deriveLiveLayer(live) {
    if (!live) return state.liveLayer;
    const toggled = Array.isArray(live.toggledLayers) ? live.toggledLayers : [];
    const held = Array.isArray(live.heldLayers) ? live.heldLayers : [];
    if (toggled.includes("8")) return "8";
    if (live.lockedLayer) return String(live.lockedLayer);
    if (held.length) return String(held[held.length - 1]);
    return "0";
  }

  function pushEvent(live) {
    if (!live?.lastAction) return;
    const last = state.events[0];
    if (last && last.lastAction === live.lastAction && last.updatedAt === live.updatedAt) return;
    state.events.unshift({ lastAction: live.lastAction, updatedAt: live.updatedAt });
    state.events = state.events.slice(0, MAX_EVENTS);
  }

  async function pollState() {
    const live = await loadJson("../../runtime/charybdis_state.json", null);
    if (live) {
      state.lastState = live;
      const newLiveLayer = deriveLiveLayer(live);

      // Auto-switch to active layer when it changes (USB live monitor)
      if (newLiveLayer && newLiveLayer !== state.liveLayer) {
        state.displayedLayer = newLiveLayer;
        state.liveLayer = newLiveLayer;
        render();  // Full re-render when layer changes
      } else {
        state.liveLayer = newLiveLayer;
        renderNow();
        renderStatus();
      }

      pushEvent(live);
      renderEvents();
    } else {
      renderNow();
    }
  }

  function render() {
    renderLayerTabs();
    renderKeyboard();
    renderStatus();
    if (state.selectedKey && state.selectedKey.layer === state.displayedLayer) {
      selectKey(state.selectedKey);
    } else {
      const first = (state.rowsByLayer.get(state.displayedLayer) || []).find((row) => behaviorKind(row) !== "transparent");
      if (first) selectKey(first);
    }
  }

  async function init() {
    const [csvText, layoutSpec, appsConfig] = await Promise.all([
      loadText("../../layout/keybindings_explained.csv"),
      loadJson("../../layout/layout_spec.json", {}),
      loadJson("../../config/charybdis_apps.json", { apps: [] })
    ]);
    state.rows = parseCsv(csvText);
    state.layoutSpec = layoutSpec || {};
    state.apps = appsConfig.apps || [];
    els.deviceLabel.textContent = clean(state.layoutSpec.device) || "Bluetooth helper";
    groupRows();
    renderApps();
    render();
    await pollState();
    setInterval(pollState, 500);
    setInterval(renderNow, 1000);
  }

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value || "";
    applyFilters();
  });

  els.focusImportantButton.addEventListener("click", () => {
    state.focusImportant = true;
    els.focusImportantButton.classList.add("active");
    els.showAllButton.classList.remove("active");
    applyFilters();
  });

  els.showAllButton.addEventListener("click", () => {
    state.focusImportant = false;
    els.showAllButton.classList.add("active");
    els.focusImportantButton.classList.remove("active");
    applyFilters();
  });

  els.fullscreenButton.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  });

  // Live keypress highlighting - highlights keys when you type them
  const keyPressTimeouts = new Map();

  document.addEventListener("keydown", (event) => {
    // Don't interfere with search input
    if (event.target === els.searchInput) return;

    const key = event.key;

    // Map keyboard event to ZMK parameter names
    const keyMap = {
      "Escape": "Escape", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5",
      "6": "6", "7": "7", "8": "8", "9": "9", "0": "0",
      "Backspace": "Delete", "Tab": "Tab",
      "q": "Q", "w": "W", "e": "E", "r": "R", "t": "T",
      "y": "Y", "u": "U", "i": "I", "o": "O", "p": "P",
      "a": "A", "s": "S", "d": "D", "f": "F", "g": "G",
      "h": "H", "j": "J", "k": "K", "l": "L",
      ";": "SemiColon", "'": "Apostrophe", "\\": "Backslash",
      "z": "Z", "x": "X", "c": "C", "v": "V", "b": "B",
      "n": "N", "m": "M", ",": "Comma", ".": "Period",
      "/": "ForwardSlash", "-": "Minus", " ": "Spacebar",
      "Enter": "Return", "Control": "LeftControl",
      "Shift": "LeftShift", "Alt": "LeftAlt", "Meta": "GUI"
    };

    const zmkKey = keyMap[key] || keyMap[key.toLowerCase()];
    if (!zmkKey) return;

    // Find matching key on current displayed layer
    const rows = state.rowsByLayer.get(state.displayedLayer) || [];
    const matchingKey = rows.find(row => {
      const param = clean(row.parameter || row.visual_label || "").toUpperCase();
      const search = zmkKey.toUpperCase();
      return param.includes(search) || row.visual_label?.toUpperCase() === key.toUpperCase();
    });

    if (matchingKey) {
      const keyId = `${matchingKey.layer}:${matchingKey.x}:${matchingKey.y}`;
      const selector = `[data-key-id="${CSS.escape(keyId)}"]`;
      const keyEl = document.querySelector(selector);

      if (keyEl) {
        // Clear previous timeout for this key
        const prevTimeout = keyPressTimeouts.get(keyId);
        if (prevTimeout) clearTimeout(prevTimeout);

        // Add pulsing highlight
        keyEl.classList.add("live-key");

        // Remove highlight after 300ms
        const timeout = setTimeout(() => {
          keyEl.classList.remove("live-key");
          keyPressTimeouts.delete(keyId);
        }, 300);

        keyPressTimeouts.set(keyId, timeout);
      }
    }
  });

  init().catch((error) => {
    els.keyboardMap.innerHTML = `<div class="panel selected-panel"><h2>Coach failed to load</h2><p>${escapeHtml(error.message)}</p></div>`;
  });
})();
