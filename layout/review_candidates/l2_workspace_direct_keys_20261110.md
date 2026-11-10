# L2 workspace keys — corrected placement and labels

Version: `L2-direct-workspaces-20261110`

## Shared workspace controls

| L2 position | Coach label | HID sent to Windows | Personal workspace | Work workspace |
|---|---|---|---|---|
| x7,y2 | 🔁 Full | F13 | Charybdis Personal - Full | M - MF - Cop |
| x8,y2 | 🔁 Split | F14 | Charybdis Personal - Split | M - MF - Cop+JR |
| x9,y2 | 🔁 Browser | F15 | Charybdis Personal - Browser | M - Edge - Cop+JR |
| x10,y2 | 🔁 Collab | F16 | Discord collaboration | M - JR - SF+TM |
| x11,y2 | 💼 Admin | F17 | Work-only | M - Adm - Cop+JR |
| x12,y2 | 💼 Excel | F18 | Work-only | M - XL - Cop+TM |

Fill the easy L2 y2 row first. Shared actions occupy x7–x10,y2; work-only actions continue at x11–x12,y2. The remaining work-only actions use x7–x8,y1. This keeps mutual workspaces closest and avoids leaving y2 empty while placing actions on y0.

| L2 position | Coach label | HID | Work workspace |
|---|---|---|---|
| x7,y1 | 💼 M-Files | F19 | M-Files + Teams |
| x8,y1 | 💼 Jira+MF | F20 | Jira + Admin + M-Files |

Coach now names the action. F13–F20 remain only the internal HID transport keys that AHK receives.

## Root cause found in personal workspace map

F15 pointed to `di br te`, whose actual saved apps were Discord, Edge, and Terminal. F16 pointed to `di br te split`, whose apps were Edge, Terminal, and Discord. Neither was the intended browser/web-app workspace. The saved `temp, brave and chatgpt, with webapp` profile includes the intended Brave YouTube and ChatGPT web apps mixed with stale duplicate Edge/ChatGPT windows, PowerShell, and PowerToys Settings. This mismatch explains why a workspace key could start PowerToys but fail to produce the expected app arrangement.

The corrected personal Browser profile must contain only the Brave YouTube app and ChatGPT Edge web app, preserving their saved central-monitor positions. Keep the existing left Edge/Coach window and right Terminal context out of that workspace. Full/Split links retain their saved profiles; collaboration continues to use the existing Discord profile. Work-host IDs remain local to that PC and are documented in `portable-charybdis/docs/workspace-keymap-20261110.json`.

## Other changes

Editors remain at L2 x7,y0 and x8,y0. Dynamic layer access and Norwegian symbols stay in place. L0/L1/L7 unchanged. Existing L2 application actions move to lower non-thumb positions as listed in `l2_workspace_direct_keys_20261109.md`.

This candidate changes only the new workspace block and labels beyond the previous direct-workspace layout. Its apply script is separate from the prior saved version. Studio application/save status must be confirmed separately.
