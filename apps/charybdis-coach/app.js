(function () {
  const LAYERS = ["0", "1", "2", "3", "4", "5", "7", "8", "9"];
  const X_LEFT = [0, 1, 2, 3, 4, 5];
  const X_RIGHT = [7, 8, 9, 10, 11, 12];
  const MAX_EVENTS = 12;
  const BEACON_STALE_MS = 12000;

  const els = {
    activeLayer: document.getElementById("activeLayer"),
    activeApp: document.getElementById("activeApp"),
    lastAction: document.getElementById("lastAction"),
    transport: document.getElementById("transport"),
    beaconBanner: document.getElementById("beaconBanner"),
    beaconBannerTitle: document.getElementById("beaconBannerTitle"),
    beaconBannerDetail: document.getElementById("beaconBannerDetail"),
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
    appList: document.getElementById("appList"),
    drillButton: document.getElementById("drillButton"),
    quizButton: document.getElementById("quizButton"),
    guidedButton: document.getElementById("guidedButton"),
    practiceStopButton: document.getElementById("practiceStopButton"),
    practiceResetButton: document.getElementById("practiceResetButton"),
    practicePrompt: document.getElementById("practicePrompt"),
    practiceScore: document.getElementById("practiceScore"),
    practiceMastery: document.getElementById("practiceMastery"),
    practiceAppSelect: document.getElementById("practiceAppSelect"),
    workflowAppSelect: document.getElementById("workflowAppSelect"),
    workflowSearch: document.getElementById("workflowSearch"),
    workflowContent: document.getElementById("workflowContent")
  };

  const state = {
    rows: [],
    rowsByLayer: new Map(),
    apps: [],
    layoutSpec: {},
    hostKeyboard: null,
    displayedLayer: "0",
    liveLayer: "0",
    selectedKey: null,
    query: "",
    focusImportant: false,
    lastState: null,
    events: [],
    practice: { mode: null, target: null, guidedList: [], guidedIndex: 0, attempts: 0, correct: 0 },
    progress: {}
  };

  const LAYER_TAB_META = {
    "0": { glyph: "Aa", title: "Base typing" },
    "1": { glyph: "Nav", title: "Navigation" },
    "2": { glyph: "Mou", title: "Mouse lock" },
    "3": { glyph: "Win", title: "Window / apps" },
    "4": { glyph: "Sys", title: "System / BT" },
    "5": { glyph: "Code", title: "Code / IDE" },
    "7": { glyph: "RPG", title: "Game layer" },
    "8": { glyph: "Spd", title: "Speed travel" },
    "9": { glyph: "DMS", title: "M-Files / DMS" }
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

  function shortHint(text, max = 18) {
    const value = clean(text);
    if (!value) return "";
    return value.length > max ? `${value.slice(0, max - 1)}…` : value;
  }

  function layerParam(row) {
    const param = clean(row.parameter);
    const match = param.match(/(\d+)/);
    return match ? match[1] : "";
  }

  function classifyKey(row) {
    const behavior = clean(row.behavior);
    const behaviorLower = behavior.toLowerCase();
    const label = clean(row.visual_label);
    const labelLower = label.toLowerCase();
    const param = clean(row.parameter);
    const modifiers = clean(row.modifiers);
    const combined = `${label} ${param} ${behavior}`.toLowerCase();

    const coachMap = {
      coach_l1_hold: { kind: "nav", primary: "Nav", badge: "NAV", secondary: "Hold → L1" },
      coach_l2_hold: { kind: "mouse-hold", primary: "Mouse", badge: "MOU", secondary: "Hold → L2" },
      coach_l3_hold: { kind: "window", primary: "Window", badge: "WIN", secondary: "Hold → L3" },
      coach_l4_hold: { kind: "system-layer", primary: "System", badge: "SYS", secondary: "Hold → L4" },
      coach_mouse_lock: { kind: "lock", primary: "MLock", badge: "LCK", secondary: "Lock mouse L2" },
      coach_game_lock: { kind: "game", primary: "Game", badge: "GM", secondary: "Lock → L7" },
      coach_base: { kind: "home", primary: "Base", badge: "HOME", secondary: "Return L0" },
      coach_travel_toggle: { kind: "speed", primary: "Speed", badge: "SPD", secondary: "Toggle L8" },
      coach_travel_off: { kind: "speed-off", primary: "Prec", badge: "PRC", secondary: "Exit speed" },
      coach_recover_base: { kind: "home", primary: "Base", badge: "HOME", secondary: "Recover L0" },
      coach_scroll_toggle: { kind: "scroll", primary: "Scroll", badge: "SCR", secondary: "Toggle L6" },
      coach_l8_hold: { kind: "speed-hold", primary: "Speed", badge: "SPD", secondary: "Hold L8" }
    };
    if (coachMap[behaviorLower]) return { ...coachMap[behaviorLower] };

    if (/reset|bootloader/i.test(behavior) || /reset|bootloader/i.test(label)) {
      return { kind: "danger", primary: label || "Reset", badge: "!", secondary: behavior };
    }
    if (/studio/i.test(behavior)) {
      return { kind: "studio", primary: "Studio", badge: "STU", secondary: "Unlock" };
    }
    if (/transparent|none/i.test(behavior)) {
      return { kind: "transparent", primary: "·", badge: "", secondary: "" };
    }
    if (/mouse key press/i.test(behavior)) {
      const btn = label.replace(/mouse key press/i, "").trim() || param.replace(/select:/i, "") || "Btn";
      return { kind: "mouse-btn", primary: btn, badge: "MB", secondary: shortHint(param, 14) };
    }
    if (/bluetooth/i.test(behavior)) {
      return { kind: "bluetooth", primary: label || "BT", badge: "BT", secondary: shortHint(param, 16) };
    }
    if (/output/i.test(behavior)) {
      return { kind: "output", primary: label || "Out", badge: "OUT", secondary: shortHint(param, 16) };
    }
    if (/toggle layer/i.test(behavior)) {
      const layer = layerParam(row);
      if (layer === "6") return { kind: "scroll", primary: "Scroll", badge: "SCR", secondary: "Toggle L6" };
      if (layer === "8") return { kind: "speed", primary: "Speed", badge: "SPD", secondary: "Toggle L8" };
      return { kind: "toggle", primary: label || `T${layer}`, badge: "TG", secondary: `Toggle L${layer}` };
    }
    if (/momentary layer/i.test(behavior)) {
      const layer = layerParam(row);
      if (layer === "8") return { kind: "speed-hold", primary: "Speed", badge: "SPD", secondary: "Hold L8" };
      return { kind: "momentary", primary: label || `M${layer}`, badge: "MO", secondary: `Hold L${layer}` };
    }
    if (/to layer/i.test(behavior)) {
      const layer = layerParam(row);
      if (layer === "0") return { kind: "home", primary: "Exit", badge: "X", secondary: "To L0" };
      if (layer === "7") return { kind: "game", primary: "Game", badge: "GM", secondary: "To L7" };
      return { kind: "jump", primary: label || `L${layer}`, badge: "GO", secondary: `To L${layer}` };
    }

    if (/leftarrow|←/i.test(combined)) return { kind: "arrow", primary: "←", badge: "", secondary: shortHint(modifiers, 12) };
    if (/rightarrow|→/i.test(combined)) return { kind: "arrow", primary: "→", badge: "", secondary: shortHint(modifiers, 12) };
    if (/uparrow|↑/i.test(combined)) return { kind: "arrow", primary: "↑", badge: "", secondary: shortHint(modifiers, 12) };
    if (/downarrow|↓/i.test(combined)) return { kind: "arrow", primary: "↓", badge: "", secondary: shortHint(modifiers, 12) };

    if (/key press/i.test(behavior)) {
      const primary = label || param.replace(/^Keyboard\s+/i, "").split(" and ")[0] || "?";
      if (/^f\d{1,2}$/i.test(primary)) {
        return { kind: "function", primary: primary.toUpperCase(), badge: "Fn", secondary: shortHint(modifiers, 12) };
      }
      if (/shift|ctrl|control|alt|gui|win/i.test(`${primary} ${label}`)) {
        return { kind: "modifier", primary: label || primary, badge: "Mod", secondary: shortHint(modifiers, 12) };
      }
      if (/space|spacebar|␣/i.test(`${primary} ${label}`)) {
        return { kind: "space", primary: "␣", badge: "", secondary: shortHint(modifiers, 12) };
      }
      if (/enter|return|ret/i.test(`${primary} ${label}`)) {
        return { kind: "enter", primary: "↵", badge: "", secondary: shortHint(modifiers, 12) };
      }
      if (/delete|bksp|backspace/i.test(`${primary} ${label}`)) {
        return { kind: "edit", primary: label || "Del", badge: "", secondary: shortHint(modifiers, 12) };
      }
      if (/tab/i.test(`${primary} ${label}`)) {
        return { kind: "edit", primary: "Tab", badge: "", secondary: shortHint(modifiers, 12) };
      }
      if (/escape|esc/i.test(`${primary} ${label}`)) {
        return { kind: "edit", primary: "Esc", badge: "", secondary: shortHint(modifiers, 12) };
      }
      return {
        kind: "letter",
        primary,
        badge: "",
        secondary: shortHint(modifiers, 14)
      };
    }

    return { kind: "action", primary: label || "?", badge: "···", secondary: shortHint(behavior, 16) };
  }

  function behaviorKind(row) {
    return classifyKey(row).kind;
  }

  function behaviorCaption(row) {
    return classifyKey(row).secondary || clean(row.behavior) || clean(row.visual_label);
  }

  function visualFor(row) {
    return classifyKey(row);
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
      const tabMeta = LAYER_TAB_META[layer] || { glyph: layer, title: layerRole(layer) };
      button.innerHTML = `<strong class="layer-tab-num">${layer}</strong><span class="layer-tab-glyph">${escapeHtml(tabMeta.glyph)}</span><span class="layer-tab-role">${escapeHtml(shortLayerRole(layerRole(layer)))}</span>`;
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
        const visual = visualFor(row);
        const button = document.createElement("button");
        button.type = "button";
        button.className = `keycap kind-${visual.kind}`;
        if (visual.kind === "danger") button.classList.add("warning");
        if (visual.kind === "transparent") button.classList.add("transparent");
        button.dataset.search = rowSearchText(row);
        button.dataset.important = String(isImportant(row));
        button.dataset.keyId = keyId(row);
        button.title = `${clean(row.visual_label)} — ${clean(row.behavior)} — ${clean(row.parameter)}`;
        const badgeHtml = visual.badge
          ? `<span class="key-badge" aria-hidden="true">${escapeHtml(visual.badge)}</span>`
          : "";
        const secondaryHtml = visual.secondary
          ? `<div class="key-secondary">${escapeHtml(visual.secondary)}</div>`
          : "";
        button.innerHTML = [
          badgeHtml,
          `<div class="key-primary">${escapeHtml(visual.primary)}</div>`,
          secondaryHtml
        ].join("");
        button.addEventListener("click", () => onUserSelectKey(row));
        hand.appendChild(button);
      }
    }
    return hand;
  }

  function selectKey(row) {
    state.selectedKey = row;
    const visual = visualFor(row);
    els.selectedIcon.className = `behavior-icon kind-${visual.kind}`;
    els.selectedIcon.textContent = visual.badge || visual.primary.slice(0, 3);
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
    document.querySelectorAll(".keycap.beacon-live-key, .keycap.beacon-source-key").forEach((el) => {
      el.classList.remove("beacon-live-key", "beacon-source-key");
    });
    const liveKey = state.lastState?.lastKey;
    if (liveKey?.layer && liveKey.x !== "" && liveKey.y !== "") {
      const selector = `[data-key-id="${CSS.escape(`${liveKey.layer}:${liveKey.x}:${liveKey.y}`)}"]`;
      const keyEl = document.querySelector(selector);
      if (keyEl) {
        const onDisplayedLayer = String(liveKey.layer) === state.displayedLayer;
        keyEl.classList.add(onDisplayedLayer ? "beacon-live-key" : "beacon-source-key");
      }
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

  function beaconAgeMs(live, field) {
    if (!live) return Number.POSITIVE_INFINITY;
    const ts = live[field] || (field === "beaconHeartbeatAt" ? live.updatedAt : "");
    if (!ts) return Number.POSITIVE_INFINITY;
    const parsed = Date.parse(ts);
    if (Number.isNaN(parsed)) return Number.POSITIVE_INFINITY;
    return Math.max(0, Date.now() - parsed);
  }

  function beaconStatus(live) {
    const restartHint = "Run scripts\\windows\\start_charybdis_coach.ps1 or restart_beacon_listener.ps1.";
    if (!live) {
      return {
        level: "error",
        alive: false,
        stale: true,
        ageSec: null,
        title: "Beacon not detected",
        detail: `No state file from the beacon listener. ${restartHint}`,
        transportLabel: "No beacon",
        source: ""
      };
    }

    const hasHeartbeat = live.beaconHeartbeatAt != null && live.beaconHeartbeatAt !== "";
    const hasBeaconMeta = live.beaconAlive === true || Boolean(live.beaconSource) || hasHeartbeat;
    const heartbeatAgeMs = beaconAgeMs(live, "beaconHeartbeatAt");
    const updateAgeMs = beaconAgeMs(live, "updatedAt");
    const ageMs = hasHeartbeat ? heartbeatAgeMs : updateAgeMs;
    const ageSec = Number.isFinite(ageMs) ? Math.max(0, Math.round(ageMs / 1000)) : null;
    const explicitDead = live.beaconAlive === false;
    const stale = explicitDead || ageMs > BEACON_STALE_MS;
    const source = clean(live.beaconSource) || (hasBeaconMeta ? "listener" : "");

    if (stale) {
      const level = !hasBeaconMeta || explicitDead || (ageSec != null && ageSec > BEACON_STALE_MS * 2)
        ? "error"
        : "warn";
      const title = explicitDead ? "Beacon listener stopped" : "Beacon not responding";
      let detail = `Layer thumb sync is offline`;
      if (ageSec != null) detail += ` (${ageSec}s since last signal)`;
      if (source) detail += `. Last source: ${source}`;
      if (!hasBeaconMeta) detail += ". State file has no beacon heartbeat — listener may be dead or an old build.";
      detail += `. ${restartHint}`;
      return {
        level,
        alive: false,
        stale: true,
        ageSec,
        title,
        detail,
        transportLabel: ageSec != null ? `No beacon (${ageSec}s)` : "No beacon",
        source
      };
    }

    const transportBase = clean(live.transport) || "USB";
    const transportLabel = hasBeaconMeta ? `Beacon live · ${transportBase}` : transportBase;
    return {
      level: "ok",
      alive: true,
      stale: false,
      ageSec,
      title: "Beacon connected",
      detail: source
        ? `Layer sync active (${source}, PID ${live.beaconPid ?? "?"})`
        : "Layer sync active",
      transportLabel,
      source
    };
  }

  function beaconListenerStale(live) {
    return beaconStatus(live).stale;
  }

  function renderBeaconBanner(live) {
    if (!els.beaconBanner) return;
    const status = beaconStatus(live);
    const show = status.stale;
    els.beaconBanner.hidden = !show;
    els.beaconBanner.classList.toggle("beacon-banner--hidden", !show);
    els.beaconBanner.classList.remove("beacon-banner--ok", "beacon-banner--warn", "beacon-banner--error");
    if (show) {
      els.beaconBanner.classList.add(`beacon-banner--${status.level}`);
    }
    if (els.beaconBannerTitle) els.beaconBannerTitle.textContent = status.title;
    if (els.beaconBannerDetail) els.beaconBannerDetail.textContent = status.detail;
  }

  function renderNow() {
    const live = state.lastState;
    const beacon = beaconStatus(live);
    const liveObj = live || {};
    els.activeApp.textContent = clean(liveObj.activeApp) || "Unknown";
    els.lastAction.textContent = clean(liveObj.lastAction) || "Ready";
    const ageSec = liveObj.updatedAt
      ? Math.max(0, Math.round((Date.now() - Date.parse(liveObj.updatedAt)) / 1000))
      : null;
    els.transport.textContent = beacon.transportLabel;
    els.heldLayers.textContent = formatList(liveObj.heldLayers);
    els.lockedLayer.textContent = clean(liveObj.lockedLayer) || "-";
    els.toggledLayers.textContent = formatList(liveObj.toggledLayers);
    els.stateAge.textContent = ageSec != null ? `${ageSec}s` : "-";

    if (els.transport) {
      els.transport.title = beacon.stale
        ? beacon.detail
        : (clean(state.layoutSpec?.host_keyboard?.primary)
          ? "Beacon listener updating layer state; coach matches physical keys (event.code) for Norwegian Windows"
          : beacon.detail);
      els.transport.classList.toggle("stale-sync", beacon.stale);
      els.transport.classList.toggle("beacon-down", beacon.stale);
      els.transport.classList.toggle("beacon-live", beacon.alive);
    }
    renderBeaconBanner(live);
  }

  function formatList(value) {
    if (Array.isArray(value) && value.length) return value.join(", ");
    return "-";
  }

  function normalizeLayerList(value) {
    if (!Array.isArray(value)) return [];
    return value.map((item) => String(item));
  }

  function deriveLiveLayer(live) {
    // Match beacon listener priority: speed overlay > locked > held > toggled > base.
    if (!live) return state.liveLayer;
    const toggled = normalizeLayerList(live.toggledLayers);
    const held = normalizeLayerList(live.heldLayers);
    if (toggled.includes("8")) return "8";
    if (live.lockedLayer) return String(live.lockedLayer);
    if (held.length) return held[held.length - 1];
    if (toggled.length) return toggled[toggled.length - 1];
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
    state.lastState = live;
    if (live) {
      const newLiveLayer = deriveLiveLayer(live);

      const held = normalizeLayerList(live.heldLayers);
      const locked = live.lockedLayer ? String(live.lockedLayer) : "";
      const toggled = normalizeLayerList(live.toggledLayers);
      // Always show the layer the keyboard is actually on; lastKey highlights the thumb source key.
      const preferredDisplay = newLiveLayer;
      const layerChanged = newLiveLayer !== state.liveLayer;
      const displayChanged = preferredDisplay !== state.displayedLayer;

      if (layerChanged || displayChanged) {
        state.liveLayer = newLiveLayer;
        state.displayedLayer = preferredDisplay;
        render();
      } else {
        state.liveLayer = newLiveLayer;
        renderNow();
        renderStatus();
      }

      pushEvent(live);
      renderEvents();
    }
    renderNow();
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

  // ----- Workflow guide -----
  const workflowState = { index: null, apps: new Map(), activeApp: null, query: "" };

  async function loadWorkflowIndex() {
    workflowState.index = await loadJson("./workflows/index.json", { apps: [] });
    if (!els.workflowAppSelect) return;
    els.workflowAppSelect.innerHTML = '<option value="">Select an app...</option>';
    for (const app of (workflowState.index.apps || [])) {
      const opt = document.createElement("option");
      opt.value = app.id;
      opt.textContent = app.name;
      els.workflowAppSelect.appendChild(opt);
    }
  }

  async function loadWorkflowApp(appId) {
    if (!appId) { workflowState.activeApp = null; renderWorkflow(); return; }
    if (!workflowState.apps.has(appId)) {
      const entry = (workflowState.index.apps || []).find((a) => a.id === appId);
      if (!entry) return;
      const data = await loadJson(`./workflows/${entry.file}`, null);
      if (data) workflowState.apps.set(appId, data);
    }
    workflowState.activeApp = workflowState.apps.get(appId) || null;
    renderWorkflow();
  }

  function renderWorkflow() {
    if (!els.workflowContent) return;
    const app = workflowState.activeApp;
    if (!app) {
      els.workflowContent.innerHTML = '<div class="workflow-empty">Select an app to see its shortcuts and how they map to your Charybdis layers.</div>';
      return;
    }
    const query = workflowState.query.toLowerCase();
    let html = "";
    for (const cat of (app.categories || [])) {
      const rows = cat.shortcuts.map((s) => {
        const text = `${s.keys} ${s.action} ${s.charybdis || ""}`.toLowerCase();
        const hidden = query && !text.includes(query);
        const cls = hidden ? ' class="workflow-shortcut filtered-out"' : ' class="workflow-shortcut"';
        let row = `<div${cls}><span class="workflow-keys">${escapeHtml(s.keys)}</span><span class="workflow-action">${escapeHtml(s.action)}</span>`;
        if (s.charybdis) row += `<span class="workflow-charybdis">${escapeHtml(s.charybdis)}</span>`;
        row += "</div>";
        return { html: row, hidden };
      });
      const anyVisible = rows.some((r) => !r.hidden);
      if (anyVisible || !query) {
        html += `<div class="workflow-category"><div class="workflow-category-name">${escapeHtml(cat.name)}</div>`;
        html += rows.map((r) => r.html).join("");
        html += "</div>";
      }
    }
    els.workflowContent.innerHTML = html || '<div class="workflow-empty">No shortcuts match your filter.</div>';
  }

  function setupWorkflow() {
    if (els.workflowAppSelect) {
      els.workflowAppSelect.addEventListener("change", (e) => {
        loadWorkflowApp(e.target.value);
        try { localStorage.setItem("charybdis-workflow-app", e.target.value); } catch {}
      });
    }
    if (els.workflowSearch) {
      els.workflowSearch.addEventListener("input", (e) => {
        workflowState.query = e.target.value || "";
        renderWorkflow();
      });
    }
    const saved = localStorage.getItem("charybdis-workflow-app");
    if (saved && els.workflowAppSelect) {
      els.workflowAppSelect.value = saved;
      loadWorkflowApp(saved);
    }
    populatePracticeAppSelect();
  }

  async function populatePracticeAppSelect() {
    if (!els.practiceAppSelect || !workflowState.index) return;
    els.practiceAppSelect.innerHTML = '<option value="">Layer mode (current layer)</option>';
    for (const entry of (workflowState.index.apps || [])) {
      const opt = document.createElement("option");
      opt.value = entry.id;
      opt.textContent = `${entry.name} shortcuts`;
      els.practiceAppSelect.appendChild(opt);
      if (!workflowState.apps.has(entry.id)) {
        const data = await loadJson(`../../apps/charybdis-coach/workflows/${entry.file}`, null);
        if (data) workflowState.apps.set(entry.id, data);
      }
    }
  }

  async function init() {
    const [csvText, layoutSpec, appsConfig, hostKeyboard] = await Promise.all([
      loadText("../../layout/keybindings_explained.csv"),
      loadJson("../../layout/layout_spec.json", {}),
      loadJson("../../config/charybdis_apps.json", { apps: [] }),
      loadJson("../../layout/windows_norwegian_host.json", null)
    ]);
    state.rows = parseCsv(csvText);
    state.layoutSpec = layoutSpec || {};
    state.hostKeyboard = hostKeyboard;
    state.apps = appsConfig.apps || [];
    const device = clean(state.layoutSpec.device) || "Charybdis";
    const host = clean(state.layoutSpec.host_keyboard?.primary) || clean(hostKeyboard?.name) || "";
    els.deviceLabel.textContent = host ? `${device} · ${host}` : device;
    if (els.transport && host) {
      els.transport.title = "Coach matches physical keys (event.code) for Norwegian Windows; firmware sends US HID scancodes.";
    }
    groupRows();
    renderApps();
    render();
    setupPractice();
    await loadWorkflowIndex();
    setupWorkflow();
    await pollState();
    setInterval(pollState, 500);
    setInterval(renderNow, 1000);
  }

  // ----- Practice / learning modes (drill, quiz, guided, progress) -----
  const PROGRESS_KEY = "charybdis-coach-progress-v1";

  function loadProgress() {
    try {
      state.progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    } catch {
      state.progress = {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress));
    } catch {
      /* storage unavailable — practice still works for the session */
    }
  }

  function practiceableRows(layer) {
    return (state.rowsByLayer.get(layer) || []).filter((row) => isImportant(row) && behaviorKind(row) !== "transparent");
  }

  function allPracticeableRows() {
    return LAYERS.flatMap((layer) => practiceableRows(layer));
  }

  function masteryPercent() {
    const all = allPracticeableRows();
    if (!all.length) return 0;
    const known = all.filter((row) => (state.progress[keyId(row)] || {}).correct > 0).length;
    return Math.round((known / all.length) * 100);
  }

  function updatePracticeUI() {
    if (!els.practiceScore) return;
    els.practiceScore.textContent = `${state.practice.correct} / ${state.practice.attempts}`;
    els.practiceMastery.textContent = `${masteryPercent()}%`;
  }

  function setPrompt(text) {
    if (els.practicePrompt) els.practicePrompt.textContent = text;
  }

  function recordAttempt(row, correct) {
    state.practice.attempts++;
    if (correct) state.practice.correct++;
    const id = keyId(row);
    const entry = state.progress[id] || { seen: 0, correct: 0 };
    entry.seen++;
    if (correct) entry.correct++;
    state.progress[id] = entry;
    saveProgress();
    updatePracticeUI();
  }

  function flashKey(row, cls) {
    const el = document.querySelector(`[data-key-id="${CSS.escape(keyId(row))}"]`);
    if (!el) return;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 600);
  }

  function pickWeightedTarget(rows) {
    // Prefer keys the user has gotten wrong or not seen, so practice targets weak spots.
    if (!rows.length) return null;
    const scored = rows.map((row) => {
      const p = state.progress[keyId(row)] || { seen: 0, correct: 0 };
      const weight = 1 + Math.max(0, p.seen - p.correct) * 2 + (p.seen === 0 ? 2 : 0);
      return { row, weight };
    });
    const total = scored.reduce((s, x) => s + x.weight, 0);
    let r = Math.random() * total;
    for (const x of scored) {
      r -= x.weight;
      if (r <= 0) return x.row;
    }
    return scored[scored.length - 1].row;
  }

  function startDrill() {
    setActiveMode("drill");
    nextDrill();
  }

  function nextDrill() {
    const rows = practiceableRows(state.displayedLayer).filter((row) => behaviorKind(row) === "key");
    const pool = rows.length ? rows : practiceableRows(state.displayedLayer);
    const target = pickWeightedTarget(pool);
    state.practice.target = target;
    if (!target) {
      setPrompt("No drillable keys on this layer. Switch layers and try again.");
      return;
    }
    setPrompt(`DRILL — type this key on your keyboard: "${clean(target.visual_label) || clean(target.parameter)}"  (Layer ${target.layer})`);
    selectKey(target);
  }

  function checkDrillAnswer(row) {
    if (state.practice.mode !== "drill" || !state.practice.target) return;
    const correct = keyId(row) === keyId(state.practice.target);
    recordAttempt(state.practice.target, correct);
    flashKey(state.practice.target, correct ? "answer-correct" : "answer-wrong");
    if (correct) {
      setPrompt(`✓ Correct! "${clean(state.practice.target.visual_label)}". Next…`);
      setTimeout(nextDrill, 650);
    } else {
      setPrompt(`✗ That was "${clean(row.visual_label)}". Target is "${clean(state.practice.target.visual_label)}" — try again.`);
    }
  }

  function startQuiz() {
    setActiveMode("quiz");
    const appId = getSelectedPracticeApp();
    if (appId) {
      state.practice.appShortcuts = appShortcutRows(appId);
      if (!state.practice.appShortcuts.length) {
        setPrompt(`No mapped shortcuts found for this app. Select a different app or use layer mode.`);
        return;
      }
    } else {
      state.practice.appShortcuts = null;
    }
    nextQuiz();
  }

  function nextQuiz() {
    const appId = getSelectedPracticeApp();
    if (appId && state.practice.appShortcuts?.length) {
      const shortcuts = state.practice.appShortcuts;
      const idx = Math.floor(Math.random() * shortcuts.length);
      const sc = shortcuts[idx];
      state.practice.target = sc.row;
      state.practice.appContext = sc;
      if (sc.row.layer !== state.displayedLayer) {
        state.displayedLayer = sc.row.layer;
        render();
      }
      selectKey(sc.row);
      setPrompt(`APP QUIZ — In ${appId}, find the key for: "${sc.appAction}" (${sc.appKeys})  ·  Layer ${sc.row.layer}`);
      return;
    }
    const target = pickWeightedTarget(practiceableRows(state.displayedLayer));
    state.practice.target = target;
    if (!target) {
      setPrompt("No quizzable keys on this layer. Switch layers and try again.");
      return;
    }
    const clue = clean(target.purpose) || clean(target.usage_notes) || `${clean(target.behavior)} ${clean(target.parameter)}`;
    setPrompt(`QUIZ — click the key that does this:  "${clue}"  (Layer ${target.layer})`);
  }

  function checkQuizAnswer(row) {
    if (state.practice.mode !== "quiz" || !state.practice.target) return;
    const correct = keyId(row) === keyId(state.practice.target);
    recordAttempt(state.practice.target, correct);
    flashKey(state.practice.target, correct ? "answer-correct" : "answer-wrong");
    if (correct) {
      setPrompt(`✓ Correct — "${clean(state.practice.target.visual_label)}". Next…`);
      setTimeout(nextQuiz, 700);
    } else {
      setPrompt(`✗ Not quite. You clicked "${clean(row.visual_label)}". Keep looking…`);
    }
  }

  function startGuided() {
    setActiveMode("guided");
    const appId = getSelectedPracticeApp();
    if (appId) {
      state.practice.appShortcuts = appShortcutRows(appId);
      state.practice.guidedList = state.practice.appShortcuts.map((s) => s.row);
      state.practice.guidedAppData = state.practice.appShortcuts;
    } else {
      state.practice.guidedList = practiceableRows(state.displayedLayer);
      state.practice.guidedAppData = null;
      state.practice.appShortcuts = null;
    }
    state.practice.guidedIndex = 0;
    guidedShow();
  }

  function guidedShow() {
    const list = state.practice.guidedList;
    if (!list.length) {
      setPrompt("Nothing to tour. " + (getSelectedPracticeApp() ? "No mapped shortcuts for this app." : "Switch layers and try again."));
      return;
    }
    const i = ((state.practice.guidedIndex % list.length) + list.length) % list.length;
    state.practice.guidedIndex = i;
    const row = list[i];
    if (row.layer !== state.displayedLayer) {
      state.displayedLayer = row.layer;
      render();
    }
    selectKey(row);
    flashKey(row, "answer-correct");
    const appData = state.practice.guidedAppData?.[i];
    if (appData) {
      setPrompt(`APP GUIDE ${i + 1}/${list.length} — ${appData.category}: "${appData.appAction}" (${appData.appKeys})  ·  Key: "${clean(row.visual_label)}" on Layer ${row.layer}  ·  click to advance`);
    } else {
      setPrompt(`GUIDED ${i + 1}/${list.length} — "${clean(row.visual_label)}": ${clean(row.purpose) || clean(row.usage_notes)}  ·  click another key to advance.`);
    }
    state.practice.guidedIndex = i + 1;
  }

  function setActiveMode(mode) {
    state.practice.mode = mode;
    [["drill", els.drillButton], ["quiz", els.quizButton], ["guided", els.guidedButton]].forEach(([m, btn]) => {
      if (btn) btn.classList.toggle("active", m === mode);
    });
  }

  function getSelectedPracticeApp() {
    return els.practiceAppSelect?.value || "";
  }

  function appShortcutRows(appId) {
    const app = workflowState.apps.get(appId);
    if (!app) return [];
    const results = [];
    for (const cat of (app.categories || [])) {
      for (const s of (cat.shortcuts || [])) {
        if (!s.charybdis) continue;
        const layerMatch = s.charybdis.match(/L(\d+)/);
        if (!layerMatch) continue;
        const layer = layerMatch[1];
        const posMatch = s.charybdis.match(/x(\d+),\s*y(\d+)/);
        let matchedRow = null;
        if (posMatch) {
          matchedRow = (state.rowsByLayer.get(layer) || []).find((r) => r.x === posMatch[1] && r.y === posMatch[2]);
        }
        if (!matchedRow) {
          matchedRow = (state.rowsByLayer.get(layer) || []).find((r) => clean(r.visual_label).toLowerCase() === s.action.toLowerCase().split(" ")[0]);
        }
        if (matchedRow) {
          results.push({ row: matchedRow, appAction: s.action, appKeys: s.keys, category: cat.name });
        }
      }
    }
    return results;
  }

  function stopPractice() {
    state.practice.mode = null;
    state.practice.target = null;
    state.practice.appShortcuts = null;
    setActiveMode(null);
    setPrompt("Practice stopped. Pick a mode to start again.");
  }

  function onUserSelectKey(row) {
    selectKey(row);
    if (state.practice.mode === "quiz") checkQuizAnswer(row);
    else if (state.practice.mode === "guided") guidedShow();
  }

  function setupPractice() {
    loadProgress();
    updatePracticeUI();
    if (els.drillButton) els.drillButton.addEventListener("click", startDrill);
    if (els.quizButton) els.quizButton.addEventListener("click", startQuiz);
    if (els.guidedButton) els.guidedButton.addEventListener("click", startGuided);
    if (els.practiceStopButton) els.practiceStopButton.addEventListener("click", stopPractice);
    if (els.practiceResetButton) {
      els.practiceResetButton.addEventListener("click", () => {
        state.progress = {};
        saveProgress();
        state.practice.attempts = 0;
        state.practice.correct = 0;
        updatePracticeUI();
        setPrompt("Progress reset.");
      });
    }
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

  const US_EVENT_KEY_MAP = {
    Escape: "Escape",
    Backspace: "Delete",
    Delete: "Delete",
    Tab: "Tab",
    Enter: "Return",
    " ": "Spacebar",
    ArrowLeft: "LeftArrow",
    ArrowRight: "RightArrow",
    ArrowUp: "UpArrow",
    ArrowDown: "DownArrow",
    Home: "Home",
    End: "End",
    PageUp: "PageUp",
    PageDown: "PageDown",
    Insert: "Insert",
    F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5", F6: "F6",
    F7: "F7", F8: "F8", F9: "F9", F10: "F10", F11: "F11", F12: "F12",
    "1": "1", "2": "2", "3": "3", "4": "4", "5": "5",
    "6": "6", "7": "7", "8": "8", "9": "9", "0": "0",
    q: "Q", w: "W", e: "E", r: "R", t: "T",
    y: "Y", u: "U", i: "I", o: "O", p: "P",
    a: "A", s: "S", d: "D", f: "F", g: "G",
    h: "H", j: "J", k: "K", l: "L",
    ";": "SemiColon", "'": "Left Apos and Double", "\\": "Backslash and Pipe",
    z: "Z", x: "X", c: "C", v: "V", b: "B",
    n: "N", m: "M", ",": "Comma", ".": "Period",
    "/": "ForwardSlash", "-": "Minus", "=": "Equal",
    "`": "Grave", "[": "LeftBrace", "]": "RightBracket",
    Control: "LeftControl",
    Shift: "LeftShift",
    Alt: "LeftAlt",
    Meta: "GUI"
  };

  function hostCodeMap() {
    return state.hostKeyboard?.event_code_to_zmk || {};
  }

  function hostKeyAliasMap() {
    return state.hostKeyboard?.event_key_to_zmk || {};
  }

  function zmkTokensForLookup(token) {
    const value = clean(token);
    if (!value) return [];
    const hostAliases = state.hostKeyboard?.zmk_parameter_aliases || {};
    const aliases = {
      SemiColon: ["SemiColon", "SemiColon and Colon"],
      "Left Apos and Double": ["Left Apos and Double", "Apostrophe", "Keyboard Apostrophe"],
      "Left Brace": ["Left Brace", "Left Bracket"],
      "Right Bracket": ["Right Bracket", "Right Brace"],
      "Backslash and Pipe": ["Backslash and Pipe", "Backslash"],
      "Comma and LessThan": ["Comma and LessThan", "Comma"],
      "ForwardSlash and QuestionMark": ["ForwardSlash and QuestionMark", "ForwardSlash"],
      Period: ["Period", "Period and GreaterThan"],
      Spacebar: ["Spacebar", "Space"],
      Return: ["Return", "Return Enter", "Enter"],
      Grave: ["Grave", "Grave Accent and Tilde"],
      GUI: ["GUI", "Left GUI", "L GUI"],
      ...hostAliases
    };
    const base = value.replace(/^Keyboard\s+/i, "");
    for (const [key, list] of Object.entries(aliases)) {
      if (base === key || list.includes(base)) return list;
    }
    return [base];
  }

  function matchRowsByZmkToken(keyRows, token) {
    for (const candidate of zmkTokensForLookup(token)) {
      const exact = keyRows.find((row) => normalizeParamToken(row.parameter) === normalizeParamToken(candidate));
      if (exact) return exact;
      const partial = keyRows.find((row) => paramMatchesToken(row.parameter, candidate));
      if (partial) return partial;
    }
    return null;
  }

  function normalizeParamToken(value) {
    return clean(value)
      .replace(/^Keyboard\s+/i, "")
      .replace(/^Keypad\s+/i, "")
      .replace(/\s+and\s+/gi, " and ")
      .toUpperCase();
  }

  function paramMatchesToken(param, token) {
    const normalized = normalizeParamToken(param);
    const search = normalizeParamToken(token);
    if (!normalized || !search) return false;
    if (normalized === search) return true;
    if (normalized.endsWith(` ${search}`) || normalized.endsWith(`::${search}`)) return true;
    const parts = normalized.split(/\s+and\s+/i).map((part) => part.trim());
    return parts.some((part) => part === search || part.endsWith(` ${search}`));
  }

  function matchableRows(rows) {
    return rows.filter((row) => /key press|mouse key press/i.test(row.behavior));
  }

  function resolveKeyFromKeyboardEvent(eventKey, eventCode, rows) {
    const keyRows = matchableRows(rows);
    if (!keyRows.length) return null;

    // 1) Physical key (layout-independent) — required for Windows Norwegian.
    if (eventCode) {
      const codeToken = hostCodeMap()[eventCode];
      if (codeToken) {
        const codeMatch = matchRowsByZmkToken(keyRows, codeToken);
        if (codeMatch) return codeMatch;
      }
    }

    // 2) Norwegian localized character (øæå) from event.key.
    const hostAlias = hostKeyAliasMap()[eventKey];
    if (hostAlias) {
      const aliasMatch = matchRowsByZmkToken(keyRows, hostAlias);
      if (aliasMatch) return aliasMatch;
    }

    // 3) Coach visual label (ø, æ, å, ←, single letters).
    const labelMatch = keyRows.find((row) => clean(row.visual_label).toUpperCase() === String(eventKey).toUpperCase());
    if (labelMatch) return labelMatch;

    const arrowHints = {
      ArrowLeft: /leftarrow|←/i,
      ArrowRight: /rightarrow|→/i,
      ArrowUp: /uparrow|↑/i,
      ArrowDown: /downarrow|↓/i
    };
    if (arrowHints[eventKey]) {
      const arrowMatch = keyRows.find((row) => arrowHints[eventKey].test(`${row.visual_label} ${row.parameter}`));
      if (arrowMatch) return arrowMatch;
    }

    // 4) US-layout event.key fallback (English Windows or legacy).
    const zmkKey = US_EVENT_KEY_MAP[eventKey] || US_EVENT_KEY_MAP[String(eventKey).toLowerCase()];
    if (!zmkKey) return null;
    return matchRowsByZmkToken(keyRows, zmkKey);
  }

  function overlayRowForMatch(matchRow, displayLayer) {
    if (!matchRow) return null;
    const layer = String(displayLayer);
    if (String(matchRow.layer) === layer) {
      return { row: matchRow, fallthrough: false };
    }
    const overlay = (state.rowsByLayer.get(layer) || []).find(
      (row) => row.x === matchRow.x && row.y === matchRow.y
    );
    if (!overlay) return null;
    return { row: overlay, fallthrough: true };
  }

  function resolveActiveKeyPress(event) {
    const eventKey = event.key;
    const eventCode = event.code || "";
    const displayLayer = state.liveLayer || state.displayedLayer || "0";
    const overlayRows = state.rowsByLayer.get(displayLayer) || [];

    let match = resolveKeyFromKeyboardEvent(eventKey, eventCode, overlayRows);
    if (match) return overlayRowForMatch(match, displayLayer);

    if (displayLayer !== "0") {
      const baseRows = state.rowsByLayer.get("0") || [];
      match = resolveKeyFromKeyboardEvent(eventKey, eventCode, baseRows);
      if (match) return overlayRowForMatch(match, displayLayer);
    }

    return null;
  }

  // Physical keypress highlighting (separate from beacon thumb highlights).
  const keyPressTimeouts = new Map();

  const MODIFIER_EVENT_KEYS = new Set(["Control", "Shift", "Alt", "Meta"]);

  function flashPhysicalKey(matchInfo) {
    if (!matchInfo?.row) return;
    const id = keyId(matchInfo.row);
    const selector = `[data-key-id="${CSS.escape(id)}"]`;
    const keyEl = document.querySelector(selector);
    if (!keyEl) return;

    const prevTimeout = keyPressTimeouts.get(id);
    if (prevTimeout) clearTimeout(prevTimeout);

    keyEl.classList.remove("press-flash", "press-fallthrough");
    keyEl.classList.add(matchInfo.fallthrough ? "press-fallthrough" : "press-flash");

    const timeout = setTimeout(() => {
      keyEl.classList.remove("press-flash", "press-fallthrough");
      keyPressTimeouts.delete(id);
    }, 450);

    keyPressTimeouts.set(id, timeout);
  }

  document.addEventListener("keydown", (event) => {
    if (event.target === els.searchInput) return;
    if (MODIFIER_EVENT_KEYS.has(event.key)) return;
    if (event.ctrlKey && event.altKey && event.shiftKey) return;

    const matchInfo = resolveActiveKeyPress(event);
    if (!matchInfo) return;

    flashPhysicalKey(matchInfo);

    if (state.practice.mode === "drill") {
      checkDrillAnswer(matchInfo.row);
    }
  });

  // ----- Learn overlay (fullscreen guided app training) -----
  const learnState = { active: false, appId: null, shortcuts: [], index: 0 };
  const learnEls = {
    overlay: document.getElementById("learnOverlay"),
    title: document.getElementById("learnTitle"),
    appSelect: document.getElementById("learnAppSelect"),
    startBtn: document.getElementById("learnStartButton"),
    closeBtn: document.getElementById("learnCloseButton"),
    step: document.getElementById("learnStep"),
    progress: document.getElementById("learnProgress"),
    prevBtn: document.getElementById("learnPrevButton"),
    nextBtn: document.getElementById("learnNextButton"),
    keyboardArea: document.getElementById("learnKeyboardArea"),
  };

  async function openLearnOverlay() {
    if (!learnEls.overlay) return;
    learnEls.overlay.classList.remove("learn-overlay--hidden");
    learnEls.appSelect.innerHTML = '<option value="">Loading apps...</option>';
    learnState.active = false;
    learnEls.step.innerHTML = "Select an app and click <strong>Start Guided Tour</strong>";
    learnEls.progress.textContent = "";

    for (const entry of (workflowState.index?.apps || [])) {
      if (!workflowState.apps.has(entry.id)) {
        const data = await loadJson(`./workflows/${entry.file}`, null);
        if (data) workflowState.apps.set(entry.id, data);
      }
    }

    learnEls.appSelect.innerHTML = "";
    for (const entry of (workflowState.index?.apps || [])) {
      const app = workflowState.apps.get(entry.id);
      if (!app) continue;
      const opt = document.createElement("option");
      opt.value = entry.id;
      opt.textContent = app.name || entry.name;
      learnEls.appSelect.appendChild(opt);
    }
    if (!learnEls.appSelect.options.length) {
      learnEls.step.innerHTML = "No workflow guides found. Add JSON files to apps/charybdis-coach/workflows/";
    }
  }

  function closeLearnOverlay() {
    if (!learnEls.overlay) return;
    learnEls.overlay.classList.add("learn-overlay--hidden");
    learnState.active = false;
  }

  async function startLearnTour() {
    const appId = learnEls.appSelect.value;
    if (!appId) return;
    if (!workflowState.apps.has(appId)) {
      const entry = (workflowState.index?.apps || []).find((a) => a.id === appId);
      if (entry) {
        const data = await loadJson(`../../apps/charybdis-coach/workflows/${entry.file}`, null);
        if (data) workflowState.apps.set(appId, data);
      }
    }
    const shortcuts = appShortcutRows(appId);
    if (!shortcuts.length) {
      learnEls.step.innerHTML = `No mapped shortcuts found for <strong>${appId}</strong>. Choose another app.`;
      return;
    }
    learnState.active = true;
    learnState.appId = appId;
    learnState.shortcuts = shortcuts;
    learnState.index = 0;
    learnEls.title.textContent = `Learn: ${workflowState.apps.get(appId)?.name || appId}`;
    showLearnStep();
  }

  function showLearnStep() {
    if (!learnState.active || !learnState.shortcuts.length) return;
    const idx = Math.max(0, Math.min(learnState.index, learnState.shortcuts.length - 1));
    learnState.index = idx;
    const sc = learnState.shortcuts[idx];
    const layerNames = { "0": "Base", "1": "Nav", "2": "Mouse", "3": "Window", "4": "System", "5": "Code", "7": "Game", "8": "Speed", "9": "M-Files" };
    const layerName = layerNames[sc.row.layer] || `Layer ${sc.row.layer}`;
    const layerColor = { "0": "#4cc9b0", "1": "#3dd6c6", "2": "#b78cff", "3": "#6eb5ff", "4": "#ff9f6e", "5": "#56d4e8", "7": "#a78bfa", "8": "#ffb347", "9": "#e8a44c" }[sc.row.layer] || "#ccc";

    learnEls.step.innerHTML = [
      `<span class="learn-layer-badge" style="background:${layerColor};color:#0a0a0a">${layerName}</span>`,
      `<strong>${escapeHtml(sc.appAction)}</strong>`,
      `<span class="learn-keys">${escapeHtml(sc.appKeys)}</span>`,
      `Key: <strong>${escapeHtml(clean(sc.row.visual_label))}</strong> at x${sc.row.x},y${sc.row.y}`,
    ].join(" &nbsp; ");

    learnEls.progress.textContent = `Step ${idx + 1} of ${learnState.shortcuts.length} — ${sc.category}`;

    if (sc.row.layer !== state.displayedLayer) {
      state.displayedLayer = sc.row.layer;
      render();
    }
    renderLearnKeyboard(sc);
  }

  function renderLearnKeyboard(sc) {
    if (!learnEls.keyboardArea) return;
    learnEls.keyboardArea.innerHTML = "";
    const rows = state.rowsByLayer.get(state.displayedLayer) || [];
    const rowMap = new Map(rows.map((r) => [`${r.x}:${r.y}`, r]));
    const leftHand = renderHand("left", X_LEFT, rowMap);
    const rightHand = renderHand("right", X_RIGHT, rowMap);
    learnEls.keyboardArea.appendChild(leftHand);
    learnEls.keyboardArea.appendChild(rightHand);
    learnEls.keyboardArea.className = "learn-keyboard-area keyboard-map";

    const targetId = keyId(sc.row);
    const targetEl = learnEls.keyboardArea.querySelector(`[data-key-id="${CSS.escape(targetId)}"]`);
    if (targetEl) {
      targetEl.classList.add("answer-correct");
      targetEl.scrollIntoView({ block: "center", inline: "center" });
    }
  }

  if (document.getElementById("learnButton")) {
    document.getElementById("learnButton").addEventListener("click", openLearnOverlay);
  }
  if (learnEls.closeBtn) learnEls.closeBtn.addEventListener("click", closeLearnOverlay);
  if (learnEls.startBtn) learnEls.startBtn.addEventListener("click", startLearnTour);
  if (learnEls.prevBtn) learnEls.prevBtn.addEventListener("click", () => { if (learnState.active) { learnState.index = Math.max(0, learnState.index - 1); showLearnStep(); } });
  if (learnEls.nextBtn) learnEls.nextBtn.addEventListener("click", () => { if (learnState.active) { learnState.index = Math.min(learnState.shortcuts.length - 1, learnState.index + 1); showLearnStep(); } });

  init().catch((error) => {
    els.keyboardMap.innerHTML = `<div class="panel selected-panel"><h2>Coach failed to load</h2><p>${escapeHtml(error.message)}</p></div>`;
  });
})();
