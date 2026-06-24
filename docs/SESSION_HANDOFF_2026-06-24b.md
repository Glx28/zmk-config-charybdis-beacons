# Session Handoff — 2026-06-24 (session 2)

> **For the next AI agent:** Read this file FIRST, then `CLAUDE.md`, then `docs/KEYMAP_METHODOLOGY.md`, then `docs/SESSION_HANDOFF_2026-06-24.md` (prior session). Together they give you complete context.

## What was accomplished this session

### 1. Coach Parity Generator (Workstream 3 from prior handoff item #1 + #11)

**New file:** `scripts/keymap-optimizer/generate_coach_workflows.js`

Auto-generates all 13 coach workflow JSONs from the app-keybinding corpus + pipeline scores. Reads `build/app_shortcut_scores.json` for `charybdis` position strings (e.g., `"L4 (x8,y2)"`), strips optimizer-only fields, writes clean coach-format JSON to `apps/charybdis-coach/workflows/`.

**Before → After shortcut counts:**
| App | Before | After | Mapped |
|-----|--------|-------|--------|
| Teams | 13 | 44 | 35 |
| Browser | 30 | 64 | 49 |
| VS Code | 40 | 76 | 66 |
| Windows | 29 | 52 | 48 |
| Excel | — | 58 | 29 |
| All 13 apps | ~200 | 507 | 415 |

**New apps added to coach:** Discord, M-Files Admin (were missing from workflow index).

**Run:** `node scripts/keymap-optimizer/generate_coach_workflows.js` (requires pipeline to have run first for `build/app_shortcut_scores.json`).

### 2. Learn Overlay Auto-Advance (prior handoff item #2)

**File:** `apps/charybdis-coach/app.js` (lines 1269-1273)

Wired the existing "Auto-advance" checkbox (`#learnAutoAdvance`). When checked during a Learn tour, pressing the correct physical key (matched via `keyId()` comparing `layer:x:y`) auto-advances to the next step after 500ms. Reuses existing `resolveActiveKeyPress()` and `flashPhysicalKey()` infrastructure from the Drill practice mode.

### 3. L2 Layout Improvements (prior handoff items #4 + #5)

**Redo/Undo adjacency (item #4):** Swapped Redo (was x11,y0) with duplicate SelAll (was x9,y3) on Layer 2. Right-hand y3 row is now: Copy(x7)-Paste(x8)-**Redo**(x9)-Undo(x10)-Speed(x11)-Close(x12). SelAll moved to x11,y0 (still at x5,y3 on left hand).

**L2 x0 column (item #5):** Added 4 mouse-complementary shortcuts replacing transparent fall-through:
| Position | Shortcut | Label |
|----------|----------|-------|
| x0,y0 | Win+Shift+S | Snip |
| x0,y1 | Ctrl+= | Zoom In |
| x0,y2 | Ctrl+- | Zoom Out |
| x0,y3 | F5 | Refresh |

**Files updated (both):** `layout/keybindings_explained.csv` + `scripts/zmk-studio/apply_every_key.js`

## Current pipeline state

```
Pipeline: 10/10 passed, 0 failed
Warnings: 1 (9 pre-existing CSV↔Apply sync mismatches — BT profile params + L3 modifier formats)
Coverage: 82% overall (415/507 mapped)
Workflows: 25/25 passing, 415/415 workflow refs valid
Layout: 616 keys, 11 layers, 9 active
```

## Layout version

Now effectively **v2.5** (L2 x0 populated, Redo/Undo swapped). The `apply_every_key.js` header still says v2.0/v2.3 — needs cleanup (carried over from prior session, item #10).

## What still needs work

### From prior session (remaining items)

3. **Shift+P = Print bug in Edge** — User reports Shift+P triggers Print (Ctrl+P) instead of capital P, only in Edge. Use the debug overlay to diagnose. Likely causes: Ctrl stuck from AHK/ZMK, Edge menu stealing focus, or AHK hotkey conflict.

6. **Punctuation access documentation** — `?` = Shift+/ (L0 x11,y3). `-` = L1 x12,y3. `+` = Shift+- on Norwegian. Need coach training and documentation.

7. **Windows language switching** — Win+Space and Alt+Shift in corpus but need coach lesson.

8. **Voice typing + Copilot** — Win+H, Win+C in corpus but need coach lessons and workflow simulations.

9. **Excel coverage at 50%** — Lowest of any app (29/58). Layer 10 is still empty and could be a dedicated Excel layer.

10. **apply_every_key.js header** — Comment block still says "v2.0". JSON version says "v2.3". Should be v2.5 now.

12. **Edge extension shortcuts** — Vimium (j/k/f/d/u), Proton Pass (Ctrl+Shift+L) could be documented.

13. **Baseline report improvements** — Per-layer ASCII art, per-app efficiency bars.

### New items from this session

15. **9 pre-existing sync mismatches** — BT profile parameters (CSV says "0"/"1"/"2"/"3"/"4", apply says "BT_SEL 0"/"BT_SEL 1"/etc.) and L3 modifier/parameter format differences. Non-blocking but should be cleaned up for full sync validation.

16. **Coach parity re-run after layout changes** — After any CSV/apply script layout change, re-run `node scripts/keymap-optimizer/generate_coach_workflows.js` to keep coach workflows in sync. Consider adding this as a pipeline post-step or documenting in the iteration workflow.

17. **L2 x0 modifier fall-through trade-off** — By adding Snip/Zoom/Refresh to x0, Shift/Ctrl/Alt no longer fall through on those positions when on L2. If user misses shift-click or ctrl-click on x0, they can still use x1-x5 home row keys (MB1-5 are on y2, modifiers are on other rows). Monitor for usability issues.

## Commit

`452b74e feat: coach parity generator, learn auto-advance, L2 layout improvements`

## Key files changed this session

| File | Change |
|------|--------|
| `scripts/keymap-optimizer/generate_coach_workflows.js` | **NEW** — coach workflow generator from corpus + scores |
| `apps/charybdis-coach/app.js` | Auto-advance wired in keydown listener (lines 1269-1273) |
| `apps/charybdis-coach/workflows/*.json` | All 13 regenerated with full corpus parity |
| `apps/charybdis-coach/workflows/discord.json` | **NEW** — 16 shortcuts |
| `apps/charybdis-coach/workflows/mfiles_admin.json` | **NEW** — 17 shortcuts |
| `apps/charybdis-coach/workflows/index.json` | Updated to v2.0 with all 13 apps |
| `layout/keybindings_explained.csv` | L2 Redo↔SelAll swap + x0 column (6 entries) |
| `scripts/zmk-studio/apply_every_key.js` | Matching L2 changes (6 entries) |
