# Charybdis Optimization Project - Living State
**Last Updated:** 2026-06-23 (by Grok agent)
**Current Profile:** P3 (CPI=150, Snipe/Travel=1000 on Layer 8)
**Beacon Completion:** ~85% (macros + include present and verified in firmware keymap; wiring + Studio apply + end-to-end verification in progress)
**Automation (2026-06-23):** auto_flash_watcher.ps1 (bootloader drive detect + safe right flash), push_firmware_build.ps1 ready. Firmware review performed (dup CONFIG_SPI removed from right.conf). apply_every_key.js hardened for accuracy (critical no-skip for scroll/coach, new L1 scroll toggle entry support, verify enforcement).
**Layout Version:** v1.9 (616 bindings, 11 layers, source: layout/keybindings_explained.csv; applied via ZMK Studio)
**Hardware:** Charybdis split, right PMW3610 trackball, nice!nano v2 x2, BLE primary, Windows 3x 6720px, pointer precision OFF, sens 20/20

## Historical Trackball Profiles (from prompt + workspace results)
| Profile | CPI | Snipe CPI | A2 Hit Rate (TINY) | Path Follow          | Status     | Date       |
|---------|-----|-----------|--------------------|----------------------|------------|------------|
| P0      | 600 | 1600      | 20% (MEDIUM)       | 0%, stage 1/5        | FAILURE    | ~2026-06-19/20 |
| P1      | 300 | 1600      | 50-62% (MEDIUM)    | stage 2/5 (last run) | Better     | 2026-06-22 |
| P2      | 200 | 400       | ~75% (TINY)        | stage 2/5 consistent | Better     | -          |
| P3      | 150 | 1000      | ?? (PENDING FULL RUN) | ?? (PENDING)      | CURRENT    | 2026-06-23 (conf set) |

**P3 Workspace Confirmed:** zmk-config-charybdis-beacons/config/boards/shields/charybdis/charybdis_right.conf + overlay (scroll-layers=<6>, snipe-layers=<8>)

**Key Current Config (right.conf):**
- CONFIG_PMW3610_CPI=150
- CONFIG_PMW3610_SNIPE_CPI=1000
- POLLING_RATE_125_SW=y
- SMART_ALGORITHM=y
- SCROLL_TICK=70
- INVERT_X=y , ORIENTATION_90=y
- XY Scaler (keymap): 2:1 global

## Beacon Status
- Macros defined: firmware/coach_beacon_macros.keymap.dtsi + synced copy in zmk-config
- Include: present in zmk-config-charybdis-beacons/config/charybdis.keymap:36
- Host: FULL (AHK hotkeys ^!+F13.. , ^!#F13.., state writer, coach polling 500ms)
- Firmware wiring: Partial (include + defs done; source keymap layer examples use some plain to; Studio bindings pending update)
- Verification: Synthetic beacon test passed historically. Full BLE layer change test pending real wiring.

## Open Hypotheses / Next (Protocol: ONE var)
- After P3 full benchmark data: test CPI reduction or input-processor per-mode scaling (L8 travel override).
- Travel mode (L8) + snipe CPI combo + possible  input processor adjustment.
- Goal: tiny target >80% reliable + path follow stage 4+/5 usable for 6720px.

## Layout / Workflow
- Coach app + AHK helpers active.
- F13-F15 = æøå , F16-F24 = app triggers.
- Layer map exact as prompt.
- Deployment: ZMK Studio only for bindings. Firmware flash for macros/CPI.

## Tooling / Automation Status
- Benchmark scripts: basic + v2 exist (need hardening for structured + TUNING_LOG + snapshot).
- verify_setup.ps1: skeleton exists.
- ZMK Studio scripts: apply_every_key, verify etc. from CSV.
- add_beacon_macros.ps1: needs path update to current repo structure.

## Next Immediate (Highest Value)
1. Obtain full P3 benchmark numbers (run enhanced benchmark if possible).
2. Wire coach behaviors in firmware keymap examples.
3. Update beacon helper script + docs.
4. Enhance benchmark runner for protocol compliance.
5. Update living state after every step.

**Rollback references:** charybdis_right_trackball_ROLLBACK_CPI400_SNIPE200.uf2 and BACKUP_BEFORE_BEACONS files exist.

**Agent Note:** All actions follow Trackball Protocol (one var, full bench, backup) and Layout/Beacon Protocol (doc changes, verify coach receipt).
