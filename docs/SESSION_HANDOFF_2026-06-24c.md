# Session Handoff — 2026-06-24 (session 3)

> **For the next AI agent:** Read this file FIRST, then `CLAUDE.md`, then `docs/KEYMAP_METHODOLOGY.md`. This supersedes all prior handoffs.

## The keyboard in 30 seconds

Split Charybdis, PMW3610 trackball under right thumb, 36 keys/half, 11 layers (0-10, all active except L6/L8 overlays), ZMK on Nice!Nano v2. Layout applied via ZMK Studio web UI (not firmware flash). Norwegian Windows host. 3 monitors, 6720px horizontal. User: Teams 57%, Edge 44%, VS Code 33%, M-Files 20%.

## What was accomplished this session

### 1. Layout v2.5 — L10 Excel + L3 Copilot/Voice/Lang

- **Layer 10 Excel** (48 shortcuts): formulas, formatting, sheet nav, selection, clipboard. Toggle from L4 x0,y3. Coverage: 50%→90%.
- **L3 y0 replacements**: x9,y0 Win+C (Copilot, replaced rare Win+K Cast), x11,y0 Win+Space (Lang switch, replaced dupe emoji), x12,y0 Win+H (Voice typing, was transparent).
- **9 CSV↔Apply sync mismatches fixed**: BT params `"0"`→`"BT_SEL 0"`, L3 modifier double-counting, L3 7,2 corrected to Win+S.
- **Browser corpus**: +23 Vimium + 2 Proton Pass extension shortcuts (64→89 total).
- **3 new pipeline workflows**: punctuation_access, language_voice_copilot, excel_power_user.
- **Version cleanup**: all headers/versions updated to v2.5.

### 2. Optimizer Pipeline Upgrade (major)

**New module: `reorganize_layout.js`** — proposes within-layer swaps to move high-frequency keys to lower-effort positions.

Key scoring features:
- **Button group protection**: arrow clusters (↓↑→), clipboard (C/V/X/Z), F-keys, mouse buttons, BT profiles detected as adjacent clusters and protected from being split. Uses flood-fill cluster detection so partial groups (3 of 4 arrows on one hand) are still protected.
- **Duplicate penalty**: 30% importance reduction for keys duplicated on the same layer.
- **Importance gating**: swaps only happen when the moving key has strictly higher importance than the target.
- Max 5 swaps/layer, minimum effort delta ≥ 2.

**Rewritten: `generate_candidates.js`** — dynamic slot discovery replacing hardcoded candidate lists.
- **x0 column now included**: was hardcoded out (comment: "x0 stays transparent"). x0 has effort=4 (same as x12). Now treated symmetrically.
- **Thumb positions (y4/y5) now discoverable**: previously filtered by `if (y < 4)`. Now checks thumb availability per-context: skips layer activator keys, skips same-hand thumbs on momentary layers, includes all thumbs on toggled layers.
- Uses `assignKeysToSlots()` — greedy assignment: highest-importance shortcut → lowest-effort slot.

**Updated: `constants.js`** — added `THUMB_POSITIONS`, `THUMB_HAND`, `STRUCTURAL_BEHAVIORS`.

**Pipeline now runs 11 modules**: parse_sources → validate_sync → resolve_transparency → build_layer_graph → physical_model → simulate_workflows → score_app_shortcuts → **reorganize_layout** → generate_candidates → analyze_cross_app → generate_report.

### 3. Layout Changes Applied

- **L3 x0 filled**: Emoji(y0), MinAll(y1), Snip(y2), ClipH(y3) — Window layer shortcuts.
- **L5 x0 filled**: Hover(y0), Wrap(y1), Rename(y2), Close(y3) — VS Code shortcuts.
- **L9 x0 filled**: Refresh(y0), Back(y1), Search(y2), Rename(y3) — M-Files shortcuts.
- **34 ergonomic swaps** applied across all active layers (group-safe).
- **verify_every_key.js** syntax fixed: EXPECTED_CSV had lost `\"` escaping since v2.0 commit. Restored proper escaping. Header updated to v2.5.

### 4. Current State

```
Pipeline: 11/11 pass, 0 errors, 0 warnings
Coverage: 462/532 (87%), 0 sync mismatches
Active layers: 10 (L0-L5, L7, L9, L10 + L6/L8 overlays)
Workflows: 28/28 passing
Coach: 13 apps, 462 mapped shortcuts
```

## Current firmware config

File: `config/boards/shields/charybdis/charybdis_right.conf` — CPI 400, DIVIDOR 1, SNIPE 3200, SCROLL_TICK 70, POLLING 250Hz, SMART_ALGORITHM on. Effective precision = 400 × 0.5 (keymap scaler) × Windows 1:1 = 200. Speed mode = 3200 × 0.5 = 1600 effective (8× base).

## What still needs work

### High priority

1. **verify_every_key.js EXPECTED_CSV baseline is stale** — still v1.8 data. After applying v2.5 layout in ZMK Studio, run `scripts/zmk-studio/export_current_layout_console.js` and paste output over EXPECTED_CSV. Until then, the verifier flags all v2.0-v2.5 changes as mismatches.

2. **Reorganizer needs same-layer conjunction scoring** — reward shortcuts that are frequently used together being on the same layer (e.g., Ctrl+C and Ctrl+V both on L2). Currently the reorganizer only optimizes effort, not workflow adjacency.

3. **Thumb positions still mostly unfilled** — the generator discovers 38 free thumb slots but the fill candidate mixes shortcuts across layers without context (Teams shortcuts on L5 Code, Excel on L3 Window). The `assignKeysToSlots` function needs layer-context filtering: L5 thumbs should get VS Code shortcuts, L9 thumbs should get M-Files shortcuts, etc.

4. **Shift+P = Print bug in Edge** — User reports Shift+P triggers Print (Ctrl+P) instead of capital P, only in Edge. Undiagnosed.

### Important

5. **apply_every_key.js has NOT been applied in ZMK Studio yet** — the user has been developing the layout in code but hasn't pasted it into Studio. All v2.0-v2.5 changes are pending application.

6. **Reorganizer doesn't score key relatedness to neighbors** — the user wants positive scoring for related keys near each other (not just group protection). E.g., if debug shortcuts are on y0, a new debug shortcut should prefer y0 over y2 even if y2 has lower effort.

7. **Cross-layer consistency for thumbs** — preference (soft constraint) for same shortcut on same thumb position across toggled layers (e.g., Save at 3:4 on L5 AND L9 AND L10).

### Nice to have

8. **Edge extension shortcuts** — Vimium corpus added but no dedicated layer keys; they're single-key shortcuts that work from base.
9. **Baseline report improvements** — per-layer ASCII art, per-app efficiency bars.
10. **Coach beacon firmware integration** — host-side ready, firmware macros not yet wired.

## Mistakes to avoid

1. **Arrow keys are a button group** — earlier reorganizer broke ↓↑→ cluster on L1 y2 right hand by swapping ↑ with a high-importance key. Fixed with cluster detection. Always verify groups after reorganization.
2. **verify_every_key.js uses `\"` escaping inside a `"` string** — a commit stripped the backslashes, causing `Unexpected identifier 'layer'` in browser console. The fix is to re-escape: `""` → `\"`.
3. **apply_every_key.js layout object has trailing code** — the JSON object ends at `}\n;` then 400+ lines of applier JS follow. Parsers must use brace-depth counting, not regex.
4. **Don't put layer-inappropriate shortcuts on thumbs** — the fill candidate mixed Teams/Excel shortcuts onto Code/M-Files layer thumbs. Thumb fills need layer-context awareness.
5. **CPI_DIVIDOR dead zone** — keep DIVIDOR=1 always. See CLAUDE.md.
6. **x0 is NOT reserved** — earlier sessions treated x0 as sacred modifier fall-through. User explicitly said x0 CAN and SHOULD be used. x0 effort = x12 effort = 4.
7. **Three files must stay in sync**: CSV (source of truth) → apply_every_key.js → coach workflows. Edit CSV first, match apply script, then `node scripts/keymap-optimizer/generate_coach_workflows.js`.

## Key files index

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Master project context. Layer map, firmware config, tuning history. |
| `layout/keybindings_explained.csv` | Layout source of truth. 616 keys, 11 layers. |
| `scripts/zmk-studio/apply_every_key.js` | ZMK Studio batch-apply. Paste in DevTools console. |
| `scripts/zmk-studio/verify_every_key.js` | ZMK Studio verifier. EXPECTED_CSV baseline is v1.8 (stale). |
| `scripts/keymap-optimizer/run_pipeline.js` | Pipeline orchestrator. 11 modules. |
| `scripts/keymap-optimizer/reorganize_layout.js` | **NEW** — frequency-vs-effort swap proposals with group protection. |
| `scripts/keymap-optimizer/generate_candidates.js` | **REWRITTEN** — dynamic slot discovery (x0 + thumbs). |
| `scripts/keymap-optimizer/lib/constants.js` | Effort scores, layer contexts, thumb constants, structural behaviors. |
| `scripts/keymap-optimizer/score_app_shortcuts.js` | Cross-references corpus against resolved layout. |
| `scripts/keymap-optimizer/generate_coach_workflows.js` | Generates coach JSON from corpus + scores. |
| `scripts/keymap-optimizer/dashboard.js` | ASCII dashboard. Version v2.5. |
| `scripts/keymap-optimizer/app-keybindings/` | 13 app corpora. `index.json` has weights. |
| `scripts/keymap-optimizer/workflows/` | 28 workflow simulation definitions. |
| `apps/charybdis-coach/app.js` | Coach web app (~1430 lines). |
| `apps/charybdis-coach/workflows/*.json` | Auto-generated coach guides per app. |

## How to continue iterating

```bash
# 1. Run pipeline + dashboard
node scripts/keymap-optimizer/run_pipeline.js
node scripts/keymap-optimizer/dashboard.js

# 2. Check reorganization proposals
node scripts/keymap-optimizer/reorganize_layout.js

# 3. Check candidate fills
node scripts/keymap-optimizer/generate_candidates.js

# 4. After layout changes: update CSV first, then apply script, then:
node scripts/keymap-optimizer/generate_coach_workflows.js

# 5. Apply layout in ZMK Studio
# Paste scripts/zmk-studio/apply_every_key.js in DevTools console
# Then paste scripts/zmk-studio/verify_every_key.js to verify
```

## Commits this session

```
3068ea2 fix: reorganizer group protection, verify_every_key.js syntax, x0 fills
6576e86 feat: optimizer pipeline upgrade — reorganize, x0/thumb support, dynamic candidates
f019a5f feat: v2.5 — L10 Excel layer, L3 Copilot/Voice/Lang, sync fixes, Vimium corpus
```
