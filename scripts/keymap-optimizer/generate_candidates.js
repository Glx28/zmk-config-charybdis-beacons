const { readBuild, writeBuild } = require("./lib/io");
const { effort, hand, LEFT_COLS, RIGHT_COLS, FINGER_ROWS, THUMB_ROWS, LAYER_NAMES, LAYER_ACCESS, LAYER_CONTEXTS } = require("./lib/constants");

const FREQ_WEIGHTS = { constant: 10, high: 6, medium: 3, low: 1, rare: 0.2 };

function run(config) {
  const errors = [], warnings = [];
  const canonical = readBuild("canonical.json");
  const scores = readBuild("app_shortcut_scores.json");
  const resolved = readBuild("resolved_layout.json");
  const graph = readBuild("layer_graph.json");

  const candidates = [];

  // =====================================================
  // ANALYSIS: Find all gaps and opportunities
  // =====================================================

  // 1. Collect all unmapped high-freq shortcuts
  const unmappedGaps = [];
  for (const app of scores.apps) {
    for (const s of app.shortcuts) {
      if (!s.mapped && s.freq_weight >= 3) {
        unmappedGaps.push({
          app: app.id, keys: s.keys, action: s.action,
          frequency: s.frequency, importance: s.importance,
          modifiers: s.keys.split("+").filter(k => /^(Ctrl|Shift|Alt|Win)$/i.test(k)).sort(),
          base_key: s.keys.split("+").pop(),
        });
      }
    }
  }
  unmappedGaps.sort((a, b) => b.importance - a.importance);

  // 2. Find free slots per layer
  const freeSlots = {};
  for (const [layerId, layerData] of Object.entries(canonical.layers)) {
    const free = [];
    for (const [coord, binding] of Object.entries(layerData.keys)) {
      if (/transparent/i.test(binding.behavior)) {
        const [x, y] = coord.split(":").map(Number);
        if (y < 4) free.push({ coord, x, y, effort: effort(x, y), hand: hand(x) });
      }
    }
    free.sort((a, b) => a.effort - b.effort);
    freeSlots[layerId] = free;
  }

  // 3. Identify base-layer combos that work but aren't "counted"
  const baseCombos = unmappedGaps.filter(g =>
    g.modifiers.length > 0 && !g.modifiers.some(m => /win/i.test(m))
  );

  // 4. Identify shortcuts that NEED a dedicated layer key (Win+combos, complex combos)
  const needsLayerKey = unmappedGaps.filter(g =>
    g.modifiers.some(m => /win/i.test(m)) || g.modifiers.length >= 2
  );

  // =====================================================
  // CANDIDATE A: Current layout is already good (baseline)
  // =====================================================
  candidates.push({
    id: "baseline",
    name: "Current Layout (No Changes)",
    description: "Keep the current v2.1 layout unchanged. Base-layer Ctrl/Shift/Alt combos work via modifier keys on L0. This is the reference point.",
    changes: [],
    rationale: "48% of app shortcuts are directly mapped to layer keys. Many 'unmapped' shortcuts actually work via base-layer modifier+key combos (Ctrl+S = hold L0 Ctrl + tap S). The layout is already functional.",
    new_layers: [],
    estimated_coverage_change: "0%",
    risk: "none",
  });

  // =====================================================
  // CANDIDATE B: Fill Layer 4 right half with coding shortcuts
  // =====================================================
  const l4RightFree = (freeSlots["4"] || []).filter(s => RIGHT_COLS.includes(s.x));
  const codingShortcuts = [
    { keys: "Ctrl+`", action: "Toggle terminal", mods: ["L Ctrl"], param: "Grave Accent and Tilde", label: "Term" },
    { keys: "Ctrl+Shift+P", action: "Command palette", mods: ["L Ctrl", "L Shift"], param: "P", label: "CmdP" },
    { keys: "Ctrl+/", action: "Toggle comment", mods: ["L Ctrl"], param: "ForwardSlash and QuestionMark", label: "Cmnt" },
    { keys: "Ctrl+Shift+K", action: "Delete line", mods: ["L Ctrl", "L Shift"], param: "K", label: "DelLn" },
    { keys: "Ctrl+Shift+F", action: "Search files / Format", mods: ["L Ctrl", "L Shift"], param: "F", label: "SrchF" },
    { keys: "Ctrl+D", action: "Select next occurrence", mods: ["L Ctrl"], param: "D", label: "SelNx" },
  ];
  const l4CodingChanges = [];
  const availableL4Right = l4RightFree.filter(s => s.y >= 1 && s.y <= 3);
  for (let i = 0; i < Math.min(codingShortcuts.length, availableL4Right.length); i++) {
    l4CodingChanges.push({
      layer: 4, x: availableL4Right[i].x, y: availableL4Right[i].y,
      from: "Transparent", to: `Key Press: ${codingShortcuts[i].keys}`,
      label: codingShortcuts[i].label,
      action: codingShortcuts[i].action,
      effort: availableL4Right[i].effort,
    });
  }
  if (l4CodingChanges.length) {
    candidates.push({
      id: "l4_coding_shortcuts",
      name: "L4 Right Half → Coding Shortcuts",
      description: `Fill ${l4CodingChanges.length} empty right-half positions on Layer 4 (System, accessed via right thumb hold) with high-frequency VS Code shortcuts. Since L4 is accessed by holding right System thumb, LEFT hand finger keys are fully free for these shortcuts.`,
      changes: l4CodingChanges,
      rationale: "VS Code has the lowest efficiency (25%) of any app. L4 right half has 18 empty slots. Adding coding shortcuts there gives 1-key access via System hold + right finger tap. But note: right thumb holds System, so right-hand keys require stretch-while-hold.",
      new_layers: [],
      estimated_coverage_change: `+${l4CodingChanges.length} shortcuts → ~+2% coverage`,
      risk: "low — right-hand keys while right thumb holds System are reachable but less comfortable. Left-hand placements would be better.",
    });
  }

  // =====================================================
  // CANDIDATE C: Layer 5 as a Code/IDE layer (left thumb access)
  // =====================================================
  const codeLayerKeys = [
    // y2 (home) — most used coding shortcuts
    { x: 1, y: 2, keys: "Ctrl+S", action: "Save", mods: ["L Ctrl"], param: "S", label: "Save" },
    { x: 2, y: 2, keys: "Ctrl+D", action: "Select next", mods: ["L Ctrl"], param: "D", label: "SelNx" },
    { x: 3, y: 2, keys: "Ctrl+/", action: "Toggle comment", mods: ["L Ctrl"], param: "ForwardSlash and QuestionMark", label: "Cmnt" },
    { x: 4, y: 2, keys: "Ctrl+Shift+K", action: "Delete line", mods: ["L Ctrl", "L Shift"], param: "K", label: "DelLn" },
    { x: 5, y: 2, keys: "Ctrl+`", action: "Toggle terminal", mods: ["L Ctrl"], param: "Grave Accent and Tilde", label: "Term" },
    { x: 7, y: 2, keys: "Ctrl+P", action: "Quick open", mods: ["L Ctrl"], param: "P", label: "Open" },
    { x: 8, y: 2, keys: "Ctrl+Shift+P", action: "Command palette", mods: ["L Ctrl", "L Shift"], param: "P", label: "CmdP" },
    { x: 9, y: 2, keys: "Ctrl+G", action: "Go to line", mods: ["L Ctrl"], param: "G", label: "GoLn" },
    { x: 10, y: 2, keys: "Ctrl+Shift+O", action: "Go to symbol", mods: ["L Ctrl", "L Shift"], param: "O", label: "GoSym" },
    { x: 11, y: 2, keys: "Ctrl+Shift+F", action: "Search files", mods: ["L Ctrl", "L Shift"], param: "F", label: "SrchF" },
    { x: 12, y: 2, keys: "Ctrl+Shift+G", action: "Source control", mods: ["L Ctrl", "L Shift"], param: "G", label: "Git" },
    // y1 (upper) — editing
    { x: 1, y: 1, keys: "Alt+Up", action: "Move line up", mods: ["L Alt"], param: "UpArrow", label: "LnUp" },
    { x: 2, y: 1, keys: "Alt+Down", action: "Move line down", mods: ["L Alt"], param: "DownArrow", label: "LnDn" },
    { x: 3, y: 1, keys: "Shift+Alt+Down", action: "Copy line down", mods: ["L Shift", "L Alt"], param: "DownArrow", label: "CpDn" },
    { x: 4, y: 1, keys: "Ctrl+Enter", action: "Insert line below", mods: ["L Ctrl"], param: "Return Enter", label: "InsLn" },
    { x: 5, y: 1, keys: "Ctrl+Shift+Enter", action: "Insert line above", mods: ["L Ctrl", "L Shift"], param: "Return Enter", label: "InsUp" },
    { x: 7, y: 1, keys: "Ctrl+[", action: "Outdent", mods: ["L Ctrl"], param: "Left Brace", label: "Outd" },
    { x: 8, y: 1, keys: "Ctrl+]", action: "Indent", mods: ["L Ctrl"], param: "Right Brace", label: "Ind" },
    { x: 9, y: 1, keys: "Ctrl+Shift+\\", action: "Jump to bracket", mods: ["L Ctrl", "L Shift"], param: "Backslash and Pipe", label: "Brkt" },
    { x: 10, y: 1, keys: "Ctrl+Shift+L", action: "Select all occurrences", mods: ["L Ctrl", "L Shift"], param: "L", label: "SelAl" },
    { x: 11, y: 1, keys: "Alt+F12", action: "Peek definition", mods: ["L Alt"], param: "F12", label: "Peek" },
    { x: 12, y: 1, keys: "Ctrl+Shift+M", action: "Problems panel", mods: ["L Ctrl", "L Shift"], param: "M", label: "Probs" },
    // y3 (bottom) — multi-cursor + formatting
    { x: 1, y: 3, keys: "Ctrl+Shift+V", action: "Paste no format", mods: ["L Ctrl", "L Shift"], param: "V", label: "PstNF" },
    { x: 2, y: 3, keys: "Shift+Alt+A", action: "Block comment", mods: ["L Shift", "L Alt"], param: "A", label: "BlkCm" },
    { x: 3, y: 3, keys: "Ctrl+Shift+E", action: "Explorer panel", mods: ["L Ctrl", "L Shift"], param: "E", label: "Explr" },
    { x: 4, y: 3, keys: "Ctrl+Shift+X", action: "Extensions", mods: ["L Ctrl", "L Shift"], param: "X", label: "Ext" },
    { x: 5, y: 3, keys: "Ctrl+B", action: "Toggle sidebar", mods: ["L Ctrl"], param: "B", label: "Side" },
    { x: 7, y: 3, keys: "Ctrl+J", action: "Toggle bottom panel", mods: ["L Ctrl"], param: "J", label: "Panel" },
    { x: 8, y: 3, keys: "Ctrl+\\", action: "Split editor", mods: ["L Ctrl"], param: "Backslash and Pipe", label: "Split" },
    { x: 9, y: 3, keys: "Ctrl+L", action: "Select line", mods: ["L Ctrl"], param: "L", label: "SelLn" },
    { x: 10, y: 3, keys: "Ctrl+Shift+H", action: "Replace in files", mods: ["L Ctrl", "L Shift"], param: "H", label: "RplFl" },
    { x: 11, y: 3, keys: "F8", action: "Next problem", mods: [], param: "F8", label: "NxtPr" },
    { x: 12, y: 3, keys: "Shift+F8", action: "Prev problem", mods: ["L Shift"], param: "F8", label: "PrvPr" },
    // y0 (top) — debug + less frequent
    { x: 1, y: 0, keys: "F5", action: "Start debug", mods: [], param: "F5", label: "Debug" },
    { x: 2, y: 0, keys: "Shift+F5", action: "Stop debug", mods: ["L Shift"], param: "F5", label: "Stop" },
    { x: 3, y: 0, keys: "F10", action: "Step over", mods: [], param: "F10", label: "StpOv" },
    { x: 4, y: 0, keys: "F11", action: "Step into", mods: [], param: "F11", label: "StpIn" },
    { x: 5, y: 0, keys: "Shift+F11", action: "Step out", mods: ["L Shift"], param: "F11", label: "StpOt" },
    { x: 7, y: 0, keys: "F9", action: "Toggle breakpoint", mods: [], param: "F9", label: "BkPt" },
    { x: 8, y: 0, keys: "Ctrl+Shift+F5", action: "Restart debug", mods: ["L Ctrl", "L Shift"], param: "F5", label: "Rstr" },
    { x: 9, y: 0, keys: "Ctrl+K Ctrl+I", action: "Hover info", mods: ["L Ctrl"], param: "I", label: "Info" },
    { x: 10, y: 0, keys: "Ctrl+,", action: "Settings", mods: ["L Ctrl"], param: "Comma and LessThan", label: "Sett" },
    { x: 11, y: 0, keys: "Ctrl+Shift+`", action: "New terminal", mods: ["L Ctrl", "L Shift"], param: "Grave Accent and Tilde", label: "NTerm" },
    { x: 12, y: 0, keys: "Ctrl+N", action: "New file", mods: ["L Ctrl"], param: "N", label: "NewFl" },
  ];

  candidates.push({
    id: "layer5_code_ide",
    name: "Layer 5 → Dedicated Code/IDE Layer",
    description: "Repurpose the currently empty Layer 5 as a dedicated VS Code / IDE layer with 44 shortcuts. Access via a new toggle or momentary key. Home row (y2) gets the most-used shortcuts: Save, Select Next, Comment, Delete Line, Terminal, Quick Open, Command Palette, Go To Line, Symbol, Search, Git.",
    changes: codeLayerKeys.map(k => ({
      layer: 5, x: k.x, y: k.y,
      from: "Transparent", to: `Key Press: ${k.keys}`,
      label: k.label, action: k.action, effort: effort(k.x, k.y),
    })),
    rationale: "VS Code efficiency is only 25%. A dedicated layer puts 44 coding shortcuts at single-key access. Requires adding an activator key (e.g. toggle on L1 or L3, or a new thumb combo). Debug shortcuts on y0 (least used), editing on y1, core on y2 (home), panels/formatting on y3.",
    new_layers: [{
      layer: 5, name: "Code/IDE",
      access_options: [
        "Toggle from L1 (hold Nav, tap a Code key)",
        "Toggle from L3 (hold Window, tap a Code key)",
        "Replace one of the L4 free slots with a Code toggle",
      ],
    }],
    estimated_coverage_change: "+44 shortcuts → ~+15% coverage, VS Code efficiency ~70%+",
    risk: "medium — new layer to learn, needs an activator key placed somewhere",
  });

  // =====================================================
  // CANDIDATE D: Layer 9 as M-Files/Document layer
  // =====================================================
  const mfilesLayerKeys = [
    // y2 (home) — core document ops
    { x: 1, y: 2, keys: "Ctrl+E", action: "Check out", mods: ["L Ctrl"], param: "E", label: "ChkOt" },
    { x: 2, y: 2, keys: "Ctrl+Shift+E", action: "Check in", mods: ["L Ctrl", "L Shift"], param: "E", label: "ChkIn" },
    { x: 3, y: 2, keys: "Ctrl+S", action: "Save", mods: ["L Ctrl"], param: "S", label: "Save" },
    { x: 4, y: 2, keys: "Ctrl+N", action: "New object", mods: ["L Ctrl"], param: "N", label: "New" },
    { x: 5, y: 2, keys: "Ctrl+O", action: "Open", mods: ["L Ctrl"], param: "O", label: "Open" },
    { x: 7, y: 2, keys: "Alt+Enter", action: "Properties", mods: ["L Alt"], param: "Return Enter", label: "Props" },
    { x: 8, y: 2, keys: "Ctrl+Shift+C", action: "Copy link", mods: ["L Ctrl", "L Shift"], param: "C", label: "CpLnk" },
    { x: 9, y: 2, keys: "Ctrl+I", action: "Object info", mods: ["L Ctrl"], param: "I", label: "Info" },
    { x: 10, y: 2, keys: "Ctrl+Shift+H", action: "Version history", mods: ["L Ctrl", "L Shift"], param: "H", label: "Hist" },
    { x: 11, y: 2, keys: "Ctrl+K", action: "Add relationship", mods: ["L Ctrl"], param: "K", label: "Rel" },
    { x: 12, y: 2, keys: "Ctrl+Shift+U", action: "Undo checkout", mods: ["L Ctrl", "L Shift"], param: "U", label: "UndCO" },
    // y1 (upper) — workflow & search
    { x: 1, y: 1, keys: "Ctrl+Shift+W", action: "Change workflow state", mods: ["L Ctrl", "L Shift"], param: "W", label: "WfSt" },
    { x: 2, y: 1, keys: "Ctrl+Shift+A", action: "Assign to user", mods: ["L Ctrl", "L Shift"], param: "A", label: "Asgn" },
    { x: 3, y: 1, keys: "Ctrl+Shift+F", action: "Advanced search", mods: ["L Ctrl", "L Shift"], param: "F", label: "ASrch" },
    { x: 4, y: 1, keys: "Ctrl+M", action: "Add to favorites", mods: ["L Ctrl"], param: "M", label: "Fav" },
    { x: 5, y: 1, keys: "Ctrl+Shift+D", action: "Download copy", mods: ["L Ctrl", "L Shift"], param: "D", label: "DLoad" },
    { x: 7, y: 1, keys: "Ctrl+P", action: "Print", mods: ["L Ctrl"], param: "P", label: "Print" },
    { x: 8, y: 1, keys: "Ctrl+G", action: "Go to vault", mods: ["L Ctrl"], param: "G", label: "Vault" },
    // y3 (bottom) — views, less frequent
    { x: 1, y: 3, keys: "Ctrl+1", action: "List view", mods: ["L Ctrl"], param: "1 and Bang", label: "List" },
    { x: 2, y: 3, keys: "Ctrl+2", action: "Icon view", mods: ["L Ctrl"], param: "2 and At", label: "Icon" },
    { x: 3, y: 3, keys: "Ctrl+Shift+G", action: "Group by", mods: ["L Ctrl", "L Shift"], param: "G", label: "Group" },
    { x: 4, y: 3, keys: "Ctrl+Shift+F5", action: "Send notification", mods: ["L Ctrl", "L Shift"], param: "F5", label: "Notif" },
  ];

  candidates.push({
    id: "layer9_mfiles",
    name: "Layer 9 → Dedicated M-Files Layer",
    description: "Repurpose empty Layer 9 as a dedicated M-Files document management layer with 22 shortcuts. Check in/out, properties, workflow state, version history — all at single-key access.",
    changes: mfilesLayerKeys.map(k => ({
      layer: 9, x: k.x, y: k.y,
      from: "Transparent", to: `Key Press: ${k.keys}`,
      label: k.label, action: k.action, effort: effort(k.x, k.y),
    })),
    rationale: "M-Files check in/out is a constant-frequency operation that currently requires base-layer Ctrl+E/Ctrl+Shift+E combos. A dedicated layer puts all 22 DMS shortcuts at single-key access. Particularly valuable: Check Out (y2 home), Check In (y2 home), Properties (y2 home).",
    new_layers: [{
      layer: 9, name: "M-Files/DMS",
      access_options: [
        "Toggle from L3 (hold Window, tap a DMS key)",
        "Toggle from L4 (use one of the 3 free y3 slots)",
      ],
    }],
    estimated_coverage_change: "+22 shortcuts → M-Files coverage ~100%",
    risk: "medium — another layer to learn, used only in M-Files workflows",
  });

  // =====================================================
  // CANDIDATE E: Improve existing layers (no new layers)
  // =====================================================
  const existingImprovements = [];

  // L3 left y0 is all transparent — could add shortcuts
  const l3LeftFree = (freeSlots["3"] || []).filter(s => LEFT_COLS.includes(s.x) && s.y === 0);
  if (l3LeftFree.length >= 4) {
    const l3y0Additions = [
      { x: 1, y: 0, keys: "Ctrl+Shift+Esc", action: "Task Manager", label: "TskMg" },
      { x: 2, y: 0, keys: "Win+.", action: "Emoji picker", label: "Emoji" },
      { x: 3, y: 0, keys: "Win+P", action: "Project/display mode", label: "Proj" },
      { x: 4, y: 0, keys: "Win+A", action: "Quick settings", label: "QSett" },
      { x: 5, y: 0, keys: "Win+N", action: "Notification center", label: "Notif" },
    ];
    l3y0Additions.forEach(k => existingImprovements.push({
      layer: 3, x: k.x, y: k.y,
      from: "Transparent (falls through to base numbers)",
      to: `Key Press: ${k.keys}`,
      label: k.label, action: k.action, effort: effort(k.x, k.y),
    }));
  }

  // L3 right y0 also all transparent
  const l3RightFreeY0 = (freeSlots["3"] || []).filter(s => RIGHT_COLS.includes(s.x) && s.y === 0);
  if (l3RightFreeY0.length >= 4) {
    const l3Ry0 = [
      { x: 7, y: 0, keys: "Win+Ctrl+Left", action: "Prev desktop", label: "DskL" },
      { x: 8, y: 0, keys: "Win+Ctrl+Right", action: "Next desktop", label: "DskR" },
      { x: 9, y: 0, keys: "Win+Shift+S", action: "Screenshot", label: "ScrSh" },
      { x: 10, y: 0, keys: "Win+P", action: "Project mode", label: "Proj" },
      { x: 11, y: 0, keys: "Win+.", action: "Emoji", label: "Emoji" },
      { x: 12, y: 0, keys: "Win+A", action: "Quick settings", label: "QSett" },
    ];
    l3Ry0.forEach(k => existingImprovements.push({
      layer: 3, x: k.x, y: k.y,
      from: "Transparent (falls through to base)",
      to: `Key Press: ${k.keys}`,
      label: k.label, action: k.action, effort: effort(k.x, k.y),
    }));
  }

  if (existingImprovements.length) {
    candidates.push({
      id: "fill_l3_y0",
      name: "Fill Layer 3 Top Row (y0) — Window Extras",
      description: `Add ${existingImprovements.length} Windows shortcuts to the empty y0 positions on Layer 3 (Window layer). Currently these fall through to base-layer numbers, which aren't useful while doing window management.`,
      changes: existingImprovements,
      rationale: "L3 y0 is all transparent (falls through to numbers 1-6 on left, 6-0 on right). Numbers aren't useful during window management. Filling with Task Manager, Emoji picker, Project mode, Quick settings, desktop switching gives more utility from a layer you're already holding.",
      new_layers: [],
      estimated_coverage_change: `+${existingImprovements.length} shortcuts → ~+4% coverage`,
      risk: "low — y0 is least-used row, these are low-frequency shortcuts, base numbers still available on L0",
      tradeoff: "Lose fall-through to base-layer numbers while holding Window. Numbers rarely needed during window management.",
    });
  }

  // =====================================================
  // SUMMARY
  // =====================================================

  const output = {
    timestamp: new Date().toISOString(),
    analysis: {
      total_unmapped_high_freq: unmappedGaps.filter(g => g.importance >= 6).length,
      total_free_finger_slots: Object.entries(freeSlots).reduce((sum, [l, slots]) =>
        sum + slots.filter(s => s.y < 4).length, 0),
      empty_layers: [5, 9, 10].map(l => ({ layer: l, name: LAYER_NAMES[l] || `Layer ${l}`, free_slots: (freeSlots[String(l)] || []).length })),
      base_combo_shortcuts: baseCombos.length,
    },
    candidates,
    recommendation: `
RECOMMENDED APPROACH (phased):

Phase 1 (low risk, immediate): Candidate "fill_l3_y0"
  Fill L3 y0 with window extras. ${existingImprovements.length} new shortcuts, no new layers.

Phase 2 (medium risk, high value): Candidate "layer5_code_ide"
  Add Code/IDE layer on Layer 5. Biggest impact — VS Code goes from 25% to ~70% efficiency.
  Needs an activator key: suggest Toggle on L1 x0,y1 (currently Game lock, rarely used from Nav layer).

Phase 3 (optional, M-Files users): Candidate "layer9_mfiles"
  Add M-Files layer on Layer 9. Only if DMS is daily workflow.

Skip: Candidate "l4_coding_shortcuts" — awkward because right thumb holds System
while right fingers must tap, and L4 is for system/BT not coding.
    `.trim(),
  };

  writeBuild("candidates.json", output);
  return { success: true, output, errors, warnings };
}

module.exports = { run };

if (require.main === module) {
  const result = run({});
  console.log("\n" + "═".repeat(70));
  console.log("CANDIDATE KEYMAPS GENERATED");
  console.log("═".repeat(70));

  const a = result.output.analysis;
  console.log(`\nAnalysis: ${a.total_unmapped_high_freq} unmapped high-freq shortcuts, ${a.total_free_finger_slots} free finger-row slots`);
  console.log(`Empty layers: ${a.empty_layers.map(l => `L${l.layer}(${l.free_slots} slots)`).join(", ")}`);

  for (const c of result.output.candidates) {
    console.log(`\n─── ${c.id}: ${c.name} ───`);
    console.log(`  ${c.description.split("\n")[0]}`);
    console.log(`  Changes: ${c.changes.length}, Coverage: ${c.estimated_coverage_change}, Risk: ${c.risk}`);
    if (c.new_layers?.length) console.log(`  New layers: ${c.new_layers.map(l => `L${l.layer} "${l.name}"`).join(", ")}`);
  }

  console.log(`\n${"─".repeat(70)}`);
  console.log(result.output.recommendation);
  console.log("═".repeat(70));
}
