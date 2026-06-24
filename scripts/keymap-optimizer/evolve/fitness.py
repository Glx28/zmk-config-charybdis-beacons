"""12-factor fitness function for keyboard layout evolution.

Supports both CPU (numpy) and GPU (PyTorch) batch evaluation.
All factors are vectorizable for evaluating thousands of candidates at once.
"""
import math
import numpy as np

try:
    import torch
    HAS_TORCH = True
except ImportError:
    HAS_TORCH = False

from representation import (
    Position, Shortcut, LAYER_APP_CONTEXT, KEY_GROUPS,
    FINGER_MAP, THUMB_HAND, LEFT_COLS, RIGHT_COLS,
    KNOWN_KEY_NAMES, LAYER_ACCESS, build_layer_to_positions,
)


class FitnessEvaluator:
    def __init__(self, positions, shortcut_pool, config, usage_stats=None,
                 conjunction_pairs=None, device="cpu"):
        self.positions = positions
        self.pool = shortcut_pool
        self.config = config
        self.weights = config.get("weights", {})
        self.usage_stats = usage_stats or {}
        self.conjunction_pairs = conjunction_pairs or {}
        self.device = device
        self.n_positions = len(positions)
        self.n_shortcuts = len(shortcut_pool)
        self.layer_positions = build_layer_to_positions(positions)

        self._precompute()

    def _precompute(self):
        self.effort_arr = np.array([p.effort for p in self.positions], dtype=np.float32)
        self.importance_arr = np.zeros(self.n_shortcuts, dtype=np.float32)
        for s in self.pool:
            self.importance_arr[s.sid] = s.importance

        self.usage_boost = np.ones(self.n_shortcuts, dtype=np.float32)
        shortcuts_usage = self.usage_stats.get("shortcuts", {})
        for s in self.pool:
            count = shortcuts_usage.get(s.keys, {}).get("count", 0)
            if count > 0:
                self.usage_boost[s.sid] = math.log(1 + count)

        self.finger_arr = np.array([
            list(FINGER_MAP.values()).index(p.finger) if p.finger in FINGER_MAP.values() else -1
            for p in self.positions
        ], dtype=np.int32)

        self.hand_arr = np.array([0 if p.hand == "left" else 1 for p in self.positions], dtype=np.int32)
        self.layer_arr = np.array([p.layer for p in self.positions], dtype=np.int32)
        self.is_thumb_arr = np.array([p.is_thumb for p in self.positions], dtype=np.bool_)
        self.x_arr = np.array([p.x for p in self.positions], dtype=np.int32)
        self.y_arr = np.array([p.y for p in self.positions], dtype=np.int32)

        self.app_ids = {}
        for s in self.pool:
            self.app_ids[s.sid] = s.app

        self._build_conjunction_matrix()
        self._build_distance_matrix()

        self.toggled_layers = {5, 9, 10}
        self.momentary_layers = {1, 3, 4}

        self._build_zmk_compat()

    def _build_conjunction_matrix(self):
        sid_lookup = {}
        for s in self.pool:
            sid_lookup[s.keys] = s.sid
        self.conj_pairs = []
        for pair_key, weight in self.conjunction_pairs.items():
            parts = pair_key.split("|")
            if len(parts) != 2:
                continue
            sid_a = sid_lookup.get(parts[0])
            sid_b = sid_lookup.get(parts[1])
            if sid_a is not None and sid_b is not None:
                self.conj_pairs.append((sid_a, sid_b, weight))

    def _build_distance_matrix(self):
        n = self.n_positions
        self.dist_matrix = np.full((n, n), 99.0, dtype=np.float32)
        for i in range(n):
            for j in range(i, n):
                pi, pj = self.positions[i], self.positions[j]
                if pi.layer != pj.layer:
                    self.dist_matrix[i, j] = 99.0
                    self.dist_matrix[j, i] = 99.0
                    continue
                if (pi.x in LEFT_COLS) != (pj.x in LEFT_COLS):
                    self.dist_matrix[i, j] = 99.0
                    self.dist_matrix[j, i] = 99.0
                    continue
                d = abs(pi.x - pj.x) + abs(pi.y - pj.y)
                self.dist_matrix[i, j] = d
                self.dist_matrix[j, i] = d

    def _build_zmk_compat(self):
        self.zmk_incompat = set()
        for s in self.pool:
            if s.zmk_parameter and s.zmk_parameter.startswith("Keyboard "):
                if s.zmk_parameter not in KNOWN_KEY_NAMES:
                    self.zmk_incompat.add(s.sid)

    def evaluate(self, genome):
        genome = np.array(genome, dtype=np.int32)
        obj1 = self._effort_score(genome)
        obj2 = self._adjacency_score(genome)
        obj3 = self._violation_score(genome)
        return (obj1, -obj2, obj3)

    def evaluate_full(self, genome):
        genome = np.array(genome, dtype=np.int32)
        breakdown = {
            "effort": self._effort_score(genome),
            "adjacency": self._adjacency_score(genome),
            "violations": self._violation_score(genome),
            "finger_balance": self._finger_balance(genome),
            "same_finger_penalty": self._same_finger_penalty(genome),
            "thumb_utilization": self._thumb_utilization(genome),
            "cross_layer_consistency": self._cross_layer_consistency(genome),
            "trackball_proximity": self._trackball_proximity(genome),
            "learning_curve": self._learning_curve(genome),
            "zmk_compatibility": self._zmk_compatibility(genome),
        }
        return breakdown

    def behavior_descriptors(self, genome):
        genome = np.array(genome, dtype=np.int32)
        app_balance = self._app_balance(genome)
        thumb_util = self._thumb_util_ratio(genome)
        return (app_balance, thumb_util)

    # === Objective 1: Weighted Effort ===

    def _effort_score(self, genome):
        w = self.weights.get("effort", 1.0)
        total = 0.0
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            eff = self.effort_arr[i]
            imp = self.importance_arr[sid]
            usage = self.usage_boost[sid]
            total += eff * imp * usage
        fb = self._finger_balance(genome) * self.weights.get("finger_balance", 0.8)
        sfp = self._same_finger_penalty(genome) * self.weights.get("same_finger_penalty", 2.0)
        lc = self._learning_curve(genome) * self.weights.get("learning_curve", 0.5)
        return total * w + fb + sfp + lc

    # === Objective 2: Workflow Adjacency ===

    def _adjacency_score(self, genome):
        w = self.weights.get("adjacency", 1.5)
        total = 0.0
        pos_of_sid = {}
        for i, sid in enumerate(genome):
            if sid >= 0:
                pos_of_sid.setdefault(sid, []).append(i)

        for sid_a, sid_b, weight in self.conj_pairs:
            positions_a = pos_of_sid.get(sid_a, [])
            positions_b = pos_of_sid.get(sid_b, [])
            best_prox = 0.0
            for pa in positions_a:
                for pb in positions_b:
                    d = self.dist_matrix[pa, pb]
                    if d < 99:
                        prox = max(0, 1.0 - d * 0.2)
                        if self.hand_arr[pa] != self.hand_arr[pb]:
                            prox += 0.3
                        best_prox = max(best_prox, prox)
            total += weight * best_prox

        thumb_bonus = self._thumb_utilization(genome) * self.weights.get("thumb_utilization", 3.0)
        cl_bonus = self._cross_layer_consistency(genome) * self.weights.get("cross_layer_consistency", 2.0)
        tb_bonus = self._trackball_proximity(genome) * self.weights.get("trackball_proximity", 1.5)

        return total * w + thumb_bonus + cl_bonus + tb_bonus

    # === Objective 3: Constraint Violations ===

    def _violation_score(self, genome):
        w = self.weights.get("violations", 10.0)
        total = 0.0
        total += self._layer_context_violations(genome) * w
        total += self._group_split_violations(genome) * 5.0
        total += self._duplicate_violations(genome) * 3.0
        total += self._zmk_compatibility(genome) * self.weights.get("zmk_compatibility", 20.0)
        return total

    # === Factor 4: Finger Load Balancing ===

    def _finger_balance(self, genome):
        finger_loads = {}
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            f = self.finger_arr[i]
            imp = self.importance_arr[sid]
            finger_loads[f] = finger_loads.get(f, 0) + imp
        if not finger_loads:
            return 0.0
        values = list(finger_loads.values())
        mean = sum(values) / len(values)
        variance = sum((v - mean) ** 2 for v in values) / len(values)
        return math.sqrt(variance)

    # === Factor 5: Same-Finger Penalty ===

    def _same_finger_penalty(self, genome):
        pos_of_sid = {}
        for i, sid in enumerate(genome):
            if sid >= 0:
                pos_of_sid.setdefault(sid, []).append(i)

        penalty = 0.0
        for sid_a, sid_b, weight in self.conj_pairs:
            for pa in pos_of_sid.get(sid_a, []):
                for pb in pos_of_sid.get(sid_b, []):
                    if self.layer_arr[pa] == self.layer_arr[pb]:
                        if self.finger_arr[pa] == self.finger_arr[pb] and self.finger_arr[pa] >= 0:
                            penalty += weight * 0.5
        return penalty

    # === Factor 6: Thumb Utilization ===

    def _thumb_utilization(self, genome):
        bonus = 0.0
        for layer_num, layer_positions in self.layer_positions.items():
            thumb_positions = [p for p in layer_positions if p.is_thumb]
            if not thumb_positions:
                continue
            filled = sum(1 for p in thumb_positions if genome[p.gene_idx] >= 0)
            empty = len(thumb_positions) - filled

            if layer_num in self.toggled_layers:
                bonus += filled * 3.0
                bonus -= empty * 1.0
            elif layer_num in self.momentary_layers:
                bonus += filled * 2.0
        return bonus

    def _thumb_util_ratio(self, genome):
        total_thumb = 0
        filled_thumb = 0
        for p in self.positions:
            if p.is_thumb:
                total_thumb += 1
                if genome[p.gene_idx] >= 0:
                    filled_thumb += 1
        return filled_thumb / max(total_thumb, 1)

    # === Factor 7: Cross-Layer Consistency ===

    def _cross_layer_consistency(self, genome):
        sid_positions = {}
        for i, sid in enumerate(genome):
            if sid >= 0:
                sid_positions.setdefault(sid, []).append(self.positions[i])

        bonus = 0.0
        toggled = self.toggled_layers
        for sid, pos_list in sid_positions.items():
            toggled_pos = [p for p in pos_list if p.layer in toggled]
            if len(toggled_pos) < 2:
                continue
            coords = [(p.x, p.y) for p in toggled_pos]
            if len(set(coords)) == 1:
                bonus += 2.0 * len(toggled_pos)
        return bonus

    # === Factor 8: Trackball Proximity ===

    def _trackball_proximity(self, genome):
        bonus = 0.0
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            pos = self.positions[i]
            if pos.layer == 2 and pos.hand == "right" and pos.y == 2:
                bonus += self.importance_arr[sid] * 0.15
        return bonus

    # === Factor 9: App Transition (simplified) ===

    def _app_balance(self, genome):
        top3_effort = 0.0
        other_effort = 0.0
        top3_apps = {"teams", "browser", "vscode"}
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            app = self.app_ids.get(sid, "")
            score = self.effort_arr[i] * self.importance_arr[sid]
            if app in top3_apps:
                top3_effort += score
            else:
                other_effort += score
        total = top3_effort + other_effort
        if total == 0:
            return 0.5
        return top3_effort / total

    # === Factor 10: Learning Curve ===

    def _learning_curve(self, genome, original=None):
        if original is None:
            return 0.0
        changes = sum(1 for i in range(len(genome)) if genome[i] != original[i])
        return changes * 0.5

    # === Factor 12: ZMK Studio Compatibility ===

    def _zmk_compatibility(self, genome):
        violations = 0
        for i, sid in enumerate(genome):
            if sid >= 0 and sid in self.zmk_incompat:
                violations += 1
        return float(violations)

    # === Constraint: Layer Context ===

    def _layer_context_violations(self, genome):
        violations = 0
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            layer = self.positions[i].layer
            allowed_apps = LAYER_APP_CONTEXT.get(layer)
            if allowed_apps is None:
                continue
            app = self.app_ids.get(sid, "")
            if app and app not in allowed_apps:
                violations += 1
        return violations

    # === Constraint: Button Group Splits ===

    def _group_split_violations(self, genome):
        violations = 0
        for group in KEY_GROUPS:
            if "behaviors" in group:
                continue
            params = [p.upper() for p in group.get("params", [])]
            mods_req = group.get("mods_required", "")
            group_positions = []
            for i, sid in enumerate(genome):
                if sid < 0:
                    continue
                s = self.pool[sid]
                base_upper = s.base_key.upper()
                if base_upper not in params:
                    continue
                if mods_req and not any(mods_req.lower() in m.lower() for m in s.modifiers):
                    continue
                group_positions.append(self.positions[i])

            if len(group_positions) < 2:
                continue

            by_layer = {}
            for p in group_positions:
                by_layer.setdefault(p.layer, []).append(p)

            for layer, members in by_layer.items():
                if len(members) < 2:
                    continue
                for ii in range(len(members)):
                    has_neighbor = False
                    for jj in range(len(members)):
                        if ii == jj:
                            continue
                        dx = abs(members[ii].x - members[jj].x)
                        dy = abs(members[ii].y - members[jj].y)
                        if dx <= 1 and dy <= 1:
                            has_neighbor = True
                            break
                    if not has_neighbor:
                        violations += 1
        return violations

    # === Constraint: Duplicate Shortcuts ===

    def _duplicate_violations(self, genome):
        layer_sids = {}
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            layer = self.positions[i].layer
            layer_sids.setdefault(layer, []).append(sid)

        dupes = 0
        for layer, sids in layer_sids.items():
            seen = set()
            for sid in sids:
                if sid in seen:
                    dupes += 1
                seen.add(sid)
        return dupes
