# Session Handoff — 2026-06-24

## What was accomplished this session

### Layout changes (v2.0 → v2.3)
- **Layer 2 (Mouse):** Populated left hand (20 keys: MB1-5 on home row, clipboard, window mgmt, tab cycling). Both scroll keys changed to Momentary (hold). Speed (x11,y3) changed to Momentary.
- **Layer 3 (Window):** Filled y0 top row (10 Windows extras), filled right y1 (Lock/Settings/Run), replaced duplicate Win+Tab with Win+E, added Win+X Power menu.
- **Layer 4 (System):** Fixed F13-F24 duplicates → sequential. Filled right half with cross-app power shortcuts (Ctrl+S/N/P/O/R/W on home row, Ctrl+E/K/G/B/I/U on upper, Teams meeting controls on bottom: Mute/Camera/Share/Hand/Hangup/Accept).
- **Layer 5 (Code/IDE):** NEW — 44 VS Code shortcuts. Toggle from L1 x0,y1.
- **Layer 9 (M-Files/DMS):** NEW — 22 document management shortcuts. Toggle from L4 x2,y3.
- **PowerToys Run → PowerToys Command Palette** renamed everywhere.
- **L2 Speed** changed from toggle to momentary (hold for fast, release for precision).

### Optimization pipeline built
`scripts/keymap-optimizer/` — 10-module pipeline:
1. `parse_sources.js` — CSV + apply script + workflow JSONs → canonical JSON
2. `validate_sync.js` — detect drift between sources
3. `resolve_transparency.js` — materialize fall-through per layer context
4. `build_layer_graph.js` — layer entry/exit/thumb occupation
5. `physical_model.js` — ergonomic scoring per position
6. `simulate_workflows.js` — 22 JSON workflow simulations
7. `score_app_shortcuts.js` — cross-reference app corpus against layout
8. `analyze_cross_app.js` — universal shortcuts, conflicts
9. `generate_candidates.js` — propose layout improvements
10. `generate_report.js` — baseline markdown report

**Run:** `node scripts/keymap-optimizer/run_pipeline.js`
**Dashboard:** `node scripts/keymap-optimizer/dashboard.js`

### App keybinding corpus
`scripts/keymap-optimizer/app-keybindings/` — 13 apps, 490+ shortcuts weighted by real screen-time:
- Teams (1.0), Windows (1.0), Browser (0.95), VS Code (0.9), M-Files (0.85)
- Outlook (0.7), Excel (0.5), Explorer (0.45), Terminal (0.4)
- Word (0.3), PowerPoint (0.2), Discord (0.2), M-Files Admin (0.85)
- **Removed from scoring:** Notepad++, Slack, Figma, OneNote (user doesn't use)

### Coach improvements
- **Learn overlay:** Redesigned with app card grid, layer access instructions, dangerous shortcut warnings, auto-advance toggle
- **Workflow Guide:** Per-app shortcut reference panel
- **App-focused practice:** Quiz/guided modes that work across layers for a selected app
- **Key debug overlay:** Toggleable live keydown/keyup event log for diagnosing issues
- **Favicon:** Keyboard SVG icon

### AHK fix
- `A_PID` crash fixed → uses `ProcessExist()` instead
- Entire `WriteCoachState` wrapped in try/catch for robustness

## Current state (numbers)
- **Layout:** v2.3, 616 keys, 9 active layers (0-5, 7-9)
- **Coverage:** ~81% (490+ shortcuts mapped across 13 apps)
- **Workflows:** 22 simulations, all passing
- **Pipeline:** 10 modules, 0 errors

## What still needs work (next session priorities)

### High priority
1. **Coach learning guide parity** — The coach workflow JSONs have fewer shortcuts than the pipeline corpus. Need to expand Teams (13→44), Browser (30→64), VS Code (40→76), Windows (29→52+). Script idea: auto-generate coach workflow JSON from corpus JSON.
2. **Auto-advance detection in Learn overlay** — The checkbox exists but the keydown listener for matching the current shortcut isn't wired up yet. Need to match the displayed shortcut's key combo against keydown events and auto-advance.
3. **Shift+P = Print bug** — Use the debug overlay to investigate. Likely Edge-specific issue with Ctrl getting stuck or AHK emitting wrong modifier. May need AHK audit.
4. **Mouse layer x0 bindings** — User wants x0 column used on L2 (currently transparent for modifier fall-through). Consider: is fall-through more valuable than active bindings? Ask user.
5. **Undo/Redo adjacency on L2** — Redo is at x11,y0 (right top), Undo at x10,y3 (right bottom). User wants them adjacent. Consider swapping Redo to x11,y3 or x10,y3 area.

### Medium priority
6. **Punctuation coach lesson** — Add `?` (Shift+/), `-` (L1 x12,y3), `+` (Shift+-) to the Learn overlay as a dedicated "Punctuation & Symbols" lesson.
7. **Windows language switching coach** — Win+Space, Alt+Shift need dedicated training in the Learn overlay.
8. **Voice typing workflow** — Win+H for dictation, integrate with Copilot (Win+C) for AI-assisted text.
9. **Layer 10 still empty** — Could be used for Excel-specific shortcuts (lowest coverage at 48%).
10. **Expand Windows corpus further** — Currently 52 shortcuts, should be 80+ covering accessibility, Narrator, magnifier, virtual desktops, snap layouts, etc.

### Low priority / nice to have
11. **CLAUDE.md** needs updating for CPI 400 and v2.3 L4 power shortcuts (user already edited some of it manually).
12. **Workflow guide JSON auto-generator** — Script that reads `app-keybindings/*.json` corpus and generates matching `workflows/*.json` for the coach, with `charybdis` field populated from pipeline scoring.
13. **Baseline report improvements** — Add per-layer ASCII art, per-app efficiency bars, conflict details.
14. **Edge extension shortcuts** — Vimium, Proton Pass have their own shortcuts that could be documented.
15. **Verify apply_every_key.js header** — The header comment still says v2.0 but the JSON says v2.3. Clean up version references.

## Key files for next session

| File | What to know |
|------|-------------|
| `CLAUDE.md` | Project rules, layer map — user edited CPI to 400 and polling to 250 |
| `layout/keybindings_explained.csv` | Source of truth for all 616 keys |
| `scripts/zmk-studio/apply_every_key.js` | Studio payload — must stay in sync with CSV |
| `scripts/keymap-optimizer/run_pipeline.js` | Run full analysis pipeline |
| `scripts/keymap-optimizer/dashboard.js` | Quick visual summary |
| `scripts/keymap-optimizer/app-keybindings/index.json` | App corpus registry with weights |
| `scripts/keymap-optimizer/score_app_shortcuts.js` | Shortcut accessibility scorer |
| `apps/charybdis-coach/app.js` | Coach app (Learn overlay, practice, debug) |
| `docs/KEYMAP_METHODOLOGY.md` | AI agent handoff for keymap design process |
| `scripts/simulate_ergonomics.js` | Legacy ergonomic simulator (still works) |

## User preferences (from memory)

- **Teams is #1 app** (57% screen time) — optimize for it
- **Uses Vimium** in Edge for keyboard browser navigation
- **Uses Proton Pass** heavily for passwords
- **Prefers momentary (hold)** over toggle for scroll and speed
- **PowerToys Command Palette** (not PowerToys Run) — superior launcher
- **Wants voice typing** (Win+H) and Copilot (Win+C) integrated
- **Norwegian Windows layout** — æøå on base layer via US HID scancodes
- **3 monitors, 6720px horizontal** — speed/travel mode critical for cursor movement
- **x0 and x12 columns CAN be used** — not required to be transparent
- **MB1/MB2 on thumbs is fine** — standard for trackball keyboards
- **Don't leave easy-access layers empty** — fill with useful shortcuts

## How to continue iterating

1. Run `node scripts/keymap-optimizer/run_pipeline.js` to see current state
2. Run `node scripts/keymap-optimizer/dashboard.js` for quick summary
3. Check `node scripts/keymap-optimizer/score_app_shortcuts.js` for per-app gaps
4. Use `node scripts/keymap-optimizer/analyze_cross_app.js` for universal unmapped shortcuts
5. Make changes to CSV + apply script together (or use patcher scripts in `scripts/keymap-optimizer/`)
6. Re-run pipeline to verify
7. Commit and push
8. Test in coach at `http://127.0.0.1:8765/apps/charybdis-coach/`
