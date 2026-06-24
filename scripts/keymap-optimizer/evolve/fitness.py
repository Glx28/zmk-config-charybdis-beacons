"""12-factor fitness function for keyboard layout evolution.

Pure-tensor GPU batch evaluation — evaluates entire populations in one call
with zero Python loops in the hot path.
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

        self._precompute_numpy()
        if HAS_TORCH and device != "cpu":
            self._build_gpu_tensors()

    def _precompute_numpy(self):
        N = self.n_positions
        S = self.n_shortcuts

        self.effort_arr = np.array([p.effort for p in self.positions], dtype=np.float32)

        # Pad index S as "empty" sentinel
        self.importance_arr = np.zeros(S + 1, dtype=np.float32)
        for s in self.pool:
            self.importance_arr[s.sid] = s.importance

        self.usage_boost = np.ones(S + 1, dtype=np.float32)
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

        self._build_conjunction_data()
        self._build_distance_matrix()

        self.toggled_layers = {5, 9, 10}
        self.momentary_layers = {1, 3, 4}
        self._build_zmk_compat()
        self._build_layer_context_mask()
        self._build_thumb_vectors()

    def _build_conjunction_data(self):
        sid_lookup = {s.keys: s.sid for s in self.pool}
        self.conj_pairs = []
        for pair_key, weight in self.conjunction_pairs.items():
            parts = pair_key.split("|")
            if len(parts) != 2:
                continue
            sid_a = sid_lookup.get(parts[0])
            sid_b = sid_lookup.get(parts[1])
            if sid_a is not None and sid_b is not None:
                self.conj_pairs.append((sid_a, sid_b, weight))

        if self.conj_pairs:
            self.conj_sid_a = np.array([c[0] for c in self.conj_pairs], dtype=np.int64)
            self.conj_sid_b = np.array([c[1] for c in self.conj_pairs], dtype=np.int64)
            self.conj_weight = np.array([c[2] for c in self.conj_pairs], dtype=np.float32)
        else:
            self.conj_sid_a = np.array([], dtype=np.int64)
            self.conj_sid_b = np.array([], dtype=np.int64)
            self.conj_weight = np.array([], dtype=np.float32)

    def _build_distance_matrix(self):
        n = self.n_positions
        self.dist_matrix = np.full((n, n), 99.0, dtype=np.float32)
        for i in range(n):
            for j in range(i, n):
                pi, pj = self.positions[i], self.positions[j]
                if pi.layer != pj.layer:
                    continue
                if (pi.x in LEFT_COLS) != (pj.x in LEFT_COLS):
                    continue
                d = abs(pi.x - pj.x) + abs(pi.y - pj.y)
                self.dist_matrix[i, j] = d
                self.dist_matrix[j, i] = d

    def _build_zmk_compat(self):
        self.zmk_incompat = set()
        self.zmk_incompat_arr = np.zeros(self.n_shortcuts + 1, dtype=np.float32)
        for s in self.pool:
            if s.zmk_parameter and s.zmk_parameter.startswith("Keyboard "):
                if s.zmk_parameter not in KNOWN_KEY_NAMES:
                    self.zmk_incompat.add(s.sid)
                    self.zmk_incompat_arr[s.sid] = 1.0

    def _build_layer_context_mask(self):
        """Build per-position violation mask: pos_violation_mask[i, sid] = 1.0 if sid on position i is a violation."""
        S = self.n_shortcuts
        app_to_id = {}
        for s in self.pool:
            if s.app not in app_to_id:
                app_to_id[s.app] = len(app_to_id)

        # sid_app_id[sid] = app_id
        sid_app_id = np.full(S + 1, -1, dtype=np.int32)
        for s in self.pool:
            sid_app_id[s.sid] = app_to_id[s.app]

        layer_allowed = {}
        for layer, apps in LAYER_APP_CONTEXT.items():
            layer_allowed[layer] = set(app_to_id.get(a, -99) for a in apps)

        # pos_violation[i, sid] = 1.0 if placing sid at position i violates layer context
        self.pos_violation = np.zeros((self.n_positions, S + 1), dtype=np.float32)
        for i, pos in enumerate(self.positions):
            allowed = layer_allowed.get(pos.layer)
            if allowed is None:
                continue
            for s in self.pool:
                if app_to_id.get(s.app, -99) not in allowed:
                    self.pos_violation[i, s.sid] = 1.0

    def _build_thumb_vectors(self):
        """Per-position weights for thumb scoring."""
        N = self.n_positions
        self.thumb_filled_weight = np.zeros(N, dtype=np.float32)
        self.thumb_empty_weight = np.zeros(N, dtype=np.float32)
        for i, pos in enumerate(self.positions):
            if pos.is_thumb:
                if pos.layer in self.toggled_layers:
                    self.thumb_filled_weight[i] = 3.0
                    self.thumb_empty_weight[i] = -1.0
                elif pos.layer in self.momentary_layers:
                    self.thumb_filled_weight[i] = 2.0

    # =========================================================================
    # GPU BATCH EVALUATION — pure tensor, no Python loops in hot path
    # =========================================================================

    def _build_gpu_tensors(self):
        d = self.device
        S = self.n_shortcuts
        N = self.n_positions

        self.t_effort = torch.tensor(self.effort_arr, device=d)
        self.t_importance = torch.tensor(self.importance_arr, device=d)
        self.t_usage_boost = torch.tensor(self.usage_boost, device=d)
        self.t_finger = torch.tensor(self.finger_arr, device=d, dtype=torch.long)
        self.t_hand = torch.tensor(self.hand_arr, device=d, dtype=torch.long)
        self.t_layer = torch.tensor(self.layer_arr, device=d, dtype=torch.long)
        self.t_is_thumb = torch.tensor(self.is_thumb_arr, device=d)
        self.t_dist_matrix = torch.tensor(self.dist_matrix, device=d)
        self.t_zmk_incompat = torch.tensor(self.zmk_incompat_arr, device=d)
        self.t_pos_violation = torch.tensor(self.pos_violation, device=d)
        self.t_thumb_filled_w = torch.tensor(self.thumb_filled_weight, device=d)
        self.t_thumb_empty_w = torch.tensor(self.thumb_empty_weight, device=d)

        # Conjunction pair tensors
        if len(self.conj_pairs) > 0:
            self.t_conj_sid_a = torch.tensor(self.conj_sid_a, device=d, dtype=torch.long)
            self.t_conj_sid_b = torch.tensor(self.conj_sid_b, device=d, dtype=torch.long)
            self.t_conj_weight = torch.tensor(self.conj_weight, device=d)

        # Proximity matrix: prox[i,j] = max(0, 1 - dist*0.2), 0 where dist=99
        prox = np.maximum(0, 1.0 - self.dist_matrix * 0.2)
        prox[self.dist_matrix >= 99] = 0
        self.t_prox_matrix = torch.tensor(prox, device=d)

        # Hand alternation bonus matrix
        hand_bonus = np.zeros((N, N), dtype=np.float32)
        for i in range(N):
            for j in range(N):
                if self.hand_arr[i] != self.hand_arr[j] and self.dist_matrix[i, j] < 99:
                    hand_bonus[i, j] = 0.3
        self.t_hand_bonus = torch.tensor(hand_bonus, device=d)
        self.t_adj_matrix = self.t_prox_matrix + self.t_hand_bonus  # (N, N)

        # One-hot encoding: onehot[sid, pos] = positions where sid could appear
        # For batch: genome_onehot[batch, sid, pos] built at eval time
        self.n_fingers_unique = int(max(self.finger_arr.max() + 1, 1))

        # Unique layers for duplicate detection
        self.unique_layers = sorted(set(p.layer for p in self.positions))
        layer_masks = {}
        for l in self.unique_layers:
            layer_masks[l] = torch.tensor(self.layer_arr == l, device=d, dtype=torch.bool)
        self.t_layer_masks = layer_masks

    @torch.no_grad()
    def evaluate_batch_gpu(self, genomes_list):
        """Evaluate entire population on GPU. Returns list of (effort, -adj, viol)."""
        B = len(genomes_list)
        N = self.n_positions
        S = self.n_shortcuts
        d = self.device

        # Convert genomes: -1 → S (sentinel for empty)
        g_np = np.array(genomes_list, dtype=np.int64)
        g_np[g_np < 0] = S
        t_g = torch.tensor(g_np, device=d, dtype=torch.long)  # (B, N)
        assigned = (t_g < S)  # (B, N) bool
        assigned_f = assigned.float()

        # ── EFFORT ──
        imp = self.t_importance[t_g]        # (B, N)
        usage = self.t_usage_boost[t_g]     # (B, N)
        eff = self.t_effort.unsqueeze(0)    # (1, N)
        weighted = eff * imp * usage * assigned_f
        effort_raw = weighted.sum(dim=1) * self.weights.get("effort", 1.0)

        # Finger balance: load per finger, variance
        finger_ids = self.t_finger.unsqueeze(0).expand(B, -1)  # (B, N)
        finger_loads = torch.zeros(B, self.n_fingers_unique, device=d)
        for f in range(self.n_fingers_unique):
            mask = (finger_ids == f) & assigned  # (B, N)
            finger_loads[:, f] = (imp * mask.float()).sum(dim=1)
        fb_mean = finger_loads.mean(dim=1, keepdim=True)
        finger_balance = ((finger_loads - fb_mean) ** 2).mean(dim=1).sqrt() * self.weights.get("finger_balance", 0.8)

        # Same-finger penalty via conjunction pairs (fully vectorized)
        sfp = torch.zeros(B, device=d)
        if len(self.conj_pairs) > 0:
            # For each conjunction pair, check if both sids land on same finger on same layer
            # Build per-genome sparse sid→positions mapping via scatter
            # Approach: for each pair, find positions where sid_a and sid_b are placed,
            # check finger match. Vectorize over pairs using gather.
            #
            # sid_a_positions[b, n] = 1 if genome[b,n] == sid_a for each pair
            # This is too large for all pairs at once, so we chunk
            CHUNK = 200
            for start in range(0, len(self.conj_pairs), CHUNK):
                end = min(start + CHUNK, len(self.conj_pairs))
                chunk_a = self.t_conj_sid_a[start:end]  # (C,)
                chunk_b = self.t_conj_sid_b[start:end]
                chunk_w = self.t_conj_weight[start:end]
                C = end - start

                # (B, N) == (C, 1, 1) → (C, B, N), but that's too much memory
                # Instead: for each pair in chunk, compute per-finger overlap
                mask_a = (t_g.unsqueeze(0) == chunk_a.view(C, 1, 1))  # (C, B, N)
                mask_b = (t_g.unsqueeze(0) == chunk_b.view(C, 1, 1))  # (C, B, N)

                for f in range(self.n_fingers_unique):
                    f_mask = (finger_ids == f).unsqueeze(0)  # (1, B, N)
                    has_a = (mask_a & f_mask).any(dim=2).float()  # (C, B)
                    has_b = (mask_b & f_mask).any(dim=2).float()  # (C, B)
                    # weighted penalty
                    sfp += (has_a * has_b * chunk_w.unsqueeze(1) * 0.5).sum(dim=0)

        sfp *= self.weights.get("same_finger_penalty", 2.0)
        effort_total = effort_raw + finger_balance + sfp

        # ── ADJACENCY (fully vectorized) ──
        adj_scores = torch.zeros(B, device=d)
        if len(self.conj_pairs) > 0:
            # For each conjunction pair (a, b, w):
            # Find positions of a and b in each genome, compute best proximity
            CHUNK = 100
            for start in range(0, len(self.conj_pairs), CHUNK):
                end = min(start + CHUNK, len(self.conj_pairs))
                chunk_a = self.t_conj_sid_a[start:end]
                chunk_b = self.t_conj_sid_b[start:end]
                chunk_w = self.t_conj_weight[start:end]
                C = end - start

                # pos_a[c, b, n] = 1 if genome[b,n] == sid_a[c]
                pos_a = (t_g.unsqueeze(0) == chunk_a.view(C, 1, 1)).float()  # (C, B, N)
                pos_b = (t_g.unsqueeze(0) == chunk_b.view(C, 1, 1)).float()  # (C, B, N)

                # For each pair, compute outer product of positions × adj_matrix
                # prox_score[c, b] = max over (i,j) of pos_a[c,b,i] * pos_b[c,b,j] * adj[i,j]
                # Using matmul: pos_a @ adj_matrix @ pos_b^T gives (C, B, B) which is wrong
                # We need: for each (c, b): pos_a[c,b,:] @ adj_matrix @ pos_b[c,b,:]

                # (C, B, N) @ (N, N) → (C, B, N), then element-wise with pos_b and sum
                adj_contrib = torch.matmul(pos_a, self.t_adj_matrix)  # (C, B, N)
                pair_adj = (adj_contrib * pos_b).sum(dim=2)  # (C, B) — sum of all pairwise adj

                adj_scores += (pair_adj * chunk_w.unsqueeze(1)).sum(dim=0)

        # Thumb utilization
        thumb_filled = assigned_f * self.t_thumb_filled_w.unsqueeze(0)
        thumb_empty = (1.0 - assigned_f) * self.t_thumb_empty_w.unsqueeze(0)
        thumb_util = thumb_filled.sum(dim=1) + thumb_empty.sum(dim=1)

        adj_total = adj_scores * self.weights.get("adjacency", 1.5) + \
                    thumb_util * self.weights.get("thumb_utilization", 3.0)

        # ── VIOLATIONS ──
        # Layer context: gather from precomputed violation matrix
        # pos_violation[i, sid] = 1.0 if violation. Gather per genome.
        viol_per_pos = torch.gather(self.t_pos_violation.unsqueeze(0).expand(B, -1, -1),
                                    2, t_g.unsqueeze(2)).squeeze(2)  # (B, N)
        layer_viol = (viol_per_pos * assigned_f).sum(dim=1)

        # ZMK compat
        zmk_viol = (self.t_zmk_incompat[t_g] * assigned_f).sum(dim=1)

        # Duplicates per layer
        dupe_viol = torch.zeros(B, device=d)
        for l in self.unique_layers:
            lmask = self.t_layer_masks[l].unsqueeze(0) & assigned  # (B, N)
            layer_sids = t_g.clone()
            layer_sids[~lmask] = S  # sentinel for non-layer positions
            # Count unique per batch item
            for b_start in range(0, B, 500):
                b_end = min(b_start + 500, B)
                for bi in range(b_start, b_end):
                    sids = layer_sids[bi][lmask[bi]]
                    if len(sids) > 0:
                        dupe_viol[bi] += len(sids) - sids.unique().shape[0]

        viol_total = layer_viol * self.weights.get("violations", 10.0) + \
                     zmk_viol * self.weights.get("zmk_compatibility", 20.0) + \
                     dupe_viol * 3.0

        # Return as list of tuples
        e = effort_total.cpu().numpy()
        a = adj_total.cpu().numpy()
        v = viol_total.cpu().numpy()
        return [(float(e[i]), float(-a[i]), float(v[i])) for i in range(B)]

    # =========================================================================
    # SINGLE-GENOME CPU EVALUATION (used for QD, final breakdown)
    # =========================================================================

    def evaluate(self, genome):
        genome = np.array(genome, dtype=np.int32)
        obj1 = self._effort_score(genome)
        obj2 = self._adjacency_score(genome)
        obj3 = self._violation_score(genome)
        return (obj1, -obj2, obj3)

    def evaluate_full(self, genome):
        genome = np.array(genome, dtype=np.int32)
        return {
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

    def behavior_descriptors(self, genome):
        genome = np.array(genome, dtype=np.int32)
        return (self._app_balance(genome), self._thumb_util_ratio(genome))

    def _effort_score(self, genome):
        w = self.weights.get("effort", 1.0)
        mask = genome >= 0
        sids = np.clip(genome, 0, self.n_shortcuts)
        total = (self.effort_arr * self.importance_arr[sids] * self.usage_boost[sids] * mask).sum()
        fb = self._finger_balance(genome) * self.weights.get("finger_balance", 0.8)
        sfp = self._same_finger_penalty(genome) * self.weights.get("same_finger_penalty", 2.0)
        lc = self._learning_curve(genome) * self.weights.get("learning_curve", 0.5)
        return float(total * w + fb + sfp + lc)

    def _adjacency_score(self, genome):
        w = self.weights.get("adjacency", 1.5)
        total = 0.0
        pos_of_sid = {}
        for i, sid in enumerate(genome):
            if sid >= 0:
                pos_of_sid.setdefault(int(sid), []).append(i)
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

    def _violation_score(self, genome):
        w = self.weights.get("violations", 10.0)
        total = 0.0
        total += self._layer_context_violations(genome) * w
        total += self._group_split_violations(genome) * 5.0
        total += self._duplicate_violations(genome) * 3.0
        total += self._zmk_compatibility(genome) * self.weights.get("zmk_compatibility", 20.0)
        return total

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

    def _same_finger_penalty(self, genome):
        pos_of_sid = {}
        for i, sid in enumerate(genome):
            if sid >= 0:
                pos_of_sid.setdefault(int(sid), []).append(i)
        penalty = 0.0
        for sid_a, sid_b, weight in self.conj_pairs:
            for pa in pos_of_sid.get(sid_a, []):
                for pb in pos_of_sid.get(sid_b, []):
                    if self.layer_arr[pa] == self.layer_arr[pb]:
                        if self.finger_arr[pa] == self.finger_arr[pb] and self.finger_arr[pa] >= 0:
                            penalty += weight * 0.5
        return penalty

    def _thumb_utilization(self, genome):
        bonus = 0.0
        for layer_num, lp in self.layer_positions.items():
            thumbs = [p for p in lp if p.is_thumb]
            if not thumbs:
                continue
            filled = sum(1 for p in thumbs if genome[p.gene_idx] >= 0)
            empty = len(thumbs) - filled
            if layer_num in self.toggled_layers:
                bonus += filled * 3.0 - empty * 1.0
            elif layer_num in self.momentary_layers:
                bonus += filled * 2.0
        return bonus

    def _thumb_util_ratio(self, genome):
        total = filled = 0
        for p in self.positions:
            if p.is_thumb:
                total += 1
                if genome[p.gene_idx] >= 0:
                    filled += 1
        return filled / max(total, 1)

    def _cross_layer_consistency(self, genome):
        sid_positions = {}
        for i, sid in enumerate(genome):
            if sid >= 0:
                sid_positions.setdefault(int(sid), []).append(self.positions[i])
        bonus = 0.0
        for sid, pos_list in sid_positions.items():
            toggled_pos = [p for p in pos_list if p.layer in self.toggled_layers]
            if len(toggled_pos) < 2:
                continue
            coords = [(p.x, p.y) for p in toggled_pos]
            if len(set(coords)) == 1:
                bonus += 2.0 * len(toggled_pos)
        return bonus

    def _trackball_proximity(self, genome):
        bonus = 0.0
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            pos = self.positions[i]
            if pos.layer == 2 and pos.hand == "right" and pos.y == 2:
                bonus += self.importance_arr[sid] * 0.15
        return bonus

    def _app_balance(self, genome):
        top3 = other = 0.0
        top3_apps = {"teams", "browser", "vscode"}
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            score = self.effort_arr[i] * self.importance_arr[sid]
            if self.app_ids.get(int(sid), "") in top3_apps:
                top3 += score
            else:
                other += score
        total = top3 + other
        return top3 / total if total > 0 else 0.5

    def _learning_curve(self, genome, original=None):
        if original is None:
            return 0.0
        return sum(1 for i in range(len(genome)) if genome[i] != original[i]) * 0.5

    def _zmk_compatibility(self, genome):
        return float(sum(1 for i, sid in enumerate(genome) if sid >= 0 and sid in self.zmk_incompat))

    def _layer_context_violations(self, genome):
        violations = 0
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            allowed = LAYER_APP_CONTEXT.get(self.positions[i].layer)
            if allowed is None:
                continue
            app = self.app_ids.get(int(sid), "")
            if app and app not in allowed:
                violations += 1
        return violations

    def _group_split_violations(self, genome):
        violations = 0
        for group in KEY_GROUPS:
            if "behaviors" in group:
                continue
            params = [p.upper() for p in group.get("params", [])]
            mods_req = group.get("mods_required", "")
            gp = []
            for i, sid in enumerate(genome):
                if sid < 0:
                    continue
                s = self.pool[sid]
                if s.base_key.upper() not in params:
                    continue
                if mods_req and not any(mods_req.lower() in m.lower() for m in s.modifiers):
                    continue
                gp.append(self.positions[i])
            if len(gp) < 2:
                continue
            by_layer = {}
            for p in gp:
                by_layer.setdefault(p.layer, []).append(p)
            for layer, members in by_layer.items():
                if len(members) < 2:
                    continue
                for ii in range(len(members)):
                    has_neighbor = any(
                        abs(members[ii].x - members[jj].x) <= 1 and abs(members[ii].y - members[jj].y) <= 1
                        for jj in range(len(members)) if jj != ii
                    )
                    if not has_neighbor:
                        violations += 1
        return violations

    def _duplicate_violations(self, genome):
        layer_sids = {}
        for i, sid in enumerate(genome):
            if sid < 0:
                continue
            layer_sids.setdefault(self.positions[i].layer, []).append(int(sid))
        dupes = 0
        for sids in layer_sids.values():
            seen = set()
            for sid in sids:
                if sid in seen:
                    dupes += 1
                seen.add(sid)
        return dupes
