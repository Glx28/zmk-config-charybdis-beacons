# Session Handoff — 2026-06-24

> **For the next AI agent:** Read this file FIRST, then `CLAUDE.md`, then `docs/KEYMAP_METHODOLOGY.md`. Together they give you complete context. Do NOT re-derive what's already documented here.

## The keyboard in 30 seconds

Split Charybdis with PMW3610 trackball under right thumb. 36 keys per half. 11 layers (0-10). ZMK firmware on Nice!Nano v2. Layout applied via ZMK Studio web UI (not firmware flash). Norwegian Windows host OS. 3 monitors, 6720px horizontal. User works primarily in Teams (57%), Edge (44% active), VS Code (33%), M-Files DMS (20%).

## Critical mental model

1. **Right thumb = trackball.** When using mouse, right thumb is on the ball. Left hand does all clicking (MB1-5 on L2 home row y2) and shortcuts.
2. **Thumb holds activate layers.** Left thumb: Nav (L1), Mouse (L2). Right thumb: Window (L3), System (L4). The holding thumb can't press other thumb keys simultaneously.
3. **Toggled/locked layers free both hands.** L5 (Code), L7 (Game), L8 (Speed), L9 (M-Files) are toggled/locked — both hands fully available.
4. **y2 (home row) = most-used keys per layer.** y1/y3 = second tier. y0 = least used. This is the ergonomic priority rule.
5. **Three files must stay in sync:** `layout/keybindings_explained.csv` (source of truth), `scripts/zmk-studio/apply_every_key.js` (Studio payload), and `apps/charybdis-coach/workflows/*.json` (coach references). Edit CSV first, then mirror to the other two.
6. **Firmware builds via GitHub Actions ONLY.** No Docker. Push to `main` → CI builds → download UF2 artifact.

## What was accomplished this session

### Layout: v2.0 → v2.3

| Layer | Change | Keys added |
|-------|--------|------------|
| L2 Mouse | Left hand populated (MB1-5 home row, clipboard, window mgmt). Both scrolls → Momentary. Speed → Momentary. | 20 |
| L3 Window | y0 filled (10 Win extras). Right y1 filled (Lock/Settings/Run). Duplicate Win+Tab → Win+E. Added Win+X. | 16 |
| L4 System | F-keys deduped → sequential F13-F24. Right half filled: universal Ctrl shortcuts (y2), app nav (y1), Teams meeting controls (y3). | 20 |
| L5 Code/IDE | **NEW layer.** 44 VS Code shortcuts. Toggle from L1 x0,y1. Debug suite on y0, editing y1, core y2, panels y3. | 48 |
| L9 M-Files | **NEW layer.** 22 DMS shortcuts. Toggle from L4 x2,y3. Check in/out, properties, workflow, history. | 26 |
| L1 Nav | Scroll → Momentary (hold). Game lock replaced with Code toggle. | 2 |
| Naming | "PT Run" / "PowerToys Run" → "CmdPal" / "PowerToys Command Palette" everywhere. | — |

### Optimization pipeline

`scripts/keymap-optimizer/` — 10 Node.js modules, JSON-driven, each reads from `build/` and writes back.

```
parse_sources → validate_sync → resolve_transparency → build_layer_graph →
physical_model → simulate_workflows → score_app_shortcuts → analyze_cross_app →
generate_candidates → generate_report
```

**Run:** `node scripts/keymap-optimizer/run_pipeline.js`
**Dashboard:** `node scripts/keymap-optimizer/dashboard.js`
**Score per app:** `node scripts/keymap-optimizer/score_app_shortcuts.js`

The pipeline parses the CSV + apply script + workflow JSONs, resolves transparent fall-through for 14 layer contexts, builds a layer access graph, scores 490+ shortcuts across 13 apps against the layout, simulates 22 real-world workflows, detects cross-app conflicts, generates candidate keymaps, and produces a markdown baseline report.

### App keybinding corpus

`scripts/keymap-optimizer/app-keybindings/` — Each JSON file lists every known shortcut for one app, tagged with usage frequency (`constant`/`high`/`medium`/`low`/`rare`) and user weight (from real screen-time data).

| App | Weight | Shortcuts | Coverage |
|-----|--------|-----------|----------|
| Teams | 1.0 | 44 | 80% |
| Windows | 1.0 | 52 | 96% |
| Browser (Edge) | 0.95 | 64 | 75% |
| VS Code | 0.9 | 76 | 87% |
| M-Files Desktop | 0.85 | 37 | 97% |
| M-Files Admin | 0.85 | 17 | — |
| Outlook | 0.7 | 30 | 93% |
| Excel | 0.5 | 58 | 48% |
| Explorer | 0.45 | 31 | 74% |
| Terminal | 0.4 | 26 | 77% |
| Word | 0.3 | 29 | 86% |
| PowerPoint | 0.2 | 27 | 93% |
| Discord | 0.2 | 16 | 88% |

**NOT used (removed from scoring):** Notepad++, Slack, Figma, OneNote.

### Coach system

Browser app at `http://127.0.0.1:8765/apps/charybdis-coach/`. Start server: `python -m http.server 8765` from repo root.

Features built this session:
- **Workflow Guide panel** (sidebar) — per-app shortcut reference with Charybdis layer mappings
- **Learn overlay** — fullscreen guided training. App card grid → click app → step-by-step tour with layer access instructions, keyboard visualization, dangerous shortcut warnings
- **App-focused practice** — Quiz/Guided modes that work across ALL layers for a selected app
- **Key debug overlay** — toggleable live keydown/keyup log for diagnosing phantom shortcuts
- **Favicon** — inline SVG keyboard icon

### AHK fix

`scripts/windows/charybdis_helpers.ahk`: Fixed `A_PID` crash (replaced with `ProcessExist()`), wrapped `WriteCoachState` in try/catch to prevent abort dialogs on any uninitialized variable.

## Current firmware config

User manually changed (uncommitted in working tree):
- CPI: 600 → **400** (effective 200 with /2 scaler — 33% slower for fine control)
- Polling: 125Hz SW → **250Hz** (smoother curves at lower DPI)

These changes need a firmware build + flash to take effect. The layout (via ZMK Studio) is independent.

## What still needs work

### Blocking / high priority

1. **Coach learning guide parity** — Coach workflow JSONs have far fewer shortcuts than the corpus. Gaps: Teams (13 vs 44), Browser (30 vs 64), VS Code (40 vs 76), Windows (29 vs 52). Need a script that auto-generates coach JSON from corpus JSON with `charybdis` field populated from pipeline scoring.

2. **Auto-advance in Learn overlay** — The "Auto-advance" checkbox exists in HTML but the keydown matching logic isn't wired. Need to: listen for keydown in learn mode, parse the current step's key combo, match against the event, flash green, advance after 500ms.

3. **Shift+P = Print bug in Edge** — User reports Shift+P triggers Print (Ctrl+P) instead of capital P, only in Edge. Use the debug overlay to diagnose. Likely causes: Ctrl stuck from AHK/ZMK, Edge menu stealing focus, or AHK hotkey conflict. Add diagnostics.

4. **Undo/Redo adjacency on L2** — Redo at x11,y0 (far from Undo at x10,y3). User wants them next to each other. Swap Redo with something on y3 near Undo.

5. **Mouse layer x0 column** — Currently all transparent on L2 (modifier fall-through). User explicitly said x0 CAN be used. But Shift fall-through (shift-click) and Ctrl fall-through (ctrl-click) are genuinely useful on L2. Ask user: do they want x0 active or keep fall-through?

### Important

6. **Punctuation access documentation** — `?` = Shift+/ (L0 x11,y3). `-` = L1 x12,y3 (hold Nav). `+` = Shift+- on Norwegian or via number row. These vital keys need coach training and clear documentation.

7. **Windows language switching** — Win+Space and Alt+Shift for input language switching. Already in corpus but need coach lesson.

8. **Voice typing + Copilot** — Win+H (voice typing), Win+C (Copilot) added to corpus this session. Need coach lessons and workflow simulations.

9. **Excel coverage at 48%** — Lowest of any app. Layer 10 is still empty and could be a dedicated Excel layer. Or add Excel-specific shortcuts to L4 right half (but that's now full with cross-app shortcuts).

10. **apply_every_key.js header** — Comment block at top still says "v2.0". JSON version says "v2.3". Clean up.

### Nice to have

11. **Workflow guide auto-generator script** — Read corpus → generate coach JSON with `charybdis` mappings from pipeline data.
12. **Edge extension shortcuts** — Vimium (j/k/f/d/u), Proton Pass (Ctrl+Shift+L) could be documented.
13. **Baseline report improvements** — Per-layer ASCII art, per-app efficiency bars.
14. **CLAUDE.md already partially updated** by user (CPI 400, polling 250). Verify it's complete.

## Mistakes to avoid (learned this session)

1. **"x0 must be transparent" is NOT a rule.** It's a design choice. User corrected this explicitly. x0 and x12 are valid positions on all layers.
2. **"MB1-5 can never be on thumbs" is WRONG.** MB1/MB2 on thumbs is normal for trackball keyboards. The rule is: MB1-5 should ALSO be on finger rows (y2) on L2 for when thumb holds the layer.
3. **Don't leave easy-access layers empty.** L4 right half was 18 empty slots on a prime thumb-hold layer. User caught this — now filled with cross-app shortcuts and Teams meeting controls.
4. **Always update all 3 files together:** CSV + apply script + coach workflow JSONs. A change in one without the others creates drift that the sync validator catches.
5. **Momentary vs Toggle:** User prefers **momentary (hold)** for scroll and speed on the left side. Toggle is for the right-side scroll (extended scrolling) and for app layers (L5 Code, L9 M-Files) that need both hands free.
6. **PowerToys Command Palette, NOT PowerToys Run.** User considers Command Palette superior. All labels should say "CmdPal".

## Key files index

| File | Purpose | Notes |
|------|---------|-------|
| `CLAUDE.md` | Master project context | User edited CPI/polling manually. Read first after this handoff. |
| `layout/keybindings_explained.csv` | Layout source of truth | 617 lines (header + 616 keys). CSV with quoted fields. |
| `scripts/zmk-studio/apply_every_key.js` | ZMK Studio batch-apply payload | Paste into Studio DevTools console. 616 keys in JSON + applier code. |
| `apps/charybdis-coach/app.js` | Coach web app | ~1430 lines. Learn overlay, practice modes, key debug, workflow guide. |
| `apps/charybdis-coach/index.html` | Coach HTML | Learn overlay structure, debug overlay, favicon. |
| `apps/charybdis-coach/styles.css` | Coach CSS | ~1170 lines. Dark theme, layer colors, learn/debug overlays. |
| `apps/charybdis-coach/workflows/*.json` | Coach shortcut guides per app | 11 active apps (Figma/Slack/OneNote/Notepad++ removed from index). |
| `scripts/keymap-optimizer/run_pipeline.js` | Pipeline orchestrator | Runs all 10 modules in sequence. `--verbose` for details. |
| `scripts/keymap-optimizer/dashboard.js` | Visual summary | ASCII bar charts for coverage, workflows, sync status. |
| `scripts/keymap-optimizer/app-keybindings/` | App shortcut corpora | 13 JSON files. `index.json` has weights. |
| `scripts/keymap-optimizer/workflows/` | Workflow simulation definitions | 22 JSON files. Each defines steps with layer/key/effort. |
| `scripts/keymap-optimizer/score_app_shortcuts.js` | Shortcut scorer | Cross-references corpus against resolved layout. Standalone runnable. |
| `scripts/keymap-optimizer/generate_candidates.js` | Candidate generator | Proposes layout changes from gap analysis. |
| `scripts/keymap-optimizer/apply_candidates.js` | Candidate applier | Patches CSV + apply script from candidate definitions. |
| `scripts/keymap-optimizer/apply_l4_fill.js` | L4 power shortcut patcher | Applied 20 cross-app shortcuts to L4 right half. |
| `scripts/windows/charybdis_helpers.ahk` | AHK helper | Beacon listener, launcher, layer state. Fixed A_PID crash. |
| `scripts/simulate_ergonomics.js` | Legacy ergonomic simulator | Still works. Checks row priority, thumb conflicts, workflow sims. |
| `docs/KEYMAP_METHODOLOGY.md` | Design methodology for AI agents | Physical model, layer system, workflow simulation, common mistakes. |
| `config/boards/shields/charybdis/charybdis_right.conf` | Trackball firmware config | CPI, polling, scroll tick. User changed to CPI 400, polling 250 (uncommitted). |

## User profile

- Norwegian software professional, daily driver: Charybdis split + trackball
- Primary workflow: Teams meetings/chat, Edge browsing (with Vimium keyboard nav), VS Code coding, M-Files document management
- Uses Proton Pass for passwords, PowerToys Command Palette for launching
- Wants to use more: Windows voice typing (Win+H), Copilot (Win+C), language switching
- Prefers data-driven optimization — built the entire pipeline for this reason
- Values ergonomic row priority: y2 > y1/y3 > y0 for key placement
- Iterates quickly: change layout → run pipeline → check dashboard → test in coach → commit

## How to continue iterating

```bash
# 1. See current state
node scripts/keymap-optimizer/run_pipeline.js
node scripts/keymap-optimizer/dashboard.js

# 2. Find gaps
node scripts/keymap-optimizer/score_app_shortcuts.js  # per-app coverage
node scripts/keymap-optimizer/analyze_cross_app.js    # universal unmapped

# 3. Make changes (always update CSV + apply script together)
# Edit layout/keybindings_explained.csv
# Edit scripts/zmk-studio/apply_every_key.js (matching entries)
# Update apps/charybdis-coach/workflows/*.json if charybdis mappings changed

# 4. Verify
node scripts/keymap-optimizer/run_pipeline.js  # all 10 modules should pass

# 5. Test in coach
python -m http.server 8765  # from repo root
# Open http://127.0.0.1:8765/apps/charybdis-coach/

# 6. Commit and push
git add layout/ scripts/ apps/
git commit -m "description"
git push origin main
```

## Deep research report

The user has a Norwegian-language deep research report at `deep-research-report (1).md` (repo root, not committed) that proposes a formal optimization pipeline with: canonical data model, sync validation, transparency resolution, layer access graph, physical/reachability model, workflow simulation, multi-objective scoring, candidate generation with protected positions, and human-in-the-loop trial. The current pipeline implements milestones 1-5 of that report. The report's TypeScript type definitions and scoring weights are useful reference for extending the pipeline.
