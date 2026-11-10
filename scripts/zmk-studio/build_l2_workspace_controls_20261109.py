#!/usr/bin/env python3
"""Regenerate the L2 workspace candidate after adding the overflow picker."""
import csv
import hashlib
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOOLS_EXPORTER = ROOT.parent / "charybdis-tools/runtime/evolved_v2_export/export_and_analyze_linux.py"
BASE = ROOT / "layout/review_candidates/l2_workspace_controls_20261109_source.csv"
CANDIDATE = ROOT / "layout/review_candidates/l2_workspace_controls_20261109.csv"
OUT = ROOT / "layout/review_candidates"
SCRIPTS = ROOT / "scripts/zmk-studio"
PREFIX = "l2_workspace_controls_20261109"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_csv(path):
    with path.open(encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


def save_csv(path, rows):
    fields = ["layer", "x", "y", "visual_label", "behavior", "parameter", "modifiers", "purpose", "usage_notes", "source"]
    with path.open("w", encoding="utf-8-sig", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def key(row):
    return int(row["layer"]), int(row["x"]), int(row["y"])


def semantic(row):
    return tuple(row.get(field, "") for field in ("visual_label", "behavior", "parameter", "modifiers", "purpose"))


def main():
    spec = importlib.util.spec_from_file_location("layout_exporter", TOOLS_EXPORTER)
    exporter = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(exporter)

    baseline = load_csv(BASE)
    rows = load_csv(CANDIDATE)
    by_key = {key(row): row for row in rows}
    if len(rows) != 616 or len(baseline) != 616:
        raise SystemExit("Expected complete 616-position baseline and candidate")

    picker_key = by_key[(2, 11, 0)]
    checkin_key = by_key[(5, 12, 1)]
    if picker_key["visual_label"] == "Ctrl+Shift+E" and checkin_key["behavior"] == "Transparent":
        moved_checkin = dict(picker_key)
        moved_checkin.update({
            "layer": "5", "x": "12", "y": "1",
            "source": "manual review candidate",
            "usage_notes": "Work log: MFDesktop.exe 4,508 events; moved from L2 to free the shared workspace-picker key.",
        })
        checkin_key.update(moved_checkin)
        picker_key.update({
            "visual_label": "F15", "behavior": "Key Press", "parameter": "F15", "modifiers": "",
            "purpose": "Open the host-local saved workspace picker",
            "usage_notes": "Shows saved PowerToys workspace shortcuts on this PC; same physical key on personal/work PCs.",
            "source": "manual review candidate",
        })
    elif not (picker_key["visual_label"] == "F15" and checkin_key["visual_label"] == "Ctrl+Shift+E"):
        raise SystemExit("Candidate changed since review; refusing to overwrite unexpected bindings")
    # ZMK Studio exposes HID 0 as "0 and Right Bracket", even when the host
    # output is the Norwegian equals sign produced by Shift+0.
    by_key[(2, 3, 2)]["parameter"] = "0 and Right Bracket"

    # Frozen and high-value invariants for this candidate.
    for row in rows:
        if row["layer"] in {"0", "1", "7"} and semantic(row) != semantic(next(r for r in baseline if key(r) == key(row))):
            raise SystemExit(f"Protected layer changed: {key(row)}")
    if by_key[(2, 0, 2)]["visual_label"] != "\\":
        raise SystemExit("Norwegian L2 backslash binding missing")

    ordered = sorted(rows, key=lambda row: key(row))
    baseline_by_key = {key(row): row for row in baseline}
    changed_rows = [row for row in ordered if semantic(row) != semantic(baseline_by_key[key(row)])]
    if not any(key(row) == (2, 11, 0) and row["visual_label"] == "F15" for row in changed_rows):
        raise SystemExit("Workspace picker binding absent from apply batch")

    save_csv(CANDIDATE, ordered)
    full = [{
        "layer": int(row["layer"]), "x": int(row["x"]), "y": int(row["y"]),
        "label": row["visual_label"], "behavior": row["behavior"], "parameter": row["parameter"],
        "modifiers": [part for part in row["modifiers"].split("+") if part],
        "purpose": row["purpose"], "usage_notes": row["usage_notes"], "source": row["source"],
    } for row in ordered]
    changed = [{**row, "source": "manual review candidate"} for row in full if semantic({
        "visual_label": row["label"], "behavior": row["behavior"], "parameter": row["parameter"],
        "modifiers": "+".join(row["modifiers"]), "purpose": row["purpose"],
    }) != semantic(baseline_by_key[(row["layer"], row["x"], row["y"])])]

    (SCRIPTS / f"review_{PREFIX}_apply.js").write_text(
        exporter.generate_apply_js(changed, version="L2-workspace-controls-20261109"), encoding="utf-8")
    (SCRIPTS / f"review_{PREFIX}_verify.js").write_text(
        exporter.generate_verify_js(full).replace('window.CHARYBDIS_VERSION = "evolved-v2";',
                                                    'window.CHARYBDIS_VERSION = "L2-workspace-controls-20261109";'),
        encoding="utf-8")
    diff_lines = ["L2 workspace controls candidate changes", f"Base SHA-256: {digest(BASE)}", ""]
    for row in changed:
        diff_lines.append(f"L{row['layer']} x{row['x']} y{row['y']}: {row['label']} ({row['behavior']} {row['parameter']})")
    (OUT / f"{PREFIX}.diff.txt").write_text("\n".join(diff_lines) + "\n", encoding="utf-8")

    md = f"""# L2 workspace controls review candidate

Status: applied and saved to the keyboard through the existing ZMK Studio serial session; no firmware flash.

- Source layout SHA-256: `{digest(BASE)}`
- Candidate CSV SHA-256: `{digest(CANDIDATE)}`
- Changed positions in apply batch: {len(changed)} of 616
- L0, L1, and frozen L7 unchanged.
- L2 right side includes PowerToys Workspaces editor, FancyZones editor, direct Full/Split keys, and F15 workspace picker.
- F13/F14/F15 are the same physical controls on both PCs; local Desktop PowerToys shortcuts resolve each host's profile IDs.
- L2 backslash remains in the Norwegian symbol cluster at x0,y2.
- M-Files check-in moved to L5 x12,y1 to make room for the picker.
- Apply script applies only changed positions and does not save; verify script checks all 616 positions.
- Studio preflight and postflight checked all 46 changed coordinates, including transparent bindings; 46 pass, 0 fail. Studio apply reported 46 completed, 0 failed; saved state confirmed by disabled Save/Discard controls.

The AHK helper maps bare F13/F14 to the host-local Full/Split aliases and F15 to a chooser over Desktop shortcuts targeting PowerToys Workspaces. Modified F13-F15 Coach beacon chords remain untouched.
"""
    (OUT / f"{PREFIX}.md").write_text(md, encoding="utf-8")
    print(f"Changed positions: {len(changed)}")
    print(f"Candidate SHA-256: {digest(CANDIDATE)}")


if __name__ == "__main__":
    main()
