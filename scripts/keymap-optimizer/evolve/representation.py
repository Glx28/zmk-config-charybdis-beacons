"""Genome encoding for keyboard layout evolution.

A genome is an integer array of length M where M = number of mutable positions.
Each gene value is a shortcut ID (index into shortcut_pool) or -1 for transparent/empty.
"""
import json
from dataclasses import dataclass, field

ROW_COMFORT = {0: 3, 1: 2, 2: 1, 3: 2, 4: 4, 5: 5}
COL_EFFORT = {0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 1, 7: 1, 8: 0, 9: 1, 10: 2, 11: 3, 12: 4}
LEFT_COLS = {0, 1, 2, 3, 4, 5}
RIGHT_COLS = {7, 8, 9, 10, 11, 12}

FINGER_MAP = {
    0: "far_pinky", 1: "pinky", 2: "ring", 3: "middle", 4: "index", 5: "index_stretch",
    7: "index_stretch", 8: "index", 9: "middle", 10: "ring", 11: "pinky", 12: "far_pinky",
}

LAYER_NAMES = {
    0: "Base", 1: "Nav", 2: "Mouse", 3: "Window", 4: "System",
    5: "Code", 6: "Scroll", 7: "Game", 8: "Speed", 9: "M-Files", 10: "Excel",
}

LAYER_ACCESS = {
    1: {"thumb": "left", "key_x": 3, "key_y": 4, "method": "momentary"},
    2: {"thumb": "left", "key_x": 5, "key_y": 5, "method": "momentary_or_locked"},
    3: {"thumb": "right", "key_x": 8, "key_y": 4, "method": "momentary"},
    4: {"thumb": "right", "key_x": 7, "key_y": 4, "method": "momentary"},
    5: {"thumb": None, "method": "toggled"},
    6: {"thumb": None, "method": "toggled"},
    7: {"thumb": None, "method": "locked"},
    8: {"thumb": None, "method": "toggled"},
    9: {"thumb": None, "method": "toggled"},
    10: {"thumb": None, "method": "toggled"},
}

LAYER_APP_CONTEXT = {
    1: ["windows", "browser"],
    2: ["windows", "browser"],
    3: ["windows"],
    4: ["windows", "teams", "browser", "vscode", "mfiles", "outlook", "excel"],
    5: ["vscode"],
    9: ["mfiles", "mfiles_admin"],
    10: ["excel"],
}

THUMB_HAND = {3: "left", 4: "left", 5: "left", 7: "right", 8: "right"}

COACH_BEHAVIORS = {
    "coach_l1_hold", "coach_l2_hold", "coach_l3_hold", "coach_l4_hold",
    "coach_mouse_lock", "coach_game_lock", "coach_base",
    "coach_travel_toggle", "coach_travel_off", "coach_recover_base",
}

STRUCTURAL_BEHAVIORS = COACH_BEHAVIORS | {
    "Momentary Layer", "Toggle Layer", "To Layer",
}

KEY_GROUPS = [
    {"name": "arrows", "params": ["LeftArrow", "RightArrow", "UpArrow", "DownArrow"]},
    {"name": "clipboard", "params": ["C", "V", "X", "Z", "Y"], "mods_required": "ctrl"},
    {"name": "mouse_buttons", "behaviors": ["Mouse Key Press"]},
    {"name": "bt_profiles", "behaviors": ["Bluetooth"]},
    {"name": "f_keys_low", "params": ["F1", "F2", "F3", "F4", "F5", "F6"]},
    {"name": "f_keys_high", "params": ["F7", "F8", "F9", "F10", "F11", "F12"]},
]

KNOWN_KEY_NAMES = {
    "Keyboard 0 and Right Bracket", "Keyboard 1 and Bang", "Keyboard 2 and At",
    "Keyboard 3 and Hash", "Keyboard 4 and Dollar", "Keyboard 5 and Percent",
    "Keyboard 6 and Caret", "Keyboard 7 and Ampersand", "Keyboard 8 and Star",
    "Keyboard 9 and Left Bracket", "Keyboard A", "Keyboard B",
    "Keyboard Backslash and Pipe", "Keyboard C", "Keyboard Comma and LessThan",
    "Keyboard D", "Keyboard Dash and Underscore", "Keyboard Delete",
    "Keyboard Delete Forward", "Keyboard DownArrow", "Keyboard E", "Keyboard End",
    "Keyboard Equals and Plus", "Keyboard Escape", "Keyboard F",
    "Keyboard F1", "Keyboard F2", "Keyboard F3", "Keyboard F4", "Keyboard F5",
    "Keyboard F6", "Keyboard F7", "Keyboard F8", "Keyboard F9", "Keyboard F10",
    "Keyboard F11", "Keyboard F12", "Keyboard F13", "Keyboard F14", "Keyboard F15",
    "Keyboard F16", "Keyboard F17", "Keyboard F18", "Keyboard F19", "Keyboard F20",
    "Keyboard F21", "Keyboard F22", "Keyboard F23", "Keyboard F24",
    "Keyboard ForwardSlash and QuestionMark", "Keyboard G",
    "Keyboard Grave Accent and Tilde", "Keyboard H", "Keyboard Home", "Keyboard I",
    "Keyboard J", "Keyboard K", "Keyboard L", "Keyboard Left Apos and Double",
    "Keyboard Left Brace", "Keyboard Left GUI", "Keyboard LeftAlt",
    "Keyboard LeftArrow", "Keyboard LeftControl", "Keyboard LeftShift", "Keyboard M",
    "Keyboard N", "Keyboard O", "Keyboard P", "Keyboard PageDown", "Keyboard PageUp",
    "Keyboard Period", "Keyboard Period and GreaterThan",
    "Keyboard PrintScreen and SysReq", "Keyboard Q", "Keyboard R",
    "Keyboard Return Enter", "Keyboard Right Brace", "Keyboard RightArrow",
    "Keyboard S", "Keyboard SemiColon and Colon", "Keyboard Spacebar", "Keyboard T",
    "Keyboard Tab", "Keyboard U", "Keyboard UpArrow", "Keyboard V", "Keyboard W",
    "Keyboard X", "Keyboard Y", "Keyboard Z",
    "Keypad 3 and PageDn", "Keypad 9 and PageUp",
}


@dataclass
class Position:
    gene_idx: int
    layer: int
    x: int
    y: int
    coord: str
    effort: float
    hand: str
    finger: str
    is_thumb: bool


@dataclass
class Shortcut:
    sid: int
    keys: str
    action: str
    app: str
    category: str
    importance: float
    base_key: str
    modifiers: list = field(default_factory=list)
    zmk_parameter: str = ""


def effort(x, y):
    return ROW_COMFORT.get(y, 5) + COL_EFFORT.get(x, 5)


def hand(x):
    return "left" if x in LEFT_COLS else "right"


def finger(x):
    return FINGER_MAP.get(x, "unknown")


def is_structural(binding):
    b = binding.get("behavior", "")
    if b in STRUCTURAL_BEHAVIORS:
        return True
    if "mouse key press" in b.lower():
        return True
    if any(kw in b.lower() for kw in ["bluetooth", "output selection", "studio unlock", "reset", "bootloader"]):
        return True
    p = binding.get("parameter", "").lower()
    mods = binding.get("modifiers", [])
    if any(kw in p for kw in ["spacebar", "return enter", "leftshift", "rightshift", "leftalt", "rightalt", "leftctrl", "rightctrl"]):
        if not mods:
            return True
    return False


def is_thumb_available(layer, x, y):
    if y < 4:
        return True
    access = LAYER_ACCESS.get(layer)
    if not access:
        return True
    if access.get("key_x") == x and access.get("key_y") == y:
        return False
    if access["method"] == "momentary" and access.get("thumb"):
        pos_hand = THUMB_HAND.get(x)
        if pos_hand == access["thumb"]:
            return False
    return True


def build_position_index(canonical, frozen_layers=None):
    if frozen_layers is None:
        frozen_layers = {0, 6, 7, 8}
    positions = []
    idx = 0
    for layer_id, layer_data in sorted(canonical["layers"].items(), key=lambda x: int(x[0])):
        layer_num = int(layer_id)
        if layer_num in frozen_layers:
            continue
        for coord, binding in sorted(layer_data["keys"].items()):
            x, y = map(int, coord.split(":"))
            if is_structural(binding):
                continue
            if not is_thumb_available(layer_num, x, y):
                continue
            pos = Position(
                gene_idx=idx, layer=layer_num, x=x, y=y, coord=coord,
                effort=effort(x, y), hand=hand(x), finger=finger(x), is_thumb=(y >= 4),
            )
            positions.append(pos)
            idx += 1
    return positions


def build_shortcut_pool(scores):
    pool = []
    seen = set()
    sid = 0
    for app in scores["apps"]:
        app_id = app["id"]
        for s in app["shortcuts"]:
            key = s["keys"]
            if key in seen:
                continue
            seen.add(key)
            mods = [k for k in key.split("+") if k.lower() in ("ctrl", "shift", "alt", "win")]
            base = key.split("+")[-1]
            pool.append(Shortcut(
                sid=sid, keys=key, action=s.get("action", ""),
                app=app_id, category=s.get("category", ""),
                importance=s.get("importance", 1.0),
                base_key=base, modifiers=mods,
                zmk_parameter=(s.get("best_match") or {}).get("parameter", ""),
            ))
            sid += 1
    return pool


def build_layer_to_positions(positions):
    layer_map = {}
    for pos in positions:
        layer_map.setdefault(pos.layer, []).append(pos)
    return layer_map


def encode_current_layout(canonical, positions, shortcut_pool, frozen_layers=None):
    if frozen_layers is None:
        frozen_layers = {0, 6, 7, 8}

    keys_lookup = {}
    for s in shortcut_pool:
        keys_lookup[s.keys.upper()] = s.sid

    genome = [-1] * len(positions)

    for pos in positions:
        layer_data = canonical["layers"].get(str(pos.layer), {})
        binding = layer_data.get("keys", {}).get(pos.coord, {})
        b = binding.get("behavior", "")
        if b.lower() in ("transparent", "none", ""):
            continue
        if is_structural(binding):
            continue

        param = binding.get("parameter", "")
        mods = binding.get("modifiers", [])
        mod_names = []
        for m in mods:
            ml = m.lower()
            if "gui" in ml:
                mod_names.append("Win")
            elif "ctrl" in ml:
                mod_names.append("Ctrl")
            elif "shift" in ml:
                mod_names.append("Shift")
            elif "alt" in ml:
                mod_names.append("Alt")
        mod_names.sort()

        base = param.upper().replace("KEYBOARD ", "").split(" AND ")[0].split(" ")[0]
        for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
            if param.upper() == f"KEYBOARD {letter}":
                base = letter
                break

        shortcut_key = "+".join(mod_names + [base]) if mod_names else base
        sid = keys_lookup.get(shortcut_key.upper())
        if sid is not None:
            genome[pos.gene_idx] = sid

    return genome


def decode_genome(genome, positions, shortcut_pool):
    changes = []
    for i, sid in enumerate(genome):
        if sid == -1:
            continue
        pos = positions[i]
        shortcut = shortcut_pool[sid]
        changes.append({
            "layer": pos.layer,
            "coord": pos.coord,
            "x": pos.x, "y": pos.y,
            "effort": pos.effort,
            "hand": pos.hand,
            "is_thumb": pos.is_thumb,
            "shortcut_id": sid,
            "keys": shortcut.keys,
            "action": shortcut.action,
            "app": shortcut.app,
            "importance": shortcut.importance,
        })
    return changes
