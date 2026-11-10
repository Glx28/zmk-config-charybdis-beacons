# Historical L2 direct workspace map (superseded)

This first direct-workspace layout was applied on personal Windows, then replaced by `L2-direct-workspaces-20261110`. Do not use its coordinates as the current layout. Its displaced shortcut list remains as a record of where the pre-workspace L2 actions were moved.

Version: `L2-direct-workspaces-20261109`

## Dedicated workspace outputs

| L2 position | HID | Workspace role | Personal profile | Work profile |
|---|---|---|---|---|
| x9,y0 | F13 | Full | Charybdis Personal - Full | M - MF - Cop |
| x10,y0 | F14 | Split | Charybdis Personal - Split | M - MF - Cop+JR |
| x11,y0 | F15 | Browser | di br te | M - Edge - Cop+JR |
| x12,y0 | F16 | Collaboration | di br te split | M - JR - SF+TM |
| x9,y1 | F17 | M-Files Admin | work-only | M - Adm - Cop+JR |
| x10,y1 | F18 | Excel + Teams | work-only | M - XL - Cop+TM |
| x11,y1 | F19 | M-Files + Teams | work-only | M - MF - Cop+TM |
| x12,y1 | F20 | Jira + Admin + MF windows | work-only | JR - Adm - MF+MF |

Editors remain at L2 x7,y0 and x8,y0. Existing layer access at x7,y3 and x8,y3 remains. L0/L1/L7 and Norwegian cluster unchanged. Personal-only profile aliases target existing saved workspace IDs; no workspace is launched during setup. Work IDs are host-local and must be wired by the work-PC agent using the alias table in `portable-charybdis/docs/workspace-keymap-20261110.json`.

## Displaced L2 application actions

L2 x7 y1 → L6 x7 y2: Ctrl+G — Go to vault (M-Files)
L2 x8 y1 → L6 x11 y0: Alt+Enter — Open properties / metadata card (M-Files)
L2 x12 y0 → L6 x12 y0: Ctrl+E — Check out (M-Files) / Search (Teams)
L2 x9 y1 → L6 x12 y1: Ctrl+N — New document/object (M-Files) / New chat (Teams)
L2 x10 y1 → L6 x12 y3: Ctrl+O — Open document/object (M-Files)
L2 x11 y1 → L6 x0 y1: Ctrl+Shift+D — Download copy (M-Files)
L2 x12 y1 → L6 x0 y2: Ctrl+Shift+C — Copy object link (M-Files)
L2 x7 y2 → L5 x0 y1: Ctrl+Shift+X — Expand compose box (Teams)
L2 x8 y2 → L5 x0 y2: Shift+Enter — Insert new line (Teams message)
L2 x9 y2 → L5 x1 y3: Ctrl+Enter — Send expanded message (Teams)
L2 x10 y2 → L5 x3 y3: Ctrl+Shift+M — Toggle microphone mute (Teams call)
L2 x11 y2 → L8 x0 y2: Ctrl+R — Reply (Outlook)
L2 x12 y2 → L8 x3 y0: Ctrl+Shift+R — Reply all (Outlook)
L2 x9 y3 → L4 x0 y1: Ctrl+PageUp — Previous worksheet (Excel)
L2 x10 y3 → L4 x1 y0: Ctrl+PageDown — Next worksheet (Excel)
L2 x11 y3 → L4 x1 y1: Ctrl+1 — Format Cells (Excel)
L2 x12 y3 → L4 x5 y1: Ctrl+H — Find and replace (Excel)

Applied and saved to the personal keyboard through the already-open connected Studio session. Verification: 37 changed coordinates, including transparent source slots, passed with 0 failures. Edge remains maximized. Work-PC aliases are documented in the portable repository’s 2026-11-10 handoff; work-host IDs remain local.
