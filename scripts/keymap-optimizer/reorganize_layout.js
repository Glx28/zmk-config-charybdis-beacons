const { readBuild, writeBuild } = require("./lib/io");
const {
  effort, hand, LAYER_NAMES, LAYER_ACCESS, LAYER_CONTEXTS,
  COACH_BEHAVIORS, STRUCTURAL_BEHAVIORS, THUMB_POSITIONS, THUMB_HAND,
  isTransparent, isNone,
} = require("./lib/constants");

const SKIP_LAYERS = new Set([0, 6, 7, 8]);
const MAX_SWAPS_PER_LAYER = 6;
const MIN_EFFORT_DELTA = 2;

function isStructural(binding) {
  if (!binding) return false;
  const b = binding.behavior || "";
  if (COACH_BEHAVIORS.has(b)) return true;
  if (STRUCTURAL_BEHAVIORS.has(b)) return true;
  if (/momentary layer|toggle layer/i.test(b)) return true;
  if (/mouse key press/i.test(b)) return true;
  if (/bluetooth|output selection|studio unlock|reset|bootloader/i.test(b)) return true;
  const p = (binding.parameter || "").toLowerCase();
  if (/spacebar|return enter|leftshift|rightshift|leftalt|rightalt|leftctrl|rightctrl/i.test(p) && !/,/.test(binding.modifiers || "")) return true;
  return false;
}

function lookupImportance(binding, appScores) {
  if (!binding || isTransparent(binding.behavior) || isNone(binding.behavior)) return 0;
  if (isStructural(binding)) return Infinity;

  const param = (binding.parameter || "").toUpperCase();
  const mods = (binding.modifiers || []).map(m => {
    if (/gui/i.test(m)) return "Win";
    if (/ctrl/i.test(m)) return "Ctrl";
    if (/shift/i.test(m)) return "Shift";
    if (/alt/i.test(m)) return "Alt";
    return m;
  }).sort();
  const modStr = mods.join("+");

  let bestImportance = 0;
  for (const app of appScores.apps) {
    for (const s of app.shortcuts) {
      if (!s.mapped) continue;
      const match = s.best_match;
      if (!match) continue;
      const sMods = s.keys.split("+").filter(k => /^(Ctrl|Shift|Alt|Win)$/i.test(k)).sort().join("+");
      const sBase = s.keys.split("+").pop().toUpperCase();
      if (sMods === modStr && param.includes(sBase)) {
        bestImportance = Math.max(bestImportance, s.importance);
      }
    }
  }

  if (bestImportance === 0 && !/key press/i.test(binding.behavior)) return 0;
  if (bestImportance === 0) bestImportance = 1;
  return bestImportance;
}

function run(config) {
  const errors = [], warnings = [];
  const canonical = readBuild("canonical.json");
  const appScores = readBuild("app_shortcut_scores.json");
  const proposals = [];

  for (const [layerId, layerData] of Object.entries(canonical.layers)) {
    const layerNum = Number(layerId);
    if (SKIP_LAYERS.has(layerNum)) continue;

    const access = LAYER_ACCESS[layerNum];
    const isMomentary = access?.method === "momentary";
    const busyThumb = isMomentary ? access?.thumb : null;

    const keys = [];
    const positions = [];

    for (const [coord, binding] of Object.entries(layerData.keys)) {
      const [x, y] = coord.split(":").map(Number);
      const e = effort(x, y);

      if (y >= 4) {
        if (busyThumb && THUMB_HAND[x] === busyThumb) continue;
      }

      positions.push({ coord, x, y, effort: e, hand: hand(x) });

      if (isTransparent(binding.behavior) || isNone(binding.behavior)) continue;
      if (isStructural(binding)) continue;

      const importance = lookupImportance(binding, appScores);
      if (importance === Infinity) continue;

      keys.push({
        coord, x, y, effort: e,
        label: binding.label || binding.parameter || "?",
        behavior: binding.behavior,
        parameter: binding.parameter,
        modifiers: binding.modifiers,
        importance,
      });
    }

    if (keys.length < 2) continue;

    const sortedKeys = [...keys].sort((a, b) => b.importance - a.importance);
    const sortedPositions = [...positions]
      .filter(p => keys.some(k => k.coord === p.coord) || isTransparent((layerData.keys[p.coord] || {}).behavior))
      .filter(p => !isStructural(layerData.keys[p.coord]))
      .sort((a, b) => a.effort - b.effort);

    const usablePositions = sortedPositions.slice(0, sortedKeys.length);

    const optimalMap = new Map();
    for (let i = 0; i < sortedKeys.length && i < usablePositions.length; i++) {
      optimalMap.set(sortedKeys[i].coord, usablePositions[i].coord);
    }

    let layerSwaps = 0;
    for (const key of sortedKeys) {
      if (layerSwaps >= MAX_SWAPS_PER_LAYER) break;
      const optCoord = optimalMap.get(key.coord);
      if (!optCoord || optCoord === key.coord) continue;

      const [ox, oy] = optCoord.split(":").map(Number);
      const optEffort = effort(ox, oy);
      const delta = key.effort - optEffort;

      if (delta < MIN_EFFORT_DELTA) continue;

      const targetBinding = layerData.keys[optCoord];
      if (targetBinding && !isTransparent(targetBinding.behavior) && isStructural(targetBinding)) continue;

      const targetKey = keys.find(k => k.coord === optCoord);

      proposals.push({
        layer: layerNum,
        layer_name: LAYER_NAMES[layerNum] || `Layer ${layerNum}`,
        type: targetKey ? "swap" : "move_to_empty",
        key_a: { coord: key.coord, x: key.x, y: key.y, label: key.label, importance: key.importance, effort: key.effort },
        key_b: targetKey
          ? { coord: targetKey.coord, x: targetKey.x, y: targetKey.y, label: targetKey.label, importance: targetKey.importance, effort: targetKey.effort }
          : { coord: optCoord, x: ox, y: oy, label: "(transparent)", importance: 0, effort: optEffort },
        effort_delta: delta,
        reason: `${key.label} (importance ${key.importance.toFixed(1)}) at effort ${key.effort} → effort ${optEffort} (save ${delta})`,
      });
      layerSwaps++;
    }
  }

  proposals.sort((a, b) => b.effort_delta - a.effort_delta);

  const output = {
    timestamp: new Date().toISOString(),
    total_proposals: proposals.length,
    proposals,
  };

  writeBuild("reorganize_proposals.json", output);

  const summary = proposals.length
    ? `${proposals.length} swap proposals across ${new Set(proposals.map(p => p.layer)).size} layers`
    : "No swaps needed — layout already well-organized";

  return { success: true, output: { summary }, errors, warnings };
}

module.exports = { run };

if (require.main === module) {
  const result = run({});
  const p = JSON.parse(require("fs").readFileSync("scripts/keymap-optimizer/build/reorganize_proposals.json", "utf8"));
  console.log(`\nReorganize: ${p.total_proposals} proposals\n`);
  for (const prop of p.proposals) {
    console.log(`  L${prop.layer} ${prop.type}: ${prop.reason}`);
  }
}
