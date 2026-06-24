const fs = require("fs");
const path = require("path");
const { writeBuild, ROOT } = require("./lib/io");

const USAGE_LOG = path.join(ROOT, "runtime", "shortcut_usage.jsonl");

function run(config) {
  const errors = [], warnings = [];

  if (!fs.existsSync(USAGE_LOG)) {
    const empty = {
      timestamp: new Date().toISOString(),
      total_events: 0, period_days: 0,
      shortcuts: {}, sequences: {}, by_app: {}, by_layer: {},
      note: "No usage data yet. Start charybdis_helpers.ahk to begin collecting.",
    };
    writeBuild("usage_stats.json", empty);
    return { success: true, output: { summary: "No usage data (shortcut_usage.jsonl not found)" }, errors, warnings };
  }

  const lines = fs.readFileSync(USAGE_LOG, "utf-8").split(/\r?\n/).filter(Boolean);
  const shortcuts = {};
  const sequences = {};
  const byApp = {};
  const byLayer = {};
  let earliest = null, latest = null;

  for (const line of lines) {
    let entry;
    try { entry = JSON.parse(line); } catch { continue; }

    const ts = entry.ts;
    const keys = entry.keys;
    const app = entry.app || "unknown";
    const layer = String(entry.layer || "0");

    if (!keys) continue;

    if (!earliest || ts < earliest) earliest = ts;
    if (!latest || ts > latest) latest = ts;

    if (!shortcuts[keys]) shortcuts[keys] = { count: 0, apps: {} };
    shortcuts[keys].count++;
    shortcuts[keys].apps[app] = (shortcuts[keys].apps[app] || 0) + 1;

    if (!byApp[app]) byApp[app] = { total: 0, shortcuts: {} };
    byApp[app].total++;
    byApp[app].shortcuts[keys] = (byApp[app].shortcuts[keys] || 0) + 1;

    byLayer[layer] = (byLayer[layer] || 0) + 1;

    if (entry.prev && entry.gap_ms) {
      const seqKey = `${entry.prev} -> ${keys}`;
      if (!sequences[seqKey]) sequences[seqKey] = { count: 0, total_gap_ms: 0 };
      sequences[seqKey].count++;
      sequences[seqKey].total_gap_ms += entry.gap_ms;
    }
  }

  for (const [, seq] of Object.entries(sequences)) {
    seq.avg_gap_ms = Math.round(seq.total_gap_ms / seq.count);
    delete seq.total_gap_ms;
  }

  let periodDays = 0;
  if (earliest && latest) {
    periodDays = Math.max(1, Math.round((new Date(latest) - new Date(earliest)) / 86400000));
  }

  for (const [, s] of Object.entries(shortcuts)) {
    s.per_day = Math.round((s.count / Math.max(periodDays, 1)) * 10) / 10;
  }

  for (const [, a] of Object.entries(byApp)) {
    a.top = Object.entries(a.shortcuts).sort((x, y) => y[1] - x[1]).slice(0, 10).map(e => e[0]);
    delete a.shortcuts;
  }

  const output = {
    timestamp: new Date().toISOString(),
    total_events: lines.length,
    period_days: periodDays,
    shortcuts,
    sequences,
    by_app: byApp,
    by_layer: byLayer,
  };

  writeBuild("usage_stats.json", output);

  return {
    success: true,
    output: { summary: `${lines.length} events, ${Object.keys(shortcuts).length} unique shortcuts, ${periodDays} days` },
    errors, warnings,
  };
}

module.exports = { run };

if (require.main === module) {
  const result = run({});
  console.log("Usage aggregation:", result.output.summary);
}
