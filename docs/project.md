# Project Goals And Lessons

## Use Case

This keyboard is built as a daily work keyboard and trackball mouse replacement for:

- coding and consulting work
- VS Code
- Excel
- Outlook
- Teams
- Edge and Vimium-style browser use
- M-Files
- Proton Pass
- English primary typing
- Norwegian characters when needed
- Chinese Pinyin and Japanese IME helpers
- rare French input
- multi-monitor and KVM-style Windows workflows
- future portability to Mac where practical

## Design Goals

- Keep base typing familiar and US-coding friendly.
- Put navigation, editing, and mouse actions on thumb-reachable layers.
- Keep the right-side trackball usable as the primary pointer.
- Make long pointer travel available without ruining fine pointer control.
- Keep Bluetooth, output, Studio unlock, reset, and bootloader reachable but clearly treated as maintenance controls.
- Avoid relying on hidden assumptions: every keybinding should be inspectable or verifiable through ZMK Studio, and every firmware-level behavior should be documented separately.

## Final Plan

The final layout is `final-v1.8-operational-pointer-travel`.

It combines:

- Base QWERTY typing on Layer 0.
- Navigation, editing, function keys, and trackball scroll on Layer 1.
- Mouse buttons and mouse lock on Layer 2.
- Window, app, language, pointer-travel, and game-entry controls on Layer 3.
- Bluetooth, output, Studio/system, and F13-F24 helpers on Layer 4.
- Reserved transparent layers on Layers 5, 6, 9, and 10.
- RPG/game controls on Layer 7.
- Pointer-travel exit controls on Layer 8.
- Firmware-level PMW3610 tuning for pointer speed, scroll, and Layer 8 high-speed travel.

## What We Learned

- The right half is the main/central side for this keyboard.
- The left half pairs to the right half, not directly to the PC for normal split operation.
- ZMK Studio edits live keybindings, but it does not expose every firmware behavior.
- Trackball scroll and CPI behavior are firmware-level; they live in the seller config/overlay files.
- Full firmware/settings reset can break existing Bluetooth bonds. After reset, both halves may need fresh settings/firmware alignment.
- Keep `settings_reset.uf2` available; it is the cleanest way to clear stale ZMK settings when bonding gets confused.
- If a side does not appear over USB as expected, do not assume keymap problems first. Confirm bootloader/device state separately from ZMK Studio state.
- The final reliable recovery set is: right firmware, left firmware, settings reset, and hashes.
- ZMK Studio verification should inspect every visible layer and every visible key before saving.
- Generated verification reports are useful during debugging but should not live in the repo.
- Large Zephyr/ZMK build folders should not be committed. Keep the small vendor config and driver source; regenerate dependencies when building.

## Repository Policy

- Keep canonical source and final artifacts.
- Do not keep raw console logs, browser captures, failed probes, or one-off generated reports.
- Do not repeat the 616-key layout in prose; keep it in machine-readable CSV/JSON and the explained CSV.
- Prefer small docs with clear ownership:
  - project intent and lessons
  - layout guide
  - operation workflow
  - firmware and recovery
  - sources
