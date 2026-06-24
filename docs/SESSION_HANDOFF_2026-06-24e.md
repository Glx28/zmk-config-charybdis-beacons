# Session Handoff — 2026-06-24 (session 5)

> **For the next AI agent:** Read this file FIRST, then `CLAUDE.md`, then `docs/KEYMAP_METHODOLOGY.md`. This supersedes all prior handoffs.

## The keyboard in 30 seconds

Split Charybdis, PMW3610 trackball under right thumb, 36 keys/half, 11 layers (0-10, all active except L6/L8 overlays), ZMK on Nice!Nano v2. Layout applied via ZMK Studio web UI (not firmware flash). Norwegian Windows host. 3 monitors, 6720px horizontal. User: Teams 57%, Edge 44%, VS Code 33%, M-Files 20%.

## What was accomplished this session

### 1. GPU batch fitness evaluation (PyTorch)

Rewrote `fitness.py` with pure-tensor GPU batch evaluation path (`evaluate_batch_gpu`). Evaluates entire populations in one call using matrix operations on GTX 1070.

**Result:** GPU gives ~1.3x speedup over CPU for this problem size (326 positions × 238 shortcuts × 1626 conjunction pairs). The problem is too small and irregular for GPU to dominate — the adjacency computation over 1626 conjunction pairs is the bottleneck.

**Multiprocessing attempt:** Tried `multiprocessing.Pool` with 8 workers — slower than single-threaded due to Windows spawn + pickle overhead per genome. Removed.

**Benchmarking:** Added `bench.py` for profiling CPU vs GPU. At ~190 evals/s CPU, calibrated optimal 10-min config as pop=1500, gen=60.

### 2. pyribs QD fix (ribs 0.11 API)

- Fixed package name: `pyribs` → `ribs` in requirements.txt (pip install was failing)
- Fixed ribs 0.11 API: `archive.add()` now takes batch inputs (2D arrays)
- Fixed iteration: `for elite in archive` returns dicts, not objects (`elite["solution"]` not `elite.solution`)
- QD MAP-Elites now runs: 6 elites at 6% coverage in test run (needs CMA-MAE emitters for real exploration)

### 3. Evolution algorithm fix: unassignment penalty

**Critical bug found and fixed:** The NSGA-II optimizer was improving scores by *removing* shortcuts rather than *reorganizing* them. Best solution (evo_0) dropped 138 of 182 assigned keys to get -72% effort improvement — unusable.

**Fix:** Added `_unassignment_penalty` to fitness function (weight=15.0). For each position that was assigned in the current layout but becomes empty in the evolved genome, applies penalty of `1.0 + importance * 0.5`. This makes removing a key cost more than any effort savings from dropping it.

- Added to both CPU single-eval and GPU batch eval paths
- `current_genome` now passed to `FitnessEvaluator` constructor
- Fixed `_learning_curve` to use `current_genome` as reference (was always returning 0)
- Config: added `"unassignment": 15.0` weight

### 4. Layout cherry-pick from evolution

Only 1 of 67 evolved assignments was safe to apply (rest were on occupied positions):

- **L3 x4,y4: Win+B** (Focus system tray) — Window layer thumb, was transparent

Updated: `keybindings_explained.csv`, `apply_every_key.js`

### 5. Coach beacon debounce fix

**Bug:** When holding a thumb key, the coach would briefly show the correct layer then snap back to Layer 0 after 1-2 seconds, even while still holding.

**Root cause:** The firmware beacon sends "held"→"released" pairs via Ctrl+Alt+Shift+F13-F20 hotkeys. The "released" beacon was arriving too quickly (key repeat bounce or macro timing issue).

**Fix:** Added debounce logic to `charybdis_helpers.ahk`:
- "Up" beacons are delayed 300ms via `SetTimer`
- If a "down" for the same layer arrives within that window, the release is cancelled
- Eliminates spurious release events from key repeat bounce

### 6. Windows mouse settings

Created `scripts/windows/apply_mouse_settings.ps1` — applies optimal trackball settings:
- MouseSensitivity=10 (1:1 mapping)
- MouseSpeed=0 (acceleration OFF)
- MouseThreshold1=0, MouseThreshold2=0
- Uses `SystemParametersInfo` for immediate effect (no logoff needed)

**Applied on this machine.**

### 7. Services running

All services launched and verified:
- **Coach HTTP server** (python http.server on port 8765, PID tracked)
- **AHK helper** with shortcut usage logger + beacon listener + debounce fix
- **Coach web UI** opened in browser at `http://127.0.0.1:8765/apps/charybdis-coach/`

Python beacon listener was killed (conflicted with AHK — both wrote to same state file).

## Evolution results (best run)

**Config:** pop=1500, gen=60, GPU batch eval on GTX 1070, ~8 min runtime.

| Metric | Seed | Best (evo_0) | Change |
|--------|------|-------------|--------|
| Effort | 3774 | 1058 | -72% |
| Violations | 1119 | 260 | -77% |
| Same-finger penalty | 116 | 23 | -80% |
| Finger balance | 24.5 | 11.7 | -52% |
| Assignments | 182/326 | 67/326 | Lost 138 keys |

**WARNING:** These results are from BEFORE the unassignment penalty fix. The -72% improvement was mostly from dropping keys, not better placement. Re-run evolution after the fix to get usable results.

## Current pipeline state

```
Pipeline: 13/13 pass, 0 errors
Evolution: unassignment penalty added (weight=15), not yet re-run
GPU: GTX 1070 available, ~1.3x speedup for batch eval
QD: pyribs fixed (ribs 0.11), 6% coverage in test (needs CMA-MAE emitters)
Services: coach + AHK + usage logger all running
Windows: mouse 1:1, acceleration OFF
```

## What still needs work

### High priority

1. **Re-run evolution with unassignment penalty** — the current results are unusable (dropped 138 keys). With the penalty, the optimizer should reorganize rather than remove. Expect smaller but real improvements.

2. **verify_every_key.js EXPECTED_CSV is stale (v1.8)** — needs regeneration after applying layout in ZMK Studio.

3. **apply_every_key.js NOT applied yet** — v2.0-v2.5 changes + L3 thumb fill pending in ZMK Studio.

4. **Beacon firmware integration still pending** — beacons ARE firing (F13-F20 chords detected), but timing is unreliable. The debounce fix helps but root cause is in the firmware macro timing.

### Medium priority

5. **GPU batch eval accuracy** — GPU results don't exactly match CPU (~5% divergence). The adjacency calculation uses sum-of-all-pairs instead of best-pair-per-conjunction. Needs fixing for production use.

6. **Evolution speed** — at ~190 evals/s (CPU) or ~250 evals/s (GPU batch), 10 min gets pop=1500×gen=60. For better results: vectorize the adjacency hot path in numpy (1626 conjunction pairs × Python loop is 2.45ms/eval), or rewrite operators in Cython/Numba.

7. **pyribs QD quality** — MAP-Elites uses random parent selection. Switch to CMA-MAE emitters from pyribs for smarter niche exploration.

8. **Python beacon listener conflicts** — don't run both `coach_beacon_listener.py` and `charybdis_helpers.ahk` simultaneously. They fight over the same state file. AHK is preferred (already running).

### Nice to have

9. **Usage data collection** — AHK logger is running. After a few days of real usage, re-run pipeline to feed frequencies into evolution fitness.

10. **Longer evolution runs** — with unassignment penalty, try pop=2000 gen=200 (~30 min) to find real reorganization improvements.

## Key files changed/created this session

**Modified (5):**
- `scripts/keymap-optimizer/evolve/fitness.py` — GPU batch eval, unassignment penalty, learning_curve fix
- `scripts/keymap-optimizer/evolve/run_evolution.py` — GPU batch eval path, pyribs 0.11 API fix, current_genome passthrough
- `scripts/keymap-optimizer/evolve/config.json` — unassignment weight, pop/gen calibration
- `scripts/keymap-optimizer/evolve/requirements.txt` — `pyribs` → `ribs` package name fix
- `scripts/windows/charybdis_helpers.ahk` — beacon hold debounce (300ms)

**Created (2):**
- `scripts/keymap-optimizer/evolve/bench.py` — CPU vs GPU performance profiler
- `scripts/windows/apply_mouse_settings.ps1` — optimal trackball mouse settings

**Layout (2):**
- `layout/keybindings_explained.csv` — L3 x4,y4 Win+B thumb fill
- `scripts/zmk-studio/apply_every_key.js` — L3 x4,y4 Win+B entry

## Commits this session

```
3df6253 fix: add unassignment penalty to evolution, cherry-pick L3 thumb fill
8718e2c feat: GPU batch fitness eval, pyribs QD fix, multicore benchmarking
```

## Mistakes to avoid

1. **Don't run evolution without unassignment penalty** — it will drop assigned keys to improve scores.
2. **Don't run both Python beacon listener and AHK helper** — they conflict on the state file.
3. **GPU batch eval diverges from CPU** — use CPU `evaluate()` for final scoring/breakdown, GPU only for population-level selection pressure.
4. **pyribs package is `ribs` not `pyribs`** — `pip install ribs[visualize]`.
5. **Windows multiprocessing uses spawn** — global variables don't transfer to child processes. Pool initializer required. But multiprocessing is slower than single-threaded for this problem size anyway.
6. **Registry writes are sandboxed in Claude Code** — use the `apply_mouse_settings.ps1` script in a normal PowerShell window.
