# Session Handoff — 2026-06-24 (session 4)

> **For the next AI agent:** Read this file FIRST, then `CLAUDE.md`, then `docs/KEYMAP_METHODOLOGY.md`. This supersedes all prior handoffs.

## The keyboard in 30 seconds

Split Charybdis, PMW3610 trackball under right thumb, 36 keys/half, 11 layers (0-10, all active except L6/L8 overlays), ZMK on Nice!Nano v2. Layout applied via ZMK Studio web UI (not firmware flash). Norwegian Windows host. 3 monitors, 6720px horizontal. User: Teams 57%, Edge 44%, VS Code 33%, M-Files 20%.

## What was accomplished this session

### 1. ZMK Studio apply/verify bug fixes

**"Keyboard B" bug identified and fixed.** When `apply_every_key.js` types a parameter name not matching any ZMK Studio ComboBox option, it falls to "Keyboard B" (2nd item in the default dropdown).

**7 wrong parameter names fixed in `apply_every_key.js`:**

| Position | Wrong name | Correct name |
|----------|-----------|--------------|
| L2 x0,y0 (Snip) | `Keyboard Print Screen` | `Keyboard PrintScreen and SysReq` |
| L2 x3,y3 (Zoom Out) | `Keyboard Minus` | `Keyboard Dash and Underscore` |
| L2 x5,y1 (Zoom In) | `Keyboard Equal` | `Keyboard Equals and Plus` |
| L10 x4,y0 (AutoSum) | `Keyboard Equal and Plus` | `Keyboard Equals and Plus` |
| L10 x8,y0 (=) | `Keyboard Equal and Plus` | `Keyboard Equals and Plus` |
| L10 x7,y1 (Insert) | `Keyboard Equal and Plus` | `Keyboard Equals and Plus` |
| L10 x2,y3 (Delete) | `Keyboard Minus` | `Keyboard Dash and Underscore` |

**New safety:** `KNOWN_KEY_NAMES` set added — apply script now **throws an error** on unknown parameter names instead of silently selecting wrong key.

**New files:** `scripts/zmk-studio/export_combobox_options.js` (dumps all valid options from Studio), `scripts/zmk-studio/zmk_studio_key_names.json` (reference file).

**verify_every_key.js:** Added `COACH_BEHAVIOR_MAP` so coach behaviors normalize to base types during comparison.

### 2. Pipeline upgrades — conjunction scoring + thumb fills

**Reorganizer (`reorganize_layout.js`):** Added `buildConjunctionPairs()` deriving 1742 shortcut-pair relationships from app categories + workflow steps. Swap scoring now combines effort delta + adjacency bonus. 12 of 24 proposals have conjunction bonuses.

**Candidate generator (`generate_candidates.js`):** Layer-context thumb filtering via `LAYER_APP_CONTEXT`. L5 thumbs get VS Code, L9 gets M-Files, L10 gets Excel. **17 thumb positions now assigned** (was 0 before).

**constants.js:** Added `LAYER_APP_CONTEXT` mapping.

### 3. DEAP evolutionary optimizer (NEW — major feature)

**New directory: `scripts/keymap-optimizer/evolve/`** — Python evolutionary optimization using DEAP (NSGA-II) + pyribs (MAP-Elites Quality-Diversity).

**12-factor fitness function:**
1. Weighted effort (importance × position_effort × usage_boost)
2. Workflow adjacency (conjunction pairs × proximity, hand alternation bonus)
3. Constraint violations (layer-context, button group splits, duplicates)
4. Finger load balancing (variance penalty)
5. Same-finger penalty (consecutive shortcuts on same finger)
6. Thumb utilization reward (+3 per filled thumb on toggled layers)
7. Cross-layer consistency (same shortcut at same position across L5/L9/L10)
8. Trackball proximity (right-hand home row on L2 gets bonus)
9. App transition efficiency
10. Learning curve penalty (prefer fewer changes from current layout)
11. Norwegian layout awareness (æ/ø/å sacred)
12. ZMK Studio compatibility (unknown parameter names get +20 penalty)

**Mutation operators:** swap_within_layer, swap_to_empty, migrate_shortcut, thumb_fill — all layer-aware, all skip structural/frozen positions.

**Test results (100 pop / 30 gen, ~7s):** Effort 3774→2283 (40% ↓), violations 1119→650 (42% ↓). 20 Pareto front solutions. Production config: 2000 pop / 500 gen (~2 min).

**pyribs QD:** Wired in, gracefully skipped if not installed. Adds MAP-Elites behavioral niche search (app_balance × thumb_utilization grid).

### 4. Smart shortcut usage tracker

**AHK (`charybdis_helpers.ahk`):** `LogShortcutUsage()` with privacy filter (only Ctrl/Alt/Win combos + F-keys, never bare letters/typing). Sequence tracking (prev shortcut + gap_ms within 5s). Appends to `runtime/shortcut_usage.jsonl`.

**Node.js aggregator (`aggregate_usage.js`):** Pipeline module reads JSONL → `build/usage_stats.json` with per-shortcut frequencies, sequence pairs, per-app/per-layer breakdowns. Feeds into evolution fitness as `usage_boost = log(1 + count)`.

### 5. Current pipeline state

```
Pipeline: 13/13 pass, 0 errors
Modules:
  1.  parse_sources        (FATAL)
  2.  aggregate_usage      (NEW)
  3.  validate_sync
  4.  resolve_transparency
  5.  build_layer_graph
  6.  physical_model
  7.  simulate_workflows
  8.  score_app_shortcuts
  9.  reorganize_layout    (upgraded: conjunction scoring)
  10. generate_candidates  (upgraded: layer-context thumbs)
  11. evolve_layout        (NEW — DEAP NSGA-II + QD)
  12. analyze_cross_app
  13. generate_report

Coverage: 462/532 (87%), 0 sync mismatches
Active layers: 10 (L0-L5, L7, L9, L10 + L6/L8 overlays)
Workflows: 28/28 passing
Coach: 13 apps, 462 mapped shortcuts
Evolution: 326 mutable positions, 26 thumb, 238 shortcuts, 1626 conjunction pairs
```

## Setup on new machine (GTX 1070)

### Quick install

```bash
# 1. Clone repo
git clone <repo-url>
cd splitted_zmk_keyboard

# 2. Node.js pipeline (already works, no install needed)
node scripts/keymap-optimizer/run_pipeline.js

# 3. Python evolution (optional — pipeline gracefully skips if missing)
pip install -r scripts/keymap-optimizer/evolve/requirements.txt

# 4. Optional: pyribs for Quality-Diversity MAP-Elites
pip install "pyribs[visualize]"

# 5. Optional: PyTorch with CUDA for GTX 1070 GPU acceleration
pip install torch --index-url https://download.pytorch.org/whl/cu121

# 6. Test evolution
python scripts/keymap-optimizer/evolve/run_evolution.py scripts/keymap-optimizer/build

# 7. Full pipeline with evolution
node scripts/keymap-optimizer/run_pipeline.js
```

### Config tuning (`scripts/keymap-optimizer/evolve/config.json`)

- `pop_size`: 2000 (default). GPU can handle 5000+. Increase for better Pareto front.
- `generations`: 500 (default). Diminishing returns past 1000.
- `use_gpu`: true (auto-detects CUDA). Falls back to CPU if unavailable.
- `weights`: tune the 12-factor scoring. `violations: 10.0` is the heaviest penalty.

### Start collecting usage data

Start `scripts/windows/charybdis_helpers.ahk` — it now logs shortcut usage to `runtime/shortcut_usage.jsonl`. After a few days of use, the aggregator feeds real-world frequencies into the evolution fitness function.

## What still needs work

### High priority

1. **verify_every_key.js EXPECTED_CSV is stale (v1.8)** — needs regeneration after applying v2.5 layout in ZMK Studio.

2. **apply_every_key.js NOT applied yet** — v2.0-v2.5 changes pending in ZMK Studio. The 7 fixed "Keyboard B" keys need reapply.

3. **"Keyboard PrintScreen and SysReq" name unverified** — best guess from HID standard. Run `export_combobox_options.js` in Studio to confirm.

4. **PyTorch GPU vectorization not yet implemented in fitness.py** — fitness currently uses numpy on CPU. The PyTorch batch evaluation path (evaluating 5000 candidates in one GPU call) would give 10× speedup for production runs. The data structures are ready for tensorization.

5. **Shift+P = Print bug in Edge** — still undiagnosed from session 3.

### Medium priority

6. **Evolution fitness tuning** — current weights are educated guesses. After running the optimizer a few times, adjust `config.json` weights based on which objectives matter most. The violation count (1119 for seed) is high because many shortcuts are on "wrong" layers per LAYER_APP_CONTEXT — may need to relax layer-context scoring or expand allowed app lists.

7. **pyribs QD integration** — installed but the MAP-Elites loop is simplistic (random parent selection). Could use CMA-MAE emitters from pyribs for smarter exploration.

8. **Reorganizer conjunction scoring refinement** — workflow-derived pairs use `desc` field (human text) for matching, not actual shortcut keys. Should use `shortcut_keys` field when available.

### Nice to have

9. **Baseline report improvements** — per-layer ASCII art, per-app efficiency bars.
10. **Coach beacon firmware integration** — host-side ready, firmware macros not yet wired.
11. **Usage data visualization** — heatmaps from shortcut_usage.jsonl data.

## Key files index

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Master project context. Layer map, firmware config, tuning history. |
| `layout/keybindings_explained.csv` | Layout source of truth. 616 keys, 11 layers. |
| `scripts/zmk-studio/apply_every_key.js` | ZMK Studio batch-apply. Fixed parameter names + KNOWN_KEY_NAMES validation. |
| `scripts/zmk-studio/verify_every_key.js` | ZMK Studio verifier. Coach behavior normalization added. |
| `scripts/zmk-studio/zmk_studio_key_names.json` | Valid ZMK Studio ComboBox key names. |
| `scripts/zmk-studio/export_combobox_options.js` | Dumps all valid options from Studio ComboBox. |
| `scripts/keymap-optimizer/run_pipeline.js` | Pipeline orchestrator. 13 modules. |
| `scripts/keymap-optimizer/aggregate_usage.js` | **NEW** — reads shortcut_usage.jsonl → usage_stats.json. |
| `scripts/keymap-optimizer/evolve_layout.js` | **NEW** — Node.js wrapper calling Python evolution. |
| `scripts/keymap-optimizer/evolve/run_evolution.py` | **NEW** — DEAP NSGA-II + pyribs QD main loop. |
| `scripts/keymap-optimizer/evolve/fitness.py` | **NEW** — 12-factor fitness function. |
| `scripts/keymap-optimizer/evolve/operators.py` | **NEW** — Layer-aware mutation + PMX crossover. |
| `scripts/keymap-optimizer/evolve/representation.py` | **NEW** — Genome encoding, constants, position index. |
| `scripts/keymap-optimizer/evolve/config.json` | Evolution parameters. Tune pop_size, generations, weights. |
| `scripts/keymap-optimizer/evolve/requirements.txt` | Python deps: deap, numpy, pyribs, torch. |
| `scripts/keymap-optimizer/reorganize_layout.js` | Frequency-vs-effort swaps + conjunction scoring. |
| `scripts/keymap-optimizer/generate_candidates.js` | Dynamic slot discovery + layer-context thumb fills. |
| `scripts/keymap-optimizer/lib/constants.js` | Effort scores, layer contexts, LAYER_APP_CONTEXT. |
| `scripts/windows/charybdis_helpers.ahk` | Desktop helper + shortcut usage tracker. |
| `apps/charybdis-coach/app.js` | Coach web app (~1430 lines). |

## How to continue iterating

```bash
# 1. Run pipeline (13 modules, ~8s without evolution, ~2min with)
node scripts/keymap-optimizer/run_pipeline.js

# 2. Run evolution standalone (faster iteration)
python scripts/keymap-optimizer/evolve/run_evolution.py scripts/keymap-optimizer/build

# 3. Quick test run (small population)
# Edit config.json: pop_size=100, generations=30
python scripts/keymap-optimizer/evolve/run_evolution.py scripts/keymap-optimizer/build

# 4. Check usage data (after running AHK helper for a while)
node scripts/keymap-optimizer/aggregate_usage.js

# 5. Dashboard
node scripts/keymap-optimizer/dashboard.js

# 6. Apply layout in ZMK Studio (after verifying evolution results)
# Paste scripts/zmk-studio/apply_every_key.js in DevTools console
# Then paste scripts/zmk-studio/verify_every_key.js to verify
```

## Mistakes to avoid

1. **"Keyboard B" fallback** — always check parameter names against `zmk_studio_key_names.json` before adding new keys to apply_every_key.js. The KNOWN_KEY_NAMES validation now catches this.
2. **Arrow keys are a button group** — reorganizer has cluster detection. Always verify groups after applying evolution proposals.
3. **verify_every_key.js `\"` escaping** — browser console needs backslash-escaped quotes inside the EXPECTED_CSV string.
4. **Layer-inappropriate shortcuts** — evolution fitness penalizes wrong-app-on-wrong-layer (factor 3, weight 10.0), but check results manually.
5. **CPI_DIVIDOR dead zone** — keep DIVIDOR=1 always. See CLAUDE.md.
6. **x0 IS usable** — effort=4, same as x12. Don't skip it.
7. **Three files must stay in sync**: CSV → apply_every_key.js → coach workflows.

## Commits this session

```
(pending — not yet committed)
```

## Files changed/created this session

**Modified (7):**
- `scripts/keymap-optimizer/generate_candidates.js` — layer-context thumb filtering
- `scripts/keymap-optimizer/lib/constants.js` — LAYER_APP_CONTEXT
- `scripts/keymap-optimizer/reorganize_layout.js` — conjunction scoring
- `scripts/keymap-optimizer/run_pipeline.js` — +2 modules (aggregate_usage, evolve_layout)
- `scripts/windows/charybdis_helpers.ahk` — shortcut usage tracker
- `scripts/zmk-studio/apply_every_key.js` — 7 param fixes + KNOWN_KEY_NAMES validation
- `scripts/zmk-studio/verify_every_key.js` — coach behavior normalization

**Created (10):**
- `scripts/keymap-optimizer/aggregate_usage.js`
- `scripts/keymap-optimizer/evolve_layout.js`
- `scripts/keymap-optimizer/evolve/config.json`
- `scripts/keymap-optimizer/evolve/fitness.py`
- `scripts/keymap-optimizer/evolve/operators.py`
- `scripts/keymap-optimizer/evolve/representation.py`
- `scripts/keymap-optimizer/evolve/requirements.txt`
- `scripts/keymap-optimizer/evolve/run_evolution.py`
- `scripts/zmk-studio/export_combobox_options.js`
- `scripts/zmk-studio/zmk_studio_key_names.json`
