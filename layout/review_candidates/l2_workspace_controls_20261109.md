# L2 workspace controls review candidate

Status: review only; not applied to ZMK Studio or keyboard.

- Source layout SHA-256: `cf296f918cbb16bab476a347e32567696aa5fe48b715a0db1dc64d6e1fb5a1f7`
- Coach candidate SHA-256: `d603fc59a4e3daf4ac7fa07a57f56f384ea6f323c8ec222999efdc6fb522c53f`
- Copied ZMK candidate SHA-256: `d603fc59a4e3daf4ac7fa07a57f56f384ea6f323c8ec222999efdc6fb522c53f`
- Semantic binding changes: 43 of 616 positions.
- L1 and frozen L7 are unchanged.
- Apply script includes only the 43 changed positions.
- Verify script checks the full 616-position candidate.
- Existing Studio apply template prompts before editing and never clicks Save.

L2 right side: x7,y0 Workspaces editor (Win+Ctrl+Ø); x8,y0 FancyZones editor (Win+Shift+Ø); x9,y0 full-screen workspace (F13); x10,y0 split workspace (F14); x11,y0 spare. Norwegian cluster remains on L2, including backslash at x0,y2.

The CSV used for both Coach and ZMK review is byte-identical. Studio's live mapping was unavailable during preparation, so it must be audited before applying.
