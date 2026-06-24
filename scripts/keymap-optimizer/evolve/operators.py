"""Custom mutation and crossover operators for keyboard layout evolution.

All operators are layer-aware and preserve structural positions.
"""
import random
import copy
from representation import (
    Position, Shortcut, LAYER_APP_CONTEXT, LAYER_ACCESS,
    build_layer_to_positions, is_structural,
)


def swap_within_layer(genome, positions, layer_positions=None):
    genome = copy.copy(genome)
    if layer_positions is None:
        layer_positions = build_layer_to_positions(positions)
    layers = [l for l in layer_positions if len(layer_positions[l]) >= 2]
    if not layers:
        return genome
    layer = random.choice(layers)
    pos_list = layer_positions[layer]
    a, b = random.sample(range(len(pos_list)), 2)
    ia = pos_list[a].gene_idx
    ib = pos_list[b].gene_idx
    genome[ia], genome[ib] = genome[ib], genome[ia]
    return genome


def swap_to_empty(genome, positions, layer_positions=None):
    genome = copy.copy(genome)
    if layer_positions is None:
        layer_positions = build_layer_to_positions(positions)
    for _ in range(20):
        layer = random.choice(list(layer_positions.keys()))
        pos_list = layer_positions[layer]
        assigned = [p for p in pos_list if genome[p.gene_idx] >= 0]
        empty = [p for p in pos_list if genome[p.gene_idx] < 0]
        if assigned and empty:
            src = random.choice(assigned)
            dst = random.choice(empty)
            genome[dst.gene_idx] = genome[src.gene_idx]
            genome[src.gene_idx] = -1
            return genome
    return genome


def thumb_fill(genome, positions, shortcut_pool, layer_positions=None):
    genome = copy.copy(genome)
    if layer_positions is None:
        layer_positions = build_layer_to_positions(positions)

    assigned_sids = set(s for s in genome if s >= 0)
    unassigned = [s for s in shortcut_pool if s.sid not in assigned_sids]
    if not unassigned:
        return genome

    for layer, pos_list in layer_positions.items():
        empty_thumbs = [p for p in pos_list if p.is_thumb and genome[p.gene_idx] < 0]
        if not empty_thumbs:
            continue

        allowed_apps = set(LAYER_APP_CONTEXT.get(layer, []))
        if not allowed_apps:
            continue

        candidates = [s for s in unassigned if s.app in allowed_apps]
        if not candidates:
            continue

        target = random.choice(empty_thumbs)
        shortcut = max(candidates, key=lambda s: s.importance)
        genome[target.gene_idx] = shortcut.sid
        assigned_sids.add(shortcut.sid)
        unassigned = [s for s in unassigned if s.sid != shortcut.sid]

    return genome


def migrate_shortcut(genome, positions, shortcut_pool, layer_positions=None):
    genome = copy.copy(genome)
    if layer_positions is None:
        layer_positions = build_layer_to_positions(positions)

    assigned_sids = set(s for s in genome if s >= 0)
    unassigned = [s for s in shortcut_pool if s.sid not in assigned_sids]
    if not unassigned:
        return genome

    shortcut = random.choice(unassigned[:20])

    for layer, pos_list in layer_positions.items():
        allowed_apps = set(LAYER_APP_CONTEXT.get(layer, []))
        if allowed_apps and shortcut.app not in allowed_apps:
            continue
        empty = [p for p in pos_list if genome[p.gene_idx] < 0]
        if empty:
            target = min(empty, key=lambda p: p.effort)
            genome[target.gene_idx] = shortcut.sid
            return genome

    return genome


def custom_mutate(genome, positions, shortcut_pool, layer_positions=None):
    if layer_positions is None:
        layer_positions = build_layer_to_positions(positions)
    r = random.random()
    if r < 0.4:
        return (swap_within_layer(genome, positions, layer_positions),)
    elif r < 0.65:
        return (swap_to_empty(genome, positions, layer_positions),)
    elif r < 0.85:
        return (migrate_shortcut(genome, positions, shortcut_pool, layer_positions),)
    else:
        return (thumb_fill(genome, positions, shortcut_pool, layer_positions),)


def pmx_crossover(parent1, parent2, positions, layer_positions=None):
    if layer_positions is None:
        layer_positions = build_layer_to_positions(positions)

    child1 = copy.copy(parent1)
    child2 = copy.copy(parent2)

    for layer, pos_list in layer_positions.items():
        if len(pos_list) < 4:
            continue

        indices = [p.gene_idx for p in pos_list]
        n = len(indices)
        a, b = sorted(random.sample(range(n), 2))

        seg1 = [parent1[indices[i]] for i in range(a, b)]
        seg2 = [parent2[indices[i]] for i in range(a, b)]

        for i in range(a, b):
            child1[indices[i]] = seg2[i - a]
            child2[indices[i]] = seg1[i - a]

        _repair_duplicates_on_layer(child1, indices)
        _repair_duplicates_on_layer(child2, indices)

    return child1, child2


def _repair_duplicates_on_layer(genome, layer_indices):
    seen = set()
    dupes = []
    for i in layer_indices:
        sid = genome[i]
        if sid < 0:
            continue
        if sid in seen:
            dupes.append(i)
            genome[i] = -1
        else:
            seen.add(sid)
