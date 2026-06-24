/*
Canonical Charybdis v2.0 ZMK Studio EVERY-KEY reapply payload.
v2.0: Layer 2 both-hands mouse QoL — right-hand shortcuts + left-hand mouse buttons on home row y2, clipboard, window mgmt.

Usage:
1. Open https://zmk.studio/ and connect the keyboard.
2. Open DevTools > Console.
3. Paste this entire file.
4. Confirm the prompt. It reapplies every visible key from the final v1.8 expected map.
5. Run scripts/zmk-studio/verify_every_key.js afterwards.
6. This script never clicks Save. Save manually only after verification passes.

This is not the surgical 46-key overlay. It contains all 616 visible keys from the verifier contract.

Norwegian Windows (L0): coach labels ø/æ/å at 11,2 / 12,2 / 12,1 use US HID scancodes
(SemiColon / Apostrophe / Left Brace); 12,3 is Backslash and Pipe. Windows NO renders glyphs.
Exit-to-base: coach_base on L1 5,4, L2 5/7/8 y4, L7 3/5/7/8 y4; coach_travel_off on L8 7/8 y4.

Studio coach behaviors available in current firmware (2026-06-23):
  coach_l1_hold, coach_l2_hold, coach_l3_hold, coach_l4_hold,
  coach_mouse_lock, coach_game_lock, coach_base, coach_recover_base,
  coach_travel_toggle, coach_travel_off
NOT yet in Studio until next firmware flash:
  coach_scroll_toggle  → apply uses Toggle Layer 6 instead.
Speed uses coach_travel_toggle (tap latch); fallback in Studio is Toggle Layer 8.
*/

window.CHARYBDIS_FINAL_LAYOUT = {
  "project": "Charybdis Ultimate Keyboard Experience",
  "version": "v2.3-l4-power-shortcuts",
  "device": "V&Z-Charydbis",
  "policy": "Full ZMK Studio reapply. v2.2. Right hand: Row 0 window mgmt (Task View, Desktop, tab cycling, Redo, Del), Row 1 core actions (Alt+Tab, Enter, Esc, BkSp, Win, Close), Row 2 mouse buttons (MB4-MB1-MB2-MB3-MB5-Scroll), Row 3 clipboard (Copy, Paste, Sel All, Undo, Speed, Close Win). Left hand: Row 0 window mgmt (Task View, Desktop, Next/Prev Tab, Scroll), Row 1 core actions (Alt+Tab, Esc, Enter, BkSp, Close), Row 2 mouse buttons (MB1-MB2-MB3-MB4-MB5 on home row), Row 3 clipboard (Undo, Cut, Copy, Paste, Sel All). x0 columns stay transparent for modifier fall-through (Esc/Tab/Shift/Ctrl). Exits unchanged. v2.2 adds Code/IDE layer (L5, 44 shortcuts), M-Files/DMS layer (L9, 22 shortcuts), and fills L3 y0 with window extras.",
  "generatedFrom": "scripts/zmk-studio/verify_every_key.js EXPECTED_CSV",
  "keyCount": 616,
  "keys": [
    {
      "layer": 0,
      "x": 0,
      "y": 0,
      "behavior": "Key Press",
      "label": "Esc",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Escape"
    },
    {
      "layer": 0,
      "x": 1,
      "y": 0,
      "behavior": "Key Press",
      "label": "1",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 1 and Bang"
    },
    {
      "layer": 0,
      "x": 2,
      "y": 0,
      "behavior": "Key Press",
      "label": "2",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 2 and At"
    },
    {
      "layer": 0,
      "x": 3,
      "y": 0,
      "behavior": "Key Press",
      "label": "3",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 3 and Hash"
    },
    {
      "layer": 0,
      "x": 4,
      "y": 0,
      "behavior": "Key Press",
      "label": "4",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 4 and Dollar"
    },
    {
      "layer": 0,
      "x": 5,
      "y": 0,
      "behavior": "Key Press",
      "label": "5",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 5 and Percent"
    },
    {
      "layer": 0,
      "x": 7,
      "y": 0,
      "behavior": "Key Press",
      "label": "6",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 6 and Caret"
    },
    {
      "layer": 0,
      "x": 8,
      "y": 0,
      "behavior": "Key Press",
      "label": "7",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 7 and Ampersand"
    },
    {
      "layer": 0,
      "x": 9,
      "y": 0,
      "behavior": "Key Press",
      "label": "8",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 8 and Star"
    },
    {
      "layer": 0,
      "x": 10,
      "y": 0,
      "behavior": "Key Press",
      "label": "9",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 9 and Left Bracket"
    },
    {
      "layer": 0,
      "x": 11,
      "y": 0,
      "behavior": "Key Press",
      "label": "0",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 0 and Right Bracket"
    },
    {
      "layer": 0,
      "x": 12,
      "y": 0,
      "behavior": "Key Press",
      "label": "BkSp",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Delete"
    },
    {
      "layer": 0,
      "x": 0,
      "y": 1,
      "behavior": "Key Press",
      "label": "Tab",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Tab"
    },
    {
      "layer": 0,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "label": "Q",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Q"
    },
    {
      "layer": 0,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "label": "W",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard W"
    },
    {
      "layer": 0,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "label": "E",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard E"
    },
    {
      "layer": 0,
      "x": 4,
      "y": 1,
      "behavior": "Key Press",
      "label": "R",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard R"
    },
    {
      "layer": 0,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "label": "T",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard T"
    },
    {
      "layer": 0,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "label": "Y",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Y"
    },
    {
      "layer": 0,
      "x": 8,
      "y": 1,
      "behavior": "Key Press",
      "label": "U",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard U"
    },
    {
      "layer": 0,
      "x": 9,
      "y": 1,
      "behavior": "Key Press",
      "label": "I",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard I"
    },
    {
      "layer": 0,
      "x": 10,
      "y": 1,
      "behavior": "Key Press",
      "label": "O",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard O"
    },
    {
      "layer": 0,
      "x": 11,
      "y": 1,
      "behavior": "Key Press",
      "label": "P",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard P"
    },
    {
      "layer": 0,
      "x": 12,
      "y": 1,
      "behavior": "Key Press",
      "label": "å",
      "rationale": "Norwegian å. Sends the [ scancode (Studio name 'Keyboard Left Brace', same key as Layer 1 x9 y3) = å on Norwegian Windows.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard Left Brace"
    },
    {
      "layer": 0,
      "x": 0,
      "y": 2,
      "behavior": "Key Press",
      "label": "Shft",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftShift"
    },
    {
      "layer": 0,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "label": "A",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard A"
    },
    {
      "layer": 0,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "label": "S",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard S"
    },
    {
      "layer": 0,
      "x": 3,
      "y": 2,
      "behavior": "Key Press",
      "label": "D",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard D"
    },
    {
      "layer": 0,
      "x": 4,
      "y": 2,
      "behavior": "Key Press",
      "label": "F",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F"
    },
    {
      "layer": 0,
      "x": 5,
      "y": 2,
      "behavior": "Key Press",
      "label": "G",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard G"
    },
    {
      "layer": 0,
      "x": 7,
      "y": 2,
      "behavior": "Key Press",
      "label": "H",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard H"
    },
    {
      "layer": 0,
      "x": 8,
      "y": 2,
      "behavior": "Key Press",
      "label": "J",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard J"
    },
    {
      "layer": 0,
      "x": 9,
      "y": 2,
      "behavior": "Key Press",
      "label": "K",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard K"
    },
    {
      "layer": 0,
      "x": 10,
      "y": 2,
      "behavior": "Key Press",
      "label": "L",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard L"
    },
    {
      "layer": 0,
      "x": 11,
      "y": 2,
      "behavior": "Key Press",
      "label": "ø",
      "rationale": "Norwegian ø. SemiColon scancode unchanged; Windows Norwegian layout renders it as ø.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard SemiColon and Colon"
    },
    {
      "layer": 0,
      "x": 12,
      "y": 2,
      "behavior": "Key Press",
      "label": "æ",
      "rationale": "Norwegian æ. Apostrophe scancode unchanged; Windows Norwegian layout renders it as æ.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard Left Apos and Double"
    },
    {
      "layer": 0,
      "x": 0,
      "y": 3,
      "behavior": "Key Press",
      "label": "Ctrl",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftControl"
    },
    {
      "layer": 0,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "label": "Z",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Z"
    },
    {
      "layer": 0,
      "x": 2,
      "y": 3,
      "behavior": "Key Press",
      "label": "X",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard X"
    },
    {
      "layer": 0,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "label": "C",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard C"
    },
    {
      "layer": 0,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "label": "V",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard V"
    },
    {
      "layer": 0,
      "x": 5,
      "y": 3,
      "behavior": "Key Press",
      "label": "B",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard B"
    },
    {
      "layer": 0,
      "x": 7,
      "y": 3,
      "behavior": "Key Press",
      "label": "N",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard N"
    },
    {
      "layer": 0,
      "x": 8,
      "y": 3,
      "behavior": "Key Press",
      "label": "M",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard M"
    },
    {
      "layer": 0,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "label": ",",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Comma and LessThan"
    },
    {
      "layer": 0,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "label": ".",
      "rationale": "v1.9: Period must be on base layer for typing flow. Moves [ to Layer 1.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard Period and GreaterThan"
    },
    {
      "layer": 0,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "label": "/",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard ForwardSlash and QuestionMark"
    },
    {
      "layer": 0,
      "x": 12,
      "y": 3,
      "behavior": "Key Press",
      "label": "\\",
      "rationale": "International English backslash (moved from x12 y1; å now on x12 y1 for Norwegian Windows).",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard Backslash and Pipe"
    },
    {
      "layer": 0,
      "x": 3,
      "y": 4,
      "behavior": "coach_l1_hold",
      "label": "Nav",
      "rationale": "Coach beacon: momentary layer 1 with BLE layer-state broadcast.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 0,
      "x": 4,
      "y": 4,
      "behavior": "Key Press",
      "label": "␣",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Spacebar"
    },
    {
      "layer": 0,
      "x": 5,
      "y": 4,
      "behavior": "Key Press",
      "label": "Alt",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftAlt",
      "modifiers": [
        "L Alt"
      ]
    },
    {
      "layer": 0,
      "x": 7,
      "y": 4,
      "behavior": "coach_l4_hold",
      "label": "System",
      "rationale": "Coach beacon: momentary layer 4 with BLE layer-state broadcast.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 0,
      "x": 8,
      "y": 4,
      "behavior": "coach_l3_hold",
      "label": "Window",
      "rationale": "Coach beacon: momentary layer 3 with BLE layer-state broadcast.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 0,
      "x": 4,
      "y": 5,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB1"
    },
    {
      "layer": 0,
      "x": 5,
      "y": 5,
      "behavior": "coach_l2_hold",
      "label": "Mouse",
      "rationale": "Coach beacon: momentary layer 2 with BLE layer-state broadcast.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 0,
      "x": 7,
      "y": 5,
      "behavior": "Key Press",
      "label": "Ret",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Return Enter"
    },
    {
      "layer": 1,
      "x": 0,
      "y": 0,
      "behavior": "Key Press",
      "label": "F1",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F1"
    },
    {
      "layer": 1,
      "x": 1,
      "y": 0,
      "behavior": "Key Press",
      "label": "F2",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F2"
    },
    {
      "layer": 1,
      "x": 2,
      "y": 0,
      "behavior": "Key Press",
      "label": "F3",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F3"
    },
    {
      "layer": 1,
      "x": 3,
      "y": 0,
      "behavior": "Key Press",
      "label": "F4",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F4"
    },
    {
      "layer": 1,
      "x": 4,
      "y": 0,
      "behavior": "Key Press",
      "label": "F5",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F5"
    },
    {
      "layer": 1,
      "x": 5,
      "y": 0,
      "behavior": "Key Press",
      "label": "F6",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F6"
    },
    {
      "layer": 1,
      "x": 7,
      "y": 0,
      "behavior": "Key Press",
      "label": "F7",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F7"
    },
    {
      "layer": 1,
      "x": 8,
      "y": 0,
      "behavior": "Key Press",
      "label": "F8",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F8"
    },
    {
      "layer": 1,
      "x": 9,
      "y": 0,
      "behavior": "Key Press",
      "label": "F9",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F9"
    },
    {
      "layer": 1,
      "x": 10,
      "y": 0,
      "behavior": "Key Press",
      "label": "F10",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F10"
    },
    {
      "layer": 1,
      "x": 11,
      "y": 0,
      "behavior": "Key Press",
      "label": "F11",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F11"
    },
    {
      "layer": 1,
      "x": 12,
      "y": 0,
      "behavior": "Key Press",
      "label": "F12",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F12"
    },
    {
      "layer": 1,
      "x": 0,
      "y": 1,
      "behavior": "Toggle Layer",
      "label": "Code",
      "rationale": "v2.2: Toggle Code/IDE layer. Game lock still on L3 x12,y2.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "5",
      "full_reapply_v22": true
    },
    {
      "layer": 1,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "label": "F5",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F5"
    },
    {
      "layer": 1,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "label": "F6",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F6"
    },
    {
      "layer": 1,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "label": "F7",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F7"
    },
    {
      "layer": 1,
      "x": 4,
      "y": 1,
      "behavior": "Key Press",
      "label": "F8",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F8"
    },
    {
      "layer": 1,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "label": "F",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 1,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "label": "←",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftArrow",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 1,
      "x": 8,
      "y": 1,
      "behavior": "Key Press",
      "label": "Home",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Home"
    },
    {
      "layer": 1,
      "x": 9,
      "y": 1,
      "behavior": "Key Press",
      "label": "9 PU",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keypad 9 and PageUp"
    },
    {
      "layer": 1,
      "x": 10,
      "y": 1,
      "behavior": "Key Press",
      "label": "3 PD",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keypad 3 and PageDn"
    },
    {
      "layer": 1,
      "x": 11,
      "y": 1,
      "behavior": "Key Press",
      "label": "End",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard End"
    },
    {
      "layer": 1,
      "x": 12,
      "y": 1,
      "behavior": "Key Press",
      "label": "BkSp",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Delete"
    },
    {
      "layer": 1,
      "x": 0,
      "y": 2,
      "behavior": "Key Press",
      "label": "Shft",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftShift"
    },
    {
      "layer": 1,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "S",
      "modifiers": [
        "L GUI"
      ],
      "label": "Search",
      "rationale": "v1.9: Left-hand Win+S Windows Search: hold Nav thumb + tap A position.",
      "apply_batch": true,
      "full_reapply_v19": true
    },
    {
      "layer": 1,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "Space",
      "modifiers": [
        "L Alt"
      ],
      "label": "CmdPal",
      "rationale": "v1.9: Left-hand Alt+Space PowerToys Command Palette: hold Nav thumb + tap S position.",
      "apply_batch": true,
      "full_reapply_v19": true
    },
    {
      "layer": 1,
      "x": 3,
      "y": 2,
      "behavior": "Momentary Layer",
      "label": "Scroll",
      "rationale": "Left-hand scroll hold (Layer 6). Hold to scroll, release to stop.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "6"
    },
    {
      "layer": 1,
      "x": 4,
      "y": 2,
      "behavior": "coach_travel_toggle",
      "label": "Speed",
      "rationale": "Left-hand speed toggle: hold Nav, tap Speed, release Nav — travel stays on, thumb free.",
      "apply_batch": true,
      "full_reapply_v20": true
    },
    {
      "layer": 1,
      "x": 5,
      "y": 2,
      "behavior": "Key Press",
      "label": "Delete",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Delete",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 1,
      "x": 7,
      "y": 2,
      "behavior": "Key Press",
      "label": "←",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftArrow"
    },
    {
      "layer": 1,
      "x": 8,
      "y": 2,
      "behavior": "Key Press",
      "label": "↓",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard DownArrow"
    },
    {
      "layer": 1,
      "x": 9,
      "y": 2,
      "behavior": "Key Press",
      "label": "↑",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard UpArrow"
    },
    {
      "layer": 1,
      "x": 10,
      "y": 2,
      "behavior": "Key Press",
      "label": "→",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard RightArrow"
    },
    {
      "layer": 1,
      "x": 11,
      "y": 2,
      "behavior": "Key Press",
      "label": "→",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard RightArrow",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 1,
      "x": 12,
      "y": 2,
      "behavior": "Key Press",
      "label": "BkSp",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Delete"
    },
    {
      "layer": 1,
      "x": 0,
      "y": 3,
      "behavior": "Key Press",
      "label": "Ctrl",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftControl"
    },
    {
      "layer": 1,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "label": "F9",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F9"
    },
    {
      "layer": 1,
      "x": 2,
      "y": 3,
      "behavior": "Key Press",
      "label": "F10",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F10"
    },
    {
      "layer": 1,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "label": "F11",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F11"
    },
    {
      "layer": 1,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "label": "F12",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F12"
    },
    {
      "layer": 1,
      "x": 5,
      "y": 3,
      "behavior": "Key Press",
      "label": "H",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard H",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 1,
      "x": 7,
      "y": 3,
      "behavior": "Key Press",
      "label": "C",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard C",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 1,
      "x": 8,
      "y": 3,
      "behavior": "Key Press",
      "label": "V",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard V",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 1,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "label": "[",
      "rationale": "v1.9: Move bracket from base to Layer 1 programming layer. Replaces duplicate period.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard Left Brace"
    },
    {
      "layer": 1,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "label": "]",
      "rationale": "v1.9: Add ] bracket for programming pairs on Layer 1.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard Right Brace"
    },
    {
      "layer": 1,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "label": "\\",
      "rationale": "v1.9: Add \\ backslash for programming (file paths, escapes) on Layer 1.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard Backslash and Pipe"
    },
    {
      "layer": 1,
      "x": 12,
      "y": 3,
      "behavior": "Key Press",
      "label": "-",
      "rationale": "v1.9: Move minus from base layer to Layer 1. Displaced by apostrophe on base.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "Keyboard Dash and Underscore"
    },
    {
      "layer": 1,
      "x": 3,
      "y": 4,
      "behavior": "Key Press",
      "label": "Alt",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftAlt"
    },
    {
      "layer": 1,
      "x": 4,
      "y": 4,
      "behavior": "Key Press",
      "label": "␣",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Spacebar"
    },
    {
      "layer": 1,
      "x": 5,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "Coach beacon: Nav thumb exit to base; clears locked/toggled coach state (Ctrl+Alt+Shift+F22).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 1,
      "x": 7,
      "y": 4,
      "behavior": "None",
      "label": "None",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 1,
      "x": 8,
      "y": 4,
      "behavior": "None",
      "label": "None",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 1,
      "x": 4,
      "y": 5,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB1"
    },
    {
      "layer": 1,
      "x": 5,
      "y": 5,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB2"
    },
    {
      "layer": 1,
      "x": 7,
      "y": 5,
      "behavior": "Key Press",
      "label": "Ret",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Return Enter"
    },
    {
      "layer": 2,
      "x": 0,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 1,
      "y": 0,
      "behavior": "Key Press",
      "label": "Task View",
      "rationale": "v2.0: Left-hand mouse QoL — Win+Tab opens Task View.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 2,
      "x": 2,
      "y": 0,
      "behavior": "Key Press",
      "label": "Desktop",
      "rationale": "v2.0: Left-hand mouse QoL — Win+D toggles show desktop.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard D",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 2,
      "x": 3,
      "y": 0,
      "behavior": "Key Press",
      "label": "Next Tab",
      "rationale": "v2.0: Left-hand mouse QoL — Ctrl+Tab cycles to next tab.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 4,
      "y": 0,
      "behavior": "Key Press",
      "label": "Prev Tab",
      "rationale": "v2.0: Left-hand mouse QoL — Ctrl+Shift+Tab cycles to previous tab.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ]
    },
    {
      "layer": 2,
      "x": 5,
      "y": 0,
      "behavior": "Momentary Layer",
      "label": "Scroll",
      "rationale": "v2.0: Left-hand mouse QoL — hold for scroll overlay.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "6"
    },
    {
      "layer": 2,
      "x": 7,
      "y": 0,
      "behavior": "Key Press",
      "label": "Task View",
      "rationale": "v2.0: Right-hand mouse QoL — Win+Tab opens Task View for recent apps.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 2,
      "x": 8,
      "y": 0,
      "behavior": "Key Press",
      "label": "Desktop",
      "rationale": "v2.0: Right-hand mouse QoL — Win+D toggles show desktop.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard D",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 2,
      "x": 9,
      "y": 0,
      "behavior": "Key Press",
      "label": "Next Tab",
      "rationale": "v2.0: Right-hand mouse QoL — Ctrl+Tab cycles to next browser/app tab.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 10,
      "y": 0,
      "behavior": "Key Press",
      "label": "Prev Tab",
      "rationale": "v2.0: Right-hand mouse QoL — Ctrl+Shift+Tab cycles to previous tab.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ]
    },
    {
      "layer": 2,
      "x": 11,
      "y": 0,
      "behavior": "Key Press",
      "label": "Redo",
      "rationale": "v2.0: Right-hand mouse QoL — Ctrl+Y redo after mouse select+edit.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Y",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 12,
      "y": 0,
      "behavior": "Key Press",
      "label": "Del",
      "rationale": "v2.0: Right-hand mouse QoL — forward delete for text editing.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Delete Forward"
    },
    {
      "layer": 2,
      "x": 0,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "label": "Alt+Tab",
      "rationale": "v2.0: Left-hand mouse QoL — Alt+Tab app switcher.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L Alt"
      ]
    },
    {
      "layer": 2,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "label": "Esc",
      "rationale": "v2.0: Left-hand mouse QoL — Escape to cancel dialogs.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Escape"
    },
    {
      "layer": 2,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "label": "Enter",
      "rationale": "v2.0: Left-hand mouse QoL — Enter to confirm.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Return Enter"
    },
    {
      "layer": 2,
      "x": 4,
      "y": 1,
      "behavior": "Key Press",
      "label": "BkSp",
      "rationale": "v2.0: Left-hand mouse QoL — Backspace for corrections.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Delete"
    },
    {
      "layer": 2,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "label": "Close",
      "rationale": "v2.0: Left-hand mouse QoL — Ctrl+W close tab.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard W",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "label": "Alt+Tab",
      "rationale": "v2.0: Right-hand mouse QoL — Alt+Tab app switcher, most-used mouse mode shortcut.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L Alt"
      ]
    },
    {
      "layer": 2,
      "x": 8,
      "y": 1,
      "behavior": "Key Press",
      "label": "Enter",
      "rationale": "v2.0: Right-hand mouse QoL — Enter to confirm dialogs/actions while navigating.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Return Enter"
    },
    {
      "layer": 2,
      "x": 9,
      "y": 1,
      "behavior": "Key Press",
      "label": "Esc",
      "rationale": "v2.0: Right-hand mouse QoL — Escape to cancel dialogs/menus.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Escape"
    },
    {
      "layer": 2,
      "x": 10,
      "y": 1,
      "behavior": "Key Press",
      "label": "BkSp",
      "rationale": "v2.0: Right-hand mouse QoL — Backspace for quick corrections.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Delete"
    },
    {
      "layer": 2,
      "x": 11,
      "y": 1,
      "behavior": "Key Press",
      "label": "Win",
      "rationale": "v2.0: Right-hand mouse QoL — Win key to show auto-hide taskbar / Start menu.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Left GUI"
    },
    {
      "layer": 2,
      "x": 12,
      "y": 1,
      "behavior": "Key Press",
      "label": "Close",
      "rationale": "v2.0: Right-hand mouse QoL — Ctrl+W close tab/window.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard W",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 1,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "MB1",
      "rationale": "v2.0: Left-hand mouse QoL — primary click on home row.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "MB1"
    },
    {
      "layer": 2,
      "x": 2,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "MB2",
      "rationale": "v2.0: Left-hand mouse QoL — right click on home row.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "MB2"
    },
    {
      "layer": 2,
      "x": 3,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "MB3",
      "rationale": "v2.0: Left-hand mouse QoL — middle click on home row.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "MB3"
    },
    {
      "layer": 2,
      "x": 4,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "MB4",
      "rationale": "v2.0: Left-hand mouse QoL — back button on home row.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "MB4"
    },
    {
      "layer": 2,
      "x": 5,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "MB5",
      "rationale": "v2.0: Left-hand mouse QoL — forward button on home row.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "MB5"
    },
    {
      "layer": 2,
      "x": 7,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB4"
    },
    {
      "layer": 2,
      "x": 8,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB1"
    },
    {
      "layer": 2,
      "x": 9,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB2"
    },
    {
      "layer": 2,
      "x": 10,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB3"
    },
    {
      "layer": 2,
      "x": 11,
      "y": 2,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB5"
    },
    {
      "layer": 2,
      "x": 12,
      "y": 2,
      "behavior": "Toggle Layer",
      "label": "Scroll",
      "rationale": "Right-pinky scroll toggle (Layer 6). coach_scroll_toggle not in current Studio build — use Toggle Layer until firmware is reflashed.",
      "apply_batch": true,
      "full_reapply_v19": true,
      "parameter": "6"
    },
    {
      "layer": 2,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "label": "Undo",
      "rationale": "v2.0: Left-hand mouse QoL — Ctrl+Z undo.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Z",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 2,
      "y": 3,
      "behavior": "Key Press",
      "label": "Cut",
      "rationale": "v2.0: Left-hand mouse QoL — Ctrl+X cut (unique to left hand).",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard X",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "label": "Copy",
      "rationale": "v2.0: Left-hand mouse QoL — Ctrl+C copy.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard C",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "label": "Paste",
      "rationale": "v2.0: Left-hand mouse QoL — Ctrl+V paste.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard V",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 5,
      "y": 3,
      "behavior": "Key Press",
      "label": "Sel All",
      "rationale": "v2.0: Left-hand mouse QoL — Ctrl+A select all.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard A",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 7,
      "y": 3,
      "behavior": "Key Press",
      "label": "Copy",
      "rationale": "v2.0: Right-hand mouse QoL — Ctrl+C copy after mouse selection.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard C",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 8,
      "y": 3,
      "behavior": "Key Press",
      "label": "Paste",
      "rationale": "v2.0: Right-hand mouse QoL — Ctrl+V paste at cursor position.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard V",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "label": "Sel All",
      "rationale": "v2.0: Right-hand mouse QoL — Ctrl+A select all before copy/cut.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard A",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "label": "Undo",
      "rationale": "v2.0: Right-hand mouse QoL — Ctrl+Z undo after accidental edit.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard Z",
      "modifiers": [
        "L Ctrl"
      ]
    },
    {
      "layer": 2,
      "x": 11,
      "y": 3,
      "behavior": "Momentary Layer",
      "label": "Speed",
      "rationale": "v2.4: Mouse-locked speed hold — hold for fast travel, release to return.",
      "parameter": "8",
      "apply_batch": true,
      "full_reapply_v20": true
    },
    {
      "layer": 2,
      "x": 12,
      "y": 3,
      "behavior": "Key Press",
      "label": "Close Win",
      "rationale": "v2.0: Right-hand mouse QoL — Alt+F4 close window/application.",
      "apply_batch": true,
      "full_reapply_v20": true,
      "parameter": "Keyboard F4",
      "modifiers": [
        "L Alt"
      ]
    },
    {
      "layer": 2,
      "x": 3,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 4,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 5,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "Coach beacon: thumb exit from locked mouse layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 7,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "Coach beacon: exit locked mouse layer back to base (Ctrl+Alt+Shift+F22).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 8,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "Coach beacon: second thumb exit from locked mouse layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 2,
      "x": 4,
      "y": 5,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB1"
    },
    {
      "layer": 2,
      "x": 5,
      "y": 5,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB2"
    },
    {
      "layer": 2,
      "x": 7,
      "y": 5,
      "behavior": "Mouse Key Press",
      "label": "Mouse Key Press",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB3"
    },
    {
      "layer": 3,
      "x": 0,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 1,
      "y": 0,
      "behavior": "Key Press",
      "label": "TskMg",
      "rationale": "v2.2: Ctrl+Shift+Esc Task Manager — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Escape",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 2,
      "y": 0,
      "behavior": "Key Press",
      "label": "Emoji",
      "rationale": "v2.2: Win+. Emoji picker — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Period and GreaterThan",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 3,
      "y": 0,
      "behavior": "Key Press",
      "label": "Proj",
      "rationale": "v2.2: Win+P Project / display — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard P",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 4,
      "y": 0,
      "behavior": "Key Press",
      "label": "QSett",
      "rationale": "v2.2: Win+A Quick Settings — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard A",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 5,
      "y": 0,
      "behavior": "Key Press",
      "label": "Notif",
      "rationale": "v2.2: Win+N Notifications — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard N",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 7,
      "y": 0,
      "behavior": "Key Press",
      "label": "TskCy",
      "rationale": "v2.2: Win+T Cycle taskbar — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard T",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 8,
      "y": 0,
      "behavior": "Key Press",
      "label": "SysTr",
      "rationale": "v2.2: Win+B System tray — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard B",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 9,
      "y": 0,
      "behavior": "Key Press",
      "label": "Cast",
      "rationale": "v2.2: Win+K Connect / Cast — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard K",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 10,
      "y": 0,
      "behavior": "Key Press",
      "label": "Acces",
      "rationale": "v2.2: Win+U Accessibility — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard U",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 11,
      "y": 0,
      "behavior": "Key Press",
      "label": "Emoji",
      "rationale": "v2.2: Win+; Emoji picker (alt) — fills L3 y0.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard SemiColon and Colon",
      "modifiers": [
        "L GUI"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 3,
      "x": 12,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 0,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "label": "␣",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Spacebar",
      "modifiers": [
        "L Alt"
      ]
    },
    {
      "layer": 3,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "label": "V",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard V",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "label": "S",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard S",
      "modifiers": [
        "L Shift",
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 4,
      "y": 1,
      "behavior": "Key Press",
      "label": "D",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard D",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "label": "←",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftArrow",
      "modifiers": [
        "L GUI",
        "L Shift"
      ]
    },
    {
      "layer": 3,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "label": "←",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftArrow",
      "modifiers": [
        "L Shift",
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 8,
      "y": 1,
      "behavior": "Key Press",
      "label": "`",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Grave Accent and Tilde",
      "modifiers": [
        "L Shift",
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 9,
      "y": 1,
      "behavior": "Key Press",
      "label": "→",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard RightArrow",
      "modifiers": [
        "L Shift",
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 10,
      "y": 1,
      "behavior": "Key Press",
      "label": "Lock",
      "rationale": "v2.1: Win+L lock PC — right ring upper row.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard L",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 11,
      "y": 1,
      "behavior": "Key Press",
      "label": "Settings",
      "rationale": "v2.1: Win+I open Settings — right pinky upper row.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard I",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 12,
      "y": 1,
      "behavior": "Key Press",
      "label": "Run",
      "rationale": "v2.1: Win+R open Run dialog — right far pinky upper row.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard R",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "label": "1",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 1 and Bang",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "label": "2",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 2 and At",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 3,
      "y": 2,
      "behavior": "Key Press",
      "label": "3",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 3 and Hash",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 4,
      "y": 2,
      "behavior": "Key Press",
      "label": "4",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 4 and Dollar",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 5,
      "y": 2,
      "behavior": "Key Press",
      "label": "5",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 5 and Percent",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 7,
      "y": 2,
      "behavior": "Key Press",
      "parameter": "S",
      "modifiers": [
        "L GUI"
      ],
      "label": "Search",
      "rationale": "v1.9: Right-hand Win+S: hold Window thumb + tap H position.",
      "apply_batch": true,
      "full_reapply_v19": true
    },
    {
      "layer": 3,
      "x": 8,
      "y": 2,
      "behavior": "Key Press",
      "label": "Tab",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 9,
      "y": 2,
      "behavior": "Key Press",
      "label": "→",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard RightArrow",
      "modifiers": [
        "L Ctrl",
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 10,
      "y": 2,
      "behavior": "coach_mouse_lock",
      "label": "Mouse Lock",
      "rationale": "Coach beacon: lock to layer 2 (mouse mode).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 11,
      "y": 2,
      "behavior": "coach_travel_toggle",
      "label": "Speed",
      "rationale": "Right-hand speed toggle: hold Window, tap Speed, release Window — thumb free for trackball.",
      "apply_batch": true,
      "full_reapply_v20": true
    },
    {
      "layer": 3,
      "x": 12,
      "y": 2,
      "behavior": "coach_game_lock",
      "label": "Game",
      "rationale": "Coach beacon: lock to layer 7 (game/RPG).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "label": "←",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftArrow",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 2,
      "y": 3,
      "behavior": "Key Press",
      "label": "↑",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard UpArrow",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "label": "↓",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard DownArrow",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "label": "→",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard RightArrow",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 5,
      "y": 3,
      "behavior": "Key Press",
      "label": "→",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard RightArrow",
      "modifiers": [
        "L GUI",
        "L Shift"
      ]
    },
    {
      "layer": 3,
      "x": 7,
      "y": 3,
      "behavior": "Key Press",
      "label": "Tab",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Tab",
      "modifiers": [
        "L Alt"
      ]
    },
    {
      "layer": 3,
      "x": 8,
      "y": 3,
      "behavior": "Key Press",
      "label": "D",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard D",
      "modifiers": [
        "L Ctrl",
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "label": "F4",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F4",
      "modifiers": [
        "L Ctrl",
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "label": "Explorer",
      "rationale": "v2.1: Win+E open File Explorer — replaces duplicate Win+Tab.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard E",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "parameter": "Space",
      "modifiers": [
        "L Alt"
      ],
      "label": "CmdPal",
      "rationale": "v1.9: Right-hand Alt+Space PowerToys: hold Window thumb + tap pinky position.",
      "apply_batch": true,
      "full_reapply_v19": true
    },
    {
      "layer": 3,
      "x": 12,
      "y": 3,
      "behavior": "Key Press",
      "label": "Power",
      "rationale": "v2.1: Win+X open Power User menu — right far pinky bottom.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard X",
      "modifiers": [
        "L GUI"
      ]
    },
    {
      "layer": 3,
      "x": 3,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 4,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 5,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 7,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 8,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 4,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 5,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 3,
      "x": 7,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 0,
      "y": 0,
      "behavior": "Bluetooth",
      "label": "Bluetooth",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "BT_SEL 0"
    },
    {
      "layer": 4,
      "x": 1,
      "y": 0,
      "behavior": "Bluetooth",
      "label": "Bluetooth",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "BT_SEL 1"
    },
    {
      "layer": 4,
      "x": 2,
      "y": 0,
      "behavior": "Bluetooth",
      "label": "Bluetooth",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "BT_SEL 2"
    },
    {
      "layer": 4,
      "x": 3,
      "y": 0,
      "behavior": "Bluetooth",
      "label": "Bluetooth",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "BT_SEL 3"
    },
    {
      "layer": 4,
      "x": 4,
      "y": 0,
      "behavior": "Bluetooth",
      "label": "Bluetooth",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "BT_SEL 4"
    },
    {
      "layer": 4,
      "x": 5,
      "y": 0,
      "behavior": "Bluetooth",
      "label": "Bluetooth",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Clear Selected Profile"
    },
    {
      "layer": 4,
      "x": 7,
      "y": 0,
      "behavior": "Output Selection",
      "label": "Output Selection",
      "rationale": "Firmware-only &out behavior; not exposed in this ZMK Studio build.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "studio_skip": true,
      "parameter": "BLE Output"
    },
    {
      "layer": 4,
      "x": 8,
      "y": 0,
      "behavior": "Output Selection",
      "label": "Output Selection",
      "rationale": "Firmware-only &out behavior; not exposed in this ZMK Studio build.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "studio_skip": true,
      "parameter": "USB Output"
    },
    {
      "layer": 4,
      "x": 9,
      "y": 0,
      "behavior": "Output Selection",
      "label": "Output Selection",
      "rationale": "Firmware-only &out behavior; not exposed in this ZMK Studio build.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "studio_skip": true,
      "parameter": "Toggle Outputs"
    },
    {
      "layer": 4,
      "x": 10,
      "y": 0,
      "behavior": "Studio Unlock",
      "label": "Studio Unlock",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 11,
      "y": 0,
      "behavior": "Reset",
      "label": "Reset",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 12,
      "y": 0,
      "behavior": "Bootloader",
      "label": "Bootloader",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 0,
      "y": 1,
      "behavior": "Key Press",
      "label": "F13",
      "rationale": "v2.1: Sequential F13-F24. F13-F18 on upper row.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F13"
    },
    {
      "layer": 4,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "label": "F14",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F14"
    },
    {
      "layer": 4,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "label": "F15",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F15"
    },
    {
      "layer": 4,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "label": "F16",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F16"
    },
    {
      "layer": 4,
      "x": 4,
      "y": 1,
      "behavior": "Key Press",
      "label": "F17",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F17"
    },
    {
      "layer": 4,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "label": "F18",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F18"
    },
    {
      "layer": 4,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "label": "Ctrl+E",
      "rationale": "v2.3: L4 power shortcut — Search (Teams/Outlook/Explorer).",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard E",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 8,
      "y": 1,
      "behavior": "Key Press",
      "label": "Ctrl+K",
      "rationale": "v2.3: L4 power shortcut — Quick switcher / Insert link.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard K",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 9,
      "y": 1,
      "behavior": "Key Press",
      "label": "Ctrl+G",
      "rationale": "v2.3: L4 power shortcut — Go to (line/page/vault).",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard G",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 10,
      "y": 1,
      "behavior": "Key Press",
      "label": "Ctrl+B",
      "rationale": "v2.3: L4 power shortcut — Bold / Toggle sidebar.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard B",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 11,
      "y": 1,
      "behavior": "Key Press",
      "label": "Ctrl+I",
      "rationale": "v2.3: L4 power shortcut — Italic / Object info.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard I",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 12,
      "y": 1,
      "behavior": "Key Press",
      "label": "Ctrl+U",
      "rationale": "v2.3: L4 power shortcut — Underline / Upload.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard U",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "label": "F19",
      "rationale": "v2.1: Sequential F13-F24. F19-F23 on home row.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F19"
    },
    {
      "layer": 4,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "label": "F20",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F20"
    },
    {
      "layer": 4,
      "x": 3,
      "y": 2,
      "behavior": "Key Press",
      "label": "F21",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F21"
    },
    {
      "layer": 4,
      "x": 4,
      "y": 2,
      "behavior": "Key Press",
      "label": "F22",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F22"
    },
    {
      "layer": 4,
      "x": 5,
      "y": 2,
      "behavior": "Key Press",
      "label": "F23",
      "rationale": "v2.1: Sequential F13-F24.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F23"
    },
    {
      "layer": 4,
      "x": 7,
      "y": 2,
      "behavior": "Key Press",
      "label": "Ctrl+S",
      "rationale": "v2.3: L4 power shortcut — Save (universal).",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard S",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 8,
      "y": 2,
      "behavior": "Key Press",
      "label": "Ctrl+N",
      "rationale": "v2.3: L4 power shortcut — New (file/chat/tab).",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard N",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 9,
      "y": 2,
      "behavior": "Key Press",
      "label": "Ctrl+P",
      "rationale": "v2.3: L4 power shortcut — Print / Quick Open.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard P",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 10,
      "y": 2,
      "behavior": "Key Press",
      "label": "Ctrl+O",
      "rationale": "v2.3: L4 power shortcut — Open file.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard O",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 11,
      "y": 2,
      "behavior": "Key Press",
      "label": "Ctrl+R",
      "rationale": "v2.3: L4 power shortcut — Reply / Refresh / Run.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard R",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 12,
      "y": 2,
      "behavior": "Key Press",
      "label": "Ctrl+W",
      "rationale": "v2.3: L4 power shortcut — Close tab/window.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard W",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "label": "F24",
      "rationale": "v2.1: Sequential F13-F24. F24 on bottom row.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard F24"
    },
    {
      "layer": 4,
      "x": 2,
      "y": 3,
      "behavior": "Toggle Layer",
      "label": "DMS",
      "rationale": "v2.2: Toggle M-Files/DMS layer.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "9",
      "full_reapply_v22": true
    },
    {
      "layer": 4,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "label": "Ctrl+D",
      "rationale": "v2.3: L4 power shortcut — Duplicate / Delete / Bookmark.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard D",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "label": "Ctrl+L",
      "rationale": "v2.3: L4 power shortcut — Address bar / Select line.",
      "apply_batch": true,
      "full_reapply_v21": true,
      "parameter": "Keyboard L",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 5,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 7,
      "y": 3,
      "behavior": "Key Press",
      "label": "Mute",
      "rationale": "v2.3: L4 power shortcut — Teams mute toggle.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard M",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 8,
      "y": 3,
      "behavior": "Key Press",
      "label": "Camera",
      "rationale": "v2.3: L4 power shortcut — Teams camera toggle.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard O",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "label": "Share",
      "rationale": "v2.3: L4 power shortcut — Teams screen share.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard E",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "label": "Hand",
      "rationale": "v2.3: L4 power shortcut — Teams raise hand.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard K",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "label": "Hangup",
      "rationale": "v2.3: L4 power shortcut — Teams end call.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard H",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 12,
      "y": 3,
      "behavior": "Key Press",
      "label": "Accept",
      "rationale": "v2.3: L4 power shortcut — Teams accept call.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard A",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v23": true
    },
    {
      "layer": 4,
      "x": 3,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 4,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 5,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 7,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 8,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 4,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 5,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 4,
      "x": 7,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 5,
      "x": 0,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 5,
      "x": 1,
      "y": 0,
      "behavior": "Key Press",
      "label": "Debug",
      "rationale": "v2.2: Code/IDE layer — Start/continue debug.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F5",
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 2,
      "y": 0,
      "behavior": "Key Press",
      "label": "Stop",
      "rationale": "v2.2: Code/IDE layer — Stop debugging.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F5",
      "modifiers": [
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 3,
      "y": 0,
      "behavior": "Key Press",
      "label": "StpOv",
      "rationale": "v2.2: Code/IDE layer — Step over.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F10",
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 4,
      "y": 0,
      "behavior": "Key Press",
      "label": "StpIn",
      "rationale": "v2.2: Code/IDE layer — Step into.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F11",
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 5,
      "y": 0,
      "behavior": "Key Press",
      "label": "StpOt",
      "rationale": "v2.2: Code/IDE layer — Step out.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F11",
      "modifiers": [
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 7,
      "y": 0,
      "behavior": "Key Press",
      "label": "BkPt",
      "rationale": "v2.2: Code/IDE layer — Toggle breakpoint.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F9",
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 8,
      "y": 0,
      "behavior": "Key Press",
      "label": "Rstr",
      "rationale": "v2.2: Code/IDE layer — Restart debug.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F5",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 9,
      "y": 0,
      "behavior": "Key Press",
      "label": "Sett",
      "rationale": "v2.2: Code/IDE layer — Settings.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Comma and LessThan",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 10,
      "y": 0,
      "behavior": "Key Press",
      "label": "NTerm",
      "rationale": "v2.2: Code/IDE layer — New terminal.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Grave Accent and Tilde",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 11,
      "y": 0,
      "behavior": "Key Press",
      "label": "NewFl",
      "rationale": "v2.2: Code/IDE layer — New file.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard N",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 12,
      "y": 0,
      "behavior": "Key Press",
      "label": "Fmt",
      "rationale": "v2.2: Code/IDE layer — Format document.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 0,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 5,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "label": "LnUp",
      "rationale": "v2.2: Code/IDE layer — Move line up.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard UpArrow",
      "modifiers": [
        "L Alt"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "label": "LnDn",
      "rationale": "v2.2: Code/IDE layer — Move line down.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard DownArrow",
      "modifiers": [
        "L Alt"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "label": "CpDn",
      "rationale": "v2.2: Code/IDE layer — Copy line down.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard DownArrow",
      "modifiers": [
        "L Shift",
        "L Alt"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 4,
      "y": 1,
      "behavior": "Key Press",
      "label": "InsLn",
      "rationale": "v2.2: Code/IDE layer — Insert line below.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Return Enter",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "label": "InsUp",
      "rationale": "v2.2: Code/IDE layer — Insert line above.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Return Enter",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "label": "Outd",
      "rationale": "v2.2: Code/IDE layer — Outdent.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Left Brace",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 8,
      "y": 1,
      "behavior": "Key Press",
      "label": "Ind",
      "rationale": "v2.2: Code/IDE layer — Indent.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Right Brace",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 9,
      "y": 1,
      "behavior": "Key Press",
      "label": "Brkt",
      "rationale": "v2.2: Code/IDE layer — Jump to bracket.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Backslash and Pipe",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 10,
      "y": 1,
      "behavior": "Key Press",
      "label": "SelAl",
      "rationale": "v2.2: Code/IDE layer — Select all occurrences.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard L",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 11,
      "y": 1,
      "behavior": "Key Press",
      "label": "Peek",
      "rationale": "v2.2: Code/IDE layer — Peek definition.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F12",
      "modifiers": [
        "L Alt"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 12,
      "y": 1,
      "behavior": "Key Press",
      "label": "Probs",
      "rationale": "v2.2: Code/IDE layer — Problems panel.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard M",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 5,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "label": "Save",
      "rationale": "v2.2: Code/IDE layer — Save.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard S",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "label": "SelNx",
      "rationale": "v2.2: Code/IDE layer — Select next occurrence.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard D",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 3,
      "y": 2,
      "behavior": "Key Press",
      "label": "Cmnt",
      "rationale": "v2.2: Code/IDE layer — Toggle comment.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard ForwardSlash and QuestionMark",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 4,
      "y": 2,
      "behavior": "Key Press",
      "label": "DelLn",
      "rationale": "v2.2: Code/IDE layer — Delete line.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard K",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 5,
      "y": 2,
      "behavior": "Key Press",
      "label": "Term",
      "rationale": "v2.2: Code/IDE layer — Toggle terminal.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Grave Accent and Tilde",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 7,
      "y": 2,
      "behavior": "Key Press",
      "label": "Open",
      "rationale": "v2.2: Code/IDE layer — Quick open file.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard P",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 8,
      "y": 2,
      "behavior": "Key Press",
      "label": "CmdP",
      "rationale": "v2.2: Code/IDE layer — Command palette.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard P",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 9,
      "y": 2,
      "behavior": "Key Press",
      "label": "GoLn",
      "rationale": "v2.2: Code/IDE layer — Go to line.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard G",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 10,
      "y": 2,
      "behavior": "Key Press",
      "label": "GoSym",
      "rationale": "v2.2: Code/IDE layer — Go to symbol.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard O",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 11,
      "y": 2,
      "behavior": "Key Press",
      "label": "SrchF",
      "rationale": "v2.2: Code/IDE layer — Search across files.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 12,
      "y": 2,
      "behavior": "Key Press",
      "label": "Git",
      "rationale": "v2.2: Code/IDE layer — Source control.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard G",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 5,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "label": "PstNF",
      "rationale": "v2.2: Code/IDE layer — Paste no formatting.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard V",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 2,
      "y": 3,
      "behavior": "Key Press",
      "label": "BlkCm",
      "rationale": "v2.2: Code/IDE layer — Block comment.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard A",
      "modifiers": [
        "L Shift",
        "L Alt"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "label": "Explr",
      "rationale": "v2.2: Code/IDE layer — Explorer panel.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard E",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "label": "Ext",
      "rationale": "v2.2: Code/IDE layer — Extensions panel.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard X",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 5,
      "y": 3,
      "behavior": "Key Press",
      "label": "Side",
      "rationale": "v2.2: Code/IDE layer — Toggle sidebar.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard B",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 7,
      "y": 3,
      "behavior": "Key Press",
      "label": "Panel",
      "rationale": "v2.2: Code/IDE layer — Toggle bottom panel.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard J",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 8,
      "y": 3,
      "behavior": "Key Press",
      "label": "Split",
      "rationale": "v2.2: Code/IDE layer — Split editor.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Backslash and Pipe",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "label": "SelLn",
      "rationale": "v2.2: Code/IDE layer — Select line.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard L",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "label": "RplFl",
      "rationale": "v2.2: Code/IDE layer — Replace in files.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard H",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "label": "NxtPr",
      "rationale": "v2.2: Code/IDE layer — Next problem.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F8",
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 12,
      "y": 3,
      "behavior": "Key Press",
      "label": "PrvPr",
      "rationale": "v2.2: Code/IDE layer — Prev problem.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F8",
      "modifiers": [
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 3,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "v2.2: Exit Code/IDE layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 4,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 5,
      "x": 5,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "v2.2: Exit Code/IDE layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 7,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "v2.2: Exit Code/IDE layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 8,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "v2.2: Exit Code/IDE layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "full_reapply_v22": true
    },
    {
      "layer": 5,
      "x": 4,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 5,
      "x": 5,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 5,
      "x": 7,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 0,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 1,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 2,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 3,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 4,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 5,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 7,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 8,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 9,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 10,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 11,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 12,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 0,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 1,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 2,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 3,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 4,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 5,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 7,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 8,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 9,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 10,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 11,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 12,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 1,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 2,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 3,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 4,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 5,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 7,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 8,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 9,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 10,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 11,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 12,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 1,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 2,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 3,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 4,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 5,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 7,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 8,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 9,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 10,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 11,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 12,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 3,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 4,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 5,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 7,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 8,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 4,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 5,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 6,
      "x": 7,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 0,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 1,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 2,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 3,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 4,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 5,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 8,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 9,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 10,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 11,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 12,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 0,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "label": "9 PU",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keypad 9 and PageUp"
    },
    {
      "layer": 7,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "label": "↑",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard UpArrow"
    },
    {
      "layer": 7,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "label": "3 PD",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keypad 3 and PageDn"
    },
    {
      "layer": 7,
      "x": 4,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 5,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Game layer right half cleaned: movement cluster moved to x8-x11 (intuitive copy of left).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 8,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Game layer right half: column-mirror cluster x9-x11 (x8 transparent).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 9,
      "y": 1,
      "behavior": "Key Press",
      "label": "3 PD",
      "rationale": "Game layer: right-hand column-mirror of left x3.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keypad 3 and PageDn"
    },
    {
      "layer": 7,
      "x": 10,
      "y": 1,
      "behavior": "Key Press",
      "label": "↑",
      "rationale": "Game layer: right-hand column-mirror of left x2.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard UpArrow"
    },
    {
      "layer": 7,
      "x": 11,
      "y": 1,
      "behavior": "Key Press",
      "label": "9 PU",
      "rationale": "Game layer: right-hand column-mirror of left x1.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keypad 9 and PageUp"
    },
    {
      "layer": 7,
      "x": 12,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "label": "←",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftArrow"
    },
    {
      "layer": 7,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "label": "↓",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard DownArrow"
    },
    {
      "layer": 7,
      "x": 3,
      "y": 2,
      "behavior": "Key Press",
      "label": "→",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard RightArrow"
    },
    {
      "layer": 7,
      "x": 4,
      "y": 2,
      "behavior": "Key Press",
      "label": "Z",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Z"
    },
    {
      "layer": 7,
      "x": 5,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 8,
      "y": 2,
      "behavior": "Key Press",
      "label": "Z",
      "rationale": "Game layer: right-hand column-mirror of left x4 (Z at x8).",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Z"
    },
    {
      "layer": 7,
      "x": 9,
      "y": 2,
      "behavior": "Key Press",
      "label": "←",
      "rationale": "Game layer: left arrow on left column of right-hand cluster (x9).",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftArrow"
    },
    {
      "layer": 7,
      "x": 10,
      "y": 2,
      "behavior": "Key Press",
      "label": "↓",
      "rationale": "Game layer: right-hand column-mirror of left x2.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard DownArrow"
    },
    {
      "layer": 7,
      "x": 11,
      "y": 2,
      "behavior": "Key Press",
      "label": "→",
      "rationale": "Game layer: right arrow on right column of right-hand cluster (x11).",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard RightArrow"
    },
    {
      "layer": 7,
      "x": 12,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "label": "X",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard X"
    },
    {
      "layer": 7,
      "x": 2,
      "y": 3,
      "behavior": "Key Press",
      "label": "C",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard C"
    },
    {
      "layer": 7,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "label": "Shft",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftShift"
    },
    {
      "layer": 7,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "label": "Esc",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Escape"
    },
    {
      "layer": 7,
      "x": 5,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Game layer right half cleaned: cluster moved to x8-x11 (intuitive copy of left).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 8,
      "y": 3,
      "behavior": "Key Press",
      "label": "Esc",
      "rationale": "Game layer: right-hand column-mirror of left x4 (Esc at x8).",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Escape"
    },
    {
      "layer": 7,
      "x": 9,
      "y": 3,
      "behavior": "Key Press",
      "label": "Shft",
      "rationale": "Game layer: right-hand column-mirror of left x3.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard LeftShift"
    },
    {
      "layer": 7,
      "x": 10,
      "y": 3,
      "behavior": "Key Press",
      "label": "C",
      "rationale": "Game layer: right-hand column-mirror of left x2.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard C"
    },
    {
      "layer": 7,
      "x": 11,
      "y": 3,
      "behavior": "Key Press",
      "label": "X",
      "rationale": "Game layer: right-hand column-mirror of left x1.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard X"
    },
    {
      "layer": 7,
      "x": 12,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 3,
      "y": 4,
      "behavior": "coach_base",
      "label": "Exit Base",
      "rationale": "Coach beacon: exit locked game layer to base; clears lockedLayer 7 in beacon listener (Ctrl+Alt+Shift+F22).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 4,
      "y": 4,
      "behavior": "Key Press",
      "label": "␣",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Spacebar"
    },
    {
      "layer": 7,
      "x": 5,
      "y": 4,
      "behavior": "coach_base",
      "label": "Exit Base",
      "rationale": "Coach beacon: second thumb exit from locked game layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 7,
      "y": 4,
      "behavior": "coach_base",
      "label": "Exit Base",
      "rationale": "Coach beacon: right-thumb exit from locked game layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 8,
      "y": 4,
      "behavior": "coach_base",
      "label": "Exit Base",
      "rationale": "Coach beacon: second right-thumb exit from locked game layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 7,
      "x": 4,
      "y": 5,
      "behavior": "Mouse Key Press",
      "label": "Click",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB1"
    },
    {
      "layer": 7,
      "x": 5,
      "y": 5,
      "behavior": "Mouse Key Press",
      "label": "Right Click",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "MB2"
    },
    {
      "layer": 7,
      "x": 7,
      "y": 5,
      "behavior": "Key Press",
      "label": "Ret",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Return Enter"
    },
    {
      "layer": 8,
      "x": 0,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 1,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 2,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 3,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 4,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 5,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 7,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 8,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 9,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 10,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 11,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 12,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 0,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 1,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 2,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 3,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 4,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 5,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 7,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 8,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 9,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 10,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 11,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 12,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 1,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 2,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 3,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 4,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 5,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 7,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 8,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 9,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 10,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 11,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 12,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 1,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 2,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 3,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 4,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 5,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 7,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 8,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 9,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 10,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 11,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 12,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 3,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 4,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 5,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 7,
      "y": 4,
      "behavior": "coach_travel_off",
      "label": "Exit Travel",
      "rationale": "Coach beacon: exit speed/travel overlay; clears toggled layer 8 (Ctrl+Alt+Win+F14).",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 8,
      "y": 4,
      "behavior": "coach_travel_off",
      "label": "Exit Travel",
      "rationale": "Coach beacon: second thumb exit from speed/travel overlay.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 4,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 5,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 8,
      "x": 7,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 0,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 1,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 2,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 3,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 4,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 5,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 7,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 8,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 9,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 10,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 11,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 12,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 0,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 1,
      "y": 1,
      "behavior": "Key Press",
      "label": "WfSt",
      "rationale": "v2.2: M-Files/DMS layer — Change workflow state.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard W",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 2,
      "y": 1,
      "behavior": "Key Press",
      "label": "Asgn",
      "rationale": "v2.2: M-Files/DMS layer — Assign to user.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard A",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 3,
      "y": 1,
      "behavior": "Key Press",
      "label": "ASrch",
      "rationale": "v2.2: M-Files/DMS layer — Advanced search.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 4,
      "y": 1,
      "behavior": "Key Press",
      "label": "Fav",
      "rationale": "v2.2: M-Files/DMS layer — Add to favorites.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard M",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 5,
      "y": 1,
      "behavior": "Key Press",
      "label": "DLoad",
      "rationale": "v2.2: M-Files/DMS layer — Download copy.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard D",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 7,
      "y": 1,
      "behavior": "Key Press",
      "label": "Print",
      "rationale": "v2.2: M-Files/DMS layer — Print.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard P",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 8,
      "y": 1,
      "behavior": "Key Press",
      "label": "Vault",
      "rationale": "v2.2: M-Files/DMS layer — Go to vault.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard G",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 9,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 10,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 11,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 12,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 1,
      "y": 2,
      "behavior": "Key Press",
      "label": "ChkOt",
      "rationale": "v2.2: M-Files/DMS layer — Check out.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard E",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 2,
      "y": 2,
      "behavior": "Key Press",
      "label": "ChkIn",
      "rationale": "v2.2: M-Files/DMS layer — Check in.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard E",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 3,
      "y": 2,
      "behavior": "Key Press",
      "label": "Save",
      "rationale": "v2.2: M-Files/DMS layer — Save.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard S",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 4,
      "y": 2,
      "behavior": "Key Press",
      "label": "New",
      "rationale": "v2.2: M-Files/DMS layer — New object.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard N",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 5,
      "y": 2,
      "behavior": "Key Press",
      "label": "Open",
      "rationale": "v2.2: M-Files/DMS layer — Open document.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard O",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 7,
      "y": 2,
      "behavior": "Key Press",
      "label": "Props",
      "rationale": "v2.2: M-Files/DMS layer — Properties / metadata.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard Return Enter",
      "modifiers": [
        "L Alt"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 8,
      "y": 2,
      "behavior": "Key Press",
      "label": "CpLnk",
      "rationale": "v2.2: M-Files/DMS layer — Copy object link.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard C",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 9,
      "y": 2,
      "behavior": "Key Press",
      "label": "Info",
      "rationale": "v2.2: M-Files/DMS layer — Object info.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard I",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 10,
      "y": 2,
      "behavior": "Key Press",
      "label": "Hist",
      "rationale": "v2.2: M-Files/DMS layer — Version history.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard H",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 11,
      "y": 2,
      "behavior": "Key Press",
      "label": "Rel",
      "rationale": "v2.2: M-Files/DMS layer — Add relationship.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard K",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 12,
      "y": 2,
      "behavior": "Key Press",
      "label": "UndCO",
      "rationale": "v2.2: M-Files/DMS layer — Undo checkout.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard U",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 1,
      "y": 3,
      "behavior": "Key Press",
      "label": "List",
      "rationale": "v2.2: M-Files/DMS layer — List view.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 1 and Bang",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 2,
      "y": 3,
      "behavior": "Key Press",
      "label": "Icon",
      "rationale": "v2.2: M-Files/DMS layer — Icon view.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard 2 and At",
      "modifiers": [
        "L Ctrl"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 3,
      "y": 3,
      "behavior": "Key Press",
      "label": "Group",
      "rationale": "v2.2: M-Files/DMS layer — Group by.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard G",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 4,
      "y": 3,
      "behavior": "Key Press",
      "label": "Notif",
      "rationale": "v2.2: M-Files/DMS layer — Send notification.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "parameter": "Keyboard F5",
      "modifiers": [
        "L Ctrl",
        "L Shift"
      ],
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 5,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 7,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 8,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 9,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 10,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 11,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 12,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 3,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "v2.2: Exit M-Files/DMS layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 4,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 5,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "v2.2: Exit M-Files/DMS layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 7,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "v2.2: Exit M-Files/DMS layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 8,
      "y": 4,
      "behavior": "coach_base",
      "label": "Base",
      "rationale": "v2.2: Exit M-Files/DMS layer to base.",
      "apply_batch": true,
      "full_reapply_v18": true,
      "full_reapply_v22": true
    },
    {
      "layer": 9,
      "x": 4,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 5,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 9,
      "x": 7,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 0,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 1,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 2,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 3,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 4,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 5,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 7,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 8,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 9,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 10,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 11,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 12,
      "y": 0,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 0,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 1,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 2,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 3,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 4,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 5,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 7,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 8,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 9,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 10,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 11,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 12,
      "y": 1,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 0,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 1,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 2,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 3,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 4,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 5,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 7,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 8,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 9,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 10,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 11,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 12,
      "y": 2,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 0,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 1,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 2,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 3,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 4,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 5,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 7,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 8,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 9,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 10,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 11,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 12,
      "y": 3,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 3,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 4,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 5,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 7,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 8,
      "y": 4,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 4,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 5,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    },
    {
      "layer": 10,
      "x": 7,
      "y": 5,
      "behavior": "Transparent",
      "label": "Transparent",
      "rationale": "Full-layout reapply generated from final v1.8 verifier expected map.",
      "apply_batch": true,
      "full_reapply_v18": true
    }
  ]
}
;

/*
ZMK Studio best-effort layout assistant/applier.

USAGE IN ZMK STUDIO DEVTOOLS CONSOLE:
1. Open https://zmk.studio/ and connect the V&Z-Charydbis.
2. Export a fresh backup first with export_current_layout_console.js.
3. Paste this script into DevTools Console.
4. Set mode from the Console before pasting this script, for example:
   window.CHARYBDIS_MODE = "dryRun";
   window.CHARYBDIS_MODE = "manualSteps";
   window.CHARYBDIS_MODE = "oneKeyTest";
   window.CHARYBDIS_MODE = "applyLayer";
5. Or edit MODE below:
   - "dryRun"      : print planned changes only. Default and safest.
   - "manualSteps" : print exact manual ZMK Studio steps.
   - "oneKeyTest" : apply one harmless test key only, then stop.
   - "applyLayer" : disabled unless ENABLE_LAYER_APPLY is true.
6. Never save until you verify the UI manually. This script never clicks Save.

This file is already a complete ready-to-paste payload for the final
operational layout.

By default, this script applies only JSON entries with "apply_batch": true.
Set window.CHARYBDIS_APPLY_ONLY_BATCH = false only for manual experiments.
*/

(async function CharybdisStudioAssistant() {
  const MODE = window.CHARYBDIS_MODE || "applyLayer";
  const APPLY_LAYER_INDEX = window.CHARYBDIS_APPLY_LAYER_INDEX === undefined
    ? "all"
    : (window.CHARYBDIS_APPLY_LAYER_INDEX === "all"
      ? "all"
      : (Number.isInteger(Number(window.CHARYBDIS_APPLY_LAYER_INDEX)) ? Number(window.CHARYBDIS_APPLY_LAYER_INDEX) : 2));
  const ENABLE_LAYER_APPLY = window.CHARYBDIS_ENABLE_LAYER_APPLY !== false;
  const APPLY_ONLY_BATCH = window.CHARYBDIS_APPLY_ONLY_BATCH !== false;
  const APPLY_LAYERS = Array.isArray(window.CHARYBDIS_APPLY_LAYERS)
    ? window.CHARYBDIS_APPLY_LAYERS.map((layer) => Number(layer)).filter(Number.isInteger)
    : null;
  const ONE_KEY_TEST = window.CHARYBDIS_ONE_KEY_TEST || { layer: 9, x: 4, y: 5, behavior: "Key Press", parameter: "F24", label: "TEST F24" };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const FALLBACK_LAYOUT = {
    project: "Charybdis Ultimate Keyboard Experience",
    version: "fallback-one-key-test-only",
    keys: [
      { layer: 9, x: 4, y: 5, behavior: "Key Press", parameter: "F24", label: "TEST F24", rationale: "Fallback one-key test only. Paste final_v1_layout.json into CHARYBDIS_FINAL_LAYOUT for real work.", apply_batch: false }
    ]
  };

  function clean(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function visible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 1 && r.height > 1 && cs.display !== "none" && cs.visibility !== "hidden" && cs.opacity !== "0";
  }

  function qa(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  }

  function nativeSetValue(el, value) {
    const proto = el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, "value");
    desc.set.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function nativeSetChecked(el, checked) {
    const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "checked");
    desc.set.call(el, checked);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  async function click(el, delay = 180) {
    el.scrollIntoView({ block: "center", inline: "center" });
    el.click();
    await sleep(delay);
  }

  function getLayout() {
    const data = window.CHARYBDIS_FINAL_LAYOUT || FALLBACK_LAYOUT;
    if (!data || !Array.isArray(data.keys)) {
      throw new Error("Layout data must be an object with a keys array.");
    }
    return data;
  }

  function plannedKeys() {
    return getLayout().keys
      .filter((item) => item && Number.isInteger(Number(item.layer)))
      .filter((item) => !APPLY_ONLY_BATCH || item.apply_batch === true || MODE === "oneKeyTest");
  }

  function visibleSelects() {
    return qa("select").filter(visible);
  }

  function visibleInputs() {
    return qa("input").filter(visible);
  }

  function cleanLabel(el) {
    const id = el.getAttribute("id");
    const aria = el.getAttribute("aria-labelledby");
    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel) return clean(ariaLabel);
    if (aria) {
      return aria.split(/\s+/).map((part) => clean(document.getElementById(part)?.textContent)).filter(Boolean).join(" ");
    }
    if (id) {
      const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
      if (label) return clean(label.textContent);
    }
    const nearbyLabel = el.closest("div")?.querySelector("label");
    return clean(nearbyLabel?.textContent);
  }

  function findLayerButton(layer) {
    const layerList = document.querySelector('[aria-label="Keymap Layer"]');
    return layerList?.querySelector(`[role="option"][data-key="${layer}"]`)
      || qa('[role="option"]', layerList || document).find((el) => clean(el.textContent) === String(layer));
  }

  function selectedLayer() {
    const selected = document.querySelector('[aria-label="Keymap Layer"] [role="option"][aria-selected="true"]');
    return clean(selected?.textContent || "");
  }

  function findKeyElement(x, y) {
    const holder = document.querySelector(`[x="${x}"][y="${y}"]`);
    return holder?.querySelector("button") || holder;
  }

  function keyExistsInDom(x, y) {
    return Boolean(document.querySelector(`[x="${x}"][y="${y}"]`));
  }

  function validatePlanCoordinates(items) {
    const missing = items.filter((item) => !keyExistsInDom(item.x, item.y));
    if (!missing.length) {
      console.info(`Coordinate validation passed for ${items.length} planned key(s).`);
      return true;
    }

    console.group("Coordinate validation failed");
    console.error("The following planned keys do not exist in the visible ZMK Studio keymap. Nothing was applied.");
    for (const item of missing) {
      console.error(`Layer ${item.layer} x${item.x} y${item.y}: ${item.behavior} ${item.parameter || ""} [${item.label || ""}]`);
    }
    console.groupEnd();
    return false;
  }

  function validateSupportedBehaviors(items) {
    const supported = new Set(["Key Press", "Mouse Key Press", "Momentary Layer", "To Layer", "Toggle Layer", "Bluetooth", "Output Selection", "Studio Unlock", "Reset", "Bootloader", "Transparent", "None", "coach_l1_hold", "coach_l2_hold", "coach_l3_hold", "coach_l4_hold", "coach_mouse_lock", "coach_game_lock", "coach_base", "coach_travel_toggle", "coach_travel_off", "coach_recover_base"]);
    const unsupported = items.filter((item) => !supported.has(item.behavior));
    if (!unsupported.length) return true;

    console.group("Unsupported behavior validation failed");
    console.error("These behaviors are not automated because their Studio controls are firmware/source-dependent or unverified.");
    for (const item of unsupported) {
      console.error(`Layer ${item.layer} x${item.x} y${item.y}: ${item.behavior} ${item.parameter || ""} [${item.label || ""}]`);
    }
    console.groupEnd();
    return false;
  }

  async function selectLayer(layer) {
    if (selectedLayer() === String(layer)) return;
    const el = findLayerButton(layer);
    if (!el) throw new Error(`Layer ${layer} was not found in the ZMK Studio layer list.`);
    await click(el, 650);
    if (selectedLayer() !== String(layer)) {
      throw new Error(`Tried to select layer ${layer}, but selected layer is ${selectedLayer() || "unknown"}.`);
    }
  }

  async function selectKey(x, y) {
    const el = findKeyElement(x, y);
    if (!el) throw new Error(`Key x${x} y${y} was not found in the visible keymap.`);
    await click(el.closest("button") || el, 220);
  }

  async function setBehavior(behaviorName) {
    const select = visibleSelects().find((s) => [...s.options].some((o) => clean(o.textContent) === behaviorName));
    if (!select) throw new Error(`Could not find visible Behavior select with option "${behaviorName}".`);
    const option = [...select.options].find((o) => clean(o.textContent) === behaviorName);
    nativeSetValue(select, option.value);
    await sleep(behaviorName === "Key Press" ? 900 : 350);
  }

  function behaviorSelect() {
    return visibleSelects().find(isBehaviorSelect);
  }

  function currentBehaviorName() {
    const select = behaviorSelect();
    if (!select) return "";
    return clean(select.options[select.selectedIndex]?.textContent);
  }

  function currentTextParameters() {
    return visibleInputs()
      .filter((input) => input.type === "text")
      .map((input) => clean(input.value || input.getAttribute("value") || ""))
      .filter(Boolean);
  }

  function currentSelectParameters() {
    return visibleSelects()
      .filter((select) => !isBehaviorSelect(select) && !isZoomSelect(select))
      .map((select) => clean(select.options[select.selectedIndex]?.textContent || select.value))
      .filter(Boolean);
  }

  function currentImplicitModifiers() {
    const group = qa('[role="group"]').find((el) => /Implicit Modifiers/i.test(clean(el.getAttribute("aria-label") || el.textContent)));
    if (!group) return [];

    return qa("label", group)
      .map((label) => {
        const input = label.querySelector('input[type="checkbox"]');
        return input?.checked ? normalizeModifierName(label.textContent) : "";
      })
      .filter(Boolean)
      .sort();
  }

  function normalizeKeyName(value) {
    const raw = clean(String(value || ""))
      .replace(/^Keyboard\s+/i, "")
      .replace(/\s+/g, " ")
      .toUpperCase();
    const aliases = {
      LEFT: "LEFTARROW",
      RIGHT: "RIGHTARROW",
      UP: "UPARROW",
      DOWN: "DOWNARROW",
      "PAGE UP": "PAGEUP",
      "PAGE DOWN": "PAGEDOWN",
      "PG UP": "PAGEUP",
      PGUP: "PAGEUP",
      "PG DOWN": "PAGEDOWN",
      PGDN: "PAGEDOWN",
      "KEYPAD 9 AND PAGEUP": "PAGEUP",
      "KEYPAD 3 AND PAGEDN": "PAGEDOWN",
      DELETE: "DELETE",
      DEL: "DELETE",
      INSERT: "INSERT",
      INS: "INSERT",
      ESC: "ESCAPE",
      SPACE: "SPACEBAR",
      LEFTSHIFT: "LEFTSHIFT",
      "LEFT SHIFT": "LEFTSHIFT",
      LSHIFT: "LEFTSHIFT",
      LEFTCTRL: "LEFTCTRL",
      "LEFT CTRL": "LEFTCTRL",
      LCTRL: "LEFTCTRL",
      LEFTALT: "LEFTALT",
      "LEFT ALT": "LEFTALT",
      LALT: "LEFTALT",
      "1 AND BANG": "1",
      "2 AND AT": "2",
      "3 AND HASH": "3",
      "4 AND DOLLAR": "4",
      "5 AND PERCENT": "5",
      "6 AND CARET": "6",
      "7 AND AMPERSAND": "7",
      "8 AND ASTERISK": "8",
      "9 AND LEFT PARENTHESIS": "9",
      "0 AND RIGHT PARENTHESIS": "0",
      "GRAVE ACCENT AND TILDE": "GRAVE",
      LEFTARROW: "LEFTARROW",
      RIGHTARROW: "RIGHTARROW",
      UPARROW: "UPARROW",
      DOWNARROW: "DOWNARROW"
    };
    return aliases[raw] || raw.replace(/\s+/g, "");
  }

  function currentLooksLike(item) {
    if (currentBehaviorName() !== item.behavior) return false;

    if (["Transparent", "None", "Studio Unlock", "Reset", "Bootloader"].includes(item.behavior)) {
      return true;
    }

    const wantedModifiers = (item.modifiers || []).map(normalizeModifierName).sort();
    const currentModifiers = currentImplicitModifiers();
    if (wantedModifiers.join("|") !== currentModifiers.join("|")) {
      return false;
    }

    if (!item.parameter) return true;

    const wanted = normalizeKeyName(item.parameter);
    const visibleValues = [...currentTextParameters(), ...currentSelectParameters()].map(normalizeKeyName);

    if (visibleValues.includes(wanted)) return true;
    if (item.behavior === "Bluetooth" && /^BTSEL\d+$/i.test(wanted)) {
      return visibleValues.includes("SELECTPROFILE") && currentTextParameters().some((value) => clean(value) === wanted.replace(/^BTSEL/i, ""));
    }
    return false;
  }

  async function setTextParameter(parameter) {
    const inputs = visibleInputs().filter((i) => i.type === "text");
    const candidate = inputs.find((i) => /^Key:?$/i.test(cleanLabel(i)))
      || inputs.find((i) => /Key:/i.test(cleanLabel(i)))
      || inputs[1]
      || inputs[0];
    if (!candidate) throw new Error(`Could not find a visible text input for parameter "${parameter}".`);
    candidate.focus();
    candidate.select?.();
    nativeSetValue(candidate, parameter);
    candidate.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));
    candidate.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true }));
    candidate.blur();
    await sleep(180);
  }

  function findKeyInput() {
    const inputs = visibleInputs().filter((i) => i.type === "text");
    return inputs.find((i) => i.getAttribute("role") === "combobox" && /^Key:?$/i.test(cleanLabel(i)))
      || inputs.find((i) => /^Key:?$/i.test(cleanLabel(i)))
      || inputs.find((i) => i.getAttribute("role") === "combobox")
      || inputs.find((i) => /Key:/i.test(cleanLabel(i)))
      || inputs[1]
      || inputs[0];
  }

  function keySearchTerms(parameter) {
    const text = clean(String(parameter || ""));
    const upper = text.toUpperCase();
    const terms = new Set([text]);
    const known = {
      "1": ["Keyboard 1 and Bang", "1"],
      "2": ["Keyboard 2 and At", "2"],
      "3": ["Keyboard 3 and Hash", "3"],
      "4": ["Keyboard 4 and Dollar", "4"],
      "5": ["Keyboard 5 and Percent", "5"],
      "6": ["Keyboard 6 and Caret", "6"],
      "7": ["Keyboard 7 and Ampersand", "7"],
      "8": ["Keyboard 8 and Asterisk", "8"],
      "9": ["Keyboard 9 and Left Parenthesis", "9"],
      "0": ["Keyboard 0 and Right Parenthesis", "0"],
      GRAVE: ["Keyboard Grave Accent and Tilde", "Keyboard Grave", "Grave"],
      LEFT: ["Keyboard LeftArrow", "Left"],
      RIGHT: ["Keyboard RightArrow", "Right"],
      UP: ["Keyboard UpArrow", "Up"],
      DOWN: ["Keyboard DownArrow", "Down"],
      "PAGE UP": ["Keypad 9 and PageUp", "Keyboard Page Up", "Keyboard PageUp", "Page Up", "PageUp", "Keyboard Prior", "Prior"],
      PAGEUP: ["Keypad 9 and PageUp", "Keyboard Page Up", "Keyboard PageUp", "Page Up", "PageUp", "Keyboard Prior", "Prior"],
      PGUP: ["Keypad 9 and PageUp", "Keyboard Page Up", "Keyboard PageUp", "Page Up", "PageUp", "Keyboard Prior", "Prior"],
      "PAGE DOWN": ["Keypad 3 and PageDn", "Keyboard Page Down", "Keyboard PageDown", "Page Down", "PageDown", "Keyboard Next", "Next"],
      PAGEDOWN: ["Keypad 3 and PageDn", "Keyboard Page Down", "Keyboard PageDown", "Page Down", "PageDown", "Keyboard Next", "Next"],
      PGDN: ["Keypad 3 and PageDn", "Keyboard Page Down", "Keyboard PageDown", "Page Down", "PageDown", "Keyboard Next", "Next"],
      SPACE: ["Keyboard Space", "Space"],
      LEFTSHIFT: ["Keyboard LeftShift", "LeftShift", "Left Shift"],
      "LEFT SHIFT": ["Keyboard LeftShift", "LeftShift", "Left Shift"],
      LSHIFT: ["Keyboard LeftShift", "LeftShift", "Left Shift"],
      LEFTCTRL: ["Keyboard LeftControl", "LeftControl", "Left Control"],
      LEFTALT: ["Keyboard LeftAlt", "LeftAlt", "Left Alt"],
      LEFTGUI: ["Keyboard Left GUI", "Left GUI", "LeftGUI"],
      APOSTROPHE: ["Keyboard Left Apos and Double", "Keyboard Apostrophe and Quotation Mark", "Keyboard Apostrophe", "Apostrophe", "'"],
      KEYBOARDAPOSTROPHE: ["Keyboard Left Apos and Double", "Keyboard Apostrophe and Quotation Mark", "Keyboard Apostrophe", "Apostrophe", "'"],
      APOS: ["Keyboard Left Apos and Double", "Keyboard Apostrophe and Quotation Mark", "Keyboard Apostrophe", "Apostrophe", "'"],
      "'": ["Keyboard Left Apos and Double", "Keyboard Apostrophe and Quotation Mark", "Keyboard Apostrophe", "Apostrophe", "'"]
    };
    if (known[upper]) {
      known[upper].forEach((term) => terms.add(term));
    }
    return [...terms].filter(Boolean);
  }

  function optionScore(text, terms) {
    const actual = clean(text).toUpperCase();
    const normalizedTerms = terms.map((term) => clean(term).toUpperCase());
    const exactIndex = normalizedTerms.findIndex((term) => actual === term);
    if (exactIndex >= 0) return 1000 - exactIndex;
    const keyboardExactIndex = normalizedTerms.findIndex((term) => actual === `KEYBOARD ${term}`);
    if (keyboardExactIndex >= 0) return 900 - keyboardExactIndex;
    const containsIndex = normalizedTerms.findIndex((term) => actual.includes(term));
    if (containsIndex >= 0) return 100 - containsIndex;
    return 0;
  }

  function listboxForKeyCombobox(input) {
    const controls = input?.getAttribute("aria-controls");
    if (controls) {
      const controlled = document.getElementById(controls);
      if (controlled && controlled.getAttribute("aria-label") !== "Keymap Layer") return controlled;
    }
    return qa('[role="listbox"]')
      .filter(visible)
      .filter((listbox) => listbox.getAttribute("aria-label") !== "Keymap Layer")
      .find((listbox) => qa('[role="option"]', listbox).some(visible));
  }

  function visibleSuggestionNodes(parameter, input) {
    const terms = keySearchTerms(parameter);
    const scopedList = listboxForKeyCombobox(input);
    const roots = scopedList
      ? [scopedList]
      : qa('[role="listbox"]').filter((listbox) => listbox.getAttribute("aria-label") !== "Keymap Layer");
    return roots
      .flatMap((root) => qa('[role="option"]', root))
      .filter(visible)
      .map((el) => ({ el, text: clean(el.textContent || el.getAttribute("aria-label") || "") }))
      .filter((item) => item.text.length > 0 && item.text.length < 120)
      .map((item) => ({ ...item, score: optionScore(item.text, terms) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }

  async function setComboboxKeyParameter(parameter) {
    const input = findKeyInput();
    if (!input) throw new Error(`Could not find Key combobox for parameter "${parameter}".`);

    input.scrollIntoView({ block: "center", inline: "center" });
    input.focus();
    input.select?.();
    nativeSetValue(input, "");
    await sleep(80);
    const searchTerm = keySearchTerms(parameter)[0] || parameter;
    nativeSetValue(input, searchTerm);
    input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: searchTerm }));
    await sleep(450);

    const comboButton = input.closest(".react-aria-ComboBox")?.querySelector("button")
      || input.parentElement?.querySelector("button");
    if (comboButton && comboButton.getAttribute("aria-expanded") !== "true") {
      comboButton.click();
      await sleep(450);
    }

    let suggestions = visibleSuggestionNodes(parameter, input);
    if (!suggestions.length) {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", code: "ArrowDown", bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowDown", code: "ArrowDown", bubbles: true }));
      await sleep(250);
      suggestions = visibleSuggestionNodes(parameter, input);
    }

    if (suggestions.length) {
      const chosen = suggestions[0];
      chosen.el.scrollIntoView({ block: "center", inline: "center" });
      chosen.el.click();
      await sleep(350);
    } else {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true }));
      await sleep(350);
    }

    document.activeElement?.blur?.();
    input.blur();
    await sleep(250);
  }

  async function setKeyPressParameter(parameter) {
    await setComboboxKeyParameter(parameter);
    await sleep(350);
    const selected = document.querySelector('[x][y] button[aria-selected="true"]');
    const visibleText = clean(selected?.innerText);
    if (!visibleText.includes(parameter)) {
      console.info(`Key Press parameter "${parameter}" was entered. ZMK Studio may update the visible key label asynchronously; verify this key manually before saving.`);
    }
  }

  function normalizeModifierName(name) {
    const compact = clean(name).toUpperCase().replace(/[_-]+/g, " ");
    const aliases = {
      "LC": "L CTRL",
      "LCTRL": "L CTRL",
      "LEFT CTRL": "L CTRL",
      "LEFT CONTROL": "L CTRL",
      "LS": "L SHIFT",
      "LSHIFT": "L SHIFT",
      "LEFT SHIFT": "L SHIFT",
      "LA": "L ALT",
      "LALT": "L ALT",
      "LEFT ALT": "L ALT",
      "LG": "L GUI",
      "LGUI": "L GUI",
      "LEFT GUI": "L GUI",
      "WIN": "L GUI",
      "WINDOWS": "L GUI",
      "GUI": "L GUI",
      "RC": "R CTRL",
      "RCTRL": "R CTRL",
      "RIGHT CTRL": "R CTRL",
      "RIGHT CONTROL": "R CTRL",
      "RS": "R SHIFT",
      "RSHIFT": "R SHIFT",
      "RIGHT SHIFT": "R SHIFT",
      "RA": "R ALT",
      "RALT": "R ALT",
      "RIGHT ALT": "R ALT",
      "RG": "R GUI",
      "RGUI": "R GUI",
      "RIGHT GUI": "R GUI"
    };
    return aliases[compact.replace(/\s+/g, "")] || aliases[compact] || compact;
  }

  async function setCheckboxChecked(input, checked) {
    if (input.checked === checked) return;
    const label = input.closest("label");
    if (label) {
      label.click();
      await sleep(120);
    }
    if (input.checked !== checked) {
      input.click();
      await sleep(120);
    }
    if (input.checked !== checked) {
      nativeSetChecked(input, checked);
      await sleep(120);
    }
  }

  async function setImplicitModifiers(modifiers) {
    const wanted = new Set((modifiers || []).map(normalizeModifierName));
    const group = qa('[role="group"]')
      .filter((el) => /Implicit Modifiers/i.test(clean(el.getAttribute("aria-label") || el.textContent)))
      .find((el) => visible(el) && el.getAttribute("aria-hidden") !== "true")
      || qa('[role="group"]').find((el) => /Implicit Modifiers/i.test(clean(el.getAttribute("aria-label") || el.textContent)));
    if (!group) {
      if (wanted.size) console.warn("Could not find Implicit Modifiers group. Verify modifiers manually:", [...wanted]);
      return;
    }

    const byValue = {
      "1": "L CTRL",
      "2": "L SHIFT",
      "4": "L ALT",
      "8": "L GUI",
      "16": "R CTRL",
      "32": "R SHIFT",
      "64": "R ALT",
      "128": "R GUI"
    };
    const rows = qa('input[type="checkbox"]', group).map((input) => ({
      input,
      name: byValue[input.value || ""] || normalizeModifierName(input.closest("label")?.textContent || "")
    }));
    for (const row of rows) {
      await setCheckboxChecked(row.input, wanted.has(row.name));
      await sleep(60);
    }

    const missing = [...wanted].filter((modifier) => !rows.some((row) => row.name === modifier));
    if (missing.length) {
      console.warn("Some requested modifiers were not found in Studio:", missing);
    }
  }

  function parameterAliases(parameter) {
    const text = clean(String(parameter));
    const upper = text.toUpperCase();
    const aliases = new Set([text, upper]);

    const mouseAliases = { MB1: "MB1", MB2: "MB2", MB3: "MB3", MB4: "MB4", MB5: "MB5" };
    if (mouseAliases[upper]) aliases.add(mouseAliases[upper]);

    const outputAliases = {
      OUT_TOG: "Toggle Outputs",
      OUT_TOGGLE: "Toggle Outputs",
      OUT_USB: "USB Output",
      USB: "USB Output",
      OUT_BLE: "BLE Output",
      BLE: "BLE Output"
    };
    if (outputAliases[upper]) aliases.add(outputAliases[upper]);

    const bluetoothAliases = {
      BT_NXT: "Next Profile",
      BT_NEXT: "Next Profile",
      BT_PRV: "Previous Profile",
      BT_PREV: "Previous Profile",
      BT_CLR: "Clear Selected Profile",
      BT_CLEAR: "Clear Selected Profile",
      BT_CLR_ALL: "Clear All Profiles",
      BT_DISC: "Disconnect Profile"
    };
    if (bluetoothAliases[upper]) aliases.add(bluetoothAliases[upper]);

    if (/^BT_SEL\s+\d+$/i.test(text) || /^BT_SEL_\d+$/i.test(text)) aliases.add("Select Profile");
    return [...aliases].filter(Boolean);
  }

  function profileFromParameter(parameter) {
    const match = clean(String(parameter)).match(/^BT_SEL(?:\s+|_)(\d+)$/i);
    return match ? match[1] : null;
  }

  function isBehaviorSelect(select) {
    return [...select.options].some((o) => clean(o.textContent) === "Key Press")
      && [...select.options].some((o) => clean(o.textContent) === "Transparent");
  }

  function isZoomSelect(select) {
    return [...select.options].some((o) => clean(o.textContent) === "Auto")
      && [...select.options].some((o) => clean(o.textContent) === "100%");
  }

  async function setSelectParameter(parameter) {
    const normalized = clean(parameter);
    const aliases = parameterAliases(normalized);
    const select = visibleSelects().find((s) => !isBehaviorSelect(s) && !isZoomSelect(s) && [...s.options].some((o) => aliases.includes(clean(o.textContent)) || aliases.includes(clean(o.value))));
    if (!select) return false;
    const option = [...select.options].find((o) => aliases.includes(clean(o.textContent)) || aliases.includes(clean(o.value)));
    nativeSetValue(select, option.value);
    await sleep(180);

    const profile = profileFromParameter(normalized);
    if (profile !== null) {
      await sleep(250);
      const profileInput = visibleInputs().find((input) => input.type === "number" && Number(input.min) <= Number(profile) && Number(input.max) >= Number(profile));
      if (profileInput) {
        profileInput.focus();
        nativeSetValue(profileInput, profile);
        profileInput.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: profile }));
        profileInput.dispatchEvent(new Event("change", { bubbles: true }));
        profileInput.blur();
        await sleep(180);
        return true;
      }

      const profileSelect = visibleSelects().find((s) => !isBehaviorSelect(s) && !isZoomSelect(s) && s !== select && [...s.options].some((o) => clean(o.textContent) === profile || clean(o.value) === profile));
      if (!profileSelect) {
        console.warn(`Selected Bluetooth "Select Profile", but could not find a number/select Profile field for profile ${profile}. Verify manually before saving.`);
        return true;
      }
      const profileOption = [...profileSelect.options].find((o) => clean(o.textContent) === profile || clean(o.value) === profile);
      nativeSetValue(profileSelect, profileOption.value);
      await sleep(180);
    }
    return true;
  }

  async function applyItem(item) {
    if (item.studio_skip || item.behavior === "Output Selection") {
      console.log("Skipping (firmware-only, not in Studio UI):", item);
      return;
    }

    await selectLayer(item.layer);
    await selectKey(item.x, item.y);

    if (currentLooksLike(item)) {
      console.log("Already correct, skipping", item);
      return;
    }

    await setBehavior(item.behavior);

    if (["Transparent", "None", "Studio Unlock", "Reset", "Bootloader"].includes(item.behavior) || /^coach_/.test(item.behavior)) {
      return;
    }

    const supported = ["Key Press", "Mouse Key Press", "Momentary Layer", "To Layer", "Toggle Layer", "Bluetooth", "Output Selection"];
    if (!supported.includes(item.behavior)) {
      throw new Error(`Behavior "${item.behavior}" has behavior-specific controls that this applier does not safely automate yet. Use manualSteps or inspect_selected_behavior_controls.js.`);
    }

    if (!item.parameter) {
      console.warn("No parameter supplied for", item);
      return;
    }

    if (item.behavior === "Key Press") {
      await setKeyPressParameter(item.parameter);
      await setImplicitModifiers(item.modifiers || []);
      return;
    }

    const selectWorked = await setSelectParameter(item.parameter);
    if (!selectWorked) {
      console.warn(`No exact visible select option matched parameter "${item.parameter}". Trying visible text input/combobox. Verify manually before saving.`);
      await setTextParameter(item.parameter);
    }
  }

  function printPlan(items) {
    console.group("Charybdis ZMK Studio planned changes");
    console.warn("Safety: this script never clicks Save. Export backup first. Verify every key in Studio before saving.");
    for (const item of items) {
      const modifiers = item.modifiers?.length ? ` modifiers=${item.modifiers.join("+")}` : "";
      console.log(`Layer ${item.layer} x${item.x} y${item.y}: ${item.behavior} ${item.parameter || ""}${modifiers} [${item.label || ""}] - ${item.rationale || ""}`);
    }
    console.groupEnd();
  }

  function printManualSteps(items) {
    console.group("Manual ZMK Studio steps");
    for (const item of items) {
      console.log([
        `Layer ${item.layer}`,
        `click key x${item.x} y${item.y}`,
        `set Behavior = ${item.behavior}`,
        item.parameter ? `set parameter/key = ${item.parameter}` : "no parameter",
        item.modifiers?.length ? `set implicit modifiers = ${item.modifiers.join(", ")}` : "",
        item.label ? `label/check = ${item.label}` : "",
        item.rationale ? `why: ${item.rationale}` : ""
      ].filter(Boolean).join(" | "));
    }
    console.groupEnd();
  }

  const allItems = plannedKeys();
  const layerFilteredItems = APPLY_LAYERS
    ? allItems.filter((item) => APPLY_LAYERS.includes(Number(item.layer)))
    : allItems;
  const modeItems = MODE === "applyLayer" && APPLY_LAYER_INDEX !== "all"
    ? layerFilteredItems.filter((item) => Number(item.layer) === Number(APPLY_LAYER_INDEX))
    : layerFilteredItems;

  if (MODE === "dryRun") {
    validatePlanCoordinates(modeItems);
    validateSupportedBehaviors(modeItems);
    printPlan(modeItems);
    return;
  }

  if (MODE === "manualSteps") {
    validatePlanCoordinates(modeItems);
    validateSupportedBehaviors(modeItems);
    printManualSteps(modeItems);
    return;
  }

  if (MODE === "oneKeyTest") {
    console.warn("ONE KEY TEST: applying exactly one test key. Do not save until manually verified.");
    console.log(ONE_KEY_TEST);
    if (!validatePlanCoordinates([ONE_KEY_TEST]) || !validateSupportedBehaviors([ONE_KEY_TEST])) return;
    await applyItem(ONE_KEY_TEST);
    console.warn("One-key test complete. Verify the key in ZMK Studio. Save manually only if correct.");
    return;
  }

  if (MODE === "applyLayer") {
    if (!ENABLE_LAYER_APPLY) {
      console.error("Layer application is disabled. Set ENABLE_LAYER_APPLY = true only after dryRun and oneKeyTest succeed.");
      printPlan(modeItems);
      return;
    }
    if (!validatePlanCoordinates(modeItems) || !validateSupportedBehaviors(modeItems)) return;
    const confirmed = window.confirm(`Apply ${modeItems.length} planned changes ${APPLY_LAYER_INDEX === "all" ? "across multiple layers" : `to layer ${APPLY_LAYER_INDEX}`}? This will NOT save.`);
    if (!confirmed) {
      console.warn("Cancelled by user.");
      return;
    }
    for (const item of modeItems) {
      console.log("Applying", item);
      await applyItem(item);
    }
    console.warn("Layer apply complete. This script did NOT save. Verify in the UI before saving manually.");
    return;
  }

  throw new Error(`Unknown MODE "${MODE}". Use dryRun, manualSteps, oneKeyTest, or applyLayer.`);
})();



