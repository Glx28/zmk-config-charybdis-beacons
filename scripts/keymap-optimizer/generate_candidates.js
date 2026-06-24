const { readBuild, writeBuild } = require("./lib/io");
const {
  effort, hand, LEFT_COLS, RIGHT_COLS, FINGER_ROWS, THUMB_ROWS,
  LAYER_NAMES, LAYER_ACCESS, LAYER_CONTEXTS,
  COACH_BEHAVIORS, STRUCTURAL_BEHAVIORS, THUMB_POSITIONS, THUMB_HAND,
  isTransparent, isNone,
} = require("./lib/constants");

const FREQ_WEIGHTS = { constant: 10, high: 6, medium: 3, low: 1, rare: 0.2 };

function isStructural(binding) {
  if (!binding) return false;
  const b = binding.behavior || "";
  if (COACH_BEHAVIORS.has(b)) return true;
  if (STRUCTURAL_BEHAVIORS.has(b)) return true;
  if (/mouse key press/i.test(b)) return true;
  if (/bluetooth|output selection|studio unlock|reset|bootloader/i.test(b)) return true;
  const p = (binding.parameter || "").toLowerCase();
  if (/spacebar|return enter/i.test(p) && (binding.modifiers || []).length === 0) return true;
  return false;
}

function isThumbAvailable(layerNum, x, y) {
  if (y < 4) return true;
  const access = LAYER_ACCESS[layerNum];
  if (!access) return true;

  if (access.key && access.key.x === x && access.key.y === y) return false;

  const isMomentary = access.method === "momentary";
  if (isMomentary && access.thumb && THUMB_HAND[x] === access.thumb) return false;

  return true;
}

function findFreeSlots(canonical) {
  const freeSlots = {};
  for (const [layerId, layerData] of Object.entries(canonical.layers)) {
    const layerNum = Number(layerId);
    const free = [];
    for (const [coord, binding] of Object.entries(layerData.keys)) {
      if (!isTransparent(binding.behavior)) continue;
      const [x, y] = coord.split(":").map(Number);
      if (!isThumbAvailable(layerNum, x, y)) continue;
      free.push({
        coord, x, y,
        effort: effort(x, y),
        hand: hand(x),
        isThumb: y >= 4,
      });
    }
    free.sort((a, b) => a.effort - b.effort);
    freeSlots[layerId] = free;
  }
  return freeSlots;
}

function assignKeysToSlots(shortcuts, slots) {
  const sortedShortcuts = [...shortcuts].sort((a, b) => b.importance - a.importance);
  const sortedSlots = [...slots].sort((a, b) => a.effort - b.effort);
  const assignments = [];
  const usedSlots = new Set();

  for (const shortcut of sortedShortcuts) {
    let bestSlot = null;
    for (const slot of sortedSlots) {
      if (usedSlots.has(slot.coord)) continue;
      bestSlot = slot;
      break;
    }
    if (!bestSlot) break;
    usedSlots.add(bestSlot.coord);
    assignments.push({
      ...bestSlot,
      shortcut,
      from: "Transparent",
      to: `Key Press: ${shortcut.keys}`,
      label: shortcut.label,
      action: shortcut.action,
    });
  }
  return assignments;
}

function run(config) {
  const errors = [], warnings = [];
  const canonical = readBuild("canonical.json");
  const scores = readBuild("app_shortcut_scores.json");
  const resolved = readBuild("resolved_layout.json");

  let reorgProposals = { proposals: [] };
  try { reorgProposals = readBuild("reorganize_proposals.json"); } catch (e) { /* optional */ }

  const candidates = [];
  const freeSlots = findFreeSlots(canonical);

  // Collect unmapped high-frequency shortcuts
  const unmappedGaps = [];
  for (const app of scores.apps) {
    for (const s of app.shortcuts) {
      if (!s.mapped && s.freq_weight >= 3) {
        unmappedGaps.push({
          app: app.id, keys: s.keys, action: s.action,
          frequency: s.frequency, importance: s.importance,
          modifiers: s.keys.split("+").filter(k => /^(Ctrl|Shift|Alt|Win)$/i.test(k)).sort(),
          base_key: s.keys.split("+").pop(),
          label: s.action.split(" ").map(w => w.slice(0, 3)).join("").slice(0, 5),
        });
      }
    }
  }
  unmappedGaps.sort((a, b) => b.importance - a.importance);

  // Candidate A: Baseline
  candidates.push({
    id: "baseline",
    name: "Current Layout (No Changes)",
    description: "Keep the current layout unchanged. Reference point.",
    changes: [], rationale: "Baseline for comparison.",
    new_layers: [], estimated_coverage_change: "0%", risk: "none",
  });

  // Candidate B: Fill all free slots on active layers dynamically
  const activeFillLayers = [1, 2, 3, 4, 5, 9, 10];
  const allFillChanges = [];

  for (const layerNum of activeFillLayers) {
    const layerFree = freeSlots[String(layerNum)] || [];
    if (layerFree.length === 0) continue;

    const layerAccess = LAYER_ACCESS[layerNum];
    const isMomentary = layerAccess?.method === "momentary";
    const busyThumb = isMomentary ? layerAccess?.thumb : null;

    const relevantShortcuts = unmappedGaps.filter(g => {
      if (g.modifiers.some(m => /win/i.test(m)) && layerNum === 3) return true;
      if (g.modifiers.length >= 2) return true;
      if (g.modifiers.length === 1 && layerNum >= 5) return true;
      return false;
    });

    const assignments = assignKeysToSlots(relevantShortcuts.slice(0, layerFree.length), layerFree);
    for (const a of assignments) {
      allFillChanges.push({ layer: layerNum, ...a });
    }
  }

  if (allFillChanges.length) {
    candidates.push({
      id: "fill_free_slots",
      name: `Fill ${allFillChanges.length} Free Slots Across Active Layers`,
      description: `Dynamically assign unmapped shortcuts to ${allFillChanges.length} transparent positions (including x0 and thumb positions) across layers ${activeFillLayers.join(", ")}.`,
      changes: allFillChanges,
      rationale: "Greedy assignment: highest-importance shortcuts get lowest-effort positions. x0 and x12 treated equally (effort=4). Thumb positions on toggled layers included.",
      new_layers: [],
      estimated_coverage_change: `+${allFillChanges.length} shortcuts`,
      risk: "low — only fills transparent slots",
    });
  }

  // Candidate C: Reorganization swaps (from reorganize_layout module)
  if (reorgProposals.proposals && reorgProposals.proposals.length > 0) {
    candidates.push({
      id: "reorganize_existing",
      name: `Reorganize ${reorgProposals.proposals.length} Existing Keys by Frequency`,
      description: `Move ${reorgProposals.proposals.length} keys to better ergonomic positions based on usage frequency. High-importance shortcuts move to home row (y2), low-importance move to y0/x0/x12.`,
      changes: reorgProposals.proposals.map(p => ({
        layer: p.layer, type: p.type,
        key_a: p.key_a, key_b: p.key_b,
        effort_delta: p.effort_delta, reason: p.reason,
      })),
      rationale: "Frequency-effort optimization: most-used shortcuts should be in easiest positions.",
      new_layers: [],
      estimated_coverage_change: "Same coverage, better efficiency",
      risk: "medium — changes muscle memory for relocated keys",
    });
  }

  // Summary
  const totalFree = Object.entries(freeSlots).reduce((sum, [, slots]) => sum + slots.length, 0);
  const thumbFree = Object.entries(freeSlots).reduce((sum, [, slots]) => sum + slots.filter(s => s.isThumb).length, 0);

  const output = {
    timestamp: new Date().toISOString(),
    analysis: {
      total_unmapped_high_freq: unmappedGaps.filter(g => g.importance >= 6).length,
      total_free_slots: totalFree,
      total_free_thumb_slots: thumbFree,
      free_per_layer: Object.entries(freeSlots).map(([l, slots]) => ({
        layer: Number(l), name: LAYER_NAMES[l] || `Layer ${l}`,
        free_total: slots.length,
        free_finger: slots.filter(s => !s.isThumb).length,
        free_thumb: slots.filter(s => s.isThumb).length,
        x0_free: slots.filter(s => s.x === 0).length,
      })),
      reorg_proposals: reorgProposals.proposals?.length || 0,
    },
    candidates,
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
  console.log(`\nAnalysis: ${a.total_unmapped_high_freq} unmapped high-freq, ${a.total_free_slots} free slots (${a.total_free_thumb_slots} thumb)`);
  console.log("Free per layer:");
  for (const l of a.free_per_layer.filter(l => l.free_total > 0)) {
    console.log(`  L${l.layer} ${l.name}: ${l.free_total} (finger: ${l.free_finger}, thumb: ${l.free_thumb}, x0: ${l.x0_free})`);
  }
  if (a.reorg_proposals) console.log(`\nReorganization: ${a.reorg_proposals} swap proposals`);

  for (const c of result.output.candidates) {
    console.log(`\n─── ${c.id}: ${c.name} ───`);
    console.log(`  Changes: ${c.changes.length}, Coverage: ${c.estimated_coverage_change}, Risk: ${c.risk}`);
  }
  console.log("═".repeat(70));
}
